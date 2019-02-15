// TX_UART.h        // TX �ײ�ͨ�Ŵ����ͷ�ļ�


#ifndef __TX_UART_H__                    // ��ֹͷ�ļ����ظ�����                                                          
#define __TX_UART_H__

#ifdef TX_UART_GLOBALS                   // ע����TX_B.c �ļ��ж���TX_B_GLOBALS
        #define TX_UART_EXT
#else
        #define TX_UART_EXT	extern
#endif


//#include "typeDef.h"


/**************************************************************************
** SER_BUFFER [30]��ͨ�����ݻ����������е�Ҫͨ�����нӿڷ��ͺͽ��յ����ݶ�
** �������������š�����/״̬�����ȡ������Լ�BCCУ�飬Ϊ�˷���ط�����Щ
** ��������������������������
**   #define SEQNR     0
**   #define COMMAND   1
**   #define STATUS    1
**   #define LENGTH    2
**   #define DATA      3
****************************************************************************/

TX_UART_EXT unsigned char  SER_BUFFER[32];

/***************************************************************************
** NEW_DATA�����յ���ȷ�����ݱ�־λ�����ⲿ�ж�1�жϣ����յ�������ʱ��λ��λ��
***************************************************************************/
TX_UART_EXT char NEW_DATA;

// =============================== �������� ===================================
//TX_UART_EXT unsigned char Send_Data(void);
TX_UART_EXT unsigned char Serial_Comm(void);
TX_UART_EXT void Serial_Init(unsigned char Baud_Num);
TX_UART_EXT void Delay_1ms(unsigned char num);

#endif      // __TX_UART_H__
