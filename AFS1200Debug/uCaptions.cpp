#include <vcl.h>
#include <IniFiles.hpp>
#include <SysUtils.hpp>
#include <stdio.h>

#pragma hdrstop

#include "uCaptions.h"
#include "uParams.h"

#pragma package(smart_init)
#pragma resource "*.dfm"
TfrmCaptions *frmCaptions;


__fastcall TfrmCaptions::TfrmCaptions(TComponent* Owner) : TForm(Owner)
{
}

AnsiString TfrmCaptions::Captions(int iIndex)
{
   AnsiString s = "",sIndex;
   sIndex.printf("%d,",iIndex);
   for(int i=0; i<mCaptions->Lines->Count; i++)
   {
      s = mCaptions->Lines->Strings[i];
      if(s.Pos(sIndex)==1)
      {
         s.Delete(1,sIndex.Length());
         break;
      }
   }
   return s;
}

AnsiString GetCaption(int iIndex)
{
   AnsiString s;
   s = frmCaptions->Captions(iIndex);
   return s;
}

void __fastcall TfrmCaptions::FormCreate(TObject *Sender)
{
   TIniFile *f;
   AnsiString sIdent,sArea;
   TStrings *slArea = new TStringList;
   f = new TIniFile(m_sConfig);
   for(int i=0; i<255; i++)                      // 读取区域信息
   {
      sIdent.printf("AN%d",i);
      sArea = f->ReadString("AreaName",sIdent,"");
      if(!sArea.IsEmpty()) slArea->Append(sArea);
   }
   int iPos;
   if(slArea->Count==0) SaveArea();              // 无区域信息则保存默认的
   else mAreas->Lines->Text = slArea->Text;
   delete slArea;
   delete f;     
}

void __fastcall SaveArea(void)
{
   TIniFile *f;
   AnsiString sIdent,sArea;
   int iPos;
   f = new TIniFile(m_sConfig);
   f->EraseSection("AreaName");
   for(int i=0; i<frmCaptions->mAreas->Lines->Count; i++)
   {
      sArea = frmCaptions->mAreas->Lines->Strings[i];
      iPos  = sArea.Pos(",");
      if((!sArea.IsEmpty())&&(iPos>0))
      {
         sIdent.printf("AN%s",sArea.SubString(1,iPos-1));
         f->WriteString("AreaName",sIdent,sArea);
      }
   }
   delete f;
}

AnsiString PN2X(BYTE pn)
{
   return ("X" + IntToStr(pn+1));
}

AnsiString __fastcall GetStdSelect(              // 读取标准品选择序列
           AnsiString asTNo,                     // 实验编号
           int iINo)                             // 曲线序号
{
   AnsiString asIniFile,asSelect="";
   AnsiString asIdent;
   TIniFile *iniFile;
   int i;
   asIniFile = m_sTestDir + "TestDesc.ini";      // 标准品选中定义文件
   asIdent   = "StdSelect" + IntToStr(iINo);     // 子项目标准品选择
   for(i=0; i<21; i++) asSelect+="1";            // 默认全选择
   iniFile = new TIniFile(asIniFile);
   asSelect = iniFile->ReadString(asTNo,asIdent,asSelect);
   delete iniFile;
   while(asSelect.Length()<21)                   // 长度少于标准品个数用1补齐
   {
      asSelect+="1";
   }
   return asSelect;
}

void __fastcall SaveStdSelect(                   // 保存标准品选择序列
                AnsiString asTNo,                // 实验编号
                int iINo,                        // 曲线序号
                AnsiString asSelect)             // 标准品选择序列
{
   AnsiString asIniFile,asIdent;
   TIniFile *iniFile;
   asIniFile = m_sTestDir + "TestDesc.ini";      //
   asIdent   = "StdSelect" + IntToStr(iINo);     //
   iniFile   = new TIniFile(asIniFile);
   iniFile->WriteString(asTNo,asIdent,asSelect); //
   delete iniFile;
}

void __fastcall DeleteStdSelect(                 // 删除实验对应的标准品选择序列
                AnsiString asTNo)
{
   AnsiString asIniFile;
   TIniFile *iniFile;
   asIniFile = m_sTestDir + "TestDesc.ini";      //
   iniFile   = new TIniFile(asIniFile);
   iniFile->EraseSection(asTNo);
   delete iniFile;
}

void __fastcall LoadMethod(TComboBox *cb)
{
   AnsiString m_sFitMethod[11] = {
           "Linear      直线拟合",
           "Polynomial  多项式",
           "MMF Model   四参数增长模型",
           "Spline      三次样条",
           "Logarithm   对数拟合",
           "Power       幂函数拟合",
           "Logistic    逻辑斯蒂模型",
           "Exponential 指数拟合",
           "LinearInter 线性插值",
           "Logistic4P  逻辑斯蒂4参数",
           "Logistic5P  逻辑斯蒂5参数"};
   cb->Items->Clear();
   for(int i=0; i<11; i++) cb->Items->Append(m_sFitMethod[i]);
}

void __fastcall SaveTestDesc(AnsiString asTest,AnsiString asDesc)
{
   TIniFile *iniFile;
   AnsiString asIniFile;
   asIniFile = m_sTestDir + "TestDesc.ini";     // 测试的说明
   iniFile   = new TIniFile(asIniFile);
   iniFile->WriteString("Desc",asTest,asDesc);
   delete iniFile;
}

void __fastcall DeleteTestDesc(AnsiString asTest)
{
   TIniFile *iniFile;
   AnsiString asIniFile;
   asIniFile = m_sTestDir + "TestDesc.ini";     // 测试的说明
   iniFile   = new TIniFile(asIniFile);
   iniFile->DeleteKey("Desc",asTest);
   delete iniFile;
}

AnsiString __fastcall ReadTestDesc(AnsiString asTest)
{
   TIniFile *iniFile;
   AnsiString asIniFile;
   AnsiString asDesc;
   asIniFile = m_sTestDir + "TestDesc.ini";     // 测试的说明
   iniFile   = new TIniFile(asIniFile);
   asDesc = iniFile->ReadString("Desc",asTest,"");
   delete iniFile;
   return asDesc;
}

AnsiString GetFileDT(AnsiString asFileName)
{
   FILE *f;
   int iF,iDT;
   AnsiString asDT;
   TDateTime dt;
   WORD iY,iM,iD,iH,iMs,iS,iMS;
   iF  = FileOpen(asFileName,fmOpenRead);
   if(iF>=0)
   {
      iDT = FileGetDate(iF);
      dt  = FileDateToDateTime(iDT);
      FileClose(iF);
   } else dt = Now();
   DecodeDate(dt,iY,iM,iD);
   DecodeTime(dt,iH,iMs,iS,iMS);
   asDT.printf("%04d-%02d-%02d %02d:%02d:%02d",
      iY,iM,iD,iH,iMs,iS);
   return asDT;
}

// 设置"峰计算"下拉框的显示
void __fastcall SetPeakCalc(TComboBox *cbCalc,BYTE BCalc)
{
   AnsiString sCalc,sTemp;
   sCalc.printf("%d-",BCalc);
   for(int i=0; i<cbCalc->Items->Count; i++)
   {
      sTemp = cbCalc->Items->Strings[i];
      if(sTemp.Pos(sCalc)==1)
      {
         cbCalc->ItemIndex = i;
         break;
      }
   }
}

// 获取"峰计算"的方法序号
BYTE __fastcall GetPeakCalc(TComboBox *cbCalc)
{
   int iIndex = cbCalc->ItemIndex;
   int iPos,iStyle;
   AnsiString sCalc,sStyle;
   if(iIndex<0)
   {
      cbCalc->ItemIndex = 0;
      iIndex = 0;
   }
   sCalc  = cbCalc->Items->Strings[iIndex];      // 峰计算方法字符串
   iPos   = sCalc.Pos("-");                      // 序号和文字分隔符-
   sStyle = sCalc.SubString(1,iPos-1);
   iStyle = sStyle.ToIntDef(0);                  // 计算方法序号
   return iStyle;
}


