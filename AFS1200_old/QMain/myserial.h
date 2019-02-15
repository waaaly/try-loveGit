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

#include "ID/uIDCardDef.h"

#define BUFFER_SIZE PIPE_BUF //fifo缓冲区最大值4K
#define UART1 "/dev/ttyUSB0"
#define COM_NAME_LEN 512 //主线程发送socket信号时，携带字符串的长度，已包含了截止符
//#define COM_NAME_LEN 6
#define IC_CARD_TYPE 1
#define WIFI 1

#define handle_error(msg) \
        do { perror(msg); exit(EXIT_FAILURE); } while (0)

#define MDEBUG 1  //是否打印串口函数调试信息

extern char *RCard ;
extern char *SRCard ;
extern char com2[24]  ;
extern char Rest[24] ;
extern char Drop[24] ;
extern char Test[24] ;
extern char TBar[24];
extern char RBar[24] ;
extern char Ridc[24] ;
extern char Cidc[24] ;
extern char ChC[24] ;
extern char Print_test[2];
extern unsigned char WAdjust[24] ;

extern unsigned char DTC[24] ;
extern unsigned char DTT[24] ;
extern unsigned char DCC[24] ;

extern char *sw_RCard ;
extern char *at_once_RCard ;
extern char *save_sw_RCard ;
extern int win_lenth ;

extern unsigned char adjust_v[10][3] ;

extern double adjust_std[6] ;
extern double adjust_cur[6] ;

extern unsigned char version[8] ;

extern unsigned char  register_array[8][10] ;

extern UART_COF uart_config[5] ;
extern uchar th_serial_use ;
extern uchar print_serial_use ;
extern uchar upload_serial_use ;
extern uchar wifi_serial_use ;
extern uchar IC_serial_use ;

extern char Offset_dev[24];
extern char TH_REF[24];//  = {0x00,0x06,0x01,0x16,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x1d } ;



class MySerial
{
public:
    MySerial();
    ~MySerial() ;
    int Open_serial() ;//
    int Set_attr(int fds) ;
    int Send_data(int fd, const char* data, unsigned int lenth, int ms_timeout);
    int Send_data(int fd, const  unsigned char* data, unsigned int lenth, int ms_timeout) ;
    int Get_data(int fd, unsigned char bufs[], unsigned int lenth, int ms_timeout);
    int Send_command(int fd, const char* com,unsigned char* rbuf, int ms_timeout);
    int Wait_24_datas(int fd, unsigned  char* rbuf, int ms_timeout) ;
    int WR_24_datas(int fd, const char* com,unsigned  char* rbuf, int ms_timeout) ;
    int WR_24_datas(int fd, const unsigned char* com,unsigned char* rbuf, int ms_timeout) ;
    int WR_n_datas(int fd, int com_len, int ret_len, const char* com,unsigned char* rbuf, int ms_timeout) ;
    int WR_n_datas(int fd, int com_len, int ret_len, const unsigned char* com,unsigned char* rbuf, int ms_timeout) ;
    //int Wait_178_datas(int fd, char* rbuf, int ms_timeout) ;
    int Parse_nums_datas(int fd,unsigned char* rbuf, int ms_timeout, unsigned int nums,unsigned int* parse_dat);
    static  int convert_hex2int(char source);

    int in_fd ;
     int BAUD ;
     char uart_name[20] ;
    //unsigned char gbuf[24] ;
    //unsigned int data_gets[340] ;


private:
    struct pollfd pfd[2] ;
    char con[2] ;





};

#endif // MYSERIAL_H
