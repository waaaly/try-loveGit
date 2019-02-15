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

AnsiString Float2Str(float f,int iDec);          // ���������ַ���
AnsiString Float2StrA(float f,int iDec);         // ���������ַ���(�Զ�С��λ)
void GridToClipboard(TObject *Sender,
     TMouseButton Button, TShiftState Shift, int X, int Y);
void ClipboardToGrid(TObject *Sender);

void LoadTCDef(AnsiString asFName, int iPCnt,TFillStringGrid *fsg);
void SaveTCDef(AnsiString asFName, int iPCnt,TFillStringGrid *fsg);
void LoadPeakDef(AnsiString asFName, int iDots,TFillStringGrid *fsg);
bool SavePeakDef(AnsiString asFName, TFillStringGrid *fsg);
void __fastcall RefreshTCFormula(                // ˢ����ʾTC���㹫ʽ
                TComboBox *c1,
                TComboBox *c2,
                TComboBox *c3,
                TComboBox *c4);
int __fastcall GetTCMode(AnsiString asTCFormula);// �ӹ�ʽ�ַ���ȡ���㷽ʽ

void __fastcall CalcSingle(
                POCT_ITEM pi,                    // ��Ŀ����
                TFillStringGrid *sgTest,         // ����ԭʼ��������
                TFillStringGrid *sgCalc,         // ��������
                DWORD *dw,                       // ���ݻ�����
                int iDots,                       // ���ݸ���
                int iIndex,                      // �к�
                bool bBlank);                    // �Ƿ���ʾ����ֵ
int __fastcall LoadTest(                         // ���뵥��Ũ�ȶ�Ӧ�Ĳ�������
               POCT_ITEM pi,                     // ��Ŀ����
               int iDots,                        // Ĭ�ϵ���
               AnsiString asIniName,             // ���������ļ���
               AnsiString asSec,                 // �������ڶ���
               int iIndex,                       // Ũ�����
               TRespChart *rc,                   // ��������ͼ��
               TFillStringGrid *sgTest,          // ���������б�
               TFillStringGrid *sgCalc);         // �������б�
void __fastcall AppendTest(                      // �����������������񲢼���
                POCT_ITEM pi,                    // ��Ŀ����
                DWORD *dw,                       // ���ݻ�����
                int iCount,                      // ���ݸ���
                TRespChart *rc,                  // respchart
                TFillStringGrid *sgTest,         // ������������
                TFillStringGrid *sgCalc);        // ��������
void __fastcall SaveTest(                        // ���浥��Ũ�ȵ��β�������
               AnsiString asIniName,             // ���������ļ���
               AnsiString asSec,                 // �������ڶ���
               int iConcNo,                      // Ũ�����
               int iTestCnt,                     // ��ǰŨ�Ȳ��Ը���
               DWORD buf[],                      // ���ݻ�����
               int iDots);                       // ���ݵ���
void __fastcall CalcCVS(
                int iPeakCount,                  // ��ֵ����
                TFillStringGrid *sgCalc,         // ��������
                TFillStringGrid *sgCV,           // CV����
                int iConcCnt,                    // ��ǰŨ�Ȳ��Ա���
                bool bBlank);                    // �Ƿ���ʾ����ֵ
void __fastcall DeleteTest(                      // ɾ������Ũ�����в�������
                AnsiString asIniFile,            // �����ļ�
                AnsiString asSec,                // �������ζ�
                int iConcNo);                    // ��ǰŨ�����
void __fastcall LoadAssessRC(
                POCT_ITEM pi,                    // ��Ŀ����
                AnsiString asAFName,             // ���������ļ�
                AnsiString asABatch,             // ������������
                TFillStringGrid *sgAssess);      // ����ԭʼ��������
void __fastcall SaveRC(                          // ����Ũ�ȺͲ���ֵ����
                AnsiString asAFName,             // ���������ļ�
                AnsiString asABatch,             // ������������
                TFillStringGrid *sgAssess);      // ����ԭʼ��������

void __fastcall AdjustFSG(TStringGrid *fsg);     // �������һ�п��

#endif
