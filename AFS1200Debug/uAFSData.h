#ifndef uAFSDataH
#define uAFSDataH

#include <SysUtils.hpp>
#include <stdio.h>
#include <io.h>
#include "RespChart.h"

typedef struct{
   BYTE bLead[7];            // AFSHEAD  : 7个字节文件头标志       7
   BYTE bBar[6];             // xxxxx    : 6个字节项目条码         6
   BYTE bPeakCnt;            //            峰数                    1
   WORD wFrom[10];           // 10个峰值定义 from                 20
   WORD wTo[10];             //              to                   20
   WORD wCount[10];          //              count                20
   BYTE bCalc[10];           //              calc                 10
   BYTE bP1[5];              // TC第1个计算项/测试值分子           5
   BYTE bP2[5];              // TC第2个计算项/测试值分母           5
   WORD wLines;              // nn       : 2个字节曲线数量         2
   WORD wDots;               // nn       : 2个字节数据项个数       2
   BYTE bP34[5];             // TC第3-4个计算项(高/低4位3/4个)     5
   BYTE bP56[5];             // TC第5-6个计算项(高/低4位5/6个)     5
   BYTE bCalcMode[5];        // TC计算公式                         5
   BYTE bTemp[15];           // 保留                              15
} AFSHEAD;                   // 总共128字节

typedef struct{
   BYTE bLead[7];            // AFSHEAD  : 7个字节文件头标志       7
   BYTE bBar[5];             // xxxxx    : 5个字节项目条码         5
   WORD wFrom[4];            // 4个峰值定义  from                  8
   WORD wTo[4];              //              to                    8
   WORD wCount[4];           //              count                 8
   BYTE bNumerator[3];       // 测试值分子                         3
   BYTE bDenominator[3];     // 测试值分母                         3
   WORD wLines;              // nn       : 2个字节曲线数量         2
   WORD wDots;               // nn       : 2个字节数据项个数       2
   float fRatio[4];          // 4个峰值比例                        8
   BYTE  Temp[74];           // 保留                              74
} AFSHEADOLD;                // 总共128字节

extern AFSHEAD AFSHead;
extern AFSHEADOLD AFSHeadOld;
bool __fastcall IsAFSFile(AnsiString asFileName);
bool __fastcall IsAFSOldFile(AnsiString asFileName);
void __fastcall LoadAFSTestFile(AnsiString asFileName,TRespChart *rc);
void __fastcall LoadAFSData(AnsiString asPath,TListBox *lb);

#endif
