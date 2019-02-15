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
// 组合输出信息     2017-05-26
//------------------------------------------------------------------------------
typedef struct
{
    BYTE         Name[16];         // 16 名称
    BYTE         Unit[8];          //  8 计量单位
    float        RangeMin;         //  4 检测范围小值
    float        RangeMax;         //  4 检测范围大值

    BYTE         Decs;             //  1 小数位数
    //    高半字节 结果输出小数位数
    //    低半字节 检测范围小数位数
    BYTE         Formula[3];       //  3 公式,允许以下公式类型:
    //    3个变量
    //    2个变量
    //    2个变量1个常量
    //    1个变量1个变量
    //    公式定义规则:
    //    1.总共3个字节,能够容纳6个元素,每个元素占用半个字节
    //    2.半字节含义定义如下:
    //       0   无元素
    //       1-5 子项1-5的结果值(v1-v5)
    //       6   常数项(v0)
    //       7   (
    //       8   +
    //       9   -
    //       A   *
    //       B   /
    //    3.括号只用单边,括号里面的表达式规定只有3个元素
    //    4.举例:(v1+v2)*v0 存储为: 71 82 A6
    //           v0/(v1+v3) 存储为: 6B 71 83
    //           v1+v2+v3   存储为: 18 28 30
    float        Constant;         //  4 常数项
} ID_COMBOUT;                          // ------40字节
//------------------------------------------------------------------------------
// 组合输出信息     2017-05-26
//------------------------------------------------------------------------------
typedef struct
{
    QString   Name;             // 名称
    QString   Unit;             // 计量单位
    BYTE         OutputDec;        // 输出小数位数
    float        RangeMin;         // 检测范围小值
    float        RangeMax;         // 检测范围大值
    BYTE         RangeDec;         // 检测范围小数位数
    float        Constant;         // 常数项
    BYTE         Formula[3];       // 公式,定义规则见ID_COMBOUT对应项
} POCT_COMBOUT;


typedef struct
{
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
    //     9 : Logistic拟合(4参数)
    //     10: Logistic拟合(5参数)
    BYTE  SectPosi;                // 1   多项式分段位置0表示不分段
    BYTE  SectLimits[2];           // 2   多项式次数 0表示自动 1-6表示次数
    float Concs[16];               // 64  标准品浓度  2017-05-26 由21变成16
    BYTE  Extend01[20];            // 20  扩展01      2017-05-26
    float Resps[16];               // 64  标准品反应值
    BYTE  Extend02[20];            // 20  扩展02      2017-05-26
    float a[6];                    // 24  曲线系数
} ID_CURVE;
// ----200字节---------------------------

// 20170316
typedef struct{
        BYTE       Name[5][16];        // 80  5个项目名称
        BYTE       Unit[5][16];        // 80  计量单位
        float      RangeMin[5];        // 20  检测范围小值
        float      RangeMax[5];        // 20  检测范围大值
        BYTE       RangeDec;           // 1   检测范围小数位数
        BYTE       CalcPosi[3];        // 3   计算公式项所在峰值位置
        BYTE       CalcMode;           // 1   计算方法 CP:CalcPosi
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
                                       //     5: CP[0]/(CP[0]+CP[1]+CP[2])
                                       //     6: CP[0]/(CP[0]+CP[1])
                                       //     7: CP[0]/(CP[1]+CP[2])       2016-11-23
                                       //     8: (CP[0]-B)/(CP[1]-B)       2016-12-01  04客户
        BYTE       CurveNos[5];        // 5   样本类型对应曲线序号
                                       //     数组下标  高半字节  低半字节
                                       //       0       第5类序号 第0类序号
                                       //       1       第6类序号 第1类序号
                                       //       2       第7类序号 第2类序号
                                       //       3       第8类序号 第3类序号
                                       //       4                第4类序号
        BYTE       RatioDec;           // 1   系数小数位数
        BYTE       TempControl;        // 1

        float      Ratios[9];          // 36  9种样本类型的系数
        ID_PEAK    siPeaks[4];         // 24  子项峰区间定义，最多4个峰    2016-08-18
        WORD       SubCheck;           // 2   子项未加样检测时间(1卡多联)  2016-10-19
        WORD       SubHatch;           // 2   子项测试时间(1卡多联)        2016-10-19
        WORD       SubMinValue;        // 2   子项未加样判定值             2016-11-29
        BYTE       siChannel;          // 1   该子项目所在通道号(1卡多联)  2016-08-18
  //      BYTE       PrintInfo[33];      // 33  打印信息(老版本为64)         2016-08-18

        BYTE       DblCurve;           // 1   TC是否分段控制曲线拟合方式   2017-12-14
                                       //      0   不分段控制曲线
                                       //      非0 分段控制曲线
                                       //          1: 以TC1判定分界点
                                       //          2: 以TC2判定分界点
                                       //          0X10-0XF0: 以峰值判定分界点
                                       //          此时Ratios[9]保存的是TC分段点的判定值
                                       //          小于此值的按第一条曲线CurveNos拟合计算
                                       //          大于此值的按第二条曲线CurveNos2拟合计算
        BYTE       CurveNos2[5];       // 5   第二个TC样本类型对应曲线序号
                                       //     数组下标  高半字节  低半字节
                                       //       0       第5类序号 第0类序号
                                       //       1       第6类序号 第1类序号
                                       //       2       第7类序号 第2类序号
                                       //       3       第8类序号 第3类序号
                                       //       4                 第4类序号
        BYTE       PeakCount;          // 1   通道独立峰个数            2018-05-29
        BYTE       PrintInfo[26];      // 26  打印信息(老版本为64-31)   2017-12-18



        DWORD      LessThan;           // 4   T值小于该值时乘以下面的系数
        float      LessThanRatio;      // 4   系数
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
        ID_PEAK    Peaks[10];          // 60   峰区间定义
        WORD       CheckTime;          // 2    未加样检测时间
        WORD       HatchTime;          // 2    测试时间
        DWORD      MinValue;           // 4    未加样判定值
        DWORD      MaxValue;           // 4    冲顶判定值
        BYTE       MinPosi;            // 1    小于4000的取峰位置(未加样)
        BYTE       MinCheck;           // 1    是否检测未加样
        BYTE       MaxPosi;            // 1    大于26万的取峰位置(冲顶)
        BYTE       MaxCheck;           // 1    是否检测冲顶
        ID_SUBITEM Items[5];           // 1600 项目定义(最多5个项目)
        BYTE       PeakCount;          // 1    峰值个数 高半字节为基准峰位置
        BYTE       ItemCount;          // 1    项目数
        WORD       SampleVol;          // 2    加样量
        WORD       ReagentVol;         // 2    试剂量
        WORD       MixedVol;           // 2    混合液量
        BYTE       DeviceType;         // 1    设备类型
        BYTE       ProductCode;        // 1    产品代码
        WORD       Year;               // 2    年
        BYTE       Month;              // 1    月
        BYTE       SerialNo;           // 1    流水号
        BYTE       ValidMonth;         // 1    有效月数          2016-11-23
        BYTE       Batch[4];           // 4    批号
        BYTE       Blank;              // 1    峰值是否减本底 0-不减 1-强制减 2-自动减
        ID_CURVE   Curves[10];         // 2000 10条曲线
        BYTE       CurveCnt;           // 1    曲线数量
        BYTE       Reversal;           // 1    反转0不反转 1反转
        BYTE       Reserved1[2];       // 2    保留字节
        DWORD      ReversalBase;       // 4    反转基准值
        float      CAValue[5];         // 20   C值调节值        2016-06-16金准
        BYTE       CAParam[5];         // 5    C值调节参数      2016-06-16金准
                                       //      7-6位  00禁止 01加调节值 10乘以调节值
                                       //      5-4位  调节值的小数位数
                                       //      3-0位  需要调节的峰值序号
        BYTE       Reserved[271];      // 271  保留字节
}ID_ITEM;
// 20170316 end

//------------------------------------------------------------------------------
// 子项信息
//------------------------------------------------------------------------------
typedef struct{
        QString    Name[5];            // 项目名称,对应5个检测范围
        QString    Unit[5];            // 计量单位
        float      RangeMin[5];        // 检测范围小值
        float      RangeMax[5];        // 检测范围大值
        BYTE       RangeDec;           // 检测范围小数位数
        BYTE       CalcPosi[3];        // 计算公式项所在峰值位置
        BYTE       CalcPosi2[3];       // 第二个TC计算峰值位置             2017-12-18
        BYTE       CalcMode;           // 计算方法 CP:CalcPosi
        BYTE       CalcMode2;          // 计算方法 CP:CalcPosi             2017-12-18
                                       //     0: CP[0]/CP[1]
                                       //     1: CP[0]
                                       //     2: CP[0]+CP[1]
                                       //     3: CP[0]+CP[1]+CP[2]
                                       //     4: (CP[0]+CP[1])/CP[2]
                                       //     5: CP[0]/(CP[0]+CP[1]+CP[2])
                                       //     6: CP[0]/(CP[0]+CP[2])
                                       //     7: CP[0]/(CP[1]+CP[2])       2016-11-23
                                       //     8: (CP[0]-B)/(CP[1]-B)       2016-12-01  04客户
        BYTE       CurveNos[9];        // 9种样本类型对应的曲线序号
        BYTE       CurveNos2[9];       // 9种样本类型对应的曲线序号2       2017-12-18
        float      Ratios[9];          // 9种样本类型系数
        BYTE       DblCurve;           // 2017-12-18
        BYTE       RatioDec;           // 系数小数位数

        QString    PrintInfo;          // 打印信息

        BYTE       PeakCount;          // 子通道峰个数定义             2018-05-29
        BYTE       BasePeak;           // 子通道基准峰定义             2018-05-29
        ID_PEAK    siPeaks[4];         // 子项峰区间定义，最多4个峰    2016-08-18
        WORD       SubCheck;           // 子项未加样检测时间(1卡多联)  2016-10-19
        WORD       SubHatch;           // 子项测试时间(1卡多联)        2016-10-19
        WORD       SubMinValue;        // 子项未加样判定值             2016-11-29
        qint8      siChannel;          // 该子项目所在通道号(一卡多联) 2016-08-18

        DWORD      LessThan;           // T值小于该值时乘以下面的系数
        float      LessThanRatio;      // 系数
        QString    Output;             // 项目输出选项 0表示不输出 1表示输出 对应多项的时候 默认全部输出
        BYTE       CAMethod;           // C线调节方法 0-禁止 1-加上 2-乘以  2016-06-16金准
        BYTE       CAIndex;            // C线所在位置                       2016-06-16金准
        float      CAValue;            // C线调节值                         2016-06-16金准
        BYTE       CADecimal;          // C线调节值小数位数                 2016-06-16金准
}POCT_SUBITEM;


//------------------------------------------------------------------------------
// 项目信息
//------------------------------------------------------------------------------
typedef struct{
        BYTE         CompanyCode;      // 公司代码
        QString      CompanyName;      // 公司名称
        QString      BarCode;          // 条码
        QString      BatchPre;         // 批号前缀
        QString      ReportTitle;      // 报告单标题
        QString      Area;             // 使用区域
        BYTE         AreaValid;        // 区域启用标志
        BYTE         PeakCount;        // 峰值个数
        BYTE         BasePeak;         // 基准峰位置0表示全自动
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
        BYTE         CurveCnt;         // 曲线数量
        WORD         SampleVol;        // 加样量
        WORD         ReagentVol;       // 试剂量
        WORD         MixedVol;         // 混合液量
        BYTE         DeviceType;       // 设备类型
        BYTE         ProductCode;      // 产品代码
        WORD         Year;             // 年
        BYTE         Month;            // 月
        BYTE         SerialNo;         // 流水号
        BYTE         ValidMonth;       // 有效月数          2016-11-23
        QString      Batch;            // 批号
        BYTE         Blank;            // 是否减本底 0-不减 1-强制减 2-自动减
        BYTE         Reversal;         // 1    反转0不反转 1反转
        DWORD        ReversalBase;     // 4    反转基准值
        POCT_COMBOUT CombOut[3];       // 组合输出定义   2017-05-26
}POCT_ITEM;



typedef struct _SUB_SAVE_ITEM{
    char  Name[16] ;              // 项目名
    float Cvalue ;                // 测试结果的数值
    float Xx[4] ;                 // 原始分析的峰值，最多4个峰，不一定全使用
    float TC ;                    // 曲线分析得到的TC值

    unsigned int time;            // 该组结构体数据产生的时间，至1970/01/01 00:00:00所经历秒数
    signed char channel;          // 该数据时五联卡中的那一通道所产生
    unsigned char float_decimal;  // c_value是Cvale的精确float_decimal位小数生成的ASCII字符串表示
    char c_value[8];              // 同上解释
    char Unit[10] ;               // 该Cvalue数据的物理单位

} SUB_SAVE_ITEM;

struct SAVE_ITEM{
    WORD Nums ;                   // 编号
    char c_Nums[30] ;             // 流水号字符串格式
    unsigned char  BarCode[4];    // 对应项目卡码
    char Time[16] ;               // 该结构体产生时间，字符串形式，这里精确时分秒
    WORD Year ;                   // 产生时间
    char Month;                   //
    char Day;                     // 同上
    char Prj_name[32] ;           // 工程名字
    char p_name[12] ;             // 姓名
    char Type[30]  ;              // 测试类型
    unsigned char Classify_code ; // 用户代码
    char age_index ;              // 年龄
    char sex[8] ;                 // 性别
    int  serial_num ;             //流水号
    char serial_code[20] ;        //流水号198

    char age_valuse[12];

    char float_decimal[5] ;       // 小数位
    unsigned char sub_count ;     // 后续拥有SUB_SAVE_ITEM结构个数


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
    bool Beep;//触摸蜂鸣 2018/10/10
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
    int     time[TIME_O_PAGE] ;                     //暂时用作间隔时间  -1不管，-2作删除
    char count ;
}TIME_LIST ;

typedef struct _TIME_ITEM_LIST{
    unsigned int num ;
    int state ;       //-2-->时间间隔 -1-->还没开始 0->timeout 0~...
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
    QString sample_type[2][9]; // 0 中文 1 英语
}SYSTEM_CONFIG ;

//多联卡结构
typedef struct _MUTI_CARD{
    QString main_name ;
    QString sub_name[25] ;
    unsigned char sub_count ;
    unsigned char sub_use[25] ;
}MUTI_CARD ;



#endif
