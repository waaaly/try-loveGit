#include "wifi_thread.h"
#include <QDateTime>

//#define wifi_ssid "dalu"
//#define wifi_pws "da123456"

char wifi_buffer[2048];
unsigned char wifi_big_buffer[2048] ;//接收24字节头
char wifi_recv[256] ;
//unsigned char idfile_buffer[2048] ;
bool is_lock ;

char wifi_ssid[64] = "1" ;
char wifi_pws[64] = "1" ;

Wifithread::Wifithread(QObject *parent) :
    QThread(parent)
{

    wifi_serial_use = 0 ;
    uart_config[0].baud = 115200 ;
    uart_config[0].name =  "/dev/ttyS7" ;

    wifi_serial.BAUD = B115200 ;
    strcpy( wifi_serial.uart_name, "/dev/ttyS7") ;

    //
    if( this->wifi_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
      this->wifi_serial_ok = false ;
    }
    else
    {
        this->wifi_serial_ok = true ;
    }

   is_lock = 0 ;
   //detect_timer.start(30000,this);  //30s

}

//线程运行主函数
void Wifithread::run()
{

    int nread = 0;
    int nready ;


    int recv_com_num ;//存放接收到命令的序列号


     tcp_init() ;

    fx_COM41() ;
   // auto_check() ;

    while(wifi_serial_ok)
    {
        //等待主线程发通知
       // nread = read(fifo_fd, buffer, COM_NAME_LEN);
        printf("wifi_thread POLLING.. \n") ;
        nready = poll(&pfd[1], 1, -1 ) ;//INFTIM = -1 ;
                    if(nready < 0 )
                      continue ;
        if(!is_lock)
        {
            is_lock = 1 ; //forbidden connect
            if( pfd[1].revents & (POLLIN | POLLERR) )
            {
                bzero(wifi_buffer, COM_NAME_LEN) ;
                if( (nread = read(pfd[1].fd, wifi_buffer, COM_NAME_LEN)) < 0)
                {
                    if( errno == ECONNRESET)
                    {
                        printf("connect reset by client.\n") ;
                    }
                    else
                    {
                        //handle_error("read") ;
                    }
                }
                else if(nread == 0)
                {
                    printf("client close.\n") ;

                }
                //else
                  //send(pfd[1].fd, buffer, COM_NAME_LEN, 0 ) ;
            }

            if(nread <= 0)
            {
                printf("read failed \n") ;

                  emit thread_signal(-1);
            }
            else
            {
                ///*10_20*/emit thread_signal(1);

                printf("serial ok :%s\n",wifi_buffer) ;
                //解析出命令对应的序列号

                recv_com_num = this->parser_com(wifi_buffer);

                if(recv_com_num <= 0)
                {
                    emit thread_signal(-1);
                }


                /*根据序列号执行对应的函数并且发送信号携带一个Int值给主线程，
                主线程根据返回值，在对接收到的数据进行处理*/
             //   printf("recv_com_num : \n" ,recv_com_num);
             switch(recv_com_num)
                {

                    case 40:{emit thread_signal (fx_COM40());break;}//wifi udp send
                    case 41:{emit thread_signal (fx_COM41());break;}//wifi reset
                    case 42:{emit thread_signal (fx_COM42());break;}//wifi refresh
                    case 43:{emit thread_signal (fx_COM43());break;}//wifi connect
                    case 44:{emit thread_signal (fx_COM44());break;}//wifi udp
                    case 45:{emit thread_signal (fx_COM45());break;}//wifi udp
                    case 46:{emit thread_signal (fx_COM46());break;}//wifi udp
                    case 47:{emit thread_signal (fx_COM47());break;}//wifi udp
                    case 48:{emit thread_signal (auto_connect()) ;break;}

                }
            }
            is_lock = 0 ; //free connect
        }

    }

    pthread_exit(0);
}

int Wifithread::tcp_init(void)
{

   int nready ;
    //char bufs[100] ;

    bzero(&server_addr, sizeof(server_addr)) ;
    server_addr.sin_family = AF_INET ;
    server_addr.sin_addr.s_addr = htonl(INADDR_ANY) ;
    server_addr.sin_port = htons(8556) ;
    socklen_t client_len = sizeof(client_addr) ;

    lsock = socket(AF_INET, SOCK_STREAM, 0) ;
        if(lsock < 0)
        {
            //handle_error("socket") ;
            printf("socket \n") ;
        }
        int on = 2;
        /*set addr reuse*/
        if( setsockopt(lsock, SOL_SOCKET, SO_REUSEADDR,
                    &on, sizeof(on)) < 0)
        {
            //handle_error("setsocket") ;
            printf("setsocket \n") ;
        }


        //bind
        if( bind(lsock, (struct sockaddr*)&server_addr, sizeof(server_addr)) <0 )
        {
            //handle_error("bind") ;
             printf("bind \n") ;
        }
        //linsten
        if(listen(lsock, 100) < 0)
        {
            //handle_error("listen") ;
               printf("listen \n") ;
        }
        pfd[0].fd = lsock ;
        pfd[0].events = POLLRDNORM ;
        while(1)
        {
            nready = poll(&pfd[0], 1, -1 ) ;
            if(nready > 0)
            {

                if( pfd[0].revents & (POLLRDNORM | POLLERR) )
                {
                   printf("accept ok \n") ;
                    connfd = accept(lsock, (struct sockaddr *)&client_addr, &client_len) ;
                    if(connfd < 0)
                    {
                        //handle_error("accept") ;
                        printf("accept \n") ;
                    }
                }
                break ;
            }
        }

        pfd[1].fd = connfd ;
        pfd[1].events = POLLIN ;


        //struct timeval tv;

   return 0 ;
}
int Wifithread::parser_com(char *com_buffer)
{
    int i;
    char recv_com[4] ;

    for(i=0; i<3; i++)
    {
        recv_com[i] = com_buffer[i] ;
    }
    recv_com[3] = '\0';

   if(strcmp(recv_com,"WIF") == 0)
    {
        return (com_buffer[4]-48 + 40) ;
    }

    return -1 ;
}
int Wifithread::fx_COM41(void)
{
    //int WR_n_datas(int fd, int com_len, int ret_len, const unsigned char* com,unsigned char* rbuf, int ms_timeout) ;
   //设置wifi模式
    const char *com = "AT+CWMODE=1\r\n" ;
    const char *com1 = "AT+RST\r\n" ;
   bzero(wifi_big_buffer, 1000) ;
    if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com) , 2048, com, wifi_big_buffer, 100)) <0 )//
    {
        printf("set failed.\n") ;
        //return -1 ;
    }else
    {
        printf("\n wifi send => %s \n", wifi_big_buffer) ;
    }
    //重启
    bzero(wifi_big_buffer, 1000) ;
    if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com1), 2048, com1, wifi_big_buffer, 100)) <0 )//
    {
          printf("reset failed.\n") ;
        //return -1 ;
    }
    else
    {
         printf("\n wifi send==> %s\n", wifi_big_buffer) ;
    }

    return 41 ;
}

int Wifithread::fx_COM42(void)
{
     const char *com = "AT+CWLAP\r\n" ;
     char loop_times ;

     for(loop_times=0; loop_times<4; loop_times++ )
     {
          bzero(wifi_big_buffer, 1024) ;
          if( (this->wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, strlen(com), 1024, com, wifi_big_buffer, 500)) <0 )//
          {
             // printf("get ip failed.\n") ;
              //return -1 ;
          }
          else
          {
              printf("-------------------------------------------------\n") ;
               printf("\n wifi send==> %s\n", wifi_big_buffer) ;
              printf("-------------------------------------------------\n") ;
          }
        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, wifi_big_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        if( ret.contains("OK") && ret.contains("AT+CWLAP" ) )
            break ;
        sleep(1) ;
    }

    if(loop_times > 3)
     {
        bzero(wifi_big_buffer, 1024) ;
     }

        return 42 ;

}

int Wifithread::fx_COM43(void)
{
    //连接路由
    //char *com = "AT+CWJAP=\"dalu\",\"da123456\"\r\n" ;
   // bzero(wifi_big_buffer, 1000) ;
    char *p = &wifi_buffer[5];
    int i = 0 ;
    int buf_len  ;
    char com[128] ;
    char loop_times ;
    bzero(com, 128) ;
    bzero(wifi_big_buffer, 1000) ;
    //把要发送的内容存下来
    while(*p != '\0')
    {
        wifi_recv[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    buf_len =  strlen(wifi_recv) ;

    for(loop_times=0; loop_times<3; loop_times++)
    {
        if( (this->wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, strlen(wifi_recv), 2048, wifi_recv, wifi_big_buffer, 200)) <0 )//
        {
            printf("connect failed.\n") ;
            //return -1 ;
        }
        else
        {
             printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> %s\n", wifi_big_buffer) ;
              printf("-------------------------------------------------\n") ;
        }

        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, wifi_big_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        bzero(wifi_big_buffer, 1000) ;
        if( ret.contains("WIFI GOT IP") || ret.contains("WIFI CONNECTED"))  //ret.contains("OK") &&
        {
            memcpy(wifi_big_buffer, "OK", 3) ;


            break ;
        }
        else
            memcpy(wifi_big_buffer, "NO", 3) ;
        sleep(1) ;
    }

    return 43 ;
}

int Wifithread::fx_COM44(void)
{
    //UDP

    char *p = &wifi_buffer[5];
    int i = 0 ;
    int buf_len  ;
    char com[128] ;
    char loop_times ;
    bzero(com, 128) ;
    bzero(wifi_big_buffer, 1000) ;
    //把要发送的内容存下来
    while(*p != '\0')
    {
        wifi_recv[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    buf_len =  strlen(wifi_recv) ;

    for(loop_times=0; loop_times<3; loop_times++)
    {
        if( (this->wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, strlen(wifi_recv), 2048, wifi_recv, wifi_big_buffer, 100)) <0 )//
        {
            printf("connect failed.\n") ;
            //return -1 ;
        }
        else
        {
             printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> %s\n", wifi_big_buffer) ;
              printf("-------------------------------------------------\n") ;
        }

        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, wifi_big_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        if((ret.contains("OK") && ret.contains("CONNECT")) || (ret.contains("ALREADY CONNECTED")))
        {
            memcpy(wifi_big_buffer, "OK", 3) ;
            break ;
        }
        else
            memcpy(wifi_big_buffer, "NO", 3) ;
        sleep(1) ;

    }

    return 44 ;
}
int Wifithread::fx_COM45(void)
{
    /*
    wifi send==> AT+CIFSR
    +CIFSR:STAIP,"0.0.0.0"
    +CIFSR:STAMAC,"18:fe:34:d7:e8:39"

    OK
    */
    //查询IP
   const char *com = "AT+CIFSR\r\n" ;
    bzero(wifi_big_buffer, 1000) ;
    if( (this->wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, strlen(com), 2048, com, wifi_big_buffer, 100)) <0 )//
    {
       // printf("get ip failed.\n") ;
        //return -1 ;
    }
    else
    {
        printf("-------------------------------------------------\n") ;
         printf("\n wifi send==> %s\n", wifi_big_buffer) ;
        printf("-------------------------------------------------\n") ;
    }
    return 45 ;
}
int Wifithread::fx_COM46(void)
{
    //设置参数
  // char *com = "AT+CWSAP=\"lulu\",\"11223344\",1,4\r\n" ;
    char *p = &wifi_buffer[5];
    int i = 0 ;
    int buf_len  ;
    char com[128] ;
    char loop_times ;
    bzero(com, 128) ;
    bzero(wifi_big_buffer, 1000) ;
    //把要发送的内容存下来
    while(*p != '\0')
    {
        wifi_recv[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    buf_len =  strlen(wifi_recv) ;

    for(loop_times=0; loop_times<3; loop_times++)
    {
        if( (this->wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, strlen(wifi_recv), 2048, wifi_recv, wifi_big_buffer, 1000)) <0 )//
        {
            printf("connect failed.\n") ;
            //return -1 ;
        }
        else
        {
             printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> %s\n", wifi_big_buffer) ;
              printf("-------------------------------------------------\n") ;
        }

        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, wifi_big_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        bzero(wifi_big_buffer, 1000) ;
        if(ret.contains("OK") && ret.contains("AT+CWSAP") )
        {
            memcpy(wifi_big_buffer, "OK", 3) ;
            break ;
        }
        else
            memcpy(wifi_big_buffer, "NO", 3) ;
    }
    /*
    OK
    AT+CWSAP="lulu","11223344",1,4

    OK

    */
    return 46 ;
}

int Wifithread::fx_COM47(void)
{
     const char *com = "AT+CWLIF\r\n" ;
     char loop_times ;
     for(loop_times=0; loop_times<4; loop_times++ )
     {
          bzero(wifi_big_buffer, 1024) ;
          if( (this->wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, strlen(com), 1024, com, wifi_big_buffer, 500)) <0 )//
          {
             // printf("get ip failed.\n") ;
              //return -1 ;
          }
          else
          {
              printf("-------------------------------------------------\n") ;
               printf("\n wifi send==> %s\n", wifi_big_buffer) ;
              printf("-------------------------------------------------\n") ;
          }
        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, wifi_big_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        if( ret.contains("OK") && ret.contains("AT+CWLIF" ) )
            break ;
        usleep(5000) ;
    }
    if(loop_times < 4)
        return 47 ;
    else
        return -1 ;
}

int Wifithread::fx_COM40(void)
{

    //const char *p =  (QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss")+ "\r\n").toLocal8Bit().constData();//&wifi_buffer[5];
    int i = 0 ;
    int buf_len = 0 ;
    QString hand_shake ;
    char com[512] ;
    bzero(com, 512) ;
    bzero(wifi_big_buffer, 1000) ;

    char *p = &wifi_buffer[5];

    //把要发送的内容存下来
    while( (*p != '`') && (*(p+1)!='!' ) )
    {
        //int ll ;
        wifi_recv[i++] = *p ;
        p++ ;
        //printf("") ;
        buf_len++ ;
    }
    //*p = '\0' ;
    wifi_recv[i] = '\0' ;
    //buf_len =  strlen(wifi_recv) ;
    //握个手，告诉WIFI要发多少数据
    hand_shake = "AT+CIPSEND=" + QString("%1\r\n").arg(buf_len) ;
    memcpy(com, hand_shake.toLocal8Bit().constData(), hand_shake.toLocal8Bit().length()) ;
    if( (this->wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, strlen(com), 2048, com, wifi_big_buffer, 100)) <0 )//
    {
        printf("send failed.\n") ;
        //return -1 ;
    }
    else
    {

        bzero(wifi_big_buffer, 1000) ;
        if( wifi_serial.WR_n_datas(uart_config[wifi_serial_use].fd, buf_len, 2048, wifi_recv, wifi_big_buffer, 100)< 0 )
        {

                printf("Send print com failed~!\\r") ;
        }
        else
        {
            printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> \n%s\n", wifi_big_buffer) ;
            printf("-------------------------------------------------\n") ;
        }
    }


    return 40 ;
}

 void Wifithread::timerEvent(QTimerEvent *)
{
    if(!is_lock)
    {
        is_lock = 1 ; //forbidden connect

        //连接UDP
        if(connect_UDP() < 0)                   //没有连接上UDP，检测有没有连接wifi
        {
            //查询有无连接上
            if(check_wifi_connect() < 0)    //没有连接wif
            {
                //连接wifi
                if( connect_wifi() == 0)          //连接wifi成功，接着连接udp
                {
                    //连接UDP
                    if(connect_UDP() == 0)     //连接udp成功
                    {
                        //发送信息
                        //fx_COM40() ;                   // 发送信息
                    }

                }

            }
            else                                                //已连接wif
            {
                //连接UDP
                if(connect_UDP() == 0)        //连接udp成功
                {
                    //发送信息
                   // fx_COM40() ;                      // 发送信息
                }
            }
        }
        else                                                    //已连接UDP
        {
            //发送信息
            //fx_COM40() ;                              // 发送信息
        }

        is_lock = 0 ; //free connect
    }

}


int Wifithread::check_wifi_connect(void)
{
    /*
    wifi send==> AT+CIFSR
    +CIFSR:STAIP,"0.0.0.0"
    +CIFSR:STAMAC,"18:fe:34:d7:e8:39"

    OK
    */
    fx_COM45() ;
    char ret_char[1024] ;

    bzero(ret_char, 1024) ;
    memcpy(ret_char, wifi_big_buffer, 1023) ;
    ret_char[1023] = '\0' ;
    QString ret = QString::fromLocal8Bit(ret_char) ;

    if( (!ret.contains("AT+CIFSR")) ||  (!ret.contains("+CIFSR:STAMAC"))  || (!ret.contains("+CIFSR:STAIP")) ) //
    {
        emit wifi_state(0);
        return -1 ;
    }
    else
    {
        if( ret.contains("+CIFSR:STAIP,\"0.0.0.0\"") )
        {
            emit wifi_state(0);
            return -1 ;
        }
    }
    emit wifi_state(1);
    return 0 ;
}
int Wifithread::connect_wifi(void)
{
    QString comline ;
    comline = comline + + "WIF03"
              + "AT+CWJAP="
              + "\"" +wifi_ssid + "\""
              + ","
              + "\"" + wifi_pws + "\"\r\n";
    //qDebug() << comline ;
    //还未设置字符个数
     memcpy(wifi_buffer, comline.toLocal8Bit().constData(), comline.toLocal8Bit().length() + 1);


     fx_COM43() ;  //连续连3次
    char ret_char[4] ;
    bzero(ret_char, 4) ;
    memcpy(ret_char, wifi_big_buffer, 4) ;
    ret_char[3] = '\0' ;
    QString ret = QString::fromLocal8Bit(ret_char) ;
    if(ret.contains("OK")) //
    {
        //emit wifi_state(1);
        return 0 ;
    }
    else
    {
        //emit wifi_state(0);
        return -1 ;
    }

}
int Wifithread::connect_UDP(void)
{
    QString comline ;
    comline = comline + "WIF04"
              + "AT+CIPSTART=\"UDP\",\"255.255.255.255\",1024\r\n" ; //2002

    memcpy(wifi_buffer, comline.toLocal8Bit().constData(), comline.toLocal8Bit().length() + 1);

    fx_COM44() ;  //连续连3次
    char ret_char[4] ;
    bzero(ret_char, 4) ;
    memcpy(ret_char, wifi_big_buffer, 3) ;
    ret_char[2] = '\0' ;
    QString ret = QString::fromLocal8Bit(ret_char) ;
    if(ret.contains("OK")) //
    {
         emit wifi_state(1);
       return 0 ;
   }
    else
    {
         emit wifi_state(0);
       return -1 ;
   }
}


int Wifithread::auto_connect()
{

    //连接wifi
    if( connect_wifi() < 0)          //连接wifi成功，接着连接udp
        if(connect_wifi() < 0)
        {
            memcpy(wifi_big_buffer, "connect failed!", 18) ;
            return 48 ;
        }
    //连接UDP
    sleep(3) ;
    if(connect_UDP() == 0)     //连接udp成功
        memcpy(wifi_big_buffer, "connect succssful!", 18) ;
    else
        memcpy(wifi_big_buffer, "connect failed!", 18) ;
    return 48 ;
}
int Wifithread::auto_check()
{
    if(connect_UDP() == 0)     //连接udp成功
    {
        check_wifi_connect() ;
        return 0 ;
    }
    return -1 ;
}
