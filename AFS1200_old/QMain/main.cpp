#include <QApplication>
#include <QTextCodec>
#include <QDebug>
#include <QChar>
#include <QTimer>
#include "first_form.h"
#include "app/myhelper.h"
#include "app/mythread.h"
#include "app/timer_thread.h"
#include "WIFI/wifi_thread.h"
#include "app/errordialog.h"
#include "password.h"



int main(int argc, char *argv[])
{

    //QWSServer::setCursorVisible(false);
    QApplication a(argc, argv);
    QBrush bush1 ;
    QPixmap pix("set_up.bmp") ;
    bush1.setTexture ( pix ) ;
    //bush1.setStyle(Qt::SolidPattern) ;
    QWSServer::setBackground(bush1) ;

/*UI初始化*/

    //设置编码
    myHelper::SetGBK2312Code() ;

    //myHelper::SetUTF8Code() ;
    //myHelper::SetChinese() ;
    //设置字体
   // qApp->setFont(QFont("wenquanyi",20,QFont::Normal));

    //去除鼠标
  //  QApplication::setOverrideCursor(Qt::BlankCursor);
    //设置蓝色主题
    myHelper::SetStyle("blue");
    //设置字号
    QFont font  = a .font();
     font.setPointSize(16);
     a.setFont(font);

/*定时器，一秒倒计时，用于显示系统时间*/
     QTimer systimer ;
     systimer.setInterval(1000);
     systimer.start() ;


/*启动UI*/

     Mythread serial_thead;//开启一个线程用于串口传输
     serial_thead.start();

     Wifithread wifi_thread ;
     wifi_thread.start() ;

    First_form first_form ;
    first_form.show();

    ErrorDialog *msg = new ErrorDialog;
    msg->SetMessage("这是主界面",2);

    QObject::connect(&serial_thead, SIGNAL(info2error_dialog(QString)), msg, SLOT(get_error_info(QString))) ;
    QObject::connect(&first_form, SIGNAL(info2error_dialog(QString)), msg, SLOT(get_error_info(QString))) ;

    QObject::connect(&serial_thead, SIGNAL(thread_signal(int)), &first_form, SLOT(get_datas_event(int)));//串口线程反馈给主界面
    //连接倒计时槽，计时满后的作为
    QObject::connect(&systimer, SIGNAL(timeout()), &first_form, SLOT(time_out_solt()));

    //wifi thread
     QObject::connect(&wifi_thread, SIGNAL(thread_signal(int)), &first_form, SLOT(get_datas_event(int)));//串口线程反馈给主界面
    //QObject::connect(&wifi_thread, SIGNAL( wifi_state(int)), &first_form, SLOT(get_wifi_state(int)));


    return a.exec();
}
