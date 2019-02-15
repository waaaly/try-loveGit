#ifndef loadLibH
#define loadLibH

#include "struct.h"
#include "windows.h"

void LB_AlgoLoadLibrary(void) throw() ;

// 定义要导入的函数类型
typedef void ( *calcPeak)(              // 计算峰值
    DWORD   *,         // 数据缓冲区
    int     ,      // 点数
    ID_PEAK *,      // 峰值区间定义
    int     ,     // 峰数量
    int     ,      // 基准峰位置
    unsigned char    ,        // 是否减本底
    DWORD   *,      // 本底值
    ID_PEAKRESULT *);    // 峰值结果

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
