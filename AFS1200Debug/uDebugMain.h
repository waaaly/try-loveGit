

#ifndef uDebugMainH
#define uDebugMainH

#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ExtCtrls.hpp>
#include <Buttons.hpp>
#include <Graphics.hpp>
#include "AACtrls.hpp"
#include "AAFont.hpp"
#include "CornerButton.h"
#include "FillPanel.h"

class TfrmMain : public TForm
{
__published:	// IDE-managed Components
        TTimer *Timer1;
        TFillPanel *fpTop;
        TAALabel *aalDevName;
        TPanel *pStatus;
        TPanel *pDT;
        TPanel *pCom;
        TPanel *pComErr;
        TPanel *pComOk;
        TPanel *pCompany;
        TAALabel *aalCopy;
        TImage *imgLogo;
        TLabeledEdit *leComName;
        TButton *bSave;
        TCornerButton *cbQuit;
        TAALabel *version;
        void __fastcall FormCreate(TObject *Sender);
        void __fastcall FormShow(TObject *Sender);
        void __fastcall Timer1Timer(TObject *Sender);
        void __fastcall FormClose(TObject *Sender, TCloseAction &Action);
        void __fastcall bSaveClick(TObject *Sender);
        void __fastcall cbQuitClick(TObject *Sender);
        void __fastcall FormResize(TObject *Sender);
private:	// User declarations
        bool bChiangpiong;
public:		// User declarations
        __fastcall TfrmMain(TComponent* Owner);
};

extern PACKAGE TfrmMain *frmMain;

#endif
