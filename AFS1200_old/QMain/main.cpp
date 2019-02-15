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

/*UI��ʼ��*/

    //���ñ���
    myHelper::SetGBK2312Code() ;

    //myHelper::SetUTF8Code() ;
    //myHelper::SetChinese() ;
    //��������
   // qApp->setFont(QFont("wenquanyi",20,QFont::Normal));

    //ȥ�����
  //  QApplication::setOverrideCursor(Qt::BlankCursor);
    //������ɫ����
    myHelper::SetStyle("blue");
    //�����ֺ�
    QFont font  = a .font();
     font.setPointSize(16);
     a.setFont(font);

/*��ʱ����һ�뵹��ʱ��������ʾϵͳʱ��*/
     QTimer systimer ;
     systimer.setInterval(1000);
     systimer.start() ;


/*����UI*/

     Mythread serial_thead;//����һ���߳����ڴ��ڴ���
     serial_thead.start();

     Wifithread wifi_thread ;
     wifi_thread.start() ;

    First_form first_form ;
    first_form.show();

    ErrorDialog *msg = new ErrorDialog;
    msg->SetMessage("����������",2);

    QObject::connect(&serial_thead, SIGNAL(info2error_dialog(QString)), msg, SLOT(get_error_info(QString))) ;
    QObject::connect(&first_form, SIGNAL(info2error_dialog(QString)), msg, SLOT(get_error_info(QString))) ;

    QObject::connect(&serial_thead, SIGNAL(thread_signal(int)), &first_form, SLOT(get_datas_event(int)));//�����̷߳�����������
    //���ӵ���ʱ�ۣ���ʱ�������Ϊ
    QObject::connect(&systimer, SIGNAL(timeout()), &first_form, SLOT(time_out_solt()));

    //wifi thread
     QObject::connect(&wifi_thread, SIGNAL(thread_signal(int)), &first_form, SLOT(get_datas_event(int)));//�����̷߳�����������
    //QObject::connect(&wifi_thread, SIGNAL( wifi_state(int)), &first_form, SLOT(get_wifi_state(int)));


    return a.exec();
}
