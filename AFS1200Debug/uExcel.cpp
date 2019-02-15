#pragma hdrstop

#include "uExcel.h"

#define max(a, b)  (((a) > (b)) ? (a) : (b))

#pragma package(smart_init)

FILE *f;
bool bSave = true;

void WriteU8(AnsiString s)
{
   UTF8String u8;
   u8 = UTF8Encode(s);
   fwrite(u8.c_str(),1,u8.Length(),f);
}

void CreateExcel(AnsiString sFileName)           // 创建EXCEL文件
{
   if( (!bSave)&&(f!=NULL)) fclose(f);
   if(FileExists(sFileName))
      DeleteFile(sFileName);                     // 文件存在，先删除
   f = fopen(sFileName.c_str(),"wt");            // 新建文件
   AnsiString sHead[63]={
              "<?xml version=\"1.0\"?>",
              "<?mso-application progid=\"Excel.Sheet\"?>",
              "<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"",
              " xmlns:o=\"urn:schemas-microsoft-com:office:office\"",
              " xmlns:x=\"urn:schemas-microsoft-com:office:excel\"",
              " xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"",
              " xmlns:html=\"http://www.w3.org/TR/REC-html40\">",
              " <DocumentProperties xmlns=\"urn:schemas-microsoft-com:office:office\">",
              "  <Author>www.Thergane.com</Author>",
              "  <LastAuthor>LaborTech</LastAuthor>",
              "  <Created>2015-05-11T07:57:02Z</Created>",
              "  <Version>11.9999</Version>",
              " </DocumentProperties>",
              " <ExcelWorkbook xmlns=\"urn:schemas-microsoft-com:office:excel\">",
              "  <WindowHeight>10005</WindowHeight>",
              "  <WindowWidth>10005</WindowWidth>",
              "  <WindowTopX>120</WindowTopX>",
              "  <WindowTopY>135</WindowTopY>",
              "  <ProtectStructure>False</ProtectStructure>",
              "  <ProtectWindows>False</ProtectWindows>",
              " </ExcelWorkbook>",
              " <Styles>",
              "  <Style ss:ID=\"Default\" ss:Name=\"Normal\">",
              "   <Alignment ss:Vertical=\"Bottom\"/>",
              "   <Borders/><Font x:Family=\"Swiss\"/>",
              "   <Interior/><NumberFormat/><Protection/>",
              "  </Style>",
              "  <Style ss:ID=\"s20\">",
              "   <Alignment ss:Horizontal=\"Center\" ss:Vertical=\"Center\"/>",
              "   <Font ss:FontName=\"Arial\" x:CharSet=\"134\" ss:Size=\"12\" ss:Bold=\"1\"/>",
              "  </Style>",
              "  <Style ss:ID=\"s21\">",
              "   <Alignment ss:Horizontal=\"Left\" ss:Vertical=\"Center\"/>",
              "   <Borders>",
              "    <Border ss:Position=\"Bottom\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Left\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Right\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Top\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "   </Borders>",
              "   <Font ss:FontName=\"Arial\" x:CharSet=\"134\" ss:Size=\"10\"/>",
              "  </Style>",
              "  <Style ss:ID=\"s22\">",
              "   <Alignment ss:Horizontal=\"Left\" ss:Vertical=\"Center\"/>",
              "   <Borders>",
              "    <Border ss:Position=\"Bottom\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Left\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Right\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Top\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "   </Borders>",
              "   <Font ss:FontName=\"Arial\" x:CharSet=\"134\" ss:Size=\"10\" ss:Bold=\"1\"/>",
              "  </Style>",
              "  <Style ss:ID=\"s23\">",
              "   <Alignment ss:Vertical=\"Center\"/>",
              "   <Borders>",
              "    <Border ss:Position=\"Bottom\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Left\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Right\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "    <Border ss:Position=\"Top\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>",
              "   </Borders>",
              "   <Font ss:FontName=\"Arial\" x:CharSet=\"134\" ss:Size=\"10\"/>",
              "   <NumberFormat ss:Format=\"@\"/>",
              "  </Style>",
              " </Styles>"};
   for(int i=0; i<63; i++)
      WriteU8(sHead[i] + "\n");
   bSave = false;
}

void CloseExcel()                                // 关闭创建的EXCEL
{
   if( bSave || (f==NULL)) return ;               // 已保存或者未创建
   WriteU8("</Workbook>\n");                     // 写文件结尾
   fclose(f);                                    // 关闭文件
   bSave = true;
}

void BookStart(AnsiString sBookName)
{
   AnsiString s,s1,s2,s3;
   int iCol,iRow;
   s.printf(" <Worksheet ss:Name=\"%s\">\n",sBookName);
   WriteU8(s);
   s1.printf("  <Table ss:ExpandedColumnCount=\"%d\"",iCol);
   s1.printf("  <Table ");
   s2 = "";//s2.printf(" ss:ExpandedRowCount=\"%d\"",iRow+3);
   s3 = " x:FullColumns=\"1\" x:FullRows=\"1\">\n";
   s = s1 + s2 + s3;
   WriteU8(s);
}

void BookEnd()
{
   AnsiString sEnd[19]={
              "  <WorksheetOptions xmlns=\"urn:schemas-microsoft-com:office:excel\">",
              "   <Print>",
              "    <ValidPrinterInfo/><PaperSizeIndex>9</PaperSizeIndex>",
              "    <HorizontalResolution>600</HorizontalResolution>",
              "    <VerticalResolution>600</VerticalResolution>",
              "   </Print>",
              "   <Selected/>",
              "   <Panes>",
              "    <Pane>",
              "     <Number>3</Number><ActiveRow>3</ActiveRow><ActiveCol>0</ActiveCol>",
              "    </Pane>",
              "   </Panes>",
              "   <ProtectObjects>False</ProtectObjects>",
              "   <ProtectScenarios>False</ProtectScenarios>",
              "  </WorksheetOptions>",
              " </Worksheet>",
              " <x:WorksheetOptions>",
              "   <x:Selected/>",
              "  </x:WorksheetOptions>"};
   WriteU8("  </Table>\n");
   for(int i=0; i<19; i++)
      WriteU8(sEnd[i] + "\n");
}

void NewMergeRow(AnsiString sTitle,
                 int iCols,
                 int iStyle)                     // 新建一行合并栏
{
   AnsiString ss,s1,s2,s3;
   ss = "   <Row ss:AutoFitHeight=\"0\" ss:Height=\"32\">\n";
   WriteU8(ss);
   s1.printf("    <Cell ss:MergeAcross=\"%d\" ",iCols-1);
   switch(iStyle){
   case 1 : s2.printf("ss:StyleID=\"s20\"><Data ss:Type=\"String\">%s</Data></Cell>\n",sTitle); break;
   case 2 : s2.printf("ss:StyleID=\"s22\"><Data ss:Type=\"String\">%s</Data></Cell>\n",sTitle); break;
   case 3 : s2.printf("ss:StyleID=\"s23\"><Data ss:Type=\"String\">%s</Data></Cell>\n",sTitle); break;
   }
   ss = s1 + s2;
   WriteU8(ss);
   WriteU8("   </Row>\n");
}

void NewTitleRow(TStringList *slColTitle)        // 列标题
{
   int i,j,iCols,iRows,iW[1024];
   AnsiString asTemp, asFld, ss,s1,s2;
   AnsiString sRowEnd   = "   </Row>";
   AnsiString sFldBegin = "   <Row ss:AutoFitHeight=\"0\" ss:Height=\"18.75\">";
   AnsiString sFld      = "    <Cell ss:StyleID=\"s22\"><Data ss:Type=\"String\">%s</Data></Cell>";
   TStrings *sl;
   sl = new TStringList;
   iCols = slColTitle->Count;                    // 字段列数
   sl->Append(sFldBegin);                        // 字段标题开始
   for(i=0; i<iCols; i++)                        // 计算每个标题的宽度
   {
      asTemp = slColTitle->Strings[i];           // 标题内容
      iW[i] = asTemp.Length();                   // 标题宽度
      ss.printf(sFld.c_str(),asTemp);            //
      sl->Append(ss);                            // 字段标题内容
   }
   sl->Append(sRowEnd);                          // 字段标题结束
}

void RowBegin()
{
   AnsiString sRowBegin = "   <Row ss:AutoFitHeight=\"0\" ss:Height=\"15\">\n";
   WriteU8(sRowBegin);
}

void RowCell(AnsiString s,int iStyle)
{
   AnsiString sCell1 = "    <Cell ss:StyleID=\"s22\"><Data ss:Type=\"String\">%s</Data></Cell>\n";
   AnsiString sCell2 = "    <Cell ss:StyleID=\"s23\"><Data ss:Type=\"String\">%s</Data></Cell>\n";
   AnsiString ss,s1;
   s1 = s;
   if(s1.IsEmpty()) s1 = " ";
   switch(iStyle){
   case 2 : ss.printf(sCell1.c_str(),s1); break;
   case 3 : ss.printf(sCell2.c_str(),s1); break;
   }
   WriteU8(ss);
}

void RowEnd()
{
   AnsiString sRowEnd   = "   </Row>\n";
   WriteU8(sRowEnd);
}

