#ifndef STRUCT_H
#define STRUCT_H
#include <StdCtrls.hpp>

typedef struct
{
    unsigned short int From;                     // ��ֵ���
    unsigned short int To;                       // ��ֵ�յ�
    unsigned char Count;                    // ȡֵ����
    unsigned char Style;                    // ȡֵ���㷽ʽ
} ID_PEAK;

typedef struct
{
    int   Position[10];            // ��ֵλ��
    float Value[10];               // ��ֵ���
    float Vallery[9];              // ����֮�����Сֵ
    int   From[10];
    int   To[10];
} ID_PEAKRESULT;


typedef struct
{
    BYTE  Method;
		// 1   ��Ϸ���
		//     0 : ֱ��
		//     1 : ����ʽ
		//     2 : MMF
		//     3 : ��������
		//     4 : �������
		//     5 : �ݺ������
		//     6 : �߼�˹��ģ��
		//     7 : ָ�����
		//     8 : ���Բ�ֵ
		//     9 : Logistic���(4����)
		//     10: Logistic���(5����)
    BYTE  SectPosi;                // 1   ����ʽ�ֶ�λ��0��ʾ���ֶ�

    BYTE  SectLimits[2];           // 2   ����ʽ���� 0��ʾ�Զ� 1-6��ʾ����
	
	BYTE  ConcTrans;               // 1   Ũ�ȱ任   1 : ȡ���� 0 : ������
    BYTE  RespTrans;               // 1   ��Ӧֵ�任 1 : ȡ���� 0 : ������

	BYTE dec_std;
	BYTE StdCount;                // 1   ��׼Ʒ����

	float Concs[16];               // 64  ��׼ƷŨ��  2017-05-26 ��21���16
    float Resps[16];               // 64  ��׼Ʒ��Ӧֵ

} IDCURVE;




#define ISTYLE_SEND 0
#define ISTYLE_RECV 1
void DisplayData(TMemo*mShow, int istyle,const char buf[],int icount);


#endif // STRUCT_H