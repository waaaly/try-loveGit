#include <process.h>
#include <vcl.h>
#pragma hdrstop

#include <math.h>

#include "uDebugMain.h"
#include "uParams.h"
#include "uMaintain.h"
#include "uUart.h"
#include "uIDCardDef.h"
#include "uTypeConvert.h"

#pragma package(smart_init)
#pragma link "CornerButton"
#pragma link "AACtrls"
#pragma link "AAFont"
#pragma link "FillPanel"
#pragma resource "*.dfm"
TfrmMain *frmMain;

bool bQuit = false;

__fastcall TfrmMain::TfrmMain(TComponent* Owner) : TForm(Owner)
{
}

void CheckDir(AnsiString s)
{
   if(!DirectoryExists(s)) CreateDir(s);
}

AnsiString __fastcall GetFileVer(AnsiString FileName)
{
   //���Ȼ�ð汾��Ϣ��Դ�ĳ���
   DWORD dwHandle,InfoSize;
   InfoSize = GetFileVersionInfoSize(FileName.c_str(),&dwHandle);
   //���汾��Ϣ��Դ���뻺����
   char *InfoBuf = new char[InfoSize];
   GetFileVersionInfo(FileName.c_str(),0,InfoSize,InfoBuf);
   //��������ļ�ʹ�õĴ���ҳ���ַ�����Ϣ
   char *pInfoVal;
   unsigned int dwInfoValSize;
   VerQueryValue(InfoBuf,"\\VarFileInfo\\Translation",&((void *)pInfoVal), &dwInfoValSize);
   AnsiString V;
   V = "\\StringFileInfo\\";
   V = V + IntToHex(*((unsigned short int *)pInfoVal),4) +
       IntToHex(*((unsigned short int *) &pInfoVal[2]),4)
       + "\\FileVersion";
   //��þ���İ汾��
   VerQueryValue(InfoBuf, V.c_str(),&((void *)pInfoVal),&dwInfoValSize);
   AnsiString asVer,asDT;
   asVer = AnsiString(pInfoVal).SetLength(dwInfoValSize-1);
   delete InfoBuf;
   FILE *f;
   int iF,iDT;
   TDateTime dt;
   WORD iY,iM,iD,iH,iMs,iS,iMS;
   iF  = FileOpen(FileName,fmOpenRead);
   if(iF>=0)
   {
      iDT = FileGetDate(iF);
      dt  = FileDateToDateTime(iDT);
      FileClose(iF);
   } else dt = Now();
   DecodeDate(dt,iY,iM,iD);
   DecodeTime(dt,iH,iMs,iS,iMS);
   asDT.printf(" (Build %d.%d.%d.%02d%02d)",
      iY%100,iM,iD,iH,iMs);
//   return "Version " + asVer + asDT; //build ʱ��17-03-14
  return "Version V1.0.0.1(Build 17.03.14.1633)";
}

void __fastcall TfrmMain::FormCreate(TObject *Sender)
{
   m_sWorkDir   = GetCurrentDir();               // ����·��
   m_sConfig    = m_sWorkDir + "\\config.ini";   // �����ļ���
   LoadComParam();
   m_bTAdmin = true;
}

void __fastcall TfrmMain::FormShow(TObject *Sender)
{
   AnsiString asLogo;
   leComName->Text     = m_sDevCom;              // ͨѶ�˿�
   frmUart->OpenDevice();
   FormResize(this);
   frmMaintain->m_bMAdmin   = true;
   frmMaintain->WindowState = wsMaximized;
   frmMaintain->Show();

   AnsiString asVersion;
   asVersion    = Application->ExeName;

   asVersion    = GetFileVer(asVersion);
   version->Caption = asVersion;               // �汾��
}

void __fastcall TfrmMain::Timer1Timer(TObject *Sender)
{
   pDT->Caption = Now().FormatString("YYYY-MM-DD HH:MM:SS");
   if(frmUart->XComm1->Opened) pComOk->BringToFront();
   else pComOk->SendToBack();
}

void __fastcall TfrmMain::FormClose(TObject *Sender, TCloseAction &Action)
{
   m_bQuit = true;
}

void __fastcall TfrmMain::bSaveClick(TObject *Sender)
{
   m_sDevCom = leComName->Text.Trim();
   SaveComParam();
}

void __fastcall TfrmMain::cbQuitClick(TObject *Sender)
{
   Close();
}

void __fastcall TfrmMain::FormResize(TObject *Sender)
{
   cbQuit->Top  = (fpTop->Height - cbQuit->Height)/2;
   cbQuit->Left = fpTop->Width - cbQuit->Width - cbQuit->Top;
}

