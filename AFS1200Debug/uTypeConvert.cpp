#pragma hdrstop

#include <IniFiles.hpp>
#include <Clipbrd.hpp>

#include "uTypeConvert.h"
#include "uParams.h"
#include "loadLib.h"

#pragma package(smart_init)

bool m_bTAdmin = true;  //是否显示本底 2018/09/29

// 浮点数到字符串
AnsiString Float2Str(float f,int iDec)
{
   AnsiString asFmt;
   int idec = iDec;
   if(iDec>16) idec = 0;
   asFmt = "0.";
   for(int i=0; i<idec; i++) asFmt+="#";
   return FormatFloat(asFmt,f);
}

// 浮点数到字符串(自动小数位)
AnsiString Float2StrA(float f,int iDec)
{
   AnsiString asFmt,ss;
   int idec = iDec;
   if(iDec>16) idec = 0;
   asFmt = "0";
   if(f<1) idec = MIN(idec,4);
   else if(f<10) idec = MIN(idec,3);
   else if(f<100) idec = MIN(idec,2);
   else if(f<1000) idec = MIN(idec,1);
   else idec = 0;
   asFmt.printf("%d",idec);
   asFmt = "%." + asFmt + "f";
   ss.printf(asFmt.c_str(),f);
   return ss;
}

void GridToClipboard(TObject *Sender,
     TMouseButton Button, TShiftState Shift, int X, int Y)
{
   if(Button!=mbRight) return;
   AnsiString s;
   TStringGrid *sg;
   TClipboard *c = new TClipboard();
   TStringList *sl = new TStringList;
   s = Sender->ClassName();

   if(s.Pos("StringGrid")>0)
   {
      sg = (TStringGrid *)Sender;
      if(Shift.Contains(ssCtrl))
      {
         for(int i=0; i<sg->ColCount; i++)
         {
            s = "";
            for(int j=0; j<sg->RowCount; j++)
               s = s + sg->Cells[i][j] + "\t";
            sl->Append(s.Trim());
         }
      } else
      {
         for(int i=0; i<sg->RowCount; i++)
         {
            s = "";
            for(int j=0; j<sg->ColCount; j++)
               s = s + sg->Cells[j][i] + "\t";
            sl->Append(s.Trim());
         }
      }
   }
   c->SetTextBuf(sl->Text.c_str());
   delete c;
   delete sl;
}

void ClipboardToGrid(TObject *Sender)
{
   AnsiString s,s1;
   TStringGrid *sg;
   if(!Clipboard()->HasFormat(CF_TEXT)) return;
   s = Sender->ClassName();
   if(s.Pos("StringGrid")==0) return;
   TStringList *sl = new TStringList;
   sl->Text = Clipboard()->AsText;
   sg = (TStringGrid *)Sender;
   int iPos;
   for(int i=sg->FixedRows; i<sg->RowCount; i++)
   if(i<=sl->Count)
   {
      s = sl->Strings[i-1];
      for(int j=sg->FixedCols; j<sg->ColCount; j++)
      {
         iPos = s.Pos("\t");
         if(iPos>0)
         {
            s1 = s.SubString(1,iPos-1);
            s.Delete(1,iPos);
         } else
         {
            s1 = s;
            s  = "";
         }
         sg->Cells[j][i] = s1;
      }
   }
   delete sl;
}

void LoadTCDef(AnsiString asFName, int iPCnt,TFillStringGrid *fsg)
{
   TIniFile *f;
   AnsiString asIdent,asDef,asV;
   int iPos,iCol;
   fsg->ClearAllData();
   f = new TIniFile(asFName);
   for(int i=1; i<fsg->RowCount; i++)
   {
      asIdent.printf("TC%d_%d",iPCnt,i);
      asDef  = f->ReadString("TCDef",asIdent,"");
      iCol   = 1;
      while(!asDef.IsEmpty())
      {
         iPos = asDef.Pos(",");
         if(iPos==0)
         {
            asV   = asDef;
            asDef = "";
         } else
         {
            asV  = asDef.SubString(1,iPos-1);
            asDef.Delete(1,iPos);
         }
         fsg->Cells[iCol][i] = asV;
         iCol++;
      }
   }
   delete f;
}

void SaveTCDef(AnsiString asFName, int iPCnt,TFillStringGrid *fsg)
{
   TIniFile *f;
   AnsiString asIdent,asDef,asX;
   f = new TIniFile(asFName);
   for(int i=1; i<fsg->RowCount; i++)
   {
      asIdent.printf("TC%d_%d",iPCnt,i);
      asDef = "";
      for(int j=1; j<fsg->ColCount; j++)
      {
         asX = fsg->Cells[j][i];
         asDef = asDef + asX + ",";
      }
      f->WriteString("TCDef",asIdent,asDef);
   }
   delete f;
}

void LoadPeakDef(AnsiString asFName, int iDots, TFillStringGrid *fsg)
{
   TIniFile *f;
   int iWid,iStart,iEnd,iLen,iMethod,iPos,iCnt;
   AnsiString asIdent,asDef,asV;
   iCnt  = fsg->RowCount - 1;
   fsg->ClearAllData();
   if(iCnt==0) return;
   iWid  = iDots/iCnt;
   f = new TIniFile(asFName);
   for(int i=1; i<fsg->RowCount; i++)
   {
      asIdent.printf("PD%d_%d",iCnt,i);
      asDef  = f->ReadString("PeakDef",asIdent,"");
      iStart = (i-1)*iWid;
      iEnd   = i*iWid;
      iLen   = 5;
      iMethod= 1;
      if(i>1) iStart++;
      if(i==iCnt) iEnd = iDots - 1;
      if(!asDef.IsEmpty())
      {
         for(int j=1; j<5; j++)
         {
            iPos = asDef.Pos(",");
            asV = asDef.SubString(1,iPos-1);
            asDef.Delete(1,iPos);
            switch(j){
            case 1 : iStart = asV.ToIntDef(iStart); break;
            case 2 : iEnd   = asV.ToIntDef(iEnd);   break;
            case 3 : iLen   = asV.ToIntDef(iLen);   break;
            case 4 : iMethod= asV.ToIntDef(iMethod);break;
            }
         }
      }
      fsg->Cells[1][i] = iStart;
      fsg->Cells[2][i] = iEnd;
      fsg->Cells[3][i] = iLen;
      fsg->Cells[4][i] = iMethod;
   }
   delete f;
}

bool SavePeakDef(AnsiString asFName, TFillStringGrid *fsg)
{
   AnsiString asIdent,asDef;
   bool bSave = true;
   int iCnt,iStart,iEnd,iLen,iMethod;
   AnsiString asVal[4];
   TIniFile *f;
   f = new TIniFile(asFName);
   iCnt = fsg->RowCount - 1;
   for(int i=1; i<fsg->RowCount; i++)
   {
      asIdent.printf("PD%d_%d",iCnt,i);
      asDef = "";
      for(int j=0; j<4; j++)
      {
         asVal[j] = fsg->Cells[j+1][i].Trim();
         asDef    = asDef + asVal[j] + ",";
      }
      iStart = asVal[0].ToIntDef(-1);
      iEnd   = asVal[1].ToIntDef(-1);
      iLen   = asVal[2].ToIntDef(-1);
      iMethod= asVal[3].ToIntDef(-1);
      if( (iStart<0) || (iEnd<=0) ||
          (iLen<=0)  || (iMethod<0) ||
          (iMethod>10) )
      {
         bSave = false;
         fsg->Row = i;
         fsg->SetFocus();
         break;
      }
      f->WriteString("PeakDef",asIdent,asDef);
   }
   delete f;
   return bSave;
}

void __fastcall CalcSingle(
                POCT_ITEM pi,                    // 项目参数
                TFillStringGrid *sgTest,         // 测试原始数据网格
                TFillStringGrid *sgCalc,         // 计算网格
                DWORD *dw,                       // 数据缓冲区
                int iDots,                       // 数据个数
                int iIndex,                      // 列号
                bool bBlank)                     // 是否显示本底值
{
   ID_PEAKRESULT pr;
   POCT_SUBITEM  si;
   float fTC;
   AnsiString asTC;
   DWORD dwBlank;
   int iDec=5;
   for(int j=0; j<iDots;  j++)                   // 逐点取数显示
      sgTest->Cells[iIndex][j+1] = dw[j];
   sgTest->Cells[iIndex][0] = iIndex;
   sgCalc->Cells[iIndex][0] = iIndex;


   call_calcPeak(dw,iDots,pi.Peaks,pi.PeakCount,pi.BasePeak, pi.Blank, &dwBlank,&pr);       // 自动追峰求峰值


   for(int j=0; j<pi.ItemCount; j++)             // 计算各个TC值
   {
      fTC  = CalcItemTC(pi,pr,j);                // 计算项目的TC值
      asTC = Float2Str(fTC,iDec);
      sgCalc->Cells[iIndex][j+pi.PeakCount+1] = asTC.Trim();
   }
   for(int j=0; j<pi.PeakCount; j++)             // 显示峰值
      sgCalc->Cells[iIndex][j+1] = Float2Str(pr.Value[j],1);
   if(bBlank)
        sgCalc->Cells[iIndex][sgCalc->RowCount-1] = dwBlank;
}

int __fastcall LoadTest(                         // 调入单个浓度对应的测试数据
               POCT_ITEM pi,                     // 项目参数
               int iDots,                        // 默认点数
               AnsiString asIniName,             // 数据所在文件名
               AnsiString asSec,                 // 数据所在段名
               int iIndex,                       // 浓度序号
               TRespChart *rc,                   // 测试数据图形
               TFillStringGrid *sgTest,          // 测试数据列表
               TFillStringGrid *sgCalc)          // 计算结果列表
{
   int iGet = 0, iCol,iDCnt,iNo,iPos,iCnt;
   TIniFile *inif;
   DWORD *buf,dVal;
   AnsiString asIdent,asData,asVal;
   if(!FileExists(asIniName)) return iGet;       // 无文件返回
   inif = new TIniFile(asIniName);
   asIdent.printf("CardCnt%d",iIndex);
   iGet = inif->ReadInteger(asSec,asIdent,0);    // 浓度序号对应的记录数
   iDCnt= inif->ReadInteger(asSec,"Dots",iDots); // 数据点个数
   iCol = sgTest->ColCount - 1;                  // 当前列
   sgTest->ColCount+=iGet;                       // 测试数据列表列数
   sgCalc->ColCount+=iGet;                       // 计算TC数据列表列数
   buf = (DWORD *)malloc(iDCnt*4);
   for(int i=1; i<=iGet; i++)                    // 读取曲线记录数据
   {
      iNo  = 1;                                  // 数据记录ident计数
      iCnt = 0;                                  // 数据个数计数
      while(1)
      {
         asIdent.printf("D%d_%d_%d",iIndex,i,iNo); // Card1_1_1,Card1_1_2...
         asData = inif->ReadString(asSec,asIdent,"");
         if(asData.IsEmpty()) break;
         while(!asData.IsEmpty())                // 处理整个读取的数据字符串
         {
            iPos = asData.Pos(",");              // 数据之间用逗号分隔开
            if(iPos==0)                          // 最后一个数据项
            {
               asVal  = asData;
               asData = "";
            } else
            {
               asVal = asData.SubString(1,iPos-1);
               asData.Delete(1,iPos);
            }
            dVal = asVal.ToIntDef(0);
            if(iCnt<iDCnt) buf[iCnt] = dVal;     // 存入缓冲区
            iCnt++;
         }
         iNo++;
      }
      rc->AppendLine(NULL,(unsigned char *)buf,iCnt);             // 追加到RespChart
      CalcSingle(pi,sgTest,sgCalc,buf,iCnt,iCol,m_bTAdmin);// 计算单个曲线峰值数据
      iCol++;
   }
   rc->Repaint();                                // 重绘原始曲线
   free(buf);
   delete inif;
   return iGet;                                  // 返回测试曲线的个数
}

void __fastcall AppendTest(                      // 将测试数据填入网格并计算
                POCT_ITEM pi,                    // 项目参数
                DWORD *dw,                       // 数据缓冲区
                int iCount,                      // 数据个数
                TRespChart *rc,                  // respchart
                TFillStringGrid *sgTest,         // 测试数据网格
                TFillStringGrid *sgCalc)         // 计算网格
{
   int iCol = sgTest->ColCount - 1;              // 需要增加到的列
   for(int i=0; i<iCount; i++)                   // 将数据填入数据表格
      sgTest->Cells[iCol][i+1] = dw[i];
   sgTest->ColCount++;                           // 列数+1
   sgCalc->ColCount++;
   sgTest->Cells[iCol+1][0]=iCol+1;              // 列标题
   rc->AppendLine(NULL,(char *)dw,iCount);
   rc->ActiveLine = iCol;                        // 活动曲线序号
   CalcSingle(pi,sgTest,sgCalc,dw,iCount,iCol,m_bTAdmin); // 计算单列数据
   rc->Repaint();
   rc->DrawAllLine();
}

void __fastcall SaveTest(                        // 保存单个浓度单次测试数据
               AnsiString asIniName,             // 数据所在文件名
               AnsiString asSec,                 // 数据所在段名
               int iConcNo,                      // 浓度序号
               int iTestCnt,                     // 当前浓度测试个数
               DWORD buf[],                      // 数据缓冲区
               int iDots)                        // 数据点数
{
   TIniFile *inif = new TIniFile(asIniName);
   AnsiString asIdent,asData,asVal;
   int iCnt=0, iLine=0;
   while(iCnt<iDots)
   {
      asData = "";
      iLine++;                                   // 行号从1开始
      asIdent.printf("D%d_%d_%d",                // Card1_1_1,Card1_1_2...
         iConcNo,iTestCnt,iLine);                // 浓度序号_测试序号_行号
      while(asData.Length()<100)                 // 分行保存单次测试数据,单行100字符
      {
         asVal = IntToStr(buf[iCnt]);
         asData = asData + asVal + ",";          // 逗号间隔各个数据项
         iCnt++;
         if(iCnt==iDots) break;
      }
      inif->WriteString(asSec,asIdent,asData);   // 保存单行数据
   }
   asIdent.printf("CardCnt%d",iConcNo);
   inif->WriteInteger(asSec,asIdent,iTestCnt);   // 浓度序号对应的记录数
   delete inif;
}

void __fastcall CalcCVS(
                int iPeakCount,                  // 峰值个数
                TFillStringGrid *sgCalc,         // 计算网格
                TFillStringGrid *sgCV,           // CV网格
                int iConcCnt,                    // 当前浓度测试笔数
                bool bBlank)                     // 是否显示本底值
{
   TStrings *tsV = new TStringList;
   TCalcSDCV *CalcSDCV = new TCalcSDCV(NULL);
   float fMax,fMin;
   int iDec;
   float fAvg,fCV,fRMS,fTotal1,fValue,fTotal2;
   AnsiString asValue;
   for(int i=1; i<sgCalc->RowCount; i++)         // 逐行计算CV值
   {
      if(iConcCnt==0)                            // 无扫描线的时候显示*号
      {
         for(int j=1; j<=5; j++)
            sgCV->Cells[j][i] = "*";
         continue;
      }
      if( (i<iPeakCount+1) ||                    // 峰值小数位1
          ((i==sgCV->RowCount-1)&&bBlank) )      // 本底小数位
         iDec = 1;
      else iDec=4;                               // TC值和CV值小数位4
      fMax   = 0;                                // 最大值
      fMin   = 0xffffffff;                       // 最小值
      fTotal1= 0;                                // 累加和
      fTotal2= 0;                                // 平方和
      tsV->Clear();                              // 清除数据列表
      for(int j=0; j<iConcCnt; j++)              // 逐个扫描线计算
      {
         asValue = sgCalc->Cells[1+j][i];        // 取计算表格子字符串
         fValue  = StrToFloatDef(asValue,0);     // 转换为浮点数
         fMax = MAX(fMax,fValue);                // 最大值
         fMin = MIN(fMin,fValue);                // 最小值
         fTotal1+= fValue;                       // 累加和
         fTotal2+= (fValue*fValue);              // 平方和
         tsV->Append(sgCalc->Cells[1+j][i]);     // 用来计算CV
      }
      if(i<iPeakCount+1)                         // Peak最大最小值
      {
         sgCV->Cells[4][i] = Float2Str(fMax,0);
         sgCV->Cells[5][i] = Float2Str(fMin,0);
      } else                                     // TC最大最小值
      {
         sgCV->Cells[4][i] = Float2Str(fMax,iDec);
         sgCV->Cells[5][i] = Float2Str(fMin,iDec);
      }
      fAvg = fTotal1/iConcCnt;                   // 平均值
      sgCV->Cells[1][i] = Float2Str(fAvg,iDec);
      CalcSDCV->Datas->Text = tsV->Text;         // 计算CV
      CalcSDCV->CalcSDCV();
      sgCV->Cells[2][i] = Float2Str(CalcSDCV->SD,iDec);
      sgCV->Cells[3][i] = Float2Str(CalcSDCV->CV,iDec);
   }
   delete tsV;
   delete CalcSDCV;
}

void __fastcall DeleteTest(                      // 删除单个浓度所有测试数据
                AnsiString asIniFile,            // 数据文件
                AnsiString asSec,                // 评估批次段
                int iConcNo)                     // 当前浓度序号
{
   TIniFile *inif = new TIniFile(asIniFile);
   int iGet,iNo;
   AnsiString asIdent,asData;
   asIdent.printf("CardCnt%d",iConcNo);
   iGet = inif->ReadInteger(asSec,asIdent,0);    // 浓度序号对应的测试记录数
   inif->DeleteKey(asSec,asIdent);               // 删除测试个数
   for(int i=1; i<=iGet; i++)                    // 一个个测试删除
   {
      iNo = 1;
      while(1)                                   // 单个测试的多个行删除
      {
         asIdent.printf("D%d_%d_%d",iConcNo,i,iNo);
         asData = inif->ReadString(asIniFile,asIdent,"");
         if(asData.IsEmpty()) break;
         inif->DeleteKey(asSec,asIdent);
         iNo++;
      }
   }
   delete inif;
}

void __fastcall LoadAssessRC(
                POCT_ITEM pi,                    // 项目参数
                AnsiString asAFName,             // 测试数据文件
                AnsiString asABatch,             // 评估批次名称
                TFillStringGrid *sgAssess)       // 测试原始数据网格
{
   TIniFile *inif = new TIniFile(asAFName);
   AnsiString asRC,asV;
   int iCCnt,iC,iPos;
   asV   = "ConcCount";
   iCCnt = inif->ReadInteger(asABatch,asV,0);    // 浓度个数
   if(iCCnt>0) sgAssess->RowCount = iCCnt+1;     // 有浓度个数
   else sgAssess->RowCount = 2;                  // 行数2
   for(int i=1; i<sgAssess->ColCount; i++)       // 所有网格内容清空
   for(int j=1; j<sgAssess->RowCount; j++)
      sgAssess->Cells[i][j] = "";
   // 以下读取网格数据
   // 每一行保存网格一行的数据,逗号间隔单元格数据
   //   对照值1,测试值1,对照值2,测试值2,......
   for(int i=1; i<=iCCnt; i++)                   // 每行保存浓度/测试值...数据
   {
      asV.printf("RC%d",i);                      // 读取浓度反应值
      asRC = inif->ReadString(asABatch,asV,"");  // 浓度反应值
      iC   = 1;                                  // 从第一列开始
      while(!asRC.IsEmpty())
      {
         iPos = asRC.Pos(",");
         if(iPos==0)
         {
            asV  = asRC;
            asRC = "";
         } else
         {
            asV = asRC.SubString(1,iPos-1);
            asRC.Delete(1,iPos);
         }
         sgAssess->Cells[iC][i] = asV;
         iC++;
      }
   }
   delete inif;
}

void __fastcall SaveRC(                          // 保存浓度和测试值数据
                AnsiString asAFName,
                AnsiString asABatch,
                TFillStringGrid *sgAssess)
{
   if(asAFName.IsEmpty()||
      asABatch.IsEmpty()) return;
   TIniFile *inif = new TIniFile(asAFName);
   AnsiString asIdent,asV;
   int iCCnt,iC,iPos;
   asV   = "ConcCount";
   iCCnt = sgAssess->RowCount-1;                 // 浓度个数
   inif->WriteInteger(asABatch,asV,iCCnt);
   for(int i=sgAssess->FixedRows; i<sgAssess->RowCount; i++)       // 逐行处理
   {
      asIdent.printf("RC%d",i);
      asV = "";
      for(int j=sgAssess->FixedCols; j<sgAssess->ColCount; j++)    // 反应值逐列保存
         asV = asV + sgAssess->Cells[j][i]+",";
      inif->WriteString(asABatch,asIdent,asV);   // 保存浓度
   }
   delete inif;
}

void __fastcall AdjustFSG(TStringGrid *fsg)
{
   int iWidth = 0;
   for(int i=0; i<fsg->ColCount-1; i++)
      iWidth += fsg->ColWidths[i];
   iWidth = fsg->Width - 25 - iWidth;
   if(iWidth>fsg->ColWidths[fsg->ColCount-1])
      fsg->ColWidths[fsg->ColCount-1] = iWidth;
}

void __fastcall RefreshTCFormula(                // 刷新显示TC计算公式
                TComboBox *c1,
                TComboBox *c2,
                TComboBox *c3,
                TComboBox *c4)
{
   int iIndex = c4->ItemIndex;
   int iP[3];
   iP[0] = c1->ItemIndex + 1;
   iP[1] = c2->ItemIndex + 1;
   iP[2] = c3->ItemIndex + 1;
   c4->Items->Clear();
   for(int i=0; i<9; i++)
      c4->Items->Append(GetTCFormula(iP,3,i));
   c4->ItemIndex = iIndex;
}

int __fastcall GetTCMode(AnsiString asTCFormula) // 从公式字符串取计算方式
{
   int iMode = 0, iPos;
   AnsiString asMode;
   iPos = asTCFormula.Pos(":");
   if(iPos>0)
   {
      asMode = asTCFormula.SubString(1,iPos-1);
      iMode  = asMode.ToIntDef(0);
   }
   return iMode;
}

