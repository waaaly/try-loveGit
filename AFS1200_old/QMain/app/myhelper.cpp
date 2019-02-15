/***************************************************************

*****************************************************************/
#include "myhelper.h"
#include <QApplication>
#include "frmmessagebox.h"


#include <QTime>
#include <QProcess>
//#include <QSqlQuery>
#include <QDebug>
#include <QLabel>
#include <QSettings>
#include <QDateTime>
#include <QDir>
#include <QFileInfoList>
#include <QTextStream>
#include <QFile>
#include <QIODevice>

myHelper::myHelper(QObject *parent) :
    QObject(parent)
{
    myHelper::SetGBK2312Code() ;

}

void myHelper::SetGBK2312Code()
{
    QTextCodec *codec=QTextCodec::codecForName("GB2312");
    QTextCodec::setCodecForLocale(codec);

    //QTextCodec::setCodecForLocale(QTextCodec::codecForName("GB2312"));

   //QTextCodec::setCodecForCStrings(QTextCodec::codecForName("GB2312"));

     QTextCodec::setCodecForTr(QTextCodec::codecForName("GB2312"));
}


void myHelper::SetUTF8Code()
{
#if(QT_VERSION <= QT_VERSION_CHECK(5,0,0))
    QTextCodec *codec=QTextCodec::codecForName("UTF-8");
    QTextCodec::setCodecForCStrings(codec);
    QTextCodec::setCodecForLocale(codec);
    QTextCodec::setCodecForTr(codec);

#endif
}


void myHelper::SetStyle(const QString &StyleName)
{
    QFile file(QString(":/image/%1.css").arg(StyleName));
    file.open(QFile::ReadOnly);
    QString qss = QLatin1String(file.readAll());
    qApp->setStyleSheet(qss);
    qApp->setPalette(QPalette(QColor("#F0F0F0")));
}


void myHelper::SetChinese()
{
    QTranslator *translator = new QTranslator(qApp);
    translator->load(":/english_to_zh.qm");
    qApp->installTranslator(translator);
}

void myHelper::Setnone()
{
    QTranslator *translator = new QTranslator(qApp);
    translator->load(":/zh_to_zh.qm");
    qApp->removeTranslator(translator);
}



bool myHelper::ShowMessageBoxInfo(QString info)
{
    frmMessageBox *msg = new frmMessageBox;
    msg->SetMessage(info,1);
   // msg->exec();

    return msg->exec();
}


void myHelper::ShowMessageBoxError(QString info)
{
    frmMessageBox *msg = new frmMessageBox;
   // QFont font  = msg->font();
    // font.setPointSize(22);
    // msg->setFont(font);
    msg->SetMessage(info,2);
    msg->exec();

}


int myHelper::ShowMessageBoxQuesion(QString info)
{
    frmMessageBox *msg = new frmMessageBox;
    msg->SetMessage(info,0);
    return msg->exec();
}

QString myHelper::ShowInputBox(QWidget *frm, QString info)
{
    bool ok;
    return QInputDialog::getText(frm,"/",info,QLineEdit::Password,"",&ok);
}


int myHelper::ShowMessageBoxPayInfo(QString info)
{
    frmMessageBox *msg = new frmMessageBox;
    msg->SetMessage(info,3);
    msg->exec();
    return 0 ;
}

bool myHelper::FileIsExist(QString strFile)
{
    QFile tempFile(strFile);
    return tempFile.exists();
}


bool myHelper::CopyFile(QString ,QString targetFile)
{
    if(FileIsExist(targetFile))
    {
        int ret = QMessageBox::information(0,"/","文件已经存在,是否替换?",QMessageBox::Yes | QMessageBox::No);
        if(ret != QMessageBox::Yes)
        {
            return false;
        }
    }
}

bool myHelper::SetBox(QLabel* lab, QString str)
{
    lab->setText(str);
    return true;
}
void myHelper::CheckConfig(QString filename)
{
    if(! FileIsExist(filename) )
    {
        create_config_file(filename, 0) ;
        return ;
    }
    else
    {
        bool ok ;
        QString fileName = filename;
        QSettings *set = new QSettings(fileName, QSettings::IniFormat);

        set->beginGroup("Set_crp");
        QString value = set->value("hscrp").toString();
        set->endGroup();

       value.toInt(&ok, 10);
        if(!ok)
            create_config_file(filename, 1) ;
    }
}

void myHelper::write_config_sig(QString filename, QString group, QString sub, QString text)
{
    QSettings *set = new QSettings(filename, QSettings::IniFormat);
     set->beginGroup(group);
      set->setValue(sub, text);
     set->endGroup();
}
void myHelper::read_config_sig(QString filename, QString group, QString sub, QString *text)
{
    QSettings *set = new QSettings(filename, QSettings::IniFormat);
     set->beginGroup(group);
     *text = set->value(sub).toString();
     set->endGroup();
}

void myHelper::create_config_file(QString , bool exist)
{
    if(!exist)
    {
        system("touch config.ini") ;
    }
    QString fileName = "config.ini";
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);

        set->beginGroup("Set_test");
        set->setValue("Startnum", "1");     /*1*/
        set->setValue("Numlenth", "3");     /*2*/
        set->setValue("Samelenth", "1");    /*3*/
        set->setValue("Autoprint", "0");    /*4*/
        set->setValue("Scanbar", "1");      /*5*/
        set->setValue("Keepdays", "0") ;    /*6*/
        set->setValue("Autotest", "0") ;
        set->setValue("Stdtest", "1") ;    /*8*/
        set->setValue("Usegun", "0") ;    /*9*/
        set->setValue("Sampletype", "0") ;    /*10*/
        set->setValue("Jiangeshijian", "0") ;    /*11*/
        set->setValue("Sampletype_2", "0") ;    /*12*/
        set->setValue("gun_count", "12") ;    /*13*/
        set->setValue("NONE14", "0") ;    /*14*/
        set->setValue("NONE15", "0") ;    /*15*/
        set->setValue("NONE16", "0") ;    /*16*/
        set->setValue("NONE17", "0") ;    /*17*/
        set->setValue("NONE18", "0") ;    /*18*/
        set->setValue("NONE19", "0") ;    /*19*/
        set->setValue("NONE20", "0") ;    /*20*/
        set->endGroup();


        set->beginGroup("Set_lis");
        set->setValue("auto_upload", "0");
        set->setValue("udp_port", "8550");
        set->setValue("udp_ip", "192.168.1.34");
        set->setValue("uart_buad", "4");
        set->setValue("com", "4");
        set->setValue("current_upload_way", "1");
        set->setValue("language", "0");
        set->setValue("local_ip", "192.168.1.136");
        set->setValue("NONE9", "0") ;    /*9*/
        set->setValue("NONE10", "0") ;    /*10*/
        set->setValue("NONE11", "0") ;    /*11*/
        set->setValue("NONE12", "0") ;    /*12*/
        set->setValue("NONE13", "0") ;    /*13*/
        set->setValue("NONE14", "0") ;    /*14*/
        set->setValue("NONE15", "0") ;    /*15*/
        set->setValue("NONE16", "0") ;    /*16*/
        set->setValue("NONE17", "0") ;    /*17*/
        set->setValue("NONE18", "0") ;    /*18*/
        set->setValue("NONE19", "0") ;    /*19*/
        set->setValue("NONE20", "0") ;    /*20*/
        set->endGroup();

        set->beginGroup("Set_crp");
        set->setValue("hscrp", "0");
        set->endGroup();


        set->beginGroup("Set_Project");
        set->setValue("currentproject", "idfile_1.BAS");
        set->endGroup();


        set->beginGroup("Set_count");
        set->setValue("chanel_0", "idfile_1.BAS");
        set->setValue("chanel_1", "idfile_1.BAS");
        set->setValue("chanel_2", "idfile_1.BAS");
        set->setValue("chanel_3", "idfile_1.BAS");
        set->setValue("chanel_4", "idfile_1.BAS");
        set->setValue("chanel_5", "idfile_1.BAS");
        set->setValue("chanel_6", "idfile_1.BAS");
        set->setValue("chanel_7", "idfile_1.BAS");
        set->setValue("chanel_8", "idfile_1.BAS");
        set->setValue("chanel_9", "idfile_1.BAS");
        set->setValue("sound", "0") ;
        set->endGroup();

        set->beginGroup("Set_autotest");
        set->setValue("Autotest", "0") ;
        set->endGroup();

        set->beginGroup("Set_wifi");
        set->setValue("Name", "123") ;
        set->setValue("Password", "123") ;
        set->endGroup();

}
//读取配置文件
void myHelper::ReadConfig(QStringList *info)
{
    QString fileName = "config.ini";
    //如果配置文件不存在,则以初始值继续运行
    if (!myHelper::FileIsExist(fileName)) {
        //qDebug() << "file not found " <<endl ;
        //对应中文转成正确的编码
       // myApp::AppTitle = myApp::AppTitle.toLatin1();
       // myApp::NVRType = myApp::NVRType.toLatin1();
       // myApp::IPCType = myApp::IPCType.toLatin1();
        return;
    }

    QSettings *set = new QSettings(fileName, QSettings::IniFormat);

    set->beginGroup("Set_test");
    QString S1 = set->value("Startnum").toString();//  .toString();1
    QString S2 = set->value("Numlenth").toString();//.toString();3
    QString S3 = set->value("Samelenth").toString();//  .toString();1
    QString S4 = set->value("Autoprint").toString();//.toString();0
    QString S5 = set->value("Scanbar").toString();//0
    QString S6 = set->value("Keepdays").toString();//
    QString S7 = set->value("Autotest").toString();
    QString S8 =  set->value("Stdtest").toString();    /*7*/
    QString S9 =  set->value("Usegun").toString();    /*8*/
    QString S10 =  set->value("Sampletype").toString();    /*9*/
    QString S11 =  set->value("Jiangeshijian").toString();    /*10*/
    QString S12 =  set->value("Sampletype_2").toString();    /*11*/
    QString S13 =  set->value("gun_count").toString();    /*12*/
    QString S14 =  set->value("NONE14").toString();    /*13*/
    QString S15 =  set->value("NONE15").toString();    /*14*/
    QString S16 =  set->value("NONE16").toString();    /*15*/
    QString S17 =  set->value("NONE17").toString();    /*16*/
    QString S18 =  set->value("NONE18").toString();    /*17*/
    QString S19 =  set->value("NONE19").toString();    /*18*/
    QString S20 =  set->value("NONE20").toString();    /*19*/
    set->endGroup();

    set->beginGroup("Set_lis");
    QString Q1 = set->value("auto_upload").toString();
    QString Q2 = set->value("udp_port").toString();
    QString Q3 = set->value("udp_ip").toString();
    QString Q4 = set->value("uart_buad").toString();
    QString Q5 = set->value("com").toString();
    QString Q6 = set->value("current_upload_way").toString();
    QString Q7 = set->value("language").toString();
    QString Q8 = set->value("local_ip").toString() ;
    QString Q9 = set->value("NONE9").toString() ;
    QString Q10 = set->value("NONE10").toString() ;
    QString Q11 = set->value("NONE11").toString() ;
    QString Q12 = set->value("NONE12").toString() ;
    QString Q13 = set->value("NONE13").toString() ;
    QString Q14 = set->value("NONE14").toString() ;
    QString Q15 = set->value("NONE15").toString() ;
    QString Q16 = set->value("NONE16").toString() ;
    QString Q17 = set->value("NONE17").toString() ;
    QString Q18 = set->value("NONE18").toString() ;
    QString Q19 = set->value("NONE19").toString() ;
    QString Q20 = set->value("NONE20").toString() ;
    set->endGroup();

    set->beginGroup("Set_crp");
    QString J1 = set->value("hscrp").toString();
    set->endGroup();

    set->beginGroup("Set_Project");
    QString P1 = set->value("currentproject").toString();
    set->endGroup();

    set->beginGroup("Set_count");
    QString C0 = set->value("chanel_0").toString() ;
    QString C1 = set->value("chanel_1").toString() ;
    QString C2 = set->value("chanel_2").toString() ;
    QString C3 = set->value("chanel_3").toString() ;
    QString C4 = set->value("chanel_4").toString() ;
    QString C5 = set->value("chanel_5").toString() ;
    QString C6 = set->value("chanel_6").toString() ;
    QString C7 = set->value("chanel_7").toString() ;
    QString C8 = set->value("chanel_8").toString() ;
    QString C9 = set->value("chanel_9").toString() ;
    QString C10 = set->value("sound").toString() ;
    set->endGroup();

    set->beginGroup("Set_autotest");
    QString A1 = set->value("Autotest").toString();//  .toString();
    set->endGroup();

    set->beginGroup("Set_wifi");
    QString W1 = set->value("Name").toString();//  .toString();
    QString W2 = set->value("Password").toString();//  .toString();
    set->endGroup();

    *info << S1 << S2 << S3<< S4<< S5<<S6<<S7 <<S8<<S9<<S10
             << S11 << S12 << S13<< S14<< S15<<S16<<S17 <<S18<<S19<<S20
            << /*[19]*/Q1 << Q2<< Q3<< Q4<< Q5<< Q6 << Q7 << Q8 << Q9 << Q10
            << Q11 << Q12<< Q13<< Q14<< Q15<< Q16 << Q17 << Q18 << Q19 << Q20
            << /*[40]*/J1 << /*[41]*/P1
             << /*[42]*/C0 << C1 << C2 << C3 << C4 << C5 << C6 << C7 << C8 << C9 << C10
             << /*[53]*/A1
             << /*[54]*/ W1 << W2;
    //qDebug() << *info ;
   // qDebug() << S1 << S2 << S3<< S4 ;
    //qDebug() << Q1 << Q2<< Q3<< Q4<< Q5<< Q6 << Q7;
}

//写入配置文件
void myHelper::WriteConfig(QStringList info, QString group)
{
    QString fileName =  "config.ini";
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);

    if(group == "Set_test")
    {
        set->beginGroup("Set_test");
        set->setValue("Startnum", info.at(0));
        set->setValue("Numlenth", info.at(1));
        set->setValue("Samelenth", info.at(2));
        set->setValue("Autoprint", info.at(3));
        set->setValue("Scanbar", info.at(4));
        set->setValue("keepdays",  info.at(5)) ;
        set->setValue("Autotest",  info.at(6)) ;
        set->endGroup();
    }
    else if(group == "Set_lis")
    {
        set->beginGroup("Set_lis");
        set->setValue("auto_upload", info.at(0));
        set->setValue("udp_port", info.at(1));
        set->setValue("udp_ip", info.at(2));
        set->setValue("uart_buad", info.at(3));
        set->setValue("com", info.at(4));
        set->setValue("current_upload_way", info.at(5));
        set->setValue("language", info.at(6));
        set->setValue("local_ip", info.at(7));
        set->endGroup();
    }
    else if(group == "Set_crp")
    {
        set->beginGroup("Set_crp");
        set->setValue("hscrp", info.at(0));
        set->endGroup();
    }
    else if(group == "Set_Project")
    {
        set->beginGroup("Set_Project");
        set->setValue("currentproject", info.at(0));
        set->endGroup();
    }
    else if(group == "Set_count")
    {
        set->beginGroup("Set_count");
        set->setValue("chanel_0", info.at(0));
        set->setValue("chanel_1", info.at(1));
        set->setValue("chanel_2", info.at(2));
        set->setValue("chanel_3", info.at(3));
        set->setValue("chanel_4", info.at(4));
        set->setValue("chanel_5", info.at(5));
        set->setValue("chanel_6", info.at(6));
        set->setValue("chanel_7", info.at(7));
        set->setValue("chanel_8", info.at(8));
        set->setValue("chanel_9", info.at(9));
        set->setValue("sound", info.at(10)) ;
        set->endGroup();
    }
    else if(group == "Set_wifi")
    {
        set->beginGroup("Set_wifi");
        set->setValue("Name", info.at(0));
        set->setValue("Password", info.at(1));
        set->endGroup();
    }
    //system("cp config.ini ./backup/") ;
   // system("cp config.ini ./backup/") ;
}

//读取配置文件
void myHelper::ReadIDfile(QStringList *info)
{
    QString fileName = "Project/num2name.ini";
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);

    set->beginGroup("Set_1");
    QString S1 = set->value("Test1").toString();//  .toString();
    QString S2 = set->value("Test2").toString();//.toString();
    set->endGroup();

    qDebug() << S1 << S2;
}

//读取配置文件
void myHelper::WriteIDProject(QList<PROJECT_ITEM> *info)
{
    system("rm Project/list.ini") ;

    QFile file("Project/list.ini");
    //方式：Append为追加，WriteOnly，ReadOnly
     if (!file.open(QIODevice::ReadWrite|QIODevice::Text)) {
        return ;
    }
    QTextStream out(&file);
    out.seek(0) ;
    int num = info->count() ;

    for(int i=0; i<num; i++)
    {
        qDebug() << info->at(i).prj_name ;
        out<< info->at(i).prj_name + "=" +
                    QString("%1").arg(info->at(i).low) + "@" +
                    QString("%1").arg(info->at(i).up)
                <<endl;
    }
    out.flush();
    file.close();
}
//读取配置文件
void myHelper::ReadIDProject(QList<PROJECT_ITEM> *info)
{
    QString sFilePath = "Project/list.ini";

    QFile file(sFilePath);
    //方式：Append为追加，WriteOnly，ReadOnly
    if (!file.open(QIODevice::ReadWrite|QIODevice::Text)) {
         return ;
    }
    QTextStream in(&file) ;
    info->clear() ;

    while(!in.atEnd())
    {
        QStringList line_list ;
        QString line = in.readLine() ;
        PROJECT_ITEM tmp ;

        line_list = line.split("=") ;
        if(line_list.count() > 0)
            tmp.prj_name = line_list.at(0) ;
        if(line_list.count() > 1)
        {
            QStringList data_list ;
            data_list = line_list.at(1).split("@") ;
            qDebug() << data_list ;
            if(data_list.count() > 1)
            {
                tmp.low = data_list.at(0).toFloat() ;
                tmp.up = data_list.at(1).toFloat() ;
            }
        }
        *info << tmp ;
    }

    file.close();
}

void myHelper::export_asv(QString headr, QString filename, QStringList texts)
{
    //QString headr;

    //headr  = headr + tr("序列号,")  + tr("姓名,") + tr("性别,") + tr("年龄,")+ tr("条码值,") + tr("项目,") + tr("浓度,") + tr("单位,") + tr("时间")+ "\r\n";

    QFile file(filename.toLocal8Bit().constData());
    file.open(QIODevice::WriteOnly );
    QTextStream text_stream(&file);
    text_stream << headr ;
    foreach (QString str, texts) {
             text_stream << str;
    }

    file.flush();
    file.close();
}

void myHelper::export_primary(QString filename, QStringList texts)
{
    QString headr;
    bool f_exit = FileIsExist(filename) ;
    if(!f_exit)
    {
    headr  = headr  + tr("序列号,") + tr("时间,") + "TC,"+ "X1," + "X2," + "X3" +"\r\n";
    }
    QFile file(filename.toLocal8Bit().constData());
    if(f_exit)
         file.open(QIODevice::Append );
    else
        file.open(QIODevice::WriteOnly);
    QTextStream text_stream(&file);
    if(!f_exit)
        text_stream << headr ;
    foreach (QString str, texts) {
             text_stream << str;
    }

    file.flush();
    file.close();
}

void myHelper::format_num(bool same_falg, int format_lenth, int source, QString *format_n)
{
    if(!same_falg)
        *format_n  = QString("%1").arg(source) ;//设置即将要写入的文件名
    else
    {
        int tmp = 1, tmp1=10;
        QString tmp2 ;
        int i = 0 ,j;

        while(tmp!=0 && i<format_lenth)
        {
            tmp = source/tmp1 ;
            tmp1 = tmp1 * 10 ;
            i++ ;
        }
        for(j=0; (format_lenth-i)>j; j++)
        {
            tmp2 += "0" ;
        }
        *format_n  = tmp2 +  QString("%1").arg(source);//tmp
    }
}

void myHelper::delete_record(int days, QDateTime currentday)
{
    if(days > 0)
    {
        //qDebug() << currentday ;
        QString last_day = currentday.addDays(- days).toString("yyyy-MM-dd");
        QStringList spilt_day =  last_day.split("-");
        QString rm_com ;
        int year = spilt_day.at(0).toInt();
        int month = spilt_day.at(1).toInt();
        int day = spilt_day.at(2).toInt() ;
        QString s_month = spilt_day.at(1) ;
        //QString s_day = spilt_day.at(2) ;

        if(month < 10)
            s_month = s_month.remove("0") ;


        //qDebug() <<spilt_day.at(0) << spilt_day.at(1) << spilt_day.at(2) ;
        QDir dir(".") ;
        dir.setFilter(QDir::Dirs );
        dir.setSorting(QDir::DirsFirst);
        QFileInfoList list = dir.entryInfoList() ;
        int year_tmp ;
        bool ok ;
        //delete year
        for(int i=0 ;i < list.size(); i++)
        {

              if((list.at(i).fileName()==".") || (list.at(i).fileName()==".."))
                  continue ;
              year_tmp = list.at(i).fileName().toInt(&ok);
              if((year > year_tmp) && (ok))
              {
                 rm_com.clear();
                 rm_com = rm_com + "rm -r " + list.at(i).absoluteFilePath() ;
                 system(rm_com.toLocal8Bit().constData()) ;
              }
         }
        //delete mon

        dir.setPath(spilt_day.at(0).toLocal8Bit().constData());
        if(dir.exists())
        {
            list.clear();
            list = dir.entryInfoList() ;
            for(int i=0 ;i < list.size(); i++)
            {
                  //qDebug()  << "month: " << list.at(i).fileName() ;
                  if((list.at(i).fileName()==".") || (list.at(i).fileName()==".."))
                      continue ;
                  if(month > list.at(i).fileName().toInt())
                  {
                     rm_com.clear();
                     rm_com = rm_com + "rm -r " + list.at(i).absoluteFilePath() ;
                     system(rm_com.toLocal8Bit().constData()) ;
                  }
             }
            //delete day

            QString day_dir = "./" + spilt_day.at(0) + "/" + s_month ;
           // qDebug()  << day_dir ;
            dir.setPath(day_dir.toLocal8Bit().constData());
            if(dir.exists())
            {
                list.clear();
                list = dir.entryInfoList() ;
                for(int i=0 ;i < list.size(); i++)
                {
                       // qDebug() << "day: " << list.at(i).fileName() ;
                      if((list.at(i).fileName()==".") || (list.at(i).fileName()==".."))
                          continue ;
                      if(day > list.at(i).fileName().toInt())
                      {
                         rm_com.clear();
                         //qDebug() << "deleting...."  ;
                         rm_com = rm_com + "rm -r " + list.at(i).absoluteFilePath() ;
                         system(rm_com.toLocal8Bit().constData()) ;

                      }
                 }
            }
        }
    }
    //qDebug() << "delete:" << last_day << year << month << day;
}

void myHelper::Write_Classifyfile(QString filepath, QString title, QString code, QString value)
{
    QString fileName =  filepath.toLocal8Bit().constData();
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);

    set->beginGroup(title.toLocal8Bit().constData());
    set->setValue(code.toLocal8Bit().constData(), value.toLocal8Bit().constData());
    set->endGroup();

}

void myHelper::Read_Classifyfile(QString filepath, QString title, QString code, QString *value)
{
    QString fileName =  filepath.toLocal8Bit().constData();
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);

    set->beginGroup(title.toLocal8Bit().constData());
    *value = set->value(code.toLocal8Bit().constData()).toString() ;
    set->endGroup();

}

void myHelper::ReadAll_Classifyfile(QString filepath, QString title, QString code, QStringList *value)
{
    QString fileName =  filepath.toLocal8Bit().constData();
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);
    QString tmp ;

    set->beginGroup(title.toLocal8Bit().constData());
    for(int i=1; i<256; i++)
    {
      tmp = set->value(QString("%1").arg(i).toLocal8Bit().constData()).toString() ;
      if(!tmp.isEmpty())
          *value <<(tmp + QString("_%1").arg(i));
    }
    set->endGroup();

}

void myHelper::Read_Ratio(QList<RATIO_ITEM> *info)
{
   /* QString fileName =  "config.ini";
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);


    set->beginGroup("Set_ratio");
    if(Bar.count()>0)
    {
        QString tmp ;
        for(int i=0; i<Bar.count(); i++)
        {
            tmp = Bar.at(i) ;
            *value << Bar.at(i) + "=" +set->value("B" + tmp).toString() ;
        }
    }
    set->endGroup();*/
    QString sFilePath = "Project/ratio.ini";

    QFile file(sFilePath);
    //方式：Append为追加，WriteOnly，ReadOnly
    if (!file.open(QIODevice::ReadWrite|QIODevice::Text)) {
         return ;
    }
    QTextStream in(&file) ;
    info->clear() ;

    while(!in.atEnd())
    {
        QStringList line_list ;
        QString line = in.readLine() ;
        RATIO_ITEM tmp ;

        line_list = line.split("=") ;
        if(line_list.count() > 0)
            tmp.prj_name = line_list.at(0) ;
        if(line_list.count() > 1)
        {
            tmp.str_ratio = line_list.at(1) ;
        }
        *info << tmp ;
    }

    file.close();
}

void myHelper::Write_Ratio(QList<RATIO_ITEM> *info)
{
    /*QString fileName =  "config.ini";
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);

    set->beginGroup("Set_ratio");
    set->setValue("B" + Bar, value);
    set->endGroup();*/
    system("rm Project/ratio.ini") ;

    QFile file("Project/ratio.ini");
    //方式：Append为追加，WriteOnly，ReadOnly
     if (!file.open(QIODevice::ReadWrite|QIODevice::Text)) {
        return ;
    }
    QTextStream out(&file);
    out.seek(0) ;
    int num = info->count() ;

    for(int i=0; i<num; i++)
    {
        qDebug() << info->at(i).prj_name ;
        out<< info->at(i).prj_name + "="
                + info->at(i).str_ratio
                <<endl;
    }
    out.flush();
    file.close();
}

bool myHelper::check_idfile()
{
    QDir *dir=new QDir("Project");
    QStringList filter; //过滤.dat文件
    filter<<"*.BAS";
    dir->setNameFilters(filter);
    QList<QFileInfo> *fileInfo=new QList<QFileInfo>(dir->entryInfoList(filter));
    if(fileInfo->count() <=0)
    {
        return 0 ;
    }
    else
    {
        return 1 ;
    }
}

int myHelper::get_ratio(QString pname, QList <RATIO_ITEM> pro_ratio_list)
{

    int i ;
    for(i=0; i<pro_ratio_list.count(); i++)
    {
        //printf("barlist.at(x) = %s", barlist.at(i).toLocal8Bit().constData()) ;
        qDebug() <<  pname << "--" << pro_ratio_list.at(i).prj_name;
        if(pname == pro_ratio_list.at(i).prj_name)
        {
            break ;
        }
    }
    if(i >= pro_ratio_list.count() )
            i = -1 ;

    return i ;
}

bool myHelper::sort_date(QStringList *sorted_date, QList<QFileInfo> *fileInfo)
{
    QDateTime max_date1, max_date2, max_final ;

    QString max ;
    QString max_1 ;
    QString max_2 ;
    int i=0, j=0 ;
    int row_count = fileInfo->size() ;

    if(row_count > 1)
        for(i=0; i < row_count; i++)
        {
            for(j=0; j+i < row_count-1; j++)
            {
                max = fileInfo->at(j).fileName() ;
                max_1 = max.mid(0, 10) + " " + max.mid(11, 8).replace("-", ":") ;
                 max_date1 = QDateTime::fromString(max_1, "yyyy-MM-dd hh:mm:ss") ;

                max = fileInfo->at(j + 1).fileName() ;
                max_2 = max.mid(0, 10) + " " + max.mid(11, 8).replace("-", ":") ;
                max_date2 = QDateTime::fromString(max_2, "yyyy-MM-dd hh:mm:ss") ;
                max_date1 > max_date2?max_final = max_date1: max_final = max_date2;
            }
            if(i < (row_count-1))
                (*sorted_date) << max_final.toString("yyyy-MM-dd hh:mm:ss") ;
            else
                (*sorted_date) <<  max_date1.toString("yyyy-MM-dd hh:mm:ss") ;
        }
    else if(row_count == 1)
    {
        max = fileInfo->at(i).fileName() ;
        max_1 = max.mid(0, 10) + " " + max.mid(11, 8).replace("-", ":") ;
        (*sorted_date) <<  max_1 ;
    }

    return 1 ;
}

int myHelper::decode_date(QString sort_tmp, QList<QFileInfo> *fileInfo)
{
    int sort_num = 0;
    QString decode_date = sort_tmp.mid(0,10) + "_" + sort_tmp.mid(11, 8).replace(":", "-") + ".dat";

    while( (decode_date != fileInfo->at(sort_num).fileName()) && (sort_num<9999999) )
    {
        sort_num++ ;
    }
    if(sort_num <= 9999999)
        return sort_num;
    else
        return 0 ;
}
void myHelper::read_record(QString low, QString up, QList<QFileInfo> *fileInfo, QStringList *prj_list, QString fliter)
{
    QStringList low_List = low.split("-") ;
    QStringList up_List = up.split("-") ;

    QString tmp ;

    int low_year, low_mon, low_day ;
    int up_year, up_mon, up_day ;

    bool year_more = 0 ;
    bool mon_more = 0 ;
    bool day_more = 0 ;

    bool year_eq = 0 ;
    bool mon_eq = 0 ;
    //bool day_eq = 0 ;

    tmp = low_List.at(0) ;
    low_year = tmp.toInt() ;
    tmp = low_List.at(1) ;
    low_mon = tmp.toInt() ;
    tmp = low_List.at(2) ;
    low_day = tmp.toInt() ;

    tmp = up_List.at(0) ;
    up_year = tmp.toInt() ;
    tmp = up_List.at(1) ;
    up_mon = tmp.toInt() ;
    tmp = up_List.at(2) ;
    up_day = tmp.toInt() ;

    QDir Y_dir(".") ;
    Y_dir.setSorting(QDir::Time) ;
    QFileInfoList yearList = Y_dir.entryInfoList(QDir::Dirs | QDir::NoDotAndDotDot );

    bool Y_ok ;

    for(int i=0 ;i < yearList.size(); i++)
    {
          int year_tmp = yearList.at(i).fileName().toInt(&Y_ok);
             ///qDebug() << yearList.at(i).absoluteFilePath();
          low_year < year_tmp?year_more = 1:year_more = 0 ; //如果年份大于最小值，则全年选中
          up_year  > year_tmp?year_eq   = 1:year_eq     = 0 ; //如果年份小于最大值，则mon&day不用再判断

          if(year_tmp <= up_year)
              if( ((Y_ok) && (low_year == year_tmp)) ||  year_more )//year
              {
                  QDir M_dir( yearList.at(i).fileName() ) ;
                  M_dir.setSorting(QDir::Time) ;
                  QFileInfoList monList = M_dir.entryInfoList(QDir::Dirs | QDir::NoDotAndDotDot);
                  bool M_ok ;

                  for(int i=0 ;i < monList.size(); i++)
                  {
                      int mon_tmp = monList.at(i).fileName().toInt(&M_ok);
                      //qDebug() << monList.at(i).absoluteFilePath();
                      low_mon < mon_tmp?mon_more = 1:mon_more = 0 ; //如果yue份大于最小值，则yue年选中
                      up_mon  > mon_tmp?mon_eq   = 1:mon_eq     = 0 ; //如果mon份小于最大值，则day不用再判断

                      if( (mon_tmp <= up_mon) || year_eq )
                          if( ((M_ok) && (low_mon == mon_tmp))  ||  year_more ||  mon_more )//mon
                          {
                              QDir D_dir( monList.at(i).absoluteFilePath() ) ;
                              D_dir.setSorting(QDir::Time) ;
                              QFileInfoList dayList = D_dir.entryInfoList(QDir::Dirs | QDir::NoDotAndDotDot);
                              bool D_ok ;

                              for(int i=0 ;i < dayList.size(); i++)
                              {
                                  int day_tmp = dayList.at(i).fileName().toInt(&D_ok);
                                  //qDebug() << dayList.at(i).absoluteFilePath();
                                  low_day < day_tmp?day_more = 1:day_more = 0 ;
                                  //up_day  == day_tmp?day_eq   = 1:day_eq     = 0 ;                                                //如果年份小于最大值，则day不用再判断

                                  if( (day_tmp <= up_day) || year_eq || mon_eq )
                                      if( ((D_ok) && (low_day == day_tmp))  ||  year_more ||  mon_more ||  day_more)//day
                                      {
                                          QList<QFileInfo> Info ;
                                          //QList<QFileInfo> tmp_fileInfo ;
                                          int sizeof_info ;

                                          /*1获取文件夹*/
                                          QDir D_dir( dayList.at(i).absoluteFilePath() ) ;
                                          QFileInfoList PrjList = D_dir.entryInfoList(QDir::Dirs | QDir::NoDotAndDotDot);

                                          /*2获取所有文件*/
                                          for(int i=0; i < PrjList.size(); i++)
                                          {
                                              //qDebug() << PrjList.at(i).absoluteFilePath();
                                              if(PrjList.at(i).fileName() == "Debug")
                                                  continue ;



                                              if(fliter != tr("全部"))
                                                  if(fliter != PrjList.at(i).fileName())
                                                      continue ;

                                              QDir Prj_dir(PrjList.at(i).absoluteFilePath()) ;                                                   //存放要读取记录的文件地址
                                              QStringList filter ;                                                                                                //过滤.dat文件

                                              filter<<"*.dat";
                                              Prj_dir.setNameFilters(filter);
                                              Prj_dir.setSorting(QDir::Time) ;
                                              QFileInfoList tmp_file_list ;
                                              tmp_file_list = Prj_dir.entryInfoList(filter) ;

                                              /*是否空目录*/
                                              if(tmp_file_list.count() == 0 )
                                              {
                                                    QString cmd = "rm -r " + PrjList.at(i).absoluteFilePath() ;
                                                    system(cmd.toLocal8Bit().constData()) ;
                                                    continue ;
                                              }

                                              if( !prj_list->contains(PrjList.at(i).fileName()) )
                                                *prj_list << PrjList.at(i).fileName() ;

                                              Info.append(tmp_file_list  ) ;

                                          }
                                          /*3排序*/
                                          sizeof_info = Info.size()  ;

                                          //tmp_fileInfo = Info;
                                          //MergeSort(&Info, &tmp_fileInfo, sizeof_info) ;
                                          MergeSort_2(&Info, sizeof_info) ;
                                          /*4开始存入*/
                                          for(int i=0; i<sizeof_info; i++)
                                          {
                                              *fileInfo << Info.at(sizeof_info - i - 1) ;
                                              //qDebug() << Info.at(i).absoluteFilePath()  ;
                                          }

                                      }//day judge
                              }

                          }//mon judge
                  }
              }//year judge
     }
    /*if(fileInfo->count() < 8)
    {
        int count = fileInfo->count() ;
        if( count > 1)
            for(int i=0; i < count; i++)
            {
                for(int j=i; j < count; j++)
                {
                      if( fileInfo->at(i).created() < fileInfo->at(j).created()  )
                      {

                           fileInfo->swap(i, j) ;

                      }
                }
            }
    }*/
}

void myHelper::read_Debug(QString low, QString up, QList<QFileInfo> *fileInfo)
{
    QStringList low_List = low.split("-") ;
    QStringList up_List = up.split("-") ;

    QString tmp ;

    int low_year, low_mon, low_day ;
    int up_year, up_mon, up_day ;

    bool year_more = 0 ;
    bool mon_more = 0 ;
    bool day_more = 0 ;

    bool year_eq = 0 ;
    bool mon_eq = 0 ;
    //bool day_eq = 0 ;

    tmp = low_List.at(0) ;
    low_year = tmp.toInt() ;
    tmp = low_List.at(1) ;
    low_mon = tmp.toInt() ;
    tmp = low_List.at(2) ;
    low_day = tmp.toInt() ;

    tmp = up_List.at(0) ;
    up_year = tmp.toInt() ;
    tmp = up_List.at(1) ;
    up_mon = tmp.toInt() ;
    tmp = up_List.at(2) ;
    up_day = tmp.toInt() ;

    QDir Y_dir(".") ;
    Y_dir.setSorting(QDir::Time) ;
    QFileInfoList yearList = Y_dir.entryInfoList(QDir::Dirs | QDir::NoDotAndDotDot);
    bool Y_ok ;
    //qDebug() << low_year << low_mon << low_day ;
    //qDebug() << up_year << up_mon << up_day ;
    for(int i=0 ;i < yearList.size(); i++)
    {
          int year_tmp = yearList.at(i).fileName().toInt(&Y_ok);
             //qDebug() << yearList.at(i).absoluteFilePath();
          low_year < year_tmp?year_more = 1:year_more = 0 ; //如果年份大于最小值，则全年选中
          up_year  > year_tmp?year_eq   = 1:year_eq     = 0 ; //如果年份小于最大值，则mon&day不用再判断

          if(year_tmp <= up_year)
              if( ((Y_ok) && (low_year == year_tmp)) ||  year_more )//year
              {
                  QDir M_dir( yearList.at(i).fileName() ) ;
                  M_dir.setSorting(QDir::Time) ;
                  QFileInfoList monList = M_dir.entryInfoList(QDir::Dirs | QDir::NoDotAndDotDot);
                  bool M_ok ;

                  for(int i=0 ;i < monList.size(); i++)
                  {
                      int mon_tmp = monList.at(i).fileName().toInt(&M_ok);
                     // qDebug() << monList.at(i).absoluteFilePath();
                      low_mon < mon_tmp?mon_more = 1:mon_more = 0 ; //如果yue份大于最小值，则yue年选中
                      up_mon  > mon_tmp?mon_eq   = 1:mon_eq     = 0 ; //如果mon份小于最大值，则day不用再判断

                      if( (mon_tmp <= up_mon) || year_eq )
                          if( ((M_ok) && (low_mon == mon_tmp))  ||  year_more ||  mon_more )//mon
                          {
                              QDir D_dir( monList.at(i).absoluteFilePath() ) ;
                              D_dir.setSorting(QDir::Time) ;
                              QFileInfoList dayList = D_dir.entryInfoList(QDir::Dirs | QDir::NoDotAndDotDot);
                              bool D_ok ;

                              for(int i=0 ;i < dayList.size(); i++)
                              {
                                  int day_tmp = dayList.at(i).fileName().toInt(&D_ok);
                                 // qDebug() << dayList.at(i).absoluteFilePath();
                                  low_day < day_tmp?day_more = 1:day_more = 0 ;
                                  //up_day  == day_tmp?day_eq   = 1:day_eq     = 0 ; //如果年份小于最大值，则day不用再判断

                                  if( (day_tmp <= up_day) || year_eq || mon_eq )
                                      if( ((D_ok) && (low_day == day_tmp))  ||  year_more ||  mon_more ||  day_more)//day
                                      {
                                          QDir D_dir(dayList.at(i).absoluteFilePath() + "/Debug");//存放要读取记录的文件地址
                                          D_dir.setSorting(QDir::Time) ;
                                          QStringList filter; //过滤.dat文件

                                          filter<<"*.dat";
                                          D_dir.setNameFilters(filter);
                                          QList<QFileInfo> Info(D_dir.entryInfoList(filter));

                                          for(int i=0; i<Info.size(); i++)
                                          {
                                              *fileInfo << Info.at(i) ;
                                              //qDebug() << Info.at(i).absoluteFilePath()  ;
                                          }
                                      }//day judge
                              }

                          }//mon judge
                  }
              }//year judge
     }



}


bool myHelper::mystring2hex(QString sc, unsigned char *det)
{
    const char *tmp = sc.toAscii().constData() ;
    char ttmp = tmp[0];
   // printf("sssssss   %s ,%x\n" ,tmp, ttmp) ;
    if( (ttmp >= '0') && (ttmp <= '9'))
    {
        //printf(" %d\n" , int(ttmp)-'0' ) ;
        *det = (ttmp)-'0' ;
    }
    else if((ttmp >= 'a') && (ttmp <= 'z'))
    {
         //printf(" %d\n" , int(ttmp)-'a' ) ;
        *det = (ttmp)-'a' ;
    }
    else if((ttmp >= 'A') && (ttmp <= 'Z'))
    {
         //printf(" %d\n" , int(ttmp)-'A' ) ;
        *det = (ttmp)-'A' ;
    }

    return 1 ;
}

//将r[i…m]和r[m +1 …n]归并到辅助数组rf[i…n]归并的迭代算法
void myHelper::Merge(QList<QFileInfo> *r,QList<QFileInfo> *rf, int i, int m, int n)
{
    int j,k;
    for(j=m+1,k=i; i<=m && j <=n ; ++k)
    {
        if(r->at(j).created() < r->at(i).created() )//if(r[j] < r[i])
            rf->replace(k, r->at(j++) ) ;//rf[k] = r[j++];
        else
            rf->replace(k, r->at(i++) ) ;//rf[k] = r[i++];
    }
    while(i <= m)  rf->replace(k++, r->at(i++) );//rf[k++] = r[i++];
    while(j <= n)  rf->replace(k++, r->at(j++) );//rf[k++] = r[j++];
}

void myHelper::MergeSort(QList<QFileInfo> *r, QList<QFileInfo> *rf, int lenght)
{
    int len = 1;
    QList<QFileInfo> *q = r ;
    QList<QFileInfo> *tmp ;
    while(len < lenght)
    {
        int s = len;
        len = 2 * s ;
        int i = 0;
        while(i+ len <lenght)
        {
            Merge(q, rf,  i, i+ s-1, i+ len-1 );                        //对等长的两个子表合并
            i = i+ len;
        }
        if(i + s < lenght)
        {
            Merge(q, rf,  i, i+ s -1, lenght -1);                     //对不等长的两个子表合并
        }
        tmp = q;
        q = rf;
        rf = tmp;                                       //交换q,rf，以保证下一趟归并时，仍从q 归并到rf
    }
}

void myHelper::MergeSort_2(QList<QFileInfo> *k,int n)
{
        int i,next,left_min,left_max,right_min,right_max;
        //开辟一个与原来数组一样大小的空间用来存储用
        QList<QFileInfo> temp ;//*temp = (int *)malloc(n * sizeof(int));
        int num = k->count() ;
        for(int i=0; i<num; i++)
            temp << k->at(i) ;

        //逐级上升，第一次比较2个，第二次比较4个，第三次比较8个。。。
        for(i=1; i<n; i*=2)
        {
                //每次都从0开始，数组的头元素开始
                for(left_min=0; left_min<n-i; left_min = right_max)
                {
                        right_min = left_max = left_min + i;
                        right_max = left_max + i;
                        //右边的下标最大值只能为n
                        if(right_max>n)
                        {
                                right_max = n;
                        }
                        //next是用来标志temp数组下标的，由于每次数据都有返回到K，
                        //故每次开始得重新置零
                        next = 0;
                        //如果左边的数据还没达到分割线且右边的数组没到达分割线，开始循环
                        while(left_min<left_max&&right_min<right_max)
                        {
                                if(k->at(left_min).created() < k->at(right_min).created() )//(k[left_min] < k[right_min])
                                {
                                       temp.replace(next++, k->at( left_min++) ) ; //temp[next++] = k[left_min++];
                                }
                                else
                                {
                                       temp.replace(next++, k->at( right_min++) ) ;  //temp[next++] = k[right_min++];
                                }
                        }
                        //上面循环结束的条件有两个，如果是左边的游标尚未到达，那么需要把
                        //数组接回去，可能会有疑问，那如果右边的没到达呢，其实模拟一下就可以
                        //知道，如果右边没到达，那么说明右边的数据比较大，这时也就不用移动位置了

                        while(left_min < left_max)
                        {
                                //如果left_min小于left_max，说明现在左边的数据比较大
                                //直接把它们接到数组的min之前就行
                                k->replace(--right_min, k->at(--left_max) ) ;  //k[--right_min] = k[--left_max];
                        }
                        while(next>0)
                        {
                                //把排好序的那部分数组返回该k
                                k->replace(--right_min, temp.at(--next) ) ;  //k[--right_min] = temp[--next];
                            }
                }
        }
}


void myHelper::read_system_config(SYSTEM_CONFIG *cfg)
{
    QString fileName =  "sys_config.ini";
    QSettings *set = new QSettings(fileName, QSettings::IniFormat);


    set->beginGroup("SYSTEM");
    cfg->card_type = set->value("card_type").toInt() ;
    cfg->use_wifi = set->value("use_wifi").toBool() ;
    cfg->machine = set->value("machine").toString() ;
    cfg->version = set->value("version").toString() ;
    cfg->warning = set->value("warning").toInt() ;
    cfg->use_piliangceshi = set->value("use_piliangceshi").toInt() ;
    set->endGroup();

}

int myHelper::write_lost_found(QString file_n, char prj[32], int time, char code[24], QList<LOST_FOUND> *det, uchar act, int whereis)
{
    QFile file(file_n);

    QString date = QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss");
    int file_size = sizeof(LOST_FOUND) ;
/*
    char head[5] ;
    char item_name[32] ;
    char code[24] ;
    char datetime[22] ;
    int count_time ;
    char nouse[37] ;
    char end[4] ;*/
    if(act == 1)                                                                     //添加
    {
        //方式：Append为追加，WriteOnly，ReadOnly
         if (!file.open(QIODevice::ReadWrite | QIODevice::Append)) {
            return -1;
        }
        //out.seek(0) ;

        //qDebug() << prj ;
        LOST_FOUND tmp ;
        char stream[file_size] ;
        bzero(stream, file_size) ;
        strcpy(tmp.head, "head") ;
        memcpy(tmp.item_name, prj, 32) ;
        memcpy(tmp.code, code, 24) ;
        memcpy(tmp.datetime, date.toLocal8Bit().constData(), date.toLocal8Bit().length() + 1) ;
        tmp.state = 0 ;
        tmp.count_time = time ;
        strcpy(tmp.end, "end") ;
        *det << tmp ;
        memcpy(stream, &tmp, file_size) ;

        if( file.write(stream, file_size) < 0)
        {
             qDebug() <<  "write failed!" ;
        }

    }
    else if(act == 2)                                                                            //删除
    {
        QString cmd = "rm " + file_n;
        system(cmd.toLocal8Bit().constData()) ;
        cmd = "touch " + file_n;
        system(cmd.toLocal8Bit().constData()) ;
        //方式：Append为追加，WriteOnly，ReadOnly
         if (!file.open(QIODevice::ReadWrite)) {
            return -1;
        }
        file.seek(0) ;
         det->removeAt(whereis) ;

         for(int i=0; i<det->count();i++)
         {
             LOST_FOUND tmp = det->at(i);
             char stream[file_size] ;
             bzero(stream, file_size) ;
             memcpy(stream, &tmp, file_size) ;
             if( file.write(stream, file_size) < 0)
             {
                  qDebug() <<  "write failed!" ;
                  file.close() ;
                  QString str = "rm " + file_n ;
                  system(str.toLocal8Bit().constData()) ;
                  return -1;
             }
         }
    }
    else if(act ==3 )
    {
        QString cmd = "rm " + file_n;
        system(cmd.toLocal8Bit().constData()) ;
        cmd = "touch " + file_n;
        system(cmd.toLocal8Bit().constData()) ;
        if (!file.open(QIODevice::ReadWrite)) {
           return -1;
       }
       file.seek(0) ;

        for(int i=0; i<det->count();i++)
        {
            LOST_FOUND tmp = det->at(i);
            char stream[file_size] ;
            bzero(stream, file_size) ;
            memcpy(stream, &tmp, file_size) ;
            if( file.write(stream, file_size) < 0)
            {
                 qDebug() <<  "write failed!" ;
                 file.close() ;
                 QString str = "rm " + file_n ;
                 system(str.toLocal8Bit().constData()) ;
                 return -1;
            }
        }
    }
    else if(act == 4)                                                                            //修改状态
    {
        QString cmd = "rm " + file_n;
        system(cmd.toLocal8Bit().constData()) ;
        cmd = "touch " + file_n;
        system(cmd.toLocal8Bit().constData()) ;
        //方式：Append为追加，WriteOnly，ReadOnly
         if (!file.open(QIODevice::ReadWrite)) {
            return -1;
        }
        file.seek(0) ;
        LOST_FOUND tmp ;
         tmp = det->at(whereis) ;
        tmp.state = 1 ;
        memcpy(tmp.datetime, date.toLocal8Bit().constData(), date.toLocal8Bit().length() + 1) ;
        det->replace(whereis, tmp) ;
         for(int i=0; i<det->count();i++)
         {
             LOST_FOUND tmp = det->at(i);
             char stream[file_size] ;
             bzero(stream, file_size) ;
             memcpy(stream, &tmp, file_size) ;
             if( file.write(stream, file_size) < 0)
             {
                  qDebug() <<  "write failed!" ;
                  file.close() ;
                  QString str = "rm " + file_n ;
                  system(str.toLocal8Bit().constData()) ;
                  return -1;
             }
         }
    }

    file.flush() ;
    file.close() ;
    return 0 ;
}
int myHelper::read_lost_found(QString file_c, QString file_n,QList<LOST_FOUND> *det)
{
    QFile file_1(file_c);
    QFile file_2(file_n);
    if(!file_1.exists())
        return -1 ;
    else
        file_1.close() ;

    if(!file_2.exists())
        return -1 ;

    QString count_str ;
    int count = 0 ;
    read_config_sig(file_c, "ListCount", "count", &count_str) ;
    count = count_str.toUInt() ;
    if(count < 1)
    {
        QString cmd = "rm " + file_n ;
        system(cmd.toLocal8Bit().constData()) ;
        return -1 ;
    }
    int file_size = sizeof(LOST_FOUND) ;
    if (!file_2.open(QIODevice::ReadWrite )) {
       return -1;
   }
    for(int i=0; i<count; i++)
    {
        LOST_FOUND tmp ;
        char buf[file_size] ;
        bzero(buf, file_size) ;
        if( file_2.read(buf,file_size ) < file_size)
            return -1 ;
        memcpy(&tmp, buf, file_size) ;
        *det << tmp ;
    }

    return 0 ;
}
