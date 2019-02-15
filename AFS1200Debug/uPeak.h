#ifndef uPeakH
#define uPeakH

#include <ADODB.hpp>
#include <SysUtils.hpp>
#include <stdio.h>
#include <vcl.h>
#include <IdGlobal.hpp>
#include <io.h>

typedef struct{
        WORD From;                     // 峰值起点
        WORD To;                       // 峰值终点
        BYTE Count;                    // 取值个数
        BYTE Style;                    // 取值计算方式
}ID_PEAK;

typedef struct{
        int   Position[10];            // 峰值位置
        float Value[10];               // 峰值结果
        float Vallery[9];              // 两峰之间的最小值
        int   From[10];
        int   To[10];
}ID_PEAKRESULT;

extern float      m_fBlankCheck;       // 自动减本底条件
extern float      m_fBlankRatio;       // 本底比例

void __fastcall CalcPeak(              // 计算峰值
                DWORD   buf[],         // 数据缓冲区
                int     DotCount,      // 点数
                ID_PEAK pdsSrc[],      // 峰值区间定义
                int     PeakCount,     // 峰数量
                int     BasePeak,      // 基准峰位置
                BYTE    BBlank,        // 是否减本底
                DWORD   &dwBlank,      // 本底值
                ID_PEAKRESULT &pr);    // 峰值结果

#endif
