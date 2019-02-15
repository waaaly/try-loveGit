#ifndef loadLibH
#define loadLibH

#include "struct.h"
#include "windows.h"

void LB_AlgoLoadLibrary(void) throw() ;

// ����Ҫ����ĺ�������
typedef void ( *calcPeak)(              // �����ֵ
    DWORD   *,         // ���ݻ�����
    int     ,      // ����
    ID_PEAK *,      // ��ֵ���䶨��
    int     ,     // ������
    int     ,      // ��׼��λ��
    unsigned char    ,        // �Ƿ������
    DWORD   *,      // ����ֵ
    ID_PEAKRESULT *);    // ��ֵ���

typedef bool ( *multiFit)(
    double *,
    double *,
    int    ,
    int    ,
    int    ,
    int    ,
    char   ,
    char   ,
    int    ,
    int    *,
    double *,
    double *,
    double *);
typedef double ( *calcConc)(double );
typedef double ( *calcys)(double *,double );


extern calcPeak    call_calcPeak;
extern multiFit    call_multiFit ;
extern calcConc    call_calcConc ;
extern calcys      call_calcys ;


#endif
