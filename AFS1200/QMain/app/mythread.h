  #ifndef MYTHREAD_H
#define MYTHREAD_H
#include <QThread>
#include <QLabel>
#include <QTimer>
#include <myserial.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <limits.h>
#include <sys/types.h>
#include <sys/stat.h>

#include <sys/socket.h>
#include <sys/types.h>
#include <sys/un.h>
#include <strings.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <errno.h>
#include <signal.h>
#include <sys/wait.h>
#include <poll.h>
#include <sys/stropts.h>

#include <QMutex>
#include <QWaitCondition>
#include <QMutexLocker>
#include <QStringList>
#include <QDateTime>


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
                          uint &BarCode);

/*********************************************************************************************************
** Function name:       Func_Barcode_COUNT()
** Descriptions:        条码数值计算
** input parameters:
** output parameters:   无
** Returned value:      无
*********************************************************************************************************/
void Func_Barcode_COUNT(uint &BarCode,
                        uint ADC_Buffer[],
                        int BARCODE_BIT,        // 1 List
                        int BARCODE_BITERR,     // 条码连续
                        int BARCODE_LENGTH,     // 条码位数
                        int ADC_Pointer         // 全程长度
                        );
}

class Mythread : public QThread
{
    Q_OBJECT
public:
    explicit Mythread(QObject *parent = 0);
signals:
    void thread_signal(int,unsigned int arg = 0) ;

protected:
    void run();

private:
    MySerial th_serial ;
    //MySerial print_serial ;

  /** 这里不需要了，放在uploadLis 2018/09/06*/
    bool print_serial_ok ;
//    bool upload_serial_ok ;
//    MySerial upload_serial ;
//    int fx_COM30(void) ;
//    int fx_COM31(void) ;

    int parser_com(char *com_buffer);


    int fx_COM1(void) ;

    int fx_COM3(void) ;
    int fx_COM4(void) ;
    int fx_COM5(void) ;

    int fx_COM7(void) ;

    int fx_COM9(void) ;

    int fx_COM11(void) ;

    unsigned int fx_COM13(void) ;

    int fx_COM15(void) ;
    int fx_COM16(int loop) ;


    unsigned int fx_COM17(void) ; // 20170104
    int fx_COM19(const char*buf) ; // 20180417



    int get_window_lenth() ;
    int get_register() ;


    QMutex mutex;
    QWaitCondition wait_lock;
    QStringList cmd_list;
    QDateTime time;

    bool serial_ok ;//跟下位机通信
    bool pop_cmd(char *cmd, int size);
    int go_offset(int x, int y); // x = [0 .. 5]    y = [5 .. 1]

    char calcCRC(const char *cmd);

public:
    bool push_cmd(const char* cmd);
      /*添加一个有无ID卡和试剂卡的标志  2018/09/28  */

    int  HasReagentCard;        //0：单通道
                                                //1：五连卡
                                                //2：无卡
    qint64 get_Interval();
    QMutex Time_lock;

};





#endif // MYTHREAD_H
