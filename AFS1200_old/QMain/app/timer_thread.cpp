#include "timer_thread.h"


extern unsigned char timer_buffer[1024] ;

Timerthread::Timerthread(QObject *parent) :
    QThread(parent)
{
    //timer_serial.BAUD = B115200 ;
   // strcpy( timer_serial.uart_name, "/dev/ttyO2" ) ;

   /* if( this->timer_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
        printf("open timer_serial failed \n") ;
    }
    else
    {

    }*/



    for(int i=0; i<8; i++)
    {
        old_state[i] = 0;
        new_state[i] = 0 ;
    }
    send_com = 0 ;
    connect_flag = 1 ;
   //detect_timer.start(100,this);
    //timer->start(1000);
}

void Timerthread::run()
{
    while(1)
        sleep(10) ;
}

 void Timerthread::timerEvent(QTimerEvent *)
{
    static int time_add = 0 ;
    static int warmer_add = 0;
    static int cheak_connect = 0 ;
    if(connect_flag )
    {
        if(time_add >= 10)
        {
            time_add = 0 ;
            //²â¿¨
            if( (this->timer_serial.WR_24_datas(timer_serial.in_fd, DTC, timer_buffer, 500)) <0 )//
            {
                printf("read time failed \n") ;
                connect_flag = 0 ;
                    return  ;
            }
            else
            {
                for(int i=0; i<8; i++)
                {
                        new_state[i] = timer_buffer[7+i] ;
                }
               for(int i=0; i<8; i++)
                    if(new_state[i] != old_state[i])
                    {
                        printf("timer_thread:card insert !!\n") ;
                        emit timerthread_signal(new_state) ;
                        break ;
                    }
               for(int i=0; i<8; i++)
                    old_state[i] = new_state[i] ;
            }
        }
        else if(warmer_add>=25)
        {
            warmer_add =0 ;
            if( (this->timer_serial.WR_24_datas(timer_serial.in_fd, DTT, timer_buffer, 500)) <0 )//
            {
                printf("read time failed \n") ;
                connect_flag = 0 ;
                    return  ;
            }
            else
            {
                emit wamer_signal(timer_buffer[7]) ;
            }
        }
        if(send_com)
        {
            send_com = 0 ;
            if( (this->timer_serial.WR_24_datas(timer_serial.in_fd, com, timer_buffer, 500)) <0 )//
            {
                printf("read time failed \n") ;
                connect_flag = 0 ;
                    return  ;
            }
            else
            {/*
                printf("\nReturn_:  ") ;
                int i ;
                for(i=0; i < 12; i++)
                        printf(" 0x%x ",timer_buffer[i]) ;
                printf("\n") ;
                for(; i < 24; i++)
                        printf(" 0x%x ",timer_buffer[i]) ;
                printf("\n ************************* \n")  ;*/
            }
        }
        warmer_add++ ;
        time_add++ ;
    }
    else
    {
        if(cheak_connect >= 30)
        {
            cheak_connect = 0 ;
            if( (this->timer_serial.WR_24_datas(timer_serial.in_fd, DCC, timer_buffer, 200)) <0 )//
            {
                printf("timer no connect \n") ;
                connect_flag = 0 ;
                    return  ;
            }
            else
            {
                connect_flag = 1 ;
                emit check_connected(0) ;
                //emit wamer_signal(timer_buffer[7]) ;
            }
        }
        cheak_connect++ ;
    }

}

void Timerthread::get_com(uchar* gcom)
{
    for(int i=0; i<24; i++)
        com[i] = gcom[i] ;
    send_com = 1 ;
}
