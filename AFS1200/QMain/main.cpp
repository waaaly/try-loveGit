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

    //���ñ���
    myHelper::SetGBK2312Code() ;

    QApplication a(argc, argv);
    QBrush bush1 ;
    QPixmap pix("set_up.bmp") ;
    bush1.setTexture ( pix ) ;

    QWSServer::setBackground(bush1) ;


    //������ɫ����
    myHelper::SetStyle("blue");
    //�����ֺ�
    QFont font  = a .font();
     font.setPointSize(14);
     a.setFont(font);

/*��ʱ����һ�뵹��ʱ��������ʾϵͳʱ��*/
     QTimer systimer ;
     systimer.setInterval(1000);
     systimer.start() ;

    First_form *first_form  = new First_form();
    first_form->show();

    ErrorDialog *msg = new ErrorDialog;
    msg->SetMessage("����������", 2);


    QObject::connect(first_form->his_prg_view, SIGNAL(errinfo(QString)), msg, SLOT(get_error_info(QString))) ;
    QObject::connect(first_form, SIGNAL(info2error_dialog(QString)), msg, SLOT(get_error_info(QString))) ;
    QObject::connect(first_form->serial_thead, SIGNAL(thread_signal(int,unsigned int)), first_form, SLOT(get_datas_event(int,unsigned int)));//�����̷߳�����������
    //���ӵ���ʱ�ۣ���ʱ�������Ϊ
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

    first_form->serial_thead->start();//���������߳�


    int ret = a.exec();

    delete first_form;
    delete msg;

    return ret;
}
