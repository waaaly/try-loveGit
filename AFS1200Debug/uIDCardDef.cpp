#include <math.h>
#pragma hdrstop

#include "uIDCardDef.h"
#include "uParams.h"

#pragma package(smart_init)

#define max(a, b)  (((a) > (b)) ? (a) : (b))
#define min(a, b)  (((a) < (b)) ? (a) : (b))

AnsiString m_sFileHead;                          // ID HEX�ļ�ͷ

TMemo *mmm;

// �ַ������뻺����
void __fastcall s2Hex(
                AnsiString s,
                int iLen,
                BYTE *hex)
{
   int i;
   if(iLen<0) i = s.Length();
   else if(iLen<s.Length()) i = iLen;
   else i = s.Length();
   memset(hex,0,iLen);
   memcpy(hex,s.c_str(),i);
}

AnsiString Hex2s(BYTE B[],int iLen)
{
   AnsiString s="";
   BYTE b;
   for(int i=0; i<iLen; i++)
   {
      b = B[i];
      if(b==0) i=iLen;
      else{
         s+=" ";
         s[s.Length()] = b;
      }
   }
   return s;
}

AnsiString I2BCs(int i,int wid)
{
   AnsiString s = "                  ";
   itoa(i,s.c_str(),2);
   s = s.Trim();
   while(s.Length()<wid) s = "0" + s;
   return s;
}

AnsiString bs2hs(AnsiString s)
{
   unsigned long n = 0;
   AnsiString ss;
   for(int i=0;i<s.Length(); i++)
      n = n * 2 + (s[i+1] - '0');
   ss.printf("%05X",n);
   return ss;
}

AnsiString Make2Str(
           WORD wStartYear,
           WORD wProduct,
           WORD wYear,
           WORD wMonth,
           WORD wSerial)
{
   WORD wYN;
   wYN = (wYear - wStartYear)%7 + 1;
   return I2BCs(wProduct,m_BBCPC) +              // ��Ʒ���� 6
          I2BCs(wYN,     m_BBCYear) +            // ��       3
          I2BCs(wMonth,  m_BBCMonth) +           // ��       4
          I2BCs(wSerial, m_BBCBatch);            // ����     4
}

AnsiString Barcode2Bin(POCT_ITEM item)
{
   AnsiString sBC2;
   sBC2 = Make2Str(m_WStartYear,
                   item.ProductCode,
                   item.Year,
                   item.Month,
                   item.SerialNo);
   return "1" + sBC2;
}

void __fastcall MakeBarcode(POCT_ITEM &item)    // ��������
{
   AnsiString sBC2;
   sBC2 = Make2Str(m_WStartYear,
                   item.ProductCode,
                   item.Year,
                   item.Month,
                   item.SerialNo);
   while(sBC2.Length()<20) sBC2 = sBC2 + "0";
   item.BarCode = bs2hs(sBC2);
}

BYTE __fastcall CalcIDCRC(ID_ITEM id)  // ����ID����ϢУ��  2016-11-28
{
   BYTE BCRC = 0,B;
   BYTE *buf;
   buf = (BYTE *)&id;
   for(int i=9; i<3500; i++)
   {
      B = buf[i];
      BCRC+=B;
   }
   return BCRC;
}

void __fastcall POCT2ID(               // ��Ŀ����ת��ΪID����
                POCT_ITEM item,        // ��Ŀ�ṹ��
                ID_ITEM &id)           // ID�ṹ��
{
   ID_SUBITEM   si;                    // ����Ŀ�ṹ��
   POCT_SUBITEM psi;                   //
   AnsiString s,s1;

   memset(&id,0,sizeof(id));
   s2Hex(m_sFileHead,8,id.FileHead);             // �ļ�ͷ��Ϣ
   id.Version     = 1;                           // �汾��
   item.CompanyCode= m_BCompanyCode;
   id.CompanyCode = item.CompanyCode;            // ��˾����
   s2Hex(item.CompanyName,20,id.CompanyName);    // ��˾����
   s2Hex(item.BarCode,13,id.BarCode);            // ����
   s2Hex(item.BatchPre,16,id.BatchPre);          // ����ǰ׺
   s2Hex(item.ReportTitle,16,id.ReportTitle);    // ���浥����
   id.AreaValid = item.AreaValid;                // ��������
   s2Hex(item.Area,20,id.Area);                  // ��������
   id.PeakCount = item.PeakCount +               // ��ֵ����
                  item.BasePeak * 16;            // ��׼��λ��
   for(int i=0; i<item.PeakCount; i++)           // ��ֵ����
      id.Peaks[i] = item.Peaks[i];
   id.CheckTime = item.CheckTime;                // �������ʱ��
   id.HatchTime = item.HatchTime;                // ����ʱ��
   id.MinPosi   = item.MinPosi;                  // δ������ֵλ��
   id.MinCheck  = item.MinCheck;                 // �Ƿ��ж�δ����
   id.MinValue  = item.MinValue;                 // С�ٽ�ֵ
   id.MaxPosi   = item.MaxPosi;                  // �嶥��ֵλ��
   id.MaxCheck  = item.MaxCheck;                 // �Ƿ��жϳ嶥
   id.MaxValue  = item.MaxValue;                 // �嶥�ٽ�ֵ
   id.ItemCount = item.ItemCount;                // ��Ŀ����
   for(int i=0; i<item.ItemCount; i++)           // ��Ŀ����
   {
      psi = item.SIs[i];
      memset(&si,0,sizeof(si));                  // �������
      for(int j=0; j<5; j++)
      {
         s2Hex(psi.Name[j],16,si.Name[j]);       // ��Ŀ����
         s2Hex(psi.Unit[j],16,si.Unit[j]);       // ������λ
         si.RangeMin[j] = psi.RangeMin[j];       // ��ΧСֵ
         si.RangeMax[j] = psi.RangeMax[j];       // ��Χ��ֵ
      }
      si.RangeDec = psi.RangeDec;                // ��ⷶΧС��λ��
      for(int j=0; j<3; j++)                     // ���㹫ʽ��ֵλ��
         si.CalcPosi[j] = psi.CalcPosi[j];
      si.CalcMode    = psi.CalcMode;             // ��ֵ���㷽��
      for(int j=0; j<5; j++)                     // �����������Ͷ�Ӧ���߱��
         si.CurveNos[j] = psi.CurveNos[j];
      for(int j=0; j<9; j++)                     // �����������ͺ��¶Ȳ���ϵ��
         si.Ratios[j] = psi.Ratios[j];
      si.RatioDec    = psi.RatioDec;             // ϵ��С��λ��
      si.TempControl = psi.TempComp*128 +        // �¶Ȳ���
                       psi.TempDec;
      si.SubCheck    = psi.SubCheck;             // ����δ�������ʱ��(1������)  2016-10-19
      si.SubHatch    = psi.SubHatch;             // �������ʱ��(1������)        2016-10-19
      si.SubMinValue = psi.SubMinValue;          // ����δ�����ж�ֵ             2016-11-29
      si.siChannel   = psi.siChannel;            // ������Ŀ����ͨ����(1������)  2016-08-18
      for(int j=0; j<4; j++)
         si.siPeaks[j] = psi.siPeaks[j];         // ��������䶨�壬���4����    2016-08-18
      si.LessThan    = psi.LessThan;             // TֵС�ڸ�ֵʱ����һ��ϵ��
      si.LessThanRatio = psi.LessThanRatio;      // ϵ��
      id.Items[i] = si;
      id.CAValue[i] = psi.CAValue;               // 2016-06-16��׼
      id.CAParam[i] = psi.CAMethod*64+           // 2016-06-16��׼
                      psi.CADecimal*16+          // 2016-06-16��׼
                      psi.CAIndex;               // 2016-06-16��׼
   }
   id.SampleVol  = item.SampleVol;               // ������
   id.ReagentVol = item.ReagentVol;              // �Լ���
   id.MixedVol   = item.MixedVol;                // ���Һ��
   id.DeviceType = item.DeviceType;              // �豸����
   id.ProductCode= item.ProductCode;             // ��Ʒ����
   id.Year       = item.Year;                    // ��
   id.Month      = item.Month;                   // ��
   id.SerialNo   = item.SerialNo;                // ��ˮ��
   id.ValidMonth = item.ValidMonth;              // ��Ч���� 2016-11-23
   s2Hex(item.Batch,4,id.Batch);                 // ����
   id.Blank      = item.Blank;                   // �Ƿ������
   id.Reversal   = item.Reversal;                // ��ת
   id.ReversalBase = item.ReversalBase;          // ��ת��׼ֵ
   for(int i=0; i<10; i++)                       // �������
      id.Curves[i] = item.Curves[i];
}

void __fastcall ID2POCT(                         // ID����ת������Ŀ����
                ID_ITEM id,
                POCT_ITEM &item)
{
   ID_SUBITEM   si;                              // ����Ŀ�ṹ��
   POCT_SUBITEM psi;                             //
   AnsiString s,s1;
   BYTE B;
   id.CompanyCode   = m_BCompanyCode;
   item.CompanyCode = id.CompanyCode;            // ��˾����
   item.CompanyName = Hex2s(id.CompanyName,20);  // ��˾����
   item.BarCode     = Hex2s(id.BarCode,13);      // ����
   item.BatchPre    = Hex2s(id.BatchPre,16);     // ����ǰ׺
   item.ReportTitle = Hex2s(id.ReportTitle,16);  // ���浥����
   item.AreaValid   = id.AreaValid;              // ��������
   item.Area        = Hex2s(id.Area,20);         // ��������
   item.PeakCount   = id.PeakCount % 16;         // ��ֵ����
   item.BasePeak    = id.PeakCount / 16;         // ��׼��λ��
   item.ItemCount   = id.ItemCount;              // ��Ŀ����
   for(int i=0; i<item.PeakCount; i++)           // ��ֵ����
      item.Peaks[i] = id.Peaks[i];
   item.CheckTime = id.CheckTime;                // �������ʱ��
   item.HatchTime = id.HatchTime;                // ����ʱ��
   item.MinPosi   = id.MinPosi;                  // δ������ֵλ��
   item.MinCheck  = id.MinCheck;                 // �Ƿ��ж�δ����
   item.MinValue  = id.MinValue;                 // С�ٽ�ֵ
   item.MaxPosi   = id.MaxPosi;                  // �嶥��ֵλ��
   item.MaxCheck  = id.MaxCheck;                 // �Ƿ��жϳ嶥
   item.MaxValue  = id.MaxValue;                 // �嶥�ٽ�ֵ
   for(int i=0; i<id.ItemCount; i++)             // ��Ŀ����
   {
      si = id.Items[i];
      for(int j=0; j<5; j++)
      {
         psi.Name[j] = Hex2s(si.Name[j],16);     // ��Ŀ����
         psi.Unit[j] = Hex2s(si.Unit[j],16);     // ������λ
         psi.RangeMin[j] = si.RangeMin[j];       // ��ΧСֵ
         psi.RangeMax[j] = si.RangeMax[j];       // ��Χ��ֵ
      }
      psi.RangeDec = si.RangeDec;                // ��ΧС��λ��
      for(int j=0; j<3; j++)                     // ���㹫ʽ��ֵλ��
         psi.CalcPosi[j] = si.CalcPosi[j];
      psi.CalcMode     = si.CalcMode;            // ��ֵ���㷽��
      for(int j=0; j<5; j++)                     // �������Ͷ�Ӧ�������
         psi.CurveNos[j] = si.CurveNos[j];
      for(int j=0; j<9; j++)                     // �������ͺ��¶Ȳ���ϵ��
         psi.Ratios[j] = si.Ratios[j];
      if(si.RatioDec>5) si.RatioDec = 5;         // С��λ0��5λ
      psi.RatioDec     = si.RatioDec;            // ϵ��С��λ��
      psi.TempComp     = si.TempControl / 128;   // �¶Ȳ�������
      psi.TempDec      = si.TempControl % 128;   // �¶Ȳ���ϵ��С��λ
      if(psi.TempDec>5) psi.TempDec=5;
      psi.SubCheck    = si.SubCheck;             // ����δ�������ʱ��(1������)  2016-10-19
      psi.SubHatch    = si.SubHatch;             // �������ʱ��(1������)        2016-10-19
      psi.SubMinValue = si.SubMinValue;          // ����δ�����ж�ֵ             2016-11-29
      psi.siChannel   = si.siChannel;            // ������Ŀ����ͨ����(1������)  2016-08-18
      for(int j=0; j<4; j++)
         psi.siPeaks[j] = si.siPeaks[j];         // ��������䶨�壬���4����    2016-08-18
      psi.LessThan     = si.LessThan;            // TֵС�ڸ�ֵʱ����һ��ϵ��
      psi.LessThanRatio= si.LessThanRatio;       // ϵ��
      psi.CAValue      = id.CAValue[i];          // 2016-06-16��׼
      B = id.CAParam[i];                         // 2016-06-16��׼
      psi.CAMethod     = B/64;                   // 2016-06-16��׼
      psi.CAIndex      = B%16;                   // 2016-06-16��׼
      psi.CADecimal    = (B%64)/16;              // 2016-06-16��׼
      item.SIs[i]      = psi;
   }
   for(int i=0; i<10; i++)                       // �������
      item.Curves[i] = id.Curves[i];
   item.SampleVol  = id.SampleVol;               // ������
   item.ReagentVol = id.ReagentVol;              // �Լ���
   item.MixedVol   = id.MixedVol;                // ���Һ��
   item.DeviceType = id.DeviceType;              // �豸����
   item.ProductCode= id.ProductCode;             // ��Ʒ����
   item.Year       = id.Year;                    // ��
   item.Month      = id.Month;                   // ��
   item.SerialNo   = id.SerialNo;                // ��ˮ��
   item.ValidMonth = id.ValidMonth;              // ��Ч���� 2016-11-23
   item.Batch      = Hex2s(id.Batch,4);          // ����
   item.Blank      = id.Blank;                   // �Ƿ������
   item.Reversal   = id.Reversal;                // ��ת
   item.ReversalBase = id.ReversalBase;          // ��ת��׼ֵ
}

AnsiString ItemFullName(AnsiString asName)            // ȫ������
{
   AnsiString asRet,asC;
   AnsiString asDBC = "\\/:*?\"<>|";
   AnsiString asSBC = "�ܣ���������������";
   int iPos;
   asRet   = "";
   for(int i=1; i<=asName.Length(); i++)
   {
      asC  = asName.SubString(i,1);
      iPos = asDBC.Pos(asC);
      if(iPos==0) asRet+=asC;
      else asRet+=asSBC.SubString(iPos*2-1,2);
   }
   return asRet;
}

AnsiString ItemHalfName(AnsiString asName)       // �������
{
   AnsiString asRet,asFName,asC;
   AnsiString asDBC = "\\/:*?\"<>|";
   AnsiString asSBC = "�ܣ���������������";
   int iPos;
   asFName = asName;
   asRet   = "";
   for(int i=1; i<=asSBC.Length()/2; i++)
   {
      asC  = asSBC.SubString(i,2);
      iPos = asFName.Pos(asC);
      while(iPos>0)
      {
         asFName.Delete(iPos,2);
         asFName.Insert(asDBC.SubString((i+1)/2,1),iPos);
         iPos = asFName.Pos(asC);
      }
   }
   asRet = asFName;
   return asRet;
}

bool __fastcall FileIsIDHex(AnsiString asName)   // �ж��ļ��ǲ���ID��HEX�ļ�
{
   bool bret;
   FILE *f;
   BYTE BHead[8];
   AnsiString asHead = "        ";
   if(!FileExists(asName))
   {
        return false;
   }
   if(FileSizeByName(asName)!=4096)
   {
        bret=false;  // �ļ���С����
   }
   else
   {
      f = fopen(asName.c_str(),"rb");
      memset(BHead,0,sizeof(BHead));
      fread(BHead,8,1,f);
      fclose(f);
      for(int i=0; i<8; i++)
         asHead[i+1] = BHead[i];
      bret   = (asHead==m_sFileHead);            // �ļ�ͷ����

   }
   return bret;
}

void __fastcall LoadItemList(
                AnsiString asPath,
                TStrings *sl)
{
   TSearchRec sr;
   TDateTime dt;
   int iAttributes = 0,iPos;
   AnsiString asDT;
   TStringList *sl1 = new TStringList;
   sl->Clear();
   iAttributes |= faReadOnly;
   iAttributes |= faHidden;
   iAttributes |= faSysFile;
   iAttributes |= faVolumeID;
   iAttributes |= faDirectory;
   iAttributes |= faArchive;
   iAttributes |= faAnyFile;
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
   sl1->Sort();
   for(int i=0; i<sl1->Count; i++)
   {
      asDT = sl1->Strings[i];
      iPos = asDT.Pos("|");
      asDT.Delete(1,iPos);
      sl->Insert(0,asDT);
   }
}

bool __fastcall LoadIDHex(                       // ��HEX�ļ���ȡ��Ŀ����
                AnsiString asName,
                POCT_ITEM &item)
{
   bool bret = false;
   ID_ITEM    id;
   FILE *f;
   WORD wRead;
   AnsiString asHead;
   if(FileIsIDHex(asName))
   {
      f = fopen(asName.c_str(),"rb");
      if(f!=NULL)
      {
         wRead = fread(&id,1,4096,f);
         if(wRead==4096)
         {
            bret = (id.Version==CalcIDCRC(id))|| // У����ȷ  2016-11-28
                   (id.Version==1);              // �ϰ汾�汾��Ϊ1,����У��
            ID2POCT(id,item);
         }
      }
      fclose(f);
   }
   return bret;
}

void __fastcall SaveIDHex(                       // ������Ŀ������HEX�ļ�
                POCT_ITEM item,                  // ��Ŀ����
                AnsiString asName)               // �����ļ���
{
   ID_ITEM    id;                                // �����ID�ṹ��
   POCT2ID(item,id);                             // ת��ΪHEX�ṹ��
   s2Hex(m_sFileHead,8,id.FileHead);             // �ļ�ͷ��Ϣ
   id.Version = CalcIDCRC(id);                   // ����ID����ϢУ�� 2016-11-28
   FILE *f;
   f = fopen(asName.c_str(),"wb");
   fwrite(&id,4096,1,f);
   fclose(f);
}

AnsiString GetTCFormula(                         // ����TC���㹫ʽ�ַ���
           int iP[],                             // �������������
           int iPCnt,                            // ���������
           int iMode)                            // ���㷽ʽ
{
   AnsiString asFormula,s;
   AnsiString sFmts[9]={
              "0: x1/x2",
              "1: x1",
              "2: x1+x2",
              "3: x1+x2+x3",
              "4: (x1+x2)/x3",
              "5: x1/(x1+x2+x3)",
              "6: x1/(x1+x2)",
              "7: x1/(x2+x3)",
              "8: (x1-B)/(x2-B)"};
   int iPos;
   AnsiString sX[10];
   if(iP[0]==0) asFormula = "";
   else asFormula = sFmts[iMode];
   for(int i=0; i<iPCnt; i++)
      sX[i] = "X" + IntToStr(iP[i]);
   for(int i=1; i<=iPCnt; i++)
   {
      s.printf("x%d",i);
      iPos = asFormula.Pos(s);
      while(iPos>0)
      {
         asFormula.Delete(iPos,s.Length());
         asFormula.Insert(sX[i-1],iPos);
         iPos = asFormula.Pos(s);
      }
   }
   return asFormula;
}

float CAdjust(float v,BYTE pno,POCT_SUBITEM si)
{
   float v1 = v;
   if(si.CAIndex==pno)                 // ��ֵ��ŵ���C��λ��
   switch(si.CAMethod){
   case 1 : v1+=si.CAValue; break;     // +
   case 2 : v1*=si.CAValue; break;     // *
   }
   return v1;
}

float __fastcall CalcItemTC(
                 POCT_ITEM pi,                   // ��Ŀ����
                 ID_PEAKRESULT pr,               // ��ֵ�����λ��
                 int iIndex)                     // ����Ŀ���
{
   float fTC = -1;
   POCT_SUBITEM  si;
   float x[3], xx,fBlank;
   int iP[3];
   si = pi.SIs[iIndex];
   for(int i=0; i<3; i++)                        // �������ķ�ֵ
   {
      iP[i] = si.CalcPosi[i];                    // �������ķ�ֵ���
      x[i]  = CAdjust(pr.Value[iP[i]-1],iP[i]-1,si);
   }
   switch(si.CalcMode){                          // TC���㷽��
   case 0 : if(x[0]<si.LessThan)                 // ���޼��
               x[0] = x[0]*si.LessThanRatio;
            pr.Value[si.CalcPosi[0]] = x[0];     // ��1����ֵ
            if(x[1]!=0) fTC = x[0]/x[1];         // x1/x2
            break;
   case 1 : fTC = x[0];                break;    // x1
   case 2 : fTC = x[0]+x[1];           break;    // x1+x2
   case 3 : fTC = x[0]+x[1]+x[2];      break;    // x1+x2+x3
   case 4 : if(x[2]!=0)
               fTC = (x[0]+x[1])/x[2]; break;    // (x1+x2)/x3
   case 5 : xx = x[0] + x[1] + x[2];             // x1/(x1+x2+x3)
            if(xx!=0) fTC = x[0]/xx;   break;
   case 6 : xx = x[0] + x[1];                    // x1/(x1+x2)
            if(xx!=0) fTC = x[0]/xx;   break;
   case 7 : xx = x[1] + x[2];                    // x1/(x2+x3)    2016-11-22
            if(xx!=0) fTC = x[0]/xx;   break;
   case 8 : if(iP[1]>iP[0])                      // (x1-B)/(x2-B) 2016-12-01
               fBlank = pr.Vallery[iP[0]];
            else
               fBlank = pr.Vallery[iP[0]-1];
            xx = x[1] - fBlank;
            if(xx!=0) fTC = (x[0]-fBlank)/xx;
            break;
   }
   return fTC;
}

