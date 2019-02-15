#include <math.h>
#pragma hdrstop

#include "uIDCardDef.h"
#include "uParams.h"

#pragma package(smart_init)

#define max(a, b)  (((a) > (b)) ? (a) : (b))
#define min(a, b)  (((a) < (b)) ? (a) : (b))

AnsiString m_sFileHead;                          // ID HEX文件头

TMemo *mmm;

// 字符串存入缓冲区
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
   return I2BCs(wProduct,m_BBCPC) +              // 产品代码 6
          I2BCs(wYN,     m_BBCYear) +            // 年       3
          I2BCs(wMonth,  m_BBCMonth) +           // 月       4
          I2BCs(wSerial, m_BBCBatch);            // 批号     4
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

void __fastcall MakeBarcode(POCT_ITEM &item)    // 生成条码
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

BYTE __fastcall CalcIDCRC(ID_ITEM id)  // 计算ID卡信息校验  2016-11-28
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

void __fastcall POCT2ID(               // 项目数据转换为ID数据
                POCT_ITEM item,        // 项目结构体
                ID_ITEM &id)           // ID结构体
{
   ID_SUBITEM   si;                    // 子项目结构体
   POCT_SUBITEM psi;                   //
   AnsiString s,s1;

   memset(&id,0,sizeof(id));
   s2Hex(m_sFileHead,8,id.FileHead);             // 文件头信息
   id.Version     = 1;                           // 版本号
   item.CompanyCode= m_BCompanyCode;
   id.CompanyCode = item.CompanyCode;            // 公司代码
   s2Hex(item.CompanyName,20,id.CompanyName);    // 公司名称
   s2Hex(item.BarCode,13,id.BarCode);            // 条码
   s2Hex(item.BatchPre,16,id.BatchPre);          // 批号前缀
   s2Hex(item.ReportTitle,16,id.ReportTitle);    // 报告单标题
   id.AreaValid = item.AreaValid;                // 区域启用
   s2Hex(item.Area,20,id.Area);                  // 区域名称
   id.PeakCount = item.PeakCount +               // 峰值数量
                  item.BasePeak * 16;            // 基准峰位置
   for(int i=0; i<item.PeakCount; i++)           // 峰值定义
      id.Peaks[i] = item.Peaks[i];
   id.CheckTime = item.CheckTime;                // 加样检测时间
   id.HatchTime = item.HatchTime;                // 孵育时间
   id.MinPosi   = item.MinPosi;                  // 未加样峰值位置
   id.MinCheck  = item.MinCheck;                 // 是否判断未加样
   id.MinValue  = item.MinValue;                 // 小临界值
   id.MaxPosi   = item.MaxPosi;                  // 冲顶峰值位置
   id.MaxCheck  = item.MaxCheck;                 // 是否判断冲顶
   id.MaxValue  = item.MaxValue;                 // 冲顶临界值
   id.ItemCount = item.ItemCount;                // 项目数量
   for(int i=0; i<item.ItemCount; i++)           // 项目参数
   {
      psi = item.SIs[i];
      memset(&si,0,sizeof(si));                  // 清空数据
      for(int j=0; j<5; j++)
      {
         s2Hex(psi.Name[j],16,si.Name[j]);       // 项目名称
         s2Hex(psi.Unit[j],16,si.Unit[j]);       // 计量单位
         si.RangeMin[j] = psi.RangeMin[j];       // 范围小值
         si.RangeMax[j] = psi.RangeMax[j];       // 范围大值
      }
      si.RangeDec = psi.RangeDec;                // 检测范围小数位数
      for(int j=0; j<3; j++)                     // 计算公式峰值位置
         si.CalcPosi[j] = psi.CalcPosi[j];
      si.CalcMode    = psi.CalcMode;             // 峰值计算方法
      for(int j=0; j<5; j++)                     // 五种样本类型对应曲线编号
         si.CurveNos[j] = psi.CurveNos[j];
      for(int j=0; j<9; j++)                     // 五种样本类型和温度补偿系数
         si.Ratios[j] = psi.Ratios[j];
      si.RatioDec    = psi.RatioDec;             // 系数小数位数
      si.TempControl = psi.TempComp*128 +        // 温度补偿
                       psi.TempDec;
      si.SubCheck    = psi.SubCheck;             // 子项未加样检测时间(1卡多联)  2016-10-19
      si.SubHatch    = psi.SubHatch;             // 子项测试时间(1卡多联)        2016-10-19
      si.SubMinValue = psi.SubMinValue;          // 子项未加样判定值             2016-11-29
      si.siChannel   = psi.siChannel;            // 该子项目所在通道号(1卡多联)  2016-08-18
      for(int j=0; j<4; j++)
         si.siPeaks[j] = psi.siPeaks[j];         // 子项峰区间定义，最多4个峰    2016-08-18
      si.LessThan    = psi.LessThan;             // T值小于该值时乘以一下系数
      si.LessThanRatio = psi.LessThanRatio;      // 系数
      id.Items[i] = si;
      id.CAValue[i] = psi.CAValue;               // 2016-06-16金准
      id.CAParam[i] = psi.CAMethod*64+           // 2016-06-16金准
                      psi.CADecimal*16+          // 2016-06-16金准
                      psi.CAIndex;               // 2016-06-16金准
   }
   id.SampleVol  = item.SampleVol;               // 加样量
   id.ReagentVol = item.ReagentVol;              // 试剂量
   id.MixedVol   = item.MixedVol;                // 混合液量
   id.DeviceType = item.DeviceType;              // 设备类型
   id.ProductCode= item.ProductCode;             // 产品代码
   id.Year       = item.Year;                    // 年
   id.Month      = item.Month;                   // 月
   id.SerialNo   = item.SerialNo;                // 流水号
   id.ValidMonth = item.ValidMonth;              // 有效月数 2016-11-23
   s2Hex(item.Batch,4,id.Batch);                 // 批号
   id.Blank      = item.Blank;                   // 是否减本底
   id.Reversal   = item.Reversal;                // 反转
   id.ReversalBase = item.ReversalBase;          // 反转基准值
   for(int i=0; i<10; i++)                       // 拟合曲线
      id.Curves[i] = item.Curves[i];
}

void __fastcall ID2POCT(                         // ID数据转换成项目数据
                ID_ITEM id,
                POCT_ITEM &item)
{
   ID_SUBITEM   si;                              // 子项目结构体
   POCT_SUBITEM psi;                             //
   AnsiString s,s1;
   BYTE B;
   id.CompanyCode   = m_BCompanyCode;
   item.CompanyCode = id.CompanyCode;            // 公司代码
   item.CompanyName = Hex2s(id.CompanyName,20);  // 公司名称
   item.BarCode     = Hex2s(id.BarCode,13);      // 条码
   item.BatchPre    = Hex2s(id.BatchPre,16);     // 批号前缀
   item.ReportTitle = Hex2s(id.ReportTitle,16);  // 报告单标题
   item.AreaValid   = id.AreaValid;              // 区域启用
   item.Area        = Hex2s(id.Area,20);         // 区域名称
   item.PeakCount   = id.PeakCount % 16;         // 峰值数量
   item.BasePeak    = id.PeakCount / 16;         // 基准峰位置
   item.ItemCount   = id.ItemCount;              // 项目数量
   for(int i=0; i<item.PeakCount; i++)           // 峰值定义
      item.Peaks[i] = id.Peaks[i];
   item.CheckTime = id.CheckTime;                // 加样检测时间
   item.HatchTime = id.HatchTime;                // 孵育时间
   item.MinPosi   = id.MinPosi;                  // 未加样峰值位置
   item.MinCheck  = id.MinCheck;                 // 是否判断未加样
   item.MinValue  = id.MinValue;                 // 小临界值
   item.MaxPosi   = id.MaxPosi;                  // 冲顶峰值位置
   item.MaxCheck  = id.MaxCheck;                 // 是否判断冲顶
   item.MaxValue  = id.MaxValue;                 // 冲顶临界值
   for(int i=0; i<id.ItemCount; i++)             // 项目参数
   {
      si = id.Items[i];
      for(int j=0; j<5; j++)
      {
         psi.Name[j] = Hex2s(si.Name[j],16);     // 项目名称
         psi.Unit[j] = Hex2s(si.Unit[j],16);     // 计量单位
         psi.RangeMin[j] = si.RangeMin[j];       // 范围小值
         psi.RangeMax[j] = si.RangeMax[j];       // 范围大值
      }
      psi.RangeDec = si.RangeDec;                // 范围小数位数
      for(int j=0; j<3; j++)                     // 计算公式峰值位置
         psi.CalcPosi[j] = si.CalcPosi[j];
      psi.CalcMode     = si.CalcMode;            // 峰值计算方法
      for(int j=0; j<5; j++)                     // 样本类型对应曲线序号
         psi.CurveNos[j] = si.CurveNos[j];
      for(int j=0; j<9; j++)                     // 样本类型和温度补偿系数
         psi.Ratios[j] = si.Ratios[j];
      if(si.RatioDec>5) si.RatioDec = 5;         // 小数位0到5位
      psi.RatioDec     = si.RatioDec;            // 系数小数位数
      psi.TempComp     = si.TempControl / 128;   // 温度补偿启用
      psi.TempDec      = si.TempControl % 128;   // 温度补偿系数小数位
      if(psi.TempDec>5) psi.TempDec=5;
      psi.SubCheck    = si.SubCheck;             // 子项未加样检测时间(1卡多联)  2016-10-19
      psi.SubHatch    = si.SubHatch;             // 子项测试时间(1卡多联)        2016-10-19
      psi.SubMinValue = si.SubMinValue;          // 子项未加样判定值             2016-11-29
      psi.siChannel   = si.siChannel;            // 该子项目所在通道号(1卡多联)  2016-08-18
      for(int j=0; j<4; j++)
         psi.siPeaks[j] = si.siPeaks[j];         // 子项峰区间定义，最多4个峰    2016-08-18
      psi.LessThan     = si.LessThan;            // T值小于该值时乘以一下系数
      psi.LessThanRatio= si.LessThanRatio;       // 系数
      psi.CAValue      = id.CAValue[i];          // 2016-06-16金准
      B = id.CAParam[i];                         // 2016-06-16金准
      psi.CAMethod     = B/64;                   // 2016-06-16金准
      psi.CAIndex      = B%16;                   // 2016-06-16金准
      psi.CADecimal    = (B%64)/16;              // 2016-06-16金准
      item.SIs[i]      = psi;
   }
   for(int i=0; i<10; i++)                       // 拟合曲线
      item.Curves[i] = id.Curves[i];
   item.SampleVol  = id.SampleVol;               // 加样量
   item.ReagentVol = id.ReagentVol;              // 试剂量
   item.MixedVol   = id.MixedVol;                // 混合液量
   item.DeviceType = id.DeviceType;              // 设备类型
   item.ProductCode= id.ProductCode;             // 产品代码
   item.Year       = id.Year;                    // 年
   item.Month      = id.Month;                   // 月
   item.SerialNo   = id.SerialNo;                // 流水号
   item.ValidMonth = id.ValidMonth;              // 有效月数 2016-11-23
   item.Batch      = Hex2s(id.Batch,4);          // 批号
   item.Blank      = id.Blank;                   // 是否减本底
   item.Reversal   = id.Reversal;                // 反转
   item.ReversalBase = id.ReversalBase;          // 反转基准值
}

AnsiString ItemFullName(AnsiString asName)            // 全角名称
{
   AnsiString asRet,asC;
   AnsiString asDBC = "\\/:*?\"<>|";
   AnsiString asSBC = "＼／：×？”〈〉｜";
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

AnsiString ItemHalfName(AnsiString asName)       // 半角名称
{
   AnsiString asRet,asFName,asC;
   AnsiString asDBC = "\\/:*?\"<>|";
   AnsiString asSBC = "＼／：×？”〈〉｜";
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

bool __fastcall FileIsIDHex(AnsiString asName)   // 判断文件是不是ID卡HEX文件
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
        bret=false;  // 文件大小不对
   }
   else
   {
      f = fopen(asName.c_str(),"rb");
      memset(BHead,0,sizeof(BHead));
      fread(BHead,8,1,f);
      fclose(f);
      for(int i=0; i<8; i++)
         asHead[i+1] = BHead[i];
      bret   = (asHead==m_sFileHead);            // 文件头不对

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

bool __fastcall LoadIDHex(                       // 从HEX文件读取项目数据
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
            bret = (id.Version==CalcIDCRC(id))|| // 校验正确  2016-11-28
                   (id.Version==1);              // 老版本版本号为1,不是校验
            ID2POCT(id,item);
         }
      }
      fclose(f);
   }
   return bret;
}

void __fastcall SaveIDHex(                       // 保存项目参数到HEX文件
                POCT_ITEM item,                  // 项目参数
                AnsiString asName)               // 保存文件名
{
   ID_ITEM    id;                                // 保存的ID结构体
   POCT2ID(item,id);                             // 转换为HEX结构体
   s2Hex(m_sFileHead,8,id.FileHead);             // 文件头信息
   id.Version = CalcIDCRC(id);                   // 计算ID卡信息校验 2016-11-28
   FILE *f;
   f = fopen(asName.c_str(),"wb");
   fwrite(&id,4096,1,f);
   fclose(f);
}

AnsiString GetTCFormula(                         // 生成TC计算公式字符串
           int iP[],                             // 计算项序号数组
           int iPCnt,                            // 计算项个数
           int iMode)                            // 计算方式
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
   if(si.CAIndex==pno)                 // 峰值序号等于C线位置
   switch(si.CAMethod){
   case 1 : v1+=si.CAValue; break;     // +
   case 2 : v1*=si.CAValue; break;     // *
   }
   return v1;
}

float __fastcall CalcItemTC(
                 POCT_ITEM pi,                   // 项目参数
                 ID_PEAKRESULT pr,               // 峰值结果及位置
                 int iIndex)                     // 子项目序号
{
   float fTC = -1;
   POCT_SUBITEM  si;
   float x[3], xx,fBlank;
   int iP[3];
   si = pi.SIs[iIndex];
   for(int i=0; i<3; i++)                        // 参与计算的峰值
   {
      iP[i] = si.CalcPosi[i];                    // 参与计算的峰值序号
      x[i]  = CAdjust(pr.Value[iP[i]-1],iP[i]-1,si);
   }
   switch(si.CalcMode){                          // TC计算方法
   case 0 : if(x[0]<si.LessThan)                 // 极限检测
               x[0] = x[0]*si.LessThanRatio;
            pr.Value[si.CalcPosi[0]] = x[0];     // 第1参数值
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

