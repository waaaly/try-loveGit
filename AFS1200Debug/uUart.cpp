#include <vcl.h>
#pragma hdrstop
#include <DateUtils.hpp>
#include <process.h>
#include <stdio.h>

#include "uUart.h"
#include "uIDCardDef.h"      
#include "uCaptions.h"
#include "uParams.h"

#include "uMaintain.h"
extern TfrmMaintain *frmMaintain;

#pragma package(smart_init)
#pragma link "XComDrv"
#pragma resource "*.dfm"

TfrmUart *frmUart;


BYTE ucSend[24];                       // �������

bool m_bQuit;                          // �Ƿ��˳�ϵͳ
bool m_bConnected;                     // �Ƿ��Ѿ����Ӵ���

int     m_iReadModal;                  // 1���� 2������
bool    m_bReadIC = false;             // �Ƿ��ڶ�IC
int     m_iDataCount;

AnsiString m_sBarCode;                 // ��ȡ�����Լ�������
WORD       dwTCount;                   // ��ȡ�����ݸ���
DWORD      dwTRead[8192];              // ��������������
DWORD       dwBCCount;                  // ��ȡ������������ݸ���
DWORD      dwBCRead[4096];             // ���������������������

HANDLE DataHandle = NULL;              // ���ݴ����߳̾��
bool m_bAccept    = false;             // ���յ�����
bool m_bProcess   = false;             // �߳����ڴ������յ�������


bool m_bBCScan    = false;             // ��ȡ�������
bool m_bScan      = false;             // ����ɨ��
bool m_bReadID    = false;             // ��ID��

int    dBufCount = 0;                  // ���ջ����������ֽ���

BYTE   RecvBuf[40960];                 // ���ڽ��ջ�����
BYTE   BCMsg[40960];                   // ������Ի�����

int    bHasCard;                       // �Ƿ��п�
bool   bHasID;                         // �Ƿ���ID��
WORD   dwIDByte;                       // д��/��ȡID�����ֽ���
BYTE   IDBuf[4096];

int    iScan[30];                      // ɨ��ͷ����
bool   isXscan;
/*
.0  = ����ͷ���Ƶ��
.1  = Xԭ��-����
.2  = ���볤��
.3  = ����1 list
.4  = �������
.5  = ����Ŵ���
.6  = Xԭ��-����
.7  = ���Դ��ڳ���
.8  = ��������
.9  = ���ԷŴ���
.10 = ����ͷ���Ƶ�� ???
.11 = �Լ�����ɫ
.12 = �������
.13 = ������ٲ���
.14 = �������Ƶ��
.15 = ����Ƶ��
.16 = ���ٴ���

.20 = ��·����
.21 = x������Ƶ��
.22 = x��ɨ�봰�ڳ���
.23 = y��ɨ��λ��

.24 = �¿���С
.25 = �¿����
.26 = �¶�ֵ
.27 = ��������
.28 = Y������λ��
*/

void InitCmd_add(BYTE b3, BYTE b4, BYTE b7, BYTE b8, BYTE b9)
{
   for(int i=0;i<24;i++)
   {
	   ucSend[i] = 0x00;
   }
   ucSend[0] = 0x01;
   ucSend[2] = b3;
   ucSend[3] = b4;
   ucSend[7] = b8;
   ucSend[8] = b9;
   ucSend[9] = b7;

   if(b4 == 0x12 || b4 == 0x11 || b4 == 0x18)
   {
      ucSend[7] = b7;
      ucSend[8] = b8;
      ucSend[9] = b9;
   }

   BYTE ucCRC = 0;
   for(int i=0; i<23;i++)
   {
	   ucCRC += ucSend[i];
   }
   ucSend[23] = ucCRC;
	
}





//------------------------------------------------------------------------------
// ��ѯ�����Ƿ���� �����ô�������
//------------------------------------------------------------------------------
bool __fastcall ComPortExists(AnsiString asName)
{
   HANDLE hPort;
   bool   b = false;
   DWORD dwError;
   //win�����COM10���϶˿�,������Ҫ�����⴦��
   //����Ϊ��"\\.\COM10"

   int comNum = asName.SubString(4,2).ToInt();
   if(comNum >= 10)
   {
     asName = "/\/\./" + asName ;
   }
   hPort = CreateFile(asName.c_str(),
                        GENERIC_READ | GENERIC_WRITE,
                        0,
                        0,
                        OPEN_EXISTING,
                        0,
                        0);
   if (hPort!=INVALID_HANDLE_VALUE)           // ���ڿɱ���
   {
      CloseHandle(hPort);                     // �رմ���
      b = true;
   }

   return b;
}

__fastcall TfrmUart::TfrmUart(TComponent* Owner) : TForm(Owner)
{
  isXscan = false;
}

void __fastcall TfrmUart::DisplayData(int istyle,char buf[],int icount)
{
   AnsiString s="";
   BYTE b;
   if(icount==0) return;
   if(istyle==0) s = "����:";
   else s = "����:";
   for(int i=0; i<icount; i++)
   {
      b = buf[i];
      s = s + IntToHex(b,2) + " ";
   }
   if(m==NULL) return;
   m->Lines->Append(s);
   s.printf("���ݸ��� %d", icount);
   m->Lines->Append(s);
   // if(m->Lines->Count > 500) m->Lines->Clear();
}

// �޸ĺ�Ĳ������ݴ�������
// 0 ok
// 1 faild
// 2 less
int __fastcall TestMsgProcess(BYTE *buf, int count)
{
    int pos = 0;

    while (pos < count && !(buf[pos] == 0xff && buf[pos+1] == 0x1a)) pos++;

    if (pos >= count) return 1;

    int tmpCount = 0;

    for (;pos + 4 <= count; pos += 6)
    {
        if (0xffffffff == *(unsigned int*)(buf+pos))
        {
             dwTCount = tmpCount;
             return 0;
        }
        if (buf[pos] == 0xff && buf[pos+1] == 0x1a)
        {
             DWORD val = 0;
             val += (buf[pos+2] >>  4) * 10000000;
             val += (buf[pos+2] & 0xf) * 1000000;
             val += (buf[pos+3] >>  4) * 100000;
             val += (buf[pos+3] & 0xf) * 10000;
             val += (buf[pos+4] >>  4) * 1000;
             val += (buf[pos+4] & 0xf) * 100;
             val += (buf[pos+5] >>  4) * 10;
             val += (buf[pos+5] & 0xf) * 1;

             dwTRead[tmpCount++] = val;
        }
        else
        {
            return 1;
        }

    }
    return 2;
/*
   int i;
   BYTE b0,b1,b2,b3;

   unsigned short sum = 0xff*4;
   unsigned int tmpCount = 0;


   // ����0XFF
   if (buf[0] != 0xff)
   {
       return 1;
   }
   if (count < 4)
   {
       return 2;
   }

   for(i=0; i<count && i < count + 6; i += 4)
   {
      b0 = buf[i];
      b1 = buf[i+1];
      b2 = buf[i+2];
      b3 = buf[i+3];
      if (b0 != 0xff)
      {
          return 1;
      }

      if (b1 == 0xff && b2 == 0xff && b3 == 0xff)
      {
           if (sum == buf[i+4]*256+buf[i+5])
           {
               dwTCount = tmpCount;
               return 0;
           }
           else
           {
               return 1;
           }
      }

      sum += b0;
      sum += b1;
      sum += b2;
      sum += b3;
      dwTRead[tmpCount++] = b1*256*256 + b2*256 + b3;
   }
   return 2;
   */


}

// ����������ݴ�������
int __fastcall BCMsgProcess(BYTE *buf, int count)
{
       int pos = 0;

    while (pos < count && !(buf[pos] == 0xff && buf[pos+1] == 0x1a)) pos++;

    if (pos >= count) return 1;

    int tmpCount = 0;

    for (;pos + 4 <= count; pos += 5)
    {
        if (0xffffffff == *(unsigned int*)(buf+pos))
        {
             dwBCCount = tmpCount;
             return 0;
        }
        if (buf[pos] == 0xff && buf[pos+1] == 0x1a)
        {
             DWORD val = 0;
             val += (buf[pos+2] >>  4) * 100000;
             val += (buf[pos+2] & 0xf) * 10000;
             val += (buf[pos+3] >>  4) * 1000;
             val += (buf[pos+3] & 0xf) * 100;
             val += (buf[pos+4] >>  4) * 10;
             val += (buf[pos+4] & 0xf) * 1;

             dwBCRead[tmpCount++] = val;
        }
        else
        {
            return 1;
        }

    }
    return 2;


  /*/

   int i;
   BYTE b0,b1,b2,b3;

   unsigned short sum = 0xff*4;
   unsigned int tmpCount = 0;


   // ����0XFF
   if (buf[0] != 0xff)
   {
       return 1;
   }
   if (count < 4)
   {
       return 2;
   }

   for(i=0; i<count && i < count + 6; i += 4)
   {
      b0 = buf[i];
      b1 = buf[i+1];
      b2 = buf[i+2];
      b3 = buf[i+3];
      if (b0 != 0xff)
      {
          return 1;
      }

      if (b1 == 0xff && b2 == 0xff && b3 == 0xff)
      {
           if (sum == buf[i+4]*256+buf[i+5])
           {
               dwBCCount = tmpCount;
               return 0;
           }
           else
           {
               return 1;
           }
      }

      sum += b0;
      sum += b1;
      sum += b2;
      sum += b3;
      dwBCRead[tmpCount++] = b1*256*256 + b2*256 + b3;
   }
   return 2;
   */

}

// ID���ݴ�������
void __fastcall IDMsgProcess(BYTE *buf, int count)
{
   dwIDByte = count;
   memcpy(IDBuf,buf,count-4);
}

BYTE __fastcall CalcCRC(BYTE *buf)
{
   BYTE ucCRC = 0;
   for(int i=0; i<23; i++) ucCRC+=buf[i];
   return ucCRC;
}

void __fastcall TfrmUart::ReceiveData()
{
   BYTE buf[2048];
   int  count;
   int  Esc = 1;
   while(XComm1->Opened)
   {


      try
      {
          count = XComm1->ReadData(buf, sizeof (buf));
      }
      catch ( ... )
      {
           break;
      }

      if (count <= 0)
      {
          if (--Esc)
          {
                continue;
          }
          break;
      }
      Esc = 2;

      DisplayData(1,buf,count);

      memcpy(&RecvBuf[dBufCount], buf, count);
      dBufCount += count;
      ::Sleep(5);
   }
}

bool CalcCRC(BYTE uc[],int iPos,int iCount)
{
   bool bRet;
   BYTE *buf;
   buf = new BYTE[iCount];
   memcpy(buf,&uc[iPos],iCount);
   BYTE bCRC = 0x00;
   for(int i=0; i<iCount-1; i++)
   {
      bCRC = bCRC^buf[i];
   }
   bCRC = ~bCRC;
   if(bCRC == buf[iCount-1]) bRet = true;
   else bRet = false;
   return bRet;
}

// ���ݴ����߳�
void DataThread(void *param)
{

   BYTE TestMsg[40960];
   BYTE buf[40960];
   BYTE b2,b4,b5,b8,b9,b10,b23,bb;
   BYTE BI;
   WORD Wv;
   BYTE bCRC;
   bool bHead, bEnd;
   int  iHead, iEnd, iCount;
   AnsiString sTemp;
   int iTemperature,iLen,iPak;
   double dTemp;
   int iDCount;
   while(1)
   {
      ::Sleep(5);
      if(m_bQuit) break;                         // �˳�ϵͳ
      if(!m_bConnected) continue;                // ����δ����
      frmUart->ReceiveData();                    // ���ڽ�������
      if(m_bReadIC)                              // ��дIC��
      {
         bHead = bEnd = false;                      // �Ұ�ͷ��β
         for(int i=0; i<dBufCount; i++)
         {
            if( (!bHead) && (0x20==RecvBuf[i]) )    // ��û�ҵ���ͷ,�ǰ�ͷ��־
            {
               iHead = i;                           // ��ͷλ��
               bHead = true;                        // �ҵ���ͷ
               continue;
            }
            if(bHead && (0x03==RecvBuf[i]) )        // ֻ���ҵ���ͷ���Ұ�β
            {
               if(CalcCRC(RecvBuf,iHead+1,i-iHead-1))
               {
                  iEnd = i;                         // ��βλ��
                  bEnd = true;                      // �ҵ���β
                  break;
               }
            }
         }
         if(!bHead||!bEnd) continue;
         iCount = iEnd - iHead + 1;                 // ���ĳ���
         if(m_bReadIC)                              // ���ڶ�IC
         {
            switch(m_iReadModal)
            {
            case 1:                                 // ����
                   memcpy(&IDBuf[m_iDataCount],&RecvBuf[iHead+4],16);
                   m_iDataCount = m_iDataCount + 16;
                   break;
            case 2:                                 // ������
                   memcpy(&IDBuf[m_iDataCount],&RecvBuf[iHead+4],48);
                   m_iDataCount = m_iDataCount + 48;
                   break;
            }
            if(m_iDataCount==3440) m_bReadIC=false; // ������
         }
         dBufCount = dBufCount - iCount;
         if(dBufCount>0)
         {
            memcpy(buf,&RecvBuf[iEnd+1],dBufCount);
            memcpy(RecvBuf,buf,dBufCount);
         }
         m_bProcess = false;
         continue;
      }
      if(dBufCount<24) continue;                 // ����24��������
      m_bProcess = true;                         // ���ڴ�������

      memset(TestMsg,0,sizeof(TestMsg));

      if(m_bBCScan)                              // �������
      {
         memcpy(BCMsg,RecvBuf,dBufCount);
         if (isXscan)
         {
                int ret = TestMsgProcess(BCMsg,dBufCount);            // ���յ������ݽ���������������
                if (ret == 2)
                {
                   m_bProcess  = false;                 // �������ݽ���
                   continue;
                }

                isXscan = false;
         }
         else
         {
                if (BCMsgProcess(BCMsg, dBufCount) == 2)
                {
                    m_bProcess  = false;                 // �������ݽ���
                    continue;
                }
         }

         dBufCount = 0;
         m_bAccept = false;                      // ���ݴ�����ɱ�־
         m_bProcess= false;                      // �������ݽ���
         m_bBCScan = false;                      // ������Խ���
         continue;
      }
      if(m_bReadID)                              // ��ȡID
      {
         iDCount = 4096 + 4;
         if(dBufCount<iDCount)
         {
            m_bProcess  = false;                 // �������ݽ���
            continue;
         }
         memcpy(BCMsg,&RecvBuf,iDCount);
         IDMsgProcess(BCMsg,iDCount);            // ���յ������ݽ���������������

         dBufCount = 0;
         m_bAccept = false;                      // ���ݴ�����ɱ�־
         m_bProcess= false;                      // �������ݽ���
         m_bReadID = false;                      // ID��ȡ����
         continue;
      }
      if(m_bScan)                                // ǿ��ɨ��
      {

         memcpy(TestMsg,RecvBuf,dBufCount);
         int ret = TestMsgProcess(TestMsg,dBufCount);        // ���յ������ݽ���������������
         if (ret == 2)
         {
             m_bProcess  = false;                 // �������ݽ���
             continue;
         }

         dBufCount = 0;
         m_bAccept = false;                      // ���ݴ�����ɱ�־
         m_bProcess= false;                      // �������ݽ���
         m_bScan   = false;
         continue;
      }
      if(dBufCount<24)
      {
         dBufCount = 0;
         m_bProcess    = false;                  // �������ݽ���
         continue;                               // ����ָ����24�ֽ�һ����
      }
      memcpy(buf,&RecvBuf,24);
      b2  = buf[1];
      b4  = buf[3];
      b5  = buf[4];
      b8  = buf[7];                                //PH
      b9  = buf[8];                                //PL
      b10 = buf[9];
      b23 = CalcCRC(buf);                        // ����У��

      if(b23!=buf[23])
      {
         dBufCount = 0;
         m_bProcess    = false;                  // �������ݽ���
         continue;
      }
                               // �����������ֽ���
      if((buf[0] == 0 && b2 == 0x06) || (buf[0] == 1 && buf[1] == 0))
      {
            switch(b4)
            {
                case 0x07: sTemp = IntToHex(b8,2) +     // ������
                    IntToHex(b9,2) +
                    IntToHex(b10,2);
                    m_sBarCode = sTemp.SubString(1,5);
                    break;

                case 0x13: bHasCard = (b9==1) + (b10==1) * 2; break;   // �ж��Ƿ��п�

                case 0x0d: bHasID   = (b8==1); break;   // ����Ƿ���ID��
                case 0x1e: b8 = buf[8];                 // дID��
                    b9 = buf[9];
                    b10= buf[10];
                    bHasID   = (b8==0x00);              // �Ƿ���ID��
                    dwIDByte = b9 * 256 + b10;          // д��/��ȡID�����ֽ���
                    break;
                case 0x1f: bHasID = (b9==0x00); break;  // ��ID��

                case 0x12: iScan[20] = b9*256+b10; break;
                case 0x11: iScan[21] = b9*256+b10; break;
                case 0x15: iScan[22] = b9*256+b10; break;
                case 0x18: iScan[23] = b9*256+b10; break;

                case 0x16:                              // ���¶�
                    iScan[26] = b9*256+b10;
                    if (b8) iScan[26] = -iScan[26];
                    break;

                case 0x02: // ����ͷ������д
                    Wv = b8 * 256 + b9;          // ���ֵ
                    switch(b5)
                    {
                        case 0x00:iScan[0]=Wv;break; // ���Ƶ��
                        case 0x01:iScan[10]=Wv;break;// �������Ƶ��
                        case 0x02:iScan[1]=Wv;break; // Xԭ��-����
                        case 0x03:iScan[2]=Wv;break; // ���볤��
                        case 0x04:iScan[6]=Wv;break; // Xԭ��-����
                        case 0x06:iScan[7]=Wv;
                            m_wDots = iScan[7];
                            SaveComParam();
                            break; // ���Դ��ڳ���
                        case 0x07:iScan[3]=Wv;break; // ����1 list
                        case 0x08:iScan[4]=Wv;break; // �������
                        case 0x09:iScan[5]=Wv;break; // ����Ŵ���
                        case 0x0a:iScan[8]=Wv;break; // ��������
                        case 0x0b:iScan[9]=Wv;break; // ���ԷŴ���
                        case 0x0c:iScan[27]=Wv;break;
                        case 0x0d:iScan[28]=Wv;break;
                        case 0x0e:iScan[11]=Wv;break;// �Լ�����ɫ
                        case 0x0f:iScan[12]=Wv;break;// ����Ƿ�����
                        case 0x10:iScan[13]=Wv;break;// ������ٲ���
                        case 0x11:iScan[14]=Wv;break;// �������Ƶ��
                        case 0x12:iScan[15]=Wv;break;// ����Ƶ��
                        case 0x13:iScan[16]=Wv;break;// ���ٴ���
                        case 0x1d:m_BCompanyCode = buf[7];
                            m_WDevYear     = buf[8]*256+buf[9];
                            m_BDevMonth    = buf[10];
                            m_BDevDay      = buf[11];
                            m_BDevVer1     = buf[12];
                            m_BDevVer2     = buf[13];
                            m_BDevVer3     = buf[14];
                            ::Sleep(20);
                            break;
                        case 0x1e:m_WDevSYear = buf[7]*256+buf[8];//���������
                            m_WDevSNo   = buf[9]*256+buf[10];  //��ˮ��
                            ::Sleep(20);
                            break;
                        case 0x1f:BI = buf[5]-1;
                            if(BI<7) for(int i=7; i<17; i++)
                                m_BCName[BI][i-7] = buf[i];
                            ::Sleep(20);
                            break;
                        case 0x2f:
                            if (buf[2])
                            {
                                iScan[24] = buf[10];
                                iScan[25] = buf[8];
                            }
                            break;
                    }
                break;
            }
      }

      dBufCount -= 24;
      if (dBufCount > 0)
      {
         memmove(RecvBuf, RecvBuf + 24, dBufCount);
      }
      m_bAccept = false;                         // ���ݴ�����ɱ�־
      m_bProcess= false;                         // �������ݽ���
   }
   _endthread();
}

void __fastcall TfrmUart::FormCreate(TObject *Sender)
{
   dBufCount = 0;
   if(NULL==DataHandle)
      DataHandle=(HANDLE)_beginthread(DataThread,0,NULL);
   for(int i=0; i<30; i++) iScan[i] = 0;
}
//------------------------------------------------------------------------------
// ��ѯ�����Ƿ����   ���򿪴���
//------------------------------------------------------------------------------
static bool ComPortExists(const AnsiString &asName)
{
   HANDLE hPort;
   bool   b = false;
   DWORD dwError;
   //com10 ���ϵĶ˿ں���win��Ҫ�����⴦�� ��
   //��������Ϊ��"\\.\COM10"
//   int comNum = asName.SubString(3,2).ToInt();
   hPort = CreateFile(asName.c_str(),
                      GENERIC_READ | GENERIC_WRITE,
                        0,
                        0,
                        OPEN_EXISTING,
                        0,
                        0);
   if (hPort!=INVALID_HANDLE_VALUE)           // ���ڿɱ���
   {
      CloseHandle(hPort);                     // �رմ���
      b = true;
   }

   return b;
}
void __fastcall TfrmUart::OpenDevice(void)
{

   // if (XComm1->Opened)
  //  {
  //      CloseDevice();
  //  }
    if (!ComPortExists(m_sDevCom))
    {
        return;
    }


   XComm1->DeviceName = m_sDevCom;
   XComm1->BaudRate   = br57600;
   try
   {
      if(!XComm1->Opened) XComm1->OpenDevice();
   }
   catch ( ... )
   {

   }
   m_bConnected = XComm1->Opened;
   if(m_bConnected)
   {
      SendCommand(671,0,500);
      ::Sleep(300);
   }
}

void __fastcall TfrmUart::CloseDevice(void)
{
   m_bConnected = false;
   if (XComm1->Opened)
   {
        XComm1->CloseDevice();
   }
}

// �豸��ʼ������
void __fastcall TfrmUart::InitDevice()
{
   if(!SendCommand( 1,0,0)) return;              // ����ͷ��λ
   if(!SendCommand( 2,0,0)) return;              // ����ͷ������λ
   if(!SendCommand( 1,0,0)) return;              // ����ͷ��λ
}

// �������ͻ�����
void __fastcall TfrmUart::ClearSend(void)
{
    memset(ucSend, 0, sizeof (ucSend[0]) * 24);
}

// ���������У��
void __fastcall TfrmUart::SendCRC(void)
{
   ucSend[23] = 0;
   for(int i = 0; i < 23; i++)
   {
        ucSend[23] += ucSend[i];
   }
}

// ����ָ���
void __fastcall TfrmUart::CreateOrder(BYTE b4,BYTE b5,BYTE b6,BYTE b10)
{
   ClearSend();
   ucSend[0] = 1;
   ucSend[3] = b4;
   ucSend[4] = b5;
   ucSend[5] = b6;
   ucSend[9] = b10;     //ͳһ�ɵھ�λ
   if(b4 == 0x10)
   {
        ucSend[9] = 0;
        ucSend[7] = b10;
   }
   SendCRC();
}

/////////////////////////////////////////////////////////////////////////////
// ɨ��ͷָ��
void __fastcall TfrmUart::ScanCmd(BYTE b3,BYTE b5,BYTE b8,BYTE b9, BYTE b4)
{
   ClearSend();
   ucSend[0]  = 0x01;
   ucSend[2]  = b3;
   ucSend[3]  = b4;
   ucSend[4]  = b5;
   ucSend[7]  = b8;
   ucSend[8]  = b9;
   ucSend[9]  = channelm;  //��ͨ����1 ����������0

   SendCRC();
}

bool __fastcall WaitProcessAccept(int iDelay)
{
   TDateTime AThen,ANow;
   __int64 ibt = 0;
   WORD wDelay = 10000;
   AThen = Now();
   if(iDelay>0) wDelay = iDelay;
   while(m_bAccept&&(ibt<wDelay))
   {
      ::Sleep(10);
      Application->ProcessMessages();
      ANow = Now();
      ibt = MilliSecondsBetween(ANow,AThen);
   }
   return (ibt<wDelay);
}

bool __fastcall TfrmUart::WriteID(BYTE bbuf[],int iblock)
{
   bool bRet;
   BYTE buf[4096];
   memcpy(buf,bbuf,iblock*1024);
   for(int i=0; i<iblock; i++)
   {
      ClearSend();
      ucSend[0] = 0x01;
      ucSend[3] = 0x1e;
      ucSend[7] = i+1;
      SendCRC();
      m_bAccept = true;
      ::Sleep(200);
      DisplayData(0,ucSend,24);
      XComm1->SendData(ucSend,24);
      ::Sleep(500);
      m_bAccept = true;
      DisplayData(0,&buf[i*1024],1024);
      XComm1->SendData(&buf[i*1024],1024);
      ::Sleep(500);
      bRet = WaitProcessAccept(2000);
      if(bRet) bRet = bHasID&&(dwIDByte==1024);  // �п���д��1024�ֽ�
      if(!bRet) break;
   }
   return bRet;
}

// ָ��ͺ���
bool __fastcall TfrmUart::SendCommand(int iIndex,int param,int iDelay)
{
   if(m_bQuit) return false;
   AnsiString asCmds[34]={
              "����ͷ��λ",     "����ͷ����λ",       "����ͷ����",
              "ɨ������",       "�ӿ�����λ",         "�ӿ�λ",
              "װ��λ",         "�ӿ���������",       "�ӿ����彵��",
              "����",           "����xxx",            "ת��תRSλ",
              "���п����",     "�Ͽ���״̬���",     "���¶ȴ�ֵ",
              "���¶�Сֵ",     "���¶�",             "���¶ȴ�ֵ",
              "���¶�Сֵ",     "�������汾",         "�����к�",
              "�����Ƶ��",     "д���Ƶ��",         "����λ����",
              "д��λ����",     "д���к�",           "�п���",
              "�п���",         "������",             "�ط���",
              "���п�Ƶ��",     "д�п�Ƶ��",         "���п�����",
              "д�п�����"};                                              
   WORD Y,M,D;
   BYTE BH,BL,B;

   BH = (param>>8) & 0xff;
   BL = param & 0xff;

   switch(iIndex)
   {
   case   1: CreateOrder(1,0,0,channelm);    break; // ����ͷ����
   case   3: CreateOrder(3,0,0,0);    break; // ����ͷ��λ     �������
   case   4: CreateOrder(4,0,0,0);    break; // ����ͷ����λ   ����
   case   5: CreateOrder(5,0,0,channelm);    break; // ����ͷǿ��ɨ��


   case   6: CreateOrder(6,0,0,channelm);    break; // �������
   case   7: CreateOrder(7,0,0,channelm);    break; // ����ͷɨ������
   case  19: CreateOrder(0x13,0,0,0); break; // ��۲��Ƿ��п����
   case  13: CreateOrder(0x0d,0,0,0); break; // �Ƿ���ID��
   case  29: ScanCmd(1,0x1d,0,0);         break; // �������汾�ţ�����д
   case  31: CreateOrder(0x1f,0,0,1); break; // ��4KID��
   case 301: ScanCmd(1,0x1e,0,0);         break; // �����ذ����к�
   case 302: ScanCmd(0,0x1e,0,0);                // д���ذ����к�
             BH        = m_WDevSYear/256;        // 2015 0001
             BL        = m_WDevSYear%256;        //
             ucSend[7] = BH;
             ucSend[8] = BL;
             BH        = m_WDevSNo/256;
             BL        = m_WDevSNo%256;
             ucSend[9] = BH;
             ucSend[10]= BL;
             SendCRC();
             break;
   case 311: ScanCmd(1,0x1f,0,0);                // ��ע�������ݰ�
             ucSend[5] = param+1;
             SendCRC();
             break;
   case 312: ScanCmd(0,0x1f,0,0);                // дע�������ݰ�
             ucSend[5] = param+1;
             for(int i=0; i<10; i++)
             {
                B = m_BCName[param][i];
                ucSend[7+i] = B;
             }
             SendCRC();
             break;

                ucSend[7]=0;
                SendCRC();


   case 601: ScanCmd(1,0,0,0);      break;       // ��ɨ��ͷ���Ƶ��
   case 602: ScanCmd(0,0,BH,BL);    break;       // дɨ��ͷ���Ƶ��

   case 611: ScanCmd(1,2,0,0);      break;       // ��Xԭ��-����
   case 612: ScanCmd(0,2,BH,BL);    break;       // дXԭ��-����
   case 621: ScanCmd(1,3,0,0);      break;       // ������-����
   case 622: ScanCmd(0,3,BH,BL);    break;       // д����-����
   case 631: ScanCmd(1,7,0,0);      break;       // ������1 list
   case 632: ScanCmd(0,7,BH,BL);    break;       // д����1 list
   case 641: ScanCmd(1,8,0,0);      break;       // ���������
   case 642: ScanCmd(0,8,BH,BL);    break;       // д�������
   case 651: ScanCmd(1,9,0,0);      break;       // ������Ŵ���
   case 652: ScanCmd(0,9,BH,BL);    break;       // д����Ŵ���
   case 661: ScanCmd(1,4,0,0);      break;       // ��Xԭ��-����
   case 662: ScanCmd(0,4,BH,BL);    break;       // дXԭ��-����
   case 671: ScanCmd(1,6,0,0);      break;       // �����Դ��ڳ���
   case 672: ScanCmd(0,6,BH,BL);    break;       // д���Դ��ڳ���
   case 681: ScanCmd(1,0x0a,0,0);   break;       // ����������
   case 682: ScanCmd(0,0x0a,BH,BL); break;       // д��������
   case 691: ScanCmd(1,0x0b,0,0);   break;       // �����ԷŴ���
   case 692: ScanCmd(0,0x0b,BH,BL); break;       // д���ԷŴ���

   case 701: ScanCmd(1,1,0,0);   SendCRC();  break;       // ������Ƶ��
   case 702: ScanCmd(0,1,BH,BL);  SendCRC();  break;       // д����Ƶ��
   case 711: ScanCmd(1,0x0e,0,0);SendCRC();  break;       // ���Լ�����ɫ
   case 712: ScanCmd(0,0x0e,BH,BL);SendCRC(); break;       // д�Լ�����ɫ
   case 721: ScanCmd(1,0x0f,0,0); SendCRC();  break;       // ���������
   case 722: ScanCmd(0,0x0f,BH,BL);SendCRC(); break;       // д�������
   case 731: ScanCmd(1,0x10,0,0);  SendCRC(); break;       // ��������ٲ���
   case 732: ScanCmd(0,0x10,BH,BL);SendCRC(); break;       // д������ٲ���
   case 741: ScanCmd(1,0x11,0,0);  SendCRC(); break;       // ���������Ƶ��
   case 742: ScanCmd(0,0x11,BH,BL);SendCRC(); break;       // д�������Ƶ��
   case 751: ScanCmd(1,0x12,0,0);  SendCRC(); break;       // ���������Ƶ��
   case 752: ScanCmd(0,0x12,BH,BL);SendCRC(); break;       // д�������Ƶ��
   case 761: ScanCmd(1,0x13,0,0);  SendCRC(); break;       // �������������
   case 762: ScanCmd(0,0x13,BH,BL);SendCRC(); break;       // д�����������



   case 801: InitCmd_add(1, 0x12, (param>>16)&0xff, 0, 0);  break;       // ����·����
   case 802: InitCmd_add(0, 0x12, (param>>16)&0xff, BH,BL); break;        // д��·����

   case 811: InitCmd_add(1, 0x11, (param>>16)&0xff, 0, 0);  break;       // ��X��������
   case 812: InitCmd_add(0, 0x11, (param>>16)&0xff, BH,BL); break;        // дX��������
   
   case 821: InitCmd_add(1, 0x15, 0, 0, 0);  break;                      // ��Xɨ�볤��
   case 822: InitCmd_add(0, 0x15, 0, BH,BL); break;                       // дXɨ�볤��

   case 831: InitCmd_add(1, 0x18, (param>>16)&0xff, 0, 0);  break;       // ��yɨ��λ��
   case 832: InitCmd_add(0, 0x18, (param>>16)&0xff,BH,BL); break;         // дyɨ��λ��

   case 851: CreateOrder(0x10, 0, 0, (param>>16)&0xff); break;      // �߹�·��
   case 852: CreateOrder(0x19, 0, 0, 0); break;        // y�ᵽ����
   case 853: CreateOrder(0x14, 0, 0, 0); isXscan = true; break;    // X���������

   case 860:  // ���¶�
        ScanCmd(1,0,0,0,0x16);
        ucSend[7] = 0;
        SendCRC();
        break;
   case 861:  // ���¿�
       ClearSend();
       ucSend[0] = 1;
       ucSend[2] = 1;
       ucSend[3] = 2;
       ucSend[4] = 0x2f;
       SendCRC();
        break;
   case 862:  // д�¿�
       ClearSend();
       ucSend[0] = 1;
       ucSend[3] = 2;
       ucSend[4] = 0x2f;
       ucSend[8] = iScan[25];
       ucSend[10] = iScan[24];
       SendCRC();
       break;

   case 871:
       InitCmd_add(1,2, 0,  0, 0);
       ucSend[4] = 0xc;
       SendCRC();
       break;
   case 872:
       InitCmd_add(0,2, 0, iScan[27]/256,  iScan[27]%256);
       ucSend[4] = 0xc;
       SendCRC();
       break;

    case 873:
       InitCmd_add(1,2, 0,  0, 0);
       ucSend[4] = 0xd;
       SendCRC();
       break;
    case 874:
       InitCmd_add(0, 2, 0, iScan[28]/256,  iScan[28]%256);
       ucSend[4] = 0xd;
       SendCRC();
       break;

   }


   DisplayData(0,ucSend,24);


   m_bBCScan = (iIndex==6) || (iIndex==853);                      // �������
   m_bScan   = (iIndex==5 || iIndex==1);                          // ǿ�ƶ���

      m_bAccept = true;
      if(iIndex==5 || iIndex==1) ::Sleep(100);

      dBufCount = 0;
      XComm1->SendData(ucSend,24);
      if(iIndex==5 || iIndex==1) ::Sleep(100);
      bool bRet = WaitProcessAccept(iDelay + 500);

      if((iIndex==0x1f)&&bRet)
      {
         m_bReadID = true;
         m_bAccept = true;
         bRet = WaitProcessAccept(iDelay);
         m_bReadID = false;
      }


   return bRet;
}

bool LoadDevceParam(void)
{
   BYTE b;
   AnsiString s1;
   if(!frmUart->SendCommand(29,0,3000)) return false;   // �������汾�ţ�����д
   ::Sleep(300);
   if(!frmUart->SendCommand(301,0,3000)) return false;  // �����ذ����к�
   ::Sleep(300);
   if(!frmUart->SendCommand(311,0,3000)) return false;  //����˾����3��
   ::Sleep(300);
   if(!frmUart->SendCommand(311,1,3000)) return false;
   ::Sleep(300);
   if(!frmUart->SendCommand(311,2,3000)) return false;
   m_sCompanyName = "";
   for(int i=0; i<3; i++)
   for(int j=0; j<10; j++)
   {
      b = m_BCName[i][j];
      if( (b!=0)&&(b!=255) )
      {
         s1 = " ";
         s1[1] = b;
         m_sCompanyName+=s1;
      }
   }
   return true;
}






/*********************************************************************************************************
** Function name:       Func_BARCODEBITcount(INT8U n,INT8U k)
** Descriptions:        ����ֵ����
** input parameters:    n :ͬ�����ݵĸ��� k:��������(=0 ������Ϊ0��=1������Ϊ1)
** output parameters:   ��
** Returned value:      ��
*********************************************************************************************************/
void BarCode::Func_BARCODEBITcount(int n,
                          int k,
                          int BARCODE_BIT,
                          int BARCODE_BITERR,
                          unsigned int &BarCode)
{
    int a,b=0;
    if(k==1)
    {
        a=n/BARCODE_BIT;					//���ݸ���ת��Ϊ����λ��
        b=n%BARCODE_BIT;
        if(b>BARCODE_BITERR)					//ʣ�²���>�������
        {
            a++;
        }
        for(;a>0;a--)
        {
            BarCode = (BarCode<<1)&0xfffffffe;	       //����ֵ
        }
    }
    else
    {
        a=n/BARCODE_BIT;					//���ݸ���ת��Ϊ����λ��
        b=n%BARCODE_BIT;
        if(b>BARCODE_BITERR)					//ʣ�²���>�������
        {
            a++;
        }
        for(;a>0;a--)
        {
            BarCode = (BarCode<<1)|0x00000001;	       //����ֵ
        }
    }
}

/*********************************************************************************************************
** Function name:       Func_Barcode_COUNT()
** Descriptions:        ������ֵ����
** input parameters:
** output parameters:   ��
** Returned value:      ��
*********************************************************************************************************/
void BarCode::Func_Barcode_COUNT(unsigned int &BarCode,
                        WORD ADC_Buffer[],
                        int BARCODE_BIT,        // 1 List
                        int BARCODE_BITERR,     // ��������
                        int BARCODE_LENGTH,     // ����λ��
                        int ADC_Pointer         // ȫ�̳���
                        )
{
    int  i=0,j=0,k=0,l=0 ;
    int  n=0 ;
    BarCode=0 ;                                 //����ֵ����
    for(;i + POINTOFFSET < ADC_Pointer;i++)					//Ѱ����ʼλ��
    {
        if(ADC_Buffer[POINTOFFSET+i]<=60000)
        {
            break;
        }                                       //����С��60000����������
    }
    for(;i + POINTOFFSET < ADC_Pointer;i++)
    {
        if(ADC_Buffer[POINTOFFSET+i]>60000)				//�ҵ�����58000����,��ʼλ�ý���,��ʼ��������
        {
            k=1;
            break;
        }
        j++;
        if(j>BARCODE_BIT+(BARCODE_BITERR/3))    //����λ�ó���1λ������������,��ʼλ�ý���,��ʼ��������
        {
            k=0;
            break;
        }
    }
    n=0;
    l=0;
    for(;i + POINTOFFSET < ADC_Pointer;i++)					//��������ֵ
    {
        if(l<(BARCODE_LENGTH-1))
        {
            if(k==0)
            {
                n++;
                if(ADC_Buffer[POINTOFFSET+i]>60000)
                {
                    n--;
                    Func_BARCODEBITcount(n, k, BARCODE_BIT, BARCODE_BITERR, BarCode);          //����λ����
                    l=l+(n/BARCODE_BIT);                //���㱾�β��λ��
                    if((n%BARCODE_BIT)>BARCODE_BITERR)	//��������
                    {
                        l++;
                    }
                    k=1;
                    n=0;
                    i--;
                }
            }
            else
            {
                n++;
                if(ADC_Buffer[POINTOFFSET+i]<=60000)
                {
                    n--;
                    Func_BARCODEBITcount(n,k, BARCODE_BIT, BARCODE_BITERR, BarCode);          //����λ����
                    l=l+(n/BARCODE_BIT);                //���㱾�β��λ��
                    if((n%BARCODE_BIT)>BARCODE_BITERR)	//��������
                    {
                        l++;
                    }
                    k=0;
                    n=0;
                    i--;
                }
            }
        }
    }
    i=l-(BARCODE_LENGTH-1);
    if(i!=0)
    {
        for(;i>0;i--)
        {
            BarCode = (BarCode>>1)&0x7fffffff;          //�������λ��ȥ��
        }
    }
    i=0;
    j=(BARCODE_LENGTH-1)/8;
    if(((BARCODE_LENGTH-1)%8)!=0)
    {
        j++;
    }
    n=j*8-(BARCODE_LENGTH-1) ;
    for(;i<n;i++)
    {
        BarCode = (BarCode<<1)&0xfffffffe;				//3�ֽڶ���
    }
}


