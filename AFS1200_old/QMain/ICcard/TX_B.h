/****************************************Copyright (c)**************************************************
**                                      TXRFID
**                                    
**                                 http://www.txrfid.com
**
**--------------文件信息-------------------------------------------------------------------------
**文   件   名: TX_B.H    
**创   建   人: TXRFID
**创 建 日  期: 2008年1月5日
**描        述: TX500B的C文件。
**
**---------------------------------------------------------------------------------------
**-----------------修改记录--------------------------------------------------------------
** 修改内容:    1.

** 当前版本:    v1.0 
** 修 改 人:    TXRFID
** 修改日期:    2009年02月05日
** 注    意: 
**---------------------------------------------------------------------------------------
**
**-----------------------------------------------------------------------------------------
****************************************************************************************/
#ifndef __TX_B_H__                    // 防止头文件被重复包含                                                          
#define __TX_B_H__

#ifdef TX_B_GLOBALS                   // 注意在TX_B.c 文件中定义TX_GLOBALS
	#define TX_EXT
#else
	#define TX_EXT extern
#endif


//#include "typeDef.h"


/****************************************************************************/
/**                                                                        **/
/**                     Definitions and Macros                             **/
/****************************************************************************/
//以下定义所提供函数的预编译使能，使用某个函数时请将使能设为1，否则设为0


#define TX_LoadKey_en                1
#define TX_GetCardSnr_en             1 
#define TX_ReadBlock_en              1
#define TX_WriteBlock_en             1
#define TX_ReadSector_en             1
#define TX_SetDetectCard_en          1 
#define TX_SetAutoReadBlock_en       1
#define TX_Halt_en                   1
#define TX_Close_en		             1 
#define TX_Reset_en			         1
#define TX_ConfigAnt_en			     1
#define TX_GetInfo_en			     1
#define TX_Buzzer_en			     1



//=================================== 常量定义 ================================

// 卡片类型
/* #define MF1_S50                 0               
#define MF1_S70                 1
#define MF0_ULIGHT              2
#define MF1_LIGHT               3 */
#define MF1_S50                 0x04               
#define MF1_S70                 0x02
#define MF0_ULIGHT              0x44
#define MF1_LIGHT               0x10 

// PICC 命令
#define IDLE                    0x00
#define ALL                     0x01
#define ANTICOLL1               0x93       // anticollision level 1
#define ANTICOLL2               0x95       // anticollision level 2
#define ANTICOLL3               0x97       // anticollision level 3 
#define KEYA                    0x00       //密匙类型A
#define KEYB                    0x04       //密匙类型B
#define DECREMENT               0xC0
#define INCREMENT               0xC1
#define RESTORE                 0xC2

//定义通信帧常量
#define STX                     0x20       //开始符
#define ACK                     0x06       //应答
#define NAK                     0x15       //NAK
#define ETX                     0x03       //终止符

//定义数据块格式的位置
#define SEQNR                   0          //数据交换包的序号
#define COMMAND                 1          //命令字符  
#define STATUS                  1          //状态字符
#define LENGTH                  2          //数据的长度        
#define DATA                    3          //数据字节

#define FALSE                   0
#define TRUE                    1

//Communication Error
#define COMM_OK                 0x00      //命令调用成功
#define COMM_ERR                0xff      //串行通信错误


//mifare error
#define OK                      0          //函数调用成功
#define NO_TAG_ERR              (-1)          //在有效区域内没有卡
#define CRC_ERR                 (-2)          //从卡中接收到了错误的CRC校验和
#define EMPTY                   (-3)          //值溢出
#define AUTH_ERR                (-4)          //不能验证
#define PARITY_ERR              (-5)         //从卡中接收到了错误的校验位
#define CODE_ERR                (-6)          //通信错误

#define SERNR_ERR               (-8)          //在防冲突时读到了错误的串行码
#define KEY_ERR                 (-9)          //证实密码错*****
#define NOT_AUTH_ERR            (-10)         //卡没有验证
#define BIT_COUNT_ERR           (-11)         //从卡中接收到了错误数量的位
#define BYTE_COUNT_ERR          (-12)         //从卡中接收了错误数量的字节
#define TRANS_ERR               (-14)         //调用Transfer函数出错
#define WRITE_ERR               (-15)         //调用Write函数出错
#define INCR_ERR                (-16)         //调用Increment函数出错
#define DECR_ERR                (-17)         //调用Decrment函数出错
#define READ_ERR                (-18)         //调用Read函数出错
#define COLL_ERR                (-24)         //冲突错
#define ACCESS_TIMEOUT          (-27)         //访问超时
#define QUIT                    (-30)         //上一次了送命令时被打断

//check write Error
#define CHK_WR_OK               0          //Check Write正确
#define CHK_WR_FAILED           (-1)          //Check Write出错
#define CHK_WR_COMP_ERR         (-2)          //Check Write:写出错（比较出错）

// Configuration for the reader timeout counter 
// Timer 2 (modify OSC_FREQ if another crystal frequency is used)
#define OSC_FREQ                11059200L                       //系统工作频率

#define BAUD_9600               (256-(OSC_FREQ/192L)/9600L)   //250
#define BAUD_19200              (256-(OSC_FREQ/192L)/19200L)  //253
#define BAUD_28800              (256-(OSC_FREQ/192L)/28800L)  //254
#define BAUD_57600              (256-(OSC_FREQ/192L)/57600L)  //255

//Timer2 is serial's watchdog,2ms overlay.

#define START_T2(X)             TR2=0; T2LH=X; TF2=0; TR2=1
#define STOP_T2()               TR2=0

// Timer 2
#define RCAP2_50us              65536L - OSC_FREQ/240000L
#define RCAP2_1ms               65536L - 20*OSC_FREQ/240000L  
#define RCAP2_2ms               (65536 - 40*OSC_FREQ/240000L)     //使用12clock
#define RCAP2_10ms              65536L - 200*OSC_FREQ/240000L



unsigned char TX_LoadKey(unsigned char   *Key);
unsigned char TX_GetCardSnr(unsigned char ReqCode,
                                   unsigned char  *TagType,
                                   unsigned char  *Sak,
                                   unsigned char  *SnrLen,
                                   unsigned char  *Snr);
unsigned char TX_ReadBlock(unsigned char Block, unsigned char  *Data);
unsigned char TX_WriteBlock(unsigned char Block, unsigned char  *Data)	;
unsigned char TX_ReadSector(unsigned char Sector, unsigned char  *Data);
unsigned char TX_SetDetectCard(unsigned char ReqCode );
unsigned char TX_SetAutoReadBlock(unsigned char ReqCode,
                          unsigned char HaltEn,
                          unsigned char Block,
                                                  unsigned char BlockNum);
unsigned char TX_Halt(void);
unsigned char TX_Close(void);
unsigned char TX_Reset(unsigned char Msec);
unsigned char TX_ConfigAnt(unsigned char TxMode);

unsigned char TX_GetInfo(unsigned char  *Info);

unsigned char TX_Buzzer(unsigned char Frquence, unsigned char Opentm, unsigned char Closetm, unsigned char Repcnt);


#endif              // __TX_B_H__
