#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <QString>

//#pragma hdrstop

#include "uIDCardDef.h"


//#pragma package(smart_init)



QString m_sFileHead;      // ID HEX文件头
static int test = 0 ;


VCI_LB_DEVSN m_lbDevSN;                // 仪器序列号


// 字符串存入缓冲区
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
   k = a[(i+j)/2];                     // 选取的参照
   do {
      while(a[m]<k&&m<j) m++;          // 从左到右找比k大的元素
      while(a[n]>k&&n>i) n--;          // 从右到左找比k小的元素
      if(m<=n)                         // 若找到且满足条件，则交换
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
                DWORD   buf[],                   // 数据缓冲区
                int     DotCount,                // 数据点数
                ID_PEAK pdsSrc[],                // 峰值区间定义
                int     PeakCount,               // 峰值个数
                int     BasePeak,                // 基准峰位置
                BYTE    BBlank,                  // 是否减本底
                DWORD   &dwBlank,                // 本底值
                ID_PEAKRESULT &pr)               // 峰值结果
{
   DWORD dwMin  = 1e16;                          // 最小值
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

int old_CalcSingle(                       // 计算单个峰的精确位置
                DWORD buf[],                     // 数据缓冲区
                int ifrom,                       // 峰区间开始
                int ito)                         // 峰区间结束
{
   float fValue = 0;                             // 峰值和
   DWORD d1,d2,d3;
   int iPV[200],iPP[200],iPC=0,iPMax,iPVMax=0;   // 峰值,位置,峰个数,最大峰序号,最大峰值
   for(int i=ifrom+1; i<ito-1; i++)              // 寻找区间所有的峰
   {
      d1 = buf[i-1];
      d2 = buf[i];
      d3 = buf[i+1];
      if( (d2>=d1)&&(d2>=d3) )                   // 是峰
      {
         iPV[iPC] = buf[i];                      // 峰值
         iPP[iPC] = i;                           // 峰位置
         if(buf[i]>iPVMax)                       // 比已有最大峰值大
         {
            iPMax  = iPC;                        // 最大峰序号
            iPVMax = buf[i];                     // 最大峰值
         }
         iPC++;                                  // 峰数+1
      }
   }
   if(iPC==0) iPC = (ifrom+ito)/2;               // 没有找到峰,最中间位置
   else iPC = iPP[iPMax];                        // 找到峰
   return iPC;                                   // 返回峰的位置
}

// 自动计算峰值位置和大小
void old_CalcPeak(
                DWORD   buf[],                   // 数据缓冲区
                int     DotCount,                // 数据点数
                ID_PEAK pds[],                   // 峰值区间定义
                int     PeakCount,               // 峰值个数
                bool    bBlank,                  // 是否减本底
                DWORD   &dwBlank,                // 本底值
                ID_PEAKRESULT &pr)               // 峰值结果
{
   DWORD dwMin  = 1e16;                          // 最小值
   int ifrom, ito,ipos,i,j;
   float fValue;
   for(int i=10; i<DotCount-10; i++)             // 找出最大/最小值和位置
      if(buf[i]<dwMin) dwMin = buf[i];           // 最小值
   dwBlank = dwMin;                              // 本底值
   for(i=0; i<PeakCount; i++)                    // 计算每个区间的峰值及位置
   {
      ifrom = pds[i].From;
      if(i==0) ifrom+=10;
      ito   = pds[i].To;
      if(i==PeakCount-1) ito-=10;
      ipos = old_CalcSingle(buf,ifrom,ito);          // 计算峰值的精确位置
      ifrom = ipos - pds[i].Count/2;             // 峰起始
      if(ifrom<0) ifrom = 0;                     // 不允许小于0
      ito = ifrom + pds[i].Count;                // 峰结束
      if(ito>DotCount-2)                         // 峰结束位置不能超过数据缓冲区
      {
         ito   = DotCount-1;                     // 峰结束位置取最后一个
         ifrom = ito - pds[i].Count;             // 调整峰开始位置
      }
      fValue = 0;
      for(j=ifrom; j<ito; j++) fValue+=buf[j];   // 求峰的面积
      pr.Value[i]    = fValue;                   // 峰值结果
      pr.Position[i] = (ifrom+ito)/2;            // 峰的位置
      if(pds[i].Style==0)                        // 求平均
         pr.Value[i]/=pds[i].Count;              // 峰值结果
   }
   if(bBlank)                                    // 需要减本底
   for(int i=0; i<PeakCount; i++)
   {
      switch(pds[i].Style){
      case 0 : pr.Value[i]-=dwBlank; break;      // 取平均减本底
      case 1 : pr.Value[i]-=dwBlank*pds[i].Count;// 求和减本底
               break;
      }
   }
}



void ID2POCT(                         // ID数据转换成项目数据
                ID_ITEM id,
                POCT_ITEM &item)
{
   ID_SUBITEM   si;                              // 子项目结构体
   POCT_SUBITEM psi;                             //
   QString s,s1;
   BYTE B,B1;
   item.CompanyCode = id.CompanyCode;            // 公司代码
   item.CompanyName = Hex2s(id.CompanyName,20);  // 公司名称
  item.BarCode     = Hex2s(id.BarCode,13);      // 条码
   item.BatchPre    = Hex2s(id.BatchPre,16);     // 批号前缀
   item.ReportTitle = QString::fromLocal8Bit((char*)id.ReportTitle) ;//Hex2s(id.ReportTitle,16);  // 报告单标题
   item.AreaValid   = id.AreaValid;              // 区域启用
   item.Area        = Hex2s(id.Area,20);         // 区域名称
   //item.PeakCount   = id.PeakCount;              // 峰值数量 01_08
   item.PeakCount = id.PeakCount %16 ;
   item.BasePeak   = id.PeakCount /16 ;
   item.ItemCount   = id.ItemCount;              // 项目数量
//printf("==> %d \n",id.ItemCount) ;
//printf("==> %d \n",id.PeakCount) ;

   for(int i=0; (i<item.PeakCount) && (i< 10); i++)             // 峰值定义
      item.Peaks[i] = id.Peaks[i];
   item.CheckTime = id.CheckTime;                // 加样检测时间
   item.HatchTime = id.HatchTime;                // 孵育时间
   item.MinPosi   = id.MinPosi;                  // 未加样峰值位置
   item.MinCheck  = id.MinCheck;                 // 是否判断未加样
   item.MinValue  = id.MinValue;                 // 小临界值
   item.MaxPosi   = id.MaxPosi;                  // 冲顶峰值位置
   item.MaxCheck  = id.MaxCheck;                 // 是否判断冲顶
   item.MaxValue  = id.MaxValue;                 // 冲顶临界值
   //for(int i=0; i<id.ItemCount; i++)             // 项目参数
   //printf("\n item.ItemCount ==>%d \n" , item.ItemCount) ;
    for(int k=0; (k<item.ItemCount) && (k< 5); k++)             // 项目参数
   {
//printf("here0\n ") ;
      si = id.Items[k];
      for(int j=0; j<5; j++)
      {
         psi.Name[j] = Hex2s(si.Name[j],16);     // 项目名称
         psi.Unit[j] = Hex2s(si.Unit[j],16);     // 计量单位
         psi.RangeMin[j] = si.RangeMin[j];       // 范围小值
         psi.RangeMax[j] = si.RangeMax[j];       // 范围大值
      }
//printf("here0.1\n ") ;
      psi.RangeDec = si.RangeDec;                // 范围小数位数
      for(int j=0; j<3; j++)                     // 计算公式峰值位置
         psi.CalcPosi[j] = si.CalcPosi[j];
//printf("here0.2\n ") ;
      psi.CalcMode     = si.CalcMode;            // 峰值计算方法
      psi.BloodCurve   = si.BloodCurve;          // 全血系数
      psi.BloodSCurve  = si.BloodSCurve;         // 血清血浆系数
      psi.UrineCurve   = si.UrineCurve;          // 尿液系数
      psi.FaecesCurve  = si.FaecesCurve;         // 粪便系数
      psi.ControlCurve = si.ControlCurve;        // 质控系数
      psi.Blood        = si.Blood;               // 全血系数
      psi.BloodS       = si.BloodS;              // 血清血浆系数
      psi.Urine        = si.Urine;               // 尿液系数
      psi.Faeces       = si.Faeces;              // 粪便系数
      psi.Control      = si.Control;             // 质控系数
      psi.a            = si.a;                   // 温度补偿系数a
      psi.b            = si.b;                   // 温度补偿系数b
      psi.a1           = si.a1;                  // 温度补偿系数a1
      psi.b1           = si.b1;                  // 温度补偿系数b1
//printf("here0.3\n ") ;
      if(si.RatioDec>5) si.RatioDec = 5;         // 小数位0到5位
      psi.RatioDec     = si.RatioDec;            // 系数小数位数
//printf("here1\n ") ;
      psi.TempComp     = si.TempControl / 128;   // 温度补偿启用
//printf("here2\n") ;
      psi.TempDec      = si.TempControl % 128;   // 温度补偿系数小数位
      if(psi.TempDec>5) psi.TempDec=5;
      psi.PrintInfo    = Hex2s(si.PrintInfo,64); // 打印信息
//printf("here3\n") ;
      psi.LessThan     = si.LessThan;            // T值小于该值时乘以一下系数
//printf("here4\n") ;
      psi.LessThanRatio= si.LessThanRatio;       // 系数
//printf("here5:seize ==> %d\n", sizeof(psi)) ;
      item.SIs[k]      = psi;
      //memcpy(&item.SIs[i], &psi, sizeof(psi)) ;
//printf("here6\n") ;

    //while(test == 3) ;
   //  test++ ;
//while(1) ;
   }
//printf("here7\n") ;
 for(int i=0; i<10; i++)                       // 拟合曲线
      item.Curves[i] = id.Curves[i];
//printf("here8\n") ;
   item.SampleVol  = id.SampleVol;               // 加样量
   item.ReagentVol = id.ReagentVol;              // 试剂量
   item.MixedVol   = id.MixedVol;                // 混合液量
   item.DeviceType = id.DeviceType;              // 设备类型
   item.ProductCode= id.ProductCode;             // 产品代码
   item.Year       = id.Year;                    // 年
   item.Month      = id.Month;                   // 月
   item.SerialNo   = id.SerialNo;                // 流水号
//printf("here9\n") ;
   item.Batch      = Hex2s(id.Batch,5);          // 批号
   item.Blank      = id.Blank;                   // 是否减本底*/
}
/*
void  POCT2ID(               // 项目数据转换为ID数据
                POCT_ITEM item,        // 项目结构体
                ID_ITEM &id)           // ID结构体
{
   ID_SUBITEM   si;                    // 子项目结构体
   POCT_SUBITEM psi;                   //
   QString s,s1;
   BYTE B,B1;
    bool ok ;
    //uint hex ;

   memset(&id,0,sizeof(id));
   id.CompanyCode = item.CompanyCode;            // 公司代码
   s2Hex(item.CompanyName,20,id.CompanyName);    // 公司名称
   s = item.BarCode;                             // 条码
   id.BarCodeStyle = s.length();                 // 条码长度
   if(s.length()<6) s2Hex(s,-1,id.BarCode);      // 5位及以下直接保存
   else {                                        // 压缩保存
      id.BarCodeStyle += 128;                    // 压缩格式
      B1 = 0;                                    // 最长10位5字节
      while(s.length()>0)                        // 每2个字符一个字节
      {
         if(s.length()==1) s = s + "0";          // 奇数个数后面补0
         //s1 = "0x" + s.SubString(1,2);           // 16进制字符串 10-13
         s1 = s.mid(1,2);

         s.remove(1,2);                          // 删除处理了的字符
         //B = s1.ToIntDef(0);                     // 转换为字节
         B = uchar(s1.toUInt(&ok, 16));

         if(B1<5) id.BarCode[B1] = B;            // 只允许5个字节
         B1++;
      }
   }
   s2Hex(item.BatchPre,16,id.BatchPre);          // 批号前缀
   s2Hex(item.ReportTitle,16,id.ReportTitle);    // 报告单标题
   id.AreaValid = item.AreaValid;                // 区域启用
   s2Hex(item.Area,20,id.Area);                  // 区域名称
   id.PeakCount = item.PeakCount;                // 峰值数量
   for(int i=0; i<item.PeakCount; i++)           // 峰值定义
      id.Peaks[i] = item.Peaks[i];
   id.CheckTime = item.CheckTime;                // 加样检测时间
   id.HatchTime = item.HatchTime;                // 孵育时间
   id.MinPosi   = item.MinPosi;                  // 未加样峰值位置
   id.MinCheck  = item.MinCheck;                 // 是否判断未加样
   id.MinValue  = item.MinValue;                 // 小临界值
   id.MaxPosi   = item.MaxPosi;                  // 冲顶峰值位置
   id.MaxCheck  = item.MaxCheck;                 // 是否判断冲顶
   id.MaxValue  = item.MaxValue;                 // 冲顶临界值
   id.ItemCount = item.ItemCount;                // 项目数量
   for(int i=0; i<item.ItemCount; i++)           // 项目参数
   {
      psi = item.SIs[i];
      memset(&si,0,sizeof(si));                  // 清空数据
      for(int j=0; j<5; j++)
      {
         s2Hex(psi.Name[j],16,si.Name[j]);       // 项目名称
         s2Hex(psi.Unit[j],16,si.Unit[j]);       // 计量单位
         si.RangeMin[j] = psi.RangeMin[j];       // 范围小值
         si.RangeMax[j] = psi.RangeMax[j];       // 范围大值
      }
      si.RangeDec = psi.RangeDec;                // 范围小数位数
      si.CheckTime= PackTime(psi.CheckTime);     // 加样检测时间
      si.HatchTime= PackTime(psi.HatchTime);     // 测试时间
      si.MaxPosi  = psi.MaxCheck*128+psi.MaxPosi;// 冲顶位置
      si.MinPosi  = psi.MinCheck*128+psi.MinPosi;// 未加样判定位置
      si.MaxValue = psi.MaxValue;                // 冲顶值
      si.MinValue = psi.MinValue;                // 未加样判定值
      for(int j=0; j<3; j++)                     // 计算公式峰值位置
         si.CalcPosi[j] = psi.CalcPosi[j];
      si.CalcMode = psi.CalcMode;                // 峰值计算方法
      si.StdCount = psi.StdCount;                // 标准品数量
      si.ConcTrans= psi.ConcTrans;               // 浓度变换
      si.RespTrans= psi.RespTrans;               // 反应值变换
      for(int j=0; j<24; j++)
      {
         si.Concs[j] = psi.Concs[j];             // 标准品浓度值
         si.Resps[j] = psi.Resps[j];             // 标准品反应值
      }
      si.StdDec = psi.ConcDec*16 + psi.RespDec;  // 标准品小数位数
      si.Method = psi.Method;                    // 拟合方法
      si.SectPosi= psi.SectPosi;                 // 多项式分段位置
      si.SectLimits[0] = psi.SectLimits[0];      // 多项式次数
      si.SectLimits[1] = psi.SectLimits[1];      // 多项式次数
      si.ResultDec  = psi.ResultDec;             // 结果小数位数
      si.Blood      = psi.Blood;                 // 全血系数
      si.BloodS     = psi.BloodS;                // 血清血浆系数
      si.Urine      = psi.Urine;                 // 尿液系数
      si.Faeces     = psi.Faeces;                // 粪便系数
      si.Control    = psi.Control;               // 质控系数
      si.a          = psi.a;                     // 温度补偿系数a
      si.b          = psi.b;                     // 温度补偿系数b
      si.a1         = psi.a1;                    // 温度补偿系数a1
      si.b1         = psi.b1;                    // 温度补偿系数b1
      si.RatioDec   = psi.RatioDec;              // 系数小数位数
      si.TempControl= psi.TempComp*128 +         // 温度补偿
                      psi.TempDec;
      s2Hex(psi.PrintInfo,256,si.PrintInfo);     // 打印信息
      id.Items[i] = si;
   }
   id.SampleVol  = item.SampleVol;               // 加样量
   id.ReagentVol = item.ReagentVol;              // 试剂量
   id.MixedVol   = item.MixedVol;                // 混合液量
   id.DeviceType = item.DeviceType;              // 设备类型
   id.ProductCode= item.ProductCode;             // 产品代码
   id.Year       = item.Year;                    // 年
   id.Month      = item.Month;                   // 月
   id.SerialNo   = item.SerialNo;                // 流水号
   s2Hex(item.Batch,5,id.Batch);                 // 批号
   id.Blank      = item.Blank;                   // 是否减本底
}*/


QString ItemFullName(QString asName)            // 全角名称
{
   QString asRet,asC;
   QString asDBC = "\\/:*?\"<>|";
   QString asSBC = "＼／：×？”〈〉｜";
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

QString ItemHalfName(QString asName)       // 半角名称
{
   QString asRet,asFName,asC;
   QString asDBC = "\\/:*?\"<>|";
   QString asSBC = "＼／：×？”〈〉｜";
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

bool  FileIsIDHex(char* asName)   // 判断文件是不是ID卡HEX文件
{
   bool bret = true;
   FILE *f;
   BYTE BHead[8];
   QString asHead = "        ";
   //if(FileSizeByName(asName)!=4096) bret=false;  // 文件大小不对
   //else {
      f = fopen(asName,"rb");
      if(f != NULL)
      {
          memset(BHead,0,sizeof(BHead));
          fread(BHead,8,1,f);
          fclose(f);
          for(int i=0; i<8; i++)
             asHead[i+1] = BHead[i];
          bret   = (asHead==m_sFileHead);            // 文件头不对
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

bool  LoadIDHex(                       // 从HEX文件读取项目数据
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
void  SaveIDHex(                       // 保存项目参数到HEX文件
                POCT_ITEM item,                  // 项目参数
                char* asName)               // 保存文件名
{
   ID_ITEM    id;                                // 保存的ID结构体
   POCT2ID(item,id);                             // 转换为HEX结构体
   s2Hex(m_sFileHead,-1,id.FileHead);            // 文件头信息
   FILE *f;
   f = fopen(asName,"wb");
   fwrite(&id,4096,1,f);
   fclose(f);
}*/
/*
//------------------------------------------------------------------------------
// 半字节转换为2进制字符串
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
// 二进制字符串转换为整数
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
//  代替系统的IntToHex函数
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

