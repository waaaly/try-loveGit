//---------------------------------------------------------------------------

#ifndef uSetTCH
#define uSetTCH
//---------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
//---------------------------------------------------------------------------
class TfrmSetTC : public TForm
{
__published:	// IDE-managed Components
   TLabel *Label9;
   TLabel *Label8;
   TLabel *Label7;
   TLabel *Label6;
   TComboBox *c4;
   TComboBox *c3;
   TComboBox *c2;
   TComboBox *c1;
   TButton *btnOk;
   TButton *btnCancel;
   TButton *btnClear;
   void __fastcall FormShow(TObject *Sender);
   void __fastcall c1Change(TObject *Sender);
   void __fastcall btnOkClick(TObject *Sender);
   void __fastcall btnCancelClick(TObject *Sender);
   void __fastcall btnClearClick(TObject *Sender);
private:	// User declarations
public:		// User declarations
   __fastcall TfrmSetTC(TComponent* Owner);
   int iSubItem;             // 当前设置的子项目序号
   int iPeakCnt;             // 峰个数
   AnsiString asPosi[3];     // TC计算公式项所在峰值位置
   AnsiString asTCFormula;   // TC计算公式
   int iCalcMode;            // TC计算方式
};
//---------------------------------------------------------------------------
extern PACKAGE TfrmSetTC *frmSetTC;
//---------------------------------------------------------------------------
#endif
