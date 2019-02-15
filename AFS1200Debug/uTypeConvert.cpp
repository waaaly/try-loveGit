#pragma hdrstop

#include <IniFiles.hpp>
#include <Clipbrd.hpp>

#include "uTypeConvert.h"
#include "uParams.h"
#include "loadLib.h"

#pragma package(smart_init)

bool m_bTAdmin = true;  //�Ƿ���ʾ���� 2018/09/29

// ���������ַ���
AnsiString Float2Str(float f,int iDec)
{
   AnsiString asFmt;
   int idec = iDec;
   if(iDec>16) idec = 0;
   asFmt = "0.";
   for(int i=0; i<idec; i++) asFmt+="#";
   return FormatFloat(asFmt,f);
}

// ���������ַ���(�Զ�С��λ)
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
                POCT_ITEM pi,                    // ��Ŀ����
                TFillStringGrid *sgTest,         // ����ԭʼ��������
                TFillStringGrid *sgCalc,         // ��������
                DWORD *dw,                       // ���ݻ�����
                int iDots,                       // ���ݸ���
                int iIndex,                      // �к�
                bool bBlank)                     // �Ƿ���ʾ����ֵ
{
   ID_PEAKRESULT pr;
   POCT_SUBITEM  si;
   float fTC;
   AnsiString asTC;
   DWORD dwBlank;
   int iDec=5;
   for(int j=0; j<iDots;  j++)                   // ���ȡ����ʾ
      sgTest->Cells[iIndex][j+1] = dw[j];
   sgTest->Cells[iIndex][0] = iIndex;
   sgCalc->Cells[iIndex][0] = iIndex;


   call_calcPeak(dw,iDots,pi.Peaks,pi.PeakCount,pi.BasePeak, pi.Blank, &dwBlank,&pr);       // �Զ�׷�����ֵ


   for(int j=0; j<pi.ItemCount; j++)             // �������TCֵ
   {
      fTC  = CalcItemTC(pi,pr,j);                // ������Ŀ��TCֵ
      asTC = Float2Str(fTC,iDec);
      sgCalc->Cells[iIndex][j+pi.PeakCount+1] = asTC.Trim();
   }
   for(int j=0; j<pi.PeakCount; j++)             // ��ʾ��ֵ
      sgCalc->Cells[iIndex][j+1] = Float2Str(pr.Value[j],1);
   if(bBlank)
        sgCalc->Cells[iIndex][sgCalc->RowCount-1] = dwBlank;
}

int __fastcall LoadTest(                         // ���뵥��Ũ�ȶ�Ӧ�Ĳ�������
               POCT_ITEM pi,                     // ��Ŀ����
               int iDots,                        // Ĭ�ϵ���
               AnsiString asIniName,             // ���������ļ���
               AnsiString asSec,                 // �������ڶ���
               int iIndex,                       // Ũ�����
               TRespChart *rc,                   // ��������ͼ��
               TFillStringGrid *sgTest,          // ���������б�
               TFillStringGrid *sgCalc)          // �������б�
{
   int iGet = 0, iCol,iDCnt,iNo,iPos,iCnt;
   TIniFile *inif;
   DWORD *buf,dVal;
   AnsiString asIdent,asData,asVal;
   if(!FileExists(asIniName)) return iGet;       // ���ļ�����
   inif = new TIniFile(asIniName);
   asIdent.printf("CardCnt%d",iIndex);
   iGet = inif->ReadInteger(asSec,asIdent,0);    // Ũ����Ŷ�Ӧ�ļ�¼��
   iDCnt= inif->ReadInteger(asSec,"Dots",iDots); // ���ݵ����
   iCol = sgTest->ColCount - 1;                  // ��ǰ��
   sgTest->ColCount+=iGet;                       // ���������б�����
   sgCalc->ColCount+=iGet;                       // ����TC�����б�����
   buf = (DWORD *)malloc(iDCnt*4);
   for(int i=1; i<=iGet; i++)                    // ��ȡ���߼�¼����
   {
      iNo  = 1;                                  // ���ݼ�¼ident����
      iCnt = 0;                                  // ���ݸ�������
      while(1)
      {
         asIdent.printf("D%d_%d_%d",iIndex,i,iNo); // Card1_1_1,Card1_1_2...
         asData = inif->ReadString(asSec,asIdent,"");
         if(asData.IsEmpty()) break;
         while(!asData.IsEmpty())                // ����������ȡ�������ַ���
         {
            iPos = asData.Pos(",");              // ����֮���ö��ŷָ���
            if(iPos==0)                          // ���һ��������
            {
               asVal  = asData;
               asData = "";
            } else
            {
               asVal = asData.SubString(1,iPos-1);
               asData.Delete(1,iPos);
            }
            dVal = asVal.ToIntDef(0);
            if(iCnt<iDCnt) buf[iCnt] = dVal;     // ���뻺����
            iCnt++;
         }
         iNo++;
      }
      rc->AppendLine(NULL,(unsigned char *)buf,iCnt);             // ׷�ӵ�RespChart
      CalcSingle(pi,sgTest,sgCalc,buf,iCnt,iCol,m_bTAdmin);// ���㵥�����߷�ֵ����
      iCol++;
   }
   rc->Repaint();                                // �ػ�ԭʼ����
   free(buf);
   delete inif;
   return iGet;                                  // ���ز������ߵĸ���
}

void __fastcall AppendTest(                      // �����������������񲢼���
                POCT_ITEM pi,                    // ��Ŀ����
                DWORD *dw,                       // ���ݻ�����
                int iCount,                      // ���ݸ���
                TRespChart *rc,                  // respchart
                TFillStringGrid *sgTest,         // ������������
                TFillStringGrid *sgCalc)         // ��������
{
   int iCol = sgTest->ColCount - 1;              // ��Ҫ���ӵ�����
   for(int i=0; i<iCount; i++)                   // �������������ݱ��
      sgTest->Cells[iCol][i+1] = dw[i];
   sgTest->ColCount++;                           // ����+1
   sgCalc->ColCount++;
   sgTest->Cells[iCol+1][0]=iCol+1;              // �б���
   rc->AppendLine(NULL,(char *)dw,iCount);
   rc->ActiveLine = iCol;                        // ��������
   CalcSingle(pi,sgTest,sgCalc,dw,iCount,iCol,m_bTAdmin); // ���㵥������
   rc->Repaint();
   rc->DrawAllLine();
}

void __fastcall SaveTest(                        // ���浥��Ũ�ȵ��β�������
               AnsiString asIniName,             // ���������ļ���
               AnsiString asSec,                 // �������ڶ���
               int iConcNo,                      // Ũ�����
               int iTestCnt,                     // ��ǰŨ�Ȳ��Ը���
               DWORD buf[],                      // ���ݻ�����
               int iDots)                        // ���ݵ���
{
   TIniFile *inif = new TIniFile(asIniName);
   AnsiString asIdent,asData,asVal;
   int iCnt=0, iLine=0;
   while(iCnt<iDots)
   {
      asData = "";
      iLine++;                                   // �кŴ�1��ʼ
      asIdent.printf("D%d_%d_%d",                // Card1_1_1,Card1_1_2...
         iConcNo,iTestCnt,iLine);                // Ũ�����_�������_�к�
      while(asData.Length()<100)                 // ���б��浥�β�������,����100�ַ�
      {
         asVal = IntToStr(buf[iCnt]);
         asData = asData + asVal + ",";          // ���ż������������
         iCnt++;
         if(iCnt==iDots) break;
      }
      inif->WriteString(asSec,asIdent,asData);   // ���浥������
   }
   asIdent.printf("CardCnt%d",iConcNo);
   inif->WriteInteger(asSec,asIdent,iTestCnt);   // Ũ����Ŷ�Ӧ�ļ�¼��
   delete inif;
}

void __fastcall CalcCVS(
                int iPeakCount,                  // ��ֵ����
                TFillStringGrid *sgCalc,         // ��������
                TFillStringGrid *sgCV,           // CV����
                int iConcCnt,                    // ��ǰŨ�Ȳ��Ա���
                bool bBlank)                     // �Ƿ���ʾ����ֵ
{
   TStrings *tsV = new TStringList;
   TCalcSDCV *CalcSDCV = new TCalcSDCV(NULL);
   float fMax,fMin;
   int iDec;
   float fAvg,fCV,fRMS,fTotal1,fValue,fTotal2;
   AnsiString asValue;
   for(int i=1; i<sgCalc->RowCount; i++)         // ���м���CVֵ
   {
      if(iConcCnt==0)                            // ��ɨ���ߵ�ʱ����ʾ*��
      {
         for(int j=1; j<=5; j++)
            sgCV->Cells[j][i] = "*";
         continue;
      }
      if( (i<iPeakCount+1) ||                    // ��ֵС��λ1
          ((i==sgCV->RowCount-1)&&bBlank) )      // ����С��λ
         iDec = 1;
      else iDec=4;                               // TCֵ��CVֵС��λ4
      fMax   = 0;                                // ���ֵ
      fMin   = 0xffffffff;                       // ��Сֵ
      fTotal1= 0;                                // �ۼӺ�
      fTotal2= 0;                                // ƽ����
      tsV->Clear();                              // ��������б�
      for(int j=0; j<iConcCnt; j++)              // ���ɨ���߼���
      {
         asValue = sgCalc->Cells[1+j][i];        // ȡ���������ַ���
         fValue  = StrToFloatDef(asValue,0);     // ת��Ϊ������
         fMax = MAX(fMax,fValue);                // ���ֵ
         fMin = MIN(fMin,fValue);                // ��Сֵ
         fTotal1+= fValue;                       // �ۼӺ�
         fTotal2+= (fValue*fValue);              // ƽ����
         tsV->Append(sgCalc->Cells[1+j][i]);     // ��������CV
      }
      if(i<iPeakCount+1)                         // Peak�����Сֵ
      {
         sgCV->Cells[4][i] = Float2Str(fMax,0);
         sgCV->Cells[5][i] = Float2Str(fMin,0);
      } else                                     // TC�����Сֵ
      {
         sgCV->Cells[4][i] = Float2Str(fMax,iDec);
         sgCV->Cells[5][i] = Float2Str(fMin,iDec);
      }
      fAvg = fTotal1/iConcCnt;                   // ƽ��ֵ
      sgCV->Cells[1][i] = Float2Str(fAvg,iDec);
      CalcSDCV->Datas->Text = tsV->Text;         // ����CV
      CalcSDCV->CalcSDCV();
      sgCV->Cells[2][i] = Float2Str(CalcSDCV->SD,iDec);
      sgCV->Cells[3][i] = Float2Str(CalcSDCV->CV,iDec);
   }
   delete tsV;
   delete CalcSDCV;
}

void __fastcall DeleteTest(                      // ɾ������Ũ�����в�������
                AnsiString asIniFile,            // �����ļ�
                AnsiString asSec,                // �������ζ�
                int iConcNo)                     // ��ǰŨ�����
{
   TIniFile *inif = new TIniFile(asIniFile);
   int iGet,iNo;
   AnsiString asIdent,asData;
   asIdent.printf("CardCnt%d",iConcNo);
   iGet = inif->ReadInteger(asSec,asIdent,0);    // Ũ����Ŷ�Ӧ�Ĳ��Լ�¼��
   inif->DeleteKey(asSec,asIdent);               // ɾ�����Ը���
   for(int i=1; i<=iGet; i++)                    // һ��������ɾ��
   {
      iNo = 1;
      while(1)                                   // �������ԵĶ����ɾ��
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
                POCT_ITEM pi,                    // ��Ŀ����
                AnsiString asAFName,             // ���������ļ�
                AnsiString asABatch,             // ������������
                TFillStringGrid *sgAssess)       // ����ԭʼ��������
{
   TIniFile *inif = new TIniFile(asAFName);
   AnsiString asRC,asV;
   int iCCnt,iC,iPos;
   asV   = "ConcCount";
   iCCnt = inif->ReadInteger(asABatch,asV,0);    // Ũ�ȸ���
   if(iCCnt>0) sgAssess->RowCount = iCCnt+1;     // ��Ũ�ȸ���
   else sgAssess->RowCount = 2;                  // ����2
   for(int i=1; i<sgAssess->ColCount; i++)       // ���������������
   for(int j=1; j<sgAssess->RowCount; j++)
      sgAssess->Cells[i][j] = "";
   // ���¶�ȡ��������
   // ÿһ�б�������һ�е�����,���ż����Ԫ������
   //   ����ֵ1,����ֵ1,����ֵ2,����ֵ2,......
   for(int i=1; i<=iCCnt; i++)                   // ÿ�б���Ũ��/����ֵ...����
   {
      asV.printf("RC%d",i);                      // ��ȡŨ�ȷ�Ӧֵ
      asRC = inif->ReadString(asABatch,asV,"");  // Ũ�ȷ�Ӧֵ
      iC   = 1;                                  // �ӵ�һ�п�ʼ
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

void __fastcall SaveRC(                          // ����Ũ�ȺͲ���ֵ����
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
   iCCnt = sgAssess->RowCount-1;                 // Ũ�ȸ���
   inif->WriteInteger(asABatch,asV,iCCnt);
   for(int i=sgAssess->FixedRows; i<sgAssess->RowCount; i++)       // ���д���
   {
      asIdent.printf("RC%d",i);
      asV = "";
      for(int j=sgAssess->FixedCols; j<sgAssess->ColCount; j++)    // ��Ӧֵ���б���
         asV = asV + sgAssess->Cells[j][i]+",";
      inif->WriteString(asABatch,asIdent,asV);   // ����Ũ��
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

void __fastcall RefreshTCFormula(                // ˢ����ʾTC���㹫ʽ
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

int __fastcall GetTCMode(AnsiString asTCFormula) // �ӹ�ʽ�ַ���ȡ���㷽ʽ
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

