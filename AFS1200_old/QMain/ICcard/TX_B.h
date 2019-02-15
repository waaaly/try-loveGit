/****************************************Copyright (c)**************************************************
**                                      TXRFID
**                                    
**                                 http://www.txrfid.com
**
**--------------�ļ���Ϣ-------------------------------------------------------------------------
**��   ��   ��: TX_B.H    
**��   ��   ��: TXRFID
**�� �� ��  ��: 2008��1��5��
**��        ��: TX500B��C�ļ���
**
**---------------------------------------------------------------------------------------
**-----------------�޸ļ�¼--------------------------------------------------------------
** �޸�����:    1.

** ��ǰ�汾:    v1.0 
** �� �� ��:    TXRFID
** �޸�����:    2009��02��05��
** ע    ��: 
**---------------------------------------------------------------------------------------
**
**-----------------------------------------------------------------------------------------
****************************************************************************************/
#ifndef __TX_B_H__                    // ��ֹͷ�ļ����ظ�����                                                          
#define __TX_B_H__

#ifdef TX_B_GLOBALS                   // ע����TX_B.c �ļ��ж���TX_GLOBALS
	#define TX_EXT
#else
	#define TX_EXT extern
#endif


//#include "typeDef.h"


/****************************************************************************/
/**                                                                        **/
/**                     Definitions and Macros                             **/
/****************************************************************************/
//���¶������ṩ������Ԥ����ʹ�ܣ�ʹ��ĳ������ʱ�뽫ʹ����Ϊ1��������Ϊ0


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



//=================================== �������� ================================

// ��Ƭ����
/* #define MF1_S50                 0               
#define MF1_S70                 1
#define MF0_ULIGHT              2
#define MF1_LIGHT               3 */
#define MF1_S50                 0x04               
#define MF1_S70                 0x02
#define MF0_ULIGHT              0x44
#define MF1_LIGHT               0x10 

// PICC ����
#define IDLE                    0x00
#define ALL                     0x01
#define ANTICOLL1               0x93       // anticollision level 1
#define ANTICOLL2               0x95       // anticollision level 2
#define ANTICOLL3               0x97       // anticollision level 3 
#define KEYA                    0x00       //�ܳ�����A
#define KEYB                    0x04       //�ܳ�����B
#define DECREMENT               0xC0
#define INCREMENT               0xC1
#define RESTORE                 0xC2

//����ͨ��֡����
#define STX                     0x20       //��ʼ��
#define ACK                     0x06       //Ӧ��
#define NAK                     0x15       //NAK
#define ETX                     0x03       //��ֹ��

//�������ݿ��ʽ��λ��
#define SEQNR                   0          //���ݽ����������
#define COMMAND                 1          //�����ַ�  
#define STATUS                  1          //״̬�ַ�
#define LENGTH                  2          //���ݵĳ���        
#define DATA                    3          //�����ֽ�

#define FALSE                   0
#define TRUE                    1

//Communication Error
#define COMM_OK                 0x00      //������óɹ�
#define COMM_ERR                0xff      //����ͨ�Ŵ���


//mifare error
#define OK                      0          //�������óɹ�
#define NO_TAG_ERR              (-1)          //����Ч������û�п�
#define CRC_ERR                 (-2)          //�ӿ��н��յ��˴����CRCУ���
#define EMPTY                   (-3)          //ֵ���
#define AUTH_ERR                (-4)          //������֤
#define PARITY_ERR              (-5)         //�ӿ��н��յ��˴����У��λ
#define CODE_ERR                (-6)          //ͨ�Ŵ���

#define SERNR_ERR               (-8)          //�ڷ���ͻʱ�����˴���Ĵ�����
#define KEY_ERR                 (-9)          //֤ʵ�����*****
#define NOT_AUTH_ERR            (-10)         //��û����֤
#define BIT_COUNT_ERR           (-11)         //�ӿ��н��յ��˴���������λ
#define BYTE_COUNT_ERR          (-12)         //�ӿ��н����˴����������ֽ�
#define TRANS_ERR               (-14)         //����Transfer��������
#define WRITE_ERR               (-15)         //����Write��������
#define INCR_ERR                (-16)         //����Increment��������
#define DECR_ERR                (-17)         //����Decrment��������
#define READ_ERR                (-18)         //����Read��������
#define COLL_ERR                (-24)         //��ͻ��
#define ACCESS_TIMEOUT          (-27)         //���ʳ�ʱ
#define QUIT                    (-30)         //��һ����������ʱ�����

//check write Error
#define CHK_WR_OK               0          //Check Write��ȷ
#define CHK_WR_FAILED           (-1)          //Check Write����
#define CHK_WR_COMP_ERR         (-2)          //Check Write:д�����Ƚϳ���

// Configuration for the reader timeout counter 
// Timer 2 (modify OSC_FREQ if another crystal frequency is used)
#define OSC_FREQ                11059200L                       //ϵͳ����Ƶ��

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
#define RCAP2_2ms               (65536 - 40*OSC_FREQ/240000L)     //ʹ��12clock
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
