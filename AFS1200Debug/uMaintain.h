#ifndef uMaintainH

#define uMaintainH

#include <Classes.hpp>
#include <ComCtrls.hpp>
#include <Controls.hpp>
#include <ExtCtrls.hpp>
#include <StdCtrls.hpp>
#include <Grids.hpp>
#include "ErrorPanel.h"
#include "RespChart.h"
#include "FillStringGrid.h"
#include "FillPanel.h"
#include "CornerPanel.h"
#include "CornerButton.h"
#include <Dialogs.hpp>
#include "CalcSDCV.h"
#include "SizePanel.h"
#include "PTitle.h"

class TfrmMaintain : public TForm
{
__published:	// IDE-managed Components
        TTimer *Timer1;
        TOpenDialog *odt;
        TCalcSDCV *CalcSDCV1;
        TSaveDialog *sdt;
        TPageControl *pc;
        TTabSheet *TabSheet1;
        TPanel *p0262;
        TPanel *Panel1;
        TPanel *Panel13;
        TCheckBox *cbMsg;
        TMemo *m;
        TTabSheet *TabSheet6;
        TPanel *Panel4;
        TPanel *Panel6;
        TPanel *Panel7;
        TLabeledEdit *letStart;
        TLabeledEdit *letEnd;
        TLabeledEdit *letCnt;
        TLabeledEdit *letbc1;
        TLabeledEdit *letbc2;
        TLabeledEdit *letbc3;
        TButton *cbBCClear;
        TButton *cbBCTest;
        TButton *Button12;
        TButton *Button13;
        TButton *Button14;
        TButton *Button15;
        TEdit *Edit1;
        TLabeledEdit *leCnt;
        TLabeledEdit *lefname;
        TButton *Button1;
        TButton *Button2;
        TButton *Button3;
        TRespChart *rcBC;
        TTabSheet *TabSheet5;
        TPanel *p3;
        TPanel *p31;
        TRespChart *rc;
        TPanel *p33;
   TPanel *p4;
   TPanel *p42;
        TFillStringGrid *fsgPeak;
   TPanel *p421;
        TLabel *Label3;
        TComboBox *cbNum;
        TButton *btnSavePeak;
   TPanel *p41;
        TLabel *Label4;
        TLabel *Label1;
        TButton *cbtAdd;
        TButton *cbThrow;
        TButton *cbtStop;
        TComboBox *cbCount;
        TButton *cbtTest;
        TComboBox *cbDelay;
   TPanel *p44;
        TPanel *pQuit;
        TCornerButton *cbClose;
        TCornerButton *cbOpen;
        TErrorPanel *ep;
        TFillStringGrid *sgCV;
        TFillStringGrid *sgCalc;
        TFillStringGrid *sgTest;
        TLabel *Label6;
        TComboBox *cbBP;
        TPanel *pDev;
        TLabeledEdit *le51;
        TLabeledEdit *le53;
        TLabeledEdit *le55;
        TButton *cb51;
        TButton *cb52;
        TLabeledEdit *le52;
        TLabel *Label8;
        TComboBox *cbType;
        TButton *Button25;
        TPanel *Panel3;
        TLabeledEdit *let60;
        TButton *cb601;
        TButton *cb602;
        TLabeledEdit *let70;
        TButton *cb6101;
        TButton *Button6;
        TButton *cb6121;
        TButton *Button10;
        TCheckBox *cb72;
        TLabeledEdit *let73;
        TButton *cb6131;
        TButton *Button17;
        TLabeledEdit *let74;
        TButton *cb6141;
        TButton *Button19;
        TLabeledEdit *let75;
        TLabeledEdit *let76;
        TButton *cb6161;
        TButton *cb6151;
        TButton *Button22;
        TButton *Button23;
        TPanel *Panel12;
        TPanel *Panel15;
        TPanel *Panel2;
        TButton *cb43;
        TButton *cb44;
        TButton *Button4;
        TButton *Button24;
        TPanel *pID;
        TPanel *pCard;
        TPanel *Panel16;
        TPanel *Panel17;
        TLabel *Label5;
        TComboBox *cb71;
        TButton *cb6111;
        TButton *Button8;
        TButton *Button7;
        TPanel *Panel18;
        TFillStringGrid *sgBC;
        TButton *btnAuto;
        TLabeledEdit *leBC;
        TFillStringGrid *fsgPPos;
   TPanel *p441;
        TCheckBox *cbRevers;
        TLabeledEdit *leCount;
        TLabel *Label10;
        TComboBox *cbCards;
        TLabel *Label11;
        TComboBox *cbCardDelay;
        TButton *Button26;
        TButton *btnSaveParam;
        TButton *Button16;
   TPanel *Panel21;
   TPanel *Panel22;
   TButton *cbtNew;
   TButton *cbtOpen;
   TButton *cbtSave;
   TButton *cbtTxt;
   TButton *btnPaste;
   TPanel *pFile;
   TEdit *letFile;
   TLabel *Label2;
   TComboBox *cbPeakStyle;
   TPanel *p43;
   TButton *btnDel;
   TButton *cbtCalc;
   TPanel *p431;
   TButton *btnSaveTC;
   TFillStringGrid *fsgTC;
   TPanel *Panel5;
   TMemo *mBC;
        TPanel *Panel8;
        TLabeledEdit *LabeledEdit2;
        TLabeledEdit *LabeledEdit3;
        TLabeledEdit *LabeledEdit5;
        TButton *Button28;
        TButton *Button29;
        TButton *Button30;
        TButton *Button31;
        TButton *Button32;
        TButton *Button34;
        TButton *Button35;
        TPanel *Panel9;
        TButton *Button37;
        TLabeledEdit *LabeledEdit1;
        TTabSheet *TabSheet2;
        TButton *Button20;
        TRespChart *RespChart1;
        TButton *Button21;
        TLabeledEdit *LabeledEdit4;
        TPanel *Panel11;
        TButton *Button27;
        TLabeledEdit *LabeledEdit6;
//        TLabeledEdit *leTMin;
//        TLabeledEdit *leTMax;
//        TButton *Button33;
//        TButton *Button36;
//        TEdit *leTNow;
//        TButton *Button38;
        TPanel *Panel19;
        TPanel *Panel10;
        TLabeledEdit *let61;
        TLabeledEdit *let63;
        TLabeledEdit *let62;
        TLabeledEdit *let64;
        TLabeledEdit *let65;
        TLabeledEdit *let66;
        TLabeledEdit *let67;
        TLabeledEdit *let68;
        TButton *cb681;
        TButton *cb682;
        TButton *cb671;
        TButton *cb672;
        TButton *cb661;
        TButton *cb662;
        TButton *cb621;
        TButton *cb622;
        TButton *cb631;
        TButton *cb632;
        TButton *cb642;
        TButton *cb652;
        TButton *cb651;
        TButton *cb641;
        TButton *cb611;
        TButton *cb612;
        TLabeledEdit *let69;
        TButton *cb691;
        TButton *cb692;
        TPanel *Panel14;
        TPanel *pCard1;
        TCheckBox *CheckBox1;
        TButton *Button5;
        TButton *Button9;
        TLabeledEdit *LabeledEdit7;
        TLabeledEdit *LabeledEdit8;
        TButton *Button18;
        TButton *Button39;
        TTimer *Timer2;
        TCheckBox *cbAutoThrow;
        void __fastcall FormShow(TObject *Sender);
        void __fastcall Timer1Timer(TObject *Sender);
        void __fastcall FormCreate(TObject *Sender);
        void __fastcall cb51Click(TObject *Sender);
        void __fastcall cbtAddClick(TObject *Sender);
        void __fastcall sgTestClick(TObject *Sender);
        void __fastcall cbtOpenClick(TObject *Sender);
        void __fastcall cbtSaveClick(TObject *Sender);
        void __fastcall cbtNewClick(TObject *Sender);
        void __fastcall mDblClick(TObject *Sender);
        void __fastcall cbtCalcClick(TObject *Sender);
        void __fastcall cbBCClearClick(TObject *Sender);
        void __fastcall cbBCTestClick(TObject *Sender);
        void __fastcall cbCloseClick(TObject *Sender);
        void __fastcall cbOpenClick(TObject *Sender);
        void __fastcall cbMsgClick(TObject *Sender);
        void __fastcall Button1Click(TObject *Sender);
        void __fastcall Button2Click(TObject *Sender);
        void __fastcall sgBCClick(TObject *Sender);
        void __fastcall Button3Click(TObject *Sender);
        void __fastcall FormResize(TObject *Sender);
        void __fastcall FormClose(TObject *Sender, TCloseAction &Action);
        void __fastcall cbtStopClick(TObject *Sender);
        void __fastcall cbNumClick(TObject *Sender);
        void __fastcall fsgPeakSetEditText(TObject *Sender, int ACol,
          int ARow, const AnsiString Value);
        void __fastcall btnSavePeakClick(TObject *Sender);
        void __fastcall cbtTxtClick(TObject *Sender);
        void __fastcall rcDblClick(TObject *Sender);
        void __fastcall btnDelClick(TObject *Sender);
        void __fastcall cbPeakStyleClick(TObject *Sender);
        void __fastcall btnSaveTCClick(TObject *Sender);
        void __fastcall Button25Click(TObject *Sender);
        void __fastcall Button26Click(TObject *Sender);
        void __fastcall btnAutoClick(TObject *Sender);
        void __fastcall Timer2Timer(TObject *Sender);
        void __fastcall p41DblClick(TObject *Sender);
        void __fastcall fsgPPosClick(TObject *Sender);
        void __fastcall fsgPeakDblClick(TObject *Sender);
        void __fastcall fsgPeakMouseMove(TObject *Sender,
          TShiftState Shift, int X, int Y);
        void __fastcall cbReversClick(TObject *Sender);
        void __fastcall btnPasteClick(TObject *Sender);
        void __fastcall btnSaveParamClick(TObject *Sender);
        void __fastcall Button16Click(TObject *Sender);
   void __fastcall fsgTCDblClick(TObject *Sender);
   void __fastcall fsgTCMouseUp(TObject *Sender, TMouseButton Button,
          TShiftState Shift, int X, int Y);
   void __fastcall fsgTCKeyUp(TObject *Sender, WORD &Key,
          TShiftState Shift);
   void __fastcall p441DblClick(TObject *Sender);
   void __fastcall FormPaint(TObject *Sender);
        void __fastcall Button21Click(TObject *Sender);
        void __fastcall Button20Click(TObject *Sender);
        void __fastcall btn1Click(TObject *Sender);
        void __fastcall btn2Click(TObject *Sender);
        void __fastcall epClick(TObject *Sender);


private:	// User declarations
        TLabeledEdit *lePR3[3],*lePR4[4];
        BYTE BPeakCount;                            // ·åÖµ¸öÊý
        bool bTesting;
        void SetError(AnsiString asErr);
        void __fastcall ShowPeakTC(void);
        void __fastcall CalcSingleData(DWORD *dw,int iIndex);
        void __fastcall CalcCVs(void);
        void __fastcall GetPeakTC(void);
        void __fastcall SetEnable(TPanel *p,bool b);
        void __fastcall DisplayBWidth(WORD buf[],int iCnt);
        void __fastcall WaitDelay(int iDelay);
public:		// User declarations
        __fastcall TfrmMaintain(TComponent* Owner);
        bool m_bMAdmin;
};
//---------------------------------------------------------------------------
extern PACKAGE TfrmMaintain *frmMaintain;
//---------------------------------------------------------------------------
#endif
