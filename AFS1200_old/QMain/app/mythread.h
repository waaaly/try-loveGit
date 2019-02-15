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


class Mythread : public QThread
{
    Q_OBJECT
public:
    explicit Mythread(QObject *parent = 0);
signals:
    void thread_signal(int) ;
     void info2error_dialog(QString) ;
protected:
    void run();
private slots:
    void stop_get(void) ;

private:
    MySerial th_serial ;
    MySerial print_serial ;
    MySerial upload_serial ;
    MySerial wifi_serial ;
    MySerial IC_serial ;
    bool serial_ok ;
    bool print_serial_ok ;
    bool upload_serial_ok ;
    bool wifi_serial_ok ;
    bool ic_serial_ok ;

    int loop_num;

    int lsock ,connfd;/* client[CLIENT_MAX]*/
    struct sockaddr_in server_addr, client_addr ;
    struct pollfd pfd[2] ;

    int parser_com(char *com_buffer);
    int tcp_init(void);
    int fx_COM0(void) ;
    int fx_COM1(void) ;
    int fx_COM2(void) ;
    int fx_COM3(void) ;
    int fx_COM4(void) ;
    int fx_COM5(void) ;
    int fx_COM6(void) ;
    int fx_COM7(void) ;
    int fx_COM8(void) ;
    int fx_COM9(void) ;
    int fx_COM10(void) ;
    int fx_COM13(void) ;
    int fx_COM14(void) ;
    int fx_COM15(void) ;
    int fx_COM16(void) ;

    int fx_COM17(unsigned int offs) ;
    int fx_COM18(void) ;


    int fx_COM20(void) ;
    int fx_COM21(void) ;
    int fx_COM22(void) ;
    int fx_COM30(void) ;
    int fx_COM31(void) ;
    int fx_COM40(void) ;
    int fx_COM41(void) ;
    int fx_COM42(void) ;
    int fx_COM43(void) ;
    int fx_COM44(void) ;
    int fx_COM45(void) ;
    int fx_COM46(void) ;
    int fx_COM47(void) ;
    int fx_COM50(void) ;
    int fx_COM51(void) ;
    int fx_COM52(void) ;
    int fx_COM53(void) ;
    int fx_COM54(void) ;
    int fx_COM55(void) ;
    int fx_COM56(void) ;
    int fx_COM61(void) ;
    int fx_COM62(void) ;
    int fx_COM63(void) ;
    int fx_COM64(void) ;
    int fx_COM65(void) ;
    int fx_COM71(void) ;
    int fx_COM72(void) ;
    int fx_COM73(void) ;
    int fx_COM74(void) ;
    int fx_COM75(void) ;
    int fx_COM80(void) ;

    int get_window_lenth() ;
    int get_register() ;


    int go_offset(int x);


};

#endif // MYTHREAD_H
