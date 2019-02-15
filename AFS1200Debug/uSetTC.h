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
   int iSubItem;             // ��ǰ���õ�����Ŀ���
   int iPeakCnt;             // �����
   AnsiString asPosi[3];     // TC���㹫ʽ�����ڷ�ֵλ��
   AnsiString asTCFormula;   // TC���㹫ʽ
   int iCalcMode;            // TC���㷽ʽ
};
//---------------------------------------------------------------------------
extern PACKAGE TfrmSetTC *frmSetTC;
//---------------------------------------------------------------------------
#endif
