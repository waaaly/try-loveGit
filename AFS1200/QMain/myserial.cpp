#include "myserial.h"
#include "ID/uIDCardDef.h"
#include <QDebug>
#include "funcset/debug.h"


unsigned char adjust_v[10][3] ;

unsigned char version[8] = {0,0,0,0, 0,0,0,0};
unsigned char  register_array[8][10] ;



int win_lenth ;

#define MDEBUG 1


MySerial::MySerial()
{
    fd = -1;
}



MySerial::~MySerial()
{
    if (fd != -1)
    {
        close(fd) ;
    }
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
    fd = open(uart_name, O_RDWR , 0) ;			//|O_NDELAY
    if(fd < 0)
    {
#if MDEBUG
            printf("open serial failed~!\n") ;
#endif
            return -1 ;
    }

    if(Set_attr(fd) < 0 )
    {
#if MDEBUG
            printf("set attr failed~!\n") ;
#endif
            return -1 ;
    }

    pfd[0].fd = fd ;
    pfd[0].events = POLLOUT;
    pfd[1].fd = fd ;
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
int MySerial::Set_attr(int fds)
{
    Q_UNUSED(fds);

    struct termios newtio, oldtio ;
    tcgetattr(fd, &oldtio) ;//先获得原来的属性				/*初始化*/

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
    tcflush(fd, TCIOFLUSH) ;					       /* 刷清输入输出缓冲区*/
    if( tcsetattr(fd, TCSANOW, &newtio) < 0 ) /* 使设置的终端属性立即生效*/
    {
#if MDEBUG
            printf("Set attr failed~!\n") ;
#endif
            return -1 ;
    }
    return 0 ;

}


int MySerial::Send_data(int fd, const char* data, unsigned int lenth, int ms_timeout)
{
    return Send_data(fd, (const unsigned char*)data, lenth, ms_timeout);
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
    Q_UNUSED(fd);

        int nwrite = 0;
        int nready = 0;//用于判断等待可写可读事件是否超时

        nready = poll(&pfd[0], 1, ms_timeout ) ;

        if( nready < 0 )						//POLLIng出错
        {

#if MDEBUG
                printf(" myserial.cpp :wait for write over time\n") ;
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
                usleep(10000);

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

        bzero(bufs, sizeof(bufs)) ;
        while(get_lenth < lenth)//一直循环读数据，直至数目达到lenth，或者等待超时出错
        {
                nready = poll(&pfd[1], 1, ms_timeout ) ;

                if( nready < 0 )					//POLLING出错
                {
                    if (errno == EINTR)
                    {
                        continue;
                    }
                    return -1 ;
                }
                else if(nready == 0)				//超时
                {
#if MDEBUG
                        printf("get data read over time\n") ;
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

        }
        //tcflush(pfd[1], TCIFLUSH);清空输入缓冲区 2018-10-23
        return get_lenth ;
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
    Q_UNUSED(i);

#if MDEBUG
 if(com[3] != 0x13)//自动检测试剂卡不需要打印2018/09/30
     {
       printf("Send command:\n");
        for (int x = 0; x < 24; x++)
        {
            printf("%x ", com[x]);
      }
        printf("\n");
    }
#endif

/*发送命令*/
    if( Send_data(fd, com, 24, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("Send COM failed~!\n") ;
#endif
            return -1;
    }
/*返回数据包*/
        nread = Get_data(fd, rbuf, 24, ms_timeout) ;
#if MDEBUG
 if( (rbuf[3] != 0x13))//自动检测试剂卡不用打印 2018/09/30
        printf("Return %d byte :\n",nread);
#endif
        if( nread == 24 )
        {
#if MDEBUG
            if( (rbuf[3] != 0x13))//自动检测试剂卡不用打印 2018/09/30
               {
                    for(i=0; i < 12; i++)
                            printf(" 0x%x ",rbuf[i]) ;
                    printf("\n") ;
                    for(; i < nread; i++)
                            printf(" 0x%x ",rbuf[i]) ;
                    printf("\n ************************* \n")  ;
            }
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


int MySerial::WR_24_datas(int fd, const uchar* com,unsigned char* rbuf, int ms_timeout)
{
        return WR_24_datas(fd, (const char*)com,rbuf, ms_timeout);
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
#if MDEBUG
    if(com[3] != 0x13)//自动检测试剂卡不需要打印2018/09/30
     {
       printf("Send command:\n");
        for (int x = 0; x < 24; x++)
        {
            printf("%x ", com[x]);
        }
        printf("\n");
    }

#endif

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
       printf("Return %d data :\n",nread);
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
    return WR_n_datas(fd, com_len, ret_len, (const char*)com, rbuf, ms_timeout) ;
}


/*
 * 分析一包长数据,将四个字节合并成一个int类型
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
    Q_UNUSED(ptmp);

    for(i=0; i<nums; i++)
    {
/*每接收6个字节分析一次数据*/

        if ((nread = Get_data(fd, rbuf, 6, ms_timeout)) !=6)
        {
            return -1 ;
        }

/*判断包头是否正确，出错一个则直接推出函数*/
        if((rbuf[0]!=0xFF) || (rbuf[1]!=0x1A))
        {
            if (rbuf[0] == 0 && rbuf[1] == 0x06)
            {
                nread = Get_data(fd, rbuf + 6, 24 - 6, ms_timeout);
                // 新数据解析协议
                if (nread == 24 - 6)
                {
                    // 校验协议
                    unsigned char sum = 0;
                    for (int i = 0; i < 23; i++)
                    {
                        printf("%x ",rbuf[i]);
                        sum += rbuf[i];
                    }
                    if (sum == rbuf[23])
                    {
                        // 解析数据，重构成员函数
                        return Parse_nums_datas(fd, parse_dat, nums, ms_timeout);
                    }
                }

            }
            printf("%s %d\n", __FUNCTION__,__LINE__);
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
        }
    }

/*判断结尾四个字节是否FF,不是则认为通讯出错，之前的数据作废*/
    nread = Get_data(fd, rbuf, 4, ms_timeout) ;
    if (nread != 4)
    {
            return -1 ;
    }
    if((rbuf[0]!=0xFF) || (rbuf[1]!=0xFF) || (rbuf[2]!=0xFF) || (rbuf[3]!=0xFF))
    {
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

int MySerial::Parse_nums_datas_p5(int fd, unsigned int *parse_dat, int ms_timeout)
{
    unsigned char buf[5];
    const unsigned int *p = (unsigned int *)buf;
    int offset = 0;
    while (Get_data(fd, buf, 4, ms_timeout) >= 4)
    {
        if (p[0] == 0xffffffff)
        {
            return offset;
        }
        else
        {
            if (Get_data(fd, buf + 4, 1, ms_timeout) < 1)
            {
                break;
            }
            if (buf[0] == 0xff && buf[1] == 0x1a)
            {
                parse_dat[offset++] =
                        convert_hex2int(buf[2]) * 10000 +
                        convert_hex2int(buf[3]) * 100 +
                        convert_hex2int(buf[4]);
            }
            else
            {
                break;
            }
        }
    }
    return 0;
}

int MySerial::Parse_nums_datas(int fd, unsigned int *parse_dat, unsigned int nums, int ms_timeout)
{
    Q_UNUSED(nums);
    unsigned char buf[4];
    unsigned int *p = (unsigned int*)buf;
    unsigned short sum = 0xff*4;
    int offset;
    for (offset = 0; offset < 512; offset++)
    {

        if (Get_data(fd, buf, 4, ms_timeout) != 4)
        {
#if MDEBUG
            printf("Error when get 4 datas\n");
#endif
            return -1;
        }
        if (*p == 0xffffffff)
        {
            break;
        }
        if (buf[0] == 0xff)
        {
            sum += buf[0];
            sum += buf[1];
            sum += buf[2];
            sum += buf[3];
            parse_dat[offset] = buf[1]*256*256 + buf[2]*256 + buf[3];
        }
        else
        {
#if MDEBUG
            printf("parse error\n");
#endif
            return -1;
        }

    }

    int ret = -1;
    if (Get_data(fd, buf, 2, 100) == 2)
    {
        if (sum == buf[0]*256+buf[1])
        {
            win_lenth = offset;
            ret = 0;
        }
    }

    // 清空缓冲区
    while (Get_data(fd, buf, 1, 1) > 0);

#if MDEBUG
    if (ret)
    {
        printf("Parse ending error\n");
    }
#endif
    return ret;
}



