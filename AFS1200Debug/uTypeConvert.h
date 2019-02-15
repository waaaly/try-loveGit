#ifndef uTypeConvertH
#define uTypeConvertH

#include <vcl.h>
#include <Grids.hpp>

#include "FillStringGrid.h"
#include "RespChart.h"
#include "uIDCardDef.h"
#include "CalcSDCV.h"

#define  MAX(x,y) (((x)>(y))?(x):(y))
#define  MIN(x,y) (((x)<(y))?(x):(y))

extern bool m_bTAdmin;

AnsiString Float2Str(float f,int iDec);          // 浮点数到字符串
AnsiString Float2StrA(float f,int iDec);         // 浮点数到字符串(自动小数位)
void GridToClipboard(TObject *Sender,
     TMouseButton Button, TShiftState Shift, int X, int Y);
void ClipboardToGrid(TObject *Sender);

void LoadTCDef(AnsiString asFName, int iPCnt,TFillStringGrid *fsg);
void SaveTCDef(AnsiString asFName, int iPCnt,TFillStringGrid *fsg);
void LoadPeakDef(AnsiString asFName, int iDots,TFillStringGrid *fsg);
bool SavePeakDef(AnsiString asFName, TFillStringGrid *fsg);
void __fastcall RefreshTCFormula(                // 刷新显示TC计算公式
                TComboBox *c1,
                TComboBox *c2,
                TComboBox *c3,
                TComboBox *c4);
int __fastcall GetTCMode(AnsiString asTCFormula);// 从公式字符串取计算方式

void __fastcall CalcSingle(
                POCT_ITEM pi,                    // 项目参数
                TFillStringGrid *sgTest,         // 测试原始数据网格
                TFillStringGrid *sgCalc,         // 计算网格
                DWORD *dw,                       // 数据缓冲区
                int iDots,                       // 数据个数
                int iIndex,                      // 列号
                bool bBlank);                    // 是否显示本底值
int __fastcall LoadTest(                         // 调入单个浓度对应的测试数据
               POCT_ITEM pi,                     // 项目参数
               int iDots,                        // 默认点数
               AnsiString asIniName,             // 数据所在文件名
               AnsiString asSec,                 // 数据所在段名
               int iIndex,                       // 浓度序号
               TRespChart *rc,                   // 测试数据图形
               TFillStringGrid *sgTest,          // 测试数据列表
               TFillStringGrid *sgCalc);         // 计算结果列表
void __fastcall AppendTest(                      // 将测试数据填入网格并计算
                POCT_ITEM pi,                    // 项目参数
                DWORD *dw,                       // 数据缓冲区
                int iCount,                      // 数据个数
                TRespChart *rc,                  // respchart
                TFillStringGrid *sgTest,         // 测试数据网格
                TFillStringGrid *sgCalc);        // 计算网格
void __fastcall SaveTest(                        // 保存单个浓度单次测试数据
               AnsiString asIniName,             // 数据所在文件名
               AnsiString asSec,                 // 数据所在段名
               int iConcNo,                      // 浓度序号
               int iTestCnt,                     // 当前浓度测试个数
               DWORD buf[],                      // 数据缓冲区
               int iDots);                       // 数据点数
void __fastcall CalcCVS(
                int iPeakCount,                  // 峰值个数
                TFillStringGrid *sgCalc,         // 计算网格
                TFillStringGrid *sgCV,           // CV网格
                int iConcCnt,                    // 当前浓度测试笔数
                bool bBlank);                    // 是否显示本底值
void __fastcall DeleteTest(                      // 删除单个浓度所有测试数据
                AnsiString asIniFile,            // 数据文件
                AnsiString asSec,                // 评估批次段
                int iConcNo);                    // 当前浓度序号
void __fastcall LoadAssessRC(
                POCT_ITEM pi,                    // 项目参数
                AnsiString asAFName,             // 测试数据文件
                AnsiString asABatch,             // 评估批次名称
                TFillStringGrid *sgAssess);      // 测试原始数据网格
void __fastcall SaveRC(                          // 保存浓度和测试值数据
                AnsiString asAFName,             // 测试数据文件
                AnsiString asABatch,             // 评估批次名称
                TFillStringGrid *sgAssess);      // 测试原始数据网格

void __fastcall AdjustFSG(TStringGrid *fsg);     // 调整最后一列宽度

#endif
