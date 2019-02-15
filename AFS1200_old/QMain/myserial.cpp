#include "myserial.h"


//测量调试
char Test[24]  = {0x01,0x00,0x00,0x05,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0b } ;
//测试
char *RCard =  Test;
//测试
char * SRCard = RCard;
//复位
char Rest[24]  = {0x01,0x00,0x00,0x03,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x09 } ;
//条码调试
char TBar[24]  =  {0x01,0x00,0x00,0x06,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0c } ;
//读条码
char RBar[24]  =  {0x01,0x00,0x00,0x07,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0d } ;
//检测试剂卡
char ChC[24]  = {0x01,0x00,0x00,0x13,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x19 } ;
//读ID
char Ridc[24]  =  {0x01,0x00,0x00,0x1f,  0x00,0x00,0x00,0x01,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x26 } ;
char Rreg[24] = {0x01,0x00,0x01,0x02,  0x1f,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x29 };
char getW[24] = {0x01,0x00,0x01,0x02,  0x06,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0f };
char Rnum[24] = {0x01,0x00,0x01,0x02,  0x1e,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x27 };
char RVersion[24] = {0x01,0x00,0x01,0x02,  0x1d,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x26 };
char RAdjust[24] = {0x01,0x00,0x01,0x02,  0x0c,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x16 };
char WMAdjust[24] = {0x01,0x00,0x00,0x02,  0x0d,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x16 };
unsigned char Wreg[24]  =  {0x01,0x00,0x00,0x02,  0x1f,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x15 } ;
unsigned char DTC[24]  =  {0x01,0x00,0x00,0x20,  0x03,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x29 } ;
unsigned char DTT[24]  =  {0x01,0x00,0x00,0x20,  0x02,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x28 } ;
unsigned char DCC[24]  =  {0x01,0x00,0x00,0x20,  0x06,0x00,0x00,0x01,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x2d } ;
// 光路盒走位
char Offset_dev[24]  =  {0x01,0x00,0x00,0x10,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x16 } ;
//Y复位
char Y_Rest[24]  = {0x01,0x00,0x00,0x19,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x1f } ;
char TH_REF[24]  = {0x01,0x00,0x01,0x16,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x1d } ;


/*发给下位机指令包*/

//读电机频率
char com2[24]  = {0x01,0x00,0x00,0x02,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x08 } ;
//丢卡
char Drop[24]  = {0x01,0x00,0x00,0x04,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0a } ;
//jiance ID
char Cidc[24]  =  {0x01,0x00,0x00,0x0D,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x13 } ;
//adjust
unsigned char WAdjust[24]  =  {0x01,0x00,0x00,0x02,  0x0d,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00 } ;
//
char Print_test[2]  =  { 0X0a,0X0a} ;

unsigned char adjust_v[10][3] ;
double adjust_std[6] = {0,0,0,0,0,0} ;
double adjust_cur[6] = {0,0,0,0,0,0} ;
unsigned char version[8] = {0,0,0,0, 0,0,0,0};
unsigned char is_std ;  //区分是出厂设置还是校准设置
unsigned char  register_array[8][10] ;
char *sw_RCard ;
char *at_once_RCard ;
char *save_sw_RCard ;
int win_lenth ;


static void calcCRC(void *cmd)
{
    quint8 *p = (quint8*)cmd;
    p[23] = 0;
    for (int i = 0; i < 23; i++)
    {
        p[23] += p[i];
    }
}



MySerial::MySerial()
{
    con[0] = 0xaa ;
    con[1] = 0xaa ;

    calcCRC(Test);
    calcCRC(Rest);
    calcCRC(TBar);
    calcCRC(RBar);
    calcCRC(ChC);
    calcCRC(Ridc);
    calcCRC(Rreg);
    calcCRC(getW);
    calcCRC(Rnum);
    calcCRC(RVersion);
    calcCRC(RAdjust);
    calcCRC(WMAdjust);
    calcCRC(Wreg);
    calcCRC(DTC);
    calcCRC(DTT);
    calcCRC(DCC);
    calcCRC(Offset_dev);
    calcCRC(Y_Rest);
    calcCRC(TH_REF);

    calcCRC(com2);
    calcCRC(Drop);
    calcCRC(Cidc);
    calcCRC(WAdjust);

}

MySerial::~MySerial()
{
    close(in_fd) ;

}

/*
 * 打开串口
 * 参数：
 *
 *
 * 返回值:
 *		0成功，—1失败
 * */
int MySerial::Open_serial()
{

    //O_NOCTTY:通知linux系统，这个程序不会成为这个端口的控制终端.
    //O_NDELAY:通知linux系统不关心DCD信号线所处的状态(端口的另一端是否激活或者停止).
    in_fd = open(uart_name, O_RDWR , 0) ;			//|O_NDELAY
    if(in_fd < 0)
    {
#if MDEBUG
            printf("open serial failed~!\n") ;
#endif
            return -1 ;
    }

   // if (fcntl(fd, F_SETFL, O_NONBLOCK) < 0)
         //printf("Unable set to NONBLOCK mode") ;

    if(Set_attr(in_fd) < 0 )
    {
#if MDEBUG
            printf("set attr failed~!\n") ;
#endif
            return -1 ;
    }

    pfd[0].fd = in_fd ;
    pfd[0].events = POLLOUT;
    pfd[1].fd = in_fd ;
    pfd[1].events = POLLIN ;

    return 0 ;
}


/*
 * 设置串口属性
 * 参数：
 * 		fd : 传入文件句柄
 *
 * 返回值:
 *		0成功，—1失败
 * */
int MySerial::Set_attr(int )
{
    struct termios newtio, oldtio ;
    tcgetattr(in_fd, &oldtio) ;//先获得原来的属性				/*初始化*/

    bzero(&newtio, sizeof(newtio)) ;


    /* CS8：设置数据位为8;
         B57600：波特率
         CREAD：使能接收
         CLOCAL：用于本地连接
         O_NOCTTY:通知linux系统，这个程序不会成为这个端口的控制终端.
        */
    newtio.c_cflag = BAUD|CS8|CREAD|CLOCAL;/*10_21*/
    newtio.c_iflag = 0;                                     /*输入模式标记*/
    newtio.c_oflag = 0;                                   /*输出模式标记*/
    newtio.c_lflag = 0;                                    /*本地模式标记*/
    newtio.c_cc[VMIN] = 1;                            /* 1 位就接收*/
    newtio.c_cc[VTIME] = 0;						   /* 不使用计时器*/
    tcflush(in_fd, TCIOFLUSH) ;					       /* 刷清输入输出缓冲区*/
    if( tcsetattr(in_fd, TCSANOW, &newtio) < 0 ) /* 使设置的终端属性立即生效*/
    {
#if MDEBUG
            printf("Set attr failed~!\n") ;
#endif
            return -1 ;
    }
    return 0 ;

}

/*
 * 发送一包数据
 * 参数：
 * 		fd:文件句柄
 * 		com:下达的命令
 * 		lenth:命令的长度
 * 		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:写入串口失败
 *		-2:等待超时
 *		-3:写入命令不完整
 *		 n:写入成功命令的长度
 * */
int MySerial::Send_data(int fd, const char* data, unsigned int lenth, int ms_timeout)
{
        int nwrite = 0;
        int nready = 0;//用于判断等待可写可读事件是否超时
        pfd[0].fd = fd ;
        pfd[1].fd = fd ;

        nready = poll(&pfd[0], 1, ms_timeout ) ;

        if( nready < 0 )						//POLLIng出错
        {

#if MDEBUG
                printf("wait for write over time\n") ;
#endif
                return -1 ;
        }
        else if(0 == nready)					//超时
        {
                return -2 ;
        }

        if( pfd[0].revents & POLLOUT )
        {
                if( (nwrite = write(pfd[0].fd, data, lenth)) < 0)
                {
                        if( errno == EINTR)				//系统中断出错
                        {
#if MDEBUG
                                printf("connect reset by client.\n") ;
#endif

                                return -3 ;

                        }
                        else
                        {
                                printf("read \n") ;		//未知错误，打印出信息

                                return -1 ;
                        }
                }
                else if(nwrite == 0)				//串口关闭
                {
#if MDEBUG
                        printf("client close.\n") ;
#endif
                        return -1 ;
                }

       }

        return nwrite;
}

/*
 * 发送一包数据
 * 参数：
 * 		fd:文件句柄
 * 		com:下达的命令
 * 		lenth:命令的长度
 * 		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:写入串口失败
 *		-2:等待超时
 *		-3:写入命令不完整
 *		 n:写入成功命令的长度
 * */
int MySerial::Send_data(int fd, const unsigned char* data, unsigned int lenth, int ms_timeout)
{
        int nwrite = 0;
        int nready = 0;//用于判断等待可写可读事件是否超时
        pfd[0].fd = fd ;
        pfd[1].fd = fd ;

        nready = poll(&pfd[0], 1, ms_timeout ) ;

        if( nready < 0 )						//POLLIng出错
        {
#if MDEBUG
                printf("wait for write over time\n") ;
#endif
                return -1 ;
        }
        else if(0 == nready)					//超时
        {
                return -2 ;
        }

        if( pfd[0].revents & POLLOUT )
        {
                if( (nwrite = write(pfd[0].fd, data, lenth)) < 0)
                {
                        if( errno == EINTR)				//系统中断出错
                        {
#if MDEBUG
                                printf("connect reset by client.\n") ;
#endif

                                return -3 ;

                        }
                        else
                        {
                                printf("read \n") ;		//未知错误，打印出信息

                                return -1 ;
                        }
                }
                else if(nwrite == 0)				//串口关闭
                {
#if MDEBUG
                        printf("client close.\n") ;
#endif
                        return -1 ;
                }

       }

        return nwrite;
}



/*
 * 接收一包命令
 * 参数：
 * 		fd:文件句柄
 * 		bufs:用于接受包数据
 * 		lenth:接收包的长度
 *		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:写入串口失败
 *		-2:等待数据超时
 *		 n:读出数据包的长度
 * */
int MySerial::Get_data(int fd, unsigned char bufs[], unsigned int lenth, int ms_timeout)
{
        int nread = 0;//存放每次读出的字节数
        int nready = 0;//用于判断等待可写可读事件是否超时
        unsigned int get_lenth = 0 ;//存放最终读出的字节数

        pfd[0].fd = fd ;
        pfd[1].fd = fd ;

        bzero(bufs, sizeof(bufs)) ;
        while(get_lenth < lenth)//一直循环读数据，直至数目达到lenth，或者等待超时出错
        {
                nready = poll(&pfd[1], 1, ms_timeout ) ;

                if( nready < 0 )					//POLLING出错
                {
                    if( errno == EINTR)
                        continue;
                        return -1 ;
                }
                else if(nready == 0)				//超时
                {
#if MDEBUG
                        printf("read over time\n") ;
#endif
                        return nread ;
                }

                if( pfd[1].revents & POLLIN )
                {

                        if( (nread = read(fd, &bufs[get_lenth], (lenth-get_lenth))) < 0)
                        {
                                if( errno == EINTR)			//系统中断出错
                                {
#if MDEBUG
                                        printf("connect reset by client.\n") ;
#endif
                                        return -1 ;

                                }
                                else
                                {
                                        printf("read \n") ;  //未知错误，打印出信息

                                        return -1 ;
                                }
                        }
                        else if(nread == 0)
                        {
#if MDEBUG
                                printf("client close.\n") ;
#endif
                        }
                        get_lenth += nread ;

                }
                /*10_12
                if(get_lenth == 24)
                {
                        break ;
                }*/
        }

        return get_lenth ;
}

/*
 * 握手,发送一条命令并且接收24字节返回包
 * 参数：
 * 		fd:文件句柄
 * 		com:发送的命令
 * 		rbuf:用于接受返回包
 *		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:失败
 *		-2:
 *		 n:
 * */
int MySerial::Send_command(int fd, const char* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

   int i ;
#if MDEBUG

        printf("\n ************************* \n")  ;
#endif
/*通知握手*/
        if( Send_data(fd, con, 1, ms_timeout) < 0 )
        {
#if MDEBUG
                printf("Send ASY failed~!\n") ;
#endif
                return -1;
        }

/*等待握手*/
        nread = Get_data(fd, rbuf, 1, ms_timeout) ;
        if( nread < 0)
        {
#if MDEBUG
                printf("Read ASY_B failed~!\n") ;
#endif
                return -1;
        }
        else
        {
                //printf("get %d data :\n",nread);
#if MDEBUG
            printf("ASY_B: 0x%x \n",rbuf[0]) ;
#endif
        }

/*发送命令*/
        if( Send_data(fd, com, 24, ms_timeout) < 0  )  //sizeof(com) = sizeof(char) ,
        {
#if MDEBUG
                printf("Send COM failed~!\n") ;
#endif
                return -1;
        }
/*等待24字节头*/
        nread = Get_data(fd, rbuf, 1, ms_timeout) ;
        if( nread < 0)
        {
#if MDEBUG
                printf("Read COM_B failed~!\n") ;
#endif
                return -1;
        }
        else
        {
#if MDEBUG
                printf("serial get rbuf[0]: 0x%x \n",rbuf[0]) ;
#endif
                if(rbuf[0] == 0xfd)         //
                {
#if MDEBUG
                    printf("Wrong command~! \n");
#endif
                    return -1;
                }

        }
/*返回数据包*/

        nread = Get_data(fd, rbuf, 24, ms_timeout) ;
#if MDEBUG
        printf("serial get %d datas :\n",nread);
#endif
        if( nread == 24)
        {
#if MDEBUG
                printf("serial gets:  ") ;

                for(i=0; i < 12; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n") ;
                for(; i < nread; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n ************************* \n")  ;
#endif
        }
        else
        {
#if MDEBUG
                printf("Read COM_B_2 failed~!\n") ;
#endif
                return -1;
        }

        return 0 ;
}

/*
 * 不用握手,发送一条命令并接受24个字节的返回包
 * 参数：
 * 		fd:文件句柄
 * 		com:下达的命令
 * 		lenth:命令的长度
 * 		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:失败
 *
 * */
int MySerial::WR_24_datas(int fd, const char* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;
    int i ;

/*发送命令*/
    if( Send_data(fd, com, 24, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("1111Send COM failed~!\n") ;
#endif
            return -1;
    }
/*返回数据包*/
        nread = Get_data(fd, rbuf, 24, ms_timeout) ;
#if MDEBUG
        printf("get %d data :\n",nread);
#endif
        if( nread == 24)
        {
#if MDEBUG
                printf("1111COM_B_2:  ") ;

                for(i=0; i < 12; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n") ;
                for(; i < nread; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n ************************* \n")  ;
#endif
        }
        else
        {
#if MDEBUG
                printf("1111Read COM_B_2 failed~!\n") ;
#endif
                return -1;
        }

        return 0 ;
}

/*
 * 不用握手,发送一条命令并接受24个字节的返回包
 * 参数：
 * 		fd:文件句柄
 * 		com:下达的命令
 * 		lenth:命令的长度
 * 		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:失败
 *
 * */
int MySerial::WR_24_datas(int fd, const uchar* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

    int i ;

/*发送命令*/
    if( Send_data(fd, com, 24, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("2222Send COM failed~!\n") ;
#endif
            return -1;
    }
/*返回数据包*/
        nread = Get_data(fd, rbuf, 24, ms_timeout) ;
#if MDEBUG
        //printf("get %d data :\n",nread);
#endif
        if( nread == 24)
        {
#if 1
                printf("2222COM_B_2:  ") ;

                for(i=0; i < 12; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n") ;
                for(; i < nread; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n ************************* \n")  ;
#endif
        }
        else
        {
#if MDEBUG
                printf("2222Read COM_B_2 failed~!\n") ;
#endif
                return -1;
        }

        return 0 ;
}

/*
 * 不用握手,发送一条命令并接受n个字节的返回包
 * 参数：
 * 		fd:文件句柄
 * 		com:下达的命令
 * 		lenth:命令的长度
 * 		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:失败
 *
 * */
int MySerial::WR_n_datas(int fd, int com_len, int ret_len, const char* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

/*发送命令*/
    if( Send_data(fd, com, com_len, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("serial send COM failed!!!!!!\n") ;
#endif
            return -1;
    }
/*返回数据包*/
        nread = Get_data(fd, rbuf, ret_len, ms_timeout) ;
#if MDEBUG
       printf("serial get long data :%d \n",nread);
    if(nread <=0 )
    {
        return -1 ;
    }
#endif


    return 0 ;
}

/*
 * 不用握手,发送一条命令并接受n个字节的返回包
 * 参数：
 * 		fd:文件句柄
 * 		com:下达的命令
 * 		lenth:命令的长度
 * 		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:失败
 *
 * */
int MySerial::WR_n_datas(int fd, int com_len, int ret_len, const unsigned char* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

/*发送命令*/
    if( Send_data(fd, com, com_len, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("Send COM failed~!\n") ;
#endif
            return -1;
    }
/*返回数据包*/
        nread = Get_data(fd, rbuf, ret_len, ms_timeout) ;
#if MDEBUG
       printf("get %d data :\n",nread);
    if(nread <=0 )
    {
        return -1 ;
    }
#endif


    return nread ;
}

/*
 * 等待接收一24字节包
 * 参数：
 * 		fd:文件句柄
 * 		com:发送的命令
 * 		rbuf:用于接受返回包
 *		ms_timeout:设置等待超时的时间
 *返回值：
 *		-1:失败
 *		-2:
 *		 n:
 * */
int MySerial::Wait_24_datas(int fd,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

    int i ;


/*返回数据包*/
        nread = Get_data(fd, rbuf, 24, ms_timeout) ;
#if MDEBUG
        printf("get %d data :\n",nread);
#endif
        if( nread == 24)
        {
#if MDEBUG
                printf("serial get 24 datas:  ") ;

                for(i=0; i < 12; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n") ;
                for(; i < nread; i++)
                        printf(" 0x%x ",rbuf[i]) ;
                printf("\n ************************* \n")  ;
#endif
        }
        else
        {
#if MDEBUG
                printf("Read COM_B_2 failed~!\n") ;
#endif
                return -1;
        }

        return 0 ;
}
/*
 * 分析一包荧光长数据,将四个字节合并成一个int类型
 * 参数：
 *      fd:文件句柄
 *      rbuf:用于接受返回包
 *  	ms_timeout:设置等待超时的时间
 *      nums:接收数据的个数，一个数据有6个字节
 *      parse_dat:将6个 字节之中的4个有效数据转化为10进制后，存放于这个数组里
 *返回值：
 *		-1:失败
 * */
int MySerial::Parse_nums_datas(int fd,unsigned char* rbuf, int ms_timeout, unsigned int nums,unsigned int* parse_dat)
{
    unsigned int tmp1, tmp2 ;//tmp1存放高八位临时数据，tmp2存放低八位临时数据
    int nread ;

    unsigned int i= 0 ;
    unsigned int ptmp ;//for循环用到的序列号
#if MDEBUG
            printf("*************************************\n");
#endif
    for(i=0; i<nums; i++)
    {
/*每接收6个字节分析一次数据*/
        if ((nread = Get_data(fd, rbuf, 6, ms_timeout)) !=6)
        {
#if MDEBUG
            printf("Error when get 6 datas\n");
#endif
            return -1 ;
        }
/*判断包头是否正确，出错一个则直接推出函数*/
        if((rbuf[0]!=0xFF) || (rbuf[1]!=0x1A))
        {
#if MDEBUG
            for(ptmp=0; ptmp<6; ptmp++){
                printf("0x%x, ",rbuf[ptmp]);
            }
            printf("%d,parse error\n, ",i);
#endif
            return -1 ;
        }
        else
        {
            //high-16-bit
            tmp1 = rbuf[2];
            tmp2 = rbuf[3] ;
            parse_dat[i] = convert_hex2int(tmp1)*100 + convert_hex2int(tmp2) ;
            //low-16-bit
            tmp1 = rbuf[4] ;
            tmp2 = rbuf[5] ;
            parse_dat[i] = parse_dat[i]*10000 + convert_hex2int(tmp1)*100 + convert_hex2int(tmp2) ;
#if MDEBUG
            for(ptmp=0; ptmp<6; ptmp++){
                printf("0x%x, ",rbuf[ptmp]);
            }
            printf("%d:%u\n, ",i, parse_dat[i]);
#endif

        }
    }
#if MDEBUG
            printf("\n*************************************\n");
#endif
/*判断结尾四个字节是否FF,不是则认为通讯出错，之前的数据作废*/
    nread = Get_data(fd, rbuf, 4, ms_timeout) ;
    if (nread != 4)
    {
#if MDEBUG
            printf("Get ending datas failed.\n");
#endif
            return -1 ;
    }
    if((rbuf[0]!=0xFF) || (rbuf[1]!=0xFF) || (rbuf[2]!=0xFF) || (rbuf[3]!=0xFF))
    {
#if MDEBUG
        printf("Parse ending error\n");
#endif
             return -1 ;
    }


    return 0 ;
}

int MySerial::convert_hex2int(char source)
{
    char highchar, lowchar ;
    lowchar = (source & 0x0f) ;
    highchar = (source & 0xf0)/16 ;

    return (highchar*10+lowchar) ;

}




