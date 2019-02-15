#ifndef UPLOADLIS_H
#define UPLOADLIS_H
#include <common/personalinfo.h>
//udp
#include <sys/un.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

//
#include "myserial.h"
#include "common/personalinfo.h"
class UploadLis
{
public:
    enum UploadWay{ 
        UDP,
        Uart,
    };

    UploadLis();
    GeneralInfo gInfo ;
    QString serialNum ;     //machine serial number
    QString company ;

    int Upload(QString filePath);
    void setUploadWay(int way) ;
    int getUploadWay() ;

    bool uartValid();
    int openUart(QString comN, int Buad);
    int openUdp(QString IP, int port);

    bool resetConnect(int buad, QString IP, int port, QString localIp);

    void setLocalIp(QString ip) ;

    void checkShakeHand(int cnt) ;

    QList <MUTI_CARD> *multi_card_list;


    bool upload_event_check(const QString &pname, int row);

private:
    /*udp*/
    int sendUDP,receUDP ;                                                               //上传
    struct sockaddr_in server_addr ;
    struct sockaddr_in addrto;

    MySerial upload_serial ;

    QString Baud ;
    QString Com ;
    bool uartIsVaild ;
    bool needShakeHand ;


    virtual int write(QString tx) ;
    virtual int read(uchar *buf, int len) ;

    int setUpDate() ;
    int uploadWay ;



};

#endif // UPLOADLIS_H
