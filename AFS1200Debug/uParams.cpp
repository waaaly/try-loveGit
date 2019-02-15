#pragma hdrstop

#include <IniFiles.hpp>

#include "uParams.h"
#include "uPeak.h"

#pragma package(smart_init)

AnsiString m_sDevCom = "Com1";         // �豸ͨѶ����
AnsiString m_sPrtCom;                  // ���ô�ӡ������

AnsiString m_sDevName   = "AFS-1000 ����ӫ����Ŀ����������";
AnsiString m_sCopyRight = "������������Ƽ����޹�˾";

BYTE       m_BCompanyCode = 0;                   // ��˾����
WORD       m_WDevYear;                           // �豸���
BYTE       m_BDevMonth;                          //     �·�
BYTE       m_BDevDay;                            //     ��
BYTE       m_BDevVer1;                           //     �汾1
BYTE       m_BDevVer2;                           //     �汾2
BYTE       m_BDevVer3;                           //     �汾3
WORD       m_WDevSYear;                          // �������к���
WORD       m_WDevSNo;                            // �������к���ˮ��
BYTE       m_BCName[7][10];                      // ��д���кŵ����ݰ�

AnsiString m_sCompanyName = "������������";      // ��˾����

WORD       m_wDots = 154;    // ɨ������ݸ���    
AnsiString m_sWorkDir;       // ����Ŀ¼
AnsiString m_sBaseDir;       // ������ĿĿ¼
AnsiString m_sTestDir;       // ����Ŀ¼
AnsiString m_sItemDir;       // ��ĿHEXĿ¼
AnsiString m_sBackDir;       // ������Ŀ��ʷĿ¼
AnsiString m_sConfig;        // �����ļ�����
AnsiString m_sBCDir;         // ����ͼ��Ŀ¼

AnsiString m_sChkDate= "2016-03-31";
AnsiString m_sChkNow = "2016-02-23";
AnsiString m_sBCRT   = "CRP";
AnsiString m_sBCBC   = "05988";        // �����ʽ�༭-��Ŀ���� ����
bool       m_bBCAuto = true;           // �Ƿ��Զ���������
BYTE       m_BBCLen  = 5;              // �ֹ���������볤��
BYTE       m_BBFont  = 5;              // ���������ֺ�
BYTE       m_BBCHeight = 6;            // ����߶�
BYTE       m_BBCBit  = 17;             // ����bit��
BYTE       m_BBCPC   = 6;              // ��Ʒλ��
BYTE       m_BBCYear = 3;              // ��λ��
BYTE       m_BBCMonth= 4;              // ��λ��
BYTE       m_BBCBatch= 4;              // ����λ��

bool       m_bReversal = false;        // ������ת
DWORD      m_wRevVal;                  // ��ת��׼ֵ

WORD       m_WStartYear   = 2014;                // �Լ�����ʼ���
BYTE       m_BBCRatio     = 50;                  // �������Ĭ��50

//float      m_fBreak      = 1.1;                  // �����б�ʱ仯��
int        m_iBreak      = 10;                   // ���������ֵ�仯

DWORD      m_WBCDots     = 1660;                  // �������ݵ����

//------------------------------------------------------------------------------
// �������
//------------------------------------------------------------------------------
void __fastcall SaveComParam(void)
{
   TIniFile *f;
   f = new TIniFile(m_sConfig);
   f->WriteString( "System","DevCom",     m_sDevCom);
   f->WriteString( "System","PrtCom",     m_sPrtCom);
   f->WriteInteger("System","Reversal",   m_bReversal);
   f->WriteInteger("System","RevVal",     m_wRevVal);
   f->WriteInteger("System","BCRatio",    m_BBCRatio);
   f->WriteString( "Company","Name",      m_sCompanyName);
   f->WriteString( "Config","ReportTitle",m_sBCRT);
   f->WriteString( "Config","Barcode",    m_sBCBC);


   f->WriteInteger("System","Dots",       m_wDots);
//   f->WriteFloat(  "System","FBreak",     m_fBreak);
   f->WriteInteger("System","IBreak",     m_iBreak);
   f->WriteInteger("System","BCAuto",     m_bBCAuto);
   f->WriteInteger("System","BCLen",      m_BBCLen);
   f->WriteInteger("System","BCBit",      m_BBCBit);
   f->WriteInteger("System","BCPC",       m_BBCPC);
   f->WriteInteger("System","BCYear",     m_BBCYear);
   f->WriteInteger("System","BCMonth",    m_BBCMonth);
   f->WriteInteger("System","BCBatch",    m_BBCBatch);
   f->WriteString( "System","DevName",    m_sDevName);
   f->WriteString( "System","CopyRight",  m_sCopyRight);
   f->WriteInteger("System","StartYear",  m_WStartYear);
   f->WriteInteger("System","BarCodeDots",m_WBCDots);
   f->WriteString( "System","ChkNow",     m_sChkNow);
   f->WriteString( "System","BBFont",     m_BBFont);         // ���������ֺ�
   f->WriteString( "System","BBCHeight",  m_BBCHeight);      // ����߶�
   delete f;
}

void __fastcall LoadSTypeCaption(TLabeledEdit *le)
{
   TIniFile *f;
   AnsiString asCaption,asIdent;
   f = new TIniFile(m_sConfig);
   asIdent.printf("TypeCaption%d",le->Tag);
   asCaption = f->ReadString("TypeCaption",asIdent,le->EditLabel->Caption);
   le->EditLabel->Caption = asCaption;
   delete f;
}

//------------------------------------------------------------------------------
// ��ȡ����
//------------------------------------------------------------------------------
void __fastcall LoadComParam(void)
{
   TIniFile *f;
   f = new TIniFile(m_sConfig);
   m_sDevCom = f->ReadString(      "System","DevCom",     m_sDevCom);
   m_sPrtCom = f->ReadString(      "System","PrtCom",     m_sPrtCom);
   m_sCompanyName = f->ReadString( "Company","Name",      m_sCompanyName);
   m_bReversal    = f->ReadInteger("System","Reversal",   m_bReversal);
   m_wRevVal      = f->ReadInteger("System","RevVal",     m_wRevVal);
   m_BBCRatio     = f->ReadInteger("System","BCRatio",    m_BBCRatio);
   m_sBCRT        = f->ReadString( "Config","ReportTitle","CRP");
   m_sBCBC        = f->ReadString( "Config","Barcode",    "05988");

   m_wDots        = f->ReadInteger("System","Dots",       m_wDots);
//   m_fBreak       = f->ReadFloat(  "System","FBreak",     m_fBreak);
   m_iBreak       = f->ReadInteger("System","IBreak",     m_iBreak);
   m_bBCAuto      = f->ReadInteger("System","BCAuto",     m_bBCAuto);
   m_BBCLen       = f->ReadInteger("System","BCLen",      m_BBCLen);
   m_BBCBit       = f->ReadInteger("System","BCBit",      m_BBCBit);
   m_BBCPC        = f->ReadInteger("System","BCPC",       m_BBCPC);
   m_BBCYear      = f->ReadInteger("System","BCYear",     m_BBCYear);
   m_BBCMonth     = f->ReadInteger("System","BCMonth",    m_BBCMonth);
   m_BBCBatch     = f->ReadInteger("System","BCBatch",    m_BBCBatch);
   m_BBCBit       = m_BBCPC    + m_BBCYear +
                    m_BBCMonth + m_BBCBatch;
   m_sDevName     = f->ReadString( "System","DevName",    m_sDevName);
   m_sCopyRight   = f->ReadString( "System","CopyRight",  m_sCopyRight);
   m_WStartYear   = f->ReadInteger("System","StartYear",  m_WStartYear);
   m_WBCDots      = f->ReadInteger("System","BarCodeDots",m_WBCDots);
   m_sChkDate     = f->ReadString( "System","ChkDate",    m_sChkDate);
   m_sChkNow      = f->ReadString( "System","ChkNow",     m_sChkNow);
   m_BBFont       = f->ReadInteger("System","BBFont",     m_BBFont);
   m_BBCHeight    = f->ReadInteger("System","BBCHeight",  m_BBCHeight);
   delete f;
}

void __fastcall LoadTestList(TStrings *sl)       // ��ȡ�����б�
{
   TIniFile *iniFile;
   int iAttributes = 0,iPos;
   TSearchRec sr;
   AnsiString asIniFile,asPath,asF,asV;
   TDateTime dt;
   AnsiString asDT;
   TStringList *sl1 = new TStringList;
   sl->Clear();
   asIniFile = m_sTestDir + "TestDesc.ini";      // ����Ŀ¼�ı�׼Ʒѡ��
   iniFile   = new TIniFile(asIniFile);
   iniFile->ReadSectionValues("Desc",sl);
   delete iniFile;
   iAttributes |= faReadOnly;
   iAttributes |= faHidden;
   iAttributes |= faSysFile;
   iAttributes |= faVolumeID;
   iAttributes |= faDirectory;
   iAttributes |= faArchive;
   iAttributes |= faAnyFile;
   for(int i=0; i<sl->Count; i++)
   {
      asV  = sl->Strings[i];
      iPos = asV.Pos("=");
      asV  = asV.SubString(1,iPos-1);
      asPath = m_sTestDir + asV + "\\*.TST";
      if (FindFirst(asPath,iAttributes,sr)==0)
      {
         do
         {
            if ((sr.Attr&iAttributes)==sr.Attr)
            {
               dt =  FileDateToDateTime(sr.Time);
               asDT = FormatDateTime("YYYY-MM-DD HH:MM:SS",dt);
               sl1->Append(asDT + "|" + sr.Name);
            }
         } while (FindNext(sr) == 0);
         FindClose(sr);
      }
   }
   sl1->Sort();
   sl->Clear();
   for(int i=0; i<sl1->Count; i++)
   {
      asDT = sl1->Strings[i];
      iPos = asDT.Pos("|");
      asDT.Delete(1,iPos);
      iPos = asDT.Pos(".TST");
      asDT = asDT.SubString(1,iPos-1);
      if(!asDT.IsEmpty()) sl->Insert(0,asDT);
   }
   delete sl1;
}

// �����ļ�ID�ļ���
AnsiString TestFName(AnsiString asTest,AnsiString asExt)
{
   AnsiString asFName;
   asFName = m_sTestDir + asTest +
                "\\" + asTest + asExt;           // ʵ����Ŀ�ļ���
   return asFName;
}

AnsiString AFSFile(AnsiString asPath,            // ·��
                   AnsiString asTestNo,          // AFS�ļ���
                   int iCurveBa,
                   int iIndex)
{
   AnsiString asName;
   asName.printf("%s\\%s\\%s_%d_%d.AFS",         // ��ǰ��������ǰŨ�ȶ�Ӧ�Ĳ��������ļ���
      asPath.c_str(),asTestNo.c_str(),
      asTestNo.c_str(),iCurveBa,iIndex);         // [·��][ʵ����\\][������]_[������]_[Ũ�ȱ��].AFS
   return asName;
}

// װ�ط���㷽���б�
void __fastcall LoadPeakCalc(TComboBox *cbCalc)
{
   AnsiString asCalcs[12]={
              "0-ӫ��ƽ��",
              "1-ӫ�����",
              "2-ӫ�����",
              "3-�����ƽ��",
              "4-ӫ�����ֵƽ��",
              "5-ӫ�����ֵ���",
              "6-ӫ�����ֵ���",
              "7-ӫ����߷�ƽ��",
              "8-ӫ����߷����",
              "9-ӫ����߷����",
              "10-ӫ�ⳣ�����",
              "11-��Ȳ�ƽ��"};
   TIniFile *f;
   AnsiString ss;
   f = new TIniFile(m_sConfig);
   cbCalc->Items->Clear();
   if(f->SectionExists("PeakCalc"))
   {
      f->ReadSectionValues("PeakCalc",cbCalc->Items);
      for(int i=0; i<cbCalc->Items->Count; i++)
      {
         ss = cbCalc->Items->Strings[i];
         ss.Delete(1,ss.Pos("="));
         cbCalc->Items->Strings[i] = ss;
      }
   } else
   {
      for(int i=0; i<12; i++)
         cbCalc->Items->Append(asCalcs[i]);
   }
   delete f;
}

