#ifndef uIDCardDefH
#define uIDCardDefH

#include "Algorithm/GetConc.h"

#include <QString>

typedef  unsigned char BYTE ;
typedef  unsigned short int WORD ;
typedef  unsigned int DWORD ;

#define TIME_O_PAGE 6



/*
extern WORD       m_wDots;
extern QString m_sWorkDir;
extern QString m_sTestDir;
extern QString m_sItemDir;
extern QString m_sBaseDir;
*/

//------------------------------------------------------------------------------
// ��������Ϣ     2017-05-26
//------------------------------------------------------------------------------
typedef struct
{
    BYTE         Name[16];         // 16 ����
    BYTE         Unit[8];          //  8 ������λ
    float        RangeMin;         //  4 ��ⷶΧСֵ
    float        RangeMax;         //  4 ��ⷶΧ��ֵ

    BYTE         Decs;             //  1 С��λ��
    //    �߰��ֽ� ������С��λ��
    //    �Ͱ��ֽ� ��ⷶΧС��λ��
    BYTE         Formula[3];       //  3 ��ʽ,�������¹�ʽ����:
    //    3������
    //    2������
    //    2������1������
    //    1������1������
    //    ��ʽ�������:
    //    1.�ܹ�3���ֽ�,�ܹ�����6��Ԫ��,ÿ��Ԫ��ռ�ð���ֽ�
    //    2.���ֽں��嶨������:
    //       0   ��Ԫ��
    //       1-5 ����1-5�Ľ��ֵ(v1-v5)
    //       6   ������(v0)
    //       7   (
    //       8   +
    //       9   -
    //       A   *
    //       B   /
    //    3.����ֻ�õ���,��������ı��ʽ�涨ֻ��3��Ԫ��
    //    4.����:(v1+v2)*v0 �洢Ϊ: 71 82 A6
    //           v0/(v1+v3) �洢Ϊ: 6B 71 83
    //           v1+v2+v3   �洢Ϊ: 18 28 30
    float        Constant;         //  4 ������
} ID_COMBOUT;                          // ------40�ֽ�
//------------------------------------------------------------------------------
// ��������Ϣ     2017-05-26
//------------------------------------------------------------------------------
typedef struct
{
    QString   Name;             // ����
    QString   Unit;             // ������λ
    BYTE         OutputDec;        // ���С��λ��
    float        RangeMin;         // ��ⷶΧСֵ
    float        RangeMax;         // ��ⷶΧ��ֵ
    BYTE         RangeDec;         // ��ⷶΧС��λ��
    float        Constant;         // ������
    BYTE         Formula[3];       // ��ʽ,��������ID_COMBOUT��Ӧ��
} POCT_COMBOUT;


typedef struct
{
    BYTE  StdCount;                // 1   ��׼Ʒ����
    BYTE  ConcTrans;               // 1   Ũ�ȱ任   1 : ȡ���� 0 : ������
    BYTE  RespTrans;               // 1   ��Ӧֵ�任 1 : ȡ���� 0 : ������
    BYTE  StdDec;                  // 1   Ũ�Ⱥͷ�ӦֵС��λ��
    //     bit 7-4 : Ũ��С��λ��
    //     bit 3-0 : ��ӦֵС��λ��
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
    float Concs[16];               // 64  ��׼ƷŨ��  2017-05-26 ��21���16
    BYTE  Extend01[20];            // 20  ��չ01      2017-05-26
    float Resps[16];               // 64  ��׼Ʒ��Ӧֵ
    BYTE  Extend02[20];            // 20  ��չ02      2017-05-26
    float a[6];                    // 24  ����ϵ��
} ID_CURVE;
// ----200�ֽ�---------------------------

// 20170316
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
                                       //     �����±�  �߰��ֽ�  �Ͱ��ֽ�
                                       //       0       ��5����� ��0�����
                                       //       1       ��6����� ��1�����
                                       //       2       ��7����� ��2�����
                                       //       3       ��8����� ��3�����
                                       //       4                ��4�����
        BYTE       RatioDec;           // 1   ϵ��С��λ��
        BYTE       TempControl;        // 1

        float      Ratios[9];          // 36  9���������͵�ϵ��
        ID_PEAK    siPeaks[4];         // 24  ��������䶨�壬���4����    2016-08-18
        WORD       SubCheck;           // 2   ����δ�������ʱ��(1������)  2016-10-19
        WORD       SubHatch;           // 2   �������ʱ��(1������)        2016-10-19
        WORD       SubMinValue;        // 2   ����δ�����ж�ֵ             2016-11-29
        BYTE       siChannel;          // 1   ������Ŀ����ͨ����(1������)  2016-08-18
  //      BYTE       PrintInfo[33];      // 33  ��ӡ��Ϣ(�ϰ汾Ϊ64)         2016-08-18

        BYTE       DblCurve;           // 1   TC�Ƿ�ֶο���������Ϸ�ʽ   2017-12-14
                                       //      0   ���ֶο�������
                                       //      ��0 �ֶο�������
                                       //          1: ��TC1�ж��ֽ��
                                       //          2: ��TC2�ж��ֽ��
                                       //          0X10-0XF0: �Է�ֵ�ж��ֽ��
                                       //          ��ʱRatios[9]�������TC�ֶε���ж�ֵ
                                       //          С�ڴ�ֵ�İ���һ������CurveNos��ϼ���
                                       //          ���ڴ�ֵ�İ��ڶ�������CurveNos2��ϼ���
        BYTE       CurveNos2[5];       // 5   �ڶ���TC�������Ͷ�Ӧ�������
                                       //     �����±�  �߰��ֽ�  �Ͱ��ֽ�
                                       //       0       ��5����� ��0�����
                                       //       1       ��6����� ��1�����
                                       //       2       ��7����� ��2�����
                                       //       3       ��8����� ��3�����
                                       //       4                 ��4�����
        BYTE       PeakCount;          // 1   ͨ�����������            2018-05-29
        BYTE       PrintInfo[26];      // 26  ��ӡ��Ϣ(�ϰ汾Ϊ64-31)   2017-12-18



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
// 20170316 end

//------------------------------------------------------------------------------
// ������Ϣ
//------------------------------------------------------------------------------
typedef struct{
        QString    Name[5];            // ��Ŀ����,��Ӧ5����ⷶΧ
        QString    Unit[5];            // ������λ
        float      RangeMin[5];        // ��ⷶΧСֵ
        float      RangeMax[5];        // ��ⷶΧ��ֵ
        BYTE       RangeDec;           // ��ⷶΧС��λ��
        BYTE       CalcPosi[3];        // ���㹫ʽ�����ڷ�ֵλ��
        BYTE       CalcPosi2[3];       // �ڶ���TC�����ֵλ��             2017-12-18
        BYTE       CalcMode;           // ���㷽�� CP:CalcPosi
        BYTE       CalcMode2;          // ���㷽�� CP:CalcPosi             2017-12-18
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
                                       //     5: CP[0]/(CP[0]+CP[1]+CP[2])
                                       //     6: CP[0]/(CP[0]+CP[2])
                                       //     7: CP[0]/(CP[1]+CP[2])       2016-11-23
                                       //     8: (CP[0]-B)/(CP[1]-B)       2016-12-01  04�ͻ�
        BYTE       CurveNos[9];        // 9���������Ͷ�Ӧ���������
        BYTE       CurveNos2[9];       // 9���������Ͷ�Ӧ���������2       2017-12-18
        float      Ratios[9];          // 9����������ϵ��
        BYTE       DblCurve;           // 2017-12-18
        BYTE       RatioDec;           // ϵ��С��λ��

        QString    PrintInfo;          // ��ӡ��Ϣ

        BYTE       PeakCount;          // ��ͨ�����������             2018-05-29
        BYTE       BasePeak;           // ��ͨ����׼�嶨��             2018-05-29
        ID_PEAK    siPeaks[4];         // ��������䶨�壬���4����    2016-08-18
        WORD       SubCheck;           // ����δ�������ʱ��(1������)  2016-10-19
        WORD       SubHatch;           // �������ʱ��(1������)        2016-10-19
        WORD       SubMinValue;        // ����δ�����ж�ֵ             2016-11-29
        qint8      siChannel;          // ������Ŀ����ͨ����(һ������) 2016-08-18

        DWORD      LessThan;           // TֵС�ڸ�ֵʱ���������ϵ��
        float      LessThanRatio;      // ϵ��
        QString    Output;             // ��Ŀ���ѡ�� 0��ʾ����� 1��ʾ��� ��Ӧ�����ʱ�� Ĭ��ȫ�����
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
        QString      CompanyName;      // ��˾����
        QString      BarCode;          // ����
        QString      BatchPre;         // ����ǰ׺
        QString      ReportTitle;      // ���浥����
        QString      Area;             // ʹ������
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
        QString      Batch;            // ����
        BYTE         Blank;            // �Ƿ������ 0-���� 1-ǿ�Ƽ� 2-�Զ���
        BYTE         Reversal;         // 1    ��ת0����ת 1��ת
        DWORD        ReversalBase;     // 4    ��ת��׼ֵ
        POCT_COMBOUT CombOut[3];       // ����������   2017-05-26
}POCT_ITEM;



typedef struct _SUB_SAVE_ITEM{
    char  Name[16] ;              // ��Ŀ��
    float Cvalue ;                // ���Խ������ֵ
    float Xx[4] ;                 // ԭʼ�����ķ�ֵ�����4���壬��һ��ȫʹ��
    float TC ;                    // ���߷����õ���TCֵ

    unsigned int time;            // ����ṹ�����ݲ�����ʱ�䣬��1970/01/01 00:00:00����������
    signed char channel;          // ������ʱ�������е���һͨ��������
    unsigned char float_decimal;  // c_value��Cvale�ľ�ȷfloat_decimalλС�����ɵ�ASCII�ַ�����ʾ
    char c_value[8];              // ͬ�Ͻ���
    char Unit[10] ;               // ��Cvalue���ݵ�����λ

} SUB_SAVE_ITEM;

struct SAVE_ITEM{
    WORD Nums ;                   // ���
    char c_Nums[30] ;             // ��ˮ���ַ�����ʽ
    unsigned char  BarCode[4];    // ��Ӧ��Ŀ����
    char Time[16] ;               // �ýṹ�����ʱ�䣬�ַ�����ʽ�����ﾫȷʱ����
    WORD Year ;                   // ����ʱ��
    char Month;                   //
    char Day;                     // ͬ��
    char Prj_name[32] ;           // ��������
    char p_name[12] ;             // ����
    char Type[30]  ;              // ��������
    unsigned char Classify_code ; // �û�����
    char age_index ;              // ����
    char sex[8] ;                 // �Ա�
    int  serial_num ;             //��ˮ��
    char serial_code[20] ;        //��ˮ��198

    char age_valuse[12];

    char float_decimal[5] ;       // С��λ
    unsigned char sub_count ;     // ����ӵ��SUB_SAVE_ITEM�ṹ����


} __attribute((aligned (256)));

typedef struct{
    int num ;
    WORD Year ; //2
    char Month; //1
    char Day; //
    char Time[16] ;
    int Datas_number ;
    float Datas[400] ;
    float Peaks_value[10] ;
    int Peaks_position[10] ;
    int Peak_number ;
    float TC;
}SAVE_DEBUG_ITEM;

typedef struct _SET_TEST{
    int Startnum ;
    int Numlenth ;
    bool Samelenth ;
    bool Autoprint ;
    bool Scanbar ;
    int  keepdays ;
    bool Autotest ;
    int showTemperature;
    bool Beep;//�������� 2018/10/10
}SET_TEST;

typedef struct _RECORD_LIST{
    unsigned int num ;
    char check_state[5] ;
    char file_name[5][128] ;
    char count ;
}RECORD_LIST ;

typedef struct _TIME_LIST{
    unsigned int num ;
    char check_state[TIME_O_PAGE] ;
    char code[TIME_O_PAGE][24] ;
    char prj_name[TIME_O_PAGE][32] ;
    int     time[TIME_O_PAGE] ;                     //��ʱ�������ʱ��  -1���ܣ�-2��ɾ��
    char count ;
}TIME_LIST ;

typedef struct _TIME_ITEM_LIST{
    unsigned int num ;
    int state ;       //-2-->ʱ���� -1-->��û��ʼ 0->timeout 0~...
    int time ;
}TIME_ITEM_LIST ;


typedef struct _ITEM_SCAN{
    QString item_name ;
    int User_code[100] ;
} ITEM_SCAN;

typedef struct _PROJECT_ITEM{
    QString prj_name ;
    double up ;
    double low ;
    QString str_up ;
    QString str_low ;
} PROJECT_ITEM;

typedef struct _RATIO_ITEM{
    QString prj_name ;
    QString str_ratio ;
} RATIO_ITEM;

typedef struct _SET_LIS{
    bool auto_upload ;
    int udp_port ;
    QString udp_ip ;
    int uart_buad ;
    int com ;
    int current_upload_way ;
    int language ;
    QString local_ip ;
}SET_LIS;

typedef struct _SYSTEM_CONFIG{
    unsigned char card_type ;
    bool use_wifi ;
    QString  machine ;
    QString  version[2] ;
    uchar warning ;
    bool hide_set_bar ;
    int hasBuild;
    QString sample_type[2][9]; // 0 ���� 1 Ӣ��
}SYSTEM_CONFIG ;

//�������ṹ
typedef struct _MUTI_CARD{
    QString main_name ;
    QString sub_name[25] ;
    unsigned char sub_count ;
    unsigned char sub_use[25] ;
}MUTI_CARD ;



#endif
