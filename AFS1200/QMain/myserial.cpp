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
 * �򿪴���
 * ������
 *
 *
 * ����ֵ:
 *		0�ɹ�����1ʧ��
 * */
int MySerial::Open_serial()
{

    //O_NOCTTY:֪ͨlinuxϵͳ��������򲻻��Ϊ����˿ڵĿ����ն�.
    //O_NDELAY:֪ͨlinuxϵͳ������DCD�ź���������״̬(�˿ڵ���һ���Ƿ񼤻����ֹͣ).
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
 * ���ô�������
 * ������
 * 		fd : �����ļ����
 *
 * ����ֵ:
 *		0�ɹ�����1ʧ��
 * */
int MySerial::Set_attr(int fds)
{
    Q_UNUSED(fds);

    struct termios newtio, oldtio ;
    tcgetattr(fd, &oldtio) ;//�Ȼ��ԭ��������				/*��ʼ��*/

    bzero(&newtio, sizeof(newtio)) ;


    /* CS8����������λΪ8;
         B57600��������
         CREAD��ʹ�ܽ���
         CLOCAL�����ڱ�������
         O_NOCTTY:֪ͨlinuxϵͳ��������򲻻��Ϊ����˿ڵĿ����ն�.
        */
    newtio.c_cflag = BAUD|CS8|CREAD|CLOCAL;/*10_21*/
    newtio.c_iflag = 0;                                     /*����ģʽ���*/
    newtio.c_oflag = 0;                                   /*���ģʽ���*/
    newtio.c_lflag = 0;                                    /*����ģʽ���*/
    newtio.c_cc[VMIN] = 1;                            /* 1 λ�ͽ���*/
    newtio.c_cc[VTIME] = 0;						   /* ��ʹ�ü�ʱ��*/
    tcflush(fd, TCIOFLUSH) ;					       /* ˢ���������������*/
    if( tcsetattr(fd, TCSANOW, &newtio) < 0 ) /* ʹ���õ��ն�����������Ч*/
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
 * ����һ������
 * ������
 * 		fd:�ļ����
 * 		com:�´������
 * 		lenth:����ĳ���
 * 		ms_timeout:���õȴ���ʱ��ʱ��
 *����ֵ��
 *		-1:д�봮��ʧ��
 *		-2:�ȴ���ʱ
 *		-3:д���������
 *		 n:д��ɹ�����ĳ���
 * */
int MySerial::Send_data(int fd, const unsigned char* data, unsigned int lenth, int ms_timeout)
{
    Q_UNUSED(fd);

        int nwrite = 0;
        int nready = 0;//�����жϵȴ���д�ɶ��¼��Ƿ�ʱ

        nready = poll(&pfd[0], 1, ms_timeout ) ;

        if( nready < 0 )						//POLLIng����
        {

#if MDEBUG
                printf(" myserial.cpp :wait for write over time\n") ;
#endif
                return -1 ;
        }
        else if(0 == nready)					//��ʱ
        {
                return -2 ;
        }

        if( pfd[0].revents & POLLOUT )
        {
                if( (nwrite = write(pfd[0].fd, data, lenth)) < 0)
                {
                        if( errno == EINTR)				//ϵͳ�жϳ���
                        {
#if MDEBUG
                                printf("connect reset by client.\n") ;
#endif

                                return -3 ;

                        }
                        else
                        {
                                printf("read \n") ;		//δ֪���󣬴�ӡ����Ϣ

                                return -1 ;
                        }
                }
                else if(nwrite == 0)				//���ڹر�
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
 * ����һ������
 * ������
 * 		fd:�ļ����
 * 		bufs:���ڽ��ܰ�����
 * 		lenth:���հ��ĳ���
 *		ms_timeout:���õȴ���ʱ��ʱ��
 *����ֵ��
 *		-1:д�봮��ʧ��
 *		-2:�ȴ����ݳ�ʱ
 *		 n:�������ݰ��ĳ���
 * */
int MySerial::Get_data(int fd, unsigned char bufs[], unsigned int lenth, int ms_timeout)
{
        int nread = 0;//���ÿ�ζ������ֽ���
        int nready = 0;//�����жϵȴ���д�ɶ��¼��Ƿ�ʱ
        unsigned int get_lenth = 0 ;//������ն������ֽ���

        bzero(bufs, sizeof(bufs)) ;
        while(get_lenth < lenth)//һֱѭ�������ݣ�ֱ����Ŀ�ﵽlenth�����ߵȴ���ʱ����
        {
                nready = poll(&pfd[1], 1, ms_timeout ) ;

                if( nready < 0 )					//POLLING����
                {
                    if (errno == EINTR)
                    {
                        continue;
                    }
                    return -1 ;
                }
                else if(nready == 0)				//��ʱ
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
                                if( errno == EINTR)			//ϵͳ�жϳ���
                                {
#if MDEBUG
                                        printf("connect reset by client.\n") ;
#endif
                                        return -1 ;

                                }
                                else
                                {
                                        printf("read \n") ;  //δ֪���󣬴�ӡ����Ϣ

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
        //tcflush(pfd[1], TCIFLUSH);������뻺���� 2018-10-23
        return get_lenth ;
}



/*
 * ��������,����һ���������24���ֽڵķ��ذ�
 * ������
 * 		fd:�ļ����
 * 		com:�´������
 * 		lenth:����ĳ���
 * 		ms_timeout:���õȴ���ʱ��ʱ��
 *����ֵ��
 *		-1:ʧ��
 *
 * */
int MySerial::WR_24_datas(int fd, const char* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

    int i ;
    Q_UNUSED(i);

#if MDEBUG
 if(com[3] != 0x13)//�Զ�����Լ�������Ҫ��ӡ2018/09/30
     {
       printf("Send command:\n");
        for (int x = 0; x < 24; x++)
        {
            printf("%x ", com[x]);
      }
        printf("\n");
    }
#endif

/*��������*/
    if( Send_data(fd, com, 24, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("Send COM failed~!\n") ;
#endif
            return -1;
    }
/*�������ݰ�*/
        nread = Get_data(fd, rbuf, 24, ms_timeout) ;
#if MDEBUG
 if( (rbuf[3] != 0x13))//�Զ�����Լ������ô�ӡ 2018/09/30
        printf("Return %d byte :\n",nread);
#endif
        if( nread == 24 )
        {
#if MDEBUG
            if( (rbuf[3] != 0x13))//�Զ�����Լ������ô�ӡ 2018/09/30
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
 * ��������,����һ���������n���ֽڵķ��ذ�
 * ������
 * 		fd:�ļ����
 * 		com:�´������
 * 		lenth:����ĳ���
 * 		ms_timeout:���õȴ���ʱ��ʱ��
 *����ֵ��
 *		-1:ʧ��
 *
 * */
int MySerial::WR_n_datas(int fd, int com_len, int ret_len, const char* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

/*��������*/
#if MDEBUG
    if(com[3] != 0x13)//�Զ�����Լ�������Ҫ��ӡ2018/09/30
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
/*�������ݰ�*/


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
 * ��������,����һ���������n���ֽڵķ��ذ�
 * ������
 * 		fd:�ļ����
 * 		com:�´������
 * 		lenth:����ĳ���
 * 		ms_timeout:���õȴ���ʱ��ʱ��
 *����ֵ��
 *		-1:ʧ��
 *
 * */
int MySerial::WR_n_datas(int fd, int com_len, int ret_len, const unsigned char* com,unsigned char* rbuf, int ms_timeout)
{
    return WR_n_datas(fd, com_len, ret_len, (const char*)com, rbuf, ms_timeout) ;
}


/*
 * ����һ��������,���ĸ��ֽںϲ���һ��int����
 * ������
 *      fd:�ļ����
 *      rbuf:���ڽ��ܷ��ذ�
 *  	ms_timeout:���õȴ���ʱ��ʱ��
 *      nums:�������ݵĸ�����һ��������6���ֽ�
 *      parse_dat:��6�� �ֽ�֮�е�4����Ч����ת��Ϊ10���ƺ󣬴�������������
 *����ֵ��
 *		-1:ʧ��
 * */
int MySerial::Parse_nums_datas(int fd,unsigned char* rbuf, int ms_timeout, unsigned int nums,unsigned int* parse_dat)
{

    unsigned int tmp1, tmp2 ;//tmp1��Ÿ߰�λ��ʱ���ݣ�tmp2��ŵͰ�λ��ʱ����
    int nread ;

    unsigned int i= 0 ;
    unsigned int ptmp ;//forѭ���õ������к�
    Q_UNUSED(ptmp);

    for(i=0; i<nums; i++)
    {
/*ÿ����6���ֽڷ���һ������*/

        if ((nread = Get_data(fd, rbuf, 6, ms_timeout)) !=6)
        {
            return -1 ;
        }

/*�жϰ�ͷ�Ƿ���ȷ������һ����ֱ���Ƴ�����*/
        if((rbuf[0]!=0xFF) || (rbuf[1]!=0x1A))
        {
            if (rbuf[0] == 0 && rbuf[1] == 0x06)
            {
                nread = Get_data(fd, rbuf + 6, 24 - 6, ms_timeout);
                // �����ݽ���Э��
                if (nread == 24 - 6)
                {
                    // У��Э��
                    unsigned char sum = 0;
                    for (int i = 0; i < 23; i++)
                    {
                        printf("%x ",rbuf[i]);
                        sum += rbuf[i];
                    }
                    if (sum == rbuf[23])
                    {
                        // �������ݣ��ع���Ա����
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

/*�жϽ�β�ĸ��ֽ��Ƿ�FF,��������ΪͨѶ����֮ǰ����������*/
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

    // ��ջ�����
    while (Get_data(fd, buf, 1, 1) > 0);

#if MDEBUG
    if (ret)
    {
        printf("Parse ending error\n");
    }
#endif
    return ret;
}



