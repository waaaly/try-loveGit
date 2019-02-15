
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
   // AFS���������ļ���ʽ:
   //   AFSHead  : �ṹ��
   //   dd....   : ��ϸ�������� ����: nn*4*LineCount
   //              ����174����,��һ������������Ϊ174*4���ֽ�
   FILE *f;
   AnsiString asLead;
   WORD wDots,wLines;
   unsigned long ulLen,ulSize;
   bool bIs = false;
   asLead = "       ";
   ulLen = FileSizeByName(asFileName);                     // �����ļ�����
   if(ulLen>sizeof(AFSHead))                               // �ļ����ȱ�������ļ�ͷ
   {
      f = fopen(asFileName.c_str(),"rb");
      fread(&AFSHead,1,sizeof(AFSHead),f);
      fclose(f);
      memcpy(asLead.c_str(),AFSHead.bLead,7);              //
      wDots  = AFSHead.wDots;                              // ���ݵ���
      wLines = AFSHead.wLines;                             // ���߸���
      ulSize = wDots * wLines * 4 + sizeof(AFSHead);
      bIs = ( (asLead=="AFSHEAD") &&
              (ulSize==ulLen) );
   }
   return bIs;
}

bool __fastcall IsAFSOldFile(AnsiString asFileName)
{
   // AFS���������ļ���ʽ:
   //   AFSHeadOld : �ṹ��
   //   dd....     : ��ϸ�������� ����: nn*4*LineCount
   //                ����174����,��һ������������Ϊ174*4���ֽ�
   FILE *f;
   bool bIs = false;
   AnsiString asLead;
   unsigned long ulLen,ulHead,ulLine;
   asLead = "       ";
   ulLen = FileSizeByName(asFileName);                     // �����ļ�����
   if(ulLen>sizeof(AFSHeadOld))                            // �ļ����ȱ�������ļ�ͷ
   {
      f = fopen(asFileName.c_str(),"rb");
      fread(&AFSHeadOld,1,sizeof(AFSHeadOld),f);
      fclose(f);
      ulLine = AFSHeadOld.wLines * AFSHeadOld.wDots * 4;   // �������ݳ���
      ulHead = sizeof(AFSHeadOld) + ulLine;                   // �ڶ��泤��
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
   if(!DirectoryExists(asPath)) return;          // Դ�ļ�Ŀ¼
   AnsiString asFind, asName, asFName;
   TSearchRec sr;
   int iAttributes = faAnyFile;
   asFind = asPath + "*.AFS";                    // ����AFS�ļ�
   lb->Items->Clear();
   if (FindFirst(asFind, iAttributes, sr) == 0)
   {
      do
      {
         if ((sr.Attr & iAttributes) == sr.Attr)
         {
            asName = sr.Name;                    // �ҵ����ļ�
            asFName= asPath + asName;            // ��·�����ļ���
            if(IsAFSFile(asFName))               // ��AFS���������ļ�
            {
               asName = asName.SubString(1,asName.Pos(".")-1);
               lb->Items->Append(asName);
            }
         }
      } while (FindNext(sr) == 0);
      FindClose(sr);
   }
}

