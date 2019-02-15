/****************************************Copyright (c)******************************************
**                                      TXRFID
**                                    
**                                 http://www.txrfid.com
**
**----------------------------------------------------------------------------------------------
**��   ��   ��: main.C
**��   ��   ��: TXRFID
**��        ��: �������ļ���
************************************************************************************************/
#include "TX_B.h"
#include "TX_UART.h"
//#include "IoDefine.h"
//#include "reg52.h"


///////////////////////////////////////////////////////////////////////////////
unsigned char TxMode;
unsigned char  ATQ[2];
unsigned char SAK;
unsigned char  Card_Snr[8];
unsigned char  Key[]={0xff,0xff,0xff,0xff,0xff,0xff};
unsigned char  DataBfr[32];


/////////////////////////////// ������ʼ ////////////////////////////////////
void IC_Mmain()
{   
    unsigned char  cardtype[2];
    unsigned char i;
    unsigned char  databuf[16];
    //NEW_DATA = 0;


    //i=TX_GetInfo(databuf); //��ȡTXģ��ģ����Ϣ

    i=TX_LoadKey(Key); //������Key_���ܳ�װ�ص�ģ����		�������װ�ع��ˣ��˺������Բ�����



    //��ALL��ʽ���Ƭ,��Ƭ���ͷŵ�cardtype�����Ŵ�ŵ�Card_Snr[]
    if(TX_GetCardSnr(ALL,cardtype,&databuf[2],&databuf[3],Card_Snr)!= OK) 	  //���Ƭ����ȡ����
    {
            //Delay_1ms(100);��������
            //continue;
    }
    if(TX_ReadBlock(1,databuf)!=OK)	;//continue;			  //���ж�����
    if(TX_WriteBlock(1,databuf)!=OK)	;//continue;	  //����д����

//TX_Halt();                                                // ����������ѡ����Ϊ����״̬

}


/***************************************************************************/
