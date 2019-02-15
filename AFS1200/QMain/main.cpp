#include <QApplication>
#include <QTextCodec>
#include <QDebug>
#include <QChar>
#include <QTimer>
#include "first_form.h"
#include "app/myhelper.h"
#include "app/mythread.h"
#include "app/errordialog.h"
#include "password.h"
#include <stdio.h>


int main(int argc, char *argv[])
{
    ::setvbuf(stdout,NULL,_IONBF,0);

    //设置编码
    myHelper::SetGBK2312Code() ;

    QApplication a(argc, argv);
    QBrush bush1 ;
    QPixmap pix("set_up.bmp") ;
    bush1.setTexture ( pix ) ;

    QWSServer::setBackground(bush1) ;


    //设置蓝色主题
    myHelper::SetStyle("blue");
    //设置字号
    QFont font  = a .font();
     font.setPointSize(14);
     a.setFont(font);

/*定时器，一秒倒计时，用于显示系统时间*/
     QTimer systimer ;
     systimer.setInterval(1000);
     systimer.start() ;

    First_form *first_form  = new First_form();
    first_form->show();

    ErrorDialog *msg = new ErrorDialog;
    msg->SetMessage("这是主界面", 2);


    QObject::connect(first_form->his_prg_view, SIGNAL(errinfo(QString)), msg, SLOT(get_error_info(QString))) ;
    QObject::connect(first_form, SIGNAL(info2error_dialog(QString)), msg, SLOT(get_error_info(QString))) ;
    QObject::connect(first_form->serial_thead, SIGNAL(thread_signal(int,unsigned int)), first_form, SLOT(get_datas_event(int,unsigned int)));//串口线程反馈给主界面
    //连接倒计时槽，计时满后的作为
    QObject::connect(&systimer, SIGNAL(timeout()), first_form, SLOT(time_out_solt()));
    QObject::connect(first_form, SIGNAL(update_ui_password()), msg, SLOT(update_ui())) ;


    QStringList filter_list;
    filter_list << "Button" << "CheckBox" << "TabBar";

    Beep_Dri::Get_Beep()->regedit_wid(first_form,                    filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(msg,                    filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->prj_form,         filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->curve_form,  filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->detail_form,        filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->history_edit_form,        filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->number_form,           filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->select_date,         filter_list);
    Beep_Dri::Get_Beep()->regedit_wid( first_form->muti_card_set,           filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->errordialog,                            filter_list);
    Beep_Dri::Get_Beep()->regedit_wid(first_form->reg_form ,               filter_list);

    first_form->serial_thead->start();//启动串口线程


    int ret = a.exec();

    delete first_form;
    delete msg;

    return ret;
}
