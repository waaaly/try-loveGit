#include <QDateTime>
#include <stdio.h>
#include <stdlib.h>
#include "mythread.h"
#include "myhelper.h"
#include "myserial.h"

#include <QDebug>


#define FIFO_NAME "./my_fifo"                                                   //fifo���ŵ�Ŀ¼



extern unsigned char head_buffer[BUFFER_SIZE+1] ;         //����24�ֽ�ͷ
extern unsigned char idfile_buffer[BUFFER_SIZE] ;
extern unsigned int package[BUFFER_SIZE];                          //���մ����ݰ�
extern unsigned char card_value[3] ;                                        //���տ���ֵ
extern unsigned char G_COM[24] ;
char buffer[BUFFER_SIZE + 1];
char recv_print[512] ;
UART_COF uart_config[5] ;
uchar th_serial_use ;
uchar print_serial_use ;
uchar upload_serial_use ;
uchar wifi_serial_use ;
uchar IC_serial_use ;

float ad_t,ad_h; // ��ʪ��

Mythread::Mythread(QObject *parent) :
    QThread(parent)
{
    th_serial_use = 4 ;
    uart_config[4].baud = 57600 ;
    uart_config[4].name = "/dev/ttyO5" ; //ttyS3
    th_serial.BAUD = B57600 ;
    strcpy( th_serial.uart_name, "/dev/ttyO5" ) ;//"/dev/ttyO1"

    print_serial_use = 3 ;
    uart_config[3].baud  = 9600 ;
    uart_config[3].name =  "/dev/ttyO4" ; //S2
    print_serial.BAUD = B9600 ;  //9600
    strcpy( print_serial.uart_name, "/dev/ttyO4") ; //S2

    upload_serial_use = 2 ;
    uart_config[2].baud = 9600 ;
    uart_config[2].name =  "/dev/ttyO3" ;
    upload_serial.BAUD = B9600 ;
    strcpy( upload_serial.uart_name,  "/dev/ttyO3") ;

    IC_serial_use = 1 ;
    uart_config[1].baud = 115200 ;
    uart_config[1].name =  "/dev/ttyS5" ;
    IC_serial.BAUD = B115200 ; //B230400 230400
    strcpy( IC_serial.uart_name, "/dev/ttyS5") ;

    wifi_serial_use = 0 ;
    uart_config[0].baud = 115200 ;
    uart_config[0].name =  "/dev/ttyS7" ;
    wifi_serial.BAUD = B115200 ;
    strcpy( wifi_serial.uart_name, "/dev/ttyS7") ;



    if( this->th_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
      this->serial_ok = false ;
    }
    else
    {
        uart_config[4].fd = th_serial.in_fd ;
        this->serial_ok = true ;
    }
    //
    if( this->print_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
        this->print_serial_ok = false ;
    }
    else
    {
        uart_config[3].fd = print_serial.in_fd ;
        this->print_serial_ok = true ;
    }
    //
    if( this->upload_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.

        this->upload_serial_ok = false ;
    }
    else
    {
        uart_config[2].fd = upload_serial.in_fd ;
        this->upload_serial_ok = true ;
    }
    //
    if( this->wifi_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.

        this->wifi_serial_ok = false ;
    }
    else
    {
        uart_config[0].fd = wifi_serial.in_fd ;
        this->wifi_serial_ok = true ;
    }
    //
    if( this->IC_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.

        this->ic_serial_ok = false ;
    }
    else
    {
        uart_config[1].fd = IC_serial.in_fd ;
        this->ic_serial_ok = true ;
    }


}
//�߳�����������
void Mythread::run()
{
    int nread = 0;
    int nready ;

    int recv_com_num ;                                                  //���Ž��յ����������к�


     tcp_init() ;


//    fx_COM17(0);

    while(serial_ok)
    {
        //�ȴ����̷߳�֪ͨ
       // nread = read(fifo_fd, buffer, COM_NAME_LEN);
        printf("s_thread waitting.. \n") ;
        nready = poll(&pfd[1], 1, -1 ) ;
                    if(nready < 0 )
                                continue ;
        if( pfd[1].revents & (POLLIN | POLLERR) )
        {
            bzero(buffer, COM_NAME_LEN) ;
            if( (nread = read(pfd[1].fd, buffer, COM_NAME_LEN)) < 0)//读tcp数据
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
            printf("serial recv command :%s\n",buffer) ;
            //������������Ӧ�����к�

            recv_com_num = this->parser_com(buffer);//解析发送包

            if(recv_com_num <= 0)
            {
                emit thread_signal(-1);
            }
            qDebug() <<__LINE__ <<__FUNCTION__<<"serial case : "<< recv_com_num;

            /*�������к�ִ�ж�Ӧ�ĺ������ҷ����ź�Я��һ��Intֵ�����̣߳�
            ���̸߳��ݷ���ֵ���ڶԽ��յ������ݽ��д���*/
         switch(recv_com_num)
            {
                case 1:{emit thread_signal (fx_COM1());break;}
                case 2:{emit thread_signal (fx_COM2());break;}
                case 3:{emit thread_signal (fx_COM3());break;}
                case 4:{emit thread_signal (fx_COM4());break;}
                case 5:{emit thread_signal (fx_COM5());break;}//test
                case 6:{emit thread_signal (fx_COM6());break;}
                case 7:{emit thread_signal (fx_COM7());break;} //read barcode
                case 8:{emit thread_signal (fx_COM8());break;}//printno use
                case 9:{emit thread_signal (fx_COM9());break;}//
                case 10:{emit thread_signal (fx_COM10());break;}//��ȡ��˾����
                case 13:{emit thread_signal (fx_COM13());break;}//�Զ������Լ���
                case 14:{for(loop_num=0; loop_num<10; loop_num++){fx_COM14() ;usleep(500000);}
                                        emit thread_signal (15);break;}//д�궨ֵ
                case 15:{emit thread_signal (fx_COM15());break;}//��ȡ�궨ֵ
                case 16:{for(loop_num=0; loop_num<5; loop_num++){fx_COM16() ;usleep(500000);}
                                        emit thread_signal (16);break;}//дע����

                case 17:{emit thread_signal (fx_COM17(buffer[5]- '0'));}break; // �߹�·��
                case 18:{emit thread_signal (fx_COM18());}break;               // ȡ��ʪ��

                case 20:{emit thread_signal (fx_COM20());break;}
                case 21:{emit thread_signal (fx_COM21());break;}



               // case 22:{emit thread_signal(fx_COM22());break;}
                case 30:{emit thread_signal (fx_COM30());break;}//upload
                case 31:{emit thread_signal (fx_COM31());break;}//reset serial


                case 40:{emit thread_signal (fx_COM40());break;}//wifi udp send
                case 41:{emit thread_signal (fx_COM41());break;}//wifi reset
                case 42:{emit thread_signal (fx_COM42());break;}//wifi refresh
                case 43:{emit thread_signal (fx_COM43());break;}//wifi connect
                case 44:{emit thread_signal (fx_COM44());break;}//wifi udp
                case 45:{emit thread_signal (fx_COM45());break;}//wifi udp
                case 46:{emit thread_signal (fx_COM46());break;}//wifi udp
                case 47:{emit thread_signal (fx_COM47());break;}//wifi udp



                case 50:{emit thread_signal (fx_COM50());break;} //ICcard init
                case 51:{emit thread_signal (fx_COM51());break;} //ICcard init/* client[CLIENT_MAX]*/
                case 52:{emit thread_signal (fx_COM52());break;} //ICcard R BLOCK
                case 53:{emit thread_signal (fx_COM53());break;} //ICcard W BLock
                case 54:{emit thread_signal (fx_COM54());break;} //ICcard W BLock
                case 55:{emit thread_signal (fx_COM55());break;} //ICcard W BLock
                case 56:{emit thread_signal (fx_COM56());break;} //ICcard W BLock


                case 61:{emit thread_signal (fx_COM61());break;}
                case 62:{emit thread_signal (fx_COM62());break;}
                case 63:{emit thread_signal (fx_COM63());break;}
                case 64:{emit thread_signal (fx_COM64());break;}
                case 65:{emit thread_signal (fx_COM65());break;}


                case 71:{emit thread_signal (fx_COM71());break;}
                case 72:{emit thread_signal (fx_COM72());break;}
                case 73:{emit thread_signal (fx_COM73());break;}
                case 74:{emit thread_signal (fx_COM74());break;}
                case 75:{emit thread_signal (fx_COM75());break;}


                case 80:{emit thread_signal (fx_COM80());break;}

            }
        }
    }

    pthread_exit(0);
}


int Mythread::parser_com(char *com_buffer)
{
    int i;
    char recv_com[4] ;
    printf("com_buffer = %s\n",com_buffer);
    for(i=0; i<3; i++)
    {
        recv_com[i] = com_buffer[i] ;
    }
    recv_com[3] = '\0';
    if(strcmp(recv_com,"COM") != 0)
    {
        if(strcmp(recv_com,"PRI") == 0)
        {
             return (com_buffer[4]-48 + 20) ;
        }
        else if(strcmp(recv_com,"UPL") == 0)
        {
            return (com_buffer[4]-48 + 30) ;
        }
        else if(strcmp(recv_com,"WIF") == 0)
        {
            return (com_buffer[4]-48 + 40) ;
        }
        else if(strcmp(recv_com,"ICC") == 0)
        {
            return (com_buffer[4]-48 + 50) ;
        }
        else return -1 ;
    }
    else
    {
        return ((com_buffer[3]-48)*10 + com_buffer[4]-48) ;
    }
    return -1 ;
}

 int Mythread::tcp_init(void)
 {

    int nready ;
     //char bufs[100] ;

     bzero(&server_addr, sizeof(server_addr)) ;
     server_addr.sin_family = AF_INET ;
     server_addr.sin_addr.s_addr = htonl(INADDR_ANY) ;
     server_addr.sin_port = htons(8555) ;
     socklen_t client_len = sizeof(client_addr) ;

     lsock = socket(AF_INET, SOCK_STREAM, 0) ;
         if(lsock < 0)
         {
             printf("socket faulst！！！ \n") ;
         }
         int on = 2;
         /*set addr reuse*/
         if( setsockopt(lsock, SOL_SOCKET, SO_REUSEADDR,
                     &on, sizeof(on)) < 0)
         {
             printf("set socket faulst!!!\n") ;
         }

         //bind
         if( bind(lsock, (struct sockaddr*)&server_addr, sizeof(server_addr)) <0 )
         {
              printf("bind faulst!!!\n") ;
         }
         //listen
         if(listen(lsock, 100) < 0)
         {
                printf("listen faulst！！！\n") ;
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
                    printf("socket accept ok \n") ;
                     connfd = accept(lsock, (struct sockaddr *)&client_addr, &client_len) ;
                     if(connfd < 0)
                     {
                         printf("socket accept： \n") ;
                     }
                 }
                 break ;
             }
         }

         pfd[1].fd = connfd ;
         pfd[1].events = POLLIN ;

    return 0 ;
 }

void Mythread::stop_get(void)
{
    serial_ok = false;
}

int Mythread::fx_COM0(void)
{
    unsigned char rbuf[1024] ;
    ::close(th_serial.in_fd) ;

    if( this->th_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
      this->serial_ok = false ;
    }
    else
    {
        this->serial_ok = true ;
    }
   th_serial.Get_data(th_serial.in_fd, rbuf, 256, 1024) ;

    return 0 ;
}

int Mythread::fx_COM1(void)
{
    if( (this->th_serial.WR_24_datas(th_serial.in_fd, sw_RCard, head_buffer, 6000)) <0 )//
    {

            return -1 ;
    }
    else if( head_buffer[4]== 0x00)
    {
            for(int i=0;i<3;i++)
            {
                card_value[i] = 0 ;
            }
            for(int i=0;i<3;i++)
            {
                card_value[i] = head_buffer[7+i] ;
            }
            if( (th_serial.Parse_nums_datas(th_serial.in_fd, head_buffer, 6000, win_lenth, package)) <0 )
                return -1;
            else
            {

            }
    }
    else if(head_buffer[4]== 0x03)
    {

        return -2 ;
    }
    else if(head_buffer[4]== 0x04)
    {

        return -3 ;
    }

    return 1 ;
}
int Mythread::fx_COM2(void)
{

    return 2 ;
}
int Mythread::fx_COM3(void)
{
    //int i ;
   // for(i=0; i<24; i++)
     //   printf("Rest: 0x%x \n", Rest[i]) ;
    if( (this->th_serial.WR_24_datas(uart_config[th_serial_use].fd, Rest, head_buffer, 4000)) <0 )//
    {

            return -1 ;
    }
    return 3 ;
}
int Mythread::fx_COM4(void)
{
    if( (this->th_serial.WR_24_datas(uart_config[th_serial_use].fd, Drop, head_buffer, 6000)) <0 )//
    {

            return -1 ;
    }
    return 4 ;
}
int Mythread::fx_COM5(void)
{

    if( th_serial.Send_data(uart_config[th_serial_use].fd, Test, 24, 5000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
            printf("Send COM failed~!\n") ;
            //return -1;
    }
    else
    {
        if( (th_serial.Parse_nums_datas(uart_config[th_serial_use].fd, head_buffer, 3000, win_lenth,package)) <0 )
            return -1;
        else
        {

        }
    }
    return 5 ;
}


int Mythread::fx_COM6(void)
{

    return 6 ;
}

int Mythread::fx_COM7(void)
{
    char WWAdjust[24]  =  {0x01,0x00,0x00,0x08,  0x00,0x00,0x00,0x00,
                                             0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,
                                             0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x09 } ;
    if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, WWAdjust, head_buffer, 6000)) <0 )//
    {
            return -1 ;
    }
    else
    {
        if( head_buffer[4]== 0x00)
        {
            for(int i=0;i<3;i++)
            {
                card_value[i] = 0 ;
            }
            for(int i=0;i<3;i++)
            {
                card_value[i] = head_buffer[7+i] ;
            }
        }
        else
            return -2 ;
    }
    return 7 ;

}

int Mythread::fx_COM8(void)
{

    return 8 ;
}

int Mythread::fx_COM9(void)
{
    int nread ;
    unsigned char tmp_buffer[25] ;
    if( th_serial.Send_data(uart_config[th_serial_use].fd, Ridc, 24, 6000) < 0 )
    {
            printf("Send print com failed~!\n") ;
            return -1;
    }
    printf("getting idcard datas --> \n") ;
    if ((nread = th_serial.Get_data(uart_config[th_serial_use].fd, tmp_buffer, 24, 2000)) !=24)
    {
             printf("read idcard failed~!\n") ;
            return -1 ;
    }
    else if(tmp_buffer[8] != 0)
    {
            printf("no card~!\n") ;

            return -5 ;
    }

    //bzero(idfile_buffer, sizeof(idfile_buffer)) ;
    if ((nread = th_serial.Get_data(uart_config[th_serial_use].fd, idfile_buffer, 4096, 4000)) !=4096)
    {
        return -1 ;
    }
     printf("read over idcard datas --> \n") ;
    if((nread = th_serial.Get_data(uart_config[th_serial_use].fd, tmp_buffer, 4, 4000)) !=4)
    {
            printf("read card failed~!\n") ;
            return -1 ;
    }
    return 9 ;
}

int Mythread::fx_COM10(void)
{
    if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, Drop, head_buffer, 6000)) <0 )//
    {

            return -1 ;
    }
    return 10 ;
}

int Mythread::fx_COM13(void)
{
    if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, ChC, head_buffer, 1000)) <0 )//
    {

            return -1 ;
    }
    return 13 ;
}
/*�ȴ�����ֵ���ٴ���ȡֵ*/
int Mythread::fx_COM14(void)
{
    //uint j ;
    uint tmp = 0;

    char WWAdjust[24]  =  {0x01,0x00,0x00,0x02,  0x0d,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x11 } ;

    if(loop_num > 4)                    //�����ı�׼ֵ--
    {
        WWAdjust[4] = 0x0c ;
        WWAdjust[5] = loop_num - 4 ;
    }
    else
        WWAdjust[5] = loop_num + 1 ;



    WWAdjust[7]  = adjust_v[loop_num][2] ;
    WWAdjust[8]  = adjust_v[loop_num][1] ;
    WWAdjust[9]  = adjust_v[loop_num][0] ;
    for(int i=0; i<23; i++)
        tmp+=WWAdjust[i] ;
    WWAdjust[23] = tmp%256 ;



    if( th_serial.WR_24_datas(th_serial.in_fd, WWAdjust, head_buffer, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
            printf("Send COM failed~!\n") ;
            return -1;
    }


    return 15 ;
}



int Mythread::fx_COM15(void)
{
    int i ;
    char RVersion[24] = {0x01,0x00,0x01,0x02,  0x1d,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x21 };
    char RAdjust[24] = {0x01,0x00,0x01,0x02,  0x0c,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x11 };

    if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, RVersion, head_buffer, 1000)) <0 )//
    {
        printf("read failed.\n") ;
        return -1 ;
    }else{
        memcpy(version, &head_buffer[7], 8) ;
    }

    usleep(550000);

    for(i=0; i<5; i++)
    {
         RAdjust[5] = i+1 ;

        if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, RAdjust, head_buffer, 1000)) <0 )//
        {
            printf("read failed.\n") ;
            return -1 ;
        }
        else
        {
            adjust_std[i] = (head_buffer[7]<<16) +  (head_buffer[8]<<8) + head_buffer[9];
        }
        RAdjust[23] ++ ;
        usleep(550000);
        //sleep(1) ;
    }
    //
    RAdjust[4] ++ ;
    RAdjust[5] = 1 ;
    RAdjust[23] = 0x12 ;
    for(i=0; i<5; i++)
    {
         RAdjust[5] = i +1 ;

        if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, RAdjust, head_buffer, 1000)) <0 )//
        {
            printf("read failed.\n") ;
            return -1 ;
        }
        else
        {
            adjust_cur[i] = (head_buffer[7]<<16) +  (head_buffer[8]<<8) + head_buffer[9];
        }
        RAdjust[23] ++ ;
        usleep(550000);
    }
    return 15 ;
}

int Mythread::fx_COM16(void)
{
    //uint j ;
    uint tmp = 0;
     static uchar Wreg[24]  =  {0x01,0x00,0x00,0x02,  0x1f,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x10 } ;


        Wreg[5] = loop_num + 1;

        for(int i=7; i<17; i++)
            Wreg[i]  = register_array[loop_num][i-7] ;

        for(uint i=0; i<23; i++)
            tmp+=Wreg[i] ;
        Wreg[23] = tmp%256 ;


        if( th_serial.WR_24_datas(th_serial.in_fd, Wreg, head_buffer, 3000) < 0  )  //sizeof(com) = sizeof(char) ,
        {
                printf("Send COM failed~!\n") ;
                return -1;
        }

    return 16 ;
}

int Mythread::fx_COM20(void)
{
    char *p = &buffer[5];
    int i = 0 ;
    bzero(recv_print, sizeof(recv_print)) ;
    while(*p != '\0')
    {
        recv_print[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;

    if( print_serial.Send_data( uart_config[print_serial_use].fd, recv_print, strlen(recv_print), 6000) < 0 )
    {

            printf("Send print com failed~!\n") ;

            return -1;
    }
    return 20 ;
}
int Mythread::fx_COM21(void)
{

    unsigned char tmp[4] = {0x10, 0x04, 4, 2} ;

    bzero(head_buffer, 1024) ;
    if( print_serial.WR_n_datas(uart_config[print_serial_use].fd, 3, 1, tmp, head_buffer,  3000) < 0 )// int com_len, int ret_len, const unsigned char* com,unsigned char* rbuf, int ms_timeout)
    {
            printf("Send print com failed~!\\r") ;
            head_buffer[0] = 'o' ;
           // return -1;
    }

    return 21 ;
}

int Mythread::fx_COM22(void)
{
    int nread ;
    char *p = &buffer[5];
    int i = 0 ;
    for(;i<2;i++)
    {
        recv_print[i] = *p ;
        p++ ;
        printf("recv_print[%d]:%x",i,recv_print[i]) ;
    }

    if( print_serial.Send_data(print_serial.in_fd, recv_print, 2, 2000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -1;
    }
    if ((nread = print_serial.Get_data(print_serial.in_fd, head_buffer, 1, 1000)) !=1)
    {
        return -1 ;
    }

    if(head_buffer[0] == 0x04)
    {
        return -4 ;
    }

    return 22 ;
}

int Mythread::fx_COM30(void)
{
    char *p = &buffer[5];
    int q = 0 ;
    int i = 0 ;
    while(*p != '\0')
    {
        recv_print[i++] = *p ;
        p++ ;
        q++ ;
    }
    *p = '\0' ;

    if( upload_serial.WR_n_datas(uart_config[upload_serial_use].fd, q, q, recv_print, head_buffer, 3000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -1;
    }
    return 30 ;
}
int Mythread::fx_COM31(void)
{
    char *p = &buffer[5] ;
    int i = 0 ;
    int baud ;
    bzero(recv_print, 128) ;
    while(*p != '\0')
    {
        recv_print[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    baud = QString::fromAscii(recv_print).toInt() ;
    switch(baud)
    {
        case 600:upload_serial.BAUD = B600;break ;
        case 1200: upload_serial.BAUD = B1200;break ;
        case 2400:upload_serial.BAUD = B2400;break ;
        case 4800: upload_serial.BAUD = B4800;break ;
        case 9600:upload_serial.BAUD = B9600;break ;
        //case 14400: upload_serial.BAUD = B14400;break ;
        case 19200:upload_serial.BAUD = B19200;break ;
       // case 56000: upload_serial.BAUD = B56000;break ;
        case 57600: upload_serial.BAUD = B57600;break ;
        case 115200: upload_serial.BAUD = B115200;break ;
        //case 128000: upload_serial.BAUD = B128000;break ;
       // case 256000: upload_serial.BAUD = B256000;break ;
        default:upload_serial.BAUD = B9600;break ;
    }
    ::close(upload_serial.in_fd) ;

    if( this->upload_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
      this->upload_serial_ok = false ;
    }
    else
    {
        this->upload_serial_ok = true ;
    }


    return 31 ;
}
int Mythread::fx_COM41(void)
{
    //int WR_n_datas(int fd, int com_len, int ret_len, const unsigned char* com,unsigned char* rbuf, int ms_timeout) ;
   //����wifiģʽ
    const char *com = "AT+CWMODE=1\r\n" ;
    const char *com1 = "AT+RST\r\n" ;
   bzero(head_buffer, 1000) ;
    if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com) , BUFFER_SIZE, com, head_buffer, 100)) <0 )//
    {
        printf("set failed.\n") ;
        //return -1 ;
    }else
    {
        printf("\n wifi send => %s \n", head_buffer) ;
    }
    //����
    bzero(head_buffer, 1000) ;
    if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com1), BUFFER_SIZE, com1, head_buffer, 100)) <0 )//
    {
          printf("reset failed.\n") ;
        //return -1 ;
    }
    else
    {
         printf("\n wifi send==> %s\n", head_buffer) ;
    }

    return 41 ;
}

int Mythread::fx_COM42(void)
{
     const char *com = "AT+CWLAP\r\n" ;
     char loop_times ;
     for(loop_times=0; loop_times<4; loop_times++ )
     {
          bzero(head_buffer, 1024) ;
          if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com), 1024, com, head_buffer, 500)) <0 )//
          {
             // printf("get ip failed.\n") ;
              //return -1 ;
          }
          else
          {
              printf("-------------------------------------------------\n") ;
               printf("\n wifi send==> %s\n", head_buffer) ;
              printf("-------------------------------------------------\n") ;
          }
        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, head_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        if( ret.contains("OK") && ret.contains("AT+CWLAP" ) )
            break ;
        usleep(10000) ;
    }
    if(loop_times < 4)
        return 42 ;
    else
        return -1 ;
}

int Mythread::fx_COM43(void)
{
    //����·��
    //char *com = "AT+CWJAP=\"dalu\",\"da123456\"\r\n" ;
   // bzero(head_buffer, 1000) ;
    char *p = &buffer[5];
    int i = 0 ;
    int buf_len  ;
    char com[128] ;
    char loop_times ;
    bzero(com, 128) ;
    bzero(head_buffer, 1000) ;
    //��Ҫ���͵����ݴ�����
    while(*p != '\0')
    {
        recv_print[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    buf_len =  strlen(recv_print) ;

    for(loop_times=0; loop_times<3; loop_times++)
    {
        if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(recv_print), BUFFER_SIZE, recv_print, head_buffer, 1000)) <0 )//
        {
            printf("connect failed.\n") ;
            //return -1 ;
        }
        else
        {
             printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> %s\n", head_buffer) ;
              printf("-------------------------------------------------\n") ;
        }

        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, head_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        bzero(head_buffer, 1000) ;
        if(ret.contains("OK") && ret.contains("AT+CWJAP")&& ret.contains("WIFI CONNECTED"))
        {
            memcpy(head_buffer, "OK", 3) ;
            break ;
        }
        else
            memcpy(head_buffer, "NO", 3) ;
    }

    return 43 ;
}

int Mythread::fx_COM44(void)
{
    //UDP

    char *p = &buffer[5];
    int i = 0 ;
    int buf_len  ;
    char com[128] ;
    char loop_times ;
    bzero(com, 128) ;
    bzero(head_buffer, 1000) ;
    //��Ҫ���͵����ݴ�����
    while(*p != '\0')
    {
        recv_print[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    buf_len =  strlen(recv_print) ;

    for(loop_times=0; loop_times<3; loop_times++)
    {
        if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(recv_print), BUFFER_SIZE, recv_print, head_buffer, 2000)) <0 )//
        {
            printf("connect failed.\n") ;
            //return -1 ;
        }
        else
        {
             printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> %s\n", head_buffer) ;
              printf("-------------------------------------------------\n") ;
        }

        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, head_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        if((ret.contains("OK") && ret.contains("CONNECT")) || (ret.contains("ALREADY CONNECTED")))
        {
            memcpy(head_buffer, "OK", 3) ;
            break ;
        }
        else
            memcpy(head_buffer, "NO", 3) ;

    }

    return 44 ;
}
int Mythread::fx_COM45(void)
{
    //��ѯIP
   const char *com = "AT+CIFSR\r\n" ;
    bzero(head_buffer, 1000) ;
    if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com), BUFFER_SIZE, com, head_buffer, 2000)) <0 )//
    {
       // printf("get ip failed.\n") ;
        //return -1 ;
    }
    else
    {
        printf("-------------------------------------------------\n") ;
         printf("\n wifi send==> %s\n", head_buffer) ;
        printf("-------------------------------------------------\n") ;
    }
    return 45 ;
}
int Mythread::fx_COM46(void)
{
    //���ò���
  // char *com = "AT+CWSAP=\"lulu\",\"11223344\",1,4\r\n" ;
    char *p = &buffer[5];
    int i = 0 ;
    int buf_len  ;
    char com[128] ;
    char loop_times ;
    bzero(com, 128) ;
    bzero(head_buffer, 1000) ;
    //��Ҫ���͵����ݴ�����
    while(*p != '\0')
    {
        recv_print[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    buf_len =  strlen(recv_print) ;

    for(loop_times=0; loop_times<3; loop_times++)
    {
        if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(recv_print), BUFFER_SIZE, recv_print, head_buffer, 1000)) <0 )//
        {
            printf("connect failed.\n") ;
            //return -1 ;
        }
        else
        {
             printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> %s\n", head_buffer) ;
              printf("-------------------------------------------------\n") ;
        }

        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, head_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        bzero(head_buffer, 1000) ;
        if(ret.contains("OK") && ret.contains("AT+CWSAP") )
        {
            memcpy(head_buffer, "OK", 3) ;
            break ;
        }
        else
            memcpy(head_buffer, "NO", 3) ;
    }
    /*
    OK
    AT+CWSAP="lulu","11223344",1,4

    OK

    */
    return 46 ;
}

int Mythread::fx_COM47(void)
{
     const char *com = "AT+CWLIF\r\n" ;
     char loop_times ;
     for(loop_times=0; loop_times<4; loop_times++ )
     {
          bzero(head_buffer, 1024) ;
          if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com), 1024, com, head_buffer, 500)) <0 )//
          {
             // printf("get ip failed.\n") ;
              //return -1 ;
          }
          else
          {
              printf("-------------------------------------------------\n") ;
               printf("\n wifi send==> %s\n", head_buffer) ;
              printf("-------------------------------------------------\n") ;
          }
        char ret_char[1024] ;
        bzero(ret_char, 1024) ;
        memcpy(ret_char, head_buffer, 1023) ;
        ret_char[1023] = '\0' ;
        QString ret = QString::fromLocal8Bit(ret_char) ;
        if( ret.contains("OK") && ret.contains("AT+CWLIF" ) )
            break ;
        usleep(10000) ;
    }
    if(loop_times < 4)
        return 47 ;
    else
        return -1 ;
}

int Mythread::fx_COM40(void)
{

    char *p = &buffer[5];
    int i = 0 ;
    int buf_len  ;
    QString hand_shake ;
    char com[512] ;
    bzero(com, 512) ;
    bzero(head_buffer, 1000) ;
    //��Ҫ���͵����ݴ�����
    while(*p != '\0')
    {
        recv_print[i++] = *p ;
        p++ ;
    }
    *p = '\0' ;
    buf_len =  strlen(recv_print) ;
    //�ո��֣�����WIFIҪ����������
    hand_shake = "AT+CIPSEND=" + QString("%1\r\n").arg(buf_len) ;
    memcpy(com, hand_shake.toLocal8Bit().constData(), hand_shake.toLocal8Bit().length()) ;
    if( (this->wifi_serial.WR_n_datas(this->wifi_serial.in_fd, strlen(com), BUFFER_SIZE, com, head_buffer, 2000)) <0 )//
    {
        printf("send failed.\n") ;
        //return -1 ;
    }
    else
    {
        printf("-------------------------------------------------\n") ;
         printf("\n wifi send==> \n%s\n", head_buffer) ;
        printf("-------------------------------------------------\n") ;

        bzero(head_buffer, 1000) ;
        if( wifi_serial.WR_n_datas(wifi_serial.in_fd, strlen(recv_print), BUFFER_SIZE, recv_print, head_buffer, 2000)< 0 )
        {

                printf("Send print com failed~!\\r") ;
        }
        else
        {
            printf("-------------------------------------------------\n") ;
             printf("\n wifi send==> \n%s\n", head_buffer) ;
            printf("-------------------------------------------------\n") ;
        }
    }


    return 40 ;
}
int Mythread::fx_COM50(void)
{
    char key[12] = {0x20, 0x00, 0x20, 0x60,    0xff,0xff,0xff,0xff,0xff,0xff,  0xd9, 0x03};
    char tmp = key[1] ;
    bzero(head_buffer, 1000) ;

    for(int k=2; k<(12-2); k++)
        tmp = ~(tmp ^ key[k]) ;
    key[10] = tmp ;

     if( (this->IC_serial.WR_n_datas(this->IC_serial.in_fd, 12, BUFFER_SIZE, key, head_buffer, 2000)) <0 )//
     {
        // printf("get ip failed.\n") ;
         //return -1 ;
     }
     else
     {
         printf("-------------------------------------------------\n") ;
         for(int i=0; i<20; i++)
          printf("\n wifi send==> 0x%x ", head_buffer[i]) ;
         printf("\n ") ;
         printf("-------------------------------------------------\n") ;
     }
    return 50 ;
}

int Mythread::fx_COM51(void)
{
    char key[7] = {0x20, 0, 0x21, 0x01,    0,  0xdf, 0x03};
    char tmp = key[1] ;
    bzero(head_buffer, 1000) ;

    for(int k=2; k<(7-2); k++)
        tmp = ~(tmp ^ key[k]) ;
    key[5] = tmp ;

     if( (this->IC_serial.WR_n_datas(this->IC_serial.in_fd, sizeof(key), BUFFER_SIZE, key, head_buffer, 10)) <0 )//
     {
        // printf("get ip failed.\n") ;
         //return -1 ;
     }
    return 51 ;
}

int Mythread::fx_COM52(void)  //read block
{
    char key[7] = {0x20, 0, 0x22, 0x01,    0x90/*offset*/,  0xde, 0x03};
    char tmp = key[1] ;
    bzero(head_buffer, 1000) ;

    for(int k=2; k<(7-2); k++)
        tmp = ~(tmp ^ key[k]) ;
    key[5] = tmp ;
     if( (this->IC_serial.WR_n_datas(this->IC_serial.in_fd, sizeof(key), BUFFER_SIZE, key, head_buffer, 2000)) <0 )//
     {
         printf("read IC failed.\n") ;
         //return -1 ;
     }
     else
     {
         printf("-------------------------------------------------\n") ;
         for(int i=0; i<20; i++)
          printf("\n wifi send==> 0x%x ", head_buffer[i]) ;
         printf("\n ") ;
         printf("-------------------------------------------------\n") ;
     }
    return 52 ;
}

int Mythread::fx_COM53(void)  //write block
{
    char key[23] = {0x20, 0, 0x23, 0x11,
                   0x90/*offset*/,
                   0x0, 0x11, 0x22,  0x33, 0x44,
                   0x55, 0x66,  0x77, 0x88,
                   0x99, 0xaa,  0xbb, 0xcc,
                   0xdd, 0xee,  0xff,
                   0xcf, 0x03};
    char tmp = key[1] ;
    bzero(head_buffer, 1000) ;

    for(int k=2; k<(23-2); k++)
        tmp = ~(tmp ^ key[k]) ;
    key[21] = tmp ;
     if( (this->IC_serial.WR_n_datas(this->IC_serial.in_fd, sizeof(key), BUFFER_SIZE, key, head_buffer, 2000)) <0 )//
     {
         printf("write IC failed.\n") ;
         //return -1 ;
     }
     else
     {
         printf("-------------------------------------------------\n") ;
         for(int i=0; i<20; i++)
          printf("\n wifi send==> 0x%x ", head_buffer[i]) ;
         printf("\n ") ;
         printf("-------------------------------------------------\n") ;
     }
    return 53 ;
}

int Mythread::fx_COM54(void)
{
    /*40��������ǰ32���ȣ�4���飩����8���ȣ�16�飩,  0~39*/
    char key[7] = {0x20, 0, 0x24, 0x01,    0x21/*4th,Sector*/,  0x00, 0x03};
    char tmp = key[1] ;
    bzero(head_buffer, 1000) ;

    for(int k=2; k<(7-2); k++)
        tmp = ~(tmp ^ key[k]) ;
    key[5] = tmp ;

         if( (this->IC_serial.WR_n_datas(this->IC_serial.in_fd, sizeof(key), 54, key, head_buffer, 2000)) <0 )//
         {
             printf("write IC failed.\n") ;
             //return -1 ;
         }
         else
         {
             printf("--------------------0x%x---------------------------\n", key[4]) ;
             for(int ii=0; ii<11; ii++)
              printf(" 0x%x ", head_buffer[ii ]) ;
              printf(" \n") ;
             for(int ii=10; ii<22; ii++)
              printf("  0x%x ", head_buffer[ii]) ;
             for(int ii=22; ii<44; ii++)
              printf("  0x%x ", head_buffer[ii]) ;
             for(int ii=44; ii<54; ii++)
              printf("  0x%x ", head_buffer[ii]) ;
             printf("\n ") ;
             printf("-------------------------------------------------\n") ;
         }

    return 54 ;
}

int Mythread::fx_COM55(void)
{
    /*40��������ǰ32���ȣ�4���飩����8���ȣ�16�飩,  0~39
    *                       32*3*16 = 1536      8*15*16 = 1920  ==> 1536+1920 = 3456 - 16(ȥ����һ��������Ϣ);
    *                       4096 - 3456 = 640
    *                       ȥ���������ߣ�400�ֽڣ������ֽ�304�ֽڣ�����704
    */
    int nread ;
    unsigned char key_sector[7] = {0x20, 0, 0x24, 0x01,    0x21/*4th,Sector*/,  0x00, 0x03};
    unsigned char key_block[7] = {0x20, 0, 0x22, 0x01,    0x00/*block*/,  0x00, 0x03};


    bzero(head_buffer, 1000) ;
    bzero(idfile_buffer, 4096) ;


    for(int k=0; k<40; k++) //ǰ32��ֱ���ö������������������������ٽ��Ŷ�12����
    {
           key_sector[4] = k ;
           unsigned char tmp = key_sector[1] ;
            //read sector
            for(int i=2; i<(7-2); i++)
                tmp = ~(tmp ^ key_sector[i]) ;
            key_sector[5] = tmp ;
            bzero(head_buffer, 1000) ;
             if( (nread = this->IC_serial.WR_n_datas(uart_config[IC_serial_use].fd, sizeof(key_sector), 54, key_sector, head_buffer, 1000)) <0 )//
             {
                 printf("write IC failed.\n") ;
                 return -55 ;
             }
             else
             {

                 if(nread != 54)
                 {
                     if(nread == 6 && head_buffer[2] == 1)
                     {
                             return -5 ; //no id card
                     }
                    return -55 ;
                 }
                 //������Ϣ
                 int s_base_address  =  k < 33 ?  k*48 :  1536 + (k-32)*240 ;

                 if(k == 0)
                    memcpy( &idfile_buffer[s_base_address], &head_buffer[20], 32)  ;
                 else
                    memcpy( &idfile_buffer[s_base_address-16], &head_buffer[4], 48)  ;

             }

             //read block
             if(k >31 )
             {
                 //next block
                 for(int j=0; j<12; j++)
                 {
                     key_block[4] = 128 + (k-32)*16 + 3 + j ;  //128=32*4,

                     //���������ֽ�
                     unsigned char tmp = key_block[1] ;
                     for(int i=2; i<(7-2); i++)
                         tmp = ~(tmp ^ key_block[i]) ;
                     key_block[5] = tmp ;
                     bzero(head_buffer, 1000) ;
                     //��ȡһ��
                      if( (nread = this->IC_serial.WR_n_datas(uart_config[IC_serial_use].fd, sizeof(key_block), 22, key_block, head_buffer, 500)) <0 )//
                      {
                          printf("write IC failed.\n") ;
                          //return -1 ;
                           return -55 ;
                      }
                      else
                      {


                          if(nread != 22)
                          {
                              if(nread == 6 && head_buffer[2] == 1)
                              {
                                      return -5 ; //no id card
                              }
                             return -55 ;
                          }
                          //������Ϣ
                          int b_base_address = 1584+ (k-32)*15*16 + j*16 -16;
                          memcpy( &idfile_buffer[b_base_address], &head_buffer[4], 16)  ;
                          //printf("j = %d, b_add:%d, size:16 \n", j ,b_base_address) ;
                      }
                 }
             }
     }

    return 9 ;
}

int Mythread::fx_COM56(void)  //read block
{
    char key[23] = {0x20, 0, 0x23, 0x11,
                   0x00/*offset*/,
                   0x0, 0x11, 0x22,  0x33, 0x44,
                   0x55, 0x66,  0x77, 0x88,
                   0x99, 0xaa,  0xbb, 0xcc,
                   0xdd, 0xee,  0xff,
                   0xcf, 0x03};

    int idfile_fd = open("Project/idfile_1.BAS", O_RDWR, 0666);

    if(idfile_fd < 0)
    {
        printf("open idfile.BAS failed after read IDcard.") ;
        return -1 ;
    }

    if (read(idfile_fd, idfile_buffer, 4096) < 0)
    {
        printf("read idfile.BAS failed after read IDcard.") ;
    }
    int loop = 0;
    for(int k=0; k<40; k++)
    {
        if(k < 32)
        {
            int j=0 ;
            k ==0 ? j=1: j=0 ;  //first block?

            for( ; j<3; j++)
            {
                unsigned char tmp ;
                //
                key[4] = k*4 + j ;
printf("\n key[4] = %d \n ", key[4]) ;
                //����Ҫд��������
                memcpy(&key[5], &idfile_buffer[loop*16], 16) ;

                 //У��
                tmp = key[1] ;
                for(int t=2; t<(23-2); t++)
                    tmp = ~(tmp ^ key[t]) ;
                key[21] = tmp ;

                //
                if( (this->IC_serial.WR_n_datas(this->IC_serial.in_fd, sizeof(key), BUFFER_SIZE, key, head_buffer, 100)) <0 )//
                {
                    printf("write IC failed.\n") ;
                    //return -1 ;
                }
                else
                {
                    printf("k=%d, j=%d, loop=%d", k,j,loop) ;
                }
                 loop ++ ;
             }
        }
        else
        {
            for(int j=0 ; j<15; j++)
            {
                unsigned char tmp ;
                //
                key[4] = 128+ (k-32)*16 + j ;
printf("\n key[4] = %d \n ", key[4]) ;
                //����Ҫд��������
                memcpy(&key[5], &idfile_buffer[loop*16], 16) ;

                 //У��
                tmp = key[1] ;
                for(int t=2; t<(23-2); t++)
                    tmp = ~(tmp ^ key[t]) ;
                key[21] = tmp ;

                //
                if( (this->IC_serial.WR_n_datas(this->IC_serial.in_fd, sizeof(key), BUFFER_SIZE, key, head_buffer, 100)) <0 )//
                {
                    printf("write IC failed.\n") ;
                    //return -1 ;
                }
                else
                {
                     printf("k=%d, j=%d, loop=%d", k,j,loop) ;
                }
                 loop ++ ;
             }
        }
        //next

    }
    return 56 ;
}
int Mythread::get_window_lenth()
{
    const char getW[24] = {0x01,0x00,0x01,0x02,  0x06,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0a };
    if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, getW, head_buffer, 2000)) <0 )//
    {
        printf("get windos failed\n" ) ;
            return 174 ;
    }
    else
        return (head_buffer[7] << 8) + head_buffer[8] ;
}

int Mythread::get_register()
{
    int i ;
    char Rreg[24] = {0x01,0x00,0x01,0x02,  0x1f,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x24 };

    for(int ii=0; ii<8; ii++)
        for(int jj=0; jj<10; jj++)
            register_array[ii][jj] = 0xff ;
    /*register_array[0~2]����������,3��������,4�����к�,5������Χ*/
    for(i=0; i<5; i++)
    {

         Rreg[5] = i + 1 ;

        if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, Rreg, head_buffer, 1000)) <0 )//
        {
            printf("read failed.\n") ;
            return -1 ;
        }
        else
        {
            for(int ii=0; ii<10; ii++)
                register_array[i][ii] = head_buffer[ii+7];
        }
        Rreg[23] ++ ;
        usleep(550000);
        //sleep(1) ;
    }
    char Rnum[24] = {0x01,0x00,0x01,0x02,  0x1e,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x22 };
    if( (this->th_serial.WR_24_datas(this->th_serial.in_fd, Rnum, head_buffer, 1000)) <0 )//
    {
        printf("read failed.\n") ;
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

int Mythread::fx_COM61(void)
{
    char print[] ="Send by print uart " ;
    if( th_serial.WR_n_datas(uart_config[print_serial_use].fd, sizeof(print), 5, print, head_buffer, 5000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -60;
    }
    return 61 ;
}

int Mythread::fx_COM62(void)
{
    char print[] ="Send by wifi uart " ;
    if( th_serial.WR_n_datas(uart_config[wifi_serial_use].fd, sizeof(print), 5, print, head_buffer, 5000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -60;
    }
    return 62 ;
}

int Mythread::fx_COM63(void)
{
    char print[] ="Send by IC uart " ;
    if( th_serial.WR_n_datas(uart_config[IC_serial_use].fd, sizeof(print), 5, print, head_buffer, 5000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -60;
    }
    return 63 ;
}

int Mythread::fx_COM64(void)
{
    char print[] ="Send by board uart " ;
    if( th_serial.WR_n_datas(uart_config[th_serial_use].fd, sizeof(print), 5, print, head_buffer, 5000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -60;
    }
    return 64 ;
}
int Mythread::fx_COM65(void)
{
    char print[] ="Send by board uart " ;
    if( th_serial.WR_n_datas(uart_config[upload_serial_use].fd, sizeof(print), 5, print, head_buffer, 5000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -60;
    }
    return 65 ;
}

int Mythread::fx_COM71(void)
{
    char print[] ="Send" ;
    if( th_serial.WR_n_datas(uart_config[print_serial_use].fd, sizeof(print), 5, print, head_buffer, 50) < 0 )
    {
            printf("Send print com failed~!\\r") ;
            return -71;
    }
    return 71 ;
}

int Mythread::fx_COM72(void)
{
    char print[] ="Send" ;
    if( th_serial.WR_n_datas(uart_config[wifi_serial_use].fd, sizeof(print), 5, print, head_buffer, 50) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -72;
    }
    return 72 ;
}

int Mythread::fx_COM73(void)
{
    char print[] ="Send" ;
    if( th_serial.WR_n_datas(uart_config[IC_serial_use].fd, sizeof(print), 5, print, head_buffer, 50) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -73;
    }
    return 73 ;
}

int Mythread::fx_COM74(void)
{

    if( (this->th_serial.WR_24_datas(uart_config[th_serial_use].fd, Drop, head_buffer, 60)) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -74;
    }
    return 74 ;
}
int Mythread::fx_COM75(void)
{
    char print[] ="Send" ;
    if( th_serial.WR_n_datas(uart_config[upload_serial_use].fd, sizeof(print), 5, print, head_buffer, 50) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -75;
    }
    return 75 ;
}

int Mythread::fx_COM80(void)
{
//    for(int i=0; i<24; i++)
//        qDebug("G_COM[%d] = %02x", i, G_COM[i])  ;
    if( (this->th_serial.WR_24_datas(uart_config[th_serial_use].fd, G_COM, head_buffer, 1000)) <0 )//
    {
            return -1 ;
    }

    return 80 ;
}


int Mythread::go_offset(int x)
{

    unsigned char cmd[24];
    memcpy(cmd, Offset_dev, 24);
    cmd[7] += x;
    cmd[23] += x;
    usleep(500000);
    if (this->th_serial.WR_24_datas(th_serial.in_fd, cmd, head_buffer, 10000) < 0)
    {
        return -1;
    }
    usleep(500000);

    return head_buffer[8];
}


int Mythread::fx_COM17(unsigned int offs)
{
    go_offset(offs);
    return 17;
}

int Mythread::fx_COM18(void)
{
    usleep(10000);
    if( (this->th_serial.WR_24_datas(th_serial.in_fd, TH_REF, head_buffer, 1000)) <0 )//
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

    ad_h = float(ret & 0xffff) / 10;
    ad_t = float((ret >> 16) & 0x7fff) / 10;


    if (head_buffer[7])
    {
        ad_t = -ad_t;
    }


    return 18;
}

