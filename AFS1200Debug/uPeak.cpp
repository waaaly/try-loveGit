#include <math.h>
#include <IniFiles.hpp>
#pragma hdrstop

#include "uPeak.h"

#pragma package(smart_init)

float      m_fBlankCheck = 1.05;                 // 自动减本底条件
float      m_fBlankRatio = 1.0;                  // 本底比例
WORD       m_WBase;                              // 计算的峰宽

// ----------------------------------------------------------------------------
//  直线拟合LinearFit(x,y,n,a)                                                 
//  功能: 拟合y=a+b*x                                                          
//  参数: x,y    : 数据值                                                      
//        n      : 数据个数                                                    
//  使用0-直线最小二乘法拟合原理.doc中直线拟合的算法                           
//  返回: a[0] : a                                                             
//        a[1] : b                                                             
//                                                                             
// ----------------------------------------------------------------------------
void LinearFit(double x[],double y[],int n,double a[])
{
   double sx=0.0, sy=0.0, sxy=0.0, sxx=0.0;
   double ddd;
   for (int i=0; i<n; i++ )
   {
      sx  = sx  + x[i];                          // 自变量累加和
      sy  = sy  + y[i];                          // 因变量累加和
      sxy = sxy + x[i]*y[i];                     // 自变量因变量乘积累加和
      sxx = sxx + x[i]*x[i];                     // 自变量平方和
   }
   ddd  = ( n * sxx - sx * sx );
   if(ddd==0.0) ddd = 1;
   a[0] = ( sxx * sy - sx * sxy ) / ddd;         // 拟合参数a
   a[1] = ( n * sxy - sx * sy )   / ddd;         // 拟合参数b
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

int __fastcall CalcSingleTop(                    // 计算单个峰峰顶精确位置
                DWORD buf[],                     // 数据缓冲区
                int ifrom,                       // 峰区间开始
                int ito)                         // 峰区间结束
{
   DWORD d1,d2,d3,dMax = 0;
   int iPV[2000],iPP[2000],iPC=0,iPMax=0;        // 峰值,位置,峰个数,最大峰序号,最大峰值
   for(int i=ifrom+1; i<ito-1; i++)              // 寻找区间所有的峰
   {
      d1 = buf[i-1];
      d2 = buf[i];
      d3 = buf[i+1];
      if( (d2>=d1)&&(d2>=d3) )                   // 是峰
      {
         iPV[iPC] = buf[i];                      // 峰值
         iPP[iPC] = i;                           // 峰位置
         if(buf[i]>dMax)                         // 比已有最大峰值大
         {
            iPMax = iPC;                         // 最大峰序号
            dMax  = buf[i];                      // 最大峰值
         }
         iPC++;                                  // 峰数+1
      }
   }
   if(iPC==0) iPC = (ifrom+ito)/2;               // 没有找到峰,最中间位置
   else iPC = iPP[iPMax];                        // 找到峰
   int i_from,i_to;
   i_from = iPC;
   i_to   = iPC;
   while(buf[i_to]==buf[i_from])
   {
      i_to++;
   }
   iPC = (i_from+i_to-1)/2;
   return iPC;                                   // 返回峰的位置
}

int __fastcall FT1(                              // 寻找峰起至位置(一阶0到0)
               float fbuf1[],                    // 1阶
               int   ipos,                       // 开始位置
               int   idir,                       // 搜索方向 -1向左 1向右
               int   iend)                       // 终点位置
{
   // 峰的起止位置:一阶0到0(符号发生变化)
   // 两边30%位置开始,预防峰位置发生偏移导致求面积错误
   int ival,ioffset;
   float foffset;
   foffset = (iend-ipos)*0.3;
   if(idir==-1)
   {
      ival = ipos + foffset;
      while(ival>iend)
      {
         if(fbuf1[ival]>0) ival--;               // 大于0
         else break;
      }
      ival++;                                    // 符号发生变化的位置ip1
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

float CalcArea(DWORD buf[],                      // 数据缓冲区
               int   DotCount,                   // 数据点数
               int   ipos,                       // 峰的中心位置
               int   iCount,                     // 峰宽
               int   &ifrom,                     // 峰开始
               int   &ito)                       // 峰结束
{
   int    iBase, i, j, ifrom1, ito1;
   double x[1000], y[1000], a[2];
   float  fValue, fV;
   ifrom1 = ipos;                                // 峰起点
   ito1   = ipos;                                // 峰终点
   j      = ito1 - ifrom1 + 1;
   while(j<m_WBase)
   {
      if(buf[ifrom1-1]>=buf[ito1+1])             // 左边的大
      {
         if(ifrom1-1>0) ifrom1--;                // 左边没有跑出定义区域
         else ito1++;                            // 左边跑出区域
      } else                                     // 右边的大
      {
         if(ito1+1<DotCount-1) ito1++;           // 右边没有跑出区域
         else ifrom1--;                          // 右边跑出区域了
      }
      j = ito1 - ifrom1 + 1;
   }
   ifrom  = ifrom1;
   ito    = ito1;
   iBase  = iCount / 2;
   ifrom1 = ipos -iBase;                         // 峰起点
   ito1   = ifrom1 + iCount - 1;                 // 峰终点
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
   LinearFit(x,y,iCount-m_WBase,a);                // 基线拟合
   fValue = 0.0;
   for(int j=ifrom; j<=ito; j++)
   {
      fV = a[1]*j+a[0];                          // 当前位置基线本底
      fV = buf[j] - fV;                          // 减本底的结果
      if(fV>0) fValue = fValue + fV;             // 只有单点计数大于0才累积面积
   }
   return fValue;
}

float CalcArea10(DWORD buf[],                    // 数据缓冲区
               int   DotCount,                   // 数据点数
               int   ipos,                       // 峰的中心位置
               int   iCount)                     // 峰宽
{
   int ifrom,ito,iBase;
   double x[1000],y[1000],a[2];
   float fValue,fV;
   ifrom = ipos - iCount/2;                      // 峰起点
   ito   = ifrom + iCount - 1;                   // 峰终点
   if(ifrom<0)                                   // 超出左边边界
   {
      ifrom = 0;
      ito   = ifrom + iCount - 1;                // 峰终点
   } else if(ito>DotCount-1)                     // 超出右边边界
   {
      ito   = DotCount-1;
      ifrom = ito - iCount + 1;
   }
   iBase = (iCount - m_WBase)/2;                 // m_WBase面积取数个数
   for(int j=0; j<iBase; j++)                    // 基线拟合数据提取
   {
      x[j] = ifrom + j;
      y[j] = buf[ifrom+j];
      x[iBase*2-1-j] = ito - j;
      y[iBase*2-1-j] = buf[ito-j];
   }
   LinearFit(x,y,iBase*2,a);                     // 基线拟合
   fValue = 0.0;
   iBase = m_WBase / 2;                          // 面积计算的取数个数
   for(int j=ipos-iBase; j<=ipos+iBase; j++)
   {
      fV = a[1]*j+a[0];                          // 当前位置基线本底
      fV = buf[j] - fV;                          // 减本底的结果
      if(fV>0) fValue = fValue + fV;             // 只有单点计数大于0才累积面积
   }
   return fValue;
}

// 自动计算峰值位置和大小
// 0-荧光平均
// 1-荧光求和
// 2-荧光面积
// 3-胶体金平均
// 4-荧光最大值平均
// 5-荧光最大值求和
// 6-荧光最大值面积 基线拟合
// 7-荧光最高峰平均
// 8-荧光最高峰求和
// 9-荧光最高峰面积 基线拟合
// 10-荧光常规面积  基线拟合
// 11-峰顶对称平均
void __fastcall CalcPeak(
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
   DWORD db[400];                                // 初略峰值左右各10点缓冲区
   DWORD dMax=0, dValue;                         // 缓冲区最大值
   int   ipw;                                    // 取峰个数,初略峰值区域开始位置
   float *fbuf1,*fbuf2;
   int ifrom,ito,ipos,i,j,icnt,if1,it1;
   float fValue,fK,fB,fV,d1,d2;
   float d10,d5,d0;
   float f_WBase = 0.4;                          // 基线面积取数个数比例

   memset(&pr,0,sizeof(pr));                     // 结果初始化
   m_WBase = pdsSrc[0].Count * f_WBase;          // 基线面积取数个数
   if(m_WBase==0) m_WBase = 1;                   // 
   for(i=0; i<DotCount; i++)                     // 找出最大/最小值和位置
      if(buf[i]<dwMin) dwMin = buf[i];           // 最小值
   dwBlank = dwMin;                              // 本底值
   fbuf1=(float *)malloc(DotCount*sizeof(float));// 一阶
   memset(fbuf1,0,sizeof(fbuf1));
   for(j=2; j<DotCount-3; j++)
   {
      d2 = float(buf[j+3]);
      d1 = float(buf[j-2]);
      fbuf1[j] = (d2-d1)/5.0;
   }
   fbuf2=(float *)malloc(DotCount*sizeof(float));// 二阶
   memset(fbuf2,0,sizeof(fbuf2));
   for(j=4; j<DotCount-6; j++)
   {
      d10 = float(buf[j+6]);
      d5  = float(buf[j+1]);
      d0  = float(buf[j-4]);
      fbuf2[j] = (d10-2*d5+d0)/25;
   }
   int iAllTop, iMaxPeak, iOffset;               // 最高峰点位 最高峰序号 中心偏移
   int ipf,ipt,ipc,iStyle;
   for(i=0; i<PeakCount; i++) pds[i]=pdsSrc[i];
   if( (BasePeak<=0) || (BasePeak>PeakCount) )   // 基准峰无定义或者超出峰个数
      iAllTop = CalcSingleTop(buf,0,DotCount);   // 整个区间的最高点位置
   else {
      ipf = pds[BasePeak-1].From;                // 基准峰区间开始
      ipt = pds[BasePeak-1].To;                  // 基准峰区间结束
      iAllTop = CalcSingleTop(buf,ipf,ipt);      // 找出基准峰中心位置
   }
   for(i=0; i<PeakCount; i++)                    // 确定最高峰的序号
   if( (iAllTop>=pds[i].From) &&
       (iAllTop<=pds[i].To) )
   {
      iOffset  = iAllTop - (pds[i].From + pds[i].To)/2;
      break;
   }
   for(i=0; i<PeakCount; i++)                    // 修正各个峰的起止位置
   {
      ipf = pds[i].From + iOffset;
      ipt = pds[i].To   + iOffset;
      if(ipf<0) pds[i].From = 0;                 // 起点不能小于0
      else pds[i].From = ipf;
      if(ipt>DotCount-1) pds[i].To = DotCount-1; // 终点不能大于数据点总个数
      else pds[i].To = ipt;
   }
   for(i=0; i<PeakCount; i++)                    // 计算每个区间的峰值及位置
   {
      ifrom = pds[i].From;
      ito   = pds[i].To;
      ipos  = (ifrom+ito)/2;                     // 直接由最高峰确定峰的中心位置
      pr.Position[i] = ipos;                     // 保存峰顶精确位置
      iStyle = pds[i].Style;                     // 计算方式
      switch(iStyle){
      case 0 :                                   // 0 基准峰平均
      case 1 :                                   // 1 基准峰求和
         ifrom = ipos - pds[i].Count/2;          // 峰起始
         if(ifrom<0) ifrom = 0;                  // 不允许小于0
         ito = ifrom + pds[i].Count - 1;         // 峰结束
         if(ito>DotCount-2)                      // 峰结束位置不能超过数据缓冲区
         {
            ito   = DotCount-1;                  // 峰结束位置取最后一个
            ifrom = ito - pds[i].Count + 1;      // 调整峰开始位置
         }
         fValue = 0;
         for(j=ifrom;j<=ito;j++) fValue+=buf[j]; // 求峰的面积
         pr.Value[i]    = fValue;                // 峰值结果
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
         if(iStyle==0) pr.Value[i]/=pds[i].Count;// 求平均的峰值结果
         break;
      case 2 :                                   // 基准峰求面积
         ipos  = (ito+ifrom)/2-1;                // 峰中心位置
         if1   = ipos - 20;
         it1   = ipos + 20;
         if(if1<0) if1 = 0;                      // 最左边的峰开始位置
         if(it1>DotCount-1) it1 = DotCount-1;    // 最右边的峰结束位置
         ipos   = -1;                            // 最大峰的位置
         dValue = 0;                             // 当前最大峰的值
         for(j=if1; j<=it1; j++)                 // 区间搜索最大峰的位置
         {
            if( (buf[j]>=buf[j-1])&&             // 四个条件确定是峰
                (buf[j]>=buf[j-2])&&
                (buf[j]>=buf[j+1])&&
                (buf[j]>=buf[j+2])&&
                (buf[j]>dValue) )                // 比当前最大峰高
            {
               ipos = j;                         // 当前最大峰位置
               dValue = buf[j];                  // 最大峰的值
            }
         }
         if(ipos<0) ipos = (ito+ifrom)/2-1;      // 没有峰,取区间中心位置
         iOffset = ipos - (ito+ifrom)/2;         // 中心偏移
         ifrom = ifrom + iOffset;
         ito   = ito   + iOffset;
         if(ifrom<4) ifrom = 4;                  // 最左边的峰开始位置
         if(ito>DotCount-7) ito = DotCount-7;    // 最右边的峰结束位置
         ifrom = FT1(fbuf1,ipos,-1,ifrom);       // 寻找左侧起始位置
         ito   = FT1(fbuf1,ipos,1,ito);          // 寻找右侧终止位置
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);  // 斜率
         fB = float(buf[ito]) - fK*float(ito);   // 截距
         fValue = 0;
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;                 // 计算单点本底
            fV = float(buf[j]) - fV;             // 单点计数
            if(fV>0) fValue = fValue + fV;       // 只有单点计数大于0才累积面积
         }
         fValue/=(ito-ifrom+1);                  // 除以个数 16.3.31
         pr.Value[i]    = fValue;                // 峰值结果
         pr.From[i]     = ifrom;
         pr.To[i]       = ito;
         pr.Position[i] = ipos;
         break;
      case 3 :                                   // 胶体金平均 波谷-连线-最大值减-求平均
         // 先找到面积峰的起止位置求出斜率和截距
         if(ifrom<4) ifrom = 4;                  // 最左边的峰开始位置
         if(ito>DotCount-7) ito = DotCount-7;    // 最右边的峰结束位置
         ifrom = FT1(fbuf1,ipos,-1,ifrom);       // 寻找左侧起始位置
         ito   = FT1(fbuf1,ipos,1,ito);          // 寻找右侧终止位置
         d1 = float(buf[ifrom]);
         d2 = float(buf[ito]);
         fK = float(d2 - d1)/(ito - ifrom + 1);  // 斜率
         fB = float(buf[ito]) - fK*float(ito);   // 截距
         ifrom = ipos - pds[i].Count/2;          // 峰起始 // 确定峰的真实起止位置
         if(ifrom<0) ifrom = 0;                  // 不允许小于0
         ito = ifrom + pds[i].Count - 1;         // 峰结束
         if(ito>DotCount-2)                      // 峰结束位置不能超过数据缓冲区
         {
            ito   = DotCount-1;                  // 峰结束位置取最后一个
            ifrom = ito - pds[i].Count + 1;      // 调整峰开始位置
         }
         fValue = 0;                             // 开始计算和
         for(j=ifrom; j<=ito; j++)
         {
            fV = fK*float(j)+fB;                 // 计算单点本底
            fV = float(buf[j]) - fV;             // 单点计数
            if(fV>0) fValue = fValue + fV;       // 只有单点计数大于0才累积面积
         }
         pr.Value[i] = fValue/pds[i].Count;      // 峰值结果
         pr.From[i]  = ifrom;
         pr.To[i]    = ito;
         break;
      case 4 :                                   // 最大值平均
      case 5 :                                   // 最大值求和
      case 6 :                                   // 最大值面积
         ifrom = pdsSrc[i].From;
         ito   = pdsSrc[i].To;
         ipw   = ito - ifrom + 1;
         fValue= 0.0;
         memcpy(db,&buf[ifrom],ipw*4);           // 从主缓冲区取数
         QuickSort(db,0,ipw-1);                  // 从小到大排序
         dMax = db[ipw-1];                       // 最大值
         for(j=0; j<ipw; j++)                    // 精确查找峰值位置
         if(buf[j+ifrom]==dMax)
         {
            pr.Position[i] = j+ifrom;
            ifrom = pr.Position[i];
            ito   = pr.Position[i];
            j     = ipw;
         }
         if((iStyle==4)||(iStyle==5))            // 平均/求和
         {
            j = ito - ifrom + 1;
            while(j<pdsSrc[i].Count)
            {
               if(buf[ifrom-1]>buf[ito+1])       // 左边的大
               {
                  if(ifrom-1>pdsSrc[i].From)     // 左边没有跑出定义区域
                     ifrom--;
                  else ito++;                    // 左边跑出区域
               } else                            // 右边的大
               {
                  if(ito+1<pdsSrc[i].To) ito++;  // 右边没有跑出区域
                  else ifrom--;                  // 右边跑出区域了
               }
               j = ito - ifrom + 1;
            }
            pr.From[i] = ifrom;
            pr.To[i]   = ito;
            icnt       = pdsSrc[i].Count;
            for(j=ifrom; j<=ito; j++)            // 求最大数据的和
               fValue+=buf[j];
            if(iStyle==4)
               pr.Value[i]=fValue/icnt;          // 峰值结果(平均)
            else pr.Value[i] = fValue;           // 峰值结果(求和)
         } else                                  // 面积
         {
            ipos   = ifrom;
            fValue = CalcArea(buf,DotCount,ipos,pds[i].Count,ifrom,ito);
            pr.Value[i]    = fValue/m_WBase;     // 峰值结果
            pr.From[i]     = ifrom;              //ipos - m_WBase/2;
            pr.To[i]       = ito;                //ipos + m_WBase/2-1;
            pr.Position[i] = ipos;
         }
         break;
      case 7 :                                   // 区间最大峰平均
      case 8 :                                   // 区间最大峰求和
      case 9 :                                   // 区间最大峰面积
      case 11:                                   // 锦瑞算法
         icnt   = pdsSrc[i].Count/2;             // 取数个数的一半
         ifrom  = pdsSrc[i].From;                // 峰区间定义的开始
         ito    = pdsSrc[i].To;                  // 峰区间定义的结束
         ipos   = -1;                            // 最大峰的位置
         dValue = 0;                             // 当前最大峰的值
         for(j=ifrom; j<=ito; j++)               // 区间全程搜索最大峰的位置
         {
            if(j>1)
            if( (buf[j]>=buf[j-1])&&             // 四个条件确定是峰
                (buf[j]>=buf[j-2])&&
                (buf[j]>=buf[j+1])&&
                (buf[j]>=buf[j+2])&&
                (buf[j]>dValue) )                // 比当前最大峰高
            {
               ipos = j;                         // 当前最大峰位置
               dValue = buf[j];                  // 最大峰的值
            }
         }
         if(iStyle==9)                           // 区间最大峰面积
         {
            if(ipos<0)                           // 没有峰,取区间中心位置
            {
               ipos   = (ito+ifrom)/2-1;
               fValue = 0;                       // 峰值结果0 2017-01-04瑞辉需求
            } else
               fValue = CalcArea(buf,DotCount,ipos,pds[i].Count,ifrom,ito);
            pr.Value[i] = fValue/m_WBase;        // 峰值结果
            pr.From[i]  = ifrom;                 // ipos - m_WBase/2;
            pr.To[i]    = ito;                   // ipos + m_WBase/2 - 1;
            pr.Position[i] = ipos;
         } else if((iStyle==7)||                 // 区间最大峰平均
                   (iStyle==8)||                 // 区间最大峰求和
                   (iStyle==11))                 // 区间最大峰锦瑞算法
         {
            if(ipos<0) ipos = (ito+ifrom)/2-1;   // 没有峰,取区间中心位置
            ipc    = pds[i].Count - 1;           // 取数个数
            ifrom  = ipos;                       // 中心位置开始
            ito    = ipos;                       // 中心位置结束
            while(ipc>0)                         // 中心位置左右搜索
            {
               if(ifrom==0) ito++;               // 最左边点开始,右边+
               else if(ito==DotCount-1) ifrom--; // 最右边点结束,左边-
               else {
                  if(buf[ifrom-1]>buf[ito+1])    // 左边大,左边-
                     ifrom--;
                  else ito++;                    // 右边大,右边+
               }
               ipc--;                            // 取数个数-
            }
            fValue = 0;
            for(j=ifrom; j<=ito; j++)            // 计算和
               fValue = fValue + buf[j];
            if(iStyle==7)                        // 平均
               fValue/=pdsSrc[i].Count;
            if(iStyle==11)                       // 2016-11-29 锦瑞计算峰值左右各加n个点求峰值
            {
               fValue = buf[ipos] ;
               for(j=1; j<=pdsSrc[i].Count; j++)
               {
                  fValue += buf[ipos + j];       // 右边加
                  fValue += buf[ipos-j>=0?(ipos-j):ipos];  // 左边
               }
               fValue/=((pdsSrc[i].Count*2)+1);  // 求平均
            }
            pr.From[i]     = ifrom;              // 峰起点
            pr.To[i]       = ito;                // 峰终点
            pr.Value[i]    = fValue;             // 峰值
            pr.Position[i] = ipos;               // 中心点
         }
         break;
      case 10:                                   // 荧光常规面积(和迈)
      case 12:                                   // 有峰荧光常规面积(瑞辉)
         ipos  = (ito+ifrom)/2-1;                // 峰中心位置
         ifrom = ipos - 12;                      //
         ito   = ipos + 12;                      //
         if(ifrom<0) ifrom = 0;                  // 最左边的峰开始位置
         if(ito>DotCount-1) ito = DotCount-1;    // 最右边的峰结束位置
         ipos = ifrom;                           // ipos中心位置
         for(j=ifrom; j<=ito; j++)               // 区间找最大值位置
         if(buf[j]>buf[ipos]) ipos = j;
         if(iStyle==10)                          // 10号算法直接计算峰值
            fValue = CalcArea10(buf,DotCount,ipos,pds[i].Count);
         else{                                   // 12号算法,如果没有峰则为0
            fValue = buf[ipos];
            if( (ipos==ifrom)||                  // 最大值在起点
                (ipos==ito)||                    // 或者最大值在终点
                !( (fValue>buf[ipos-1])&&        // 或者不是峰
                   (fValue>buf[ipos+1]) ) )
            {
               fValue = 0;
               ipos  = (ito+ifrom)/2-1;          // 峰中心位置
            }
            else
               fValue = CalcArea10(buf,DotCount,ipos,pds[i].Count);
         }
         pr.Value[i]    = fValue/m_WBase;        // 峰值结果
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
   case 0 : bBlank = false; break;               // 0 不减本底
   case 1 : bBlank = true;  break;               // 1 强制减本底
   case 2 : for(i=0; i<PeakCount; i++)           // 2 自动减本底
            if(pr.Value[i]<fCheck) bBlank=true;  // 只要有一个峰满足条件就减本底
            break;
   }
   dwBlank = (float)dwBlank*m_fBlankRatio;
   if(bBlank&&(pds[0].Style<2))                  // 需要减本底且不是求面积
   {
      for(i=0; i<PeakCount; i++)
      switch(pds[i].Style){
      case 0 : pr.Value[i]-=dwBlank; break;      // 取平均减本底
      case 1 : pr.Value[i]-=dwBlank*pds[i].Count;// 求和减本底
               break;
      }
   }
   free(fbuf1);
   free(fbuf2);
   int iVelleysCnt = PeakCount - 1;              // 以下计算两个峰之间的最小值
   int iVelleysPos[9];
   for(int i=0; i<iVelleysCnt; i++)              //
   {
      dValue = buf[pr.Position[i]];
      ifrom = pr.Position[i]+1;
      ito   = pr.Position[i+1];
      for(int j=ifrom; j<ito; j++)               // 在两个峰之间找峰谷，即找到最小值
      {
         if(dValue > buf[j])
            dValue = buf[j];
      }
      pr.Vallery[i] = dValue;
   }
}

