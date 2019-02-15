#ifndef uIDCardDefH
#define uIDCardDefH


#include <stdio.h>
#include <QString>

typedef  unsigned char BYTE ;
typedef  unsigned short int WORD ;
typedef  unsigned int DWORD ;
//delete __fs...
#define TIME_O_PAGE 6


extern BYTE       m_BCompanyCode;   // ?????ú??
extern QString m_sCompanyName;   // ????????
extern QString m_sFileHead;      // ID HEX?????·
extern WORD       m_wDots;          // ???è??????????
extern QString m_sWorkDir;       // ?€×÷????
extern QString m_sTestDir;       // ????????
extern QString m_sItemDir;       // ????HEX????
extern QString m_sBaseDir;       // ?ù±?????????

//// ?????ü?????á?? ////////////////////////////////////////////////////////////
typedef struct _VCI_LB_CMD
{
    BYTE CompanyCode;        // ?????ú??
    BYTE ProductCode;        // ?ú?·?ú??
    BYTE ModuleAddr;         // ???é???·
    BYTE WR_Mode;            // ???????? 00??   01??
    BYTE WorkState;          // ?€×÷×??? 00???? 01?÷??
    BYTE Function1;          // ??????1
    BYTE Function2;          // ??????2
    BYTE Data[16];           // ??????,16×???
    BYTE CRC;                // ?°23×????????é??
}VCI_LB_CMD,*PVCI_LB_CMD;

///// ???????????÷?ò?????á????//////////////////////////////////////////////////
// 00,  03 ,00 ,00 ,01 ,1F ,00, ?????ú??????,
// ?ú??????, ???÷????????, ????????, ?€??????,?€??????, ?ê·?, ??·?, ???÷±à??????
// ±à??????, ????????,     ????????,XX,XX,XX,XX,???é
typedef struct _VCI_LB_DEVSN
{
    BYTE BHead[7];               // 00,  03 ,00 ,00 ,01 ,1F ,00
    WORD WCompany;               // ?????ú??
    WORD WDev;                   // ???÷????
    BYTE BSave1[2];              // ±???2×???
    BYTE BYear;                  // ?ê·?
    BYTE BMonth;                 // ??·?
    WORD WDevSN;                 // ???÷±à??
    BYTE BSave2[4];              // ±???4×???
    BYTE BMD1;                   // ????1
    BYTE BMD2;                   // ????2
    BYTE BCRC;                   // ???é
}VCI_LB_DEVSN;

typedef struct{
        WORD From;                     // ·???????
        WORD To;                       // ·???????
        BYTE Count;                    // ????????
        BYTE Style;                    // ????????·???
}ID_PEAK;


typedef struct{
        BYTE  StdCount;                // 1   标准品个数
        BYTE  ConcTrans;               // 1   浓度变换   1 : 取对数 0 : 不处理
        BYTE  RespTrans;               // 1   反应值变换 1 : 取对数 0 : 不处理
        BYTE  StdDec;                  // 1   浓度和反应值小数位数
                                       //     bit 7-4 : 浓度小数位数
                                       //     bit 3-0 : 反应值小数位数
        BYTE  Method;                  // 1   拟合方法
                                       //     0 : 直线
                                       //     1 : 多项式
                                       //     2 : MMF
                                       //     3 : 三次样条
                                       //     4 : 对数拟合
                                       //     5 : 幂函数拟合
                                       //     6 : 逻辑斯蒂模型
                                       //     7 : 指数拟合
                                       //     8 : 线性插值
        BYTE  SectPosi;                // 1   多项式分段位置0表示不分段
        BYTE  SectLimits[2];           // 2   多项式次数 0表示自动 1-6表示次数
        float Concs[21];               // 84  标准品浓度
        float Resps[21];               // 84  标准品反应值
        float a[6];                    // 24  曲线系数
}ID_CURVE;                             // ----200字节---------------------------

typedef struct{
        BYTE  Name[5][16];             // 80  5个项目名称
        BYTE  Unit[5][16];             // 80  计量单位
        float RangeMin[5];             // 20  检测范围小值
        float RangeMax[5];             // 20  检测范围大值
        BYTE  RangeDec;                // 1   检测范围小数位数
        BYTE  CalcPosi[3];             // 3   计算公式项所在峰值位置
        BYTE  CalcMode;                // 1   计算方法 CP:CalcPosi
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
        BYTE  BloodCurve;              // 1   全血曲线序号
        BYTE  BloodSCurve;             // 1   血清血浆曲线序号
        BYTE  UrineCurve;              // 1   尿液曲线序号
        BYTE  FaecesCurve;             // 1   粪便曲线序号
        BYTE  ControlCurve;            // 1   质控曲线序号
        BYTE  RatioDec;                // 1   系数小数位数
        BYTE  TempControl;             // 1   温度补偿
                                       //     bit 7   : 0-不补偿 1-补偿
                                       //     bit 6-0 : 补偿系数小数位数
        float Blood;                   // 4   全血系数
        float BloodS;                  // 4   血清血浆系数
        float Urine;                   // 4   尿液系数
        float Faeces;                  // 4   粪便系数
        float Control;                 // 4   质控系数
        float a;                       // 4   温度补偿参数 a
        float b;                       // 4   温度补偿参数 b
        float a1;                      // 4   温度补偿参数 a1
        float b1;                      // 4   温度补偿参数 b1
        BYTE  PrintInfo[64];           // 64  打印信息
        DWORD LessThan;                // 4   T值小于该值时乘以下面的系数
        float LessThanRatio;           // 4   系数
}ID_SUBITEM;                           // ------320字节-------------------------

//------------------------------------------------------------------------------
// ID卡HEX文件结构定义
//------------------------------------------------------------------------------
typedef struct{
        BYTE       FileHead[8];        // 8    文件头标志 LABSIMID
        BYTE       Version;            // 1    版本号
        BYTE       CompanyCode;        // 1    公司代码
        BYTE       CompanyName[20];    // 20   公司名称
        BYTE       BarCode[13];        // 13   ID卡条码
        BYTE       BatchPre[16];       // 16   批号前缀
        BYTE       ReportTitle[16];    // 16   报告单标题
        BYTE       AreaValid;          // 1    区域启用
        BYTE       Area[20];           // 20   区域名称
        ID_PEAK    Peaks[10];          // 60   峰值定义
        WORD       CheckTime;          // 2   未加样检测时间
        WORD       HatchTime;          // 2   测试时间
        DWORD      MinValue;           // 4   未加样判定值
        DWORD      MaxValue;           // 4   冲顶判定值
        BYTE       MinPosi;            // 1   小于4000的取峰位置(未加样)
        BYTE       MinCheck;           // 1   是否检测未加样
        BYTE       MaxPosi;            // 1   大于26万的取峰位置(冲顶)
        BYTE       MaxCheck;           // 1   是否检测未加样
        ID_SUBITEM Items[5];           // 1600 项目定义
        BYTE       PeakCount;          // 1    峰值个数
        BYTE       ItemCount;          // 1    项目数
        WORD       SampleVol;          // 2    加样量
        WORD       ReagentVol;         // 2    试剂量
        WORD       MixedVol;           // 2    混合液量
        BYTE       DeviceType;         // 1    设备类型
        BYTE       ProductCode;        // 1    产品代码
        WORD       Year;               // 2    年
        BYTE       Month;              // 1    月
        BYTE       SerialNo;           // 1    流水号
        BYTE       Batch[5];           // 5    批号
        BYTE       Blank;              // 1    峰值是否减本底 0-不减
        ID_CURVE   Curves[10];         // 2000 10条曲线
        BYTE       Reserved[304];      // 308  保留字节
}ID_ITEM;

//------------------------------------------------------------------------------
// 子项信息
//------------------------------------------------------------------------------
typedef struct{
        QString Name[5];            // 项目名称,对应5个检测范围
        QString Unit[5];            // 计量单位
        float      RangeMin[5];        // 检测范围小值
        float      RangeMax[5];        // 检测范围大值
        BYTE       RangeDec;           // 检测范围小数位数
        BYTE       CalcPosi[3];        // 计算公式项所在峰值位置
        BYTE       CalcMode;           // 计算方法 CP:CalcPosi
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
        BYTE       BloodCurve;         // 全血曲线序号
        BYTE       BloodSCurve;        // 血清血浆曲线序号
        BYTE       UrineCurve;         // 尿液曲线序号
        BYTE       FaecesCurve;        // 粪便曲线序号
        BYTE       ControlCurve;       // 质控曲线序号
        float      Blood;              // 全血系数
        float      BloodS;             // 血清血浆系数
        float      Urine;              // 尿液系数
        float      Faeces;             // 粪便系数
        float      Control;            // 质控系数
        float      a;                  // 温度补偿参数 a
        float      b;                  // 温度补偿参数 b
        float      a1;                 // 温度补偿参数 a1
        float      b1;                 // 温度补偿参数 b1
        BYTE       RatioDec;           // 系数小数位数
        BYTE       TempDec;            // 温度补偿系数小数位数
        BYTE       TempComp;           // 温度补偿标志:0补偿1不补偿
        QString PrintInfo;          // 打印信息
        DWORD LessThan;                // 4   T值小于该值时乘以下面的系数
        float LessThanRatio;           // 4   系数
        QString Output;             // 项目输出选项 0表示不输出 1表示输出 对应多项的时候 默认全部输出
}POCT_SUBITEM;

//------------------------------------------------------------------------------
// 项目信息
//------------------------------------------------------------------------------
typedef struct{
        BYTE         CompanyCode;      // 公司代码
        QString   CompanyName;      // 公司名称
        QString   BarCode;          // 条码
        QString   BatchPre;         // 批号前缀
        QString   ReportTitle;      // 报告单标题
        QString   Area;             // 使用区域
        BYTE         AreaValid;        // 区域启用标志
        BYTE         PeakCount;        // 峰值个数
        BYTE       BasePeak ;       //基准峰位置0表示全自动 01_08
        ID_PEAK      Peaks[10];        // 峰值定义
        WORD         CheckTime;        // 加样时间s
        WORD         HatchTime;        // 孵育时间s
        BYTE         MinPosi;          // 小临界值位置
        DWORD        MinValue;         // 小临界值
        BYTE         MinCheck;         // 是否判断加样
        BYTE         MaxPosi;          // 大临界值位置
        DWORD        MaxValue;         // 大临界值
        BYTE         MaxCheck;         // 是否判断冲顶
        BYTE         ItemCount;        // 项目数
        POCT_SUBITEM SIs[5];           // 子项参数
        ID_CURVE     Curves[10];       // 10条曲线参数
        WORD         SampleVol;        // 加样量
        WORD         ReagentVol;       // 试剂量
        WORD         MixedVol;         // 混合液量
        BYTE         DeviceType;       // 设备类型
        BYTE         ProductCode;      // 产品代码
        WORD         Year;             // 年
        BYTE         Month;            // 月
        BYTE         SerialNo;         // 流水号
        QString   Batch;            // 批号
        BYTE         Blank;            // 是否减本底
}POCT_ITEM;

typedef struct{
        int   Position[10];            // ·???????
        float Value[10];               // ·????á??
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
    int    serial_num ;  //流水号
    char Type[10]  ;                    //测试类型
    char float_decimal[5] ;        //小数位
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
    int     time[TIME_O_PAGE] ;                     //暂时用作间隔时间  -1不管，-2作删除
    char count ;
}TIME_LIST ;

typedef struct _TIME_ITEM_LIST{
    unsigned int num ;
    int state ;       //-2-->时间间隔 -1-->还没开始 0->timeout 0~...
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


void  old_CalcPeak(                        // ????·???
                DWORD   buf[],                   // ??????????
                int     DotCount,                // ????
                ID_PEAK pds[],                   // ·???????????
                int     PeakCount,               // ·?????
                bool    bBlank,                  // ??·???±??×
                DWORD   &dwBlank,                // ±??×??
                ID_PEAKRESULT &pr);              // ·????á??

void  ID2POCT(                         // ID????×?????????????
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

void  POCT2ID(                         // ????????×?????ID????
                POCT_ITEM item,
                ID_ITEM &id);
QString ItemHalfName(QString asName);      // ????°???????
QString ItemFullName(QString asName);      // ????????????
//bool  FileIsIDHex(QString asName);  // ??????????????ID??HEX????
void  SaveIDHex(                       // ±?????????????HEX????
                POCT_ITEM item,                  // ????????
                char* asName);              // ±?????????
bool  LoadIDHex(                       // ??HEX????????????????
                const char* asName,
                POCT_ITEM &item);
//void  LoadItemList(                    // ×°????????±í
 //               QString asPath,               // ????
 //               TStrings *sl);
BYTE  PackTime(WORD w) ;


extern VCI_LB_DEVSN m_lbDevSN;                   // ???÷?ò????

#endif
