#include <vcl.h>
#pragma hdrstop

#include "uSetTC.h"
#include "uTypeConvert.h"

#pragma package(smart_init)
#pragma resource "*.dfm"
TfrmSetTC *frmSetTC;

__fastcall TfrmSetTC::TfrmSetTC(TComponent* Owner)
   : TForm(Owner)
{
}

void __fastcall TfrmSetTC::FormShow(TObject *Sender)
{
   AnsiString s;
   s.printf("第%d子项TC计算公式",iSubItem);
   Caption = s;
   c1->Items->Clear();
   for(int i=0; i<iPeakCnt; i++)                 // P1可选列表
      c1->Items->Append("X" + IntToStr(i+1));
   c2->Items->Text = c1->Items->Text;
   c3->Items->Text = c1->Items->Text;
   c1->ItemIndex = c1->Items->IndexOf(asPosi[0].UpperCase());
   c2->ItemIndex = c2->Items->IndexOf(asPosi[1].UpperCase());
   c3->ItemIndex = c3->Items->IndexOf(asPosi[2].UpperCase());
   RefreshTCFormula(c1,c2,c3,c4);
   c4->ItemIndex = iCalcMode;
}

void __fastcall TfrmSetTC::c1Change(TObject *Sender)
{
   RefreshTCFormula(c1,c2,c3,c4);
}

void __fastcall TfrmSetTC::btnOkClick(TObject *Sender)
{
   asPosi[0]   = c1->Items->Strings[c1->ItemIndex];
   asPosi[1]   = c1->Items->Strings[c2->ItemIndex];
   asPosi[2]   = c1->Items->Strings[c3->ItemIndex];
   asTCFormula = c4->Items->Strings[c4->ItemIndex];
   ModalResult = mrOk;
}

void __fastcall TfrmSetTC::btnCancelClick(TObject *Sender)
{
   ModalResult = mrCancel;
}

void __fastcall TfrmSetTC::btnClearClick(TObject *Sender)
{
   asPosi[0]   = "";
   asPosi[1]   = "";
   asPosi[2]   = "";
   asTCFormula = "";
   ModalResult = mrOk;
}

