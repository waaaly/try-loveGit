#pragma hdrstop

#include <IniFiles.hpp>

#include "uParams.h"
#include "uPeak.h"

#pragma package(smart_init)

AnsiString m_sDevCom = "Com1";         // 设备通讯串口
AnsiString m_sPrtCom;                  // 内置打印机串口

AnsiString m_sDevName   = "AFS-1000 免疫荧光项目辅助管理工具";
AnsiString m_sCopyRight = "广州蓝勃生物科技有限公司";

BYTE       m_BCompanyCode = 0;                   // 公司代码
WORD       m_WDevYear;                           // 设备年份
BYTE       m_BDevMonth;                          //     月份
BYTE       m_BDevDay;                            //     日
BYTE       m_BDevVer1;                           //     版本1
BYTE       m_BDevVer2;                           //     版本2
BYTE       m_BDevVer3;                           //     版本3
WORD       m_WDevSYear;                          // 仪器序列号年
WORD       m_WDevSNo;                            // 仪器序列号流水号
BYTE       m_BCName[7][10];                      // 读写序列号的数据包

AnsiString m_sCompanyName = "广州蓝勃生物";      // 公司名称

WORD       m_wDots = 154;    // 扫描点数据个数    
AnsiString m_sWorkDir;       // 工作目录
AnsiString m_sBaseDir;       // 基本项目目录
AnsiString m_sTestDir;       // 测试目录
AnsiString m_sItemDir;       // 项目HEX目录
AnsiString m_sBackDir;       // 测试项目历史目录
AnsiString m_sConfig;        // 配置文件名称
AnsiString m_sBCDir;         // 条码图形目录

AnsiString m_sChkDate= "2016-03-31";
AnsiString m_sChkNow = "2016-02-23";
AnsiString m_sBCRT   = "CRP";
AnsiString m_sBCBC   = "05988";        // 条码格式编辑-项目名称 条码
bool       m_bBCAuto = true;           // 是否自动生成条码
BYTE       m_BBCLen  = 5;              // 手工输入的条码长度
BYTE       m_BBFont  = 5;              // 条码文字字号
BYTE       m_BBCHeight = 6;            // 条码高度
BYTE       m_BBCBit  = 17;             // 条码bit数
BYTE       m_BBCPC   = 6;              // 产品位数
BYTE       m_BBCYear = 3;              // 年位数
BYTE       m_BBCMonth= 4;              // 月位数
BYTE       m_BBCBatch= 4;              // 批号位数

bool       m_bReversal = false;        // 读数反转
DWORD      m_wRevVal;                  // 反转基准值

WORD       m_WStartYear   = 2014;                // 试剂卡开始年份
BYTE       m_BBCRatio     = 50;                  // 条码比例默认50

//float      m_fBreak      = 1.1;                  // 求面积斜率变化率
int        m_iBreak      = 10;                   // 求面积绝对值变化

DWORD      m_WBCDots     = 1660;                  // 条码数据点个数

//------------------------------------------------------------------------------
// 保存参数
//------------------------------------------------------------------------------
void __fastcall SaveComParam(void)
{
   TIniFile *f;
   f = new TIniFile(m_sConfig);
   f->WriteString( "System","DevCom",     m_sDevCom);
   f->WriteString( "System","PrtCom",     m_sPrtCom);
   f->WriteInteger("System","Reversal",   m_bReversal);
   f->WriteInteger("System","RevVal",     m_wRevVal);
   f->WriteInteger("System","BCRatio",    m_BBCRatio);
   f->WriteString( "Company","Name",      m_sCompanyName);
   f->WriteString( "Config","ReportTitle",m_sBCRT);
   f->WriteString( "Config","Barcode",    m_sBCBC);


   f->WriteInteger("System","Dots",       m_wDots);
//   f->WriteFloat(  "System","FBreak",     m_fBreak);
   f->WriteInteger("System","IBreak",     m_iBreak);
   f->WriteInteger("System","BCAuto",     m_bBCAuto);
   f->WriteInteger("System","BCLen",      m_BBCLen);
   f->WriteInteger("System","BCBit",      m_BBCBit);
   f->WriteInteger("System","BCPC",       m_BBCPC);
   f->WriteInteger("System","BCYear",     m_BBCYear);
   f->WriteInteger("System","BCMonth",    m_BBCMonth);
   f->WriteInteger("System","BCBatch",    m_BBCBatch);
   f->WriteString( "System","DevName",    m_sDevName);
   f->WriteString( "System","CopyRight",  m_sCopyRight);
   f->WriteInteger("System","StartYear",  m_WStartYear);
   f->WriteInteger("System","BarCodeDots",m_WBCDots);
   f->WriteString( "System","ChkNow",     m_sChkNow);
   f->WriteString( "System","BBFont",     m_BBFont);         // 条码文字字号
   f->WriteString( "System","BBCHeight",  m_BBCHeight);      // 条码高度
   delete f;
}

void __fastcall LoadSTypeCaption(TLabeledEdit *le)
{
   TIniFile *f;
   AnsiString asCaption,asIdent;
   f = new TIniFile(m_sConfig);
   asIdent.printf("TypeCaption%d",le->Tag);
   asCaption = f->ReadString("TypeCaption",asIdent,le->EditLabel->Caption);
   le->EditLabel->Caption = asCaption;
   delete f;
}

//------------------------------------------------------------------------------
// 读取参数
//------------------------------------------------------------------------------
void __fastcall LoadComParam(void)
{
   TIniFile *f;
   f = new TIniFile(m_sConfig);
   m_sDevCom = f->ReadString(      "System","DevCom",     m_sDevCom);
   m_sPrtCom = f->ReadString(      "System","PrtCom",     m_sPrtCom);
   m_sCompanyName = f->ReadString( "Company","Name",      m_sCompanyName);
   m_bReversal    = f->ReadInteger("System","Reversal",   m_bReversal);
   m_wRevVal      = f->ReadInteger("System","RevVal",     m_wRevVal);
   m_BBCRatio     = f->ReadInteger("System","BCRatio",    m_BBCRatio);
   m_sBCRT        = f->ReadString( "Config","ReportTitle","CRP");
   m_sBCBC        = f->ReadString( "Config","Barcode",    "05988");

   m_wDots        = f->ReadInteger("System","Dots",       m_wDots);
//   m_fBreak       = f->ReadFloat(  "System","FBreak",     m_fBreak);
   m_iBreak       = f->ReadInteger("System","IBreak",     m_iBreak);
   m_bBCAuto      = f->ReadInteger("System","BCAuto",     m_bBCAuto);
   m_BBCLen       = f->ReadInteger("System","BCLen",      m_BBCLen);
   m_BBCBit       = f->ReadInteger("System","BCBit",      m_BBCBit);
   m_BBCPC        = f->ReadInteger("System","BCPC",       m_BBCPC);
   m_BBCYear      = f->ReadInteger("System","BCYear",     m_BBCYear);
   m_BBCMonth     = f->ReadInteger("System","BCMonth",    m_BBCMonth);
   m_BBCBatch     = f->ReadInteger("System","BCBatch",    m_BBCBatch);
   m_BBCBit       = m_BBCPC    + m_BBCYear +
                    m_BBCMonth + m_BBCBatch;
   m_sDevName     = f->ReadString( "System","DevName",    m_sDevName);
   m_sCopyRight   = f->ReadString( "System","CopyRight",  m_sCopyRight);
   m_WStartYear   = f->ReadInteger("System","StartYear",  m_WStartYear);
   m_WBCDots      = f->ReadInteger("System","BarCodeDots",m_WBCDots);
   m_sChkDate     = f->ReadString( "System","ChkDate",    m_sChkDate);
   m_sChkNow      = f->ReadString( "System","ChkNow",     m_sChkNow);
   m_BBFont       = f->ReadInteger("System","BBFont",     m_BBFont);
   m_BBCHeight    = f->ReadInteger("System","BBCHeight",  m_BBCHeight);
   delete f;
}

void __fastcall LoadTestList(TStrings *sl)       // 获取测试列表
{
   TIniFile *iniFile;
   int iAttributes = 0,iPos;
   TSearchRec sr;
   AnsiString asIniFile,asPath,asF,asV;
   TDateTime dt;
   AnsiString asDT;
   TStringList *sl1 = new TStringList;
   sl->Clear();
   asIniFile = m_sTestDir + "TestDesc.ini";      // 测试目录的标准品选择
   iniFile   = new TIniFile(asIniFile);
   iniFile->ReadSectionValues("Desc",sl);
   delete iniFile;
   iAttributes |= faReadOnly;
   iAttributes |= faHidden;
   iAttributes |= faSysFile;
   iAttributes |= faVolumeID;
   iAttributes |= faDirectory;
   iAttributes |= faArchive;
   iAttributes |= faAnyFile;
   for(int i=0; i<sl->Count; i++)
   {
      asV  = sl->Strings[i];
      iPos = asV.Pos("=");
      asV  = asV.SubString(1,iPos-1);
      asPath = m_sTestDir + asV + "\\*.TST";
      if (FindFirst(asPath,iAttributes,sr)==0)
      {
         do
         {
            if ((sr.Attr&iAttributes)==sr.Attr)
            {
               dt =  FileDateToDateTime(sr.Time);
               asDT = FormatDateTime("YYYY-MM-DD HH:MM:SS",dt);
               sl1->Append(asDT + "|" + sr.Name);
            }
         } while (FindNext(sr) == 0);
         FindClose(sr);
      }
   }
   sl1->Sort();
   sl->Clear();
   for(int i=0; i<sl1->Count; i++)
   {
      asDT = sl1->Strings[i];
      iPos = asDT.Pos("|");
      asDT.Delete(1,iPos);
      iPos = asDT.Pos(".TST");
      asDT = asDT.SubString(1,iPos-1);
      if(!asDT.IsEmpty()) sl->Insert(0,asDT);
   }
   delete sl1;
}

// 测试文件ID文件名
AnsiString TestFName(AnsiString asTest,AnsiString asExt)
{
   AnsiString asFName;
   asFName = m_sTestDir + asTest +
                "\\" + asTest + asExt;           // 实验项目文件名
   return asFName;
}

AnsiString AFSFile(AnsiString asPath,            // 路径
                   AnsiString asTestNo,          // AFS文件名
                   int iCurveBa,
                   int iIndex)
{
   AnsiString asName;
   asName.printf("%s\\%s\\%s_%d_%d.AFS",         // 当前曲线批当前浓度对应的测试数据文件名
      asPath.c_str(),asTestNo.c_str(),
      asTestNo.c_str(),iCurveBa,iIndex);         // [路径][实验编号\\][试验编号]_[曲线批]_[浓度编号].AFS
   return asName;
}

// 装载峰计算方法列表
void __fastcall LoadPeakCalc(TComboBox *cbCalc)
{
   AnsiString asCalcs[12]={
              "0-荧光平均",
              "1-荧光求和",
              "2-荧光面积",
              "3-胶体金平均",
              "4-荧光最大值平均",
              "5-荧光最大值求和",
              "6-荧光最大值面积",
              "7-荧光最高峰平均",
              "8-荧光最高峰求和",
              "9-荧光最高峰面积",
              "10-荧光常规面积",
              "11-峰谷差平均"};
   TIniFile *f;
   AnsiString ss;
   f = new TIniFile(m_sConfig);
   cbCalc->Items->Clear();
   if(f->SectionExists("PeakCalc"))
   {
      f->ReadSectionValues("PeakCalc",cbCalc->Items);
      for(int i=0; i<cbCalc->Items->Count; i++)
      {
         ss = cbCalc->Items->Strings[i];
         ss.Delete(1,ss.Pos("="));
         cbCalc->Items->Strings[i] = ss;
      }
   } else
   {
      for(int i=0; i<12; i++)
         cbCalc->Items->Append(asCalcs[i]);
   }
   delete f;
}

