//---------------------------------------------------------------------------

#ifndef DEBUG_H
#define DEBUG_H
#ifdef DEBUG

#include <vcl.h>
#include <stdio.h>

void debug(const AnsiString &msg);
void debug(int d);

#define OUT_FILE "output.log"


class debug_dri
{
public:
        debug_dri();
        ~debug_dri();

        void out(const AnsiString &msg);

private:
        FILE *fs_out;

};

#else // DEBUG

#define   debug(a) 0

#endif // DEBUG

//---------------------------------------------------------------------------
#endif // DEBUG_H
