#ifndef MYSERIAL_H
#define MYSERIAL_H
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <termios.h>
#include <sys/types.h>
#include <sys/ioctl.h>
#include <unistd.h>
#include <sys/types.h>
#include <strings.h>
#include <string.h>
#include <poll.h>
#include <errno.h>

#define BUFFER_SIZE PIPE_BUF //fifo缓冲区最大值4K

#define COM_NAME_LEN 512 //主线程发送信号时，携带字符串的长度，已包含了截止符


#define handle_error(msg) \
        do { perror(msg); exit(EXIT_FAILURE); } while (0)


extern int wait_for_test_cur_num; // 多联卡是当前测试的通道 0-4
extern int wait_for_test_cur_model;//0是单通道，5是五联卡,和协议不一样  2018-10-21
extern const char * RCard;
extern const char * SRCard;


extern int win_lenth ;

extern unsigned char adjust_v[10][3] ;



extern unsigned char version[8] ;

extern unsigned char  register_array[8][10] ;


class MySerial
{
public:
    MySerial();
    ~MySerial();
    int Open_serial() ;//
    int Set_attr(int fds) ;
    int Send_data(int fd, const char* data, unsigned int lenth, int ms_timeout);
    int Send_data(int fd, const  unsigned char* data, unsigned int lenth, int ms_timeout) ;
    int Get_data(int fd, unsigned char bufs[], unsigned int lenth, int ms_timeout);

    int WR_24_datas(int fd, const char* com,unsigned  char* rbuf, int ms_timeout) ;
    int WR_24_datas(int fd, const unsigned char* com,unsigned char* rbuf, int ms_timeout) ;
    int WR_n_datas(int fd, int com_len, int ret_len, const char* com,unsigned char* rbuf, int ms_timeout) ;
    int WR_n_datas(int fd, int com_len, int ret_len, const unsigned char* com,unsigned char* rbuf, int ms_timeout) ;
    //int Wait_178_datas(int fd, char* rbuf, int ms_timeout) ;
    int Parse_nums_datas(int fd,unsigned char* rbuf, int ms_timeout, unsigned int nums,unsigned int* parse_dat);
    static  int convert_hex2int(char source);
    // 返回接收个数，条码
    int Parse_nums_datas_p5(int fd, unsigned int* parse_dat, int ms_timeout);

    int fd ;
     int BAUD ;
     char uart_name[20] ;

private:
    struct pollfd pfd[2] ;
    // 解析新协议的函数
    int Parse_nums_datas(int fd, unsigned int* parse_dat, unsigned int nums, int ms_timeout);


};

#endif // MYSERIAL_H
