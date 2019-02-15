#ifndef PRINTER_H
#define PRINTER_H
#include <QString>
#include <QList>
#include <QDebug>
#include "../myserial.h"
#include "personalinfo.h"



class Printer
{
public:
    Printer();

    int print(QString filePath ,QString companyName,QString Statement) ;//2018-10-26  传入声明和公司名
    bool printerValid() ;
    int openUart(QString comN);
    QString company ;

private:
    int setUplayout() ;

    MySerial print_serial ;
    GeneralInfo gInfo ;

    virtual int write(QString tx) ;
    virtual int write(const char *tx) ;
    virtual int read(uchar *buf, int len) ;
    bool paperCheck() ;
    bool printerIsVaild ;
    QString Baud ;
    QString Com ;

    SYSTEM_CONFIG sys_cfg;

};

#endif // PRINTER_H
