#ifndef WIFI_THREAD_H
#define WIFI_THREAD_H
#include <QThread>
#include <QLabel>
#include <QTimer>
#include "myserial.h"

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

class Wifithread : public QThread
{
    Q_OBJECT
public:
    explicit Wifithread(QObject *parent = 0);
    QBasicTimer detect_timer;

protected:
    void run();
    void timerEvent(QTimerEvent *) ;
    int tcp_init(void) ;
private:
    MySerial wifi_serial ;
    bool wifi_serial_ok ;

    int lsock/* client[CLIENT_MAX]*/ ,connfd;
    struct sockaddr_in server_addr, client_addr ;
    struct pollfd pfd[2] ;
    int parser_com(char *com_buffer) ;

    int fx_COM40(void) ;
    int fx_COM41(void) ;
    int fx_COM42(void) ;
    int fx_COM43(void) ;
    int fx_COM44(void) ;
    int fx_COM45(void) ;
    int fx_COM46(void) ;
    int fx_COM47(void) ;

    int check_wifi_connect(void) ;
    int connect_wifi(void) ;
    int connect_UDP(void) ;

    int auto_connect() ;
    int auto_check() ;

signals:
    void thread_signal(int) ;
    void wifi_state(int) ;
     void info2error_dialog(QString) ;
};

#endif // MYTHREAD_H
