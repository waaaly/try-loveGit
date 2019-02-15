
#ifndef uExcelH
#define uExcelH

#include <basepch.h>
#include <stdio.h>

extern void CreateExcel(AnsiString sFileName);   // 创建EXCEL文件
extern void BookStart(AnsiString sBookName);     // book名称
extern void BookEnd();
extern void CloseExcel();                        // 关闭创建的EXCEL

extern void RowBegin();
extern void RowCell(AnsiString s,int iStyle);
extern void RowEnd();

extern void NewTitleRow(TStringList *slColTitle);       // 列标题

extern void NewMergeRow(AnsiString sTitle,
                 int iCols,
                 int iStyle);                    // 新建一行合并栏


#endif
