#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <QString>

//#pragma hdrstop

#include "uIDCardDef.h"


//#pragma package(smart_init)



QString m_sFileHead;      // ID HEX�ļ�ͷ
static int test = 0 ;


VCI_LB_DEVSN m_lbDevSN;                // �������к�


// �ַ������뻺����
void  s2Hex(
                QString s,
                int iLen,
                BYTE *hex)
{
   int i;
   if(iLen<0) i = s.length();
   else i = iLen;
   memcpy(hex,s.data(),i);//10-13

}

QString Hex2s(BYTE B[],int iLen)
{
   QString s="";
   BYTE b;
   for(int i=0; i<iLen; i++)
   {
      b = B[i];
      if(b==0) i=iLen;
      else{
         s+=" ";
         s[s.length()] = b;
      }
   }
   return s;
}

BYTE  PackTime(WORD w)
{
   BYTE B;
   if(w>1270) B = 128 + w / 20;
   else B = w / 10;
   return B;
}

WORD  UnPackTime(BYTE B)
{
   WORD w;
   if(B<128) w = B * 10;
   else w = (B - 128) * 20;
   return w;
}

void  QuickSort(DWORD *a,int i,int j)
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

int CalcSingleTop(
                DWORD buf[],
                int ifrom,
                int ito)
{
   DWORD d1,d2,d3,dMax = 0;
   int iPV[200],iPP[200],iPC=0,iPMax;
   for(int i=ifrom+1; i<ito-1; i++)
   {
      d1 = buf[i-1];
      d2 = buf[i];
      d3 = buf[i+1];
      if( (d2>=d1)&&(d2>=d3) )
      {
         iPV[iPC] = buf[i];
         iPP[iPC] = i;
         if(buf[i]>dMax)
         {
            iPMax = iPC;
            dMax  = buf[i];
         }
         iPC++;
      }
   }
   if(iPC==0) iPC = (ifrom+ito)/2;
   else iPC = iPP[iPMax];
   return iPC;
}

int FT1(
               float fbuf1[],
               int   ipos,
               int   idir,
               int   iend)
{
   int ival,ioffset;
   float foffset;
   foffset = (iend-ipos)*0.3;
   if(idir==-1)
   {
      ival = ipos + foffset;
      while(ival>iend)
      {
         if(fbuf1[ival]>0) ival--;
         else break;
      }
      ival++;
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
/*
void CalcPeak(
                DWORD   buf[],
                int     DotCount,
                ID_PEAK pdsSrc[],
                int     PeakCount,
                int     BasePeak,
                BYTE    BBlank,
                DWORD   &dwBlank,
                ID_PEAKRESULT &pr)
{
   DWORD dwMin  = 1e16;
   ID_PEAK pds[10];
   float *fbuf1,*fbuf2;
   int ifrom,ito,ipos,ioffset,i,j;
   float fValue,fK,fB,fV,d1,d2;
   float d10,d5,d0;
   for(i=0; i<DotCount; i++)
      if(buf[i]<dwMin) dwMin = buf[i];
   dwBlank = dwMin;
   fbuf1  = (float *)malloc(DotCount*sizeof(float));
   memset(fbuf1,0,sizeof(fbuf1));
   for(j=2; j<DotCount-3; j++)
   {
      d2 = float(buf[j+3]);
      d1 = float(buf[j-2]);
      fbuf1[j] = (d2-d1)/5.0;
   }
   fbuf2  = (float *)malloc(DotCount*sizeof(float));
   memset(fbuf2,0,sizeof(fbuf2));
   for(j=4; j<DotCount-6; j++)
   {
      d10 = float(buf[j+6]);
      d5  = float(buf[j+1]);
      d0  = float(buf[j-4]);
      fbuf2[j] = (d10-2*d5+d0)/25;
   }
   int iAllTop, iMaxPeak, iOffset;
   int ipf,ipt,iStyle;
   for(i=0; i<PeakCount; i++) pds[i]=pdsSrc[i];
   if( (BasePeak<=0) || (BasePeak>PeakCount) )
      iAllTop = CalcSingleTop(buf,0,DotCount);
   else {
      ipf = pds[BasePeak-1].From;
      ipt = pds[BasePeak-1].To;
      iAllTop = CalcSingleTop(buf,ipf,ipt);
   }
   for(i=0; i<PeakCount; i++)
   if( (iAllTop>=pds[i].From) &&
       (iAllTop<=pds[i].To) )
   {
      iOffset  = iAllTop - (pds[i].From + pds[i].To)/2;
      break;
   }
   for(i=0; i<PeakCount; i++)
   {
      ipf = pds[i].From + iOffset;
      ipt = pds[i].To   + iOffset;
      if(ipf<0) pds[i].From = 0;
      else pds[i].From = ipf;
      if(ipt>DotCount-1) pds[i].To = DotCount-1;
      else pds[i].To = ipt;
   }
   for(i=0; i<PeakCount; i++)
   {
      ifrom = pds[i].From;
      ito   = pds[i].To;
      ipos  = (ifrom+ito)/2;
      pr.Position[i] = ipos;
      iStyle = pds[i].Style;
      if( (iStyle==0)||(iStyle==1) )
      {
         ifrom = ipos - pds[i].Count/2;
         if(ifrom<0) ifrom = 0;
         ito = ifrom + pds[i].Count - 1;
         if(ito>DotCount-2)
         {
            ito   = DotCount-1;
            ifrom = ito - pds[i].Count + 1;
         }
         fValue = 0;
         for(j=ifrom;j<=ito;j++) fValue+=buf[j];
         pr.Value[i]    = fValue;
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
         if(pds[i].Style==0)
            pr.Value[i]/=pds[i].Count;
      } else if(iStyle==2)
      {
         if(ifrom<4) ifrom = 4;
         if(ito>DotCount-7) ito = DotCount-7;
         if(pds[i].Style==2)
         {
            ifrom = FT1(fbuf1,ipos,-1,ifrom);
            ito   = FT1(fbuf1,ipos,1,ito);
         }
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);
         fB = float(buf[ito]) - fK*float(ito);
         fValue = 0;
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;
            fV = float(buf[j]) - fV;
            if(fV>0) fValue = fValue + fV;
         }
         pr.Value[i]    = fValue;
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
      } else if(iStyle==3)
      {
         if(ifrom<4) ifrom = 4;
         if(ito>DotCount-7) ito = DotCount-7;
         if(pds[i].Style==2)
         {
            ifrom = FT1(fbuf1,ipos,-1,ifrom);
            ito   = FT1(fbuf1,ipos,1,ito);
         }
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);
         fB = float(buf[ito]) - fK*float(ito);
         ifrom = ipos - pds[i].Count/2;
         if(ifrom<0) ifrom = 0;
         ito = ifrom + pds[i].Count - 1;
         if(ito>DotCount-2)
         {
            ito   = DotCount-1;
            ifrom = ito - pds[i].Count + 1;
         }
         fValue = 0;
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;
            fV = float(buf[j]) - fV;
            if(fV>0) fValue = fValue + fV;
         }
         pr.Value[i] = fValue/pds[i].Count;
         pr.From[i]  = ifrom;
         pr.To[i]    = ito;
      }
   }
   bool bBlank = false;
   float fCheck;
   fCheck = (float)dwBlank*1.05 + 5;  //m_fBlankCheck
   switch(BBlank){
   case 0 : bBlank = false; break;
   case 1 : bBlank = true;  break;
   case 2 : for(i=0; i<PeakCount; i++)
            if(pr.Value[i]<fCheck) bBlank=true;
            break;
   }
   dwBlank = (float)dwBlank*1.0; //m_fBlankRatio
   if(bBlank&&(pds[0].Style<2))
   {
      for(i=0; i<PeakCount; i++)
      switch(pds[i].Style){
      case 0 : pr.Value[i]-=dwBlank; break;
      case 1 : pr.Value[i]-=dwBlank*pds[i].Count;
               break;
      }
   }
   delete fbuf1,fbuf2;
}
*/
void  CalcPeak(
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
   float *fbuf1,*fbuf2;
   int ifrom,ito,ipos,ioffset,i,j,icnt;
   float fValue,fK,fB,fV,d1,d2;
   float d10,d5,d0;
   for(i=0; i<DotCount; i++)
      if(buf[i]<dwMin) dwMin = buf[i];
   dwBlank = dwMin;
   fbuf1=(float *)malloc(DotCount*sizeof(float));
   memset(fbuf1,0,sizeof(fbuf1));
   for(j=2; j<DotCount-3; j++)
   {
      d2 = float(buf[j+3]);
      d1 = float(buf[j-2]);
      fbuf1[j] = (d2-d1)/5.0;
   }
   fbuf2=(float *)malloc(DotCount*sizeof(float));
   memset(fbuf2,0,sizeof(fbuf2));
   for(j=4; j<DotCount-6; j++)
   {
      d10 = float(buf[j+6]);
      d5  = float(buf[j+1]);
      d0  = float(buf[j-4]);
      fbuf2[j] = (d10-2*d5+d0)/25;
   }
   int iAllTop, iMaxPeak, iOffset;
   int ipf,ipt,iStyle;
   for(i=0; i<PeakCount; i++) pds[i]=pdsSrc[i];
   if( (BasePeak<=0) || (BasePeak>PeakCount) )
      iAllTop = CalcSingleTop(buf,0,DotCount);
   else {
      ipf = pds[BasePeak-1].From;
      ipt = pds[BasePeak-1].To;
      iAllTop = CalcSingleTop(buf,ipf,ipt);
   }
   for(i=0; i<PeakCount; i++)
   if( (iAllTop>=pds[i].From) &&
       (iAllTop<=pds[i].To) )
   {
      iOffset  = iAllTop - (pds[i].From + pds[i].To)/2;
      break;
   }
   for(i=0; i<PeakCount; i++)
   {
      ipf = pds[i].From + iOffset;
      ipt = pds[i].To   + iOffset;
      if(ipf<0) pds[i].From = 0;
      else pds[i].From = ipf;
      if(ipt>DotCount-1) pds[i].To = DotCount-1;
      else pds[i].To = ipt;
   }
   for(i=0; i<PeakCount; i++)
   {
      ifrom = pds[i].From;
      ito   = pds[i].To;
      ipos  = (ifrom+ito)/2;
      pr.Position[i] = ipos;
      iStyle = pds[i].Style;
      if( (iStyle==0)||(iStyle==1) )
      {
         ifrom = ipos - pds[i].Count/2;
         if(ifrom<0) ifrom = 0;
         ito = ifrom + pds[i].Count - 1;
         if(ito>DotCount-2)
         {
            ito   = DotCount-1;
            ifrom = ito - pds[i].Count + 1;
         }
         fValue = 0;
         for(j=ifrom;j<=ito;j++) fValue+=buf[j];
         pr.Value[i]    = fValue;
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
         if(iStyle==0) pr.Value[i]/=pds[i].Count;
      } else if(iStyle==2)
      {
         if(ifrom<4) ifrom = 4;
         if(ito>DotCount-7) ito = DotCount-7;
         ifrom = FT1(fbuf1,ipos,-1,ifrom);
         ito   = FT1(fbuf1,ipos,1,ito);
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);
         fB = float(buf[ito]) - fK*float(ito);
         fValue = 0;
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;
            fV = float(buf[j]) - fV;
            if(fV>0) fValue = fValue + fV;
         }
         pr.Value[i]    = fValue;
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
      } else if(iStyle==3)
      {
         if(ifrom<4) ifrom = 4;
         if(ito>DotCount-7) ito = DotCount-7;
         ifrom = FT1(fbuf1,ipos,-1,ifrom);
         ito   = FT1(fbuf1,ipos,1,ito);
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);
         fB = float(buf[ito]) - fK*float(ito);
         ifrom = ipos - pds[i].Count/2;
         if(ifrom<0) ifrom = 0;
         ito = ifrom + pds[i].Count - 1;
         if(ito>DotCount-2)
         {
            ito   = DotCount-1;
            ifrom = ito - pds[i].Count + 1;
         }
         fValue = 0;
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;
            fV = float(buf[j]) - fV;
            if(fV>0) fValue = fValue + fV;
         }
         pr.Value[i] = fValue/pds[i].Count;
         pr.From[i]  = ifrom;
         pr.To[i]    = ito;
      } else if((iStyle==4)||(iStyle==5))
      {
         DWORD db[400];
         DWORD dMax=0;
         float fValue = 0;
         int   ifrom,ito,ipw;
         ifrom = pdsSrc[i].From;
         ito   = pdsSrc[i].To;
         ipw   = ito - ifrom + 1;
         memcpy(db,&buf[ifrom],ipw*4);
         QuickSort(db,0,ipw-1);
         dMax = db[ipw-1];
         for(j=0; j<ipw; j++)
         if(buf[j+ifrom]==dMax)
         {
            pr.Position[i] = j+ifrom;
            ifrom = pr.Position[i];
            ito   = pr.Position[i];
            j     = ipw;
         }
         j = ito - ifrom + 1;
         while(j<pdsSrc[i].Count)
         {
            if(buf[ifrom-1]>buf[ito+1])
            {
               if(ifrom-1>pdsSrc[i].From)
                  ifrom--;
               else ito++;
            } else
            {
               if(ito+1<pdsSrc[i].To) ito++;
               else ifrom--;
            }
            j = ito - ifrom + 1;
         }
         pr.From[i] = ifrom;
         pr.To[i]   = ito;
         for(j=ifrom; j<=ito; j++)
            fValue+=buf[j];
         if(iStyle==4)
            pr.Value[i]=fValue/pdsSrc[i].Count;
         else pr.Value[i] = fValue;
      } else if( (iStyle==6) ||
                 (iStyle==7) ||
                 (iStyle==8) )
      {
         icnt  = pdsSrc[i].Count/2;
         ifrom = pdsSrc[i].From + icnt;
         ito   = pdsSrc[i].To   - icnt;
         ipos  = -1;
         fValue = 0;
         for(j=ifrom; j<ito; j++)
         {
            if( (buf[j]>=buf[j-1])&&
                (buf[j]>=buf[j-2])&&
                (buf[j]>=buf[j+1])&&
                (buf[j]>=buf[j+2])&&
                (buf[j]>fValue) )
            {
               ipos = j;
               fValue = buf[j];
            }
         }
         if(ipos<0) ipos = (ito-ifrom-1)/2;
         if(iStyle==8)
         {
            icnt=(pdsSrc[i].To-pdsSrc[i].From)/2;
            ifrom = ipos - icnt;
            ito   = ipos + icnt + 1;
            if(ifrom<4) ifrom = 4;
            if(ito>DotCount-7) ito = DotCount-7;
            ifrom = FT1(fbuf1,ipos,-1,ifrom);
            ito   = FT1(fbuf1,ipos,1,ito);
            d1 = float(buf[ifrom]);
            d2 = float(buf[ito]);
            fK = float(d2-d1)/(ito-ifrom+1);
            fB = float(buf[ito])-fK*float(ito);
            fValue = 0;
            for(j=ifrom; j<=ito; j++)
            {
               fV = fK*float(j)+fB;
               fV = float(buf[j]) - fV;
               if(fV>0) fValue = fValue + fV;
            }
            pr.Value[i]    = fValue;
            pr.From[i]     = ifrom;
            pr.To[i]       = ito;
         } else
         {
            ifrom = ipos - icnt;
            ito   = ipos + icnt + 1;
            fValue = 0;
            for(j=ifrom; j<ito; j++)
               fValue = fValue + buf[j];
            if(iStyle==6)
               fValue/=pdsSrc[i].Count;
            pr.From[i] = ifrom;
            pr.To[i]   = ito;
            pr.Value[i]= fValue;
         }
      }
   }
   bool bBlank = false;
   float fCheck;
   fCheck = (float)dwBlank*1.05  + 5;
   switch(BBlank){
   case 0 : bBlank = false; break;
   case 1 : bBlank = true;  break;
   case 2 : for(i=0; i<PeakCount; i++)
            if(pr.Value[i]<fCheck) bBlank=true;
            break;
   }
   dwBlank = (float)dwBlank*1.05 ;
   if(bBlank&&(pds[0].Style<2))
   {
      for(i=0; i<PeakCount; i++)
      switch(pds[i].Style){
      case 0 : pr.Value[i]-=dwBlank; break;
      case 1 : pr.Value[i]-=dwBlank*pds[i].Count;
               break;
      }
   }
   delete fbuf1,fbuf2;
}

int old_CalcSingle(                       // ���㵥����ľ�ȷλ��
                DWORD buf[],                     // ���ݻ�����
                int ifrom,                       // �����俪ʼ
                int ito)                         // ���������
{
   float fValue = 0;                             // ��ֵ��
   DWORD d1,d2,d3;
   int iPV[200],iPP[200],iPC=0,iPMax,iPVMax=0;   // ��ֵ,λ��,�����,�������,����ֵ
   for(int i=ifrom+1; i<ito-1; i++)              // Ѱ���������еķ�
   {
      d1 = buf[i-1];
      d2 = buf[i];
      d3 = buf[i+1];
      if( (d2>=d1)&&(d2>=d3) )                   // �Ƿ�
      {
         iPV[iPC] = buf[i];                      // ��ֵ
         iPP[iPC] = i;                           // ��λ��
         if(buf[i]>iPVMax)                       // ����������ֵ��
         {
            iPMax  = iPC;                        // �������
            iPVMax = buf[i];                     // ����ֵ
         }
         iPC++;                                  // ����+1
      }
   }
   if(iPC==0) iPC = (ifrom+ito)/2;               // û���ҵ���,���м�λ��
   else iPC = iPP[iPMax];                        // �ҵ���
   return iPC;                                   // ���ط��λ��
}

// �Զ������ֵλ�úʹ�С
void old_CalcPeak(
                DWORD   buf[],                   // ���ݻ�����
                int     DotCount,                // ���ݵ���
                ID_PEAK pds[],                   // ��ֵ���䶨��
                int     PeakCount,               // ��ֵ����
                bool    bBlank,                  // �Ƿ������
                DWORD   &dwBlank,                // ����ֵ
                ID_PEAKRESULT &pr)               // ��ֵ���
{
   DWORD dwMin  = 1e16;                          // ��Сֵ
   int ifrom, ito,ipos,i,j;
   float fValue;
   for(int i=10; i<DotCount-10; i++)             // �ҳ����/��Сֵ��λ��
      if(buf[i]<dwMin) dwMin = buf[i];           // ��Сֵ
   dwBlank = dwMin;                              // ����ֵ
   for(i=0; i<PeakCount; i++)                    // ����ÿ������ķ�ֵ��λ��
   {
      ifrom = pds[i].From;
      if(i==0) ifrom+=10;
      ito   = pds[i].To;
      if(i==PeakCount-1) ito-=10;
      ipos = old_CalcSingle(buf,ifrom,ito);          // �����ֵ�ľ�ȷλ��
      ifrom = ipos - pds[i].Count/2;             // ����ʼ
      if(ifrom<0) ifrom = 0;                     // ������С��0
      ito = ifrom + pds[i].Count;                // �����
      if(ito>DotCount-2)                         // �����λ�ò��ܳ������ݻ�����
      {
         ito   = DotCount-1;                     // �����λ��ȡ���һ��
         ifrom = ito - pds[i].Count;             // �����忪ʼλ��
      }
      fValue = 0;
      for(j=ifrom; j<ito; j++) fValue+=buf[j];   // �������
      pr.Value[i]    = fValue;                   // ��ֵ���
      pr.Position[i] = (ifrom+ito)/2;            // ���λ��
      if(pds[i].Style==0)                        // ��ƽ��
         pr.Value[i]/=pds[i].Count;              // ��ֵ���
   }
   if(bBlank)                                    // ��Ҫ������
   for(int i=0; i<PeakCount; i++)
   {
      switch(pds[i].Style){
      case 0 : pr.Value[i]-=dwBlank; break;      // ȡƽ��������
      case 1 : pr.Value[i]-=dwBlank*pds[i].Count;// ��ͼ�����
               break;
      }
   }
}



void ID2POCT(                         // ID����ת������Ŀ����
                ID_ITEM id,
                POCT_ITEM &item)
{
   ID_SUBITEM   si;                              // ����Ŀ�ṹ��
   POCT_SUBITEM psi;                             //
   QString s,s1;
   BYTE B,B1;
   item.CompanyCode = id.CompanyCode;            // ��˾����
   item.CompanyName = Hex2s(id.CompanyName,20);  // ��˾����
  item.BarCode     = Hex2s(id.BarCode,13);      // ����
   item.BatchPre    = Hex2s(id.BatchPre,16);     // ����ǰ׺
   item.ReportTitle = QString::fromLocal8Bit((char*)id.ReportTitle) ;//Hex2s(id.ReportTitle,16);  // ���浥����
   item.AreaValid   = id.AreaValid;              // ��������
   item.Area        = Hex2s(id.Area,20);         // ��������
   //item.PeakCount   = id.PeakCount;              // ��ֵ���� 01_08
   item.PeakCount = id.PeakCount %16 ;
   item.BasePeak   = id.PeakCount /16 ;
   item.ItemCount   = id.ItemCount;              // ��Ŀ����
//printf("==> %d \n",id.ItemCount) ;
//printf("==> %d \n",id.PeakCount) ;

   for(int i=0; (i<item.PeakCount) && (i< 10); i++)             // ��ֵ����
      item.Peaks[i] = id.Peaks[i];
   item.CheckTime = id.CheckTime;                // �������ʱ��
   item.HatchTime = id.HatchTime;                // ����ʱ��
   item.MinPosi   = id.MinPosi;                  // δ������ֵλ��
   item.MinCheck  = id.MinCheck;                 // �Ƿ��ж�δ����
   item.MinValue  = id.MinValue;                 // С�ٽ�ֵ
   item.MaxPosi   = id.MaxPosi;                  // �嶥��ֵλ��
   item.MaxCheck  = id.MaxCheck;                 // �Ƿ��жϳ嶥
   item.MaxValue  = id.MaxValue;                 // �嶥�ٽ�ֵ
   //for(int i=0; i<id.ItemCount; i++)             // ��Ŀ����
   //printf("\n item.ItemCount ==>%d \n" , item.ItemCount) ;
    for(int k=0; (k<item.ItemCount) && (k< 5); k++)             // ��Ŀ����
   {
//printf("here0\n ") ;
      si = id.Items[k];
      for(int j=0; j<5; j++)
      {
         psi.Name[j] = Hex2s(si.Name[j],16);     // ��Ŀ����
         psi.Unit[j] = Hex2s(si.Unit[j],16);     // ������λ
         psi.RangeMin[j] = si.RangeMin[j];       // ��ΧСֵ
         psi.RangeMax[j] = si.RangeMax[j];       // ��Χ��ֵ
      }
//printf("here0.1\n ") ;
      psi.RangeDec = si.RangeDec;                // ��ΧС��λ��
      for(int j=0; j<3; j++)                     // ���㹫ʽ��ֵλ��
         psi.CalcPosi[j] = si.CalcPosi[j];
//printf("here0.2\n ") ;
      psi.CalcMode     = si.CalcMode;            // ��ֵ���㷽��
      psi.BloodCurve   = si.BloodCurve;          // ȫѪϵ��
      psi.BloodSCurve  = si.BloodSCurve;         // Ѫ��Ѫ��ϵ��
      psi.UrineCurve   = si.UrineCurve;          // ��Һϵ��
      psi.FaecesCurve  = si.FaecesCurve;         // ���ϵ��
      psi.ControlCurve = si.ControlCurve;        // �ʿ�ϵ��
      psi.Blood        = si.Blood;               // ȫѪϵ��
      psi.BloodS       = si.BloodS;              // Ѫ��Ѫ��ϵ��
      psi.Urine        = si.Urine;               // ��Һϵ��
      psi.Faeces       = si.Faeces;              // ���ϵ��
      psi.Control      = si.Control;             // �ʿ�ϵ��
      psi.a            = si.a;                   // �¶Ȳ���ϵ��a
      psi.b            = si.b;                   // �¶Ȳ���ϵ��b
      psi.a1           = si.a1;                  // �¶Ȳ���ϵ��a1
      psi.b1           = si.b1;                  // �¶Ȳ���ϵ��b1
//printf("here0.3\n ") ;
      if(si.RatioDec>5) si.RatioDec = 5;         // С��λ0��5λ
      psi.RatioDec     = si.RatioDec;            // ϵ��С��λ��
//printf("here1\n ") ;
      psi.TempComp     = si.TempControl / 128;   // �¶Ȳ�������
//printf("here2\n") ;
      psi.TempDec      = si.TempControl % 128;   // �¶Ȳ���ϵ��С��λ
      if(psi.TempDec>5) psi.TempDec=5;
      psi.PrintInfo    = Hex2s(si.PrintInfo,64); // ��ӡ��Ϣ
//printf("here3\n") ;
      psi.LessThan     = si.LessThan;            // TֵС�ڸ�ֵʱ����һ��ϵ��
//printf("here4\n") ;
      psi.LessThanRatio= si.LessThanRatio;       // ϵ��
//printf("here5:seize ==> %d\n", sizeof(psi)) ;
      item.SIs[k]      = psi;
      //memcpy(&item.SIs[i], &psi, sizeof(psi)) ;
//printf("here6\n") ;

    //while(test == 3) ;
   //  test++ ;
//while(1) ;
   }
//printf("here7\n") ;
 for(int i=0; i<10; i++)                       // �������
      item.Curves[i] = id.Curves[i];
//printf("here8\n") ;
   item.SampleVol  = id.SampleVol;               // ������
   item.ReagentVol = id.ReagentVol;              // �Լ���
   item.MixedVol   = id.MixedVol;                // ���Һ��
   item.DeviceType = id.DeviceType;              // �豸����
   item.ProductCode= id.ProductCode;             // ��Ʒ����
   item.Year       = id.Year;                    // ��
   item.Month      = id.Month;                   // ��
   item.SerialNo   = id.SerialNo;                // ��ˮ��
//printf("here9\n") ;
   item.Batch      = Hex2s(id.Batch,5);          // ����
   item.Blank      = id.Blank;                   // �Ƿ������*/
}
/*
void  POCT2ID(               // ��Ŀ����ת��ΪID����
                POCT_ITEM item,        // ��Ŀ�ṹ��
                ID_ITEM &id)           // ID�ṹ��
{
   ID_SUBITEM   si;                    // ����Ŀ�ṹ��
   POCT_SUBITEM psi;                   //
   QString s,s1;
   BYTE B,B1;
    bool ok ;
    //uint hex ;

   memset(&id,0,sizeof(id));
   id.CompanyCode = item.CompanyCode;            // ��˾����
   s2Hex(item.CompanyName,20,id.CompanyName);    // ��˾����
   s = item.BarCode;                             // ����
   id.BarCodeStyle = s.length();                 // ���볤��
   if(s.length()<6) s2Hex(s,-1,id.BarCode);      // 5λ������ֱ�ӱ���
   else {                                        // ѹ������
      id.BarCodeStyle += 128;                    // ѹ����ʽ
      B1 = 0;                                    // �10λ5�ֽ�
      while(s.length()>0)                        // ÿ2���ַ�һ���ֽ�
      {
         if(s.length()==1) s = s + "0";          // �����������油0
         //s1 = "0x" + s.SubString(1,2);           // 16�����ַ��� 10-13
         s1 = s.mid(1,2);

         s.remove(1,2);                          // ɾ�������˵��ַ�
         //B = s1.ToIntDef(0);                     // ת��Ϊ�ֽ�
         B = uchar(s1.toUInt(&ok, 16));

         if(B1<5) id.BarCode[B1] = B;            // ֻ����5���ֽ�
         B1++;
      }
   }
   s2Hex(item.BatchPre,16,id.BatchPre);          // ����ǰ׺
   s2Hex(item.ReportTitle,16,id.ReportTitle);    // ���浥����
   id.AreaValid = item.AreaValid;                // ��������
   s2Hex(item.Area,20,id.Area);                  // ��������
   id.PeakCount = item.PeakCount;                // ��ֵ����
   for(int i=0; i<item.PeakCount; i++)           // ��ֵ����
      id.Peaks[i] = item.Peaks[i];
   id.CheckTime = item.CheckTime;                // �������ʱ��
   id.HatchTime = item.HatchTime;                // ����ʱ��
   id.MinPosi   = item.MinPosi;                  // δ������ֵλ��
   id.MinCheck  = item.MinCheck;                 // �Ƿ��ж�δ����
   id.MinValue  = item.MinValue;                 // С�ٽ�ֵ
   id.MaxPosi   = item.MaxPosi;                  // �嶥��ֵλ��
   id.MaxCheck  = item.MaxCheck;                 // �Ƿ��жϳ嶥
   id.MaxValue  = item.MaxValue;                 // �嶥�ٽ�ֵ
   id.ItemCount = item.ItemCount;                // ��Ŀ����
   for(int i=0; i<item.ItemCount; i++)           // ��Ŀ����
   {
      psi = item.SIs[i];
      memset(&si,0,sizeof(si));                  // �������
      for(int j=0; j<5; j++)
      {
         s2Hex(psi.Name[j],16,si.Name[j]);       // ��Ŀ����
         s2Hex(psi.Unit[j],16,si.Unit[j]);       // ������λ
         si.RangeMin[j] = psi.RangeMin[j];       // ��ΧСֵ
         si.RangeMax[j] = psi.RangeMax[j];       // ��Χ��ֵ
      }
      si.RangeDec = psi.RangeDec;                // ��ΧС��λ��
      si.CheckTime= PackTime(psi.CheckTime);     // �������ʱ��
      si.HatchTime= PackTime(psi.HatchTime);     // ����ʱ��
      si.MaxPosi  = psi.MaxCheck*128+psi.MaxPosi;// �嶥λ��
      si.MinPosi  = psi.MinCheck*128+psi.MinPosi;// δ�����ж�λ��
      si.MaxValue = psi.MaxValue;                // �嶥ֵ
      si.MinValue = psi.MinValue;                // δ�����ж�ֵ
      for(int j=0; j<3; j++)                     // ���㹫ʽ��ֵλ��
         si.CalcPosi[j] = psi.CalcPosi[j];
      si.CalcMode = psi.CalcMode;                // ��ֵ���㷽��
      si.StdCount = psi.StdCount;                // ��׼Ʒ����
      si.ConcTrans= psi.ConcTrans;               // Ũ�ȱ任
      si.RespTrans= psi.RespTrans;               // ��Ӧֵ�任
      for(int j=0; j<24; j++)
      {
         si.Concs[j] = psi.Concs[j];             // ��׼ƷŨ��ֵ
         si.Resps[j] = psi.Resps[j];             // ��׼Ʒ��Ӧֵ
      }
      si.StdDec = psi.ConcDec*16 + psi.RespDec;  // ��׼ƷС��λ��
      si.Method = psi.Method;                    // ��Ϸ���
      si.SectPosi= psi.SectPosi;                 // ����ʽ�ֶ�λ��
      si.SectLimits[0] = psi.SectLimits[0];      // ����ʽ����
      si.SectLimits[1] = psi.SectLimits[1];      // ����ʽ����
      si.ResultDec  = psi.ResultDec;             // ���С��λ��
      si.Blood      = psi.Blood;                 // ȫѪϵ��
      si.BloodS     = psi.BloodS;                // Ѫ��Ѫ��ϵ��
      si.Urine      = psi.Urine;                 // ��Һϵ��
      si.Faeces     = psi.Faeces;                // ���ϵ��
      si.Control    = psi.Control;               // �ʿ�ϵ��
      si.a          = psi.a;                     // �¶Ȳ���ϵ��a
      si.b          = psi.b;                     // �¶Ȳ���ϵ��b
      si.a1         = psi.a1;                    // �¶Ȳ���ϵ��a1
      si.b1         = psi.b1;                    // �¶Ȳ���ϵ��b1
      si.RatioDec   = psi.RatioDec;              // ϵ��С��λ��
      si.TempControl= psi.TempComp*128 +         // �¶Ȳ���
                      psi.TempDec;
      s2Hex(psi.PrintInfo,256,si.PrintInfo);     // ��ӡ��Ϣ
      id.Items[i] = si;
   }
   id.SampleVol  = item.SampleVol;               // ������
   id.ReagentVol = item.ReagentVol;              // �Լ���
   id.MixedVol   = item.MixedVol;                // ���Һ��
   id.DeviceType = item.DeviceType;              // �豸����
   id.ProductCode= item.ProductCode;             // ��Ʒ����
   id.Year       = item.Year;                    // ��
   id.Month      = item.Month;                   // ��
   id.SerialNo   = item.SerialNo;                // ��ˮ��
   s2Hex(item.Batch,5,id.Batch);                 // ����
   id.Blank      = item.Blank;                   // �Ƿ������
}*/


QString ItemFullName(QString asName)            // ȫ������
{
   QString asRet,asC;
   QString asDBC = "\\/:*?\"<>|";
   QString asSBC = "�ܣ���������������";
   int iPos;
   asRet   = "";
   for(int i=1; i<=asName.length(); i++)
   {
      asC  = asName.mid(i,1);
      //iPos = asDBC.Pos(asC);
      iPos = asDBC.indexOf(asC);
      if(iPos==0) asRet+=asC;
      else asRet+=asSBC.mid(iPos*2-1,2);
   }
   return asRet;
}

QString ItemHalfName(QString asName)       // �������
{
   QString asRet,asFName,asC;
   QString asDBC = "\\/:*?\"<>|";
   QString asSBC = "�ܣ���������������";
   int iPos;
   asFName = asName;
   asRet   = "";
   for(int i=1; i<=asSBC.length()/2; i++)
   {
      asC  = asSBC.mid(i,2);
      //iPos = asFName.Pos(asC);
      iPos = asDBC.indexOf(asC);
      while(iPos>0)
      {
         asFName.remove(iPos,2);
         //asFName.insert(asDBC.mid((i+1)/2,1),iPos);
         asFName.insert(iPos,asDBC.mid((i+1)/2,1));
         //iPos = asFName.Pos(asC);
         iPos = asDBC.indexOf(asC);
      }
   }
   asRet = asFName;
   return asRet;
}

bool  FileIsIDHex(char* asName)   // �ж��ļ��ǲ���ID��HEX�ļ�
{
   bool bret = true;
   FILE *f;
   BYTE BHead[8];
   QString asHead = "        ";
   //if(FileSizeByName(asName)!=4096) bret=false;  // �ļ���С����
   //else {
      f = fopen(asName,"rb");
      if(f != NULL)
      {
          memset(BHead,0,sizeof(BHead));
          fread(BHead,8,1,f);
          fclose(f);
          for(int i=0; i<8; i++)
             asHead[i+1] = BHead[i];
          bret   = (asHead==m_sFileHead);            // �ļ�ͷ����
      }
      else
      {
            printf("FileIsIDHex:open failed.") ;
      }
   //}
   return bret;
}

/*void Bzero_item(POCT_ITEM *item)
{

}
/*
void  LoadItemList(
                QString asPath,
                TStrings *sl)
{
   TSearchRec sr;
   int iAttributes = 0;
   sl->Clear();
   iAttributes |= faReadOnly;
   iAttributes |= faHidden;
   iAttributes |= faSysFile;
   iAttributes |= faVolumeID;
   iAttributes |= faDirectory;
   iAttributes |= faArchive;
   iAttributes |= faAnyFile;
   if (FindFirst(asPath,iAttributes,sr)==0)
   {
      do
      {
         if ((sr.Attr&iAttributes)==sr.Attr)
            sl->Append(sr.Name);
      } while (FindNext(sr) == 0);
      FindClose(sr);
   }
}*/

bool  LoadIDHex(                       // ��HEX�ļ���ȡ��Ŀ����
                const char* asName,
                POCT_ITEM &item)
{
   bool bret = false;
   ID_ITEM    id;
   FILE *f;
   WORD wRead;
   QString asHead;
   //if(FileIsIDHex(asName))
   //{
       f = fopen(asName,"rb");
      if(f!=NULL)
      {
        wRead = fread(&id,1,4096,f);
         if(wRead==4096)
         {
            bret = true;
            ID2POCT(id,item);
         }
        fclose(f);
      }
      else
          printf("LoadIDHex:open failed.\n") ;
       //
   //}
   //else
   //{
   //     printf("FileIsIDHex:failed.\n") ;
   //}

   return bret;
}
/*
void  SaveIDHex(                       // ������Ŀ������HEX�ļ�
                POCT_ITEM item,                  // ��Ŀ����
                char* asName)               // �����ļ���
{
   ID_ITEM    id;                                // �����ID�ṹ��
   POCT2ID(item,id);                             // ת��ΪHEX�ṹ��
   s2Hex(m_sFileHead,-1,id.FileHead);            // �ļ�ͷ��Ϣ
   FILE *f;
   f = fopen(asName,"wb");
   fwrite(&id,4096,1,f);
   fclose(f);
}*/
/*
//------------------------------------------------------------------------------
// ���ֽ�ת��Ϊ2�����ַ���
//------------------------------------------------------------------------------
QString  I2BS(BYTE b)
{
   QString s = "      ";
   itoa(b,s.c_str(),2);
   s = s.Trim();
   while(s.length()<4) s = "0" + s;
   return s;
}

//------------------------------------------------------------------------------
// �������ַ���ת��Ϊ����
//------------------------------------------------------------------------------
int  BS2I(QString s)
{
   int i=0;
   BYTE b;
   QString s1;
   s1 = s;
   while(s1.length()>0)
   {
      b = s1[1];
      i = i * 2;
      if(b=='1') i+=1;
      s1.Delete(1,1);
   }
   return i;
}

//------------------------------------------------------------------------------
//  ����ϵͳ��IntToHex����
//------------------------------------------------------------------------------
QString LB_IntToHex(int d,int w)
{
   QString s,fmt;
   bool b = true;
   while(b)
   {
      fmt = "%0" + IntToStr(w) + "X";
      s.printf(fmt.c_str(),d);
      b = (s.length()!=w);
   }
   return s;
}





*/

