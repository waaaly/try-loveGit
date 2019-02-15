/****************************************Copyright (c)******************************************
**                                       TXRFID
**                                    
**                                 http://www.txrfid.com
**
**--------------�ļ���Ϣ-------------------------------------------------------------------------
**��   ��   ��: TX_B.C  
**��   ��   ��: TXRFID
**�� �� ��  ��: 2008��1��5��
**��        ��: TX_B��C�ļ���
**
**---------------------------------------------------------------------------------------
**-----------------�޸ļ�¼--------------------------------------------------------------
** �޸�����:    1.�µ����
** ��ǰ�汾:    v2.0 
** �� �� ��:    TXRFID
** �޸�����:    2013��06��04��
** ע    ��: 
**---------------------------------------------------------------------------------------
**-----------------�޸ļ�¼--------------------------------------------------------------
** �޸�����:    1.����SetBaud
                2.ȥ����Serial_Int�е���ʱ
** ��ǰ�汾:    v1.2 
** �� �� ��:    TXRFID
** �޸�����:    2009��04��12��
** ע    ��: 
**---------------------------------------------------------------------------------------
**-----------------�޸ļ�¼--------------------------------------------------------------
** �޸�����:    1.ɾ����write_E2��read_E2��write_reg, Read_Reg

** ��ǰ�汾:    v1.1 
** �� �� ��:    TXRFID
** �޸�����:    2009��04��03��
** ע    ��: 
**---------------------------------------------------------------------------------------

**-----------------�޸ļ�¼--------------------------------------------------------------
** �޸�����:    1.

** ��ǰ�汾:    v1.0 
** �� �� ��:    TXRFID
** �޸�����:    2009��02��05��
** ע    ��: 
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
** ��������: �˺����������ǽ�ָ�������루*Key��װ�ص�ģ�飬���Ǹı�Mifare1 �������������롣
**           ������ֻ��ģ����в�����ģ���뿨֮��û�����ݴ��䡣
**           װ�سɹ���ģ����ø���Կ��Mifare1 ��������֤��
**
** �䡡��:   *Key����Ҫװ�ص���Կ��6�ֽڣ�
**                
** �䡡��:  ��
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��AUTH_ERR��COMM_ERR
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
** ��������: ���Ƭ����ȡ������Ϣ��������Ϊ���潫Ҫ���ܵ����󡢷���ײ��ѡ�������������ϡ�
             �ɹ�ִ�и�����󼴿ɽ�����֤������������
**
** �䡡��:  ReqCode������ģʽ ReqCodeȡֵΪ1��0 
            ReqCode��0��IDLE�����������߷�Χ��IDLE״̬�Ŀ���HALT״̬�ĳ��⣩
            ReqCode��1��ALL�����������߷�Χ�ڵ����п���
**                
** �䡡��:  *TagType������Ӧ��2���ֽڵĿ�Ƭ���ͣ��������TX_Request��
            *Sak�����һ��ѡ��Ӧ���Ӧ��,�������TX_Casc_Select��
            *SnrLen�����ؿ�Ƭ���кŵĳ��ȡ�
            *Snr�����ؿ�Ƭ�����кš�
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��COMM_ERR
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
** ��������:��Mifare������Ӧ������ݡ�Ҫʹ��LoadKey���Ƚ���Ƭ��Կװ�ص�ģ���С�
**
** �䡡��:  
	Block--����ţ�1�ֽڣ���		S50��0~63
									S70��0~255
    Block=����*4+��ǰ�����Ŀ��
                
** �䡡��:  *Data��DataΪ����16�ֽ����ݵ��׵�ַ��
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��NO_TAG_ERR��CRC_ERR��NOT_AUTH_ERR��PARITY_ERR��BIT_COUNT_ERR��COMM_ERR
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
** ��������: д��Ӧ�����ݵ�Mifare��ָ�����С�Ҫʹ��LoadKey���Ƚ���Ƭ��Կװ�ص�ģ���С���
**
** �䡡��:  
Block--����ţ�1�ֽڣ���			S50��1~63
									S70��1~255
Block=����*4+��ǰ�����Ŀ��
*Data��16�ֽ�����ָ�룬DataΪд���16�ֽ����ݵ��׵�ַ��
**                
** �䡡��:  �ޡ�
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��NO_TAG_ERR��CRC_ERR��NOT_AUTH_ERR��PARITY_ERR��BIT_COUNT_ERR��
             COMM_ERR��CHK_WR_FAILED��CHK_WR_COMP_ERR
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
** ��������:��Mifare����ָ��������0-2������ݣ���48�ֽڣ���Ҫʹ��LoadKey���Ƚ���Ƭ��Կװ�ص�ģ���С�
**
** �䡡��:  
	Sector--�������ţ�1�ֽڣ���		S50��0~63
									S70��0~255
**                
** �䡡��:  *Data��DataΪ����48�ֽ����ݵ��׵�ַ��
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��NO_TAG_ERR��CRC_ERR��NOT_AUTH_ERR��PARITY_ERR��BIT_COUNT_ERR��COMM_ERR
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
** ��������:
�趨ģ���������̽�⿨Ƭ������п�Ƭ������ģ����ȡ���Ų������ط���
ģ���������ط�����֮ǰ���õ�INT_OUT��5ms�󷢳����ݡ������Ƭ���ÿ�,��ֻ�е�һ�μ�⵽ʱ�Żط����ݣ�����ƬָʾINT_OUTһֱ��Ч��Ϊ�͵�ƽ����
����Ƭ������������ʱ��ģ��ָʾ��һֱ����ָʾ����ƬָʾINT_OUTһֱΪ�͵�ƽ��
����������⿨Ƭģʽ�󣬸����õ��籣�棬�����ϵ����Ȼ���ڸ�ģʽ��
����ģ�鷢���κθ�ʽ�Ϸ�������(��SetDetectCard����)ʱ��ģ���˳�������⿨Ƭģʽ��
**
** �䡡��: 
	ReqCode--������루1�ֽڣ���	0x00����IDLE
							    	0x01����ALL	            
** �䡡��:  ��

             ����п�������ģ�齫�����ط���������
            *TagType������Ӧ��2���ֽڵĿ�Ƭ���ͣ��������TX_Request��
            *Sak�����һ��ѡ��Ӧ���Ӧ��,�������TX_Casc_Select��
            *SnrLen�����ؿ�Ƭ���кŵĳ��ȡ�
            *Snr�����ؿ�Ƭ�����кš�
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK, MI_WRONG_VALUE, NO_TAG_ERR, BIT_COUNT_ERR, TRANS_ERR, CODE_ERR, COMM_RERR
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
** ��������:
������������������ģ������Զ���������ģʽ�����úú�ģ�鲻��ȥ��ȡ��Ƭ������Ƿ��п�Ƭ����������������п�Ƭ���룬
ģ���Զ���ȡ���ź�ָ��������ݣ��������ź����������ط������������ط�������֮���ٸ��������Ƿ�ִ��haltָ�ע��ط�����ʱ��
�����Ƭ���ÿ�,��ֻ�е�һ�μ�⵽ʱ�Żط����ݣ�����ƬָʾINT_OUTһֱ��Ч��Ϊ�͵�ƽ����
�ڻط�����֮ǰ��INT_OUT���õͣ�5ms�����ݷ�����
����Ƭ������������ʱ��ģ��ָʾ��һֱ����ָʾ����ƬָʾINT_OUTһֱΪ�͵�ƽ��
�Զ�Ѱ������ᱣ�浽�ڲ�E2ROM�У����籣�档��һ���ϵ���߸�λ�������Ч��
����ģ�鷢���κθ�ʽ�Ϸ�������(��SetDetectCard����)ʱ��ģ���˳��Զ�����ģʽ��

**
** �䡡��: 
(1)	ReqCode--������루1�ֽڣ���		0x00--IDLE
							    	0x01--ALL
(2)	HaltEn --��֤���1�ֽڣ���	    0--��ȡ��Ƭ��ִ��halt
							    	1--��ȡ��Ƭ��ִ��halt
(3)	Block--��Ҫ��ȡ����ʼ��ţ�1�ֽڣ���	S50��0~63	S70��0~255			 Block=����*4+��ǰ�����Ŀ��
(4)	BlockNum-��Ҫ��ȡ�Ŀ����������ȡֵ3�����һ�ζ�ȡ3�顣����Ҫ��֤һ�ζ�ȡ�����п���ͬһ�����ڣ������������ش���
	            
** �䡡��:  ��

             ����п�������ģ�齫�����ط���������
DATA[0]�� *SnrLen�����ؿ�Ƭ���кŵĳ��ȣ�4��7��
DATA[1.. 1+ SnrLen]�� *Snr�����ؿ�Ƭ�����кţ�4�ֽڻ�7�ֽڣ�Mifare1 S50��S70��Light��4�ֽڣ�Mifare0 UltraLight��Mifare3 Desfire��7�ֽڡ�
DATA[2+ SnrLen..]�� ָ��������ݣ������趨��ȡ�Ŀ�������������16/32/48�ֽڡ�

**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK, MI_WRONG_VALUE, NO_TAG_ERR, BIT_COUNT_ERR, TRANS_ERR, CODE_ERR, COMM_RERR
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
** ��������: ����������ѡ����Ϊ����״̬�����Ҫ��������ѡ����Ӧ��ALLģʽ����TX_Request���
**           ���Ҫ��������ѡ��,Ҳ���Խ����뿪���߲������ٽ��룬��ִ�и�λ����TX_Reset()��
**           �������ʹ��TX_Request()��TX_Halt()����������һ���Կ۷ѣ��翨�����Ӧ����ֻ��һ�Σ�һԪǮ����
**           �뿪���´ν����ٿ�һ�Σ������ڸ�Ӧ����ͣ��ʱ��ϳ���Ҳ����۶�һ�Ρ�
**
** �䡡��: ��
**
** �䡡��: ��
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��COMM_ERR
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
** ��������: �˺������ر�TXģ�飬ָʾ��Ϩ�����߲������ز��źţ�ģ�����ĵĵ�����С���ڴ�״̬�ڣ�
**           ģ�鲻��ʹ�á���Ҫ����ʹ��ģ�飬��Ҫ����TX_Config()������TXģ�����½������á�
**
** �䡡��:  ��          
**
** �䡡��:  ��
**
** ��������: OK��COMM_ERR
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
** ��������: �ú���ʹģ���ϵ���Ƶ��·�رգ��رյ�ʱ���ɲ���Msecָ������Msec=0����Ƶ��·��һֱ���ڹر�״̬��
**            һֱ����һ��TX_Request��������ر���Ƶ��·��ʹ�����ڵ����п���λ��
**  
** �䡡��: Msec��ȡֵ0~255��ģ������Ƶ��·�ر�ʱ�䣨��ms����Ϊ��λ����Msec��0ʱ��һֱ�رա� 
**
** �䡡��: ��
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��COMM_ERR�е�ĳһ����
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
** ��������: ��ģ����������ģʽ�������á�ģ��Ĭ��ΪTX1��TX2ͬʱ������
Ĭ�ϳ���Ĭ���趨Ϊ0x03,ͬʱ������ֻҪҪ����˫���߲���ʱ���Ż�ʹ�õ��ú������������л���     
����ʽģ�鲻֧�ָú���	 ��
**  
** �䡡��:TxMode:��������ģʽ��0x00= TX1��TX2�رգ�0x01=TX1������0x02 = TX2������0x03 = TX1��TX2ͬʱ������ 
**
** �䡡��: ��
**
** ��������: TXģ��ִ��������״̬
**           ���ܵ�״ֵ̬���£�OK��QUIT��COMM_ERR�е�ĳһ����
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
** ��������: ��ȡTXģ�����Ϣ��
**
** �䡡��:  ��          
**
** �䡡��:  ģ�����Ϣ*Info��InfoΪ������Ϣ�ռ���׵�ַ��Info[0]��Info[4]Ϊģ�����ͱ�ʶ��
**          Info[5]��Info[8]Ϊ����оƬ�����кţ�Info[9]Ϊ�̼��汾�ţ�
**          ����λΪ�汾�ŵ�������ȡֵ��1��15������λΪ�汾�ŵ�С����ȡֵ��0��9��
**
** ��������: OK��QUIT��COMM_ERR
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







	
