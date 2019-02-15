#ifndef uCaptionsH
#define uCaptionsH

#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ExtCtrls.hpp>
#include <Graphics.hpp>

class TfrmCaptions : public TForm
{
__published:	// IDE-managed Components
        TMemo *mCaptions;
        TMemo *mAreas;
        TImage *imgF0;
        TImage *imgF2;
        TImage *imgF4;
        TImage *imgF5;
        TImage *imgF6;
        TImage *imgF12;
        TImage *imgF13;
        TImage *imgF14;
        TImage *imgF15;
        TImage *imgF16;
        TImage *imgF9;
        TImage *imgF7;
        void __fastcall FormCreate(TObject *Sender);
private:	// User declarations
public:		// User declarations
        __fastcall TfrmCaptions(TComponent* Owner);
        AnsiString Captions(int iIndex);
};

extern PACKAGE TfrmCaptions *frmCaptions;


AnsiString GetCaption(int iIndex);
void __fastcall SaveArea(void);

AnsiString PN2X(BYTE pn);

AnsiString __fastcall GetStdSelect(              // 读取标准品选择序列
           AnsiString asTNo,                     // 实验编号
           int iINo);                            // 曲线序号
void __fastcall SaveStdSelect(                   // 保存标准品选择序列
                AnsiString asTNo,                // 实验编号
                int iINo,                        // 曲线序号
                AnsiString asSelect);            // 标准品选择序列
void __fastcall DeleteStdSelect(                 // 删除实验对应的标准品选择序列
                AnsiString asTNo);
void __fastcall LoadMethod(TComboBox *cb);

void __fastcall SaveTestDesc(AnsiString asTest,AnsiString asDesc);
AnsiString __fastcall ReadTestDesc(AnsiString asTest);
void __fastcall DeleteTestDesc(AnsiString asTest);

AnsiString GetFileDT(AnsiString asFileName);

void __fastcall SetPeakCalc(TComboBox *cbCalc,BYTE BCalc);
BYTE __fastcall GetPeakCalc(TComboBox *cbCalc);

#endif
