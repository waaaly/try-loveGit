#ifndef uAFSDataH
#define uAFSDataH

#include <SysUtils.hpp>
#include <stdio.h>
#include <io.h>
#include "RespChart.h"

typedef struct{
   BYTE bLead[7];            // AFSHEAD  : 7���ֽ��ļ�ͷ��־       7
   BYTE bBar[6];             // xxxxx    : 6���ֽ���Ŀ����         6
   BYTE bPeakCnt;            //            ����                    1
   WORD wFrom[10];           // 10����ֵ���� from                 20
   WORD wTo[10];             //              to                   20
   WORD wCount[10];          //              count                20
   BYTE bCalc[10];           //              calc                 10
   BYTE bP1[5];              // TC��1��������/����ֵ����           5
   BYTE bP2[5];              // TC��2��������/����ֵ��ĸ           5
   WORD wLines;              // nn       : 2���ֽ���������         2
   WORD wDots;               // nn       : 2���ֽ����������       2
   BYTE bP34[5];             // TC��3-4��������(��/��4λ3/4��)     5
   BYTE bP56[5];             // TC��5-6��������(��/��4λ5/6��)     5
   BYTE bCalcMode[5];        // TC���㹫ʽ                         5
   BYTE bTemp[15];           // ����                              15
} AFSHEAD;                   // �ܹ�128�ֽ�

typedef struct{
   BYTE bLead[7];            // AFSHEAD  : 7���ֽ��ļ�ͷ��־       7
   BYTE bBar[5];             // xxxxx    : 5���ֽ���Ŀ����         5
   WORD wFrom[4];            // 4����ֵ����  from                  8
   WORD wTo[4];              //              to                    8
   WORD wCount[4];           //              count                 8
   BYTE bNumerator[3];       // ����ֵ����                         3
   BYTE bDenominator[3];     // ����ֵ��ĸ                         3
   WORD wLines;              // nn       : 2���ֽ���������         2
   WORD wDots;               // nn       : 2���ֽ����������       2
   float fRatio[4];          // 4����ֵ����                        8
   BYTE  Temp[74];           // ����                              74
} AFSHEADOLD;                // �ܹ�128�ֽ�

extern AFSHEAD AFSHead;
extern AFSHEADOLD AFSHeadOld;
bool __fastcall IsAFSFile(AnsiString asFileName);
bool __fastcall IsAFSOldFile(AnsiString asFileName);
void __fastcall LoadAFSTestFile(AnsiString asFileName,TRespChart *rc);
void __fastcall LoadAFSData(AnsiString asPath,TListBox *lb);

#endif
