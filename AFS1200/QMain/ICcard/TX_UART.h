// TX_UART.h        // TX 底层通信处理的头文件


#ifndef __TX_UART_H__                    // 防止头文件被重复包含                                                          
#define __TX_UART_H__

#ifdef TX_UART_GLOBALS                   // 注意在TX_B.c 文件中定义TX_B_GLOBALS
        #define TX_UART_EXT
#else
        #define TX_UART_EXT	extern
#endif


//#include "typeDef.h"


/**************************************************************************
** SER_BUFFER [30]：通信数据缓冲区，所有的要通过串行接口发送和接收的数据都
** 放在这里，包括序号、命令/状态、长度、数据以及BCC校验，为了方便地访问这些
** 变量，定义了如下索引常量：
**   #define SEQNR     0
**   #define COMMAND   1
**   #define STATUS    1
**   #define LENGTH    2
**   #define DATA      3
****************************************************************************/

TX_UART_EXT unsigned char  SER_BUFFER[32];

/***************************************************************************
** NEW_DATA：接收到正确新数据标志位，当外部中断1中断，接收到新数据时该位置位。
***************************************************************************/
TX_UART_EXT char NEW_DATA;

// =============================== 函数声明 ===================================
//TX_UART_EXT unsigned char Send_Data(void);
TX_UART_EXT unsigned char Serial_Comm(void);
TX_UART_EXT void Serial_Init(unsigned char Baud_Num);
TX_UART_EXT void Delay_1ms(unsigned char num);

#endif      // __TX_UART_H__
