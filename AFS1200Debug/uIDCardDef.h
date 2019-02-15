#ifndef uIDCardDefH
#define uIDCardDefH

#include <ADODB.hpp>
#include <SysUtils.hpp>
#include <stdio.h>
#include <vcl.h>
#include <IdGlobal.hpp>
#include <io.h>

#include "loadLib.h"

extern AnsiString m_sFileHead;      // ID HEX文件头

typedef struct{
        BYTE  StdCount;                // 1   标准品个数
        BYTE  ConcTrans;               // 1   浓度变换   1 : 取对数 0 : 不处理
        BYTE  RespTrans;               // 1   反应值变换 1 : 取对数 0 : 不处理
        BYTE  StdDec;                  // 1   浓度和反应值小数位数
                                       //     bit 7-4 : 浓度小数位数   结果值
                                       //     bit 3-0 : 反应值小数位数   TC值
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
        float Concs[21];               // 84  标准品浓度
        float Resps[21];               // 84  标准品反应值
        float a[6];                    // 24  曲线系数
}ID_CURVE;                             // ----200字节---------------------------

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
                                       //     全血曲线序号
                                       //     血清血浆曲线序号
                                       //     尿液曲线序号
                                       //     粪便曲线序号
                                       //     质控曲线序号
        BYTE       RatioDec;           // 1   系数小数位数
        BYTE       TempControl;        // 1   温度补偿
                                       //     bit 7   : 0-不补偿 1-补偿
                                       //     bit 6-0 : 补偿系数小数位数
        float      Ratios[9];          // 36  0-4 5种样本类型的系数
                                       //     全血系数
                                       //     血清血浆系数
                                       //     尿液系数
                                       //     粪便系数
                                       //     质控系数
                                       //     5-8 温度补偿系数a,b,a1,b1
                                       //     温度补偿参数 a
                                       //     温度补偿参数 b
                                       //     温度补偿参数 a1
                                       //     温度补偿参数 b1
        ID_PEAK    siPeaks[4];         // 24  子项峰区间定义，最多4个峰    2016-08-18
        WORD       SubCheck;           // 2   子项未加样检测时间(1卡多联)  2016-10-19
        WORD       SubHatch;           // 2   子项测试时间(1卡多联)        2016-10-19
        WORD       SubMinValue;        // 2   子项未加样判定值             2016-11-29
        BYTE       siChannel;          // 1   该子项目所在通道号(1卡多联)  2016-08-18
        BYTE       PrintInfo[33];      // 33  打印信息(老版本为64)         2016-08-18
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

//------------------------------------------------------------------------------
// 子项信息
//------------------------------------------------------------------------------
typedef struct{
        AnsiString Name[5];            // 项目名称,对应5个检测范围
        AnsiString Unit[5];            // 计量单位
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
                                       //     5: CP[0]/(CP[0]+CP[1]+CP[2])
                                       //     6: CP[0]/(CP[0]+CP[2])
                                       //     7: CP[0]/(CP[1]+CP[2])       2016-11-23
                                       //     8: (CP[0]-B)/(CP[1]-B)       2016-12-01  04客户
        BYTE       CurveNos[5];        // 五种样本类型对应的曲线序号
                                       // 全血曲线序号
                                       // 血清血浆曲线序号
                                       // 尿液曲线序号
                                       // 粪便曲线序号
                                       // 质控曲线序号
        float      Ratios[9];          // 0-4 五种样本类型系数
                                       // 全血系数
                                       // 血清血浆系数
                                       // 尿液系数
                                       // 粪便系数
                                       // 质控系数
                                       // 5-8 温度补偿系数
                                       // 温度补偿参数 a
                                       // 温度补偿参数 b
                                       // 温度补偿参数 a1
                                       // 温度补偿参数 b1
        BYTE       RatioDec;           // 系数小数位数
        BYTE       TempDec;            // 温度补偿系数小数位数
        BYTE       TempComp;           // 温度补偿标志:0补偿1不补偿
        AnsiString PrintInfo;          // 打印信息

        ID_PEAK    siPeaks[4];         // 子项峰区间定义，最多4个峰    2016-08-18
        WORD       SubCheck;           // 子项未加样检测时间(1卡多联)  2016-10-19
        WORD       SubHatch;           // 子项测试时间(1卡多联)        2016-10-19
        WORD       SubMinValue;        // 子项未加样判定值             2016-11-29
        BYTE       siChannel;          // 该子项目所在通道号(一卡多联) 2016-08-18

        DWORD      LessThan;           // T值小于该值时乘以下面的系数
        float      LessThanRatio;      // 系数
        AnsiString Output;             // 项目输出选项 0表示不输出 1表示输出 对应多项的时候 默认全部输出
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
        AnsiString   CompanyName;      // 公司名称
        AnsiString   BarCode;          // 条码
        AnsiString   BatchPre;         // 批号前缀
        AnsiString   ReportTitle;      // 报告单标题
        AnsiString   Area;             // 使用区域
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
        AnsiString   Batch;            // 批号
        BYTE         Blank;            // 是否减本底 0-不减 1-强制减 2-自动减
        BYTE         Reversal;         // 1    反转0不反转 1反转
        DWORD        ReversalBase;     // 4    反转基准值
}POCT_ITEM;

float __fastcall CalcItemTC(                     // 计算项目的TC值
                 POCT_ITEM pi,                   // 项目参数
                 ID_PEAKRESULT pr,               // 峰值结果及位置
                 int iIndex);                    // 子项目序号

void __fastcall ID2POCT(                         // ID数据转换成项目数据
                ID_ITEM id,
                POCT_ITEM &item);
void __fastcall POCT2ID(                         // 项目数据转换为ID数据
                POCT_ITEM item,
                ID_ITEM &id);
AnsiString ItemHalfName(AnsiString asName);      // 项目半角名称
AnsiString ItemFullName(AnsiString asName);      // 项目全角名称
BYTE __fastcall CalcIDCRC(ID_ITEM id);           // 计算ID卡信息校验  2016-11-28;
bool __fastcall FileIsIDHex(AnsiString asName);  // 判断文件是不是ID卡HEX文件
void __fastcall SaveIDHex(                       // 保存项目数据为HEX文件
                POCT_ITEM item,                  // 项目参数
                AnsiString asName);              // 保存文件名
bool __fastcall LoadIDHex(                       // 从HEX文件读取项目数据
                AnsiString asName,
                POCT_ITEM &item);
void __fastcall LoadItemList(                    // 装载项目列表
                AnsiString asPath,               // 目录
                TStrings *sl);
AnsiString GetTCFormula(                         // 生成TC计算公式字符串
           int iP[],                             // 计算项序号数组
           int iPCnt,                            // 计算项个数
           int iMode);                           // 计算方式


void __fastcall MakeBarcode(POCT_ITEM &item);    // 生成条码
AnsiString Make2Str(
           WORD wStartYear,
           WORD wProduct,
           WORD wYear,
           WORD wMonth,
           WORD wSerial);
AnsiString Barcode2Bin(POCT_ITEM item);

extern TMemo *mmm;

#endif
