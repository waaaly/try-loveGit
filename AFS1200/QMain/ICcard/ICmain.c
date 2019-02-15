/****************************************Copyright (c)******************************************
**                                      TXRFID
**                                    
**                                 http://www.txrfid.com
**
**----------------------------------------------------------------------------------------------
**文   件   名: main.C
**创   建   人: TXRFID
**描        述: 主程序文件。
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


/////////////////////////////// 主程序开始 ////////////////////////////////////
void IC_Mmain()
{   
    unsigned char  cardtype[2];
    unsigned char i;
    unsigned char  databuf[16];
    //NEW_DATA = 0;


    //i=TX_GetInfo(databuf); //获取TX模块模块信息

    i=TX_LoadKey(Key); //将数组Key_的密匙装载到模块内		如果事先装载过了，此函数可以不调用



    //以ALL方式激活卡片,卡片类型放到cardtype，卡号存放到Card_Snr[]
    if(TX_GetCardSnr(ALL,cardtype,&databuf[2],&databuf[3],Card_Snr)!= OK) 	  //激活卡片并获取卡号
    {
            //Delay_1ms(100);或处理其他
            //continue;
    }
    if(TX_ReadBlock(1,databuf)!=OK)	;//continue;			  //进行读操作
    if(TX_WriteBlock(1,databuf)!=OK)	;//continue;	  //进行写操作

//TX_Halt();                                                // 将天线区所选择卡置为挂起状态

}


/***************************************************************************/
