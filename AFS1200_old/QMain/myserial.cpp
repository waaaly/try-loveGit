#include "myserial.h"


//��������
char Test[24]  = {0x01,0x00,0x00,0x05,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0b } ;
//����
char *RCard =  Test;
//����
char * SRCard = RCard;
//��λ
char Rest[24]  = {0x01,0x00,0x00,0x03,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x09 } ;
//�������
char TBar[24]  =  {0x01,0x00,0x00,0x06,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0c } ;
//������
char RBar[24]  =  {0x01,0x00,0x00,0x07,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x0d } ;
//����Լ���
char ChC[24]  = {0x01,0x00,0x00,0x13,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x19 } ;
//��ID
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
// ��·����λ
char Offset_dev[24]  =  {0x01,0x00,0x00,0x10,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x16 } ;
//Y��λ
char Y_Rest[24]  = {0x01,0x00,0x00,0x19,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x1f } ;
char TH_REF[24]  = {0x01,0x00,0x01,0x16,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x1d } ;


/*������λ��ָ���*/

//�����Ƶ��
char com2[24]  = {0x01,0x00,0x00,0x02,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x08 } ;
//����
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
unsigned char is_std ;  //�����ǳ������û���У׼����
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
 * ���ô�������
 * ������
 * 		fd : �����ļ����
 *
 * ����ֵ:
 *		0�ɹ�����1ʧ��
 * */
int MySerial::Set_attr(int )
{
    struct termios newtio, oldtio ;
    tcgetattr(in_fd, &oldtio) ;//�Ȼ��ԭ��������				/*��ʼ��*/

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
    tcflush(in_fd, TCIOFLUSH) ;					       /* ˢ���������������*/
    if( tcsetattr(in_fd, TCSANOW, &newtio) < 0 ) /* ʹ���õ��ն�����������Ч*/
    {
#if MDEBUG
            printf("Set attr failed~!\n") ;
#endif
            return -1 ;
    }
    return 0 ;

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
int MySerial::Send_data(int fd, const char* data, unsigned int lenth, int ms_timeout)
{
        int nwrite = 0;
        int nready = 0;//�����жϵȴ���д�ɶ��¼��Ƿ�ʱ
        pfd[0].fd = fd ;
        pfd[1].fd = fd ;

        nready = poll(&pfd[0], 1, ms_timeout ) ;

        if( nready < 0 )						//POLLIng����
        {

#if MDEBUG
                printf("wait for write over time\n") ;
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

       }

        return nwrite;
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
        int nwrite = 0;
        int nready = 0;//�����жϵȴ���д�ɶ��¼��Ƿ�ʱ
        pfd[0].fd = fd ;
        pfd[1].fd = fd ;

        nready = poll(&pfd[0], 1, ms_timeout ) ;

        if( nready < 0 )						//POLLIng����
        {
#if MDEBUG
                printf("wait for write over time\n") ;
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

        pfd[0].fd = fd ;
        pfd[1].fd = fd ;

        bzero(bufs, sizeof(bufs)) ;
        while(get_lenth < lenth)//һֱѭ�������ݣ�ֱ����Ŀ�ﵽlenth�����ߵȴ���ʱ����
        {
                nready = poll(&pfd[1], 1, ms_timeout ) ;

                if( nready < 0 )					//POLLING����
                {
                    if( errno == EINTR)
                        continue;
                        return -1 ;
                }
                else if(nready == 0)				//��ʱ
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
                /*10_12
                if(get_lenth == 24)
                {
                        break ;
                }*/
        }

        return get_lenth ;
}

/*
 * ����,����һ������ҽ���24�ֽڷ��ذ�
 * ������
 * 		fd:�ļ����
 * 		com:���͵�����
 * 		rbuf:���ڽ��ܷ��ذ�
 *		ms_timeout:���õȴ���ʱ��ʱ��
 *����ֵ��
 *		-1:ʧ��
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
/*֪ͨ����*/
        if( Send_data(fd, con, 1, ms_timeout) < 0 )
        {
#if MDEBUG
                printf("Send ASY failed~!\n") ;
#endif
                return -1;
        }

/*�ȴ�����*/
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

/*��������*/
        if( Send_data(fd, com, 24, ms_timeout) < 0  )  //sizeof(com) = sizeof(char) ,
        {
#if MDEBUG
                printf("Send COM failed~!\n") ;
#endif
                return -1;
        }
/*�ȴ�24�ֽ�ͷ*/
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
/*�������ݰ�*/

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

/*��������*/
    if( Send_data(fd, com, 24, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("1111Send COM failed~!\n") ;
#endif
            return -1;
    }
/*�������ݰ�*/
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
int MySerial::WR_24_datas(int fd, const uchar* com,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

    int i ;

/*��������*/
    if( Send_data(fd, com, 24, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("2222Send COM failed~!\n") ;
#endif
            return -1;
    }
/*�������ݰ�*/
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
    if( Send_data(fd, com, com_len, 1000) < 0  )  //sizeof(com) = sizeof(char) ,
    {
#if MDEBUG
            printf("serial send COM failed!!!!!!\n") ;
#endif
            return -1;
    }
/*�������ݰ�*/
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
    int nread = 0;

/*��������*/
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
       printf("get %d data :\n",nread);
    if(nread <=0 )
    {
        return -1 ;
    }
#endif


    return nread ;
}

/*
 * �ȴ�����һ24�ֽڰ�
 * ������
 * 		fd:�ļ����
 * 		com:���͵�����
 * 		rbuf:���ڽ��ܷ��ذ�
 *		ms_timeout:���õȴ���ʱ��ʱ��
 *����ֵ��
 *		-1:ʧ��
 *		-2:
 *		 n:
 * */
int MySerial::Wait_24_datas(int fd,unsigned char* rbuf, int ms_timeout)
{
    int nread = 0;

    int i ;


/*�������ݰ�*/
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
 * ����һ��ӫ�ⳤ����,���ĸ��ֽںϲ���һ��int����
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
#if MDEBUG
            printf("*************************************\n");
#endif
    for(i=0; i<nums; i++)
    {
/*ÿ����6���ֽڷ���һ������*/
        if ((nread = Get_data(fd, rbuf, 6, ms_timeout)) !=6)
        {
#if MDEBUG
            printf("Error when get 6 datas\n");
#endif
            return -1 ;
        }
/*�жϰ�ͷ�Ƿ���ȷ������һ����ֱ���Ƴ�����*/
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
/*�жϽ�β�ĸ��ֽ��Ƿ�FF,��������ΪͨѶ����֮ǰ����������*/
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




