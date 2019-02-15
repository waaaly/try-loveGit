//---------------------------------------------------------------------------


#pragma hdrstop
#include <stdio.h>
#include "debug.h"

//---------------------------------------------------------------------------

#pragma package(smart_init)

#ifdef DEBUG

static debug_dri debug_dev;

void debug(const AnsiString &msg)
{
    debug_dev.out(msg);
}
void debug(int d)
{
    AnsiString tmp;
    tmp.printf("%d", d);
    debug(tmp);
}

debug_dri::debug_dri()
{
    fs_out = fopen(OUT_FILE, "w");
}

debug_dri::~debug_dri()
{
    if (fs_out)
    {
        fclose(fs_out);
        system("del " OUT_FILE);
    }
}
void debug_dri::out(const AnsiString &msg)
{
     if (fs_out)
     {
         fprintf(fs_out, "%s\n", msg.c_str());
         fflush(fs_out);
     }
}

#endif // DEBUG
