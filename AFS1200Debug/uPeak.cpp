#include <math.h>
#include <IniFiles.hpp>
#pragma hdrstop

#include "uPeak.h"

#pragma package(smart_init)

float      m_fBlankCheck = 1.05;                 // �Զ�����������
float      m_fBlankRatio = 1.0;                  // ���ױ���
WORD       m_WBase;                              // ����ķ��

// ----------------------------------------------------------------------------
//  ֱ�����LinearFit(x,y,n,a)                                                 
//  ����: ���y=a+b*x                                                          
//  ����: x,y    : ����ֵ                                                      
//        n      : ���ݸ���                                                    
//  ʹ��0-ֱ����С���˷����ԭ��.doc��ֱ����ϵ��㷨                           
//  ����: a[0] : a                                                             
//        a[1] : b                                                             
//                                                                             
// ----------------------------------------------------------------------------
void LinearFit(double x[],double y[],int n,double a[])
{
   double sx=0.0, sy=0.0, sxy=0.0, sxx=0.0;
   double ddd;
   for (int i=0; i<n; i++ )
   {
      sx  = sx  + x[i];                          // �Ա����ۼӺ�
      sy  = sy  + y[i];                          // ������ۼӺ�
      sxy = sxy + x[i]*y[i];                     // �Ա���������˻��ۼӺ�
      sxx = sxx + x[i]*x[i];                     // �Ա���ƽ����
   }
   ddd  = ( n * sxx - sx * sx );
   if(ddd==0.0) ddd = 1;
   a[0] = ( sxx * sy - sx * sxy ) / ddd;         // ��ϲ���a
   a[1] = ( n * sxy - sx * sy )   / ddd;         // ��ϲ���b
}

void __fastcall QuickSort(DWORD *a,int i,int j)
{
   DWORD k,temp;
   int m,n;
   if(i==j) return;
   if(i<j)
   {
      m = i;
      n = j;
   } else
   {
      m = j;
      n = i;
   }
   k = a[(i+j)/2];                     // ѡȡ�Ĳ���
   do {
      while(a[m]<k&&m<j) m++;          // �������ұ�k���Ԫ��
      while(a[n]>k&&n>i) n--;          // ���ҵ����ұ�kС��Ԫ��
      if(m<=n)                         // ���ҵ��������������򽻻�
      {
         temp = a[m];
         a[m] = a[n];
         a[n] = temp;
         m++;
         n--;
      }
   }while(m<=n);
   if(m<j) QuickSort(a,m,j);          
   if(n>i) QuickSort(a,i,n);
}

int __fastcall CalcSingleTop(                    // ���㵥����嶥��ȷλ��
                DWORD buf[],                     // ���ݻ�����
                int ifrom,                       // �����俪ʼ
                int ito)                         // ���������
{
   DWORD d1,d2,d3,dMax = 0;
   int iPV[2000],iPP[2000],iPC=0,iPMax=0;        // ��ֵ,λ��,�����,�������,����ֵ
   for(int i=ifrom+1; i<ito-1; i++)              // Ѱ���������еķ�
   {
      d1 = buf[i-1];
      d2 = buf[i];
      d3 = buf[i+1];
      if( (d2>=d1)&&(d2>=d3) )                   // �Ƿ�
      {
         iPV[iPC] = buf[i];                      // ��ֵ
         iPP[iPC] = i;                           // ��λ��
         if(buf[i]>dMax)                         // ����������ֵ��
         {
            iPMax = iPC;                         // �������
            dMax  = buf[i];                      // ����ֵ
         }
         iPC++;                                  // ����+1
      }
   }
   if(iPC==0) iPC = (ifrom+ito)/2;               // û���ҵ���,���м�λ��
   else iPC = iPP[iPMax];                        // �ҵ���
   int i_from,i_to;
   i_from = iPC;
   i_to   = iPC;
   while(buf[i_to]==buf[i_from])
   {
      i_to++;
   }
   iPC = (i_from+i_to-1)/2;
   return iPC;                                   // ���ط��λ��
}

int __fastcall FT1(                              // Ѱ�ҷ�����λ��(һ��0��0)
               float fbuf1[],                    // 1��
               int   ipos,                       // ��ʼλ��
               int   idir,                       // �������� -1���� 1����
               int   iend)                       // �յ�λ��
{
   // �����ֹλ��:һ��0��0(���ŷ����仯)
   // ����30%λ�ÿ�ʼ,Ԥ����λ�÷���ƫ�Ƶ������������
   int ival,ioffset;
   float foffset;
   foffset = (iend-ipos)*0.3;
   if(idir==-1)
   {
      ival = ipos + foffset;
      while(ival>iend)
      {
         if(fbuf1[ival]>0) ival--;               // ����0
         else break;
      }
      ival++;                                    // ���ŷ����仯��λ��ip1
   } else
   {
      ival = ipos + foffset;
      while(ival<iend)
      {
         if(fbuf1[ival]<0) ival++;
         else break;
      }
      ival--;
   }
   return ival;
}

float CalcArea(DWORD buf[],                      // ���ݻ�����
               int   DotCount,                   // ���ݵ���
               int   ipos,                       // �������λ��
               int   iCount,                     // ���
               int   &ifrom,                     // �忪ʼ
               int   &ito)                       // �����
{
   int    iBase, i, j, ifrom1, ito1;
   double x[1000], y[1000], a[2];
   float  fValue, fV;
   ifrom1 = ipos;                                // �����
   ito1   = ipos;                                // ���յ�
   j      = ito1 - ifrom1 + 1;
   while(j<m_WBase)
   {
      if(buf[ifrom1-1]>=buf[ito1+1])             // ��ߵĴ�
      {
         if(ifrom1-1>0) ifrom1--;                // ���û���ܳ���������
         else ito1++;                            // ����ܳ�����
      } else                                     // �ұߵĴ�
      {
         if(ito1+1<DotCount-1) ito1++;           // �ұ�û���ܳ�����
         else ifrom1--;                          // �ұ��ܳ�������
      }
      j = ito1 - ifrom1 + 1;
   }
   ifrom  = ifrom1;
   ito    = ito1;
   iBase  = iCount / 2;
   ifrom1 = ipos -iBase;                         // �����
   ito1   = ifrom1 + iCount - 1;                 // ���յ�
   if(ito1>DotCount-1) ito1 = DotCount - 1;
   i = 0;
   for(j=ifrom1; j<ifrom; j++)
   {
      x[i] = j;
      y[i] = buf[j];
      i++;
   }
   for(j=ito+1; j<=ito1; j++)
   {
      x[i] = j;
      y[i] = buf[j];
      i++;
   }
   LinearFit(x,y,iCount-m_WBase,a);                // �������
   fValue = 0.0;
   for(int j=ifrom; j<=ito; j++)
   {
      fV = a[1]*j+a[0];                          // ��ǰλ�û��߱���
      fV = buf[j] - fV;                          // �����׵Ľ��
      if(fV>0) fValue = fValue + fV;             // ֻ�е����������0���ۻ����
   }
   return fValue;
}

float CalcArea10(DWORD buf[],                    // ���ݻ�����
               int   DotCount,                   // ���ݵ���
               int   ipos,                       // �������λ��
               int   iCount)                     // ���
{
   int ifrom,ito,iBase;
   double x[1000],y[1000],a[2];
   float fValue,fV;
   ifrom = ipos - iCount/2;                      // �����
   ito   = ifrom + iCount - 1;                   // ���յ�
   if(ifrom<0)                                   // ������߽߱�
   {
      ifrom = 0;
      ito   = ifrom + iCount - 1;                // ���յ�
   } else if(ito>DotCount-1)                     // �����ұ߽߱�
   {
      ito   = DotCount-1;
      ifrom = ito - iCount + 1;
   }
   iBase = (iCount - m_WBase)/2;                 // m_WBase���ȡ������
   for(int j=0; j<iBase; j++)                    // �������������ȡ
   {
      x[j] = ifrom + j;
      y[j] = buf[ifrom+j];
      x[iBase*2-1-j] = ito - j;
      y[iBase*2-1-j] = buf[ito-j];
   }
   LinearFit(x,y,iBase*2,a);                     // �������
   fValue = 0.0;
   iBase = m_WBase / 2;                          // ��������ȡ������
   for(int j=ipos-iBase; j<=ipos+iBase; j++)
   {
      fV = a[1]*j+a[0];                          // ��ǰλ�û��߱���
      fV = buf[j] - fV;                          // �����׵Ľ��
      if(fV>0) fValue = fValue + fV;             // ֻ�е����������0���ۻ����
   }
   return fValue;
}

// �Զ������ֵλ�úʹ�С
// 0-ӫ��ƽ��
// 1-ӫ�����
// 2-ӫ�����
// 3-�����ƽ��
// 4-ӫ�����ֵƽ��
// 5-ӫ�����ֵ���
// 6-ӫ�����ֵ��� �������
// 7-ӫ����߷�ƽ��
// 8-ӫ����߷����
// 9-ӫ����߷���� �������
// 10-ӫ�ⳣ�����  �������
// 11-�嶥�Գ�ƽ��
void __fastcall CalcPeak(
                DWORD   buf[],                   // ���ݻ�����
                int     DotCount,                // ���ݵ���
                ID_PEAK pdsSrc[],                // ��ֵ���䶨��
                int     PeakCount,               // ��ֵ����
                int     BasePeak,                // ��׼��λ��
                BYTE    BBlank,                  // �Ƿ������
                DWORD   &dwBlank,                // ����ֵ
                ID_PEAKRESULT &pr)               // ��ֵ���
{
   DWORD dwMin  = 1e16;                          // ��Сֵ
   ID_PEAK pds[10];
   DWORD db[400];                                // ���Է�ֵ���Ҹ�10�㻺����
   DWORD dMax=0, dValue;                         // ���������ֵ
   int   ipw;                                    // ȡ�����,���Է�ֵ����ʼλ��
   float *fbuf1,*fbuf2;
   int ifrom,ito,ipos,i,j,icnt,if1,it1;
   float fValue,fK,fB,fV,d1,d2;
   float d10,d5,d0;
   float f_WBase = 0.4;                          // �������ȡ����������

   memset(&pr,0,sizeof(pr));                     // �����ʼ��
   m_WBase = pdsSrc[0].Count * f_WBase;          // �������ȡ������
   if(m_WBase==0) m_WBase = 1;                   // 
   for(i=0; i<DotCount; i++)                     // �ҳ����/��Сֵ��λ��
      if(buf[i]<dwMin) dwMin = buf[i];           // ��Сֵ
   dwBlank = dwMin;                              // ����ֵ
   fbuf1=(float *)malloc(DotCount*sizeof(float));// һ��
   memset(fbuf1,0,sizeof(fbuf1));
   for(j=2; j<DotCount-3; j++)
   {
      d2 = float(buf[j+3]);
      d1 = float(buf[j-2]);
      fbuf1[j] = (d2-d1)/5.0;
   }
   fbuf2=(float *)malloc(DotCount*sizeof(float));// ����
   memset(fbuf2,0,sizeof(fbuf2));
   for(j=4; j<DotCount-6; j++)
   {
      d10 = float(buf[j+6]);
      d5  = float(buf[j+1]);
      d0  = float(buf[j-4]);
      fbuf2[j] = (d10-2*d5+d0)/25;
   }
   int iAllTop, iMaxPeak, iOffset;               // ��߷��λ ��߷���� ����ƫ��
   int ipf,ipt,ipc,iStyle;
   for(i=0; i<PeakCount; i++) pds[i]=pdsSrc[i];
   if( (BasePeak<=0) || (BasePeak>PeakCount) )   // ��׼���޶�����߳��������
      iAllTop = CalcSingleTop(buf,0,DotCount);   // �����������ߵ�λ��
   else {
      ipf = pds[BasePeak-1].From;                // ��׼�����俪ʼ
      ipt = pds[BasePeak-1].To;                  // ��׼���������
      iAllTop = CalcSingleTop(buf,ipf,ipt);      // �ҳ���׼������λ��
   }
   for(i=0; i<PeakCount; i++)                    // ȷ����߷�����
   if( (iAllTop>=pds[i].From) &&
       (iAllTop<=pds[i].To) )
   {
      iOffset  = iAllTop - (pds[i].From + pds[i].To)/2;
      break;
   }
   for(i=0; i<PeakCount; i++)                    // �������������ֹλ��
   {
      ipf = pds[i].From + iOffset;
      ipt = pds[i].To   + iOffset;
      if(ipf<0) pds[i].From = 0;                 // ��㲻��С��0
      else pds[i].From = ipf;
      if(ipt>DotCount-1) pds[i].To = DotCount-1; // �յ㲻�ܴ������ݵ��ܸ���
      else pds[i].To = ipt;
   }
   for(i=0; i<PeakCount; i++)                    // ����ÿ������ķ�ֵ��λ��
   {
      ifrom = pds[i].From;
      ito   = pds[i].To;
      ipos  = (ifrom+ito)/2;                     // ֱ������߷�ȷ���������λ��
      pr.Position[i] = ipos;                     // ����嶥��ȷλ��
      iStyle = pds[i].Style;                     // ���㷽ʽ
      switch(iStyle){
      case 0 :                                   // 0 ��׼��ƽ��
      case 1 :                                   // 1 ��׼�����
         ifrom = ipos - pds[i].Count/2;          // ����ʼ
         if(ifrom<0) ifrom = 0;                  // ������С��0
         ito = ifrom + pds[i].Count - 1;         // �����
         if(ito>DotCount-2)                      // �����λ�ò��ܳ������ݻ�����
         {
            ito   = DotCount-1;                  // �����λ��ȡ���һ��
            ifrom = ito - pds[i].Count + 1;      // �����忪ʼλ��
         }
         fValue = 0;
         for(j=ifrom;j<=ito;j++) fValue+=buf[j]; // �������
         pr.Value[i]    = fValue;                // ��ֵ���
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
         if(iStyle==0) pr.Value[i]/=pds[i].Count;// ��ƽ���ķ�ֵ���
         break;
      case 2 :                                   // ��׼�������
         ipos  = (ito+ifrom)/2-1;                // ������λ��
         if1   = ipos - 20;
         it1   = ipos + 20;
         if(if1<0) if1 = 0;                      // ����ߵķ忪ʼλ��
         if(it1>DotCount-1) it1 = DotCount-1;    // ���ұߵķ����λ��
         ipos   = -1;                            // �����λ��
         dValue = 0;                             // ��ǰ�����ֵ
         for(j=if1; j<=it1; j++)                 // �������������λ��
         {
            if( (buf[j]>=buf[j-1])&&             // �ĸ�����ȷ���Ƿ�
                (buf[j]>=buf[j-2])&&
                (buf[j]>=buf[j+1])&&
                (buf[j]>=buf[j+2])&&
                (buf[j]>dValue) )                // �ȵ�ǰ�����
            {
               ipos = j;                         // ��ǰ����λ��
               dValue = buf[j];                  // �����ֵ
            }
         }
         if(ipos<0) ipos = (ito+ifrom)/2-1;      // û�з�,ȡ��������λ��
         iOffset = ipos - (ito+ifrom)/2;         // ����ƫ��
         ifrom = ifrom + iOffset;
         ito   = ito   + iOffset;
         if(ifrom<4) ifrom = 4;                  // ����ߵķ忪ʼλ��
         if(ito>DotCount-7) ito = DotCount-7;    // ���ұߵķ����λ��
         ifrom = FT1(fbuf1,ipos,-1,ifrom);       // Ѱ�������ʼλ��
         ito   = FT1(fbuf1,ipos,1,ito);          // Ѱ���Ҳ���ֹλ��
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);  // б��
         fB = float(buf[ito]) - fK*float(ito);   // �ؾ�
         fValue = 0;
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;                 // ���㵥�㱾��
            fV = float(buf[j]) - fV;             // �������
            if(fV>0) fValue = fValue + fV;       // ֻ�е����������0���ۻ����
         }
         fValue/=(ito-ifrom+1);                  // ���Ը��� 16.3.31
         pr.Value[i]    = fValue;                // ��ֵ���
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
         pr.Position[i] = ipos;
         break;
      case 3 :                                   // �����ƽ�� ����-����-���ֵ��-��ƽ��
         // ���ҵ���������ֹλ�����б�ʺͽؾ�
         if(ifrom<4) ifrom = 4;                  // ����ߵķ忪ʼλ��
         if(ito>DotCount-7) ito = DotCount-7;    // ���ұߵķ����λ��
         ifrom = FT1(fbuf1,ipos,-1,ifrom);       // Ѱ�������ʼλ��
         ito   = FT1(fbuf1,ipos,1,ito);          // Ѱ���Ҳ���ֹλ��
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);  // б��
         fB = float(buf[ito]) - fK*float(ito);   // �ؾ�
         ifrom = ipos - pds[i].Count/2;          // ����ʼ // ȷ�������ʵ��ֹλ��
         if(ifrom<0) ifrom = 0;                  // ������С��0
         ito = ifrom + pds[i].Count - 1;         // �����
         if(ito>DotCount-2)                      // �����λ�ò��ܳ������ݻ�����
         {
            ito   = DotCount-1;                  // �����λ��ȡ���һ��
            ifrom = ito - pds[i].Count + 1;      // �����忪ʼλ��
         }
         fValue = 0;                             // ��ʼ�����
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;                 // ���㵥�㱾��
            fV = float(buf[j]) - fV;             // �������
            if(fV>0) fValue = fValue + fV;       // ֻ�е����������0���ۻ����
         }
         pr.Value[i] = fValue/pds[i].Count;      // ��ֵ���
         pr.From[i]  = ifrom;
         pr.To[i]    = ito;
         break;
      case 4 :                                   // ���ֵƽ��
      case 5 :                                   // ���ֵ���
      case 6 :                                   // ���ֵ���
         ifrom = pdsSrc[i].From;
         ito   = pdsSrc[i].To;
         ipw   = ito - ifrom + 1;
         fValue= 0.0;
         memcpy(db,&buf[ifrom],ipw*4);           // ����������ȡ��
         QuickSort(db,0,ipw-1);                  // ��С��������
         dMax = db[ipw-1];                       // ���ֵ
         for(j=0; j<ipw; j++)                    // ��ȷ���ҷ�ֵλ��
         if(buf[j+ifrom]==dMax)
         {
            pr.Position[i] = j+ifrom;
            ifrom = pr.Position[i];
            ito   = pr.Position[i];
            j     = ipw;
         }
         if((iStyle==4)||(iStyle==5))            // ƽ��/���
         {
            j = ito - ifrom + 1;
            while(j<pdsSrc[i].Count)
            {
               if(buf[ifrom-1]>buf[ito+1])       // ��ߵĴ�
               {
                  if(ifrom-1>pdsSrc[i].From)     // ���û���ܳ���������
                     ifrom--;
                  else ito++;                    // ����ܳ�����
               } else                            // �ұߵĴ�
               {
                  if(ito+1<pdsSrc[i].To) ito++;  // �ұ�û���ܳ�����
                  else ifrom--;                  // �ұ��ܳ�������
               }
               j = ito - ifrom + 1;
            }
            pr.From[i] = ifrom;
            pr.To[i]   = ito;
            icnt       = pdsSrc[i].Count;
            for(j=ifrom; j<=ito; j++)            // ��������ݵĺ�
               fValue+=buf[j];
            if(iStyle==4)
               pr.Value[i]=fValue/icnt;          // ��ֵ���(ƽ��)
            else pr.Value[i] = fValue;           // ��ֵ���(���)
         } else                                  // ���
         {
            ipos   = ifrom;
            fValue = CalcArea(buf,DotCount,ipos,pds[i].Count,ifrom,ito);
            pr.Value[i]    = fValue/m_WBase;     // ��ֵ���
            pr.From[i]     = ifrom;              //ipos - m_WBase/2;
            pr.To[i]       = ito;                //ipos + m_WBase/2-1;
            pr.Position[i] = ipos;
         }
         break;
      case 7 :                                   // ��������ƽ��
      case 8 :                                   // �����������
      case 9 :                                   // �����������
      case 11:                                   // �����㷨
         icnt   = pdsSrc[i].Count/2;             // ȡ��������һ��
         ifrom  = pdsSrc[i].From;                // �����䶨��Ŀ�ʼ
         ito    = pdsSrc[i].To;                  // �����䶨��Ľ���
         ipos   = -1;                            // �����λ��
         dValue = 0;                             // ��ǰ�����ֵ
         for(j=ifrom; j<=ito; j++)               // ����ȫ�����������λ��
         {
            if(j>1)
            if( (buf[j]>=buf[j-1])&&             // �ĸ�����ȷ���Ƿ�
                (buf[j]>=buf[j-2])&&
                (buf[j]>=buf[j+1])&&
                (buf[j]>=buf[j+2])&&
                (buf[j]>dValue) )                // �ȵ�ǰ�����
            {
               ipos = j;                         // ��ǰ����λ��
               dValue = buf[j];                  // �����ֵ
            }
         }
         if(iStyle==9)                           // �����������
         {
            if(ipos<0)                           // û�з�,ȡ��������λ��
            {
               ipos   = (ito+ifrom)/2-1;
               fValue = 0;                       // ��ֵ���0 2017-01-04�������
            } else
               fValue = CalcArea(buf,DotCount,ipos,pds[i].Count,ifrom,ito);
            pr.Value[i] = fValue/m_WBase;        // ��ֵ���
            pr.From[i]  = ifrom;                 // ipos - m_WBase/2;
            pr.To[i]    = ito;                   // ipos + m_WBase/2 - 1;
            pr.Position[i] = ipos;
         } else if((iStyle==7)||                 // ��������ƽ��
                   (iStyle==8)||                 // �����������
                   (iStyle==11))                 // ������������㷨
         {
            if(ipos<0) ipos = (ito+ifrom)/2-1;   // û�з�,ȡ��������λ��
            ipc    = pds[i].Count - 1;           // ȡ������
            ifrom  = ipos;                       // ����λ�ÿ�ʼ
            ito    = ipos;                       // ����λ�ý���
            while(ipc>0)                         // ����λ����������
            {
               if(ifrom==0) ito++;               // ����ߵ㿪ʼ,�ұ�+
               else if(ito==DotCount-1) ifrom--; // ���ұߵ����,���-
               else {
                  if(buf[ifrom-1]>buf[ito+1])    // ��ߴ�,���-
                     ifrom--;
                  else ito++;                    // �ұߴ�,�ұ�+
               }
               ipc--;                            // ȡ������-
            }
            fValue = 0;
            for(j=ifrom; j<=ito; j++)            // �����
               fValue = fValue + buf[j];
            if(iStyle==7)                        // ƽ��
               fValue/=pdsSrc[i].Count;
            if(iStyle==11)                       // 2016-11-29 ��������ֵ���Ҹ���n�������ֵ
            {
               fValue = buf[ipos] ;
               for(j=1; j<=pdsSrc[i].Count; j++)
               {
                  fValue += buf[ipos + j];       // �ұ߼�
                  fValue += buf[ipos-j>=0?(ipos-j):ipos];  // ���
               }
               fValue/=((pdsSrc[i].Count*2)+1);  // ��ƽ��
            }
            pr.From[i]     = ifrom;              // �����
            pr.To[i]       = ito;                // ���յ�
            pr.Value[i]    = fValue;             // ��ֵ
            pr.Position[i] = ipos;               // ���ĵ�
         }
         break;
      case 10:                                   // ӫ�ⳣ�����(����)
      case 12:                                   // �з�ӫ�ⳣ�����(���)
         ipos  = (ito+ifrom)/2-1;                // ������λ��
         ifrom = ipos - 12;                      //
         ito   = ipos + 12;                      //
         if(ifrom<0) ifrom = 0;                  // ����ߵķ忪ʼλ��
         if(ito>DotCount-1) ito = DotCount-1;    // ���ұߵķ����λ��
         ipos = ifrom;                           // ipos����λ��
         for(j=ifrom; j<=ito; j++)               // ���������ֵλ��
         if(buf[j]>buf[ipos]) ipos = j;
         if(iStyle==10)                          // 10���㷨ֱ�Ӽ����ֵ
            fValue = CalcArea10(buf,DotCount,ipos,pds[i].Count);
         else{                                   // 12���㷨,���û�з���Ϊ0
            fValue = buf[ipos];
            if( (ipos==ifrom)||                  // ���ֵ�����
                (ipos==ito)||                    // �������ֵ���յ�
                !( (fValue>buf[ipos-1])&&        // ���߲��Ƿ�
                   (fValue>buf[ipos+1]) ) )
            {
               fValue = 0;
               ipos  = (ito+ifrom)/2-1;          // ������λ��
            }
            else
               fValue = CalcArea10(buf,DotCount,ipos,pds[i].Count);
         }
         pr.Value[i]    = fValue/m_WBase;        // ��ֵ���
         pr.From[i]     = ipos - m_WBase/2;
         pr.To[i]       = ipos + m_WBase/2 - 1;
         pr.Position[i] = ipos;
         break;
      }
   }
   bool bBlank = false;
   float fCheck;
   fCheck = (float)dwBlank*m_fBlankCheck + 5;
   switch(BBlank){
   case 0 : bBlank = false; break;               // 0 ��������
   case 1 : bBlank = true;  break;               // 1 ǿ�Ƽ�����
   case 2 : for(i=0; i<PeakCount; i++)           // 2 �Զ�������
            if(pr.Value[i]<fCheck) bBlank=true;  // ֻҪ��һ�������������ͼ�����
            break;
   }
   dwBlank = (float)dwBlank*m_fBlankRatio;
   if(bBlank&&(pds[0].Style<2))                  // ��Ҫ�������Ҳ��������
   {
      for(i=0; i<PeakCount; i++)
      switch(pds[i].Style){
      case 0 : pr.Value[i]-=dwBlank; break;      // ȡƽ��������
      case 1 : pr.Value[i]-=dwBlank*pds[i].Count;// ��ͼ�����
               break;
      }
   }
   free(fbuf1);
   free(fbuf2);
   int iVelleysCnt = PeakCount - 1;              // ���¼���������֮�����Сֵ
   int iVelleysPos[9];
   for(int i=0; i<iVelleysCnt; i++)              //
   {
      dValue = buf[pr.Position[i]];
      ifrom = pr.Position[i]+1;
      ito   = pr.Position[i+1];
      for(int j=ifrom; j<ito; j++)               // ��������֮���ҷ�ȣ����ҵ���Сֵ
      {
         if(dValue > buf[j])
            dValue = buf[j];
      }
      pr.Vallery[i] = dValue;
   }
}

