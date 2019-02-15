#include <QDateTime>
#include <stdio.h>
#include <stdlib.h>
#include "mythread.h"
#include "myhelper.h"
#include "myserial.h"
#include "ID/uIDCardDef.h"
#include "encode/MD5.h"
#include <QDebug>
#include <string.h>
#include <QTime>
#include "../funcset/debug.h"

/** ***************************************************************************************** **/
//复位：
char Rest[24]       = { 0x01,0x00,0x00,0x03,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//测量（荧光）调试：
char Test[24]  		= { 0x01,0x00,0x00,0x05,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//条码调试：
char TBar[24]       = { 0x01,0x00,0x00,0x06,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//读条码：
char RBar[24]       = { 0x01,0x00,0x00,0x07,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//检测有无试剂卡：
char ChC[24]        = { 0x01,0x00,0x00,0x13,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//读ID：
char Ridc[24]       = { 0x01,0x00,0x00,0x1f,  0x00,0x00,0x00,0x01,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//读注册码：
char Rreg[24]       = { 0x01,0x00,0x01,0x02,  0x1f,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//读测试窗口长度:
char getW[24]       = { 0x01,0x00,0x01,0x02,  0x06,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//读主板序列号：
char Rnum[24]       = { 0x01,0x00,0x01,0x02,  0x1e,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//读版本程序号：
char RVersion[24]   = { 0x01,0x00,0x01,0x02,  0x1d,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//读电机丢卡步数：
char RAdjust[24]    = { 0x01,0x00,0x01,0x02,  0x10,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//写多联卡Y轴扫描位置：
char WMAdjust[24] 	= { 0x01,0x00,0x00,0x02,  0x0d,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//写注册码：
char Wreg[24]       = { 0x01,0x00,0x00,0x02,  0x1f,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//光路盒走位:
char Offset_dev[24] = { 0x01,0x00,0x00,0x10,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//Y复位:
char Y_Rest[24]     = { 0x01,0x00,0x00,0x19,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//温湿度:
char TH_REF[24]     = { 0x01,0x00,0x01,0x16,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
//
char TH_HOTARG[24]  = { 0x01,0x00,0x00,0x02,  0x2f,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                        0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 };
/** ***************************************************************************************** **/


//测试
const char *RCard =  Test;
//测试
const char * SRCard = RCard;
static unsigned char head_buffer[BUFFER_SIZE+1] ;         //接收24字节头
extern unsigned char idfile_buffer[BUFFER_SIZE] ;
extern unsigned int package[BUFFER_SIZE];                 //接收大数据包
extern QString card_value;                                //接收卡条值
char buffer[BUFFER_SIZE + 1];
char recv_print[512] ;

Mythread::Mythread(QObject *parent) :
    QThread(parent)
{

    Test[23] = calcCRC(Test);
    Rest[23] = calcCRC(Rest);
    TBar[23] = calcCRC(TBar);

    RBar[23] = calcCRC(RBar);
    ChC[23] = calcCRC(ChC);
    Ridc[23] = calcCRC(Ridc);

    Rreg[23] = calcCRC(Rreg);
    getW[23] = calcCRC(getW);
    Rnum[23] = calcCRC(Rnum);
    RVersion[23] = calcCRC(RVersion);
    RAdjust[23] = calcCRC(RAdjust);
    WMAdjust[23] = calcCRC(WMAdjust);

    Wreg[23] = calcCRC(Wreg);
    Offset_dev[23] = calcCRC(Offset_dev);
    Y_Rest[23] = calcCRC(Y_Rest);
    TH_REF[23] = calcCRC(TH_REF);
    TH_HOTARG[23] = calcCRC(TH_HOTARG);

    this->HasReagentCard = 2;//初始化试剂卡无卡

    th_serial.BAUD = B57600 ;
    strcpy( th_serial.uart_name, "/dev/ttyO5" ) ;//"/dev/ttyO1"

    if( this->th_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
      this->serial_ok = false ;
    }
    else
    {
        this->serial_ok = true ;
    }

    cmd_list.clear();

}

bool Mythread::push_cmd(const char* cmd)
{
    QString cmd_tmp = QString::fromLocal8Bit(cmd);
    mutex.lock();
    cmd_list.append(cmd_tmp);
    wait_lock.wakeOne();
    mutex.unlock();
    return true;
}
bool Mythread::pop_cmd(char *cmd, int size)
{
    mutex.lock();
    if (cmd_list.isEmpty())
    {
        wait_lock.wait(&mutex);
    }

    bool ret = !cmd_list.isEmpty();
    if (ret)
    {
        QString cmd_tmp = cmd_list.takeFirst();
        int len = cmd_tmp.toLocal8Bit().length() + 1;
        if (len > size) len = size;
        memcpy(cmd, cmd_tmp.toLocal8Bit().data(), len);
    }
    mutex.unlock();
    return ret;
}

//线程运行主函数
void Mythread::run()
{
    fx_COM3();//复位
    this->go_offset(0, 5);
    this->go_offset(1, 5);

    int get_adjust_ratio ;

    usleep(500000) ;
    get_adjust_ratio = fx_COM15() ;    //读版本程序号
    usleep(500000) ;
    get_window_lenth();
    usleep(550000);
    get_register() ; //


    emit thread_signal(get_adjust_ratio) ;

//   温参数控 2018/10/8
//    emit thread_signal (19, fx_COM19(" "));

    while(1)
    {
          Time_lock.lock();//在修改时间那里上锁
        time = QDateTime::currentDateTime();
         Time_lock.unlock();
        bzero(buffer, sizeof (buffer)) ;
        while (!pop_cmd(buffer, sizeof (buffer)))//要发送的命令出站
        {
            if (serial_ok)
            {
                qDebug() <<__LINE__ <<__FUNCTION__<<tr("这是一个不应该执行到的地方");
                continue;
            }
            else
            {
                pthread_exit(0);
            }
        }

        if (!strncmp("COM", buffer, 3))
        {
            qDebug() <<__LINE__ <<__FUNCTION__<<QThread::currentThread();
            Time_lock.lock();//在修改时间那里上锁
            while (get_Interval() < 800)
            {
                 qDebug() <<__LINE__ <<__FUNCTION__<<QThread::currentThread();
                usleep(100000);
            }
            Time_lock.unlock();
        }
        if(buffer == "COM20")
        printf("serial thread send********** : %s\n", buffer) ;
           //  printf("serial thread send : %s\n", buffer) ;

        qDebug() <<__LINE__ <<__FUNCTION__<<QThread::currentThread();
        /*根据序列号执行对应的函数并且发送信号携带一个Int值给主线程，
        主线程根据返回值，在对接收到的数据进行处理*/

        switch(this->parser_com(buffer))
        {
            case 1:{emit thread_signal (1, fx_COM1());break;}//光路盒走位，获取测试窗口长度，测试

            case 3:{emit thread_signal (fx_COM3());break;}//复位
            case 4:{emit thread_signal (fx_COM4());break;}//光路盒走位
            case 5:{emit thread_signal (fx_COM5());break;}//单通道测试
            case 7:{emit thread_signal (fx_COM7());break;} //读条码卡

            case 9:{emit thread_signal (fx_COM9());break;}//读ID卡

            case 11:{emit thread_signal (fx_COM11());break;}//Y复位

            case 13://自动检测试剂卡
            {
                unsigned int RCard_int;
                RCard_int = fx_COM13();
                 if(RCard_int == 0)
                        this->HasReagentCard = 2;
                else if(RCard_int == 1) //五连卡
                        this->HasReagentCard = 1;
                else if(RCard_int == 2) //单通道
                        this->HasReagentCard = 0;
                else
                    this->HasReagentCard = 3;
                emit thread_signal (13, fx_COM13());
                break;
            }

            case 15:{emit thread_signal (fx_COM15());break;}     //读版本程序号
            case 16:                                            //写注册码
            {
                for(int loop = 0; loop < 5; loop++)
                {
                    fx_COM16(loop) ;
                    usleep(500000);
                }
                emit thread_signal (16);
                break;
            }
            case 20:
            {
            //检测有无试剂卡
                unsigned int RCard_int;
                RCard_int = fx_COM13();
                if(RCard_int == 0)
                    this->HasReagentCard = 2;
                else if(RCard_int == 1)//5
                    this->HasReagentCard = 1;
                else if(RCard_int == 2)
                    this->HasReagentCard = 0;
                else
                    this->HasReagentCard = 3;
                qDebug() <<__LINE__ <<__FUNCTION__<<"1111111";
                qDebug() <<__LINE__ <<__FUNCTION__<<QThread::currentThread();
                emit thread_signal(20);
                break;
            }
        }
    }
}


int Mythread::parser_com(char *com_buffer)
{

    char recv_com[4] ;
    for(int i=0; i<3; i++)
    {
        recv_com[i] = com_buffer[i] ;
    }
    recv_com[3] = '\0';
    if(strcmp(recv_com,"COM") == 0)//fa gei  xiawei zhiling
    {
        return ((com_buffer[3]-48)*10 + com_buffer[4]-48) ;
    }
    return -1 ;
}

int Mythread::fx_COM1(void)
{
    if (wait_for_test_cur_num != -1)//如果正在测试
    {
        //光路盒走位
        if(wait_for_test_cur_model == 1)
            go_offset(wait_for_test_cur_num + 1, 0);
        else
            go_offset(wait_for_test_cur_num + 1, wait_for_test_cur_model);
        qDebug() <<__LINE__ <<__FUNCTION__<< wait_for_test_cur_num;
    }
    usleep(200000);
    //获取测试窗口长度
    get_window_lenth();
    //
    if (wait_for_test_cur_model == 0)//单通道
    {
        Test[9] = 1;//协议说单通道第九位要0   2018*10-18
    }
    else
    {
        Test[9] = 0;//5
    }
    Test[23] = calcCRC(Test);
    if( this->th_serial.Send_data(th_serial.fd, Test, 24, 2000) != 24)//
    {
        qDebug() <<__LINE__ <<__FUNCTION__<<" We received more or less than 24 datas\n";

            return -1 ;
    }

    if( (th_serial.Parse_nums_datas(th_serial.fd, head_buffer, 12000, win_lenth, package)) <0 )
    {
        return -1;
    }
    return 1 ;
}


int Mythread::fx_COM3(void)
{
    if( (this->th_serial.WR_24_datas(this->th_serial.fd, Rest, head_buffer, 4000)) <0 )//
    {
            return -1 ;
    }
    return 3 ;
}
int Mythread::fx_COM4(void)
{
    go_offset(0, 5);
    return 4;
}
int Mythread::fx_COM5(void)
{
    if (fx_COM1() == -1) return -1;
    else return 5;
}


int Mythread::fx_COM7(void)
{
    go_offset(1, 0);

    usleep(300000);

    if (wait_for_test_cur_model == 0)//单通道
    {
        TBar[9] = 1;
    }
    else
    {
        TBar[9] = 0;   //5   2018-10-18
    }
    TBar[23] = calcCRC(TBar);

    if( th_serial.Send_data(th_serial.fd, TBar, 24, 6000) < 0)
    {
        return -1;
        qDebug() <<__LINE__<<__FUNCTION__<<"Send COM failed~!\n";
    }
    else
    {
        int codelen;
        if( (codelen = th_serial.Parse_nums_datas_p5(th_serial.fd, package, 12000)) <= 0)
        {
            qDebug() <<__LINE__<<__FUNCTION__<<"Send COM failed~!\n";
            return -1;
        }
        else
        {
            uint bar;
            DBG_DEBUG(DBG_CFLINE("analysis barcode"));
            BarCode::Func_Barcode_COUNT(bar,
                               (uint*)package,                              //0是单通道，1是五联卡
                               wait_for_test_cur_model? 100 : 20,      // 条码1 List
                                wait_for_test_cur_model? 60 : 12,     // 条行连续
                               18,     // 条码位数
                               codelen    // 全程长度
                               ) ;
        /********  这里的五联卡 条码1 list (100) 和条形连续 (60)需要更改 2018/09/25    ********** */
            card_value = QString().sprintf("%06X", bar).left(5);//在first_form定义用来接收卡条值
            DBG_INFO(DBG_CFLINE("barcode %s", qPrintable(card_value)));
        }
    }
    return 7 ;
}



int Mythread::fx_COM9(void)
{
    int nread ;
    unsigned char tmp_buffer[25] ;
    //读ID
    if( th_serial.Send_data(th_serial.fd, Ridc, 24, 6000) < 0 )
    {
            return -1;
    }
    printf("getting idcard datas --> \n") ;
    if ((nread = th_serial.Get_data(th_serial.fd, tmp_buffer, 24, 2000)) !=24)
    {
             printf("read idcard failed~!\n") ;
            return -1 ;
    }
    else if(tmp_buffer[8] != 0)
    {
            printf("no card~!\n") ;

            return -5 ;
    }


    if ((nread = th_serial.Get_data(th_serial.fd, idfile_buffer, 4096, 4000)) !=4096)
    {
        return -1 ;
    }
     printf("read over idcard datas --> \n") ;
    if((nread = th_serial.Get_data(th_serial.fd, tmp_buffer, 4, 4000)) !=4)
    {
            printf("read card failed~!\n") ;
            return -1 ;
    }
    return 9 ;
}

int Mythread::fx_COM11(void)
{
    unsigned char buf[24];
    usleep(100000);

    this->th_serial.WR_24_datas(this->th_serial.fd, Y_Rest, buf, 10000);
    usleep(10000);
    return 11 ;
}

unsigned int Mythread::fx_COM13(void)
{

    int ret = this->th_serial.WR_24_datas(this->th_serial.fd, ChC, head_buffer, 1000);

    if( ret <0 )
    {
            return ~0 ;
    }
    unsigned int retval = 0;
    if (head_buffer[8] == 0x01)//五连卡
    {
        retval += 1;
    }
    if (head_buffer[9] == 0x01)//单通道
    {
        retval += 2;
    }
    return retval;
}


int Mythread::fx_COM15(void)
{

    if( (this->th_serial.WR_24_datas(this->th_serial.fd, RVersion, head_buffer, 1000)) <0 )//
    {
        qDebug() <<__LINE__<<__FUNCTION__<< "read failed.\n";
        return -1 ;
    }else{
        memcpy(version, &head_buffer[7], 8) ;
    }
    return 15 ;
}

int Mythread::fx_COM16(int loop)
{

    Wreg[5] = loop + 1;

    for(int i=7; i<17; i++)
        Wreg[i]  = register_array[loop][i-7] ;

    Wreg[23] = calcCRC(Wreg);

    if( th_serial.WR_24_datas(th_serial.fd, Wreg, head_buffer, 3000) < 0  )
    {
        printf("Send COM failed~!\n") ;
        return -1;
    }

    return 16 ;
}
unsigned int Mythread::fx_COM17(void)
{
    usleep(10000);
    if( (this->th_serial.WR_24_datas(this->th_serial.fd, TH_REF, head_buffer, 1000)) <0 )//
    {
          return ~0;
    }
    unsigned int ret = 0;

    ret += (head_buffer[ 8] << 24);
    ret += (head_buffer[ 9] << 16);
    ret += (head_buffer[10] <<  8);
    ret += (head_buffer[11] <<  0);

    if (head_buffer[7])
    {
        ret |= 1<<31;
    }
    else
    {
        ret &= ~(1<<31);
    }

    return ret;
}

int Mythread::fx_COM19(const char *buf)
{
    char tmp_buf[24];
    memcpy(tmp_buf, TH_HOTARG, 24);
    int min,max;
    unsigned int isGet = sscanf(buf, "%d,%d", &min, &max) != 2;
    if (isGet)
    {
        tmp_buf[2] = 1;
    }
    else
    {
        if (max > 40) max = 40;
        if (min < 20) min = 20;
        if (max < min) qSwap(max, min);
        tmp_buf[8] = max;
        tmp_buf[10] = min;
    }
    tmp_buf[23] = calcCRC(tmp_buf);

    usleep(400000);
    this->th_serial.WR_24_datas(this->th_serial.fd, tmp_buf, (unsigned char*)tmp_buf, 1000);

    if (isGet)
    {
        max = tmp_buf[8];
        min = tmp_buf[10];
        isGet += (max << 24) + (min << 16);
    }
    return isGet;
}



int Mythread::get_window_lenth()
{
    //读测试窗口长度
    if (wait_for_test_cur_model == 0)//单通道
    {
        getW[9] = 1;
    }
    else//
    {
        getW[9] = 0;//协议说五联卡第九位要写0 2018*10-18
    }
    qDebug() <<__LINE__ <<__FUNCTION__<< wait_for_test_cur_model;
    getW[23] = calcCRC(getW);

    win_lenth = 0;
    if( (this->th_serial.WR_24_datas(this->th_serial.fd, getW, head_buffer, 2000)) <0 )//
    {
        printf("get windos failed\n" ) ;
            return 174 ;
    }
    else
    {
        win_lenth = (head_buffer[7] << 8) + head_buffer[8] - 6;
    }
        return win_lenth;
}

int Mythread::get_register()
{

    int i ;

    char Rreg_[24];
    memcpy(Rreg_, Rreg, 24);

    for(int ii=0; ii<8; ii++)
        for(int jj=0; jj<10; jj++)
            register_array[ii][jj] = 0xff ;
    /*register_array[0~2]存机构名称,3浮动范围,4区域代码,5板序列号*/
    for(i=0; i<5; i++)
    {

        Rreg_[5] = i + 1 ;

        Rreg_[23] = calcCRC(Rreg_);
        if( (this->th_serial.WR_24_datas(this->th_serial.fd, Rreg_, head_buffer, 1000)) <0 )//
        {
            qDebug() <<__LINE__<<__FUNCTION__<<"read failed.\n";
            return -1 ;
        }
        else
        {
            for(int ii=0; ii<10; ii++)
                register_array[i][ii] = head_buffer[ii+7];
        }
        usleep(550000);

    }
    if( (this->th_serial.WR_24_datas(this->th_serial.fd, Rnum, head_buffer, 1000)) <0 )//
    {
        qDebug() <<__LINE__<<__FUNCTION__<< "read failed.";

        return -1 ;
    }
    else
    {
        for(int ii=0; ii<4; ii++)
            register_array[5][ii] = head_buffer[ii+7];
    }

    emit thread_signal(2) ;
    return 0 ;
}

//#define REGISTER_V


int Mythread::go_offset(int x, int y)
{
    if (x == 6)//单通道
    {
        x = 1;
        y = 0;//
    }

    unsigned char buf[24];
    unsigned char cmd[24];
    memcpy(cmd, Offset_dev, 24);//光路盒走位
    if (x)
    {
        quint32 offs = x;
             if (y == 4) offs += 5;                              //5lian 5
        else if (y == 3) offs += 5 + 4;                     //5lian 4
        else if (y == 2) offs += 5 + 4 + 3;               //5lian 3
        else if (y == 1) offs += 5 + 4 + 3 + 2;         //5lian 2
        else if (y == 0) offs += 5 + 4 + 3 + 2 + 1;   //5lian 1
        if (offs > 16)
        {
            offs = 0;
        }
        cmd[7] += offs;
        cmd[23] = (unsigned char)calcCRC((char*)cmd);
    }
    usleep(500000);
    //光路盒走位
    if (this->th_serial.WR_24_datas(this->th_serial.fd, cmd, buf, 10000) < 0)
    {
        return -1;
    }

    usleep(500000);

    return buf[8];

}

char Mythread::calcCRC(const char *cmd)
{
    char sum = 0;
    for (int i = 0; i < 23; i++)
    {
        sum += cmd[i];
    }
    return sum;
}

qint64 Mythread::get_Interval()
{
    return time.msecsTo(QDateTime::currentDateTime());
}




/*********************************************************************************************************
** Function name:       Func_BARCODEBITcount(INT8U n,INT8U k)
** Descriptions:        条码值计算
** input parameters:    n :同类数据的个数 k:数据性质(=0 数据视为0/黑；=1数据视为1/白)
** output parameters:   无
** Returned value:      无
*********************************************************************************************************/
void BarCode::Func_BARCODEBITcount(int n,
                          int k,
                          int BARCODE_BIT,
                          int BARCODE_BITERR,
                          uint &BarCode)
{
    int a,b=0;
    if(k==1)
    {
        a=n/BARCODE_BIT;					//数据个数转换为条码位数
        b=n%BARCODE_BIT;
        if(b>BARCODE_BITERR)					//剩下步数>条码误差
        {
            a++;
        }
        for(;a>0;a--)
        {
            BarCode = (BarCode<<1)&0xfffffffe;	       //移入值
        }
    }
    else
    {
        a=n/BARCODE_BIT;					//数据个数转换为条码位数
        b=n%BARCODE_BIT;
        if(b>BARCODE_BITERR)					//剩下步数>条码误差
        {
            a++;
        }
        for(;a>0;a--)
        {
            BarCode = (BarCode<<1)|0x00000001;	       //移入值
        }
    }
}

/*********************************************************************************************************
** Function name:       Func_Barcode_COUNT()
** Descriptions:        条码数值计算
** input parameters:
** output parameters:   无
** Returned value:      无
*********************************************************************************************************/
void BarCode::Func_Barcode_COUNT(uint &BarCode,
                        uint ADC_Buffer[],
                        int BARCODE_BIT,        // 1 List
                        int BARCODE_BITERR,     // 条码连续
                        int BARCODE_LENGTH,     // 条码位数
                        int ADC_Pointer         // 全程长度
                        )
{
    int  i=0,j=0,k=0,l=0 ;
    int  n=0 ;
    BarCode=0 ;                                 //条码值清零
    for(;i+10<ADC_Pointer;i++)					//寻找起始位置
    {
        if(ADC_Buffer[10+i]<=60000)
        {
            break;                       //发现小于60000的数，结束
        }
    }
    for(;i+10<ADC_Pointer;i++)
    {
        if(ADC_Buffer[10+i]>60000)				//找到大于60000的数,起始位置结束,开始计算条码
        {
            k=1;
            break;
        }
        j++;
        if(j>BARCODE_BIT+(BARCODE_BITERR/3))    //计数位置超过1位条码物理步数,起始位置结束,开始计算条码
        {
            k=0;
            break;
        }
    }
    n=0;
    l=0;
    for(;i+10<ADC_Pointer;i++)					//计算条码值
    {
        if(l<(BARCODE_LENGTH-1))
        {
            if(k==0)//黑色区域
            {
                n++;
                if(ADC_Buffer[10+i]>60000)
                {
                    n--;
                    Func_BARCODEBITcount(n, k, BARCODE_BIT, BARCODE_BITERR, BarCode);          //条码位计算
                    l=l+(n/BARCODE_BIT);                //计算本次测的位数
                    if((n%BARCODE_BIT)>BARCODE_BITERR)	//计算余数
                    {
                        l++;
                    }
                    k=1;
                    n=0;
                    i--;
                }
            }
            else//白色区域
            {
                n++;
                if(ADC_Buffer[10+i]<=60000)
                {
                    n--;
                    Func_BARCODEBITcount(n,k, BARCODE_BIT, BARCODE_BITERR, BarCode);          //条码位计算
                    l=l+(n/BARCODE_BIT);                //计算本次测的位数
                    if((n%BARCODE_BIT)>BARCODE_BITERR)	//计算余数
                    {
                        l++;
                    }
                    k=0;
                    n=0;
                    i--;
                }
            }
        }
    }
    i=l-(BARCODE_LENGTH-1);

    if(i > 0)
    {
        for(;i>0;i--)
        {
            BarCode = (BarCode>>1)&0x7fffffff;          //将多余的位数去掉
        }
    }
    else if (i < 0)
    {
        while (i++) BarCode <<= 1;
    }

    i=0;
    j=(BARCODE_LENGTH-1)/8;
    if(((BARCODE_LENGTH-1)%8)!=0)
    {
        j++;
    }
    n=j*8-(BARCODE_LENGTH-1) ;
    for(;i<n;i++)
    {
        BarCode = (BarCode<<1)&0xfffffffe;				//3字节对齐
    }
}


