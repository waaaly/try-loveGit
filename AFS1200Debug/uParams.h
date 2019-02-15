#ifndef uParamsH
#define uParamsH

#include <vcl.h>

extern AnsiString m_sDevCom;                  // �豸ͨѶ����
extern AnsiString m_sPrtCom;                  // ���ô�ӡ������

extern AnsiString m_sDevName;
extern AnsiString m_sCopyRight;

extern BYTE       m_BCompanyCode;   // ��˾����
extern WORD       m_WDevYear;       // �豸���
extern BYTE       m_BDevMonth;      //     �·�
extern BYTE       m_BDevDay;        //     ��
extern BYTE       m_BDevVer1;       //     �汾1
extern BYTE       m_BDevVer2;       //     �汾2
extern BYTE       m_BDevVer3;       //     �汾3
extern WORD       m_WDevSYear;      // �������к���
extern WORD       m_WDevSNo;        // �������к���ˮ��
extern BYTE       m_BCName[7][10];  // ��д���кŵ����ݰ�

extern AnsiString m_sCompanyName;   // ��˾����
extern WORD       m_wDots;    // ɨ������ݸ���
extern AnsiString m_sWorkDir;       // ����Ŀ¼
extern AnsiString m_sTestDir;       // ����Ŀ¼
extern AnsiString m_sItemDir;       // ��ĿHEXĿ¼
extern AnsiString m_sBaseDir;       // ������ĿĿ¼
extern AnsiString m_sBackDir;       // ������Ŀ��ʷĿ¼
extern AnsiString m_sConfig;        // �����ļ�����
extern AnsiString m_sBCDir;         // ����ͼ��Ŀ¼

extern AnsiString m_sChkDate;
extern AnsiString m_sChkNow;

extern AnsiString m_sBCRT,m_sBCBC;  // �����ʽ�༭-��Ŀ���� ����
extern bool       m_bBCAuto;        // �Ƿ��Զ���������
extern BYTE       m_BBCLen;         // �ֹ���������볤��
extern BYTE       m_BBFont;         // ���������ֺ�
extern BYTE       m_BBCHeight;      // ����߶�
extern bool       m_bReversal;      // ������ת
extern DWORD      m_wRevVal;        // ��ת��׼ֵ
extern BYTE       m_BBCBit;         // ����bit��
extern BYTE       m_BBCPC;          // ��Ʒλ��
extern BYTE       m_BBCYear;        // ��λ��
extern BYTE       m_BBCMonth;       // ��λ��
extern BYTE       m_BBCBatch;       // ����λ��

extern BYTE       m_BBCRatio;       // �������Ĭ��10
extern WORD       m_WStartYear;     // �Լ�����ʼ���

//extern float      m_fBreak;           // �����б�ʱ仯��
extern int        m_iBreak;           // ���������ֵ�仯

extern DWORD      m_WBCDots;          // �������ݵ����

void __fastcall SaveComParam(void);
void __fastcall LoadComParam(void);

void __fastcall LoadSTypeCaption(TLabeledEdit *le);
void __fastcall LoadPeakCalc(TComboBox *cbCalc);

void __fastcall LoadTestList(TStrings *sl);      // ��ȡ�����б�
AnsiString TestFName(AnsiString asTest,
                     AnsiString asExt);          // �����ļ�ID�ļ���
AnsiString AFSFile(AnsiString asPath,            // ·��
                   AnsiString asTestNo,          // AFS�ļ���
                   int iCurveBa,
                   int iIndex);
#endif
