//---------------------------------------------------------------------------

#include <vcl.h>
#include "loadLib.h"
#pragma hdrstop
//---------------------------------------------------------------------------
USEFORM("uDebugMain.cpp", frmMain);
USEFORM("uMaintain.cpp", frmMaintain);
USEFORM("uUart.cpp", frmUart);
USEFORM("uCaptions.cpp", frmCaptions);
USEFORM("uSetTC.cpp", frmSetTC);
//---------------------------------------------------------------------------
WINAPI WinMain(HINSTANCE, HINSTANCE, LPSTR, int)
{
        try
        {
                 LB_AlgoLoadLibrary();

                 Application->Initialize();
                 Application->Title = "";
                 Application->CreateForm(__classid(TfrmMain), &frmMain);
                 Application->CreateForm(__classid(TfrmCaptions), &frmCaptions);
                 Application->CreateForm(__classid(TfrmUart), &frmUart);
                 Application->CreateForm(__classid(TfrmMaintain), &frmMaintain);
                 Application->CreateForm(__classid(TfrmSetTC), &frmSetTC);
                 Application->Run();
        }
        catch (Exception &exception)
        {
                 Application->ShowException(&exception);
        }
        catch (...)
        {
                 try
                 {
                         throw Exception("");
                 }
                 catch (Exception &exception)
                 {
                         Application->ShowException(&exception);
                 }
        }
        return 0;
}
//---------------------------------------------------------------------------
