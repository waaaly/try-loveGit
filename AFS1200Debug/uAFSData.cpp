
#pragma hdrstop

#include <stdio.h>
#include <IdGlobal.hpp>
#include <math.h>

#include "uAFSData.h"

#pragma package(smart_init)

AFSHEAD AFSHead;
AFSHEADOLD AFSHeadOld;

bool __fastcall IsAFSFile(AnsiString asFileName)
{
   // AFS测试数据文件格式:
   //   AFSHead  : 结构体
   //   dd....   : 详细测试数据 长度: nn*4*LineCount
   //              比如174个点,则一条测试线数据为174*4个字节
   FILE *f;
   AnsiString asLead;
   WORD wDots,wLines;
   unsigned long ulLen,ulSize;
   bool bIs = false;
   asLead = "       ";
   ulLen = FileSizeByName(asFileName);                     // 数据文件长度
   if(ulLen>sizeof(AFSHead))                               // 文件长度必须大于文件头
   {
      f = fopen(asFileName.c_str(),"rb");
      fread(&AFSHead,1,sizeof(AFSHead),f);
      fclose(f);
      memcpy(asLead.c_str(),AFSHead.bLead,7);              //
      wDots  = AFSHead.wDots;                              // 数据点数
      wLines = AFSHead.wLines;                             // 曲线个数
      ulSize = wDots * wLines * 4 + sizeof(AFSHead);
      bIs = ( (asLead=="AFSHEAD") &&
              (ulSize==ulLen) );
   }
   return bIs;
}

bool __fastcall IsAFSOldFile(AnsiString asFileName)
{
   // AFS测试数据文件格式:
   //   AFSHeadOld : 结构体
   //   dd....     : 详细测试数据 长度: nn*4*LineCount
   //                比如174个点,则一条测试线数据为174*4个字节
   FILE *f;
   bool bIs = false;
   AnsiString asLead;
   unsigned long ulLen,ulHead,ulLine;
   asLead = "       ";
   ulLen = FileSizeByName(asFileName);                     // 数据文件长度
   if(ulLen>sizeof(AFSHeadOld))                            // 文件长度必须大于文件头
   {
      f = fopen(asFileName.c_str(),"rb");
      fread(&AFSHeadOld,1,sizeof(AFSHeadOld),f);
      fclose(f);
      ulLine = AFSHeadOld.wLines * AFSHeadOld.wDots * 4;   // 测试数据长度
      ulHead = sizeof(AFSHeadOld) + ulLine;                   // 第二版长度
      memcpy(asLead.c_str(),AFSHeadOld.bLead,7);              //
      bIs = ( (asLead=="AFSHEAD") && (ulLen==ulHead) );
   }
   return bIs;
}

void __fastcall LoadAFSTestOldFile(AnsiString asFileName,TRespChart *rc)
{
   FILE *f;
   AnsiString asPeak;
   unsigned long ulCur;
   char *buf;
   f = fopen(asFileName.c_str(),"rb");
   fread(&AFSHeadOld,1,sizeof(AFSHeadOld),f);
   rc->DotCount = AFSHeadOld.wDots;
   rc->Initialize(255,AFSHeadOld.wDots);
   for(int i=0; i<4; i++)
   {
      asPeak.printf("%d,%d,%d,%d",i,AFSHeadOld.wFrom[i],
                    AFSHeadOld.wTo[i],
                    AFSHeadOld.wCount[i]);
      rc->PeakDefs->Append(asPeak);
   }
   ulCur = AFSHeadOld.wDots * 4;
   buf = (char *)malloc(ulCur);
   for(int i=0; i<AFSHeadOld.wLines; i++)
   {
      fread(buf,1,ulCur,f);
      rc->AppendLine(NULL,buf,AFSHeadOld.wDots);
   }
   fclose(f);
   rc->Repaint();
   free(buf);
   memset(&AFSHead,0,sizeof(AFSHead));
   for(int i=0; i<7; i++)
      AFSHead.bLead[i] = AFSHeadOld.bLead[i];
   for(int i=0; i<5; i++)
      AFSHead.bBar[i] = AFSHeadOld.bBar[i];
   AFSHead.bPeakCnt = 0;
   for(int i=0; i<4; i++)
   {
      AFSHead.wFrom[i] = AFSHeadOld.wFrom[i];
      AFSHead.wTo[i]   = AFSHeadOld.wTo[i];
      AFSHead.wCount[i]= AFSHeadOld.wCount[i];
      AFSHead.bCalc[i] = 0;
      if(AFSHead.wCount[i]>0) AFSHead.bPeakCnt++;
   }
   for(int i=0; i<3; i++)
   {
      AFSHead.bP1[i] = AFSHeadOld.bNumerator[i];
      AFSHead.bP2[i] = AFSHeadOld.bDenominator[i];
   }
   AFSHead.wLines = AFSHeadOld.wLines;
   AFSHead.wDots  = AFSHeadOld.wDots;
}

void __fastcall LoadAFSTestFile(AnsiString asFileName,TRespChart *rc)
{
   FILE *f;
   AnsiString asPeak;
   unsigned long ulCur;
   char *buf;
   memset(&AFSHead,0,sizeof(AFSHead));
   if(IsAFSFile(asFileName))
   {
      f = fopen(asFileName.c_str(),"rb");
      fread(&AFSHead,1,sizeof(AFSHead),f);
      rc->DotCount = AFSHead.wDots;
      rc->Initialize(255,AFSHead.wDots);
      rc->PeakDefs->Text = "";
      for(int i=0; i<AFSHead.bPeakCnt; i++)
      {
         asPeak.printf("%d,%d,%d,%d",i,
                       AFSHead.wFrom[i],
                       AFSHead.wTo[i],
                       AFSHead.wCount[i]);
         rc->PeakDefs->Append(asPeak);
      }
      ulCur = AFSHead.wDots * 4;
      buf = (char *)malloc(ulCur);
      for(int i=0; i<AFSHead.wLines; i++)
      {
         fread(buf,1,ulCur,f);
         rc->AppendLine(NULL,buf,AFSHead.wDots);
      }
      fclose(f);
      rc->Repaint();
      free(buf);
   } else if(IsAFSOldFile(asFileName))
   {
      LoadAFSTestOldFile(asFileName,rc);
   }
}

void __fastcall LoadAFSData(AnsiString asPath,TListBox *lb)
{
   if(!DirectoryExists(asPath)) return;          // 源文件目录
   AnsiString asFind, asName, asFName;
   TSearchRec sr;
   int iAttributes = faAnyFile;
   asFind = asPath + "*.AFS";                    // 搜索AFS文件
   lb->Items->Clear();
   if (FindFirst(asFind, iAttributes, sr) == 0)
   {
      do
      {
         if ((sr.Attr & iAttributes) == sr.Attr)
         {
            asName = sr.Name;                    // 找到的文件
            asFName= asPath + asName;            // 含路径的文件名
            if(IsAFSFile(asFName))               // 是AFS测试数据文件
            {
               asName = asName.SubString(1,asName.Pos(".")-1);
               lb->Items->Append(asName);
            }
         }
      } while (FindNext(sr) == 0);
      FindClose(sr);
   }
}

