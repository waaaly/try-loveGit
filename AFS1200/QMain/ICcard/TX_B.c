/****************************************Copyright (c)******************************************
**                                       TXRFID
**                                    
**                                 http://www.txrfid.com
**
**--------------文件信息-------------------------------------------------------------------------
**文   件   名: TX_B.C  
**创   建   人: TXRFID
**创 建 日  期: 2008年1月5日
**描        述: TX_B的C文件。
**
**---------------------------------------------------------------------------------------
**-----------------修改记录--------------------------------------------------------------
** 修改内容:    1.新的命令集
** 当前版本:    v2.0 
** 修 改 人:    TXRFID
** 修改日期:    2013年06月04日
** 注    意: 
**---------------------------------------------------------------------------------------
**-----------------修改记录--------------------------------------------------------------
** 修改内容:    1.增加SetBaud
                2.去掉了Serial_Int中的延时
** 当前版本:    v1.2 
** 修 改 人:    TXRFID
** 修改日期:    2009年04月12日
** 注    意: 
**---------------------------------------------------------------------------------------
**-----------------修改记录--------------------------------------------------------------
** 修改内容:    1.删除了write_E2，read_E2，write_reg, Read_Reg

** 当前版本:    v1.1 
** 修 改 人:    TXRFID
** 修改日期:    2009年04月03日
** 注    意: 
**---------------------------------------------------------------------------------------

**-----------------修改记录--------------------------------------------------------------
** 修改内容:    1.

** 当前版本:    v1.0 
** 修 改 人:    TXRFID
** 修改日期:    2009年02月05日
** 注    意: 
**---------------------------------------------------------------------------------------

**-----------------------------------------------------------------------------------------
****************************************************************************************/
#define TX_B_GLOBALS 1
//#include "typeDef.h"
#include "TX_B.h"
#include "TX_UART.h"
//#include "IoDefine.h"

void memcopy(unsigned char  *DBfr,unsigned char  *SBfr,unsigned char Len)
{
        unsigned char i;

	for(i=0;i<Len;i++)
	{
		DBfr[i] = SBfr[i];
	}
}
/*********************************************************************************************************
** 功能描述: 此函数的作用是将指定的密码（*Key）装载到模块，并非改变Mifare1 卡内扇区的密码。
**           本函数只对模块进行操作，模块与卡之间没有数据传输。
**           装载成功后，模块会用该密钥对Mifare1 卡进行验证。
**
** 输　入:   *Key：需要装载的密钥（6字节）
**                
** 输　出:  无
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，AUTH_ERR，COMM_ERR
**------------------------------------------------------------------------------------------------------
********************************************************************************************************/
#if TX_LoadKey_en
unsigned char TX_LoadKey(unsigned char  *Key)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x20;
	SER_BUFFER[LENGTH]=0x06;
	memcopy(&SER_BUFFER[DATA],Key,6);
	
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];
}
#endif

/*********************************************************************************************************
** 功能描述: 激活卡片并获取卡号信息。该命令为后面将要介绍的请求、防碰撞和选择三条命令的组合。
             成功执行该命令后即可进行验证及后续操作。
**
** 输　入:  ReqCode：请求模式 ReqCode取值为1或0 
            ReqCode＝0（IDLE），请求天线范围内IDLE状态的卡（HALT状态的除外）
            ReqCode＝1（ALL），请求天线范围内的所有卡。
**                
** 输　出:  *TagType：请求应答：2个字节的卡片类型，其意义见TX_Request。
            *Sak：最后一级选择应答的应答,其意义见TX_Casc_Select。
            *SnrLen：返回卡片序列号的长度。
            *Snr：返回卡片的序列号。
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，COMM_ERR
**           
********************************************************************************************************/
#if TX_GetCardSnr_en
unsigned char TX_GetCardSnr(unsigned char ReqCode,
                                   unsigned char  *TagType,
                                   unsigned char  *Sak,
                                   unsigned char  *SnrLen,
                                   unsigned char  *Snr)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x21;
	SER_BUFFER[LENGTH]=1;
	SER_BUFFER[DATA]=ReqCode;
		
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	if(SER_BUFFER[STATUS] == OK)
	{
		*TagType = SER_BUFFER[DATA];
		*(TagType+1) = SER_BUFFER[DATA+1];
		*Sak = SER_BUFFER[DATA+2];
		*SnrLen = SER_BUFFER[DATA+3];
		if(*SnrLen>7)	return COMM_ERR;
		memcopy(Snr,&SER_BUFFER[DATA+4],*SnrLen);		
	}
	return SER_BUFFER[STATUS];		
}
#endif



/*********************************************************************************************************
** 功能描述:读Mifare卡中相应块的数据。要使用LoadKey事先将卡片密钥装载到模块中。
**
** 输　入:  
	Block--卡块号（1字节）：		S50：0~63
									S70：0~255
    Block=扇区*4+当前扇区的块号
                
** 输　出:  *Data：Data为读回16字节数据的首地址。
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，NO_TAG_ERR，CRC_ERR，NOT_AUTH_ERR，PARITY_ERR，BIT_COUNT_ERR，COMM_ERR
**           
********************************************************************************************************/
#if TX_ReadBlock_en
unsigned char TX_ReadBlock(unsigned char Block, unsigned char  *Data)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x22;
	SER_BUFFER[LENGTH]=0x01;
	SER_BUFFER[DATA]=Block;
		
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
		
	if(SER_BUFFER[STATUS] == OK)
	{
		memcopy(Data,&SER_BUFFER[DATA],16);
	}
	return SER_BUFFER[STATUS];		
}
#endif


/*********************************************************************************************************
** 功能描述: 写相应的数据到Mifare卡指定块中。要使用LoadKey事先将卡片密钥装载到模块中。。
**
** 输　入:  
Block--卡块号（1字节）：			S50：1~63
									S70：1~255
Block=扇区*4+当前扇区的块号
*Data：16字节数据指针，Data为写入的16字节数据的首地址。
**                
** 输　出:  无。
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，NO_TAG_ERR，CRC_ERR，NOT_AUTH_ERR，PARITY_ERR，BIT_COUNT_ERR，
             COMM_ERR，CHK_WR_FAILED，CHK_WR_COMP_ERR
**           
********************************************************************************************************/
#if TX_WriteBlock_en
unsigned char TX_WriteBlock(unsigned char Block, unsigned char  *Data)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x23;
	SER_BUFFER[LENGTH]=17;
	SER_BUFFER[DATA]=Block;
	memcopy(&SER_BUFFER[DATA+1],Data,16);
		
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];	
}
#endif

/*********************************************************************************************************
** 功能描述:读Mifare卡中指定扇区的0-2块的数据（共48字节）。要使用LoadKey事先将卡片密钥装载到模块中。
**
** 输　入:  
	Sector--卡扇区号（1字节）：		S50：0~63
									S70：0~255
**                
** 输　出:  *Data：Data为读回48字节数据的首地址。
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，NO_TAG_ERR，CRC_ERR，NOT_AUTH_ERR，PARITY_ERR，BIT_COUNT_ERR，COMM_ERR
**           
********************************************************************************************************/
#if TX_ReadSector_en
unsigned char TX_ReadSector(unsigned char Sector, unsigned char  *Data)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x23;
	SER_BUFFER[LENGTH]=0x01;
	SER_BUFFER[DATA]=Sector;
		
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
		
	if(SER_BUFFER[STATUS] == OK)
	{
		memcopy(Data,&SER_BUFFER[DATA],48);
	}
	return SER_BUFFER[STATUS];		
}
#endif

 /*********************************************************************************************************
** 功能描述:
设定模块进入主动探测卡片，如果有卡片靠近，模块会读取卡号并主动回发。
模块在主动回发数据之前先置低INT_OUT，5ms后发出数据。如果卡片不拿开,则只有第一次检测到时才回发数据，但卡片指示INT_OUT一直有效（为低电平）。
当卡片在天线区域内时，模块指示灯一直亮灯指示。卡片指示INT_OUT一直为低电平。
设置主动检测卡片模式后，该设置掉电保存，重新上电后仍然处于该模式。
当向模块发送任何格式合法的命令(除SetDetectCard自身)时，模块退出主动检测卡片模式。
**
** 输　入: 
	ReqCode--请求代码（1字节）：	0x00——IDLE
							    	0x01——ALL	            
** 输　出:  无

             如果有卡靠近，模块将主动回发下列数据
            *TagType：请求应答：2个字节的卡片类型，其意义见TX_Request。
            *Sak：最后一级选择应答的应答,其意义见TX_Casc_Select。
            *SnrLen：返回卡片序列号的长度。
            *Snr：返回卡片的序列号。
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK, MI_WRONG_VALUE, NO_TAG_ERR, BIT_COUNT_ERR, TRANS_ERR, CODE_ERR, COMM_RERR
**           
********************************************************************************************************/
#if TX_SetDetectCard_en
unsigned char TX_SetDetectCard(unsigned char ReqCode )
{
	SER_BUFFER[SEQNR] = 0;
	SER_BUFFER[COMMAND] = 0x25;
	SER_BUFFER[LENGTH] = 1;	
	SER_BUFFER[DATA] = ReqCode;

	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];	
}
#endif   

 /*********************************************************************************************************
** 功能描述:
功能描述：用于配置模块进入自动读卡内容模式。配置好后模块不断去读取卡片，检测是否有卡片进入天线区域。如果有卡片进入，
模块自动读取卡号和指定块的内容，并将卡号和数据主动回发给控制器。回发完数据之后，再根据配置是否执行halt指令。注意回发数据时，
如果卡片不拿开,则只有第一次检测到时才回发数据，但卡片指示INT_OUT一直有效（为低电平）。
在回发数据之前，INT_OUT先置低，5ms后数据发出。
当卡片在天线区域内时，模块指示灯一直亮灯指示。卡片指示INT_OUT一直为低电平。
自动寻卡命令会保存到内部E2ROM中，掉电保存。下一次上电或者复位后继续有效。
当向模块发送任何格式合法的命令(除SetDetectCard自身)时，模块退出自动读卡模式。

**
** 输　入: 
(1)	ReqCode--请求代码（1字节）：		0x00--IDLE
							    	0x01--ALL
(2)	HaltEn --验证命令（1字节）：	    0--读取卡片后不执行halt
							    	1--读取卡片后执行halt
(3)	Block--需要读取的起始块号（1字节）：	S50：0~63	S70：0~255			 Block=扇区*4+当前扇区的块号
(4)	BlockNum-需要读取的块数量，最大取值3，最多一次读取3块。此外要保证一次读取的所有块在同一扇区内，否则该命令将返回错误。
	            
** 输　出:  无

             如果有卡靠近，模块将主动回发下列数据
DATA[0]： *SnrLen：返回卡片序列号的长度，4或7。
DATA[1.. 1+ SnrLen]： *Snr：返回卡片的序列号，4字节或7字节，Mifare1 S50、S70、Light卡4字节，Mifare0 UltraLight和Mifare3 Desfire卡7字节。
DATA[2+ SnrLen..]： 指定块的数据，根据设定读取的块数量，可能是16/32/48字节。

**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK, MI_WRONG_VALUE, NO_TAG_ERR, BIT_COUNT_ERR, TRANS_ERR, CODE_ERR, COMM_RERR
**           
********************************************************************************************************/
#if TX_SetAutoReadBlock_en
unsigned char TX_SetAutoReadBlock(unsigned char ReqCode,
                          unsigned char HaltEn,
                          unsigned char Block,
                                                  unsigned char BlockNum)
{
	SER_BUFFER[SEQNR] = 0;
	SER_BUFFER[COMMAND] = 0x26;
	SER_BUFFER[LENGTH] = 4;	
	SER_BUFFER[DATA] = ReqCode;
	SER_BUFFER[DATA+1] = HaltEn;
	SER_BUFFER[DATA+2] = Block;
	SER_BUFFER[DATA+3] = BlockNum;

	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];	
}
#endif  


/*********************************************************************************************************
** 功能描述: 将天线区所选择卡置为挂起状态。如果要进行重新选择，则应用ALL模式调用TX_Request命令。
**           如果要进行重新选择,也可以将卡离开天线操作区再进入，或执行复位函数TX_Reset()。
**           可以配合使用TX_Request()和TX_Halt()函数，进行一次性扣费，如卡进入感应区后只扣一次（一元钱），
**           离开后，下次进入再扣一次，若卡在感应区内停留时间较长，也不会扣多一次。
**
** 输　入: 无
**
** 输　出: 无
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，COMM_ERR
**
*******************************************************************************************************/
#if TX_Halt_en
unsigned char TX_Halt(void)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x27;
	SER_BUFFER[LENGTH]=0x00;
	
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];	
}
#endif
/*********************************************************************************************************
** 功能描述: 此函数将关闭TX模块，指示灯熄灭，天线不发送载波信号，模块消耗的电流最小，在此状态在，
**           模块不能使用。若要重新使用模块，需要调用TX_Config()函数对TX模块重新进行配置。
**
** 输　入:  无          
**
** 输　出:  无
**
** 函数返回: OK，COMM_ERR
**------------------------------------------------------------------------------------------------------
********************************************************************************************************/
#if TX_Close_en
unsigned char TX_Close(void)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x28;
	SER_BUFFER[LENGTH]=0;
	
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];
}
#endif


/*********************************************************************************************************
** 功能描述: 该函数使模块上的射频电路关闭，关闭的时间由参数Msec指定，若Msec=0，射频电路将一直处于关闭状态，
**            一直到下一个TX_Request命令到来。关闭射频电路能使天线内的所有卡复位。
**  
** 输　入: Msec：取值0~255，模块上射频电路关闭时间（以ms毫秒为单位），Msec＝0时，一直关闭。 
**
** 输　出: 无
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，COMM_ERR中的某一个。
**
*******************************************************************************************************/
#if TX_Reset_en
unsigned char TX_Reset(unsigned char Msec)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x29;
	SER_BUFFER[LENGTH]=1;
	SER_BUFFER[DATA]=Msec;
	
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];
}
#endif 


/*********************************************************************************************************
** 功能描述: 对模块天线驱动模式进行配置。模块默认为TX1和TX2同时驱动。
默认出厂默认设定为0x03,同时驱动，只要要进行双天线操作时，才会使用到该函数进行天线切换。     
分体式模块不支持该函数	 。
**  
** 输　入:TxMode:天线驱动模式，0x00= TX1和TX2关闭；0x01=TX1驱动；0x02 = TX2驱动；0x03 = TX1和TX2同时驱动。 
**
** 输　出: 无
**
** 函数返回: TX模块执行命令后的状态
**           可能的状态值如下：OK，QUIT，COMM_ERR中的某一个。
**
*******************************************************************************************************/
#if TX_ConfigAnt_en
unsigned char TX_ConfigAnt(unsigned char TxMode)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x2a;
	SER_BUFFER[LENGTH]=1;
	SER_BUFFER[DATA]=TxMode;
	
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];
}
#endif 

/*********************************************************************************************************
** 功能描述: 获取TX模块的信息。
**
** 输　入:  无          
**
** 输　出:  模块的信息*Info，Info为保存信息空间的首地址。Info[0]～Info[4]为模块类型标识，
**          Info[5]～Info[8]为读卡芯片的序列号，Info[9]为固件版本号，
**          高四位为版本号的整数，取值从1到15，低四位为版本号的小数，取值从0到9。
**
** 函数返回: OK，QUIT，COMM_ERR
**          
**------------------------------------------------------------------------------------------------------
********************************************************************************************************/
#if TX_GetInfo_en
unsigned char TX_GetInfo(unsigned char  *Info)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x2b;
	SER_BUFFER[LENGTH]=0;
	
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
		
	if(SER_BUFFER[STATUS] == OK)
	{
		if(SER_BUFFER[LENGTH]<16)
		{
		    memcopy(Info,&SER_BUFFER[DATA],SER_BUFFER[LENGTH]);
		}
		else  return COMM_ERR;
	}
	return SER_BUFFER[STATUS];	
}
#endif


#if TX_Buzzer_en
unsigned char TX_Buzzer(unsigned char Frquence, unsigned char Opentm, unsigned char Closetm, unsigned char Repcnt)
{
	SER_BUFFER[SEQNR]=0;
	SER_BUFFER[COMMAND]=0x2e;
	SER_BUFFER[LENGTH]=4;
	SER_BUFFER[DATA]=Frquence;
	SER_BUFFER[DATA+1]=Opentm;
 	SER_BUFFER[DATA+2]=Closetm;
	SER_BUFFER[DATA+3]=Repcnt;
		
	if(Serial_Comm()!=COMM_OK)
		return COMM_ERR;
	
	return SER_BUFFER[STATUS];
} 
#endif
/****************************************************************************/
/**                                                                        **/
/**                               EOF                                     **/
/**                                                                        **/
/****************************************************************************/







	
