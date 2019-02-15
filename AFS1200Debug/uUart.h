
#ifndef uUartH
#define uUartH

#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
#include <ExtCtrls.hpp>

#include "XComDrv.hpp"

class TfrmUart : public TForm
{
__published:	// IDE-managed Components
    TXComm *XComm1;
    void __fastcall FormCreate(TObject *Sender);
private:	// User declarations
    void __fastcall ClearSend(void);
    void __fastcall SendCRC(void);
    void __fastcall CreateOrder(BYTE b4,BYTE b5,BYTE b6,BYTE b8);
    void __fastcall ScanCmd(BYTE b3,BYTE b5,BYTE b9,BYTE b10,BYTE b4 = 0x02);


public:		// User declarations
    __fastcall TfrmUart(TComponent* Owner);
    bool __fastcall SendCommand(int iIndex,int param,int iDelay);
    void __fastcall OpenDevice(void);
    void __fastcall CloseDevice(void);
    void __fastcall InitDevice();
    void __fastcall ReceiveData();
    bool __fastcall WriteID(BYTE *buf,int iblock);
    TMemo *m;
    void __fastcall DisplayData(int istyle,char buf[],int icount);
};
extern PACKAGE TfrmUart *frmUart;

extern bool       m_bQuit;                    // 是否退出系统
extern bool       m_bConnected;               // 是否已经连接串口
extern bool       m_bProcess;                 // 线程正在处理接收到的数据


extern AnsiString m_sBarCode;                 // 读取到的试剂卡条码
extern WORD       dwTCount;                   // 读取的数据个数
extern DWORD      dwTRead[8192];              // 读数的数据内容
extern DWORD       dwBCCount;                  // 读取的条码测试数据个数
extern DWORD      dwBCRead[4096];             // 读数的条码测试数据内容
extern int        dBufCount;
extern int        iScan[30];                  // 扫描头参数
extern int        bHasCard;                   // 是否有卡
extern bool       bHasID;                     // 是否有ID卡
extern WORD       dwIDByte;                   // 写入/读取ID卡的字节数
extern BYTE       IDBuf[4096];
extern int  channelm;
extern int     m_iReadModal;        // 1读块 2读扇区
extern bool    m_bReadIC;           // 是否在读IC
//extern BYTE    ICRecvBuf[4096];
extern int     m_iDataCount;

bool LoadDevceParam(void);


namespace BarCode{
/*********************************************************************************************************
** Function name:       Func_BARCODEBITcount(INT8U n,INT8U k)
** Descriptions:        条码值计算
** input parameters:    n :同类数据的个数 k:数据性质(=0 数据视为0；=1数据视为1)
** output parameters:   无
** Returned value:      无
*********************************************************************************************************/
void Func_BARCODEBITcount(int n,
                          int k,
                          int BARCODE_BIT,
                          int BARCODE_BITERR,
                          unsigned int &BarCode);

/*********************************************************************************************************
** Function name:       Func_Barcode_COUNT()
** Descriptions:        条码数值计算
** input parameters:
** output parameters:   无
** Returned value:      无
*********************************************************************************************************/
void Func_Barcode_COUNT(unsigned int &BarCode,
                        WORD ADC_Buffer[],
                        int BARCODE_BIT,        // 1 List
                        int BARCODE_BITERR,     // 条码连续
                        int BARCODE_LENGTH,     // 条码位数
                        int ADC_Pointer         // 全程长度
                        );
const int POINTOFFSET = 10;
}


/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
#endif
