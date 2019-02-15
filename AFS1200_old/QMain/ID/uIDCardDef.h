#ifndef uIDCardDefH
#define uIDCardDefH


#include <stdio.h>
#include <QString>

typedef  unsigned char BYTE ;
typedef  unsigned short int WORD ;
typedef  unsigned int DWORD ;
//delete __fs...
#define TIME_O_PAGE 6


extern BYTE       m_BCompanyCode;   // ?????��??
extern QString m_sCompanyName;   // ????????
extern QString m_sFileHead;      // ID HEX?????��
extern WORD       m_wDots;          // ???��??????????
extern QString m_sWorkDir;       // ?�����????
extern QString m_sTestDir;       // ????????
extern QString m_sItemDir;       // ????HEX????
extern QString m_sBaseDir;       // ?����?????????

//// ?????��?????��?? ////////////////////////////////////////////////////////////
typedef struct _VCI_LB_CMD
{
    BYTE CompanyCode;        // ?????��??
    BYTE ProductCode;        // ?��?��?��??
    BYTE ModuleAddr;         // ???��???��
    BYTE WR_Mode;            // ???????? 00??   01??
    BYTE WorkState;          // ?����¡�??? 00???? 01?��??
    BYTE Function1;          // ??????1
    BYTE Function2;          // ??????2
    BYTE Data[16];           // ??????,16��???
    BYTE CRC;                // ?��23��????????��??
}VCI_LB_CMD,*PVCI_LB_CMD;

///// ???????????��?��?????��????//////////////////////////////////////////////////
// 00,  03 ,00 ,00 ,01 ,1F ,00, ?????��??????,
// ?��??????, ???��????????, ????????, ?��??????,?��??????, ?����?, ??��?, ???�¡���??????
// ����??????, ????????,     ????????,XX,XX,XX,XX,???��
typedef struct _VCI_LB_DEVSN
{
    BYTE BHead[7];               // 00,  03 ,00 ,00 ,01 ,1F ,00
    WORD WCompany;               // ?????��??
    WORD WDev;                   // ???��????
    BYTE BSave1[2];              // ��???2��???
    BYTE BYear;                  // ?����?
    BYTE BMonth;                 // ??��?
    WORD WDevSN;                 // ???�¡���??
    BYTE BSave2[4];              // ��???4��???
    BYTE BMD1;                   // ????1
    BYTE BMD2;                   // ????2
    BYTE BCRC;                   // ???��
}VCI_LB_DEVSN;

typedef struct{
        WORD From;                     // ��???????
        WORD To;                       // ��???????
        BYTE Count;                    // ????????
        BYTE Style;                    // ????????��???
}ID_PEAK;


typedef struct{
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
        BYTE  SectPosi;                // 1   ����ʽ�ֶ�λ��0��ʾ���ֶ�
        BYTE  SectLimits[2];           // 2   ����ʽ���� 0��ʾ�Զ� 1-6��ʾ����
        float Concs[21];               // 84  ��׼ƷŨ��
        float Resps[21];               // 84  ��׼Ʒ��Ӧֵ
        float a[6];                    // 24  ����ϵ��
}ID_CURVE;                             // ----200�ֽ�---------------------------

typedef struct{
        BYTE  Name[5][16];             // 80  5����Ŀ����
        BYTE  Unit[5][16];             // 80  ������λ
        float RangeMin[5];             // 20  ��ⷶΧСֵ
        float RangeMax[5];             // 20  ��ⷶΧ��ֵ
        BYTE  RangeDec;                // 1   ��ⷶΧС��λ��
        BYTE  CalcPosi[3];             // 3   ���㹫ʽ�����ڷ�ֵλ��
        BYTE  CalcMode;                // 1   ���㷽�� CP:CalcPosi
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
        BYTE  BloodCurve;              // 1   ȫѪ�������
        BYTE  BloodSCurve;             // 1   Ѫ��Ѫ���������
        BYTE  UrineCurve;              // 1   ��Һ�������
        BYTE  FaecesCurve;             // 1   ����������
        BYTE  ControlCurve;            // 1   �ʿ��������
        BYTE  RatioDec;                // 1   ϵ��С��λ��
        BYTE  TempControl;             // 1   �¶Ȳ���
                                       //     bit 7   : 0-������ 1-����
                                       //     bit 6-0 : ����ϵ��С��λ��
        float Blood;                   // 4   ȫѪϵ��
        float BloodS;                  // 4   Ѫ��Ѫ��ϵ��
        float Urine;                   // 4   ��Һϵ��
        float Faeces;                  // 4   ���ϵ��
        float Control;                 // 4   �ʿ�ϵ��
        float a;                       // 4   �¶Ȳ������� a
        float b;                       // 4   �¶Ȳ������� b
        float a1;                      // 4   �¶Ȳ������� a1
        float b1;                      // 4   �¶Ȳ������� b1
        BYTE  PrintInfo[64];           // 64  ��ӡ��Ϣ
        DWORD LessThan;                // 4   TֵС�ڸ�ֵʱ���������ϵ��
        float LessThanRatio;           // 4   ϵ��
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
        ID_PEAK    Peaks[10];          // 60   ��ֵ����
        WORD       CheckTime;          // 2   δ�������ʱ��
        WORD       HatchTime;          // 2   ����ʱ��
        DWORD      MinValue;           // 4   δ�����ж�ֵ
        DWORD      MaxValue;           // 4   �嶥�ж�ֵ
        BYTE       MinPosi;            // 1   С��4000��ȡ��λ��(δ����)
        BYTE       MinCheck;           // 1   �Ƿ���δ����
        BYTE       MaxPosi;            // 1   ����26���ȡ��λ��(�嶥)
        BYTE       MaxCheck;           // 1   �Ƿ���δ����
        ID_SUBITEM Items[5];           // 1600 ��Ŀ����
        BYTE       PeakCount;          // 1    ��ֵ����
        BYTE       ItemCount;          // 1    ��Ŀ��
        WORD       SampleVol;          // 2    ������
        WORD       ReagentVol;         // 2    �Լ���
        WORD       MixedVol;           // 2    ���Һ��
        BYTE       DeviceType;         // 1    �豸����
        BYTE       ProductCode;        // 1    ��Ʒ����
        WORD       Year;               // 2    ��
        BYTE       Month;              // 1    ��
        BYTE       SerialNo;           // 1    ��ˮ��
        BYTE       Batch[5];           // 5    ����
        BYTE       Blank;              // 1    ��ֵ�Ƿ������ 0-����
        ID_CURVE   Curves[10];         // 2000 10������
        BYTE       Reserved[304];      // 308  �����ֽ�
}ID_ITEM;

//------------------------------------------------------------------------------
// ������Ϣ
//------------------------------------------------------------------------------
typedef struct{
        QString Name[5];            // ��Ŀ����,��Ӧ5����ⷶΧ
        QString Unit[5];            // ������λ
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
        BYTE       BloodCurve;         // ȫѪ�������
        BYTE       BloodSCurve;        // Ѫ��Ѫ���������
        BYTE       UrineCurve;         // ��Һ�������
        BYTE       FaecesCurve;        // ����������
        BYTE       ControlCurve;       // �ʿ��������
        float      Blood;              // ȫѪϵ��
        float      BloodS;             // Ѫ��Ѫ��ϵ��
        float      Urine;              // ��Һϵ��
        float      Faeces;             // ���ϵ��
        float      Control;            // �ʿ�ϵ��
        float      a;                  // �¶Ȳ������� a
        float      b;                  // �¶Ȳ������� b
        float      a1;                 // �¶Ȳ������� a1
        float      b1;                 // �¶Ȳ������� b1
        BYTE       RatioDec;           // ϵ��С��λ��
        BYTE       TempDec;            // �¶Ȳ���ϵ��С��λ��
        BYTE       TempComp;           // �¶Ȳ�����־:0����1������
        QString PrintInfo;          // ��ӡ��Ϣ
        DWORD LessThan;                // 4   TֵС�ڸ�ֵʱ���������ϵ��
        float LessThanRatio;           // 4   ϵ��
        QString Output;             // ��Ŀ���ѡ�� 0��ʾ����� 1��ʾ��� ��Ӧ�����ʱ�� Ĭ��ȫ�����
}POCT_SUBITEM;

//------------------------------------------------------------------------------
// ��Ŀ��Ϣ
//------------------------------------------------------------------------------
typedef struct{
        BYTE         CompanyCode;      // ��˾����
        QString   CompanyName;      // ��˾����
        QString   BarCode;          // ����
        QString   BatchPre;         // ����ǰ׺
        QString   ReportTitle;      // ���浥����
        QString   Area;             // ʹ������
        BYTE         AreaValid;        // �������ñ�־
        BYTE         PeakCount;        // ��ֵ����
        BYTE       BasePeak ;       //��׼��λ��0��ʾȫ�Զ� 01_08
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
        WORD         SampleVol;        // ������
        WORD         ReagentVol;       // �Լ���
        WORD         MixedVol;         // ���Һ��
        BYTE         DeviceType;       // �豸����
        BYTE         ProductCode;      // ��Ʒ����
        WORD         Year;             // ��
        BYTE         Month;            // ��
        BYTE         SerialNo;         // ��ˮ��
        QString   Batch;            // ����
        BYTE         Blank;            // �Ƿ������
}POCT_ITEM;

typedef struct{
        int   Position[10];            // ��???????
        float Value[10];               // ��????��??
        int   From[10] ;
        int   To[10] ;
}ID_PEAKRESULT;

typedef struct _SUB_SAVE_ITEM{
    char  Name[16] ; //16
    float Cvalue ; //4
    char c_value[10] ;
    char Unit[10] ; //16
} SUB_SAVE_ITEM;

typedef struct _SAVE_ITEM{
    WORD Nums ; //2
    char c_Nums[30] ;
    unsigned char  BarCode[4]; //4
    char Time[16] ; //16
    WORD Year ; //2
    char Month; //1
    char Day; //1--->196
    char Prj_name[32] ;
    char hsCRP[8] ;
    unsigned char Classify_code ;
    float Xx[4] ;
    float TC ;
    char p_name[12] ;
    char age ;
    char sex[3] ;
    int    serial_num ;  //��ˮ��
    char Type[10]  ;                    //��������
    char float_decimal[5] ;        //С��λ
    unsigned char sub_count ;
    char Reserved[144] ;             //
}SAVE_ITEM;//300

typedef struct{
    int num ;
    WORD Year ; //2
    char Month; //1
    char Day; //
    char Time[16] ;
    int Datas_number ;
    float Datas[300] ;
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
}SET_TEST;

typedef struct _RECORD_LIST{
    unsigned int num ;
    char check_state[5] ;
    char file_name[5][55] ;
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

typedef struct _LOST_FOUND{
    char head[5] ;
    char item_name[32] ;
    char code[24] ;
    char datetime[22] ;
    int count_time ;
    uchar state ;
    char nouse[32] ;
    char end[4] ;
}LOST_FOUND;

typedef struct _ITEM_SCAN{
    QString item_name ;
    int User_code[100] ;
} ITEM_SCAN;

typedef struct _PROJECT_ITEM{
    QString prj_name ;
    double up ;
    double low ;
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
    QString  version ;
    uchar warning ;
    uchar use_piliangceshi ;
}SYSTEM_CONFIG ;

typedef struct _UART_COF{
    QString  name ;
    uint  baud ;
    int fd ;
}UART_COF ;


void  old_CalcPeak(                        // ????��???
                DWORD   buf[],                   // ??????????
                int     DotCount,                // ????
                ID_PEAK pds[],                   // ��???????????
                int     PeakCount,               // ��?????
                bool    bBlank,                  // ??��???��??��
                DWORD   &dwBlank,                // ��??��??
                ID_PEAKRESULT &pr);              // ��????��??

void  ID2POCT(                         // ID????��?????????????
                ID_ITEM id,
                POCT_ITEM &item);

int CalcSingleTop(
                DWORD buf[],
                int ifrom,
                int ito) ;
void CalcPeak(
                DWORD   buf[],
                int     DotCount,
                ID_PEAK pdsSrc[],
                int     PeakCount,
                int     BasePeak,
                BYTE    BBlank,
                DWORD   &dwBlank,
                ID_PEAKRESULT &pr);

void  POCT2ID(                         // ????????��?????ID????
                POCT_ITEM item,
                ID_ITEM &id);
QString ItemHalfName(QString asName);      // ????��???????
QString ItemFullName(QString asName);      // ????????????
//bool  FileIsIDHex(QString asName);  // ??????????????ID??HEX????
void  SaveIDHex(                       // ��?????????????HEX????
                POCT_ITEM item,                  // ????????
                char* asName);              // ��?????????
bool  LoadIDHex(                       // ??HEX????????????????
                const char* asName,
                POCT_ITEM &item);
//void  LoadItemList(                    // ����????????����
 //               QString asPath,               // ????
 //               TStrings *sl);
BYTE  PackTime(WORD w) ;


extern VCI_LB_DEVSN m_lbDevSN;                   // ???��?��????

#endif
