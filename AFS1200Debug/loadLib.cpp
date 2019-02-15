#include <vcl.h>
#include <process.h>
#include "loadLib.h"


HANDLE m_hDLL_;                         // ��������򿪵Ķ�̬����

calcPeak    call_calcPeak;
multiFit    call_multiFit ;
calcConc    call_calcConc ;
calcys      call_calcys ;

void LB_AlgoLoadLibrary(void) throw ()
{
    m_hDLL_           = LoadLibrary("Alg_2000.dll");   //�򿪶�̬��
    //ȡ�ú�����ַ
    call_calcPeak    = (calcPeak)   GetProcAddress(m_hDLL_,"CalcPeak");
    call_multiFit    = (multiFit)   GetProcAddress(m_hDLL_,"MultiFit");
    call_calcConc    = (calcConc)   GetProcAddress(m_hDLL_,"CalcConc");
    call_calcys      = (calcys)     GetProcAddress(m_hDLL_,"Calcys");


    if (!(call_calcPeak && call_multiFit && call_calcConc && call_calcys))
        throw -1;
}


