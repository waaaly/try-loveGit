#include "printer.h"
#include "app/myhelper.h"
#include "../funcset/itemmanager.h"
#include <QDebug>


Printer::Printer()
{

    printerIsVaild = false ;

    QString comName = "/dev/ttyO4" ;

    openUart(comName) ;


    myHelper::read_system_config(&sys_cfg);


    //openUart("COM3") ;
}

//����ӡ����û��ֽ
bool Printer::paperCheck()
{
    char buffer[5] ={0x10,0x04, 4, 2, '\0'};
//    char buffer[4] ={0x10, 0x04, 0x04, '\0'};
    uchar buf[2] ;
    write(buffer) ;

    if( read(buf, 1) > 0)
    {

        if(buf[0] == 0x72)
            return false ;
        else
            return true ;
    }

    return false ;
}

int Printer::print(QString filePath, QString companyName, QString Statement)
{
    int ret ;

    if( !paperCheck() )
         return -2 ;

    ret = gInfo.parseData(filePath, companyName) ;
    gInfo.declare = Statement;                  //2018-10-22
    if(ret < 0)
        return -1 ;

    return setUplayout() ;
}

int Printer::setUplayout()
{

    /***********************************
     * ������������Ƽ����޹�˾
     * CRP��ⱨ�浥
     * No     :
     * �� �� ��:
     * ��������:
     * ��   ��:
     * ��   ��:
     * ��   ��:
     * ���ʱ��:2017-02-10 09:11:21
     * --------------------------------
     * �����Ŀ      ���        ��λ
     * CRP          22.12      mg/l
     *
     * --------------------------------
     * �����ֻ�Ա��걾����!
     * ��ӡʱ��:2017-02-10 09:11:21
     ************************************/

    QString fillOneLine ;
    int isEnglish = myHelper::read_config_sig(CONFIG_INI,
                                            "Set_lis",
                                            "language").toInt() ;
    if(isEnglish)
    {
        //1��companyName
        write(gInfo.companyName + "\r\n") ;

        //2��ReportName
        char enlarge_2[5] = {0x1b,0x57,02,'\n','\0'} ;//big
        char enlarge_1[5] = {0x1b,0x57,01,'\n','\0'} ;
        QString wholeName ;
            wholeName = gInfo.reportName + " Report";

        int strLen = wholeName.toLocal8Bit().length() ;
        qDebug() <<__LINE__ <<__FUNCTION__<< strLen ;
        if(strLen  < 16){
            write(enlarge_2) ;
        }

        write(wholeName + "\r\n") ;

        if(strLen  < 16){
            write(enlarge_1) ;
        }


        //3��Serial Number&Sample NO.
        write("Serial Number:" + gInfo.serialNo + "\r\n") ;

        write("Sample NO.   :" + gInfo.sampleNo + "\r\n") ;

        //4��sampleType
        qDebug() <<__LINE__ <<__FUNCTION__<< gInfo.sampleType;
        if(gInfo.sampleType.toLocal8Bit()== "Ѫ��/Ѫ��")
            write("Sample Type  : Serum/Plasma\r\n") ;
        else if(gInfo.sampleType.toLocal8Bit() == "ȫѪ")
            write("Sample Type  : Whole Blood\r\n") ;
        else if(gInfo.sampleType.toLocal8Bit() == "ĩ��Ѫ")
            write("Sample Type  : Peripheral Blood\r\n") ;
        else if(gInfo.sampleType.toLocal8Bit()== "��Һ")
            write("Sample Type  : Urine\r\n") ;
        else if(gInfo.sampleType.toLocal8Bit() == "�ʿ�")
            write("Sample Type  : QC\r\n") ;


//        if (myHelper::read_config_sig(CONFIG_INI, "Set_lis", "print_detail").toInt())
//        { ���ڴ�ӡҳ�������Ƿ��ӡ�߼���Ϣ 2018/10/10  }
            //5��Name
            if(!gInfo.name.isEmpty() && gInfo.name != " ")
            {
                write("Name        :" + gInfo.name + "\r\n") ;
            }
            //6��"Gender
            if(gInfo.sex.toLocal8Bit() != " ")
            {
                if(gInfo.sex.toLocal8Bit() == "��")
                    write("Gender       :Male\r\n") ;
                else if(gInfo.sex.toLocal8Bit() == "Ů")
                    write("Gender       :Female\r\n");
                else{}
            }
            //7��"Age
            if(!gInfo.age.isEmpty() && gInfo.age != " ")
            {
                write("Age         :" + gInfo.age + "\r\n") ;
            }

        //8��Test Time
         write("Test Time   :" + gInfo.testTime + "\r\n") ;
        //9���ָ���
        fillOneLine.fill('-',31) ;
        write(fillOneLine + "\r\n") ;
        //10��reselut
        fillOneLine.clear() ;
        fillOneLine.fill(' ',31) ;
        QString tmp ;
         tmp = "Subitem" ;
        fillOneLine =  fillOneLine.replace(0, tmp.length(), tmp) ;
        tmp.clear();
         tmp = "Conc." ;
        fillOneLine =  fillOneLine.replace(14, tmp.length(), tmp) ;
        tmp.clear();
        tmp = isEnglish? "Unit" :QObject::tr("��λ") ;
        fillOneLine =  fillOneLine.replace(23, tmp.length(), tmp) ;
        write(fillOneLine + "\r\n") ;
            //���
        for(int i=0; i<gInfo.results.count(); i++)
        {
            Result result = gInfo.results.results.at(i) ;

            fillOneLine.clear() ;
            fillOneLine.fill(' ',24) ;

            QString finalResult = result.result + itemMat->getArrow(result.pName, result.result);//result.result + ReferenceSet::getArrow(refer, result.result) ;

            fillOneLine.replace(3, result.pName.length(), result.pName) ;

            QByteArray bAall = fillOneLine.toLocal8Bit() ;
            QByteArray bAstr = finalResult.toLocal8Bit() ;
            bAall.replace(14, bAstr.length(), bAstr) ;

            bAstr = result.unit.toLocal8Bit() ;
            bAall.replace(23, bAstr.length(), bAstr) ;

            fillOneLine = QString::fromLocal8Bit(bAall) ;
            write(fillOneLine + "\r\n") ;

            fillOneLine = itemMat->getRefer(result.pName) ;
            if(!fillOneLine.isEmpty())
                write("  " + fillOneLine) ;
        }
        //11���ָ���
        fillOneLine.clear() ;
        fillOneLine.fill('-',31) ;
        write(fillOneLine + "\r\n") ;
        //12������
        write("This Result Is Only For This Sample!\r\n") ;
        //13����ӡʱ��
        write("Print Time:"+ gInfo.printTime+ "\r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;

    }
    else
    {
        /*** CN report      ** /
/*********************************************************************************************************/
        //1����������
        write(gInfo.companyName + "\r\n") ;

        //2����������
        char enlarge_2[5] = {0x1b,0x57,02,'\n','\0'} ;
        char enlarge_1[5] = {0x1b,0x57,01,'\n','\0'} ;
        QString wholeName ;
        //if(ui->rcardButton->text() == "Test")
        //    wholeName = gInfo.reportName + " Report" ;
        //else
            wholeName = gInfo.reportName + QObject::tr("\t���浥") ;

        int strLen = wholeName.toLocal8Bit().length() ;
        qDebug() <<__LINE__ <<__FUNCTION__<< strLen ;
        if(strLen  < 16){
            write(enlarge_2) ;
        }

        write(wholeName + "\r\n") ;

        if(strLen  < 16){
            write(enlarge_1) ;
        }


        //3��������&��ˮ��
        write(QObject::tr("�� ˮ ��: ") + gInfo.serialNo + "\r\n") ;

        write(QObject::tr("�� �� ��: ") + gInfo.sampleNo + "\r\n") ;


        //4����������
        write(QObject::tr("��������: ") + gInfo.sampleType + "\r\n") ;

//        if (myHelper::read_config_sig(CONFIG_INI, "Set_lis", "print_detail").toInt())
//        {     ���ڴ�ӡҳ�������Ƿ��ӡ�߼���Ϣ 2018/10/10   }
            //5������
            if(!gInfo.name.isEmpty() && gInfo.name != " ")
                write(QObject::tr("��    ��: ") + gInfo.name + "\r\n") ;
            //6���Ա�
            if(gInfo.sex.toLocal8Bit() == ("��") ||  gInfo.sex.toLocal8Bit() == ("Ů"))
            {
                write(QObject::tr("��    ��: ") + gInfo.sex + "\r\n") ;
            }
            //7������
            if(!gInfo.age.isEmpty() && gInfo.age != " ")
                write(QObject::tr("��    ��: ") + gInfo.age + "\r\n") ;

        //8�����ʱ��
        write(QObject::tr("���ʱ��: ") + gInfo.testTime + "\r\n") ;
        //9���ָ���
        fillOneLine.fill('-',31) ;
        write(fillOneLine + "\r\n") ;
        //10���������
        fillOneLine.clear() ;
        fillOneLine.fill(' ',24) ;
        QString tmp ;
        tmp = QObject::tr("�����Ŀ") ;
        fillOneLine =  fillOneLine.replace(0, tmp.length(), tmp) ;
        tmp.clear();
        tmp = QObject::tr("���") ;
        fillOneLine =  fillOneLine.replace(10, tmp.length(), tmp) ;
        tmp.clear();
        tmp = isEnglish? "Unit" :QObject::tr("��λ") ;
//        tmp = QObject::tr("��λ") ;
        fillOneLine =  fillOneLine.replace(isEnglish?23:17, tmp.length(), tmp) ;
//        fillOneLine =  fillOneLine.replace(isEnglish?23:17, tmp.length(), tmp) ;
        write(fillOneLine + "\r\n") ;
            //���
        for(int i=0; i<gInfo.results.count(); i++){
            Result result = gInfo.results.results.at(i) ;

            fillOneLine.clear() ;
            fillOneLine.fill(' ',24) ;

            QString finalResult = result.result + itemMat->getArrow(result.pName, result.result);//result.result + ReferenceSet::getArrow(refer, result.result) ;

            fillOneLine.replace(0, result.pName.length(), result.pName) ;

            QByteArray bAall = fillOneLine.toLocal8Bit() ;
            QByteArray bAstr = finalResult.toLocal8Bit() ;
            bAall.replace(14, bAstr.length(), bAstr) ;

            bAstr = result.unit.toLocal8Bit() ;
            bAall.replace(23, bAstr.length(), bAstr) ;


            fillOneLine = QString::fromLocal8Bit(bAall) ;
            write(fillOneLine + "\r\n") ;

            fillOneLine = itemMat->getRefer(result.pName) ;
            if(!fillOneLine.isEmpty())
                write("  " + fillOneLine) ;



        }
        //11���ָ���
        fillOneLine.clear() ;
        fillOneLine.fill('-',31) ;
        write(fillOneLine + "\r\n") ;
        //12������
        write(gInfo.declare + "\r\n") ;
        //13����ӡʱ��
        write(QObject::tr("��ӡʱ��: ") + gInfo.printTime + "\r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;
        write(" \r\n") ;

    }
    return true ;
}

int Printer::write(const char *tx)
{

    //QString to = Myhelper::utf8Togbk(tx) ;

    if( print_serial.Send_data(print_serial.fd, (const unsigned char*)tx, strlen(tx), 6000) < 0 )
    {

            printf("Send print com failed~!\\r") ;

            return -1;
    }

    myHelper::msDelay(150) ;

    return 0 ;
}
int Printer::write(QString tx)
{
    //QString to = Myhelper::utf8Togbk(tx) ;
    const char *cStr = tx.toLocal8Bit().constData() ;

    if( print_serial.Send_data(print_serial.fd, cStr, strlen(cStr), 6000) < 0 )
    {
            printf("Send print com failed~!\\r") ;
            return -1;
    }

    myHelper::msDelay(280) ;

    return 0 ;
}

int Printer::read(uchar *buf, int len)
{
    int n_ret = 0 ;
    if ((n_ret = print_serial.Get_data(print_serial.fd, buf, len, 1000)) > 0)
    {
      ;;
    }
    qDebug()<<__LINE__ <<__FUNCTION__<< "ret:\n"<<n_ret;
    return n_ret ;
}

int Printer::openUart(QString comN)
{

    print_serial.BAUD = B9600 ;  //9600
    strcpy( print_serial.uart_name, comN.toAscii().constData()) ;

    if( this->print_serial.Open_serial() < 0 )
    {
      //if not succee then give tips by information win,and stop next step.
      this->printerIsVaild = false ;
    }
    else
    {
        this->printerIsVaild = true ;
//        // ��ӡ����ʼ������ֹ��ӡ������������
//        if(sys_cfg.print_opposite)
//        {
////            this->print_serial.Send_data(print_serial.fd, "\x27\x64\x00", 3, 100);
//            char buffer[3] ={0x1B, 0x40, '\0'};
//            write(buffer) ;
//        }
//        else
//        {
//            this->print_serial.Send_data(print_serial.fd, "\x1b\x40\x00", 3, 100);
//        }
    }

    return this->printerIsVaild ;
}

bool Printer::printerValid()
{
    return printerIsVaild ;
}


