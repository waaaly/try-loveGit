#ifndef uPeakH
#define uPeakH

#include <ADODB.hpp>
#include <SysUtils.hpp>
#include <stdio.h>
#include <vcl.h>
#include <IdGlobal.hpp>
#include <io.h>

typedef struct{
        WORD From;                     // ��ֵ���
        WORD To;                       // ��ֵ�յ�
        BYTE Count;                    // ȡֵ����
        BYTE Style;                    // ȡֵ���㷽ʽ
}ID_PEAK;

typedef struct{
        int   Position[10];            // ��ֵλ��
        float Value[10];               // ��ֵ���
        float Vallery[9];              // ����֮�����Сֵ
        int   From[10];
        int   To[10];
}ID_PEAKRESULT;

extern float      m_fBlankCheck;       // �Զ�����������
extern float      m_fBlankRatio;       // ���ױ���

void __fastcall CalcPeak(              // �����ֵ
                DWORD   buf[],         // ���ݻ�����
                int     DotCount,      // ����
                ID_PEAK pdsSrc[],      // ��ֵ���䶨��
                int     PeakCount,     // ������
                int     BasePeak,      // ��׼��λ��
                BYTE    BBlank,        // �Ƿ������
                DWORD   &dwBlank,      // ����ֵ
                ID_PEAKRESULT &pr);    // ��ֵ���

#endif
