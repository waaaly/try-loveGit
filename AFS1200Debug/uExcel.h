
#ifndef uExcelH
#define uExcelH

#include <basepch.h>
#include <stdio.h>

extern void CreateExcel(AnsiString sFileName);   // ����EXCEL�ļ�
extern void BookStart(AnsiString sBookName);     // book����
extern void BookEnd();
extern void CloseExcel();                        // �رմ�����EXCEL

extern void RowBegin();
extern void RowCell(AnsiString s,int iStyle);
extern void RowEnd();

extern void NewTitleRow(TStringList *slColTitle);       // �б���

extern void NewMergeRow(AnsiString sTitle,
                 int iCols,
                 int iStyle);                    // �½�һ�кϲ���


#endif
