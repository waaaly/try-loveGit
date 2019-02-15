#include "uploadlis.h"
#include <QDebug>
extern int Board_type;

UploadLis::UploadLis()
{
    receUDP = - 1 ;

    // uart 初始化
    // UDP 初始化
    resetConnect(
                 myHelper::read_config_sig(CONFIG_INI,
                                                            "Set_lis",
                                                            "uart_buad").toInt(),
                 myHelper::read_config_sig(CONFIG_INI,
                                                            "Set_lis",
                                                            "udp_ip"),
                 myHelper::read_config_sig(CONFIG_INI,
                                                            "Set_lis",
                                                            "udp_port").toInt(),
                 myHelper::read_config_sig(CONFIG_INI,
                                                            "Set_lis",
                                                            "local_ip")) ;
}

int UploadLis::Upload(QString filePath)
{
    gInfo.parseData(filePath,"uploand") ;

    QList<Result> tmp = gInfo.results.results;

    /*查询多联卡上传设置*/
    int k1;
    for(k1 = 0; k1 < multi_card_list->count(); k1++)
    {
        if(gInfo.Title == multi_card_list->at(k1).main_name)
            break ;
    }
    for(int i=0; i<gInfo.results.count() && gInfo.results.count() != 0; i++)
    {
        if (!upload_event_check(gInfo.results.results.at(i).pName, k1))
        {
            gInfo.results.results.removeAt(i);
            i--;
        }
    }

    if (gInfo.results.count() == 0)
    {
        gInfo.results.results = tmp;
    }
    checkShakeHand(gInfo.results.count());

    return setUpDate() ;
}

void UploadLis::setUploadWay(int way)
{
    uploadWay = way ;
}

int UploadLis::getUploadWay()
{
    return uploadWay ;
}

int UploadLis::write(QString tx)
{

    QTextCodec* utf8Codec = QTextCodec::codecForName("utf-8");
    QTextCodec* gb2312Codec = QTextCodec::codecForName("gb2312");

    QString strUnicode = gb2312Codec->toUnicode(tx.toLocal8Bit());
    QByteArray ByteUtf8 = utf8Codec->fromUnicode(strUnicode);

    switch(uploadWay){
        case UDP:{
            sendto(sendUDP, ByteUtf8.data(), ByteUtf8.length(), 0,  (struct sockaddr*)&addrto, sizeof(addrto)) ;
            break ;
        }
        case Uart:{
        int returnByte;
            //串口上历史
           if(tcflush(upload_serial.fd, TCOFLUSH) == 0)
            {
                if( ( returnByte = upload_serial.Send_data(upload_serial.fd, ByteUtf8.data(), ByteUtf8.length(), 6000)) <0)
                {
                        printf("Send print com failed~!\\r") ;
                        return -1;
                }
                qDebug() <<__LINE__ <<__FUNCTION__<< "Sended Byte Num:" << returnByte;
                break ;
            }
            else
            {
                break;
            }
        }
    }

    return 0 ;
}

int UploadLis::read(uchar *buf, int len)
{
    int n_ret ;
    switch(uploadWay){
        case UDP:{
            n_ret=recvfrom(receUDP, buf, 512, MSG_DONTWAIT,//MSG_DONTWAIT
                               (struct sockaddr *)&server_addr, (socklen_t*)&len);
            if(n_ret>0)
            {
                return n_ret ;
                break ;
            }
            else
            {
                return -1;
            }
        }
        case Uart:
        {
                    if ((n_ret = upload_serial.Get_data(upload_serial.fd, buf, len, 1000)) > 0)//2018-10-24这里等待时间，不能写0
                    {
                        return n_ret ;
                        break ;
                    }
                    else
                    {
                        return -1;
                    }
        }
    }
    return n_ret ;
}

int UploadLis::setUpDate()
{
    int ret = 0 ;
    for(int i = 0; i<gInfo.results.count(); i++)
    {
        Result result = gInfo.results.results.at(i) ;
        QString sendData ;
        QString no ;

        if(gInfo.sampleNo.isEmpty())
            no = gInfo.serialNo ;
        else
            no = gInfo.sampleNo ;

            // 20170206
            // FF& 040603e93& <1& 2016-9-2 11:07:50&CRP/PCT&hscrp&张三&24岁&男&血清&EE
        sendData = sendData + "FF&"
            + serialNum + no    + "&"           //040603e93&
            + result.result     + "&"               //<1&
            + gInfo.testTime    + "&"           //2016-9-2 11:07:50&
            + gInfo.reportName  + "&"       //CRP/PCT&
            + result.pName      + "&"           //hscrp&
            + gInfo.name + "&"                   //张三&
            + gInfo.age  + "&"                      //24岁&
            + gInfo.sex  + "&"                       //男&
            + gInfo.sampleType + "&"        //血清&
            + "EE";

        qDebug()<<__LINE__ <<__FUNCTION__
               <<"sendData:"<<sendData;

        QTextCodec* utf8Codec = QTextCodec::codecForName("utf-8");
        QTextCodec* gb2312Codec = QTextCodec::codecForName("gb2312");

        QString strUnicode = gb2312Codec->toUnicode(sendData.toLocal8Bit());
        QByteArray ByteUtf8 = utf8Codec->fromUnicode(strUnicode);

        int trySendTimes  ;
        for(trySendTimes=0; trySendTimes<3; trySendTimes++)// 尝试三次
        {
            qDebug() <<__LINE__ <<__FUNCTION__<<"SendDate Length:"<< sendData.toLocal8Bit().length();

            if(uartValid())
            {
                if(write(sendData) < 0)
                    return -2 ;
            }

            int offset = 0 ;
            uchar receBuf[1024] = {0};
            //如果握手则要等待返回
            if(needShakeHand)
            {
                for(int k=0; k<(uploadWay == UDP? 55:1); k++)
                {
                    if(uploadWay == UDP)
                    {
                        myHelper::msDelay(4) ;
                    }
                    int n = read(receBuf, 18) ;
                    while( n <= 0)
                    {
                        n = read(receBuf, 18) ;
                    }
                    QString strBuf ;
                    qDebug() <<__LINE__ <<__FUNCTION__<< "n = " << n;
                    if(n>0)
                    {
                        char exchangeBuf[1024] = {0};
                        memcpy(exchangeBuf, &receBuf[offset], 1024) ;
                        strBuf = strBuf + QString::fromAscii (exchangeBuf) ;
                        offset += n ;
                        offset = offset%1024 ;
                        qDebug() <<__LINE__ <<__FUNCTION__<< "recevie: "<< strBuf ;
                    }

                    if(uploadWay == UDP)
                    {
                        if(!strBuf.contains(ByteUtf8))
                        {
                            ret = -1 ;
                        }
                        else
                        {
                                myHelper::msDelay(20);
                                ret = 0 ;
                                break ;
                        }
                    }
                    else//usart
                    {
                        if(strBuf.contains("#AFS1000#continue#"))
                        {
                            myHelper::msDelay(20);
                            tcflush(upload_serial.fd,TCOFLUSH);
                            ret = 0 ;
                            break ;
                        }
                        else
                        {
                            ret = -1 ;
                            qDebug() <<__LINE__ <<__FUNCTION__<<"usart";
                        }
                    }
                }
            }
            else{
                myHelper::msDelay(30);
                break ;
            }

            if(ret == 0)
                break ;

        }
//        if(trySendTimes >= 3 && (ret = -1))
//            return -1 ;
    }
    return ret ;
}

int UploadLis::openUdp(QString IP, int port)
{
    int host = port ;
    const char* server_ip = IP.toLocal8Bit().constData();

    // 绑定地址

    bzero(&addrto, sizeof(struct sockaddr_in));
    addrto.sin_family = AF_INET;
    addrto.sin_addr.s_addr = htonl(INADDR_ANY);
    addrto.sin_port = htons(host);
    inet_pton(AF_INET, server_ip, &addrto.sin_addr) ;

    // rece addr
    bzero(&server_addr, sizeof(server_addr)) ;
    server_addr.sin_family = AF_INET ;
    server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    server_addr.sin_port = htons(host+1) ;
   // server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");//htonl() ;
    //inet_pton(AF_INET, server_ip, &server_addr.sin_addr) ;

    //get socket
    sendUDP = socket(AF_INET, SOCK_DGRAM, 0) ;
    receUDP = socket(AF_INET, SOCK_DGRAM, 0) ;
    if(sendUDP<0 || (receUDP<0))
    {
       printf("get socket failed \n" ) ;
    }
    //设置该套接字为广播类型，

    //bind send addr
    if(bind(receUDP,(struct sockaddr *)&(server_addr), sizeof(struct sockaddr_in)) == -1)
    {
        //qDebug()<< ("bind error...");
    }

}

int UploadLis::openUart(QString comN, int Buad)
{
    //upload_serial.BAUD = B9600 ;
    strcpy( upload_serial.uart_name, comN.toAscii().constData()) ;
    //qDebug() << __LINE__ << "baud:  " << Buad ;
    switch(Buad)
    {
        default:
        case 0:upload_serial.BAUD = B9600;break ;
        case 1:upload_serial.BAUD = B19200;break ;
        case 2: upload_serial.BAUD = B38400;break ;
        case 3: upload_serial.BAUD = B57600;break ;
        case 4: upload_serial.BAUD = B115200;break ;
    }


    if( this->upload_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
      this->uartIsVaild = false ;
    }
    else
    {
        this->uartIsVaild = true ;
    }

    return this->uartIsVaild ;

}
bool UploadLis::uartValid()
{
    return uartIsVaild ;
}

bool UploadLis::resetConnect(int buad , QString IP, int port, QString localIp)
{

    QString comName =  "/dev/ttyO3" ;

    if(receUDP > -1){
        ::close(receUDP) ;
        ::close(sendUDP) ;
    }
    if(this->uartIsVaild){
        ::close(upload_serial.fd) ;
    }

    setLocalIp(localIp) ;
    openUdp(IP, port) ;
    openUart(comName, buad) ;

    setUploadWay(myHelper::read_config_sig(CONFIG_INI,
                                           "Set_lis",
                                           "current_upload_way").toInt()) ;

    return false ;
}

void UploadLis::setLocalIp(QString ip)
{
    //设置本地IP
    QString set_local_ip = "ifconfig eth0 " + ip ;
    system(set_local_ip.toLocal8Bit().constData()) ;
    QString gw = ip.mid(0, ip.lastIndexOf('.') ) + ".1";
    set_local_ip = "route add default gw " + gw ;
    system(set_local_ip.toLocal8Bit().constData()) ;

}

void UploadLis::checkShakeHand(int cnt)
{
    bool ret = false ;
    QString msg = QString("#AFS1000?#%1#").arg(cnt);
    QString tmp ;

    uchar receBuf[512] = {0};

    tmp.clear() ;
    for(int i=0; i<3; i++)
    {
        bzero(receBuf, 512) ;
        if(uartValid())
            write(msg);                             //尝试发送握手信息 2018/10/09
        if(uploadWay == UDP)
            myHelper::msDelay(300);
        int n_ret = read(receBuf, 18) ;
        qDebug() <<__LINE__ <<__FUNCTION__<< " get n_ret length="<<n_ret ;
            if(n_ret>0)
            {
                char exchangeBuf[512] = {0};
                memcpy(exchangeBuf, receBuf, 512) ;
                tmp = tmp + QString::fromAscii(exchangeBuf) ;
            }
            //actually, it can't be two place.
            if(uploadWay == UDP){
            qDebug() <<__LINE__ <<__FUNCTION__<<"tmp =" << tmp;
                if(tmp.contains("#AFS1000#Printer#")){
                    ret = true ;
                    break ;
                }
            }
            else{
                qDebug() <<__LINE__ <<__FUNCTION__<<"tmp =" << tmp;
                if(tmp.contains("#AFS1000#continue#")){
                    tcflush(upload_serial.fd, TCOFLUSH) ;
                    ret = true ;
                    break ;
                }
            }

    }

    needShakeHand = ret ;

}


bool UploadLis::upload_event_check(const QString&pname, int row)
{
    if(row < multi_card_list->count())                                     //有该项目
    {
        const MUTI_CARD &prj = multi_card_list->at(row);
        QString name = pname;
        for(int i = 0; i < prj.sub_count; i++)
        {
            if(name == prj.sub_name[i])
            {
                return prj.sub_use[i];
            }
        }
    }
    return true;
}
