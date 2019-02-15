#include <vcl.h>
#pragma hdrstop

#include <process.h>
#include <IniFiles.hpp>
#include <math.h>
#include <Clipbrd.hpp>
#include <DateUtils.hpp>

#include "uMaintain.h"
#include "uParams.h"
#include "uUart.h"
#include "uAFSData.h"
#include "uIDCardDef.h"
#include "uTypeConvert.h"
#include "uCaptions.h"
#include "uExcel.h"
#include "uSetTC.h"
#include "debug.h"
#include "loadLib.h"

#pragma package(smart_init)
#pragma link "CornerButton"
#pragma link "ErrorPanel"
#pragma link "RespChart"
#pragma link "FillStringGrid"
#pragma link "FillPanel"
#pragma link "CornerPanel"
#pragma link "CalcSDCV"
#pragma link "SizePanel"
#pragma link "PTitle"
#pragma resource "*.dfm"
TfrmMaintain *frmMaintain;

HANDLE TestHandle;
bool m_bPause;
BYTE m_BBlank    = 0;
int  iTestCnt    = 0;                            // 当前测试总数
WORD AData       = 60000;

int  iMouseRow, iMouseCol;
int  channelm = 0;   //单通道是1，五联卡是0

bool bAutoDebug = false;
bool bChkPos,bChkTimes;

__fastcall TfrmMaintain::TfrmMaintain(TComponent* Owner) : TForm(Owner)
{
}

void __fastcall TfrmMaintain::FormClose(TObject *Sender,
      TCloseAction &Action)
{
   frmUart->m = NULL;
}

void __fastcall TfrmMaintain::FormCreate(TObject *Sender)
{
   AnsiString sExePath;
   sExePath = ExtractFilePath(ParamStr(0));
   odt->InitialDir = sExePath;
   sdt->InitialDir = sExePath;
   LoadPeakCalc(cbPeakStyle);
   m_bMAdmin = true;       //本底小数是否显示 2018/09/30
   cb51Click(Button27);
   Button21Click(NULL);

}

void __fastcall TfrmMaintain::FormResize(TObject *Sender)
{
   pQuit->Left = Width - pQuit->Width - 40;      // 按钮面板显示位置调整
   letFile->Width = pFile->Width - 16;
   int iH;
   iH = (p4->Height - p41->Height - p43->Height
        - p421->Height - p441->Height)/2;
   p42->Height = p421->Height + iH;
   p44->Height = p4->Height - p41->Height - p42->Height - p43->Height;
}
                                
void __fastcall TfrmMaintain::FormShow(TObject *Sender)
{
   cbBCClearClick(cbBCClear);
   leCnt->Text    = m_WBCDots;
   cbNumClick(cbNum);
}

int LE2IntDef(TLabeledEdit *le,int iDef)
{
   return le->Text.Trim().ToIntDef(iDef);
}

void TfrmMaintain::SetError(AnsiString asErr)
{
   ep->Caption = asErr;
   ep->Visible = true;
   ep->Enabled = true;
   Timer1->Tag = 0;
   Timer1->Enabled = true;
}

void __fastcall TfrmMaintain::Timer1Timer(TObject *Sender)
{
   Edit1->Text = dBufCount;
}

bool CheckData(TLabeledEdit *tle, BYTE &BH, BYTE &BL)
{
   bool b = true;
   int iVal;
   AnsiString s = tle->Text;
   iVal = s.Trim().ToIntDef(-1);
   if((iVal>=0)&&(iVal<=65535))
   {
      BH = iVal / 256;
      BL = iVal % 256;
   } else b = false;
   return b;
}

bool CheckBYTE(TLabeledEdit *tle, BYTE &B)
{
   bool b = true;
   int iVal;
   AnsiString s = tle->Text;
   iVal = s.Trim().ToIntDef(-1);
   if((iVal>=0)&&(iVal<=255)) B = iVal;
   else b = false;
   return b;
}

////////////////////////////////////////////////////////////////////////////////
//    模块调试
////////////////////////////////////////////////////////////////////////////////
void __fastcall TfrmMaintain::cb51Click(TObject *Sender)
{
   TControl *tc = (TControl *)Sender;
   AnsiString asTemp;
   int iVal;
   if (!m_bConnected) frmUart->OpenDevice();
   if (!m_bConnected)
   {
      SetError("串口通讯失败！");
      return;
   }
   AnsiString s,s1;
   int i,j;
   BYTE b;
   switch(tc->Tag)
   {
   case 13 : frmUart->SendCommand(19,0,500);     // 是否有卡
             if(bHasCard&1) i = 21;                // "有卡"
             else i = 22;                        // "无卡"
             pCard->Caption = GetCaption(i);
             if(bHasCard&2) i = 21;                // "有卡"
             else i = 22;                        // "无卡"
             pCard1->Caption = GetCaption(i);
             break;
   case 14 : frmUart->SendCommand(13,0,500);     // 是否有ID卡
             if(bHasID) i = 21;
             else i = 22;
             pID->Caption = GetCaption(i);
             break;

   case 31 : //frmMenu->ReadIDData("");                // 读ID卡
             //le31->Text   = liID.BarCode;            // ID卡条码
             //eTitle->Text = liID.ReportTitle;        // 项目标题
             break;
   case 41 :
             m_sBarCode = "";
             frmUart->SendCommand(7,0,6000);        // 读试剂卡条码
//             le41->Text = m_sBarCode;
             break;
   case 42 : frmUart->SendCommand(1,0,1000); break; // 读数1
   case 43 : frmUart->SendCommand(3,0,1000); break; // 测量头复位
   case 44 : frmUart->SendCommand(4,0,1000); break; // 测量头到待机位
   case 45 : frmUart->SendCommand(5,0,1000); break; // 读数5

   case 51 : if(!LoadDevceParam()) break;
             le51->Text = m_BCompanyCode;
             le52->Text = m_sCompanyName;
             s.printf("%04d%02d%02dV%d.%d.%d",
                   m_WDevYear,m_BDevMonth,
                   m_BDevDay,m_BDevVer1,
                   m_BDevVer2,m_BDevVer3);
             le53->Text = s;   //版本号
             i = m_WDevSYear/1000 - 1;
             cbType->ItemIndex = i;
             i = m_WDevSYear%1000 + 2000;
             s.printf("%04d%04d",i,m_WDevSNo);
             le55->Text = s;      //仪器编号
             break;
   case 52 : m_BCompanyCode = le51->Text.ToIntDef(m_BCompanyCode);
             m_sCompanyName = le52->Text.Trim();
             for(i=0; i<3; i++)
             for(j=0; j<10; j++)
                m_BCName[i][j] = 0;
             i = 0;
             j = 0;
             s = m_sCompanyName;
             while(s.Length()>0)
             {
                b = s[1];
                m_BCName[i][j] = b;
                j++;
                if(j==10)
                {
                   i++;
                   j = 0;
                }
                s.Delete(1,1);
             }
             s = le55->Text.Trim();
             s1 = s.SubString(1,4);
             m_WDevSYear = s1.ToIntDef(m_WDevSYear)%1000 +  //仪器型号下拉框
                           (cbType->ItemIndex+1)*1000;
             s1 = s.SubString(5,4);
             m_WDevSNo   = s1.ToIntDef(m_WDevSNo);
             frmUart->SendCommand(302,0,500);    // 写
             ::Sleep(500);
             frmUart->SendCommand(312,0,500);    // 写单位名称
             ::Sleep(500);
             frmUart->SendCommand(312,1,500);    // 写单位名称
             ::Sleep(500);
             frmUart->SendCommand(312,2,500);    // 写单位名称
             ::Sleep(500);
             break;
   case 601: frmUart->SendCommand(601,0,500);    // 读测量头电机频率
             let60->Text = iScan[0];
             break;
   case 602: iScan[0] = LE2IntDef(let60,iScan[0]);
             let60->Text = iScan[0];
             frmUart->SendCommand(602,iScan[0],500); // 写测量头电机频率
             break;

   case 611: frmUart->SendCommand(611,0,1000);        // 读X原点-条码
             let61->Text = iScan[1];
             break;
   case 612: iScan[1] = LE2IntDef(let61,iScan[1]);
             let61->Text = iScan[1];
             frmUart->SendCommand(612,iScan[1],1000); // 写X原点-条码
             break;

   case 621: frmUart->SendCommand(621,0,500);        // 读条码长度
             let62->Text = iScan[2];
             break;
   case 622: iScan[2] = LE2IntDef(let62,iScan[2]);
             let62->Text = iScan[2];
             frmUart->SendCommand(622,iScan[2],1000); // 写条码长度
             break;
   case 631: frmUart->SendCommand(631,0,500);        // 读条码1 list
             let63->Text = iScan[3];
             break;
   case 632: iScan[3] = LE2IntDef(let63,iScan[3]);
             let63->Text = iScan[3];
             frmUart->SendCommand(632,iScan[3],1000); // 写条码1 list
             break;
   case 641: frmUart->SendCommand(641,0,500);        // 读条码距离
             let64->Text = iScan[4];
             break;
   case 642: iScan[4] = LE2IntDef(let64,iScan[4]);
             let64->Text = iScan[4];
             frmUart->SendCommand(642,iScan[4],500); // 写条码距离
             break;
   case 651: frmUart->SendCommand(651,0,500);        // 读条码放大倍数
             let65->Text = iScan[5];
             break;
   case 652: iScan[5] = LE2IntDef(let65,iScan[5]);
             let65->Text = iScan[5];
             frmUart->SendCommand(652,iScan[5],500); // 写条码放大倍数
             break;

   case 661: frmUart->SendCommand(661,0,500);        // 读X原点-测试
             let66->Text = iScan[6];
             break;
   case 662: iScan[6] = LE2IntDef(let66,iScan[6]);
             let66->Text = iScan[6];
             frmUart->SendCommand(662,iScan[6],500); // 写X原点-测试
             break;
   case 671: frmUart->SendCommand(671,0,500);        // 读测试窗口长度
             let67->Text = iScan[7];
             break;
   case 672: iScan[7] = LE2IntDef(let67,iScan[7]);
             let67->Text = iScan[7];
             frmUart->SendCommand(672,iScan[7],500); // 写测试窗口长度
             break;
   case 681: frmUart->SendCommand(681,0,500);        // 读条形连续
             let68->Text = iScan[8];
             break;
   case 682: iScan[8] = LE2IntDef(let68,iScan[8]);
             let68->Text = iScan[8];
             frmUart->SendCommand(682,iScan[8],500); // 写条形连续
             break;
   case 691: frmUart->SendCommand(691,0,500);        // 读测试放大倍数
             let69->Text = iScan[9];
             break;
   case 692: iScan[9] = LE2IntDef(let69,iScan[9]);
             let69->Text = iScan[9];
             frmUart->SendCommand(692,iScan[9],500); // 写测试放大倍数
             break;
   case 701: frmUart->SendCommand(701,0,500);    // 读测量头电机频率
             let70->Text = iScan[10];
             break;
   case 702: iScan[10] = LE2IntDef(let70,iScan[10]);
             let70->Text = iScan[10];
             frmUart->SendCommand(702,iScan[10],500);// 写测量头电机频率
             break;
   case 711: frmUart->SendCommand(711,0,500);        // 读试剂卡颜色
             cb71->ItemIndex = iScan[11];
             break;
   case 712: iScan[11] = cb71->ItemIndex;
             frmUart->SendCommand(712,iScan[11],500); // 写试剂卡颜色
             break;
   case 721: frmUart->SendCommand(721,0,500);        // 读电机锁步
             cb72->Checked = iScan[12];
             break;
   case 722: iScan[12] = cb72->Checked;
             frmUart->SendCommand(722,iScan[12],500); // 写电机锁步
             break;
   case 731: frmUart->SendCommand(731,0,500);    // 读电机加速步数
             let73->Text = iScan[13];
             break;
   case 732: iScan[13] = LE2IntDef(let73,iScan[13]);
             let73->Text = iScan[13];
             frmUart->SendCommand(732,iScan[13],500);// 写电机加速步数
             break;
   case 741: frmUart->SendCommand(741,0,500);    // 读电机加速频率
             let74->Text = iScan[14];
             break;
   case 742: iScan[14] = LE2IntDef(let74,iScan[14]); // 写电机加速频率
             let74->Text = iScan[14];
             frmUart->SendCommand(742,iScan[14],500);
             break;
   case 751: frmUart->SendCommand(751,0,500);    // 读低速频率
             let75->Text = iScan[15];
             break;
   case 752: iScan[15] = LE2IntDef(let75,iScan[15]);// 写低速频率
             let75->Text = iScan[15];
             frmUart->SendCommand(752,iScan[15],500);
             break;
   case 761: frmUart->SendCommand(761,0,500);    // 读低速次数
             let76->Text = iScan[16];
             break;
   case 762: iScan[16] = LE2IntDef(let76,iScan[16]);// 写低速次数
             let76->Text = iScan[16];
             frmUart->SendCommand(762,iScan[16],500);
             break;
			 
			 
    case 801:                                         //读光路步长
	{
        unsigned int channal = LE2IntDef(LabeledEdit1, 0);
        frmUart->SendCommand(801, (channal << 16), 500);
        LabeledEdit3->Text = iScan[20];
        break;
	}
    case 802:                                         //写光路步长
	{
        unsigned int channal = LE2IntDef(LabeledEdit1, 0);
        iScan[20] = LE2IntDef(LabeledEdit3, iScan[20]);
        LabeledEdit3->Text = iScan[20];
        frmUart->SendCommand(802, iScan[20] + (channal << 16), 500);
        break;
	}
    case 811:                                        //读X轴匀速频率
	{
        unsigned int channal = LE2IntDef(LabeledEdit1, 0);
        frmUart->SendCommand(811, (channal << 16), 500);
        LabeledEdit2->Text = iScan[21];
        break;
	}
    case 812:                                       //写X轴匀速频率
	{
        unsigned int channal = LE2IntDef(LabeledEdit1, 0);
        iScan[21] = LE2IntDef(LabeledEdit2, iScan[21]);
        LabeledEdit2->Text = iScan[21];
        frmUart->SendCommand(812, iScan[21] + (channal << 16), 500);
            break;
	}
    case 821:                                      //读X轴扫码窗口
	{

        frmUart->SendCommand(821, 0, 500);
        LabeledEdit5->Text = iScan[22];
        LabeledEdit4->Text = iScan[22];
        break;
	}
    case 822:                                     //写X轴扫码窗口
	{

        iScan[22] = LE2IntDef(LabeledEdit5, iScan[22]);
        LabeledEdit5->Text = iScan[22];
        frmUart->SendCommand(822, iScan[22], 500);
        LabeledEdit5->Text = iScan[22];
        LabeledEdit4->Text = iScan[22];
        break;
	}

    case 851:                              //走光路盒
        {
            unsigned int channal = LE2IntDef(LabeledEdit1, 0);
            if(channal == 16)
            {
                CheckBox1->State = cbGrayed;
                channelm = 1;//单通道是1 ，被勾选
                ep->Visible = false;
            }
            else
            {
                CheckBox1->State = cbUnchecked;
                channelm = 0;//五联卡是0，不勾选
                ep->Visible = false;
            }
            frmUart->SendCommand(851, channal<<16, 500);
            break;
        }
     case 852:                                  //Y轴丢卡
        frmUart->SendCommand(852, 0, 500);
        break;

    case 871:
       frmUart->SendCommand(871, 0, 2000);
       LabeledEdit7->Text = iScan[27];
       break;
    case 872:
       iScan[27] = LE2IntDef(LabeledEdit7, iScan[27]);
       LabeledEdit7->Text = iScan[27];
       frmUart->SendCommand(872, 0, 2000);
       break;
    case 873:
       frmUart->SendCommand(873, 0, 2000);
       LabeledEdit8->Text = iScan[28];
       break;
    case 874:
       iScan[28] = LE2IntDef(LabeledEdit8, iScan[28]);
       LabeledEdit8->Text = iScan[28];
       frmUart->SendCommand(874, 0, 2000);
       break;


   case 911: frmUart->SendCommand(611,0,500);        // 读X原点-条码
             letbc1->Text = iScan[1];
             break;
   case 912: iScan[1] = LE2IntDef(letbc1,iScan[1]);
             letbc1->Text = iScan[1];
             frmUart->SendCommand(612,iScan[1],500); // 写X原点-条码
             break;

        
   case 951: frmUart->SendCommand(651,0,500);        // 读条码放大倍数
             letbc2->Text = iScan[5];
             break;
   case 952: iScan[5] = LE2IntDef(letbc2,iScan[5]);
             letbc2->Text = iScan[5];
             frmUart->SendCommand(652,iScan[5],500); // 写条码放大倍数
             break;

     }
}
void __fastcall TfrmMaintain::SetEnable(TPanel *p,bool b)
{
   TControl *tc;
   for(int i=0; i<p->ControlCount; i++)
   {
      tc = p->Controls[i];
      tc->Enabled = b;
   }
}

void __fastcall TfrmMaintain::WaitDelay(int iDelay)
{
   TTime t1 = Now();
   int iDelays = iDelay * 1000;
   while(bTesting&&MilliSecondsBetween(t1,Now())<iDelays)
   {
      Application->ProcessMessages();
   }
}

////////////////////////////////////////////////////////////////////////////////
// 重复性测试
////////////////////////////////////////////////////////////////////////////////
void __fastcall TfrmMaintain::cbtAddClick(TObject *Sender)
{
   if (!m_bConnected) frmUart->OpenDevice();
   if (!m_bConnected)
   {
      SetError("串口通讯失败！");
      return;
   }
   SetEnable(p41,false);
   TControl *tc =(TControl *)Sender;
   double dwMax;
   int iTCnt,iCol,iCards,iCDelay,iTDelay;
   switch(tc->Tag){
   case 0 : frmUart->SendCommand(3,0,0);         // 加卡待机位
            break;
   case 1 : frmUart->SendCommand(852, 0, 500);   // 丢卡
            break;
   case 2 :
            m_sBarCode = "";
            frmUart->SendCommand(7, 0, 6000);         // 读试剂卡条码
            //letBC->Text = m_sBarCode;
            letbc3->Text= m_sBarCode;
            break;
   case 3 :
            //首先判断试剂卡与光路盒的位置是否匹配
//              frmUart->SendCommand(19,0,500);    // 是否有卡
//             if(bHasCard&1 &&                   //为真表明有五连卡
//             CheckBox1->State == cbGrayed)
//             {
//                SetError("请确认当前通道位置与试剂卡是否匹配！");
//                break ;
//             }
//             if(bHasCard&2 &&                   //为真表明有单通道卡
//             CheckBox1->State == cbUnchecked)
//              {
//                SetError("请确认当前通道位置与试剂卡是否匹配！");
//                break ;
//             }

            iTCnt    = cbCount->Text.ToIntDef(1);// 每卡测试次数
            iCards   = cbCards->Text.ToIntDef(1);// 总的卡数
            iCDelay  = cbCardDelay->Text.ToIntDef(10); // 卡间间隔
            iTDelay  = cbDelay->ItemIndex;        // 卡内间隔
            bTesting = (iTCnt>1)||(iCards>1);
            cbtTest->Visible = !bTesting;        // 多次测试时隐藏测试按钮
            cbtStop->Visible = bTesting;         // 多次测试时显示停止按钮
            cbtStop->Enabled = bTesting;         // 允许按停止按钮
            for(int k=0; k<iCards; k++)
            {
               for(int j=0; j<iTCnt; j++)
               {
                  dwTCount = 0;                       // 测量数据清空
                  memset(dwTRead,0,sizeof(dwTRead));  // 数据缓冲区初始化
                  frmUart->SendCommand(5,0,6000);        // 读数
                  iCol = sgTest->ColCount-1;          // 数据列表列号

                  if (dwTCount == 0)
                  {
                      dwTCount = 0;
                  }

                  if(m_bReversal)                     // 读数反转
                     for(int i=0; i<dwTCount; i++)       // 数据反转
                     {
                        dwTRead[i] = m_wRevVal - dwTRead[i];
                     }
                  for(int i=0; i<dwTCount; i++)       // 将数据填入数据表格
                  {
                     sgTest->Cells[iCol][i+1] = dwTRead[i];
                  }



                  sgTest->ColCount++;                 // 列数+1
                  sgCalc->ColCount++;
                  sgTest->Cells[iCol+1][0]=iCol+1;    // 列标题
                  sgTest->AutoColHeader = true;
                  sgCalc->AutoColHeader = true;
                  rc->AppendLine(NULL,(char *)dwTRead,dwTCount);
                  rc->ActiveLine = iCol;
                  AFSHead.wLines = rc->CurrentLine;
                  CalcSingleData(dwTRead,iCol);
                  CalcCVs();
                  rc->Repaint();
                  rc->DrawAllLine();
                  if(!bTesting)              // 如果按下停止按钮结束读数
                  {
                     j = iTCnt;
                     k = iCards;
                     break;
                  }
                  if(j<iTCnt-1) WaitDelay(iTDelay);
                  if(!bTesting)                       // 如果按下停止按钮结束读数
                  {
                     j = iTCnt;
                     k = iCards;
                     break;
                  }
               }
               if(cbAutoThrow->Checked||              // 测完自动丢卡
                  (iCards>1) )                        // 或者连续测试多张卡
                  frmUart->SendCommand(852, 0, 500);   // 丢卡
               frmUart->SendCommand(3,0,3000);           // 加卡待机位;
//               else
//                cbtAddClick(cbtAdd);              // 不丢卡就伸出来卡舌
               if(k<iCards-1) WaitDelay(iCDelay);
            }
            cbtTest->Visible = true;             // 显示测试按钮
            SetEnable(p41,true);
            cbtStop->Visible = false;            // 隐藏停止按钮
            // cbtTest->SetFocus();
            break;
   }
   SetEnable(p41,true);
}

void __fastcall TfrmMaintain::sgTestClick(TObject *Sender)
{
   static int iCol = -1;
   TStringGrid *sg=(TStringGrid *)Sender;
   if(sg->Col==iCol) return;                     // 列号没有变化
   if(sg->Tag==0) sgCalc->Col = sgTest->Col;     // 点的测试数据列表,计算跟着变
   else sgTest->Col = sgCalc->Col;               // 点的计算列表,测试数据跟着变
   if(sgTest->Col<fsgPPos->ColCount)
      fsgPPos->Col = sgTest->Col;
   unsigned long ulIndex;
   iCol = sg->Col;
   if(sg->Cells[iCol][1].IsEmpty()) return;      // 点的列无数据
   rc->ActiveLine = iCol-1;                      // 曲线的活动曲线序号
   DWORD buf[4096];
   for(int j=1; j<sgTest->RowCount; j++)
      buf[j-1] = sgTest->Cells[iCol][j].ToIntDef(0);
   //m_fBreak = StrToFloatDef(leBreak->Text,m_fBreak);
   //leBreak->Text = m_fBreak;
   CalcSingleData(buf,iCol);
}

//-------获取峰值和TC定义-------------------------------------------------------
void __fastcall TfrmMaintain::GetPeakTC(void)
{
   AnsiString asP;
   //int iIndex = cbNum->ItemIndex;
   AFSHead.bPeakCnt = fsgPeak->RowCount-1;       // 峰个数
   for(int i=0; i<AFSHead.bPeakCnt; i++)         // 峰值定义
   {
      AFSHead.wFrom[i] = fsgPeak->Cells[1][i+1].ToIntDef(0);
      AFSHead.wTo[i]   = fsgPeak->Cells[2][i+1].ToIntDef(60);
      AFSHead.wCount[i]= fsgPeak->Cells[3][i+1].ToIntDef(0);
      AFSHead.bCalc[i] = fsgPeak->Cells[4][i+1].ToIntDef(0);
   }
   int iP[6];
   for(int i=0; i<5; i++)                        // 测试值公式定义
   {
      for(int j=0; j<6; j++) iP[j] = 0;
      for(int j=1; j<fsgTC->ColCount-1; j++)
      {
         asP = fsgTC->Cells[j][i+1];
         asP.Delete(1,1);
         iP[j-1] = asP.ToIntDef(0);
      }
      AFSHead.bP1[i] = iP[0];
      AFSHead.bP2[i] = iP[1];
      AFSHead.bP34[i]= iP[2]*16 + iP[3];
      AFSHead.bP56[i]= iP[4]*16 + iP[5];
      asP = fsgTC->Cells[fsgTC->ColCount-1][i+1];
      asP = asP.SubString(1,asP.Pos(":")-1);
      AFSHead.bCalcMode[i] = asP.ToIntDef(255);
   }
}

//------------显示峰值和TC定义
void __fastcall TfrmMaintain::ShowPeakTC(void)
{
   AnsiString asHeader,asRatio;
   TStrings *tsHeader = new TStringList;         // 行标题列表
   BYTE bCols;
   BPeakCount = 0;                               // 有效峰值个数
   fsgPeak->RowCount = AFSHead.bPeakCnt+1;
   for(int i=0; i<AFSHead.bPeakCnt; i++)         // 峰值定义
   {
      fsgPeak->Cells[1][i+1] = AFSHead.wFrom[i]; // 峰值起点
      fsgPeak->Cells[2][i+1] = AFSHead.wTo[i];   // 峰值终点
      fsgPeak->Cells[3][i+1] = AFSHead.wCount[i];// 取峰个数
      fsgPeak->Cells[4][i+1] = AFSHead.bCalc[i]; // 计算方式
      if(AFSHead.wCount[i]>0)                    // 有效峰值点
      {
         asHeader.printf("X%d",i+1);
         tsHeader->Append(asHeader);             // 行标题
         BPeakCount++;                           // 有效峰值个数
      }
      fsgPPos->Cells[0][i+1]="X" + IntToStr(i+1);
   }
   int iP[6],iMode;
   AnsiString asP[6];
   bCols = fsgTC->ColCount;
   for(int i=0; i<5; i++)                        // 测试值公式
   {
      for(int j=1; j<bCols; j++)                 // 清空计算项和公式内容
         fsgTC->Cells[j][i+1] = "";
      iP[0] = AFSHead.bP1[i];                    // 第1计算项序号
      iP[1] = AFSHead.bP2[i];                    // 第2计算项序号
      iP[2] = AFSHead.bP34[i]/16;                // 第3计算项序号
      iP[3] = AFSHead.bP34[i]%16;                // 第4计算项序号
      iP[4] = AFSHead.bP56[i]/16;                // 第5计算项序号
      iP[5] = AFSHead.bP56[i]%16;                // 第6计算项序号
      iMode = AFSHead.bCalcMode[i];              // TC计算方式
      for(int j=0; j<bCols-2; j++)               // 显示个计算项名称
      {
         asP[j].printf("X%d",iP[j]);
         if(asP[j].Pos("X0")==0)
            fsgTC->Cells[j+1][i+1] = asP[j];
      }
      if(iMode!=255)
      {
         asHeader = GetTCFormula(iP,3,iMode);
         fsgTC->Cells[bCols-1][i+1] = asHeader;
         iMode = asHeader.Pos(":");
         asHeader.Delete(1,iMode);
         tsHeader->Append(asHeader);             // 行标题
      }
   }
   if(m_bMAdmin) tsHeader->Append(GetCaption(41));// 本底
   sgCalc->RowCount       = tsHeader->Count + 1; // 计算表行数
   sgCalc->HeaderRow->Text= tsHeader->Text;      // 计算表行标题
   sgCalc->AutoRowHeader  = false;
   sgCV->RowCount         = tsHeader->Count + 1; // CV表行数
   sgCV->HeaderRow->Text  = tsHeader->Text;      // CV表行标题
   sgCV->AutoRowHeader    = false;
   delete tsHeader;
   int iRowH;
   iRowH = sgCalc->DefaultRowHeight + 1;         // 计算结果表格的行数
   p33->Height  = sgCalc->RowCount*iRowH + 4;    // 区域高度
   sgTest->Repaint();
   sgCalc->Repaint();
   sgCV->Repaint();
}

void __fastcall TfrmMaintain::CalcSingleData(DWORD *dw,int iIndex)
{
   DWORD dwDeno,dwNume;
   ID_PEAKRESULT pr;
   POCT_ITEM     pi;
   DWORD         dwBlank;
   BYTE bDeno,bNume;
   int iPC=0,iBP;
   AnsiString asTC,asPeak;
   memset(&pi,0,sizeof(pi));
   GetPeakTC();                                  // 获取峰值和TC定义
   for(int j=0; j<AFSHead.wDots;  j++)           // 逐点取数显示
      sgTest->Cells[iIndex][j+1] = dw[j];
   for(int j=0; j<AFSHead.bPeakCnt; j++)         // 计算当前曲线峰值
   if(AFSHead.wCount[j]>0)
   {
      pi.Peaks[j].From = AFSHead.wFrom[j];
      pi.Peaks[j].To   = AFSHead.wTo[j];
      pi.Peaks[j].Count= AFSHead.wCount[j];
      pi.Peaks[j].Style= AFSHead.bCalc[j];
      iPC++;
   }
   for(int i=0; i<5; i++)
   {
      pi.SIs[i].CalcPosi[0] = AFSHead.bP1[i];
      pi.SIs[i].CalcPosi[1] = AFSHead.bP2[i];
      pi.SIs[i].CalcPosi[2] = AFSHead.bP34[i]/16;
      pi.SIs[i].CalcMode    = AFSHead.bCalcMode[i];
   }
   iBP = cbBP->ItemIndex + 1;
   rc->PeakDefs->Text = "";                      // 清除曲线峰值定义
   for(int i=0; i<cbNum->Text.ToInt(); i++)      // 设置曲线峰值定义参数
   {
      asPeak.printf("%d,%d,%d,%d,%d",i,
                    AFSHead.wFrom[i],
                    AFSHead.wTo[i],
                    AFSHead.wCount[i],
                    cbPeakStyle->ItemIndex);
      rc->PeakDefs->Append(asPeak);
   }
   rc->Repaint();

   call_calcPeak(dw,AFSHead.wDots,pi.Peaks,iPC,iBP,1,&dwBlank,&pr);       // 自动追峰求峰值


   if(fsgPPos->ColCount<iIndex+1)
      fsgPPos->ColCount = iIndex + 1;
   fsgPPos->Cells[iIndex][0] = iIndex-1;
   for(int i=0; i<iPC; i++)
      fsgPPos->Cells[iIndex][i+1]=pr.Position[i];
   rc->SetPeakRes((char *)&pr);
   for(int j=0; j<10; j++)                       // 计算当前曲线峰值
   if(AFSHead.wCount[j]>0)
   {
      asTC.printf("%20.0f",pr.Value[j]);
      sgCalc->Cells[iIndex][j+1] = asTC.Trim();
   }
   float fTC;
   for(int j=0; j<5; j++)                        // 计算各个TC值
   {
      fTC  = CalcItemTC(pi,pr,j);
      asTC = Float2StrA(fTC,4);
      sgCalc->Cells[iIndex][j+BPeakCount+1] = asTC.Trim();
   }
   if(m_bMAdmin)
      sgCalc->Cells[iIndex][sgCalc->RowCount-1] = dwBlank;//显示本底值 2018/09/30
}

void __fastcall TfrmMaintain::CalcCVs(void)
{
   TStrings *tsV = new TStringList;
   float fMax,fMin;
   float fAvg,fCV,fRMS,fTotal,fValue,fTotal2;
   AnsiString asTC, asValue;
   int iDec;
   for(int i=1; i<sgCalc->RowCount; i++)         // 计算CV值
   {
      fMax   = 0;
      fMin   = 0xffffffff;
      fTotal = 0;
      fTotal2= 0;
      tsV->Clear();
      for(int j=0; j<AFSHead.wLines; j++)
      {                                           
         asValue= sgCalc->Cells[1+j][i];
         fValue = StrToFloatDef(asValue,0);
         if(fValue>fMax) fMax = fValue;          // 最大值
         if(fValue<fMin) fMin = fValue;          // 最小值
         fTotal += fValue;                       // 和
         fTotal2+= (fValue*fValue);              // 平方和
         tsV->Append(sgCalc->Cells[1+j][i]);     // 用来计算CV
      }
      if(i<BPeakCount+1)                         // Peak最大最小值
      {
         asTC.printf("%20.0f",fMax);
         sgCV->Cells[4][i] = asTC.Trim();
         asTC.printf("%20.0f",fMin);
         sgCV->Cells[5][i] = asTC.Trim();
      } else                                     // TC最大最小值
      {
         sgCV->Cells[4][i] = Float2StrA(fMax,4);
         sgCV->Cells[5][i] = Float2StrA(fMin,5);
      }
      if(AFSHead.wLines==0) asTC = "*";          // 平均值
      else {
         fAvg = fTotal/AFSHead.wLines;
         if( (i<BPeakCount+1) ||                 // 峰值平均值小数
             ((i==sgCV->RowCount-1)&&m_bMAdmin)) // 本底平均值小数
            iDec = 1;
         else iDec = 5;                          // TC平均值小数
         asTC = Float2StrA(fAvg,iDec);
      }
      sgCV->Cells[1][i] = asTC.Trim();
      if(fTotal==0) asTC = "*";                  // 标准偏差
      else {
         CalcSDCV1->Datas->Text = tsV->Text;
         CalcSDCV1->CalcSDCV();
         asTC = Float2StrA(CalcSDCV1->SD,4);
      }
      sgCV->Cells[2][i] = asTC.Trim();
      if(fTotal==0) asTC = "*";                  // 计算CV
      else {
         CalcSDCV1->Datas->Text = tsV->Text;
         CalcSDCV1->CalcSDCV();
         asTC = Float2StrA(CalcSDCV1->CV,4);
      }
      sgCV->Cells[3][i] = asTC.Trim();
   }
   delete tsV;
}

void __fastcall TfrmMaintain::cbtOpenClick(TObject *Sender)
{
   odt->Filter     = ".AFS";
   if(!odt->Execute()) return;                   // 打开AFS文件
   AnsiString asName,asFName;
   asFName = odt->FileName;                      // 文件名
   if( (!IsAFSFile(asFName)) &&
       (!IsAFSOldFile(asFName)) ) return;
   letFile->Text = asFName;
   LoadAFSTestFile(asFName,rc);                  // 装入测试数据
   AnsiString asBar = "     ",asHeader;          // 条码,标题名称
   memcpy(asBar.c_str(),AFSHead.bBar,5);
   //letBC->Text = asBar;                          // 项目条码
   ShowPeakTC();                                 // 显示峰值和TC定义
   fsgPPos->ColCount = 2;
   sgTest->RowCount = AFSHead.wDots + 1;         // 测试数据行数为点数+1
   sgTest->ColCount = AFSHead.wLines+ 2;         // 测试数据列表列数
   sgCalc->ColCount = AFSHead.wLines+ 2;         // 计算TC数据列表列数
   sgTest->ClearAllData();                       // 清空测试数据列表
   sgCalc->ClearAllData();                       // 清空TC数据列表
   unsigned long ulIndex, ulCnt;
   DWORD *dw;
   AnsiString asTC;
   ulCnt    = AFSHead.wDots*4;
   dwTCount = AFSHead.wDots;
   dw       = (DWORD *)malloc(ulCnt);
   for(int i=0; i<AFSHead.wLines; i++)           // 逐个曲线显示数据
   {
      ulIndex = i * AFSHead.wDots;               // 单个曲线数据区位置
      memcpy(dw,&rc->dwFRead[ulIndex],ulCnt);    // 复制当前取数曲线的数据
      CalcSingleData(dw,i+1);                    // 计算单个曲线数据
   }
   free(dw);
   CalcCVs();                                    // 计算CV
   sgTest->Row = 1;
   sgTest->Col = 1;
   sgTestClick(sgTest);
   sgTest->AutoRowHeader  = true;
   sgTest->AutoColHeader  = true;
   sgCalc->AutoColHeader  = true;
   cbtTxt->Enabled        = true;
   cbtCalc->Enabled       = true;
   btnDel->Enabled        = true;
   cbtSave->Enabled       = true;
   cbtCalcClick(cbtCalc);
}

void __fastcall TfrmMaintain::cbtSaveClick(TObject *Sender)
{
   AnsiString asFName,asBC,asN,asD,asExt;
   FILE *f;
   AnsiString asLead = "AFSHEAD";
   asFName = letFile->Text.Trim();
   if(asFName.IsEmpty())
   {
      sdt->Filter =  "AFS|.AFS";
      if(!sdt->Execute()) return;
      asFName = sdt->FileName;
      asExt   = asFName.UpperCase();
      if(asExt.Pos(".AFS")==0)
         asFName = asFName + ".AFS";
   }
   letFile->Text = asFName;
   asBC    = "";
   if(rc->CurrentLine==0)
   {
      SetError(GetCaption(24));                  // "请读数以后再保存!"
      return;
   }
   f = fopen(asFName.c_str(),"wb");
   AFSHead.wLines = rc->CurrentLine;
   AFSHead.wDots  = rc->DotCount;
   memcpy(AFSHead.bLead,asLead.c_str(),asLead.Length());
   while(asBC.Length()<5) asBC = "0"+asBC;
   asBC = asBC.SubString(1,6);
   memcpy(AFSHead.bBar,asBC.c_str(),asBC.Length());
   GetPeakTC();
   ShowPeakTC();
   fwrite(&AFSHead,1,sizeof(AFSHead),f);
   fwrite(rc->dwFRead,4,rc->CurrentLine*rc->DotCount,f);
   fclose(f);
}

void __fastcall TfrmMaintain::cbtNewClick(TObject *Sender)
{
   int iCount;
   iCount = leCount->Text.Trim().ToIntDef(0);
   leCount->Text = iCount;
   if(iCount==0) cb51Click(cb671);               // 读取测试窗口长度
   else {
      m_wDots  = iCount;
      iScan[7] = iCount;
   }
   if(iScan[7]==0) return;
   letFile->Text = "";

   ShowPeakTC();                                 // 显示峰值,T/C
   fsgPPos->ColCount = 2;
   sgTest->ClearAllData();                       // 清除测试数据
   sgCalc->ClearAllData();                       // 清除计算的峰值和T/C数据
   sgTest->ColCount = 2;
   sgCalc->ColCount = 2;
   sgCV->ClearAllData();                         // 清除CV表格数据
   AFSHead.wDots    = iScan[7];                  // 点数
   AFSHead.wLines   = 0;                         // 曲线数
   rc->DotCount     = AFSHead.wDots;             // 曲线点数
   sgTest->RowCount = AFSHead.wDots + 1;
   rc->Initialize(255,AFSHead.wDots);            // 初始化曲线
   AnsiString asPeak;
   rc->PeakDefs->Text = "";                      // 清除曲线峰值定义
   for(int i=0; i<cbNum->Text.ToInt(); i++)      // 设置曲线峰值定义参数
   {
      asPeak.printf("%d,%d,%d,%d,%d",i,
                    AFSHead.wFrom[i],
                    AFSHead.wTo[i],
                    AFSHead.wCount[i],
                    cbPeakStyle->ItemIndex);
      rc->PeakDefs->Append(asPeak);
   }
   rc->Repaint();
   sgTest->AutoRowHeader  = true;
   sgTest->AutoColHeader  = true;
   sgCalc->AutoColHeader  = true;
   btnDel->Enabled        = true;
   SetEnable(p41,true);
}

void __fastcall TfrmMaintain::mDblClick(TObject *Sender)
{
   m->Lines->Clear();
}

void __fastcall TfrmMaintain::cbtCalcClick(TObject *Sender)
{
   DWORD buf[4096];
   AnsiString asV;
   GetPeakTC();
   ShowPeakTC();
   for(int i=1; i<sgTest->ColCount; i++)
   {
      asV = sgTest->Cells[i][1].Trim();
      if(asV.ToIntDef(-1)<0) continue;
      for(int j=1; j<sgTest->RowCount; j++)
         buf[j-1] = sgTest->Cells[i][j].ToIntDef(0);
      CalcSingleData(buf,i);
   }
   CalcCVs();
}

void __fastcall TfrmMaintain::cbBCClearClick(TObject *Sender)
{
   int iCnt = leCnt->Text.ToIntDef(m_WBCDots);
   leCnt->Text = iCnt;
   sgBC->RowCount = iCnt+1;//3525;
   sgBC->ClearAllData();                         // 清除条码数据表
   sgBC->ColCount = 2;
   sgBC->AutoColHeader = true;
   sgBC->AutoRowHeader = true;
   rcBC->DotCount = iCnt+1;//3524;                        // 曲线点数
   rcBC->Initialize(255,iCnt+1);//3524);                   // 初始化曲线
   rcBC->Repaint();
}

void __fastcall TfrmMaintain::cbBCTestClick(TObject *Sender)
{
   if (!m_bConnected) frmUart->OpenDevice();
   if (!m_bConnected)
   {
      SetError("串口通讯失败！");
      return;
   }

    //首先判断试剂卡与光路盒的位置是否匹配
//   frmUart->SendCommand(19,0,500);    // 是否有卡
//   if(bHasCard&1 &&                  //为真表明有五连卡
//      CheckBox1->State == cbGrayed
//      || bHasCard == 0)
//   {
//      SetError("请确认当前通道位置与试剂卡是否匹配！");
//      return ;
//   }
//   if(bHasCard&2 &&                     //为真表明有单通道卡
//      CheckBox1->State == cbUnchecked
//      || bHasCard == 0)
//    {
//      SetError("请确认当前通道位置与试剂卡是否匹配！");
//      return ;
//   }

   int iCol,iStart,iEnd;
   dwBCCount = 0;                                // 条码测试数据清空
   frmUart->SendCommand(6,0,10000);              // 条码调试

   if (dwBCCount > m_WBCDots)
   {
       leCnt->Text = dwBCCount;
       m_WBCDots = dwBCCount;
       Button25Click(0);
       cbBCClearClick(0);
   }


   iCol = sgBC->ColCount-1;                      // 数据列表列号
   for(int i=0; i<dwBCCount; i++)                // 将数据填入数据表格
   {
      sgBC->Cells[iCol][i+1] = dwBCRead[i];
   }
   sgBC->ColCount++;                             // 列数+1



   rcBC->AppendLine(NULL,(char *)dwBCRead,dwBCCount);
   rcBC->ActiveLine = iCol;
   rcBC->Repaint();
   sgBC->AutoRowHeader = true;
   iStart = 10;

   while((dwBCRead[iStart]>AData)&&(iStart<dwBCCount))
   {
      iStart++;
   }
   iEnd = iStart;
   while((dwBCRead[iEnd]<AData)&&(iEnd<dwBCCount))
   {
      iEnd++;
   }
   letStart->Text = iStart;
   letEnd->Text   = iEnd - 1;
   letCnt->Text   = iEnd - iStart;
   WORD buf[4096];
   for(int i=0; i<dwBCCount; i++)
      buf[i] = dwBCRead[i];
   DisplayBWidth(buf,dwBCCount);
}

void __fastcall TfrmMaintain::cbCloseClick(TObject *Sender)
{
   //if(!m_bConnected) return;
   //m_bConnected = false;
   frmUart->XComm1->CloseDevice();
}

void __fastcall TfrmMaintain::cbOpenClick(TObject *Sender)
{
   frmUart->OpenDevice();
}

void __fastcall TfrmMaintain::cbMsgClick(TObject *Sender)
{
   if(cbMsg->Checked) frmUart->m = m;
   else frmUart->m = NULL;
}

void __fastcall TfrmMaintain::Button1Click(TObject *Sender)
{
   // 保存条码数据
   AnsiString asfname,ss,s1;
   asfname = lefname->Text.Trim().UpperCase();
   if(asfname.IsEmpty())
   {
      ep->ErrorMsg = GetCaption(25);             // "请输入文件名!"
      return;
   }
   if(asfname.Pos(".TXT")==0) asfname = asfname + ".TXT";
   TStrings *s = new TStringList;
   for(int i=1; i<sgBC->RowCount; i++)
   {
      ss = "";
      for(int j=1; j<sgBC->ColCount; j++)
         ss = ss + sgBC->Cells[j][i] + "\t";
      s->Append(ss);
   }
   s->SaveToFile(asfname);
   delete s;
}

void __fastcall TfrmMaintain::Button2Click(TObject *Sender)
{
   // 读取条码数据
   AnsiString asfname,ss,s1;
   asfname = lefname->Text.Trim().UpperCase();
   if(asfname.IsEmpty())
   {
      ep->ErrorMsg = GetCaption(25);             // "请输入文件名!";
      return;
   }
   if(asfname.Pos(".TXT")==0) asfname = asfname + ".TXT";
   if(!FileExists(asfname))
   {
      ep->ErrorMsg = GetCaption(26);             // "文件不存在!"
      return;
   }
   TStrings *s = new TStringList;
   int ipos,icol;
   s->LoadFromFile(asfname);
   leCnt->Text = s->Count;
   cbBCClearClick(cbBCClear);
   for(int i=0; i<s->Count; i++)
   {
      icol = 1;
      ss   = s->Strings[i];
      while(ss.Length()>0)
      {
         ipos = ss.Pos("\t");
         if(ipos==0) break;
         s1 = ss.SubString(1,ipos-1);
         ss.Delete(1,ipos);
         sgBC->Cells[icol][i+1] = s1;
         if(icol==sgBC->ColCount-1)
            sgBC->ColCount = sgBC->ColCount + 1;
         icol++;
      }
   }
   delete s;
   for(int i=1; i<sgBC->ColCount-1; i++)
   {
      for(int j=1; j<sgBC->RowCount; j++)
      {
         s1 = sgBC->Cells[i][j];
         dwBCRead[j-1] = s1.ToIntDef(0);
      }
      rcBC->AppendLine(NULL,(char *)dwBCRead,sgBC->RowCount-1);
      rcBC->ActiveLine = i-1;
      rcBC->Repaint();
   }
}

void __fastcall TfrmMaintain::sgBCClick(TObject *Sender)
{
   int iCol;
   iCol = sgBC->Col - 1;
   if(sgBC->Cells[iCol][1].IsEmpty()) return;      // 点的列无数据
   rcBC->ActiveLine = iCol;                        // 曲线的活动曲线序号
}

void __fastcall TfrmMaintain::DisplayBWidth(WORD buf[],int iDCnt)
{
   WORD iStart, iEnd;
   AnsiString s;
   WORD iWidth;//, iCnt=1;
   WORD iDir=1;                                // 0代表检测1,1代表检测0
   iStart = 10;
   while((buf[iStart]>AData)&&(iStart<iDCnt))
   {
      iStart++;
   }
   iEnd = iStart;
   while((buf[iEnd]<AData)&&(iEnd<iDCnt))
   {
      iEnd++;
   }
   mBC->Lines->Clear();
   iWidth = iEnd - iStart;
   s.printf("1  From: %3d     To: %3d     Width: %3d",iStart,iEnd,iWidth);
   mBC->Lines->Append(s);
   while( iEnd<iDCnt)
   {
      iStart = iEnd;
      if(iDir==0)
      {
         while((buf[iEnd]<AData)&&(iEnd<iDCnt))
         {
            iEnd++;
         }
      } else
      {
         while((buf[iEnd]>=AData)&&(iEnd<iDCnt))
         {
            iEnd++;
         }
      }
      iWidth = iEnd - iStart;

      iDir = !iDir;
      s.printf("%d  From: %3d     To: %3d     Width: %3d",iDir,iStart,iEnd,iWidth);
      mBC->Lines->Append(s);
   }
}

#define INT16U WORD
#define BARCODE_LENGTH  18                       // 条码BIT
#define BARCODE08_LEN   16                       // 0.8mm条码点数
#define BARCODE10_LEN   20                       // 1.0mm条码点数

void __fastcall TfrmMaintain::Button3Click(TObject *Sender)
{

   DWORD BarCode;                     // 条码
   DWORD  ADC_Pointer;
   WORD  ADC_Buffer[4096];

   // 分析条码数据
   for(int j=1; j<sgBC->RowCount; j++)
      ADC_Buffer[j-1] = sgBC->Cells[sgBC->Col][j].ToIntDef(0);
   ADC_Pointer = sgBC->RowCount-1;

   DisplayBWidth(ADC_Buffer,ADC_Pointer);

    unsigned int bar;
    BarCode::Func_Barcode_COUNT(bar,
                       ADC_Buffer,
                       (CheckBox1->Checked? 20: 100),        // 1 List
                       (CheckBox1->Checked? 12: 60),        // 条码连续
                       18,     // 条码位数
                       ADC_Pointer    // 全程长度
                       ) ;


   /*
   INT16U iStart, iEnd, i;
   INT16U iLen, iWidth, iCnt=0;
   INT16U iDir=1;                                // 0代表检测1,1代表检测0
   INT16U iBarLen;                               // 单个条的宽度
   // 扫描条码开始位置
   BarCode = 0;
   iStart  = 10;                                 // 忽略开始10个点的数据

   while( (ADC_Buffer[iStart]>AData) &&          // 搜索第一个黑条开始位置iStart
          (iStart<ADC_Pointer) )
   {
      iStart++;
   }
   iEnd = iStart;
   while( (ADC_Buffer[iEnd]<AData) &&            // 搜索第一个黑条结束位置iEnd
          (iEnd<ADC_Pointer) )
   {
      iEnd++;
   }
   iLen = iEnd - iStart;                         // 第一个黑条的宽度iLen
   if(iLen>=BARCODE10_LEN-2)                     // 黑条宽度大于1mm宽
      iBarLen = BARCODE10_LEN;                   // 当作1mm宽条码处理
   else
      iBarLen = BARCODE08_LEN;                   // 当作0.8mm条码处理
   iWidth = ( iLen + iBarLen/2 ) / iBarLen;      // 黑条个数
   if(iWidth>1)
   {
      iDir = 0;
      for(int i=1; i<iWidth; i++)                // 第一个黑条不属于条码内容
      {
         if(iCnt<BARCODE_LENGTH)
            BarCode = BarCode*2 + 1 - iDir;
         iCnt++;
      }
      iDir = 1;
   }
   iLen = iBarLen;
   while( (iEnd<ADC_Pointer) &&                  // 解码条码
          (iCnt<BARCODE_LENGTH) )
   {
      iStart = iEnd;
      if(iDir==0)
      {
         while((ADC_Buffer[iEnd]<AData)&&(iEnd<ADC_Pointer))
         {
            iEnd++;
         }
      } else
      {
         while((ADC_Buffer[iEnd]>AData)&&(iEnd<ADC_Pointer))
         {
            iEnd++;
         }
      }
      iWidth = (iEnd - iStart + iLen/2 )/iLen;
      for(int i=0; i<iWidth; i++)
      {
         if(iCnt<BARCODE_LENGTH)
            BarCode = BarCode*2 + 1 - iDir;
         iCnt++;
      }
      iDir++;
      iDir = iDir % 2;
   }
   iLen = (4 - BARCODE_LENGTH%4)%4;
   for(i=0; i<iLen; i++)
      BarCode = BarCode*2;

    */



   AnsiString as10;
   as10.printf("%06X",bar);
   letbc3->Text = as10;
}

void __fastcall TfrmMaintain::cbtStopClick(TObject *Sender)
{
   bTesting = false;
}

void __fastcall TfrmMaintain::cbNumClick(TObject *Sender)
{
   int iPCnt,iBPNo;
   iPCnt = cbNum->ItemIndex + 2;                 // 峰个数
   iBPNo = cbBP->ItemIndex;                      // 基准峰序号
   if(iBPNo<0) iBPNo = 0;
   cbBP->Items->Clear();                         // 清除基准峰列表
   for(int i=1; i<=iPCnt; i++)                   // 添加峰到列表
      cbBP->Items->Append("X"+IntToStr(i));
   if(iBPNo>iPCnt-1) iBPNo = iPCnt-1;            //
   cbBP->ItemIndex   = iBPNo;                    // 显示基准峰
   fsgPeak->RowCount = iPCnt + 1;                // 峰区间定义行数
   fsgPPos->RowCount = iPCnt + 1;                // 峰位置行数
   fsgPPos->ColCount = 2;
   for(int i=1; i<=iPCnt; i++)                   // 峰区间定义峰名称
   {
      fsgPeak->Cells[0][i] = "X" + IntToStr(i);
      fsgPPos->Cells[0][i] = "X" + IntToStr(i);
   }
   LoadPeakDef(m_sConfig,m_wDots,fsgPeak);
   LoadTCDef(m_sConfig,iPCnt,fsgTC);
   GetPeakTC();
   ShowPeakTC();
   AnsiString asPeak;
   rc->PeakDefs->Text = "";                      // 清除曲线峰值定义
   for(int i=0; i<cbNum->Text.ToInt(); i++)      // 设置曲线峰值定义参数
   {
      asPeak.printf("%d,%d,%d,%d,%d",i,
                    AFSHead.wFrom[i],
                    AFSHead.wTo[i],
                    AFSHead.wCount[i],
                    cbPeakStyle->ItemIndex);
      rc->PeakDefs->Append(asPeak);
   }
   rc->Repaint();
   btnSavePeak->Visible = false;
   sgTestClick(sgTest);
}

void __fastcall TfrmMaintain::fsgPeakSetEditText(TObject *Sender, int ACol,
      int ARow, const AnsiString Value)
{
   btnSavePeak->Visible = true;
}

void __fastcall TfrmMaintain::btnSavePeakClick(TObject *Sender)
{
   if(!SavePeakDef(m_sConfig,fsgPeak))
   {
      ep->ErrorMsg = GetCaption(39);             // 请输入正确的峰位置定义
   } else btnSavePeak->Visible = false;
}

void __fastcall TfrmMaintain::cbtTxtClick(TObject *Sender)
{
   if(rc->CurrentLine==0)
   {
      SetError(GetCaption(24));                  // "请读数以后再保存!"
      return;
   }

   sdt->Filter =  "XLS|.AFS";
   if(!sdt->Execute()) return;

   AnsiString asFName,asD,asExt,sTitle;
   FILE *f;
   asFName = sdt->FileName;
   asExt   = asFName.UpperCase();
   if(asExt.Pos(".XLS")==0)
      asFName = asFName + ".xls";
   CreateExcel(asFName);
   // 测试结果
   BookStart("结果");
   NewMergeRow("峰区间定义",5,1);                // 大标题
   for(int i=0; i<fsgPeak->RowCount; i++)
   {
      RowBegin();
      for(int j=0; j<fsgPeak->ColCount; j++)
         RowCell(fsgPeak->Cells[j][i],3);
      RowEnd();
   }
   int iCols = sgCalc->ColCount-1;
   NewMergeRow("每次测试峰值结果",iCols,1);      // 大标题
   for(int i=0; i<sgCalc->RowCount; i++)
   {
      RowBegin();
      for(int j=0; j<sgCalc->ColCount-1; j++)
         RowCell(sgCalc->Cells[j][i],3);
      RowEnd();
   }
   for(int i=1; i<fsgPPos->RowCount; i++)
   {
      RowBegin();
      sTitle.printf("X%d位置",i);
      RowCell(sTitle,3);
      for(int j=1; j<fsgPPos->ColCount; j++)
         RowCell(fsgPPos->Cells[j][i],3);
      RowEnd();
   }
   NewMergeRow("每次测试CV计算",6,1);            // 大标题
   for(int i=0; i<sgCV->RowCount; i++)
   {
      RowBegin();
      for(int j=0; j<sgCV->ColCount; j++)
         RowCell(sgCV->Cells[j][i],3);
      RowEnd();
   }
   iCols = fsgPPos->RowCount;
   NewMergeRow("峰中心位置",iCols,1);            // 大标题
   for(int i=0; i<fsgPPos->ColCount; i++)
   {
      RowBegin();
      for(int j=0; j<fsgPPos->RowCount; j++)
         RowCell(fsgPPos->Cells[i][j],3);
      RowEnd();
   }
   BookEnd();
   // 各个曲线峰值数据
   BookStart("曲线数据");
   for(int i=1; i<sgTest->RowCount; i++)
   {
      RowBegin();
      for(int j=1; j<sgTest->ColCount-1; j++)
         RowCell(sgTest->Cells[j][i],3);
      RowEnd();
   }
   BookEnd();
   CloseExcel();
}

void __fastcall TfrmMaintain::rcDblClick(TObject *)
{
   static int iHeight = 0;
   if(p31->Height==p3->Height)
   {
      p31->Height = iHeight;
   }
   else
   {
      iHeight = p31->Height;
      p31->Height = p3->Height;
   }
}

void __fastcall TfrmMaintain::btnDelClick(TObject *)
{
   // 删除选定的测试列
   DWORD buf[4096];
   int iCol = sgTest->Col;
   if(iCol==sgTest->ColCount-1) return;          // 无数据的列位置不处理
   for(int i=iCol; i<sgTest->ColCount-1; i++)    // 将光标所在列右边的所有列左移一列
   for(int j=1; j<sgTest->RowCount; j++)
      sgTest->Cells[i][j]=sgTest->Cells[i+1][j];
   sgTest->ColCount--;
   sgCalc->ColCount--;
   sgCalc->ClearAllData();
   for(int i=1; i<sgTest->ColCount-1; i++)       // 逐列计算测试值
   {
      for(int j=1; j<sgTest->RowCount; j++)      // 取测试数据
         buf[j-1] = sgTest->Cells[i][j].ToIntDef(0);
   }
   rc->CurrentLine--;
   p41DblClick(p41);
   cbtCalcClick(cbtCalc);
}

void __fastcall TfrmMaintain::cbPeakStyleClick(TObject *)
{
   AnsiString s;
   s = IntToStr(cbPeakStyle->ItemIndex);
   for(int i=1; i<fsgPeak->RowCount; i++)
      fsgPeak->Cells[4][i] = s;
   btnSavePeakClick(btnSavePeak);
   GetPeakTC();
   bool bBase;
   int iIndex = cbPeakStyle->ItemIndex;
   bBase = (iIndex<4)||(iIndex==10);     
   Label6->Visible = bBase;
   cbBP->Visible   = bBase;
   btnSavePeak->Visible = true;
}

void __fastcall TfrmMaintain::btnSaveTCClick(TObject *)
{
   SaveTCDef(m_sConfig,cbNum->ItemIndex+2,fsgTC);
   cbNumClick(cbNum);
   btnSaveTC->Visible = false;
}

void __fastcall TfrmMaintain::Button25Click(TObject *)
{
   m_WBCDots = leCnt->Text.ToIntDef(m_WBCDots);
   SaveComParam();
}

void __fastcall TfrmMaintain::Button26Click(TObject *)
{
   cb51Click(cb51);
   cb51Click(cb601);
   cb51Click(cb611);
   cb51Click(cb621);
   cb51Click(cb631);
   cb51Click(cb641);
   cb51Click(cb651);
   cb51Click(cb661);
   cb51Click(cb671);
   cb51Click(cb681);
   cb51Click(cb691);
   cb51Click(cb6101);
   cb51Click(cb6111);
   cb51Click(cb6121);
   cb51Click(cb6131);
   cb51Click(cb6141);
   cb51Click(cb6151);
   cb51Click(cb6161);
   cb51Click(Button29);
   cb51Click(Button31);
   cb51Click(Button35);

}

void __fastcall TfrmMaintain::btnAutoClick(TObject *)
{
   switch(btnAuto->Tag)
   {
   case 0 : bChkPos    = false;
            bChkTimes  = false;
            bAutoDebug = true;
            btnAuto->Caption = "停止调试";
            btnAuto->Tag = 1;
            break;
   case 1 : bAutoDebug = false;
            btnAuto->Caption = "自动调试";
            btnAuto->Tag = 0;
            break;
   }
}

void __fastcall TfrmMaintain::Timer2Timer(TObject *)
{
   if(!bAutoDebug) return;
   if(bChkPos&&bChkTimes)
   {
      btnAutoClick(btnAuto);
      return;
   }
   Timer2->Enabled = false;

   int iStart,iPos,iCount;//,iEnd,iLen;
   int iXStart;
   cbBCClearClick(cbBCClear);
   cbBCTestClick(cbBCTest); // 测试
   Repaint();
   ::Sleep(1000);
   iCount = m_WBCDots;      // 数据点个数
   iPos   = (iCount - 360)/2;
   iStart = letStart->Text.ToIntDef(0);
   //iEnd   = letEnd->Text.ToIntDef(0);
   //iLen   = letCnt->Text.ToIntDef(0);
   if((iStart<iPos)||(fabs(iPos-iStart)>10)) // 起点位置需要调整
   {
      cb51Click(Button12);
      iXStart = letbc1->Text.ToIntDef(0);
      iXStart = iXStart - iPos + iStart;
      letbc1->Text = iXStart;
      cb51Click(Button13);
      Repaint();
      ::Sleep(1000);
      Timer2->Enabled = true;        
      return;
   } else bChkPos = true;

   bChkTimes = true;
   Timer2->Enabled = true;
}

void __fastcall TfrmMaintain::p41DblClick(TObject *)
{
   int iData;
   for(int i=0; i<rc->LineCount; i++)
   for(int j=0; j<rc->DotCount;  j++)
   {
      iData = sgTest->Cells[i+1][j+1].ToIntDef(0);
      rc->dwFRead[i*rc->DotCount+j] = iData;
   }
   rc->Repaint();
}

void __fastcall TfrmMaintain::fsgPPosClick(TObject *)
{
   sgTest->Col = fsgPPos->Col;
   sgCalc->Col = fsgPPos->Col;
}

void __fastcall TfrmMaintain::fsgPeakDblClick(TObject *)
{
   if(rc->CurrentLine==0) return;
   if( (iMouseRow<=0) ||
       (iMouseCol!=0) ) return;
   int iFrom, iTo, iWidth;
   int iCenter;
   iFrom = fsgPeak->Cells[1][iMouseRow].ToIntDef(0);
   iTo   = fsgPeak->Cells[2][iMouseRow].ToIntDef(0);
   iWidth = iTo - iFrom + 1;
   if(iWidth<2) return;
   iCenter = fsgPPos->Cells[fsgPPos->Col][iMouseRow].ToIntDef(0);
   if(iCenter==0) return;
   iFrom = iCenter - iWidth / 2;
   iTo   = iFrom + iWidth - 1;
   if((iFrom<0)||(iTo>=rc->DotCount)) return;
   fsgPeak->Cells[1][iMouseRow] = iFrom;
   fsgPeak->Cells[2][iMouseRow] = iTo;
   btnSavePeak->Visible = true;
}

void __fastcall TfrmMaintain::fsgPeakMouseMove(TObject *,
      TShiftState , int X, int Y)
{
   int ix1=0,ix2=0,iy1=0,iy2=0;
   iMouseRow = -1;
   iMouseCol = -1;
   for(int i=0; i<fsgPeak->RowCount; i++)
   {
      if(i>0) iy1+=fsgPeak->RowHeights[i-1];
      iy2+=fsgPeak->RowHeights[i];
      if((Y<iy1)||(Y>=iy2)) continue;
      iMouseRow = i;
      for(int j=0; j<fsgPeak->ColCount; j++)
      {
         if(j>0) ix1+=fsgPeak->ColWidths[j-1];
         ix2+=fsgPeak->ColWidths[j];
         if((X<ix1)||(X>=ix2)) continue;
         iMouseCol = j;
         break;
      }
      break;
   }
}

void __fastcall TfrmMaintain::cbReversClick(TObject *Snder)
{
   m_bReversal = cbRevers->Checked;
   SaveComParam();
}

void __fastcall TfrmMaintain::btnPasteClick(TObject *)
{
   // 粘贴
   AnsiString s,s1;
   TStringGrid *sg = (TStringGrid *)sgTest;
   if(!Clipboard()->HasFormat(CF_TEXT)) return;  // 剪贴板没有内容返回
   TStringList *sl = new TStringList;
   sl->Text = Clipboard()->AsText;
   int ipos,irs,ics=0,ir,ic,ir1,ic1;
   irs = sl->Count;                              // 剪贴板里面的行数
   s   = sl->Strings[0].Trim();
   while(!s.IsEmpty())                           // TAB隔开的列数
   {
      ipos = s.Pos("\t");
      if(ipos==0) s = "";
      else s.Delete(1,ipos);
      ics++;
   }
   sgTest->ColCount = ics + 2;
   sgTest->RowCount = irs + 1;
   sgCalc->ColCount = ics + 2;
   ic  = sg->Col;
   ir  = sg->Row;
   ir1 = sg->RowCount - ir;
   ic1 = sg->ColCount - ic;
   rc->DotCount = irs;
   rc->Initialize(255,irs);
   dwTCount = irs;
   if(ics==1)                                    // 剪贴板里面只有一列,直接粘贴一列
   {
      for(int i=0; i<sl->Count; i++)
      {
         s  = sl->Strings[i].Trim();
         if(ir<sg->RowCount)
            sg->Cells[ic][ir] = s;
         ir++;
         if((ir>=sg->RowCount))
            sg->RowCount = ir;
      }
   } else if(irs==1)                             // 只有一行,也是粘贴一列
   {
      s = sl->Strings[0].Trim();
      while(!s.IsEmpty())
      {
         ipos = s.Pos("\t");
         if(ipos==0)
         {
            s1 = s;
            s  = "";
         } else
         {
            s1 = s.SubString(1,ipos-1);
            s.Delete(1,ipos);
         }
         if(ir<sg->RowCount)
            sg->Cells[ic][ir] = s1;
         ir++;
         if((ir>=sg->RowCount))
            sg->RowCount = ir;
      }
   } else if( (ics==ir1)&&(irs==ic1) )           // 旋转90度行列数相等,旋转粘贴
   {
      ic = sg->Col;
      for(int i=0; i<sl->Count; i++)
      {
         ir = sg->Row;
         s  = sl->Strings[i].Trim();
         while(!s.IsEmpty())
         {
            ipos = s.Pos("\t");
            if(ipos==0)
            {
               s1 = s;
               s  = "";
            } else
            {
               s1 = s.SubString(1,ipos-1);
               s.Delete(1,ipos);
            }
            if((ic<sg->ColCount)&&(ir<sg->RowCount))
               sg->Cells[ic][ir] = s1;
            ir++;
            if((ir>=sg->ColCount))
               sg->RowCount = ir;
         }
         ic++;
         if((ic>=sg->ColCount))
            sg->ColCount = ic;
      }
   } else                                        // 原始粘贴
   {
      ir  = sg->Row;
      for(int i=0; i<sl->Count; i++)
      {
         ic = sg->Col;
         s  = sl->Strings[i].Trim();
         while(!s.IsEmpty())
         {
            ipos = s.Pos("\t");
            if(ipos==0)
            {
               s1 = s;
               s  = "";
            } else
            {
               s1 = s.SubString(1,ipos-1);
               s.Delete(1,ipos);
            }
            if((ic<sg->ColCount)&&(ir<sg->RowCount))
               sg->Cells[ic][ir] = s1;
            ic++;
            if((ic>=sg->ColCount))
               sg->ColCount = ic;
         }
         ir++;
         if((ir>=sg->RowCount))
            sg->RowCount = ir;
      }
   }
   delete sl;
   DWORD iData;
   for(int i=1; i<sgTest->ColCount-1; i++)
   {
      for(int j=1; j<sgTest->RowCount; j++)
      {
         iData = sgTest->Cells[i][j].ToIntDef(0);
         dwTRead[j-1] = iData;
      }
      rc->AppendLine(NULL,(char *)dwTRead,dwTCount);
   }
   sgTest->AutoRowHeader  = true;
   sgTest->AutoColHeader  = true;
   sgCalc->AutoColHeader  = true;
   cbtTxt->Enabled        = true;
   cbtCalc->Enabled       = true;
   btnDel->Enabled        = true;
   cbtSave->Enabled       = true;
   cbtCalcClick(cbtCalc);
}
void __fastcall TfrmMaintain::btnSaveParamClick(TObject *)
{
   AnsiString asFName,asExt,asSection = "SYS";
   TIniFile *inif;
   sdt->Filter   =  "参数文件|.PAM";
   sdt->FileName = "*.PAM";
   if(!sdt->Execute()) return;
   asFName = sdt->FileName;
   asExt   = asFName.UpperCase();
   if(asExt.Pos(".PAM")==0)
      asFName = asFName + ".PAM";
   inif = new TIniFile(asFName);
   inif->WriteString(asSection,let60->Name,let60->Text);
   inif->WriteString(asSection,let70->Name,let70->Text);
   inif->WriteString(asSection,let73->Name,let73->Text);
   inif->WriteString(asSection,let74->Name,let74->Text);
   inif->WriteString(asSection,let75->Name,let75->Text);
   inif->WriteString(asSection,let76->Name,let76->Text);
   inif->WriteString(asSection,let61->Name,let61->Text);
   inif->WriteString(asSection,let62->Name,let62->Text);
   inif->WriteString(asSection,let63->Name,let63->Text);
   inif->WriteString(asSection,let64->Name,let64->Text);
   inif->WriteString(asSection,let65->Name,let65->Text);
   inif->WriteString(asSection,let66->Name,let66->Text);
   inif->WriteString(asSection,let67->Name,let67->Text);
   inif->WriteString(asSection,let68->Name,let68->Text);
   inif->WriteString(asSection,let69->Name,let69->Text);
   inif->WriteBool(asSection,cb72->Name,cb72->Checked);
   inif->WriteInteger(asSection,cb71->Name,cb71->ItemIndex);
   delete inif;
}

void __fastcall TfrmMaintain::Button16Click(TObject *)
{
   AnsiString asFName,asExt,asSection = "SYS";
   TIniFile *inif;
   odt->Filter     = ".PAM";
   if(!odt->Execute()) return;
   asFName = odt->FileName;
   inif = new TIniFile(asFName);
   let60->Text = inif->ReadString(asSection,let60->Name,"");
   let70->Text = inif->ReadString(asSection,let70->Name,"");
   let73->Text = inif->ReadString(asSection,let73->Name,"");
   let74->Text = inif->ReadString(asSection,let74->Name,"");
   let75->Text = inif->ReadString(asSection,let75->Name,"");
   let76->Text = inif->ReadString(asSection,let76->Name,"");
   let61->Text = inif->ReadString(asSection,let61->Name,"");
   let62->Text = inif->ReadString(asSection,let62->Name,"");
   let63->Text = inif->ReadString(asSection,let63->Name,"");
   let64->Text = inif->ReadString(asSection,let64->Name,"");
   let65->Text = inif->ReadString(asSection,let65->Name,"");
   let66->Text = inif->ReadString(asSection,let66->Name,"");
   let67->Text = inif->ReadString(asSection,let67->Name,"");
   let68->Text = inif->ReadString(asSection,let68->Name,"");
   let69->Text = inif->ReadString(asSection,let69->Name,"");
   cb72->Checked   = inif->ReadBool(asSection,cb72->Name,false);
   cb71->ItemIndex = inif->ReadInteger(asSection,cb71->Name,0);
   delete inif;
}

void __fastcall TfrmMaintain::fsgTCDblClick(TObject *)
{
   int iSI = fsgTC->Row;
   frmSetTC->iSubItem  = iSI;
   frmSetTC->iPeakCnt  = fsgPeak->RowCount-1;
   for(int i=0; i<3; i++)
      frmSetTC->asPosi[i] = fsgTC->Cells[i+1][iSI];
   frmSetTC->iCalcMode = GetTCMode(fsgTC->Cells[4][iSI]);
   if(frmSetTC->ShowModal()!=mrOk) return;
   for(int i=0; i<3; i++)
      fsgTC->Cells[i+1][iSI] = frmSetTC->asPosi[i];
   fsgTC->Cells[4][iSI] = frmSetTC->asTCFormula;
   btnSaveTC->Visible = true;
}

void __fastcall TfrmMaintain::fsgTCMouseUp(TObject *,
      TMouseButton Button, TShiftState , int , int )
{
   int iRow = fsgTC->Row;
   if( (Button!=mbRight) ||
       (iRow==0) ) return;
   for(int i=1; i<fsgTC->ColCount; i++)
      fsgTC->Cells[i][iRow] = "";
   btnSaveTC->Visible = true;
}

void __fastcall TfrmMaintain::fsgTCKeyUp(TObject *, WORD &Key,
      TShiftState )
{
   int iRow = fsgTC->Row;
   if( (Key!=VK_DELETE) ||
       (iRow==0) ) return;
   for(int i=1; i<fsgTC->ColCount; i++)
      fsgTC->Cells[i][iRow] = "";
   btnSaveTC->Visible = true;
}

void __fastcall TfrmMaintain::p441DblClick(TObject *)
{
   if(rc->CurrentLine==0) return;
   int iCent, iPWid,iPW1;
   int iPFrom,iPTo;
   for(int i=1; i<fsgPPos->RowCount; i++)
   {
      iCent = fsgPPos->Cells[fsgPPos->Col][i].ToIntDef(0);   // 中心位置
      iPWid = fsgPeak->Cells[i][3].ToIntDef(0); // 峰宽
      iPW1  = fsgPeak->Cells[i][2].ToIntDef(0) -
              fsgPeak->Cells[i][1].ToIntDef(0) + 1;
      if(iPWid<iPW1) iPWid = iPW1;
      iPFrom = iCent - iPWid/2;
      iPTo   = iPFrom + iPWid - 1;
      fsgPeak->Cells[1][i] = iPFrom;
      fsgPeak->Cells[2][i] = iPTo;
   }
   btnSavePeak->Visible = true;
}

void __fastcall TfrmMaintain::FormPaint(TObject *)
{
   cbMsg->Visible = m_bMAdmin;
   m->Visible     = m_bMAdmin;
   cb52->Visible  = m_bMAdmin;
   pDev->Visible  = m_bMAdmin;
}



void __fastcall TfrmMaintain::Button21Click(TObject *)
{
   int win_len =  LE2IntDef(LabeledEdit4, 200);
   RespChart1->DotCount = win_len+1;//3524;                        // 曲线点数
   RespChart1->Initialize(255,win_len+1);//3524);                  // 初始化曲线
   RespChart1->Repaint();
}
//---------------------------------------------------------------------------

void __fastcall TfrmMaintain::Button20Click(TObject *)
{
   if (!m_bConnected) frmUart->OpenDevice();
   if (!m_bConnected)
   {
      SetError("串口通讯失败！");
      return;
   }
   frmUart->SendCommand(851, 0, 500);
   dwTCount = 0;
   int time_out = LE2IntDef(LabeledEdit6, 6000);                               // 条码测试数据清空
   frmUart->SendCommand(853,0,time_out);           // X轴荧光调试


   int maxdot = LE2IntDef(LabeledEdit4, dwTCount);
   if (maxdot > dwTCount)
   {
       maxdot = dwTCount;
   }

   RespChart1->AppendLine(NULL,(char *)dwTRead, maxdot);
   RespChart1->Repaint();


}
//---------------------------------------------------------------------------


//---------------------------------------------------------------------------
// ----------2018- 10 -11 -----------------
 bool AutoDropCard = false;

void __fastcall TfrmMaintain::btn1Click(TObject *Sender)
{

            AutoDropCard = true;
            while(1)
            {   if(AutoDropCard == false)
                        break;
                frmUart->SendCommand(4,0,1000); //待机
                ::Sleep(500);
                frmUart->SendCommand(3,0,1000); //复位
                ::Sleep(500);
                frmUart->SendCommand(4,0,1000);
                ::Sleep(500);
                frmUart->SendCommand(3,0,1000);
                ::Sleep(2000);
            }

}
//---------------------------------------------------------------------------

void __fastcall TfrmMaintain::btn2Click(TObject *Sender)
{
         AutoDropCard = false;
}
//---------------------------------------------------------------------------

void __fastcall TfrmMaintain::epClick(TObject *Sender)
{
      ep->Visible = false;
}
//---------------------------------------------------------------------------


