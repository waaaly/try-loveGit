#ifndef uIDCardDefH
#define uIDCardDefH

#include <ADODB.hpp>
#include <SysUtils.hpp>
#include <stdio.h>
#include <vcl.h>
#include <IdGlobal.hpp>
#include <io.h>

#include "loadLib.h"

extern AnsiString m_sFileHead;      // ID HEX�ļ�ͷ

typedef struct{
        BYTE  StdCount;                // 1   ��׼Ʒ����
        BYTE  ConcTrans;               // 1   Ũ�ȱ任   1 : ȡ���� 0 : ������
        BYTE  RespTrans;               // 1   ��Ӧֵ�任 1 : ȡ���� 0 : ������
        BYTE  StdDec;                  // 1   Ũ�Ⱥͷ�ӦֵС��λ��
                                       //     bit 7-4 : Ũ��С��λ��   ���ֵ
                                       //     bit 3-0 : ��ӦֵС��λ��   TCֵ
        BYTE  Method;                  // 1   ��Ϸ���
                                       //     0 : ֱ��
                                       //     1 : ����ʽ
                                       //     2 : MMF
                                       //     3 : ��������
                                       //     4 : �������
                                       //     5 : �ݺ������
                                       //     6 : �߼�˹��ģ��
                                       //     7 : ָ�����
                                       //     8 : ���Բ�ֵ
                                       //     9 : Logistic���(4����)
                                       //     10: Logistic���(5����) 
        BYTE  SectPosi;                // 1   ����ʽ�ֶ�λ��0��ʾ���ֶ�
        BYTE  SectLimits[2];           // 2   ����ʽ���� 0��ʾ�Զ� 1-6��ʾ����
        float Concs[21];               // 84  ��׼ƷŨ��
        float Resps[21];               // 84  ��׼Ʒ��Ӧֵ
        float a[6];                    // 24  ����ϵ��
}ID_CURVE;                             // ----200�ֽ�---------------------------

typedef struct{
        BYTE       Name[5][16];        // 80  5����Ŀ����
        BYTE       Unit[5][16];        // 80  ������λ
        float      RangeMin[5];        // 20  ��ⷶΧСֵ
        float      RangeMax[5];        // 20  ��ⷶΧ��ֵ
        BYTE       RangeDec;           // 1   ��ⷶΧС��λ��
        BYTE       CalcPosi[3];        // 3   ���㹫ʽ�����ڷ�ֵλ��
        BYTE       CalcMode;           // 1   ���㷽�� CP:CalcPosi
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
                                       //     5: CP[0]/(CP[0]+CP[1]+CP[2])
                                       //     6: CP[0]/(CP[0]+CP[1])
                                       //     7: CP[0]/(CP[1]+CP[2])       2016-11-23
                                       //     8: (CP[0]-B)/(CP[1]-B)       2016-12-01  04�ͻ�
        BYTE       CurveNos[5];        // 5   �������Ͷ�Ӧ�������
                                       //     ȫѪ�������
                                       //     Ѫ��Ѫ���������
                                       //     ��Һ�������
                                       //     ����������
                                       //     �ʿ��������
        BYTE       RatioDec;           // 1   ϵ��С��λ��
        BYTE       TempControl;        // 1   �¶Ȳ���
                                       //     bit 7   : 0-������ 1-����
                                       //     bit 6-0 : ����ϵ��С��λ��
        float      Ratios[9];          // 36  0-4 5���������͵�ϵ��
                                       //     ȫѪϵ��
                                       //     Ѫ��Ѫ��ϵ��
                                       //     ��Һϵ��
                                       //     ���ϵ��
                                       //     �ʿ�ϵ��
                                       //     5-8 �¶Ȳ���ϵ��a,b,a1,b1
                                       //     �¶Ȳ������� a
                                       //     �¶Ȳ������� b
                                       //     �¶Ȳ������� a1
                                       //     �¶Ȳ������� b1
        ID_PEAK    siPeaks[4];         // 24  ��������䶨�壬���4����    2016-08-18
        WORD       SubCheck;           // 2   ����δ�������ʱ��(1������)  2016-10-19
        WORD       SubHatch;           // 2   �������ʱ��(1������)        2016-10-19
        WORD       SubMinValue;        // 2   ����δ�����ж�ֵ             2016-11-29
        BYTE       siChannel;          // 1   ������Ŀ����ͨ����(1������)  2016-08-18
        BYTE       PrintInfo[33];      // 33  ��ӡ��Ϣ(�ϰ汾Ϊ64)         2016-08-18
        DWORD      LessThan;           // 4   TֵС�ڸ�ֵʱ���������ϵ��
        float      LessThanRatio;      // 4   ϵ��
}ID_SUBITEM;                           // ------320�ֽ�-------------------------

//------------------------------------------------------------------------------
// ID��HEX�ļ��ṹ����
//------------------------------------------------------------------------------
typedef struct{
        BYTE       FileHead[8];        // 8    �ļ�ͷ��־ LABSIMID
        BYTE       Version;            // 1    �汾��
        BYTE       CompanyCode;        // 1    ��˾����
        BYTE       CompanyName[20];    // 20   ��˾����
        BYTE       BarCode[13];        // 13   ID������
        BYTE       BatchPre[16];       // 16   ����ǰ׺
        BYTE       ReportTitle[16];    // 16   ���浥����
        BYTE       AreaValid;          // 1    ��������
        BYTE       Area[20];           // 20   ��������
        ID_PEAK    Peaks[10];          // 60   �����䶨��
        WORD       CheckTime;          // 2    δ�������ʱ��
        WORD       HatchTime;          // 2    ����ʱ��
        DWORD      MinValue;           // 4    δ�����ж�ֵ
        DWORD      MaxValue;           // 4    �嶥�ж�ֵ
        BYTE       MinPosi;            // 1    С��4000��ȡ��λ��(δ����)
        BYTE       MinCheck;           // 1    �Ƿ���δ����
        BYTE       MaxPosi;            // 1    ����26���ȡ��λ��(�嶥)
        BYTE       MaxCheck;           // 1    �Ƿ���嶥
        ID_SUBITEM Items[5];           // 1600 ��Ŀ����(���5����Ŀ)
        BYTE       PeakCount;          // 1    ��ֵ���� �߰��ֽ�Ϊ��׼��λ��
        BYTE       ItemCount;          // 1    ��Ŀ��
        WORD       SampleVol;          // 2    ������
        WORD       ReagentVol;         // 2    �Լ���
        WORD       MixedVol;           // 2    ���Һ��
        BYTE       DeviceType;         // 1    �豸����
        BYTE       ProductCode;        // 1    ��Ʒ����
        WORD       Year;               // 2    ��
        BYTE       Month;              // 1    ��
        BYTE       SerialNo;           // 1    ��ˮ��
        BYTE       ValidMonth;         // 1    ��Ч����          2016-11-23
        BYTE       Batch[4];           // 4    ����
        BYTE       Blank;              // 1    ��ֵ�Ƿ������ 0-���� 1-ǿ�Ƽ� 2-�Զ���
        ID_CURVE   Curves[10];         // 2000 10������
        BYTE       CurveCnt;           // 1    ��������
        BYTE       Reversal;           // 1    ��ת0����ת 1��ת
        BYTE       Reserved1[2];       // 2    �����ֽ�
        DWORD      ReversalBase;       // 4    ��ת��׼ֵ
        float      CAValue[5];         // 20   Cֵ����ֵ        2016-06-16��׼
        BYTE       CAParam[5];         // 5    Cֵ���ڲ���      2016-06-16��׼
                                       //      7-6λ  00��ֹ 01�ӵ���ֵ 10���Ե���ֵ
                                       //      5-4λ  ����ֵ��С��λ��
                                       //      3-0λ  ��Ҫ���ڵķ�ֵ���
        BYTE       Reserved[271];      // 271  �����ֽ�
}ID_ITEM;

//------------------------------------------------------------------------------
// ������Ϣ
//------------------------------------------------------------------------------
typedef struct{
        AnsiString Name[5];            // ��Ŀ����,��Ӧ5����ⷶΧ
        AnsiString Unit[5];            // ������λ
        float      RangeMin[5];        // ��ⷶΧСֵ
        float      RangeMax[5];        // ��ⷶΧ��ֵ
        BYTE       RangeDec;           // ��ⷶΧС��λ��
        BYTE       CalcPosi[3];        // ���㹫ʽ�����ڷ�ֵλ��
        BYTE       CalcMode;           // ���㷽�� CP:CalcPosi
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
                                       //     5: CP[0]/(CP[0]+CP[1]+CP[2])
                                       //     6: CP[0]/(CP[0]+CP[2])
                                       //     7: CP[0]/(CP[1]+CP[2])       2016-11-23
                                       //     8: (CP[0]-B)/(CP[1]-B)       2016-12-01  04�ͻ�
        BYTE       CurveNos[5];        // �����������Ͷ�Ӧ���������
                                       // ȫѪ�������
                                       // Ѫ��Ѫ���������
                                       // ��Һ�������
                                       // ����������
                                       // �ʿ��������
        float      Ratios[9];          // 0-4 ������������ϵ��
                                       // ȫѪϵ��
                                       // Ѫ��Ѫ��ϵ��
                                       // ��Һϵ��
                                       // ���ϵ��
                                       // �ʿ�ϵ��
                                       // 5-8 �¶Ȳ���ϵ��
                                       // �¶Ȳ������� a
                                       // �¶Ȳ������� b
                                       // �¶Ȳ������� a1
                                       // �¶Ȳ������� b1
        BYTE       RatioDec;           // ϵ��С��λ��
        BYTE       TempDec;            // �¶Ȳ���ϵ��С��λ��
        BYTE       TempComp;           // �¶Ȳ�����־:0����1������
        AnsiString PrintInfo;          // ��ӡ��Ϣ

        ID_PEAK    siPeaks[4];         // ��������䶨�壬���4����    2016-08-18
        WORD       SubCheck;           // ����δ�������ʱ��(1������)  2016-10-19
        WORD       SubHatch;           // �������ʱ��(1������)        2016-10-19
        WORD       SubMinValue;        // ����δ�����ж�ֵ             2016-11-29
        BYTE       siChannel;          // ������Ŀ����ͨ����(һ������) 2016-08-18

        DWORD      LessThan;           // TֵС�ڸ�ֵʱ���������ϵ��
        float      LessThanRatio;      // ϵ��
        AnsiString Output;             // ��Ŀ���ѡ�� 0��ʾ����� 1��ʾ��� ��Ӧ�����ʱ�� Ĭ��ȫ�����
        BYTE       CAMethod;           // C�ߵ��ڷ��� 0-��ֹ 1-���� 2-����  2016-06-16��׼
        BYTE       CAIndex;            // C������λ��                       2016-06-16��׼
        float      CAValue;            // C�ߵ���ֵ                         2016-06-16��׼
        BYTE       CADecimal;          // C�ߵ���ֵС��λ��                 2016-06-16��׼
}POCT_SUBITEM;

//------------------------------------------------------------------------------
// ��Ŀ��Ϣ
//------------------------------------------------------------------------------
typedef struct{
        BYTE         CompanyCode;      // ��˾����
        AnsiString   CompanyName;      // ��˾����
        AnsiString   BarCode;          // ����
        AnsiString   BatchPre;         // ����ǰ׺
        AnsiString   ReportTitle;      // ���浥����
        AnsiString   Area;             // ʹ������
        BYTE         AreaValid;        // �������ñ�־
        BYTE         PeakCount;        // ��ֵ����
        BYTE         BasePeak;         // ��׼��λ��0��ʾȫ�Զ�
        ID_PEAK      Peaks[10];        // ��ֵ����
        WORD         CheckTime;        // ����ʱ��s
        WORD         HatchTime;        // ����ʱ��s
        BYTE         MinPosi;          // С�ٽ�ֵλ��
        DWORD        MinValue;         // С�ٽ�ֵ
        BYTE         MinCheck;         // �Ƿ��жϼ���
        BYTE         MaxPosi;          // ���ٽ�ֵλ��
        DWORD        MaxValue;         // ���ٽ�ֵ
        BYTE         MaxCheck;         // �Ƿ��жϳ嶥
        BYTE         ItemCount;        // ��Ŀ��
        POCT_SUBITEM SIs[5];           // �������
        ID_CURVE     Curves[10];       // 10�����߲���
        BYTE         CurveCnt;         // ��������
        WORD         SampleVol;        // ������
        WORD         ReagentVol;       // �Լ���
        WORD         MixedVol;         // ���Һ��
        BYTE         DeviceType;       // �豸����
        BYTE         ProductCode;      // ��Ʒ����
        WORD         Year;             // ��
        BYTE         Month;            // ��
        BYTE         SerialNo;         // ��ˮ��
        BYTE         ValidMonth;       // ��Ч����          2016-11-23
        AnsiString   Batch;            // ����
        BYTE         Blank;            // �Ƿ������ 0-���� 1-ǿ�Ƽ� 2-�Զ���
        BYTE         Reversal;         // 1    ��ת0����ת 1��ת
        DWORD        ReversalBase;     // 4    ��ת��׼ֵ
}POCT_ITEM;

float __fastcall CalcItemTC(                     // ������Ŀ��TCֵ
                 POCT_ITEM pi,                   // ��Ŀ����
                 ID_PEAKRESULT pr,               // ��ֵ�����λ��
                 int iIndex);                    // ����Ŀ���

void __fastcall ID2POCT(                         // ID����ת������Ŀ����
                ID_ITEM id,
                POCT_ITEM &item);
void __fastcall POCT2ID(                         // ��Ŀ����ת��ΪID����
                POCT_ITEM item,
                ID_ITEM &id);
AnsiString ItemHalfName(AnsiString asName);      // ��Ŀ�������
AnsiString ItemFullName(AnsiString asName);      // ��Ŀȫ������
BYTE __fastcall CalcIDCRC(ID_ITEM id);           // ����ID����ϢУ��  2016-11-28;
bool __fastcall FileIsIDHex(AnsiString asName);  // �ж��ļ��ǲ���ID��HEX�ļ�
void __fastcall SaveIDHex(                       // ������Ŀ����ΪHEX�ļ�
                POCT_ITEM item,                  // ��Ŀ����
                AnsiString asName);              // �����ļ���
bool __fastcall LoadIDHex(                       // ��HEX�ļ���ȡ��Ŀ����
                AnsiString asName,
                POCT_ITEM &item);
void __fastcall LoadItemList(                    // װ����Ŀ�б�
                AnsiString asPath,               // Ŀ¼
                TStrings *sl);
AnsiString GetTCFormula(                         // ����TC���㹫ʽ�ַ���
           int iP[],                             // �������������
           int iPCnt,                            // ���������
           int iMode);                           // ���㷽ʽ


void __fastcall MakeBarcode(POCT_ITEM &item);    // ��������
AnsiString Make2Str(
           WORD wStartYear,
           WORD wProduct,
           WORD wYear,
           WORD wMonth,
           WORD wSerial);
AnsiString Barcode2Bin(POCT_ITEM item);

extern TMemo *mmm;

#endif
