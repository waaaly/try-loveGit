#ifndef uParamsH
#define uParamsH

#include <vcl.h>

extern AnsiString m_sDevCom;                  // 设备通讯串口
extern AnsiString m_sPrtCom;                  // 内置打印机串口

extern AnsiString m_sDevName;
extern AnsiString m_sCopyRight;

extern BYTE       m_BCompanyCode;   // 公司代码
extern WORD       m_WDevYear;       // 设备年份
extern BYTE       m_BDevMonth;      //     月份
extern BYTE       m_BDevDay;        //     日
extern BYTE       m_BDevVer1;       //     版本1
extern BYTE       m_BDevVer2;       //     版本2
extern BYTE       m_BDevVer3;       //     版本3
extern WORD       m_WDevSYear;      // 仪器序列号年
extern WORD       m_WDevSNo;        // 仪器序列号流水号
extern BYTE       m_BCName[7][10];  // 读写序列号的数据包

extern AnsiString m_sCompanyName;   // 公司名称
extern WORD       m_wDots;    // 扫描点数据个数
extern AnsiString m_sWorkDir;       // 工作目录
extern AnsiString m_sTestDir;       // 测试目录
extern AnsiString m_sItemDir;       // 项目HEX目录
extern AnsiString m_sBaseDir;       // 基本项目目录
extern AnsiString m_sBackDir;       // 测试项目历史目录
extern AnsiString m_sConfig;        // 配置文件名称
extern AnsiString m_sBCDir;         // 条码图形目录

extern AnsiString m_sChkDate;
extern AnsiString m_sChkNow;

extern AnsiString m_sBCRT,m_sBCBC;  // 条码格式编辑-项目名称 条码
extern bool       m_bBCAuto;        // 是否自动生成条码
extern BYTE       m_BBCLen;         // 手工输入的条码长度
extern BYTE       m_BBFont;         // 条码文字字号
extern BYTE       m_BBCHeight;      // 条码高度
extern bool       m_bReversal;      // 读数反转
extern DWORD      m_wRevVal;        // 反转基准值
extern BYTE       m_BBCBit;         // 条码bit数
extern BYTE       m_BBCPC;          // 产品位数
extern BYTE       m_BBCYear;        // 年位数
extern BYTE       m_BBCMonth;       // 月位数
extern BYTE       m_BBCBatch;       // 批号位数

extern BYTE       m_BBCRatio;       // 条码比例默认10
extern WORD       m_WStartYear;     // 试剂卡开始年份

//extern float      m_fBreak;           // 求面积斜率变化率
extern int        m_iBreak;           // 求面积绝对值变化

extern DWORD      m_WBCDots;          // 条码数据点个数

void __fastcall SaveComParam(void);
void __fastcall LoadComParam(void);

void __fastcall LoadSTypeCaption(TLabeledEdit *le);
void __fastcall LoadPeakCalc(TComboBox *cbCalc);

void __fastcall LoadTestList(TStrings *sl);      // 获取测试列表
AnsiString TestFName(AnsiString asTest,
                     AnsiString asExt);          // 测试文件ID文件名
AnsiString AFSFile(AnsiString asPath,            // 路径
                   AnsiString asTestNo,          // AFS文件名
                   int iCurveBa,
                   int iIndex);
#endif
