#include <QList>
#include <QPushButton>
#include <QMouseEvent>
#include <QPixmap>
#include <QString>
#include <QDebug>
#include <QTime>
#include <QDateTime>
#include <QTimer>
#include <QDir>
#include <QSettings>
#include <QAbstractItemView>
#include <QScrollBar>
#include <QVector>
#include <QDateTime>
#include <QElapsedTimer>
#include <QHeaderView>
#include <QStringList>

#include "first_form.h"
#include "ui_first_form.h"
#include "app/iconhelper.h"
#include "app/myhelper.h"
#include "app/frmmessagebox.h"
#include "funcset/debug.h"
/*thread*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <limits.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>
#include <sys/statfs.h>
#include <sys/vfs.h>
#include <QFile>
/*udp*/

#include <sys/un.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

#include "Algorithm/GetConc.h"

#include "encode/MD5.h"

#include "curve/qcustomplot.h"
#include </opt/Qt4.7/include/QtGui/QTableWidget>
#include </opt/Qt4.7/include/QtGui/QTableWidgetItem>
#include </opt/Qt4.7/include/QtCore/QList>
#include </opt/Qt4.7/include/QtCore/QSettings>
#include "funcset/itemmanager.h"
#include "funcset/funcset.h"

/*********************************
*��־ϵͳ
/ *********************************
*��������
/ *********************************
*���Բ���
/ *********************************
*��ʱ��
/ *********************************
*���˵�������л���
/ *********************************
*�ʿ�
/ *********************************
*���ò˵�����&ϵͳ����
/ *********************************
*��ʷ�������
/ *********************************
*���Խ������
*/

#define BUFFER_SIZE PIPE_BUF                                //fifo���������ֵ4K

#define COUNTER_CHANEL 10                                  //��ʱ����ͨ��
#define WORNING_TIME 11                                   //��ʱ����ʱ�������

#define LOCK_TIME 10                                      //����Ƭ��ͨѶ�ļ��ʱ��
#define LONG_LOCK_TIME 20                                 //����Ƭ��ͨѶ�ļ��ʱ��

#define PAGE_DATA_NUMS 5                                   //��ʷ����һҳ������
#define MAX_INFOS 3000                                    //����ܲ鿴�ļ�¼


#define INIT_TIME 8                                         //ϵͳ��ʼ���ĵȴ�ʱ��

#define PAGE_DIARY_COUNT 8


#define EXPORT_PAT "/media"                               //modify20180508



unsigned int package[BUFFER_SIZE];                          //���մ����ݰ�
unsigned char idfile_buffer[BUFFER_SIZE] ;

QString card_value;                               //���տ���ֵ


POCT_ITEM tmp_item ;

unsigned char AREA_CODE ;
//unsigned char MD5_AREA ;

//2018-10-22


// ��ͨ�����µ�ǰ���Ե�ͨ�� 0-4
// �ñ�����ȫ�ֵģ��ڶ�ʱ������ʱ�����Ƿ�æ��ǣ��������ݷ���ʱ��ͨ���������������ͨ��������·����λ�ο���
int wait_for_test_cur_num;
int wait_for_test_cur_model;//0�ǵ�ͨ����5��������,��Э�鲻һ��  2018-10-21

/**
      �Զ�����ʱ�Ƿ�����һ���Զ����Թ����У��������ο�״̬̽���ź����Զ�һ����������̽��
    ԭҲ��̽����ظ����ƣ�ȫ�ֱ�־����ֻ���ݴ����ң��޸����Ѿ���׼�ˣ����½���һ����
     ���ﲻ�ع��û��ƣ�ֻ�ǵ���һ���־���ñ���ڷ���COM13�ź�ǰ��timerEvent�¼��У����쳣�жϲ�������ɲ�������COM11�źŷ����и���
    �粻��ñ�־�����½�����Ԥ�ϵ��ط�COM13ָ�һ����ͨ���п����ط��������������ѭ��һֱ�ظ�������ȥ������ȡ���Զ���ر��˵�Դ
**/
static int auto_ok_flag;


#ifndef ARRAYSIZE
#define ARRAYSIZE(arr) (int(sizeof (arr) / sizeof (*arr)))
#endif


// ��ʼ������ʱ�䣬���timeָ��Ϊ�գ�ʹ�ó�Աȫ�ֵ�ǰ��Ŀ����ָ��
int First_form::InitHatchTime(int time)
{
    int Htime[5] = { -1, -1, -1 ,-1, -1};

    int subcount = qMin(qMin(int (ARRAYSIZE(poct_item.SIs)), int (wait_for_test_cur_model)), int (poct_item.ItemCount));


    // ��ͨ��
    if (wait_for_test_cur_model == 0)
    {
        // ��Ӧ����Ӧ��ͨ���ţ�ͨ���ţ�1-5����ʱ�����0-4��
        if (time)
        {
            Htime[0] = time;
        }
        else
        {
            Htime[0] = poct_item.HatchTime;
        }
    }
    else for (int x = 0; x < subcount; x++)
    {
        // ������������Ŀ
        if (poct_item.SIs[x].siChannel <= 0)
        {
            continue;
        }

        // ��Ӧ����Ӧ��ͨ���ţ�ͨ���ţ�1-5����ʱ�����0-4��
        if (time)
        {
            Htime[x] = time;
        }
        else if (poct_item.SIs[x].SubHatch)
        {
            Htime[x] = poct_item.SIs[x].SubHatch;
        }
        else
        {
            Htime[x] = poct_item.HatchTime;
        }
    }

    int count = 0;
    // ��ʽ��ʼ��
    for (unsigned int x = 0; x < ARRAYSIZE(test_task); x++)
    {

        test_task[x].wait_for_test = test_task[x].wait_for_test_old = Htime[x];
        test_task[x].subResult.clear();
        if (Htime[x] > -1)
        {
            count++;
        }
    }
    return count;
}


/*��ʼ������

*2,��ʾ��ʼ��������
*3,��ʼ������,��ʵ���ڵȴ�mythread���̶߳�ȡ�װ���Ϣ
*     3.1�ʿ�ϵ��
*     3.2���ڳ���
*     3.3ע����Ϣ
*
*/

First_form::First_form(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::First_form)
{
    ui->setupUi(this);

     serial_thead        = new Mythread();


    prj_form                   = new Prj_parameter();
    curve_form              = new Showcurve();
    detail_form              = new Detail_from();
    history_edit_form    = new History_edit();
    number_form          = new Number_board();
    select_date               = new Select_date();
    muti_card_set          = new Multi_card_set();
    his_prg_view            = new his_prj_view_frm();
    errordialog              = new ErrorDialog();

    // ��ǰ��ʼ����ǰ����ͨ��Ϊ-1
    wait_for_test_cur_num = -1;

    {
        QString val;
        myHelper::read_config_sig("config.ini", "AFS1200", "TestMode", &val) ;
        if (val.isEmpty())
            wait_for_test_cur_model = 0;//2018-10-22  (5)
        else
            wait_for_test_cur_model = val.toUInt() % 6;
    }
    InitHatchTime(-1);
    auto_ok_flag = 0;

    arr[0][0] = ui->ret_00;
    arr[0][1] = ui->ret_01;
    arr[1][0] = ui->ret_10;
    arr[1][1] = ui->ret_11;
    arr[2][0] = ui->ret_20;
    arr[2][1] = ui->ret_21;
    arr[3][0] = ui->ret_30;
    arr[3][1] = ui->ret_31;
    arr[4][0] = ui->ret_40;
    arr[4][1] = ui->ret_41;


    for (int x = 0; x < 5; x++)
    {
        arr[x][0]->setVisible(0);
        arr[x][1]->setVisible(0);
    }


    //������
   translator = new QTranslator(qApp);

   connect(itemMat, SIGNAL(itemListUpdate()), SLOT(item_update()));



    myHelper::CheckConfig("config.ini") ;
/**/
    init_tmp = 9 ;
/*UI��ʼ��*/
    ui_init() ;
/*���ò���*/
    load_settingfile() ;                                                            //���������ļ�
    setting_init() ;                                                                    //��ʼ������


//��ʱ����GPIO��ʼ��
    timer_init() ;

//������ID��Ŀ������ʾ��������
    item_update();


/*��ȡID�ļ�����ת��Ϊ��Ŀ����*/
    load_set_project(itemMat->getCur_info());
    if( initial_dir() < 0)
    {

    }


/*delete record*/
    myHelper::delete_record(ui->spinBox_keeptime->value(), QDateTime::currentDateTime()) ;

/*��ʷ��ػ��������ĳ�ʼ��*/
    history_form_init();

/*����*/
    history_tablewidget_init();


/*���ø��ؼ�����*/
    font_init();


/*���Խ���*/
    test_ui_init() ;
/*���Խ���*/
    debug_ui_init() ;

//
    if(set_lis.language)
        on_change_languagepushButton_english_clicked() ;
    else
        on_change_languagepushButton_clicked() ;

    init_tmp = 1 ;



    ui->lineEdit_next_num_2->setFocus() ;
    ui->lineEdit_std_print_declar_2->clearFocus() ;
/*  2018/09/03  ��ʾ�����ַ��޷���ɹ��ʻ�ת����������������Ӣ��־ */
this->isEN =myHelper::read_config_sig(CONFIG_INI,
                                            "Set_lis",
                                            "language").toInt() ;

    // *******
    uploadInterface.multi_card_list = &multi_card_list;
}



/*�������ʼ��*/
void First_form::ui_init()
{
    this->setWindowFlags(Qt::FramelessWindowHint );                              //��Ҫ�˵����ͱ����

    /*ϵͳ����*/
    myHelper::read_system_config(&system_config) ;



    /*3�����ͺ�*/
    QFont font  =  ui->label_91->font();
    font.setPointSize(20);
    ui->label_91->setText(system_config.machine) ;
    ui->label_91->setFont(font) ;
    /*4�����汾*/
    font  =  ui->label_93->font() ;
    font.setPointSize(16);
    ui->label_93->setText(system_config.version[0] + (system_config.hasBuild? myHelper::GetBuildTime():QString())) ;
    ui->label_93->setFont(font) ;



    /*���ý���logo*/
    QPixmap qpix ;
    if(!qpix.load("logo.png") )
    {
        qDebug() <<__LINE__ <<__FUNCTION__<<"load logo falust!";
    }
    qpix = qpix.scaled(ui->label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
//     ui->label->setScaledContents(true);
    ui->label->setPixmap(qpix);

    font = ui->LCD_DATE->font() ;
    QPalette pe;
    pe.setColor(QPalette::WindowText,Qt::white);

    font.setPointSize(26) ;
    ui->LCD_DATE->setFont(font) ;
    ui->LCD_TIME->setFont(font) ;
    ui->LCD_DATE->setPalette(pe);
    ui->LCD_TIME->setPalette(pe);

    //
    ui->stackedWidget->setCurrentIndex(6) ;                                             //��ʼ���ȴ�����

    ui->main_Button->setVisible(0) ;

    //��������Ŀѡ��radio��ť�����Ӧ�Ĳ�
    foreach (QRadioButton * radio_btn, ui->page_35->findChildren<QRadioButton *>()) {
        connect(radio_btn, SIGNAL(clicked()), this, SLOT(radio_buttonClick()));
    }

    /*������*/
      QWSInputMethod *im = new SyszuxIM;
     QWSServer::setCurrentInputMethod(im) ;
      im->updateHandler(QWSInputMethod::FocusIn);
      im->updateHandler(QWSInputMethod::FocusOut);

      connect(im, SIGNAL(call_4_num_keyboard(QLineEdit *)), this, SLOT(numkeyboard_slot(QLineEdit *))) ;  //QLineEdit *

    /*ע�����*/
     reg_form = new Register ;
     connect(reg_form, SIGNAL(input_signal()), this, SLOT(register_form())) ;
     connect(this, SIGNAL(already_register()), reg_form, SLOT(show_button())) ;
    //ui->label_23->hide();
     connect(this, SIGNAL(chage_language(int)), this, SLOT(change_language_slot(int))) ;
     //

     QObject::connect(this, SIGNAL(update_ui_register()), reg_form, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_detial_form()), detail_form, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_history_edit()), history_edit_form, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_keyboard()), im, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_numkeyboard()), number_form, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_prj_pm()), prj_form, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_date()), select_date, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_multicard()), muti_card_set, SLOT(update_ui())) ;
     QObject::connect(this, SIGNAL(update_ui_detial_form()), his_prg_view, SLOT(update_ui()));

     QObject::connect(prj_form,      SIGNAL(save_edit()),              this, SLOT(save_refer_edit())) ;
     QObject::connect(select_date,   SIGNAL(enter_date()),             this, SLOT(date_select_slot())) ;
     QObject::connect(muti_card_set, SIGNAL(save_multi_item_signal()), this, SLOT(save_multi_item_slot())) ;

     //������ʾ���ڣ������źźͲ� 2018/09/14
     QObject::connect(this, SIGNAL(update_ui_errordialog()), errordialog, SLOT(update_ui())) ;



     ////�����źŲ�������,û�ط��ţ���ʱ������
     //���궨��ֵ�ļ�����ť
     QStyledItemDelegate* itemDelegate = new QStyledItemDelegate();
     QList<QComboBox *> com_btns = this->findChildren<QComboBox *>();
     foreach (QComboBox * com_btn, com_btns) {
         com_btn->setItemDelegate(itemDelegate) ;
     }
     /*�����̿ռ�*/
     check_disk() ;



    connect(ui->prev_cu, SIGNAL(clicked(bool)), ui->spinBox_curve_No, SLOT(stepDown()));
    connect(ui->next_cu, SIGNAL(clicked(bool)), ui->spinBox_curve_No, SLOT(stepUp()));


    /* sampleType */
    QString tmpSampleType;
    for (int i = 0; i < 9; i++)
    {
        tmpSampleType = system_config.sample_type[0][i];
        if (tmpSampleType.isEmpty())
        {
            for (; i < 9; i++)
            {
                ui->stackedWidget->findChildren<QLabel*>(QString("label_stype%1").arg(i)).at(0)->setVisible(false);
                ui->stackedWidget->findChildren<QLineEdit*>(QString("lineEdit_stype%1").arg(i)).at(0)->setVisible(false);
                ui->stackedWidget->findChildren<QLineEdit*>(QString("lineEdit_stype%1_2").arg(i)).at(0)->setVisible(false);
            }
            break;
        }
    }


    connect(
            history_edit_form,
            SIGNAL(save_signal()),
            SLOT(date_select_slot()));
/* 2018/09/14 donot show temperature */
    this->Not_Show_Temp();

}

void First_form::check_dog(uint cmp_code, uint /* area_code */)
{
    QDir *dir = new QDir("tmp");
    QStringList filter; //����.dat�ļ�
    filter<<"*.c";
    dir->setNameFilters(filter);
    QList<QFileInfo> comp_info(dir->entryInfoList(filter)) ;

    delete dir;



    if(comp_info.count() > 0)
    {
        QString tmp = comp_info.at(0).fileName() ;
        QString code_flag = tmp.split(".").at(0) ;
        if(cmp_code == code_flag.toUInt())
        {
            myHelper::write_system_record("log/diary.ini", "A2", QDateTime::currentDateTime()) ;//�ռǼ�¼
            return ;

        }
        else
        {
            myHelper::write_system_record("log/error.ini", "E2", QDateTime::currentDateTime()) ;//������¼
            qDebug() <<__LINE__ <<__FUNCTION__<< "comp not right" ;
        }
    }

    //2.ԭʼ����
    ui->toolButton_sub_h_origin->setVisible(0) ;
    //3.���������ɨ����
   // ui->checkBox_checkbar->setVisible(0) ;

    //4.��Ŀ
    ui->toolButton_main_p_quxian->setVisible(0) ;
    ui->toolButton_main_p_zhuxiang->setVisible(0) ;
    ui->toolButton_main_p_zixiang->setVisible(0) ;
    on_toolButton_main_p_setting_clicked();


    //6.debug
    ui->toolButton_xitong_moshi->setVisible(0) ;

    /*6�Ƿ����ؿ�ɨ����ѡ��*/
    if(system_config.hide_set_bar == 1)
    {
        ui->checkBox_checkbar->setVisible(0) ;
    }

}
void First_form::check_disk()
{
    struct statfs disk_info ;


    if(statfs("..", &disk_info) < 0)
    {
        qDebug()<<__LINE__ <<__FUNCTION__ << "get disk info failed! \n";
        return ;
    }
    float total = disk_info.f_blocks * disk_info.f_bsize >> 20 ;
    float avail = disk_info.f_bavail * disk_info.f_bsize >> 20 ;
    int baifenbi = (int)(avail/total * 100) ;
    //qDebug("total: %d  --  avaiable: %d", total, avail) ;
    ui->label_disk->setText(QString("%1%").arg(baifenbi)) ;
    if(baifenbi < 5)
        info2error_dialog(this->isEN?"faDisk space is less than 5%, please delete history data!"
                                    :tr("fa����ʣ��ռ��Ѳ���5%����ɾ����ʷ����!")) ;
}

/*��ʷ����ĳ�ʼ��*/
void First_form::history_tablewidget_init()
{
    /*�������еı�������*/
     QList<QTableWidget *> tab_ws = this->findChildren<QTableWidget *>();
    foreach (QTableWidget * tab_w, tab_ws) {
        tab_w->setSelectionMode(QAbstractItemView::SingleSelection);                            //����ֻ��ѡ��ѡ
        tab_w->setSelectionBehavior(QAbstractItemView::SelectRows);                         //����ֻ��ѡ��һ��
        tab_w->setEditTriggers(QAbstractItemView::NoEditTriggers);                              //���ò��ܱ༭

    }
    QHeaderView *headerView = ui->tableWidget_history->verticalHeader();
    headerView->setHidden(true);                                                                                            //���ò�Ҫ��һ�����
    headerView = ui->tableWidget_primary->verticalHeader() ;
    ui->tableWidget_primary->setColumnHidden(9, true);  //�����ļ�����λ��
     headerView->setHidden(true);                                                                                           //���ò�Ҫ��һ�����

     ui->tableWidget_xishu->setColumnWidth(0, 180);
     //

}
/*��ʷ��ػ��������ĳ�ʼ��*/
int First_form::history_form_init()
{

    if( read_num(dirname) < 0)
    {
            /**/
        return -1 ;
    }

    /*��ʷ���������Ĭ��Ϊ��ǰ����*/
    QString  c_tody;

    c_tody = QDate::currentDate().toString("yyyy-MM-dd") ;

    update_history_ui( c_tody,  c_tody ) ;
    update_primary_ui( c_tody, c_tody ) ;
    update_Debug_ui( c_tody,  c_tody) ;

    update_Classify_ui( c_tody,  c_tody) ;


    /*���ü���Ҫʹ�õ��ļ���*/
    nextfilename =  currentnumtostring  + ".dat" ;
    //nextDebugfilename = dirname + "/Debug/" + QString("%1").arg(currentDebugnum)  + ".dat";



    //��ѡ
    connect(ui->checkBox_history_2, SIGNAL(clicked()), this, SLOT(on_checkBox_history_1_clicked())) ;
    connect(ui->checkBox_history_3, SIGNAL(clicked()), this, SLOT(on_checkBox_history_1_clicked())) ;
    connect(ui->checkBox_history_4, SIGNAL(clicked()), this, SLOT(on_checkBox_history_1_clicked())) ;
    connect(ui->checkBox_history_5, SIGNAL(clicked()), this, SLOT(on_checkBox_history_1_clicked())) ;

    connect(ui->checkBox_history_13, SIGNAL(clicked()), this, SLOT(on_checkBox_history_12_clicked())) ;
    connect(ui->checkBox_history_14, SIGNAL(clicked()), this, SLOT(on_checkBox_history_12_clicked())) ;
    connect(ui->checkBox_history_15, SIGNAL(clicked()), this, SLOT(on_checkBox_history_12_clicked())) ;
    connect(ui->checkBox_history_16, SIGNAL(clicked()), this, SLOT(on_checkBox_history_12_clicked())) ;


    //on_exportButton_clicked
    connect(ui->exlocalButton, SIGNAL(clicked()), this, SLOT(on_exportButton_clicked())) ;
    return 0 ;
}
/*���������ļ����������������õ�������*/
void First_form::setting_init()
{
 /*����ʱ�õ�����ز���*/
    set_test.Startnum = ui->spinBox_startnum->value() ;

    set_test.Autoprint = ui->checkBox_autoprint->isChecked();

 /*LIS������ز���*/
    set_lis.auto_upload = ui->comboBox_autoupload->currentIndex();
    set_lis.udp_port = ui->spinBox_udp_host->value() ;
    set_lis.udp_ip = (QString("%1.%2.%3.%4").arg(ui->spinBox_ip1->value())
                      .arg(ui->spinBox_ip2->value())
                       .arg(ui->spinBox_ip3->value())
                       .arg(ui->spinBox_ip4->value())) ;
    set_lis.uart_buad = ui->comboBox_buad->currentIndex() ;
    set_lis.com = ui->comboBox_buad->currentText().toInt();
    set_lis.current_upload_way = ui->comboBox_uploadway->currentIndex() ;
    set_lis.language = ui->change_languagepushButton->isEnabled() ;
    set_lis.local_ip = (QString("%1.%2.%3.%4").arg(ui->spinBox_ip1_2->value())
                        .arg(ui->spinBox_ip2_2->value())
                         .arg(ui->spinBox_ip3_2->value())
                         .arg(ui->spinBox_ip4_2->value())) ;


    QString val;
    myHelper::read_config_sig("config.ini", "AFS1200", "TestMode", &val);
    if (val.isEmpty())
        val = 1;
   // wait_for_test_cur_model = val.toUInt() % 6;



//ϵͳʱ�����ò���

    QString time_tmp = QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss");
    ui->spinBox_year_2->setValue(time_tmp.mid(0, 4).toInt());
    ui->spinBox_month_2->setValue(time_tmp.mid(5, 2).toInt());
    ui->spinBox_day_2->setValue(time_tmp.mid(8, 2).toInt());
    ui->spinBox_hour->setValue(time_tmp.mid(11, 2).toInt());
    ui->spinBox_minute->setValue(time_tmp.mid(14, 2).toInt());

    //��Ϊcombox�ڴ������ϲ����㣬�Ӱ�������ѡ��

}

/*�ι��������ļ�*/
void First_form::load_settingfile()
{
    QString beep_enable;
    myHelper::read_config_sig(CONFIG_INI, "Set_test", "Beep", &beep_enable) ;
    ui->checkBox_Beep->setChecked(beep_enable.toInt());
    Beep_Dri::Get_Beep()->setEnable(beep_enable.toInt());

    QStringList infos ;
    myHelper::ReadConfig(&infos) ;
    //qDebug() <<  infos.count();
    /*����ʱ�õ�����ز���*/
    ui->spinBox_startnum->setValue(infos.at(0).toInt());
    set_test.Numlenth = infos.at(1).toInt();
    set_test.Samelenth = infos.at(2).toInt();
    ui->checkBox_autoprint->setChecked(infos.at(3).toInt());
    ui->checkBox_checkbar->setChecked(infos.at(4).toInt());
    ui->spinBox_keeptime->setValue(infos.at(5).toInt());
    ui->checkBox_autotest->setChecked(infos.at(6).toInt());
    ui->spinBox_lenght_num->setValue(set_test.Numlenth);

    set_test.Autotest = infos.at(6).toInt();
    if(set_test.Autotest )
    {
       on_checkBox_autotest_clicked();
    }

     /*����ģʽ,��ʱ�ͱ�׼*/
    ui->checkBox_switch_mode->setChecked(infos.at(7).toInt()) ;
    ui->checkBox_usegun->setChecked(infos.at(8).toInt()) ;
    ui->comboBox_type->setCurrentIndex(infos.at(9).toInt()) ;
    //ui->checkBox_usercode->setChecked(infos.at(13).toInt()) ;
    //setClassifyEnable(infos.at(13).toInt());

    /*LIS������ز���*/
    //ui->checkBox_upload->setChecked(infos.at(20).toInt());
    ui->comboBox_autoupload->setCurrentIndex(infos.at(20).toInt()) ;
    //set_lis.auto_upload = ui->comboBox_autoupload->currentIndex();

    ui->spinBox_udp_host->setValue(infos.at(21).toInt());

    QStringList ip_list = infos.at(22).split(".") ;
    if(ip_list.count() > 3)
    {
        ui->spinBox_ip1->setValue(ip_list.at(0).toInt())  ;
        ui->spinBox_ip2->setValue(ip_list.at(1).toInt())  ;
        ui->spinBox_ip3->setValue(ip_list.at(2).toInt())  ;
        ui->spinBox_ip4->setValue(ip_list.at(3).toInt())  ;
    }

    ui->comboBox_buad->setCurrentIndex(infos.at(23).toInt());
    // set_lis.uart_buad = ui->comboBox_buad->currentIndex();


    ui->comboBox_uploadway->setCurrentIndex(infos.at(25).toInt());
    //set_lis.current_upload_way = ui->comboBox_uploadway->currentIndex();


    if(infos.at(26).toInt())
        ui->change_languagepushButton_english->setEnabled(0);
    else
        ui->change_languagepushButton->setEnabled(0) ;

    if(infos.at(26).toInt() > 0)
        ui->label_115->setText("Initialzing system, please wait..") ;

    QStringList local_ip_list = infos.at(27).split(".") ;
    if(local_ip_list.count() > 3)
    {
        ui->spinBox_ip1_2->setValue(local_ip_list.at(0).toInt())  ;
        ui->spinBox_ip2_2->setValue(local_ip_list.at(1).toInt())  ;
        ui->spinBox_ip3_2->setValue(local_ip_list.at(2).toInt())  ;
        ui->spinBox_ip4_2->setValue(local_ip_list.at(3).toInt())  ;
    }
    /*���ô�ӡ��Ϣ*/
    ui->checkBox_print_detail->setChecked(infos.at(28).toInt()) ;
    ui->spinBox_print_count->setValue(infos.at(29).toInt())  ;
//    ui->lineEdit_std_print_declar->setText(infos.at(30)) ;
     ui->lineEdit_std_print_declar->setText((this->isEN?"This Result Is Only For "
                                                        "This Sample!"
                                                      :tr("�����ֻ�Ա��ݱ걾����")));



    /*��ʱ���¹���*/
     on_checkBox_usegun_clicked() ;


    /*��ȡ�ο�ֵ*/
    myHelper::ReadIDProject(&idpro_unique_list) ;
    /*��ȡ����ϵ��*/
    myHelper::Read_Ratio(&pro_ratio_list) ;

    /*���Խ����T��C*/
    QStringList combox_list ;
    combox_list << "X1" << "X2" << "X3"  ;
    ui->comboBox_p1Value_2->addItems(combox_list) ;
    ui->comboBox_p2Value_2->addItems(combox_list) ;

    QString P_Position  ;
    myHelper::read_config_sig("config.ini", "Debug", "P1", &P_Position) ;
    ui->comboBox_p1Value_2->setCurrentIndex(P_Position.toInt()) ;
    myHelper::read_config_sig("config.ini", "Debug", "P2", &P_Position) ;
    ui->comboBox_p2Value_2->setCurrentIndex(P_Position.toInt()) ;
    connect(ui->comboBox_p1Value_2, SIGNAL(currentIndexChanged ( int )), this, SLOT(comboBox_p1Value_2_currentIndexChanged(int ))) ;
    connect(ui->comboBox_p2Value_2, SIGNAL(currentIndexChanged ( int )), this, SLOT(comboBox_p2Value_2_currentIndexChanged(int ))) ;

}

int First_form::item_update()
{

    itemList = itemMat->getItemList();

    item_update_itemList();


    /*�ο�ֵ����*/
    ui->tableWidget_refer->setRowCount(idpro_unique_list.count()) ;
    for(int k=0; k<idpro_unique_list.count(); k++ )
    {
        ui->tableWidget_refer->setItem(k, 0, new QTableWidgetItem(idpro_unique_list.at(k).prj_name));
        if(idpro_unique_list.at(k).low >= 0 )
            ui->tableWidget_refer->setItem(k, 1, new QTableWidgetItem(QString("%1").arg(idpro_unique_list.at(k).low)));
        else
            ui->tableWidget_refer->setItem(k, 1, new QTableWidgetItem(""));
        if(idpro_unique_list.at(k).up >= 0 )
            ui->tableWidget_refer->setItem(k, 2, new QTableWidgetItem(QString("%1").arg(idpro_unique_list.at(k).up)));
        else
            ui->tableWidget_refer->setItem(k, 2, new QTableWidgetItem(""));
    }
    /*����ϵ������*/
    ui->tableWidget_xishu->setRowCount(pro_ratio_list.count());
    for(int k=0; k<pro_ratio_list.count();k++)
    {
        ui->tableWidget_xishu->setItem(k, 0, new QTableWidgetItem(pro_ratio_list.at(k).prj_name) );
        ui->tableWidget_xishu->setItem(k, 1, new QTableWidgetItem(pro_ratio_list.at(k).str_ratio));
    }

    /*��ȡ������*/
    QStringList idprojectlist;
    for (QList<ItemManager::ID_info>::iterator it = itemList.begin(); it != itemList.end(); it++)
    {
        if (it->type > 0)
        {
            idprojectlist << it->title;
        }
    }



    myHelper::Read_multi_card_par("Project/multi_card.ini", &multi_card_list, idprojectlist) ;

    add_multi_card_item() ;


    return 0 ;
}


void First_form::font_init()
{
    /*������ʷ���ڵ������С*/
    QFont font  =  ui->tableWidget_history->font();
    font.setPointSize(20);
    ui->tableWidget_history->setFont(font);
    /*���ð�������*/
    foreach (QPushButton * btn, this->findChildren<QPushButton *>()) {
        font = btn->font() ;
        font.setPointSize(26);
        btn->setFont(font);
     }
    //�ϴ�ȫ����ɾ��ȫ��Ӣ��̫�� 2018/09/21
    font  =  ui->tableWidget_history->font();
    font.setPointSize(22);
    ui->uploadallButton->setFont(font);
    ui->delallButton->setFont(font);

    QFont ft ;

    ft.setPointSize(16) ;

    ui->label_current_num->setFont(ft) ;
    ui->label_batch_2->setFont(ft) ;
    ui->label_prj->setFont(ft) ;
    ui->btn_std->setFont(ft) ;
    ui->btn_std_2->setFont(ft) ;

    //���ý���
    ui->label_40->setFont(ft) ;
    ui->label_43->setFont(ft) ;
    ui->label_44->setFont(ft) ;
    ui->label_45->setFont(ft) ;
    ui->label_85->setFont(ft) ;
    ui->groupBox_5->setFont(ft) ;


     ft.setPointSize(20) ;
    ui->label_118->setFont(ft) ;
    ui->label_24->setFont(ft) ;
    ui->label_disk->setFont(ft) ;
    ui->listWidget_setP_2->setFont(ft) ;
}

void First_form::delay_100ms(int ms)
{
    lockbytimer = 1 ;
    lockbytimer_num = ms*10 ;
}

/*thread*/
First_form::~First_form()
{
    delete serial_thead;
    delete his_prg_view;
    delete prj_form;
    delete curve_form;
    delete detail_form;
    delete history_edit_form;
    delete number_form;
    delete select_date;
    delete muti_card_set;

    delete ui;
}

void First_form::update_currentnumtostring()
{
    QString tmp3;
    myHelper::format_num(set_test.Samelenth, set_test.Numlenth, currentnum, &tmp3) ;

    currentnumtostring = QDate::currentDate().toString("yyMMdd") + tmp3 ;

    nextfilename  =  currentnumtostring  + ".dat" ;

}

/*********************************
*���Խ������
*
**********************************/

void First_form::post_err(unsigned int arg)
{

    if (arg == 1)
    {
        emit info2error_dialog(this->isEN?"Item information deleted!"
                                        :tr("��Ŀ��Ϣ��ɾ����"));
    }
    else if(!init_finsh)
    {
        emit info2error_dialog(this->isEN?"Initialization failed, please restart the instrument!"
                                        :tr("��ʼ��ʧ�ܣ�����������!"));
    }
    else
    {
        emit info2error_dialog(this->isEN?"Error Communication!"
                                        :tr("ͨѶ����"));
        for(int i =0; i < 5; i ++)
        {
            show_ret(0,i,0," ");
        }
    }
    myHelper::write_system_record("log/error.ini", "E1", QDateTime::currentDateTime()) ;//�����¼
}

void First_form::item_update_itemList()
{
    /*Ҫ�⿪�ź����ӣ���Ȼ�������*/

    ui->listWidget_setP_2->clear() ;

    POCT_ITEM tmpitem;
    int i = 0;

    ItemManager::ID_info defitem = itemMat->getCur_info();
    QString str;

    foreach (ItemManager::ID_info info, itemList)
    {
        itemMat->loadItem(info, &tmpitem);

        /*����Ŀ�浽�ο�ֵ�б���*/
        for(int i_prj = 0; i_prj < tmpitem.ItemCount; i_prj++)
        {
            for(int i_sub = 0; i_sub < 5; i_sub++)
            {
                if(tmpitem.SIs[i_prj].Name[i_sub].isEmpty())
                    break  ;

                bool go_insert = 0;
                int k ;
                if(idpro_unique_list.count() == 0)                                 //һ����Ŀ��û��
                {
                    go_insert = 1 ;
                }
                else
                {
                    for( k=0; k<idpro_unique_list.count() ; k++)
                    {
                        if(idpro_unique_list.at(k).prj_name == tmpitem.SIs[i_prj].Name[i_sub])
                            break ;
                        else if(k == (idpro_unique_list.count()-1))                      //û���ҵ�׼�������µ���Ŀ
                            k+=2 ;
                    }
                    if(k > idpro_unique_list.count() )
                        go_insert = 1 ;
                }
                if(go_insert)
                {
                    PROJECT_ITEM tmp ;
                    tmp.prj_name = tmpitem.SIs[i_prj].Name[i_sub] ;
                    tmp.low = -1 ;
                    tmp.up = -1 ;
                    tmp.str_low = "-1" ;
                    tmp.str_up = "-1" ;

                    idpro_unique_list << tmp ;
                    myHelper::WriteIDProject(&idpro_unique_list) ;
                }
                /**/
                go_insert = 0 ;

                if(pro_ratio_list.count() == 0)                                             //һ����Ŀ��û��
                {
                    go_insert = 1 ;
                }
                else
                {
                    for( k=0; k<pro_ratio_list.count() ; k++)
                    {
                        if(pro_ratio_list.at(k).prj_name == tmpitem.SIs[i_prj].Name[i_sub])
                            break ;
                        else if(k == (pro_ratio_list.count()-1))                      //û���ҵ�׼�������µ���Ŀ
                            k+=2 ;
                    }
                    if(k > pro_ratio_list.count() )
                        go_insert = 1 ;
                }
                if(go_insert)
                {
                    RATIO_ITEM tmp ;
                    tmp.prj_name = tmpitem.SIs[i_prj].Name[i_sub] ;
                    tmp.str_ratio = " " ;

                    pro_ratio_list << tmp ;
                    myHelper::Write_Ratio(&pro_ratio_list) ;
                }
            }
        }
        str = QString("%1_%2)%3")
                .arg(info.bcode)
                .arg(info.type? QString::number(info.type): QString("S"))
                .arg(info.title);

        if (defitem.bcode == info.bcode && defitem.type == info.type)
        {
            str += (this->isEN?" [Current Item]"
                             :tr(" [��ǰ��Ŀ]"));
        }

        ui->listWidget_setP_2->insertItem(i++, str);
    }

}

/*�����߳̿��Ƶײ�ɹ�֮�󣬴������ص�����*/
void First_form::get_datas_event(int sw, unsigned int arg)
{
    unsigned int i = 0;
    float tc_value = 0;
    if(sw != 20)
        printf("MainForm  receive %d Event\n", sw) ;

    switch(sw)                                     //�����¼���Ӧ����ı��
    {                                              //���Ƶײ�ʧ��
    case -1:
                            /** ���ܳ��ֵ����  2018/09/21**/
        /*****************************************************************
         * 1������Testָ��Ƿ��ص����ݰ���Ϊ24�ֽ�,���߽������ص����ݰ�ʧ��
         * 2�����͸�λָ�ʱ
         * 3�����Ͷ�����ָ��ǳ�ʱ�������޷��������ص����ݰ�
         * 4����ID����ʱ������հ���Ϊ24, 4096 ,4
         * 5�����汾����ʱ
         *
         *
         *
         * **************************************************************/
        post_err();
        break ;                                    //���Ƶײ�ʧ��

    case -5://��iD��ʧ��
    {
        emit info2error_dialog(this->isEN?"None Item!"
                                        :tr("��ǰ����Ŀ��"));
        myHelper::write_system_record("log/warning.ini", "W1",
                                      QDateTime::currentDateTime()) ;//������¼
        delay_100ms(LONG_LOCK_TIME ) ;
        this->button_lock = 1 ;

        break ;
    }                                               //���Ƶײ�ʧ��

    case 1://��·����λ����ȡ���Դ��ڳ��ȣ�����
    {
        if (arg != 1)
        {
            qDebug() <<__LINE__ <<__FUNCTION__<<"testing wulianka ";
            on_rcardButton_clicked();
            wait_for_test_cur_num = -1;
            InitHatchTime(-1);
            try_save();
            update_status();
            post_err(0);
            qDebug() <<__LINE__ <<__FUNCTION__<<"testing wulianka ";
            break;
        }
        /*���ݴ���*/
        switch(get_cvalue())
        {
        case -1:  // �Ժ��ȡ��Ŀ����Ϣ
            break ;
        case -2:  // δ����
        {
            myHelper::write_system_record("log/warning.ini", "W5", QDateTime::currentDateTime()) ;//������¼
            break ;
        }
        case -3:  // �嶥
        {
            myHelper::write_system_record("log/warning.ini", "W6", QDateTime::currentDateTime()) ;//������¼
            break ;
        }
        }

        break;
    }
    case 2:
    {
        char ret_str[31] ;                                                          //ע�����������
        uchar ret_nums[4] ;                                                     //�������к�

        memcpy(&ret_str[0], &register_array[0][0], 10) ;
        memcpy(&ret_str[10], &register_array[1][0], 10) ;
        memcpy(&ret_str[20], &register_array[2][0], 10) ;
        memcpy(ret_nums, &register_array[5][0], 4) ;
        ret_str[30] = '\0' ;                                                        //���ӽ�����

        QString reg_t = QString::fromLocal8Bit(ret_str) ;


        QString reg_nn ;
        QString str ;

        /*��ȡ������ַ*/
        myHelper::read_config_sig("address.ini", "Address",  "address", &reg_form->str_addr) ;

        /*��16����תΪQString*/
        for(int j=0; j<4; j++)
        {
            str = QString("%1").arg(ret_nums[j]&0xFF, 2, 16, QLatin1Char('0'));
            reg_nn+=str;
            reg_form->num->setText(reg_nn);
            uploadInterface.serialNum = reg_nn;
            ui->label_machine_serial->setText(reg_nn);
        }
        /*������Χ*/
        T_ratio_range = float(register_array[3][0])/100 ;
        srand( (unsigned)time(NULL) ) ;                                //��ʼ���漴��

        QString md4_v = MD5String(reg_nn + reg_t) ;                    //��ȡMD5ֵ
        QString ret = md4_v.mid(2,6) ;                                 //���ϴ���


        ui->label_cmp_name->setText(reg_t);
        ui->label_cmp_addr->setText(reg_form->str_addr);
        thermalPrinter.company = reg_form->str_addr;
        INSTITUTION = reg_t ;                                           //���������ƴ�����
        AREA_CODE = register_array[4][0] ;                              //�������
        qDebug() <<__LINE__ <<__FUNCTION__<< "company name :"<<ret ;

        myHelper::write_system_record("log/diary.ini", "A1", QDateTime::currentDateTime()) ;//�ռǼ�¼

        /*�����ܹ�*/
        QString disable_dog;
        myHelper::read_config_sig("sys_config.ini", "SYSTEM", "disable_dog", &disable_dog);
        if (!disable_dog.toInt())
        {
            check_dog(version[0], AREA_CODE) ;
        }

        /*�ж��Ƿ���ע��*/
        int k ;
        for(k=0; k<30; k++)
            if(ret_str[k] != 0xff)
                break ;
        // if( /* k == 30 */ 0)
        if( k == 30 )                                                                      //����δע��
        {
            qDebug() <<__LINE__ <<__FUNCTION__<< ret ;
            on_pushButton_register_clicked() ;                   //����ע�ᴰ��
        }
        else
        {

            emit already_register() ;                                        //����ȷ��������ʾ
            init_finsh = 1 ;                                                          //�Ƿ����Զ����

            //��������

            ui->main_Button->setVisible(1) ;                       //��ʾ���˵�����


            if(ui->lineEdit_chanpingdaima->text().isEmpty() || ui->tableWidget_item->item(0, 3)->text().isEmpty())
            {
                //emit info2error_dialog(tr("��ǰ��Ŀ������Ч!"));
                system("rm lost_found/* -rf") ;
            }

            on_btnT_menu_clicked() ;                                   //������ҳ

        }

        ui->curve->xAxis->setRange(0, win_lenth);         //�������ߵ�X���곤��

        break;
    }
    case 5://��ͨ������
    {

        POCT_ITEM debug_item = poct_item;
        DWORD blank;

        //double mx[16],my[16] , a0[16], a1[16] ;
        //int n[10] ;
        int bDotNum,  bT, bSec;
        int iSNum ;
        uchar ucLog ;
        double RR ;
        for(int k=0; k<int (sizeof(debug_item.Curves[0].Concs)/sizeof (debug_item.Curves[0].Concs[0])); k++)
        {
            CONCS[k] = debug_item.Curves[0].Concs[k] ; //
            RESPS[k] = debug_item.Curves[0].Resps[k] ;
        }
        iDots = debug_item.Curves[0].StdCount ;
        iNs[0] = debug_item.Curves[0].SectLimits[0] ;
        iNs[1] = debug_item.Curves[0].SectLimits[1] ;
        iSect  = debug_item.Curves[0].SectPosi ;
        cLogX = debug_item.Curves[0].ConcTrans ;
        cLogY = debug_item.Curves[0].RespTrans ;
        iFitType = debug_item.Curves[0].Method ;
        //dec_std = poct_item.Curves[0].StdDec>>4 ;
        int dec_std_cons = debug_item.Curves[0].StdDec & 0xf0 ;
        int dec_std_resp = debug_item.Curves[0].StdDec & 0x0f ;

        for(int k=0; k<6; k++)
            dA[k] = debug_item.Curves[0].a[k] ;

        //LB_CurveFit(poct_item, 0, mx, my, a0, a1, n) ;
        MultiFit(CONCS, RESPS, dec_std_cons, dec_std_resp, iDots, iSect, cLogX, cLogY, iFitType, iNs, dA, dA1, &RR) ;

        bDotNum = debug_item.Curves[0].StdCount;                                 //��׼�����
        if(debug_item.Curves[0].SectPosi == 0)
        {
            iSNum = 1;
            bSec = 0 ;
        }
        else
        {
            iSNum = 2;
            bSec = 1 ;
        }
        ucLog = debug_item.Curves[0].ConcTrans ;
        bT = debug_item.Curves[0].SectPosi ;

        //���T 1_31  ϵͳУ׼

        /*�ҳ���ֵ*/
        ID_PEAKRESULT id_peakresult ;
        ItemManager::ID_info info = itemMat->getIdInfo(&debug_item);
        int peakCount;

        if (info.type == 0)
        {
            peakCount = debug_item.PeakCount;
            CalcPeak(
                    package,
                    win_lenth,
                    debug_item.Peaks,
                    peakCount,
                    debug_item.BasePeak,
                    debug_item.Blank,
                    &blank,
                    &id_peakresult) ;
        }
        else
        {
            peakCount = debug_item.SIs[currentsubpj_num].PeakCount;
            CalcPeak(
                    package,
                    win_lenth,
                    debug_item.SIs[currentsubpj_num].siPeaks,
                    peakCount,
                    debug_item.SIs[currentsubpj_num].BasePeak,
                    debug_item.Blank,
                    &blank,
                    &id_peakresult) ;
        }
        /*��ʾ����*/
        QVector<double> x(win_lenth), y(win_lenth) ;
        int max_value = package[0];
        for(int v = 0; v<win_lenth; v++)
        {
            x[v] = v + 1 ;                                                                                         //������
            y[v] = package[v] ;                                                                            // ������
            //
            if((unsigned int)max_value < package[v])
                max_value = package[v] ;                                                           //�ҳ����ֵ���Ա�������������ʾ��Χ
        }


        max_value = max_value + max_value/10 ;                                    //����������ֵΪ��ֵ��110%
        ui->curve->yAxis->setRange(0, max_value );

        ui->curve->graph(0)->setData(x, y);

        ui->curve->clearItems() ;

        for(int v = 0; v < peakCount; v++)
        {
            QCPItemLine *arrow = new QCPItemLine(ui->curve);
            QCPItemLine *tex = new QCPItemLine(ui->curve) ;

            ui->curve->addItem(tex) ;
            ui->curve->addItem(arrow) ;
            arrow->start->setCoords (id_peakresult.Position[v] , max_value); ;
            arrow->end->setCoords( id_peakresult.Position[v], package[id_peakresult.Position[v]]); ;
            arrow->setHead(QCPLineEnding::esSpikeArrow);
        }
        ui->curve->replot();                                                                             //��ʼ��ʾ

        for(i=0; i< 4;i++)
        {
            printf("p%d:%f \n",i,id_peakresult.Value[i]) ;
        }

        /*T/Cֵ*/
        float T_V = id_peakresult.Value[ ui->comboBox_p1Value_2->currentIndex() ] ;
        float C_V = id_peakresult.Value[ ui->comboBox_p2Value_2->currentIndex() ] ;
        /*���Tֵ���ڹ涨��������Ҫ����һ��ϵ��1�����ϵ��1��Ҫ�ٳ�һ������ϵ��2*/
        T_V =  id_peakresult.Value[poct_item.SIs[ currentsubpj_num].CalcPosi[0] ] ;
        if(T_V < poct_item.SIs[currentsubpj_num].LessThan)
        {
            float tmp_rr = T_ratio_range * rand()/double(RAND_MAX) ;                                              //�ٷֱ�
            if(rand() & 1) tmp_rr =  -tmp_rr ;
            T_V = T_V * (poct_item.SIs[currentsubpj_num].LessThanRatio  + tmp_rr);
        }
        if(C_V > 0)
            tc_value = T_V/C_V ;
        else
            tc_value = 0 ;

        printf("T/C = %f \n", tc_value) ;
        /*��ֵ���õ���Ӧ��LABEL��*/
        ui->lineEdit->setText( QString("%1").arg(id_peakresult.Value[0])) ;
        ui->lineEdit_T2->setText( QString("%1").arg(id_peakresult.Value[1])) ;
        ui->lineEdit_C->setText( QString("%1").arg(id_peakresult.Value[2])) ;
        ui->lineEdit_TC->setText( QString("%1").arg(tc_value) ) ;
        ui->lineEdit_T4->setText( QString("%1").arg(id_peakresult.Value[3]));

        ui->lineEdit_Position1->setText( QString("%1").arg(id_peakresult.Position[0])) ;
        ui->lineEdit_Position2->setText( QString("%1").arg(id_peakresult.Position[1])) ;
        ui->lineEdit_Position3->setText( QString("%1").arg(id_peakresult.Position[2])) ;
        ui->lineEdit_Position4->setText( QString("%1").arg(id_peakresult.Position[3]));

        /*�жϵ�ǰ�����Ƿ��ѹ�ʱ,�Ա���Ļ�������*/
        if(staydate != (QDateTime::currentDateTime().toString("yyyy-MM-dd") ))
        {
            if( initial_dir() < 0)                                                                                          //�����趨����Ŀ¼
            {
                /**/
            }
            ::close(num_fd) ;                                                                                           //close before

            read_num(dirname) ;                                                                                   //�����趨��ǰ���к�

            nextfilename  = currentnumtostring  + ".dat" ;      //���¼���Ҫд����ļ���

        }

        /*�����������*/
        SAVE_DEBUG_ITEM debug_data ;
        int data_size = sizeof(debug_data);
        uchar Debug_file_buffer[data_size];
        QString Dfile_name ;

        debug_data.num = currentDebugnum ;
        debug_data.Year = currentyear ;
        debug_data.Month = currentmon ;
        debug_data.Day = currentday ;
        QTime currenttime = QTime::currentTime();
        memcpy(debug_data.Time , currenttime.toString("hh:mm:ss").toLocal8Bit().constData() , 9);
        debug_data.Datas_number = win_lenth ;
        debug_data.Peak_number = peakCount;
        for(int q = 0; q < win_lenth; q++) debug_data.Datas[q] = package[q];
        for(int q = 0; q < 10; q++) debug_data.Peaks_value[q] = 0;
        for(int q = 0; q < peakCount; q++)
        {
            debug_data.Peaks_value[q] = id_peakresult.Value[q] ;
            debug_data.Peaks_position[q] = id_peakresult.Position[q] ;
        }
        debug_data.TC = tc_value ;

        memcpy(Debug_file_buffer, &debug_data, data_size) ;
        Dfile_name = dirname + "/Debug/" + QDateTime::currentDateTime().toString("yyyy-MM-dd") + "_" + QDateTime::currentDateTime().toString("hh-mm-ss")  + ".dat" ;

        if (save_data_as_file(Dfile_name.toLocal8Bit().constData(), Debug_file_buffer, data_size) < 0)
        {
            printf("test write failed \n") ;
        }

        currentDebugnum ++ ;

        lseek(num_fd, 4, SEEK_SET) ;                                               //����֮ǰ�����к�
        if( write(num_fd, &currentDebugnum, 4) < 0)
        {

        }

        wait_for_test_cur_num = -1;
        disableButton_clicked(1) ;
        on_allButton_clicked("COM03");//��λ
        myHelper::msDelay(1000);                                                //ÿ��ִ����һ������֮��
        disableButton_clicked(1) ;
        hide_button(1) ;

        break;
    }

    case 7://�����뿨
    {
        serial_thead->push_cmd("COM03");
        /*�Ȼ�ȡ����ֵ*/
        QString
                barupper = card_value;
        qDebug() <<__LINE__ <<__FUNCTION__<<card_value;

        this->button_lock = 1 ;

        ItemManager::ID_info idinfo;


        /*��ʼѰ����û��ƥ�����Ŀ*/
        for(
            QList<ItemManager::ID_info>::iterator it = itemList.begin();
            it != itemList.end();
            it++
            ) {
            if(it->bcode == barupper)
            {
                if (
                    int (it->type) == wait_for_test_cur_model ||
                    (wait_for_test_cur_model && int (it->type) >= wait_for_test_cur_model)
                ){
                    idinfo = *it;
                    break ;
                }
            }

        }

        if(idinfo.bcode.isEmpty() || !load_set_project(idinfo))                                                       //û��ƥ����Ŀ
        {
            info2error_dialog(this->isEN?tr("Please read the information without Item card (%1)").arg(barupper)
                                       :tr("����Ŀ��(%1)����Ϣ�����ȡ").arg(barupper)) ;
            if (ui->checkBox_autotest->isChecked())
            {
                auto_ok_flag = 30;

            }
            wait_sate = 0;
            on_rcardButton_clicked();
            delay_100ms(LONG_LOCK_TIME) ;
            break ;
        }

        // **AFS1200
        // ��ʼ������ʱ��

        if (!InitHatchTime(!ui->checkBox_switch_mode->isChecked()))
        {
            info2error_dialog(this->isEN?"The current Item has no valid channel data, please read the                              Item again"
                                         :tr("��ǰ��Ŀ����Чͨ�����ݣ������¶�ȡ��Ŀ")) ;
            if (ui->checkBox_autotest->isChecked())
            {
                auto_ok_flag = 30;

            }
            wait_sate = 0;
            on_rcardButton_clicked();
            delay_100ms(LONG_LOCK_TIME) ;//��Ŀ��ƥ�䣬��ʱһ��ʱ��Ȼ���ID��
            break;
        }

        initChannelShow(0);
        setTestButtonSt();

        break ;
    }
    case 9://��ID���ɹ�
    {
        ID_ITEM tmp_id_item ;
        memcpy(&tmp_id_item, &idfile_buffer, 4096) ;
        bool tmp_ret = itemMat->ID2POCT(tmp_id_item,tmp_item);

        for (int i = 0; i < 4096 / 32; i++)
        {
            QString out = " : ";
            for (int j = 0; j < 32; j++)
            {
                out += QString().sprintf("%02x ", idfile_buffer[i * 32 + j]);
            }
            qDebug() <<__LINE__ <<__FUNCTION__<<out;
        }

        char file_head_str[9] ;

        for(int p=0; p<8; p++)
            file_head_str[p] = tmp_id_item.FileHead[p] ;
        file_head_str[8] = '\0' ;
        QString file_head = QString::fromAscii(file_head_str) ;

        qDebug() <<__LINE__ <<__FUNCTION__
                <<tmp_ret
               << file_head
               << tmp_item.CompanyCode
               << version[0];


        /*У��ID��ͷ��,�ͻ�����*/
        if(!tmp_ret || file_head != "LABSIMID" ||
                (tmp_item.CompanyCode && version[0] != tmp_item.CompanyCode)
                ){

            emit info2error_dialog(this->isEN?"Wrong format of Item card"
                                            :tr("��Ŀ����ʽ����"));
            myHelper::write_system_record("log/warning.ini", "W2", QDateTime::currentDateTime()) ;//������¼

            delay_100ms(LOCK_TIME );
            break ;
        }

        /*У���������*/
        if(tmp_item.AreaValid && tmp_item.AreaValid != AREA_CODE)
        {

            emit info2error_dialog(this->isEN?"Item card usage area error"
                                            :tr("��Ŀ��ʹ���������"));
            myHelper::write_system_record("log/warning.ini", "W3", QDateTime::currentDateTime()) ;//������¼

            delay_100ms(LOCK_TIME );
            break ;

        }

        myHelper::write_system_record("log/diary.ini", "A101", QDateTime::currentDateTime()) ;//�ռǼ�¼
        /*�ж�Ҫ��Ҫ����ΪĬ����Ŀ*/
        emit info2error_dialog(tr("ex"));
        ItemManager::ID_info info = itemMat->getIdInfo(&tmp_item);
        bool set_for_default = myHelper::ShowMessageBoxInfo(
                    (this->isEN?"Item:":tr("��Ŀ:"))          +
                    info.title                                               +
                    (this->isEN?"\nCode:":tr("\n����: ")) +
                    info.bcode                                           +
                    QString("   ")                                        +
                    (info.type==0? //����Ϊ������
                     (this->isEN?"Single channel card":tr("��ͨ����")+(this->isEN?"\nIs the default project set?":tr("\n�Ƿ�����ΪĬ����Ŀ?")))
                                 :(this->isEN?tr("%1-Mult Card").arg(info.type):tr("%1����").arg(info.type))
                                                                                 +
                       (this->isEN?"\nIs the default project set?":tr("\n�Ƿ�����ΪĬ����Ŀ?"))));

        itemMat->saveIdHex(&tmp_id_item);

        if(set_for_default)
        {
            load_set_project(itemMat->getIdInfo(&tmp_id_item));
        }
        delay_100ms(LONG_LOCK_TIME);
        break ;
    }

    case 13://�Զ�����Լ���/�Զ�����
    {
        if(serial_thead->HasReagentCard == 2)
            break;
        static QDateTime up_time;
        QDateTime now_time = QDateTime::currentDateTime();

                    qDebug() <<__LINE__ <<__FUNCTION__<<up_time.secsTo(now_time) ;
                    qDebug() <<__LINE__ <<__FUNCTION__<<auto_ok_flag;
                    if (up_time.secsTo(now_time) < 4 && !auto_ok_flag)
                    {
                        qDebug()<<__LINE__ <<__FUNCTION__ << "step _2" ;
                        auto_ok_flag = 1;
                        disableButton_clicked(1);
                        on_rcardButton_clicked() ;           //��ʼ���,����
                         last_one = 1 ;                                //����������ͣ���һ�� 2018/10/09
                        up_time = now_time;
                        break ;                                         //�����break������� 2018/10/09
                    }
        up_time = now_time;
        disableButton_clicked(1);//����
        break ;
    }

    case 16:
    {
        info2error_dialog(this->isEN?"FA registered successfully!"
                                   :tr("faע��ɹ�!")) ;
        if(!ui->main_Button->isVisible())                                                       //ע�������������
        {
            on_btnT_menu_clicked() ;
            ui->main_Button->setVisible(1) ;
        }
        break;
    }

    case 17:
    {

        if (arg != (unsigned int)~0)
        {
            float t,h;
            t = float((arg >> 16) & 0x7fff) / 10;
            if (arg & (1 << 31))
            {
                t = -t;
            }
            h = float(arg & 0xffff) / 10;

            qDebug() <<__LINE__ <<__FUNCTION__
                    << t << h;
            QString out = tr("�¶�%1��\n");

            out = out.arg(QString().sprintf("%.1f", t));

            ui->TH_show_lb->setText(out);

        }
        disableButton_clicked(1) ;

        break;
    }
    case 19:
    {
        if (arg)
        {
            int max = arg >> 24;
            int min = (arg >> 16) & 0xff;
            ui->spinBox_temMax->setValue(max);
            ui->spinBox_temMin->setValue(min);
        }
        disableButton_clicked(1) ;
        break;
    }
    case 20:
    {
         disableButton_clicked(1) ;
         qDebug() <<__LINE__ <<__FUNCTION__<<serial_thead->HasReagentCard;
        on_rcardButton_clicked();//������п������
        break;
    }
    default:;
    }

//    usleep(48000) ;//���̫���������������źţ������ͨѶ����

    if(
            sw != 12 && sw != -5 && sw != 13 && sw!=1
            && sw != 7 && sw != 9 && sw != 20 && sw != 21 && sw != 30
            && sw!= 2 && sw != 17 && ui->rcardButton->text() != tr("ȡ��")
            ){
        emit set_button_signal();
    }

}

// 20170222
float CalcItemTC(
                 const POCT_SUBITEM &item,            // ��Ŀ����
                 const ID_PEAKRESULT &id_peakresult,    // ��ֵ�����λ��
                 float P0_tmp, int idstruct = 0)
{

   float fTC = -1;


   float x[3];
   x[0] = P0_tmp;
   x[1] = id_peakresult.Value[item.CalcPosi[1]];
   x[2] = id_peakresult.Value[item.CalcPosi[2]];

   for (int j = 0; j < 3; j++)
   {
       if (x[j] == 0)
       {
           x[j] = 0.000001;
       }
   }
    if (idstruct == 0)
    {
       if(id_peakresult.Value[item.CalcPosi[1]] != 0)
           switch(item.CalcMode)
           {
           case 0:
               if (x[1])
                    fTC = x[0]/x[1];
               break ;

           case 1:
               fTC = x[0] ;
               break ;

           case 2:
               fTC = x[0] + x[1];
               break ;

           case 3:
               fTC = x[0] + x[1] + x[2];
               break ;

           case 4:
               if (x[2])
               fTC = (x[0] + x[1]) / x[2];
               break ;
           case 5:{
               float xx = x[0] + x[1] + x[2];
               if (xx)
               fTC = x[0] / xx;
               break ;
           }
           case 6: {
               float xx = x[0] + x[1];
               if (xx)
               fTC = x[0] / xx;
               break ;
            }
           case 7: {
               float xx = x[1] + x[2];
               if (xx)
               fTC = x[0] / xx;
               break ;
            }
           case 8 : {
               float fBlank;
               if(item.CalcPosi[1]>item.CalcPosi[0])                      // (x1-B)/(x2-B) 2016-12-01
                       fBlank = id_peakresult.Vallery[item.CalcPosi[0]];
               else
                       fBlank = id_peakresult.Vallery[item.CalcPosi[0]-1];
              float xx = x[1] - fBlank;
              if(xx!=0) fTC = (x[0]-fBlank)/xx;
              break;
           }
           }
       else
           fTC = 0.001;
    }
    else
    {
        // 20170623
        switch (item.CalcMode)
        {
        case 0:
            fTC = x[1] / x[2]; break;
        case 1:
            fTC = x[0] / x[2]; break;
        case 2:
            fTC = (x[0] + x[1]) / x[2];
        case 3:
            fTC = x[0]; break;
        case 4:
            fTC = x[1]; break;
        case 5:
            fTC = x[2]; break;
        case 6:
            fTC = x[0] + x[1]; break;
        case 7:
            fTC = x[0] + x[2]; break;
        case 8:
            fTC = x[1] + x[2]; break;
        case 9:
            fTC = x[0] + x[1] + x[2]; break;
        default: fTC = 0x001; break;
        }
        // 20170623 end
    }
   return fTC;
}

// 20170222 end



/*
  *�������:
  * 1.�ӵװ�����������궨ֵ��У׼�궨ֵ,��ϳ�һ������,Ȼ���ÿ�������ʵ�ʲ����ֵ�������׼ֵ
  * 2.��ȡ��ֵ
  * 3.����Ŀ������¶Ȳ��������߲����������Բ���������ϳ����ߣ�Ȼ������¶�ֵ���ϵ����Ȼ���ֵ�����ϵ��
  * 4.����Ŀ�����һ���Ƚ�ϵ��Q�����TֵС�����ϵ��Q�����һ����ֵ����Q�ٳ���һ��������������ÿ�ζ�һ����
  * 5.������Ŀ����T/C,Ȼ��������������Ũ��ֵ-->���5������Ŀ��ֵ
  * 6.Ũ�ȳ���Ʒϵ��
  * 7.Ũ�Ƚ��У�+ - * /������ϵ��
  */
int First_form::get_cvalue()
{
/*�жϵ�ǰ�����Ƿ��ѹ�ʱ,�Ա���Ļ�������*/
    if(staydate != (QDateTime::currentDateTime().toString("yyyy-MM-dd") ))
    {
        if( initial_dir() < 0)                                                                                                      //�����趨����Ŀ¼
        {
            /**/
        }
        ::close(num_fd) ;                                                                                                       //close before

        read_num(dirname) ;                                                                                               //�����趨��ǰ���к�

        nextfilename  =   currentnumtostring  + ".dat" ;                  //���¼���Ҫд����ļ���
    }

     DWORD blank;
/*��ʼ��ȡ��ֵ*/
     POCT_SUBITEM *sub_item = NULL;

     ID_PEAKRESULT id_peakresult ;
     if (wait_for_test_cur_model == 0)
     {
         sub_item = &poct_item.SIs[0];
         // single channel
         CalcPeak(package, win_lenth, poct_item.Peaks ,
                 poct_item.PeakCount, poct_item.BasePeak,
                 poct_item.Blank, &blank, &id_peakresult
         ) ;
     }
     else
     {
         // multi channel
         sub_item = &poct_item.SIs[Channel2Index(wait_for_test_cur_num)];
         CalcPeak(package, win_lenth, sub_item->siPeaks ,
                 sub_item->PeakCount, sub_item->BasePeak,
                 poct_item.Blank, &blank, &id_peakresult
         ) ;
     }


    /*�ж��Ƿ����*/
    if(poct_item.MinCheck > 0)
    {
        float minval;
        float peakval;

        if (wait_for_test_cur_model == 0)
        {
            minval = id_peakresult.Value[poct_item.MinPosi % sizeof (id_peakresult.Value)];
            peakval = poct_item.MinValue;
        }
        else
        {
            minval = id_peakresult.Value[0];
            for (int x = 1; x < poct_item.PeakCount; x++)
            {
                if (minval > id_peakresult.Value[x])
                {
                    minval = id_peakresult.Value[x];
                }
            }
            peakval = sub_item->SubMinValue ;
        }
        if( minval < peakval)
        {
            show_ret(true, wait_for_test_cur_num, 1,
                            (this->isEN?"Exception C Line":tr("C���쳣")));
            try_save();
            return -2 ;
        }
    }

    if(poct_item.MaxCheck > 0)
    {
        // ��Ϊ����Ϊ�嶥���ж��Ƿ�嶥���Ƿ�
        float maxval;
        if (wait_for_test_cur_model == 0)
        {
            maxval = id_peakresult.Value[poct_item.MaxPosi % sizeof (id_peakresult.Value)];
        }
        else
        {
            maxval = id_peakresult.Value[0];
            for (int x = 1; x < poct_item.PeakCount; x++)
            {
                if (maxval < id_peakresult.Value[x])
                {
                    maxval = id_peakresult.Value[x];
                }
            }
        }
        if( maxval > poct_item.MaxValue)
        {
            show_ret(true, wait_for_test_cur_num, 1, (this->isEN?"Exception C Line":tr("C���쳣")));
            try_save();
            return -3 ;
        }
    }

    // ����
    int stypeIndex = ui->comboBox_type->currentIndex();

    QList<SUB_SAVE_ITEM> sub_list ;

    do {

        unsigned char curve_index = sub_item->CurveNos[stypeIndex];

        int dec_std = 0;               // С��λ
        float cv_value = 0;//[5] ;

        /*T/Cֵ*/
        float P0_tmp =  id_peakresult.Value[sub_item->CalcPosi[0]] ;
        if(P0_tmp < sub_item->LessThan)
        {
            float tmp_rr = rand() / double(RAND_MAX) ;                                      //�ٷֱ�
            float tmp_r = T_ratio_range * tmp_rr;
            if(rand() & 1)
            {
                tmp_r = -tmp_r;
            }
            tmp_r += sub_item->LessThanRatio;
            if(tmp_r < 0)
            {
                tmp_r = sub_item->LessThanRatio ;
            }
            P0_tmp = P0_tmp * tmp_r ;
        }
        double tc_value = CalcItemTC(*sub_item, id_peakresult, P0_tmp);
        printf("T/C = %f \n", tc_value) ;

        //��Ũ��
        ID_CURVE *Curves = NULL;
        if (curve_index < 255)
        {
            Curves = &poct_item.Curves[curve_index];
        }

        if(Curves != NULL)
        {
            //�������
            //-----------------1_18--------------------------

            qDebug()<<__LINE__ <<__FUNCTION__<<curve_index;

            for(int k = 0; k < ARRAYSIZE(Curves->Concs); k++)
            {
                CONCS[k] = Curves->Concs[k] ; //
                RESPS[k] = Curves->Resps[k] ;
            }

            iDots = Curves->StdCount ;

            iNs[0] = Curves->SectLimits[0] ;

            iNs[1] = Curves->SectLimits[1] ;

            iSect  = Curves->SectPosi ;

            cLogX = Curves->ConcTrans ;

            cLogY = Curves->RespTrans ;

            iFitType = Curves->Method ;

            int dec_std_cons = Curves->StdDec >> 4 ;
            int dec_std_resp = Curves->StdDec & 0x0f ;
            dec_std = dec_std_cons ;

            for(int k=0; k<6; k++)
            {
                dA[k] = Curves->a[k] ;

            }

            //qDebug() << "here0" ;
            double RR ;
            MultiFit(CONCS, RESPS, dec_std_cons, dec_std_resp,iDots, iSect, cLogX, cLogY, iFitType, iNs, dA, dA1, &RR) ;


            //______________end___________________

            qDebug()<<__LINE__ <<__FUNCTION__<< "RR " << RR;
            //��Ũ��
            //-----------------1_18--------------------------
            cv_value /* [sub_num] */ = CalcConc(tc_value) ;

            //Ũ�ȳ���Ʒϵ��
            cv_value *= sub_item->Ratios[stypeIndex];


            //
            if(cv_value <= 0)
                cv_value = QString::number(0.001, 'f', dec_std).toFloat() ;
            //�趨С��λ
            if(sub_item->RangeDec > 0)
                cv_value = QString::number(cv_value, 'f',  dec_std).toFloat() ;
            else
                cv_value = QString::number(cv_value, 'f', 2).toFloat() ;

        }
        /*��ʼ����ż�¼�Ľṹ�岢�洢*/



        /*�ж��ٸ�������Ŀ*/
        for(int k = 0; k < 5 && !sub_item->Unit[k].isEmpty(); k++)
        {

            float tmp_c_value = cv_value;

            //����ϵ��3_07
            QString ratio_tmp ;
            float ratio ;
            bool ok ;

            int ratio_num = myHelper::get_ratio(sub_item->Name[k], pro_ratio_list ) ;

            if( ratio_num >= 0)
            {
                ratio_tmp = ui->tableWidget_xishu->item(ratio_num, 1)->text() ;
                if(!ratio_tmp.isEmpty())
                {
                    ratio = ratio_tmp.mid(1).toFloat(&ok) ;
                    if(ok)
                    {
                        switch(ratio_tmp.at(0).toAscii())
                        {
                        case '+':tmp_c_value += ratio ;break ;
                        case '-':tmp_c_value -= ratio ; break;
                        case '*':tmp_c_value *= ratio ;break;
                        case '/':tmp_c_value /= ratio ;break;
                        }

                    }
                }
            }


#if 1

            /*cheat*/
            QFile aode_file("data_config.ini") ;
            if(aode_file.exists())
            {

                QString str ;

                if(ui->lineEdit_std_print_declar_2->text().isEmpty())
                {
                    myHelper::read_config_sig("data_config.ini", "result", QString("%1").arg(currentnum), &str) ;
                }
                else
                    myHelper::read_config_sig("data_config.ini", "result", QString("%1").arg(ui->lineEdit_std_print_declar_2->text()), &str) ;


                if (!str.isEmpty())
                {
                    QStringList values = str.split("@") ;
                    if (wait_for_test_cur_model == 0)
                    {
                        int index =  long (sub_item - poct_item.SIs) % sizeof (*sub_item);
                        if (values.size() > index)
                        {
                            float tmp = values.at(index).toFloat();
                            if (tmp > 0) tmp_c_value = tmp;
                        }
                    }
                    else
                    {
                        if (values.size() > Channel2Index(wait_for_test_cur_num))
                        {
                            float tmp = values.at(Channel2Index(wait_for_test_cur_num)).toFloat();
                            if (tmp > 0) tmp_c_value = tmp;
                        }
                    }
                }
            }

#endif
            SUB_SAVE_ITEM sub_i ;
            sub_i.Cvalue = tmp_c_value ;
            show_conc(tmp_c_value, sub_i.c_value, sub_item, k, dec_std) ;
            sub_i.float_decimal = dec_std;

            QString name, unit ;
            int len1, len2 ;
            name = sub_item->Name[k] ;//.remove(" ") ;
            unit    = sub_item->Unit[k] ;//.remove(" ") ;
            name = name.remove(" ") ;
            unit = unit.remove(" ") ;
            len1 = name.toLocal8Bit().length() + 1;
            len2 = unit.toLocal8Bit().length() + 1;

            if(len1>16)
            {
                name.replace(14, "\0");
                len1 = 16;
            }
            if(len2>10){
                unit.replace(8, "\0");
                len2 = 10;
            }

            memcpy(&sub_i.Name, name.toLocal8Bit().constData() ,len1) ;
            memcpy(&sub_i.Unit, unit.toLocal8Bit().constData(), len2) ;
            //
            sub_i.channel = ((wait_for_test_cur_model == 0) ? 5: wait_for_test_cur_num);
            sub_i.time = FuncSet::getTimeStamp();

            for(int i=0; i<4; i++)
            {
                sub_i.Xx[i] = id_peakresult.Value[i] ;
            }
            sub_i.TC = tc_value;

            sub_list << sub_i ;
        }

    } while (wait_for_test_cur_model == 0 && ++sub_item < poct_item.SIs + qMin(ARRAYSIZE(poct_item.SIs), int(poct_item.ItemCount)));

    test_task[wait_for_test_cur_num].subResult = sub_list;

     if (sub_list.size())
    {
        //������ڶ�����ʾ���ֵ
        show_ret(true,wait_for_test_cur_num,1,//��ͨ���Ĳ������������Ŀ�б��ĵ�0������Ŀ��Cֵ
                        QString("%1 %2").arg(QString(test_task[wait_for_test_cur_num].subResult.at(0).c_value))
//                                                                            sub_list.at(wait_for_test_cur_num).c_value
                                                      .arg(poct_item.SIs[wait_for_test_cur_num].Unit[0]));

        qDebug() <<__LINE__ <<"<"<<__FUNCTION__<<">"<<"current channel ="<<wait_for_test_cur_num;
        qDebug() <<__LINE__ <<"<"<<__FUNCTION__<<">"<<"value ="<<test_task[wait_for_test_cur_num].subResult.at(0).c_value;
        qDebug() <<__LINE__ <<"<"<<__FUNCTION__<<">"<<"unit ="<<poct_item.SIs[wait_for_test_cur_num].Unit[0];
    }
    else show_ret(true, wait_for_test_cur_num, 1, QString("---"));

    card_value = poct_item.BarCode;
    // ����ȥ������������Ŀ
    try_save();

     return 0 ;
}


void First_form::show_conc(float cv_value, char c_value[], const POCT_SUBITEM *subobj , int sub, unsigned char dec)
{

#define TMP_SIZE (sizeof (((SUB_SAVE_ITEM*)0)->c_value))
    if( cv_value >= subobj->RangeMin[sub] && cv_value <= subobj->RangeMax[sub])
    {
        QStringList _cv = QString::number(cv_value).split(".") ;                  //12.345 --> 12 345

        if(_cv.count() > 1)                                                                                      //maybe 12,no dec
        {
            QString tmp_cv = _cv.at(1) ;
            QString final_cv ;
            final_cv = QString::number(cv_value) ;
            if( tmp_cv.count() < dec)
            {
                for(int j=0; j<(dec - tmp_cv.count()); j++)
                    final_cv = final_cv + "0" ;
            }

            memcpy(c_value, final_cv.toLocal8Bit().constData(), TMP_SIZE) ;
            c_value[TMP_SIZE - 1] = '\0' ;
        }
        else if(_cv.count() == 1)
        {
            QString final_cv ;
            final_cv = QString::number(cv_value) + ".";
            for(int j=0; j<dec ; j++)
                final_cv = final_cv + "0" ;

            memcpy(c_value, final_cv.toLocal8Bit().constData(), TMP_SIZE) ;
            c_value[TMP_SIZE - 1] = '\0' ;
        }

    }else if(cv_value < subobj->RangeMin[sub])
    {
         QString final_cv ;
         final_cv = QString("<%1").arg(subobj->RangeMin[sub]) ;

         memcpy(c_value, final_cv.toLocal8Bit().constData(), TMP_SIZE) ;
         c_value[TMP_SIZE] = '\0' ;

    }else if(cv_value > subobj->RangeMax[sub])
    {
        QString final_cv ;
        final_cv = QString(">%1").arg(subobj->RangeMax[sub]) ;

        memcpy(c_value, final_cv.toLocal8Bit().constData(), TMP_SIZE) ;
        c_value[TMP_SIZE] = '\0' ;
    }

// �����ú�
#undef TMP_SIZE


}

void First_form::test_ui_init()
{


    if (myHelper::FileIsExist("tmp.csv"))
         system("rm tmp.csv") ;

    lockbytimer = 0 ;                   //ÿ��ִ����һ������֮����Ҫ���һ��ʱ����������������¼�
    lockbytimer_num = 0 ;        //���ʱ�䵹��
    last_one = 0;                       // 2018/10/09
    //print_done = 9999 ;
    //print_current = -1;
    //uart_upload_done = 9999 ;
    //uart_upload_current = -1 ;

    //sound_flag = 0 ;                   //�Ƿ�������
    init_finsh = 0 ;                      //�Ƿ����Զ����

    paper_isEmpty = 0 ;             //����ӡ����û��ֽ

//
    connect(this, SIGNAL(set_button_signal()), this, SLOT(set_button_signal_slot())) ;


    connect(ui->readidcardButton_2, SIGNAL(clicked()), this, SLOT(readidcardButton())) ;

    //
    connect(ui->num0Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num2Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num3Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num4Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num5Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num6Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num7Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num8Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->num9Button, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->addButton, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->jianButton, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->chengButton, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->chuButton, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->removeButton, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;
    connect(ui->dotButton, SIGNAL(clicked()), this, SLOT(on_num1Button_clicked())) ;

    /**/
    button_lock = 1 ;
    form_count = 0 ;          //��ʾ�����ͣ��ʱ�䵹��
    connect(this, SIGNAL(form_count_signal(QString)), this, SLOT(form_count_slot(QString))) ;
    /*��׼���Եȴ�ʱ��*/

    InitHatchTime(-1);

     wait_sate = 1 ;            //��û��ʱ״̬
     //
     ui->lineEdit_std_print_declar_2->setFocus() ;

 }

/*UI���߳̽�������վ   2018/09/28*/

void First_form::on_allButton_clicked(const char com[])
{
    if(button_lock)
    {
        char buffer[BUFFER_SIZE + 1];

        bzero(buffer, sizeof(buffer)) ;
        strncpy(buffer, com, COM_NAME_LEN) ;

        serial_thead->push_cmd(buffer);

        //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
         disableButton_clicked(0) ;
         QString scmd = QString(com).left(5);



         //�Զ����Ժ��¶Ȳ�������
        if(scmd != "COM13" && scmd != "COM20")
        {
            hide_button(0) ;
        }
    }
    disableButton_clicked(1) ;
}

void First_form::on_startButton_clicked()
{
    if(ui->lineEdit_chanpingdaima->text().isEmpty() || ui->tableWidget_item->item(0, 3)->text().isEmpty())
    {
        myHelper::write_system_record("log/warning.ini", "W7", QDateTime::currentDateTime()) ;//������¼
        emit info2error_dialog(this->isEN?"The current Item parameter is invalid!"
                                        :tr("��ǰ��Ŀ������Ч!"));
        return ;
    }
    if(button_lock)
    {
        wait_for_test_cur_num = ui->comboBox_DebugCh->currentText().toInt() - 1;
        on_allButton_clicked("COM05") ;//��ͨ������
    }

}
/*���Բ�*/
void First_form::on_rcardButton_clicked()
{
  #if 0
   unsigned int times = 0;
    while(1)
    {

        on_allButton_clicked("COM11");//�˿�

        times++;
        ui->times->text().append(QString::number(times));
//        sleep(8);

    }
      #endif
    qDebug() <<__LINE__ <<__FUNCTION__<<sender();
    if(sender() == ui->rcardButton )
    {
            on_allButton_clicked("COM20");//����ǰ�ȣ��ж���û�п�
            disableButton_clicked(1);//���� 2018-10-22
            return ;
    }

    qDebug() <<__LINE__ <<__FUNCTION__<<serial_thead->HasReagentCard ;
    if(serial_thead->HasReagentCard == 2
        &&ui->stackedWidget->currentIndex() == 0
        && sender() != ui->main_Button
        && !ui->checkBox_autotest->isChecked())
    {
        emit info2error_dialog(this->isEN?"Please insert Reagent Card!"
                                            :tr("���Լ�������忨��!"));
        return ;
    }

    if(serial_thead->HasReagentCard  != ui->comboBox_test_model->currentIndex()
        && ui->stackedWidget->currentIndex() == 0
        && sender() != ui->main_Button
        && (serial_thead->HasReagentCard != 3)
        && !ui->checkBox_autotest->isChecked())
    {
        emit info2error_dialog(this->isEN?"Reagent Card whit Item no match!"
                                            :tr("�Լ�������Ŀ��ƥ��!"));
        return ;
    }

    ItemManager::ID_info info = itemMat->getCur_info();

    if (info.bcode.isEmpty() && sender() == ui->rcardButton)
     {
         emit info2error_dialog(this->isEN?"Set the default Item!"
                                         :tr("������Ĭ����Ŀ!"));
         disableButton_clicked(1) ;
         return ;
     }

    if (wait_for_test_cur_model  && sender() != ui->main_Button)
    {
        // mulit channel
        if (info.type == 0 || int (info.type) < wait_for_test_cur_model)
        {
            emit info2error_dialog(this->isEN?"The current Item is not accouplement!":tr("Ĭ����Ŀ�������뵱ǰģʽ������!"));
            disableButton_clicked(1) ;
            return ;
        }
    }
    else
    {
        // single channel
        if (info.type != 0  && sender() != ui->main_Button )
        {
            emit info2error_dialog(this->isEN?"The current Item is not accouplement!"
                                            :tr("Ĭ����Ŀ�������뵱ǰģʽ������!"));
            disableButton_clicked(1) ;
            return ;
        }
    }

    if (wait_for_test_cur_num != -1)//������ڲ���
    {
        qDebug() <<__LINE__ <<__FUNCTION__<<wait_for_test_cur_num<<"testinginging";
        return;
    }

    if(!ui->checkBox_checkbar->isChecked() && sender() != ui->main_Button)
    {
        if(ui->lineEdit_chanpingdaima->text().isEmpty() ||
                ui->tableWidget_item->item(0, 3)->text().isEmpty())//û������Ŀ����
        {
            myHelper::write_system_record("log/warning.ini", "W7", QDateTime::currentDateTime()) ;//������¼
            emit info2error_dialog(this->isEN?"The current Item parameter is invalid!"
                                            :tr("��ǰ��Ŀ������Ч!"));
            disableButton_clicked(1) ;
            return ;
        }
    }

    if (sender() == ui->rcardButton)//�ֶ�����,�ɲ��԰�ť����
    {
        bool testing = false;
        for (int i = 0; i < int (ARRAYSIZE(test_task)); i++)
        {
            if (test_task[i].wait_for_test != -1)
            {
                testing = true;
                break;
            }
        }
        if (!testing && set_test.Autotest)
        {
            return;
        }

        if(wait_sate == 1)
        {
            if(button_lock)
            {
                // if start
                if (!ui->readidcardButton_2->isVisible())
                {
                    return;
                }
            }
        }
        else
        {
            // if cancel
            if (!testing)
            {
                return;
            }

        }
    }

     if(wait_sate == 1)//Ϊ1�� ����ʱ��
     {
         if(button_lock)
         {
             wait_for_test_cur_num = -1;
             InitHatchTime(-1);//���÷���ʱ��

             if (ui->checkBox_checkbar->isChecked())//���ɨ������
             {
                 on_allButton_clicked("COM07") ;
             }
             else
             {
                 lockbytimer = 0 ;                                                      //�����������ȡ��֮�����ϲ��Ի�ָ����а�ť�ɰ�
                 hide_button(0) ;

                 if (!InitHatchTime(!ui->checkBox_switch_mode->isChecked()))
                 {
                     hide_button(1) ;

                     emit info2error_dialog(this->isEN?"The current Item has no valid channel data"
                                                     :tr("��ǰ��Ŀ����Чͨ������!"));
                     return;
                 }
                 initChannelShow(0);
             }
             setTestButtonSt();//�޸İ�ť��ʾ���֣����ԣ�ȡ�����Զ�����
             stop_auto = 0 ;
             wait_sate = 0 ;
         }
     }
     else  // Ϊ 0�� ˵�����ڷ���ʱ��
     {
         wait_sate = 1 ;
         for (unsigned int x = 0; x < ARRAYSIZE(test_task); x++)
         {
             //  ����ȡ���������õ�
             if (test_task[x].wait_for_test != -1)
             {
                 for (int i = 0; i < 5; i++)
                 {
                     show_ret(false, i);
                 }
                 break;
             }
         }
         if (sender() == ui->rcardButton)
         {
            serial_thead->push_cmd("COM03");
         }
         wait_for_test_cur_num = -1;
         InitHatchTime(-1);
         hide_button(1) ;
         setTestButtonSt();
         stop_auto = 1 ;
         button_lock = 1;
         qDebug() <<__LINE__ <<__FUNCTION__<<"444444444";
     }

}

/*������*/
void First_form::restButton_clicked()
{
    serial_thead->push_cmd("COM03");
}
/*���Խ����ӡ��ť�Ĳ�*/
void First_form::on_printButton_clicked()
{
    if(button_lock)
    {
        if(ui->label_serial_num->text().isEmpty())
        {
            emit info2error_dialog(this->isEN?"No information is currently printed"
                                            :tr("��ǰ����Ϣ��ӡ"));
        }
        else
        {
            //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
            disableButton_clicked(0) ;          //���ð�ť���ɰ�
            hide_button(0) ;                          //���ذ���

                //�ж��Ƿ��Ǵ�ӡ���� 2018/09/29
            if(ui->checkBox_PrintTest->isChecked())
            {
                ui->printButton->setEnabled(1);
                ui->printButton->show();
                if(ui->printButton->text().toLocal8Bit() == "��ӡ")
                    {
                        ui->printButton->setText(tr("ȡ����ӡ"));
                        while(ui->printButton->text().toLocal8Bit() == "ȡ����ӡ" )
                             print_event(currentfilename, 0) ;
                    }
                    else//���ȡ����ӡ
                    {
                     ui->printButton->setText(tr("��ӡ"));
                     disableButton_clicked(1);       //button_lock = 1
                     return ;
                    }
            }
            else
            {
                print_event(currentfilename, 0) ;
                disableButton_clicked(1);       //button_lock = 1
                hide_button(1) ;
            }
        }
    }
}
/*��ID����*/
void First_form::readidcardButton()
{
    QPushButton *btn = (QPushButton *)sender();
    QString name ;

    if( btn != 0 )
         name = btn->objectName() ;
    if(button_lock)
    {
        info2error_dialog(this->isEN?"fsPlease wait while reading the project.."
                                   :tr("fs��ȡ��Ŀ�����Ժ�..")) ;

        hide_button(0) ;                            //���ذ���

       on_allButton_clicked("COM09") ;//��ID��
    }
}

/*�ָ����߽�ֹ����*/
void First_form::disableButton_clicked(bool flag)
{
    button_lock = flag ;
    //stop_auto = flag ;
}

/*����ͳ��*/
void First_form::classify_record()
{
    QString classifyfile_path = QString("%1/%1.ini").arg(currentyear) ;
    QString classifyfile_gourp = "Classify" ;
    QString classifyfile_code = QString("%1").arg( ui->lineEdit_classify_numkeyboard->text().toInt() );
    QString classifyfile_get ;
    myHelper::Read_Classifyfile(classifyfile_path,
                                              classifyfile_gourp,classifyfile_code, &classifyfile_get) ;
    int old_num = classifyfile_get.toInt() ;
    classifyfile_get.clear();
    classifyfile_get = QString("%1").arg(old_num+1) ;
    myHelper::Write_Classifyfile(classifyfile_path,
                                              classifyfile_gourp, classifyfile_code, classifyfile_get ) ;
    //
    classifyfile_path.clear();
    classifyfile_path = QString("%1/%2/%1_%2.ini").arg(currentyear).arg(currentmon);
    myHelper::Read_Classifyfile(classifyfile_path,
                                              classifyfile_gourp,classifyfile_code, &classifyfile_get) ;
    old_num = classifyfile_get.toInt() ;
    classifyfile_get.clear();
    classifyfile_get = QString("%1").arg(old_num+1) ;
    myHelper::Write_Classifyfile(classifyfile_path,
                                              classifyfile_gourp, classifyfile_code, classifyfile_get ) ;

}

//�û�����ļӼ���
void First_form::on_pushButton_add_num_clicked()
{

    bool ok ;
    int num ;

    num = ui->lineEdit_classify_numkeyboard->text().toInt(&ok, 10) ;

    if( ok )
    {
        if(num < 98)
            num++ ;
    }
    ui->lineEdit_classify_numkeyboard->setText(QString("%1").arg(num)) ;
}

void First_form::on_pushButton_de_num_clicked()
{

    bool ok ;
    int num ;

    num = ui->lineEdit_classify_numkeyboard->text().toInt(&ok, 10) ;

    if( ok )
    {
        if(num > 0)
            num-- ;
    }

    ui->lineEdit_classify_numkeyboard->setText(QString("%1").arg(num)) ;

}

void First_form::on_lineEdit_classify_numkeyboard_textChanged(QString )
{
    bool ok ;

    int num = ui->lineEdit_classify_numkeyboard->text().toInt(&ok, 10) ;

     if(ok == 0 || num < 0 || num > 98)
     {
        ui->lineEdit_classify_numkeyboard->setText("0") ;
     }
}

 void First_form::set_button_signal_slot()
 {
     hide_button(1) ;
     disableButton_clicked(1) ;
 }



 //�����߼���Ϣ
 void First_form::on_detailButton_clicked()
 {
     detail_form->show() ;
 }


 /*����ʹ����������*/
 void First_form::on_comboBox_type_currentIndexChanged(int index)
 {
     myHelper::write_config_sig("config.ini", "Set_test", "Sampletype", QString("%1").arg(index)) ;
     /* ���ΪӢ�İ汾����������Ϊĩ��Ѫ����ı������С */
     QFont ft ;
     if(index == 2 && this->isEN == 1)
     {
         ft.setPointSize(14) ;
         ui->label_batch_2->setFont(ft);
     }
     else
     {
         ft.setPointSize(16) ;
         ui->label_batch_2->setFont(ft);
     }
 }
 //
 void First_form::on_main_Button_clicked()
 {
     emit hide4password(0) ;
     /**/
     reg_form->hide() ;
     prj_form->hide() ;

     curve_form->hide() ;
     detail_form->hide(); ;
     history_edit_form->hide() ;
     number_form->hide() ;


     if(ui->stackedWidget->currentIndex() == 5)
     {
         wait_sate = 0 ;  //��ֹ�������ָ�
         button_lock = 1 ;
         on_rcardButton_clicked() ;
     }
     ui->stackedWidget->setCurrentIndex(5);
     ui->stackedWidget_3->setCurrentIndex(0);
 }
 //���ذ���
 void First_form::hide_button(bool flag)
 {
     // ui->rcardButton->setVisible(flag );
     ui->printButton->setVisible(flag );
     ui->uploadsingleButton->setVisible(flag );
     ui->uploadallButton->setVisible(flag );
     ui->printallButton->setVisible(flag ) ;
     ui->printsingleButton->setVisible(flag ) ;
     ui->exportButton->setVisible(flag ) ;
     ui->editButton->setVisible(flag );
     ui->exlocalButton->setVisible(flag ) ;

     ui->commandLinkButton_setsave->setVisible(flag ) ;
     ui->commandLinkButton_lis->setVisible(flag ) ;
     ui->commandLinkButton_time_save->setVisible(flag ) ;
     ui->change_languagepushButton->setVisible(flag ) ;
     ui->pushButton_update->setVisible(flag ) ;
     ui->pushButton_register->setVisible(flag ) ;
     ui->restButton_2->setVisible(flag ) ;
     ui->startButton->setVisible(flag ) ;
     ui->ex_primaryButton->setVisible(flag ) ;
     ui->readidcardButton_2->setVisible(flag ) ;
     ui->checkBox_switch_mode->setEnabled(flag) ;

     //
     ui->checkBox_usegun->setEnabled(flag) ;
     ui->lineEdit_std_print_declar_2->setEnabled(flag) ;
     ui->detailButton->setVisible(flag) ;
     ui->comboBox_type->setEnabled(flag) ;
     //
     ui->lineEdit_next_num_2->setFocus() ;

     ui->comboBox_test_model->setEnabled(flag);

 }
 //ɾ����Ŀ
 void First_form::on_pushButton_deleteitem_clicked()
 {
     if(itemList.size() <= 0)
     {
         emit info2error_dialog(this->isEN?"None Item!":tr("��ǰ����Ŀ!"));
          return ;
     }
     if(ui->listWidget_setP_2->currentRow() >= 0)
     {
         if(!myHelper::ShowMessageBoxInfo(this->isEN?"Delete?":tr("�Ƿ�ɾ��?")))
             return ;

         itemMat->deleteIdHex(itemList.at(ui->listWidget_setP_2->currentRow()));

         ui->lineEdit_chanpingdaima->clear();
     }
     else
     {
//          emit info2error_dialog(tr("��ѡ����Ŀ!"));
          emit info2error_dialog(this->isEN?"Plesae selece item!"
                                          :tr("��ѡ����Ŀ!"));
     }
 }


 /*����ģʽ�л�����*/
 void First_form::on_checkBox_switch_mode_clicked()
 {
     myHelper::write_config_sig("config.ini", "Set_test", "Stdtest", QString("%1").arg(ui->checkBox_switch_mode->isChecked())) ;
 }

 void First_form::on_btn_std_clicked()
 {
    if(!ui->checkBox_switch_mode->isChecked())
        ui->checkBox_switch_mode->click() ;
 }
 void First_form::on_btn_std_2_clicked()
 {
    if(ui->checkBox_switch_mode->isChecked())
        ui->checkBox_switch_mode->click() ;
 }

 /*�Ƿ�ʹ������ǹ*/
 void First_form::on_checkBox_usegun_clicked()
 {
     if( ui->checkBox_usegun->isChecked() )
     {
         ui->lineEdit_std_print_declar_2->setVisible(0) ;  //�ֶ�����
         ui->lineEdit_next_num_2->setVisible(1) ;
         myHelper::write_config_sig("config.ini", "Set_test", "Usegun", "1") ;
     }
     else
     {

         ui->lineEdit_std_print_declar_2->setVisible(1) ;
         ui->lineEdit_std_print_declar_2->clearFocus() ;
         ui->lineEdit_next_num_2->setVisible(0) ;
         myHelper::write_config_sig("config.ini", "Set_test", "Usegun", "0") ;
     }
 }

 /*�ָ���������*/
 void First_form::on_pushButton_default_clicked()
 {
     if(!myHelper::ShowMessageBoxInfo(this->isEN?"Clear all data?"
                                                 :tr("�Ƿ������������?")))
         return ;
    emit info2error_dialog(this->isEN?"fsPlease wait while clearing."
                                    :tr("fs�������,���Ժ�.."));
    system("rm ./1* -r ") ;
    system("rm ./2* -r ") ;
    system("rm ./Project/* -r ") ;
    system("rm ./config.ini ") ;
    system("rm ./log/* -r ") ;
    system("sync ") ;
    emit info2error_dialog(this->isEN?"fsClean up and restart the system"
                                    :tr("fs�ָ��������óɹ���������ϵͳ!"));
 }
/*********************************
*��ʷ�������
*
**********************************/
/*��ʼ����ǰ��������*/
int First_form::initial_dir()
{
    QString tmp ;

    bool ok ;

    this->staydate = QDateTime::currentDateTime().toString("yyyy-MM-dd") ;

    //��ʼ����ǰ��������
    tmp = staydate.mid(0,4) ;//
    currentyear = tmp.toInt(&ok, 10) ;
    tmp = staydate.mid(5,2) ;//
    currentmon = char(tmp.toInt(&ok, 10)) ;
    tmp = staydate.mid(8,2) ;//
    currentday = char(tmp.toInt(&ok, 10)) ;

    dirname = QString("%1").arg(this->currentyear) + "/" + QString("%1").arg(this->currentmon) + "/" + QString("%1").arg(this->currentday);
    QString debugdir = dirname + "/Debug";
    QString com ;
    QDir tempDir(dirname);
    QDir debugDir(debugdir) ;

    com = com + "mkdir -p " +dirname ;
    if( tempDir.exists() == 0)                                                  //û�и�Ŀ¼˵�����µ�һ�죬�򴴽���Ŀ¼��ʼ��¼
    {
        if( system(com.toLocal8Bit().constData()) <0 )
        {
            printf("system call failed --> mkdir \n") ;
        }
    }
    com.clear() ;
    com = com + "mkdir -p " +debugdir ;
    if( debugDir.exists() == 0)                                                //û�и�Ŀ¼˵�����µ�һ�죬�򴴽���Ŀ¼��ʼ��¼
    {
        if( system(com.toLocal8Bit().constData()) <0 )
        {
            printf("system call failed --> mkdir \n") ;
        }
    }
    //
    freshButton_clicked() ;

    return 0 ;
}
/*�����л�*/
void First_form::on_toolButton_sub_h_rcord_clicked()
{
    ui->toolButton_sub_h_rcord->setEnabled(0) ;
    ui->toolButton_sub_h_tongji->setEnabled(1) ;
    ui->toolButton_sub_h_origin->setEnabled(1) ;
    ui->stackedWidget_history->setCurrentIndex(0) ;
}

void First_form::on_toolButton_sub_h_tongji_clicked()
{
    ui->toolButton_sub_h_rcord->setEnabled(1) ;
    ui->toolButton_sub_h_tongji->setEnabled(0) ;
    ui->toolButton_sub_h_origin->setEnabled(1) ;
    ui->stackedWidget_history->setCurrentIndex(1) ;
}

void First_form::on_toolButton_sub_h_origin_clicked()
{
    ui->toolButton_sub_h_rcord->setEnabled(1) ;
    ui->toolButton_sub_h_tongji->setEnabled(1) ;
    ui->toolButton_sub_h_origin->setEnabled(0) ;
    ui->stackedWidget_history->setCurrentIndex(2) ;
}

/*������ʷ����*/
int First_form::update_history_ui(QString low, QString up)
{
    int i = 0;
    int row_count ;
    //int row_add = 0;              //��ΪhsCRP�����������У�������Ҫ�������ӱ�������

    int page ;                              //����ҳ
    int rest ;                                //���һҳʣ����

    QList<QFileInfo> fileInfo ;
    QStringList prj_list ;
    QString match_str = ui->comboBox_prj->currentText() ;
    if(match_str == "All")
        match_str = QString ::fromLocal8Bit("ȫ��");
    myHelper::read_record(low, up, &fileInfo, &prj_list,  match_str) ;
    row_count = fileInfo.size() ;

    if(row_count > MAX_INFOS)
    {
        fileInfo.clear();
        info2error_dialog(this->isEN?"Query record too many, please narrow the date range!"
                                   :tr("��ѯ��¼���࣬����С���ڷ�Χ!")) ;
        row_count =  0 ;
    }

    page = row_count/PAGE_DATA_NUMS ;
    rest = row_count%PAGE_DATA_NUMS ;
    history_data_count = row_count ;
    if(rest >0 )
        history_page_all = page + 1 ;
    else
        history_page_all = page ;
    record_list.clear() ;

    /*����ɸѡѡ��*/
     disconnect(ui->comboBox_prj, SIGNAL(currentIndexChanged(int)), this, SLOT(on_comboBox_prj_currentIndexChanged(int))) ;
    ui->comboBox_prj->clear() ;
    ui->comboBox_prj->insertItem(0, (this->isEN?"All":tr("ȫ��"))) ;
    if(prj_list.count() > 0)
        ui->comboBox_prj->insertItems(1, prj_list) ;
    if(prj_list.count() == 1)
        ui->comboBox_prj->setCurrentIndex(1) ;
    else
    {
        int index = ui->comboBox_prj->findText( match_str, Qt::MatchExactly  ) ;
        if(index>0) ui->comboBox_prj->setCurrentIndex(index) ;
        else ui->comboBox_prj->setCurrentIndex(0) ;
    }
     connect(ui->comboBox_prj,SIGNAL(currentIndexChanged(int)), this, SLOT(on_comboBox_prj_currentIndexChanged(int))) ;

    for(i=0; i<page; i++)
    {
        RECORD_LIST tmp_list ;
        for(int j=0; j<PAGE_DATA_NUMS; j++)
        {
           // max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //�ҳ�ԭ���ļ���Ϣ�б��е����
            tmp_list.check_state[j] = 0 ;
            memcpy(&tmp_list.file_name[j],
                   fileInfo.at(i*5 + j).absoluteFilePath().toLocal8Bit().constData(), 55) ;//max_num
            tmp_list.num = j ;
            tmp_list.count = PAGE_DATA_NUMS ;

        }
        record_list << tmp_list ;

    }

    if(rest > 0)
    {
        RECORD_LIST tmp_list ;
        for(int j=0; j<rest; j++)
        {
           // max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //�ҳ�ԭ���ļ���Ϣ�б��е����
            tmp_list.check_state[j] = 0 ;
            memcpy(&tmp_list.file_name[j],
                   fileInfo.at(page*5 + j).absoluteFilePath().toLocal8Bit().constData(), 55) ; //max_num
            tmp_list.num = j ;
            tmp_list.count = rest ;

        }
         record_list << tmp_list ;
    }
    //
    if(history_data_count)
    {
        history_page = 0 ;
        history_turnpage_event(history_page) ; //display
        ui->label_pageall->setText(QString("%1").arg(history_page_all)) ;
        ui->label_page->setText(QString("%1").arg(1)) ;
    }
    else
    {
        for(i=0; i< PAGE_DATA_NUMS; i++)
        {
            ui->tableWidget_history->removeRow(0);
        }
        ui->checkBox_history_1->setChecked(0) ;ui->checkBox_history_1->setEnabled(0);
        ui->checkBox_history_2->setChecked(0) ;ui->checkBox_history_2->setEnabled(0);
        ui->checkBox_history_3->setChecked(0) ;ui->checkBox_history_3->setEnabled(0);
        ui->checkBox_history_4->setChecked(0) ;ui->checkBox_history_4->setEnabled(0);
        ui->checkBox_history_5->setChecked(0) ;ui->checkBox_history_5->setEnabled(0);
    }

    return 0 ;
}
/*����ԭʼ���ݱ���*/
int First_form::update_primary_ui(QString low, QString up)
{
    int i = 0;

    int row_count ;

    int page ; //����ҳ
    int rest ; //���һҳʣ����


    QList<QFileInfo> fileInfo ;
     QStringList prj_list ;
     QString match_str = ui->comboBox_prj_2->currentText();
     if(match_str == "All")
         match_str = QString ::fromLocal8Bit("ȫ��");
    myHelper::read_record(low,up, &fileInfo, &prj_list, match_str ) ;
    row_count = fileInfo.size() ;

    QStringList sort_tmp ;/*12_28*/

    page = row_count/PAGE_DATA_NUMS ;
    rest = row_count%PAGE_DATA_NUMS ;
    primary_data_count = row_count ;
    if(rest >0 )
        primary_page_all = page + 1 ;
    else
        primary_page_all = page ;
    primary_list.clear() ;

    /*����ɸѡѡ��*/
     disconnect(ui->comboBox_prj_2,SIGNAL(currentIndexChanged(int)), this, SLOT(on_comboBox_prj_2_currentIndexChanged(int))) ;
    ui->comboBox_prj_2->clear() ;
    ui->comboBox_prj_2->insertItem(0, (this->isEN?"All":tr("ȫ��")) ) ;
    if(prj_list.count() > 0)
        ui->comboBox_prj_2->insertItems(1, prj_list) ;
    if(prj_list.count() == 1)
        ui->comboBox_prj_2->setCurrentIndex(1) ;
    else
    {
        int index = ui->comboBox_prj_2->findText( match_str, Qt::MatchExactly  ) ;
        if(index>0) ui->comboBox_prj_2->setCurrentIndex(index) ;
        else ui->comboBox_prj_2->setCurrentIndex(0) ;
    }
     connect(ui->comboBox_prj_2,SIGNAL(currentIndexChanged(int)), this, SLOT(on_comboBox_prj_2_currentIndexChanged(int))) ;

    for(i=0; i<page; i++)
    {
        RECORD_LIST tmp_list ;
        for(int j=0; j<PAGE_DATA_NUMS; j++)
        {
            //max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //�ҳ�ԭ���ļ���Ϣ�б��е����
            tmp_list.check_state[j] = 0 ;
            memcpy(&tmp_list.file_name[j],
                   fileInfo.at(i*5 + j).absoluteFilePath().toLocal8Bit().constData(), 55) ;
            tmp_list.num = j ;
            tmp_list.count = PAGE_DATA_NUMS ;
        }
        primary_list << tmp_list ;
    }

    if(rest > 0)
    {
        RECORD_LIST tmp_list ;
        for(int j=0; j<rest; j++)
        {
           // max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //�ҳ�ԭ���ļ���Ϣ�б��е����
            tmp_list.check_state[j] = 0 ;
            memcpy(&tmp_list.file_name[j],
                   fileInfo.at(page*5 + j).absoluteFilePath().toLocal8Bit().constData(), 55) ;
            tmp_list.num = j ;
            tmp_list.count = rest ;
        }
        primary_list << tmp_list ;
    }
    //
    if(primary_data_count)
    {
        primary_page = 0 ;
        primary_turnpage_event(primary_page) ; //display
        ui->label_pageall_2->setText(QString("%1").arg(primary_page_all)) ;
        ui->label_page_2->setText(QString("%1").arg(1)) ;
    }
    else
    {
        for(i=0; i< PAGE_DATA_NUMS; i++)
        {
            ui->tableWidget_primary->removeRow(0);
        }
        ui->checkBox_history_12->setChecked(0) ;
        ui->checkBox_history_12->setEnabled(0);
        ui->checkBox_history_13->setChecked(0) ;
        ui->checkBox_history_13->setEnabled(0);
        ui->checkBox_history_14->setChecked(0) ;
        ui->checkBox_history_14->setEnabled(0);
        ui->checkBox_history_15->setChecked(0) ;
        ui->checkBox_history_15->setEnabled(0);
        ui->checkBox_history_16->setChecked(0) ;
        ui->checkBox_history_16->setEnabled(0);
    }

    return 0 ;
}

/*����debug���ݱ���*/
int First_form::update_Debug_ui(QString low, QString up)
{
    int i = 0;
    // SAVE_ITEM load_item ;
    int row_count ;
    //int row_add = 0;//��ΪhsCRP�����������У�������Ҫ�������ӱ�������

    int page ;                  //����ҳ
    int rest ;                    //���һҳʣ����

    QList<QFileInfo> fileInfo ;
    myHelper::read_Debug(low,up, &fileInfo) ;
    row_count = fileInfo.size() ;

    //if(row_count > 0)
        //myHelper::sort_date(&sort_tmp, &fileInfo ) ;

    page = row_count/PAGE_DATA_NUMS ;
    rest = row_count%PAGE_DATA_NUMS ;
    debug_data_count = row_count ;
    if(rest >0 )
        debug_page_all = page + 1 ;
    else
        debug_page_all = page ;
    debug_list.clear() ;

    for(i=0; i<page; i++)
    {
        RECORD_LIST tmp_list ;
        for(int j=0; j<PAGE_DATA_NUMS; j++)
        {
            //max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //�ҳ�ԭ���ļ���Ϣ�б��е����
            tmp_list.check_state[j] = 0 ;

            strncpy((char*)&tmp_list.file_name[j],
                   fileInfo.at(i*5 + j).absoluteFilePath().toLocal8Bit().constData(), sizeof (tmp_list.file_name[0])) ;
            tmp_list.num = j ;
            tmp_list.count = PAGE_DATA_NUMS ;
        }
        debug_list << tmp_list ;
    }

    if(rest > 0)
    {
        RECORD_LIST tmp_list ;
        for(int j=0; j<rest; j++)
        {
            //max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //�ҳ�ԭ���ļ���Ϣ�б��е����
            tmp_list.check_state[j] = 0 ;
            strncpy((char*)&tmp_list.file_name[j],
                   fileInfo.at(page*5 + j).absoluteFilePath().toLocal8Bit().constData(), sizeof (tmp_list.file_name[0])) ;
            tmp_list.num = j ;
            tmp_list.count = rest ;
        }
        debug_list << tmp_list ;
    }

    //
    if(debug_data_count)
    {
        debug_page = 0 ;
        debug_turnpage_event(debug_page) ; //display

        ui->label_pageall_3->setText(QString("%1").arg(debug_page_all)) ;
        ui->label_page_3->setText(QString("%1").arg(1)) ;
    }
    else
        for(i=0; i< PAGE_DATA_NUMS; i++)
        {
            ui->tableWidget_debug->removeRow(0);
        }
    return 0 ;
}

/*����classify���ݱ���*/
int First_form::update_Classify_ui(QString low, QString up)
{
#define MAX_NUM 100

    int g_i = 0;
    SAVE_ITEM load_item ;
    bzero(&load_item, sizeof(SAVE_ITEM) ) ;
    int row_count ;

    QList<QFileInfo> fileInfo ;
    QList<ITEM_SCAN> item_list ;
    QStringList tmp ;

    myHelper::read_record(low,up, &fileInfo, &tmp, tr("ȫ��")) ;
    row_count = fileInfo.size() ;

    int fd = -1;

    for(int j=0; j<row_count; j++)
    {
                                                                                                        //1`��ѯ�Ƿ����и���Ŀ
        int i ;

        read_localfile(fileInfo.at(j).absoluteFilePath(), &load_item, &fd) ;
        ::close(fd);


        for(i=0; i<item_list.count(); i++)
        {
            if(item_list.at(i).item_name == QString::fromLocal8Bit(load_item.Prj_name))
            {
                break ;
            }

        }

        if(i<item_list.count())                                                         //1.1`��ѯ�����и���Ŀ����ñ��+1
        {

            if(load_item.Classify_code != 255)
            {
                ITEM_SCAN tmp_list ;
                tmp_list = item_list.at(i) ;
                tmp_list.User_code[load_item.Classify_code] ++ ; //���+1
                item_list.replace(i, tmp_list) ;                                      //�滻���ɵ�
            }
        }
        else                                                                                        //1.1`û�и���Ŀ��������һ����Ŀ��Ȼ����+1
        {

                ITEM_SCAN tmp_list ;

                memset(tmp_list.User_code, 0, sizeof (tmp_list.User_code));

                tmp_list.item_name = QString::fromLocal8Bit(load_item.Prj_name) ;

                if(load_item.Classify_code != 255)
                {

                    tmp_list.User_code[load_item.Classify_code] ++ ;

                }

                item_list << tmp_list ;                                                   //����һ����Ŀ

        }
        //

    }


    ui->tableWidget_classify->clear() ;

    //�Ƿ������ݣ�û������ֱ�����
    if(!row_count)
    {
        ui->tableWidget_classify->setColumnCount (0);
        ui->tableWidget_classify->setRowCount(0);
    }
    else
    {
        int column = item_list.count() ;
        int max_row = 0;
        int row ;
                                                                                                      //1`��ͷ����Ŀ����
        ui->tableWidget_classify->setColumnCount (column);
        QStringList header ;
        for(int i = 0; i < column; i++)
        {
            header << item_list.at(i).item_name ;
        }

        ui->tableWidget_classify->setHorizontalHeaderLabels(header) ;
                                                                                                     //2`ȡ�������������
       char state[ARRAYSIZE(item_list.at(0).User_code)] = { 0 } ;                                                               //��¼�������������ļ�����Ҫ��ʾ��
       for(int i=0; i<column; i++)
       {

           for(int j=0; j<MAX_NUM; j++)
           {
               if(item_list.at(i).User_code[j] !=0 )
               {
                   if (!state[j])
                   {
                       max_row++;
                       state[j] = 1 ;
                   }
               }
           }
       }
                                                                                                    //3`�����б�ͷ
       QStringList row_header ;
       ui->tableWidget_classify->setRowCount(max_row) ;
       for(g_i = 0; (quint32)g_i < ARRAYSIZE(item_list.at(0).User_code); g_i++)
       {
           if(state[g_i] > 0)
           {
                row_header << QString("%1").arg(g_i) ;
           }
       }
       ui->tableWidget_classify->setVerticalHeaderLabels(row_header) ;

       ui->comboBox_classify->clear();                                      //�����б����ӣ����ڴ�ӡѡ��
       ui->comboBox_classify->addItems(row_header) ;          //�ͻ�����
                                                                                                    //4`��������ÿ������
       for(int j=0; j<column; j++)
       {
           row = 0 ;
           for(g_i=0; (unsigned int)g_i<ARRAYSIZE(item_list.at(0).User_code); g_i++)
           {
               if(state[g_i] > 0)
               {

                    ui->tableWidget_classify->setItem(row, j, new QTableWidgetItem(QString("%1").arg(item_list.at(j).User_code[g_i])) ) ;
                    row++ ;
                }
           }

       }
    }

    //��ʾ��ѯ����
    ui->label_date->setText(low + " ~ " + up) ;


    return 0 ;
}



/*�ϴ�����*/
int First_form::upload_event(QString fpath)
{
    Q_UNUSED(fpath);
    return 0 ;
}

bool First_form::upload_event_check(const char *pname, int row)
{
    if(row < multi_card_list.count())                                     //�и���Ŀ
    {
        const MUTI_CARD &prj = multi_card_list.at(row);
        QString name = QString::fromLocal8Bit(pname);
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

int First_form::print_event(QString fpath, SAVE_ITEM* )/* load_item */
{
     for(int p_count=0; p_count<ui->spinBox_print_count->value(); p_count++)
    {
        int ret = thermalPrinter.print(fpath,                               //����printer.c�Ĵ�ӡ����
                                                 ui->label_cmp_name->text(), //��������
                                                ui->lineEdit_std_print_declar->text());//��������
        if(ret == -2)
        {
            emit info2error_dialog(this->isEN?"Printer paperless!"
                                            :tr("��ӡ����ֽ"));
            return -2;
        }
        else if(ret == -1)
        {
           return -1;
        }
        else
        {
            myHelper::msDelay(800);
        }
    }
    return 0 ;
#if 0
        /*�ȼ����û��ֽ*/
        print_detect() ;
        delay(100);

        if(paper_isEmpty)
        {
            emit info2error_dialog(tr("��ӡ����ֽ"));
            return -2 ;
        }
        char buffer[BUFFER_SIZE + 1];
        bzero(buffer, sizeof(buffer)) ;

        SAVE_ITEM load_print_item ;
        int fd = -1;

        read_localfile(fpath.toLocal8Bit().constData(), &load_print_item, &fd) ;
        if (load_print_item.sub_count > 50) load_print_item.sub_count = 0;
        SUB_SAVE_ITEM tmp_list[load_print_item.sub_count] ;
        if( fd < 0)
        {
            printf("open data failed:%s\n",fpath.toLocal8Bit().constData() );
            return -1 ;
        }
        else
        {
            /*�ж����ݴ���*/
            if(load_print_item.sub_count == 0 )
            {
                ::close(fd);
                return -1 ;
            }


            // ʵ��У���ļ���С
            for(int q=0; q<load_print_item.sub_count; q++)
            {
                SUB_SAVE_ITEM tmp ;
                if( read_localfile_sub(fd, &tmp, 0) < 0)
                {
                    ::close(fd);
                    return -1 ;
                }
            }
            lseek(fd, LOCAL_FILE_SIZE, SEEK_SET) ;

            for(int q=0; q<load_print_item.sub_count; q++)
            {

                if (( read_localfile_sub(fd, &tmp_list[q], 0) < 0))
                {
                    break;
                }
            }
        }
        ::close(fd);

        // print_detect() ;
        QString com_line ;



        // ��ӡ��˾����
        print_org() ;
        delay(100);


        // ��ӡ���Ա�������
        print_title() ;
        delay(100);


        /*5 ��ӡ̧ͷ��Ϣ */
        prepare_print_data3(com_line, load_print_item) ;
        bzero(buffer, BUFFER_SIZE) ;
        memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;

        if(!serial_thead->push_cmd(buffer))
        {
            printf("write failed\n") ;
            return -1 ;
        }
        delay(100);


        /*4 ��ӡ�������ʱ�� */
        {
            // ��������ʱ��
            unsigned int tmp_time = 0;
            for(int k=0; k<load_print_item.sub_count; k++)
            {
                if (tmp_list[k].time > tmp_time)
                {
                    tmp_time = tmp_list[k].time;
                }
            }
            prepare_print_data2(com_line, tmp_time) ;
        }
        bzero(buffer, BUFFER_SIZE) ;
        memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;

        if(!serial_thead->push_cmd(buffer))
        {
            printf("write failed\n") ;
            return -1 ;
        }
        delay(100);

        /*3 ��ӡ������������ݵı��� */
        prepare_print_data( com_line) ;
        bzero(buffer, BUFFER_SIZE) ;
        memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;

        if(!serial_thead->push_cmd(buffer))
        {
            printf("write failed\n") ;
            return -1 ;
        }
        delay(100);



        /*2 ��ӡ������������� */
        for(int k=0; k<load_print_item.sub_count; k++)
        {
            prepare_print_data1( com_line , 0, tmp_list[k]) ;
            bzero(buffer, BUFFER_SIZE) ;
            memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;
            if(!serial_thead->push_cmd(buffer))
            {
                printf("write failed\n") ;
                return -1 ;
            }
            delay(100);
        }


        /*1 ��ӡ����β */
        prepare_print_data0( com_line) ;
        bzero(buffer, sizeof(buffer)) ;
        memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;
        if(!serial_thead->push_cmd(buffer))
        {
            printf("write failed\n") ;
            return -1 ;
        }

#endif

}

/*��ӡ�̶��ı���*/
/*
int First_form::print_title()
{


    char buffer[BUFFER_SIZE + 1];
     bzero(buffer, sizeof(buffer)) ;
    QString com_line ;
    char enlarge_2[10] = {'P','R','I','0','0',0x1b,0x57,02,'\n','\0'} ;
    char enlarge_1[10] = {'P','R','I','0','0',0x1b,0x57,01,'\n','\0'} ;

    memcpy(buffer,enlarge_2 , sizeof (enlarge_2)) ;                                                  //����Ŵ�����
    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;
        return -1 ;
    }



    com_line.clear();
    if(ui->rcardButton->text() == "Test")
        com_line = com_line + "PRI00" +QString("    Test Report \r\n") ;
    else
        com_line = com_line + "PRI00" +QString::fromLocal8Bit("   ��ⱨ�浥  \r\n") ;
    memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;
        return -1 ;
    }

    //
    memcpy(buffer,enlarge_1 , sizeof (enlarge_1)) ;                                                  //�ָ�һ������
    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;
        return -1 ;
    }
    return 0 ;
}
*/
/*��ӡ�̶��ı���*/
/*
int First_form::print_org()
{

    char buffer[BUFFER_SIZE + 1];
     bzero(buffer, sizeof(buffer)) ;
    QString com_line ;//com_line = com_line +  ;


    com_line.clear();
    com_line = com_line + "PRI00" + ui->label_cmp_name->text() + " \r\n" ;
    memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;
    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;
        return -1 ;
    }
    //

    return 0 ;
}
*/

/*����Ƿ��д�ӡֽ*/
void First_form::print_detect()
{
    char buffer[8] ={'P','R','I','0','1',0x1b,0x76, 0};

    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;

    }
}



int First_form::read_localfile(QString fpath, SAVE_ITEM* load_item , int *fd)
{
    int t_fd ;
    t_fd = open( fpath.toLocal8Bit().constData(), O_RDONLY);

    if(t_fd < 0)
    {
        printf("open data failed.\n") ;

        return -1 ;
        /**/
    }
    else
    {

         char buffer[LOCAL_FILE_SIZE] ;

         bzero(buffer, LOCAL_FILE_SIZE) ;

        //��ȡ����
        if( read(t_fd, buffer, LOCAL_FILE_SIZE) < 0)
        {
            ::close(t_fd) ;
             return -1 ;
        }

        *fd = t_fd ;

         memcpy(load_item, buffer, LOCAL_FILE_SIZE) ;

    }

    return 0 ;
}
int First_form::read_localfile_sub(int fd, SUB_SAVE_ITEM *sub_item, int /* addr */)
{
         int nread ;
         int sub_size = sizeof(SUB_SAVE_ITEM) ;
         unsigned char buffer[sub_size] ;

         nread = read(fd, buffer, sub_size) ;
         if(nread == sub_size)
         {
            memcpy(sub_item, buffer, sub_size) ;
            return 0 ;
        }
         else
         {

              return -1 ;
         }
         return 0 ;
}

int First_form::read_debugfile(QString fpath, SAVE_DEBUG_ITEM* load_item)
{
    int fsize = sizeof(SAVE_DEBUG_ITEM) ;
    char buffer[fsize] ;
    int fd = open( fpath.toLocal8Bit().constData(), O_RDONLY);

    if(fd < 0)
    {
        printf("open data failed.\n") ;

        return -1;
        /**/
    }
    else
    {
        bzero(buffer, fsize) ;
        //��ȡ����
        if( read(fd, buffer, fsize) < 0)
        {
            return -1;
        }
         memcpy(load_item, buffer, fsize) ;
         ::close(fd) ;
    }
    return 0 ;
}

void First_form::prepare_upload_data( QString *buffer,  SAVE_ITEM *load_item, SUB_SAVE_ITEM sbu_item)
{
    QString tmp2 = QString::fromLocal8Bit( load_item->Prj_name);

    QString tmp3;
    if (load_item->age_valuse[0])
    {
        tmp3 = QString(load_item->age_valuse) + this->detail_form->age_unit->itemText(load_item->age_index);
    }

    QString num = reg_form->num->text().replace(QRegExp("<[^>]*>"), "") + QString::fromLocal8Bit(load_item->serial_code );

    *buffer = "FF&"
            + num + "&"
            + QString::fromAscii(sbu_item.c_value) + "&"
            + QDateTime::fromTime_t(sbu_item.time).toString("yyyy-MM-dd HH:mm:ss") + "&"
            + tmp2  + "&" + QString::fromLocal8Bit(sbu_item.Name) + "&"

            // 20170206
            // FF&040603e93&<1&2016-9-2 11:07:50&CRP/PCT&hscrp&����&24��&��&Ѫ��&EE
            + QString::fromLocal8Bit(load_item->p_name).trimmed() + "&"
            + tmp3 + "&"
            + QString::fromLocal8Bit(load_item->sex).trimmed() + "&"
            + QString::fromLocal8Bit(load_item->Type) + "&"
            // 20170206 end

            + "EE";
}


/*��ȡ���к�*/
int First_form::read_num(QString dirname)
{
    uchar buffer[8] ;
    QString tmp = dirname + "/num.m" ;
    const char *filename = tmp.toLocal8Bit().constData() ;
    int length =  sizeof(buffer) ;

    if( myHelper::FileIsExist(tmp) )                                    //�Ѵ������кţ�ֱ�Ӷ�ȡ
    {
        num_fd = open(filename, O_RDWR);
        if(num_fd < 0)
        {
             return -1;
        }
        if(read(num_fd, buffer, length) < 0)
        {
            return -1 ;
        }
        memcpy(&currentnum, buffer, length) ;

    }
    else                                                                                    //û�����кţ����¿�ʼ����
    {
        num_fd = open(filename, O_CREAT | O_RDWR, 0666);
        if(num_fd < 0)
        {
            return -1;
        }
        currentnum = set_test.Startnum ;//
        currentDebugnum = 1 ;
        int tmpp[2] = {currentnum, currentDebugnum};
        if( write(num_fd, tmpp, length) < 0)
        {
            /**/
        }

    }
    //��ʽ�����к�
    QString tmp1 ;
    myHelper::format_num(set_test.Samelenth, set_test.Numlenth, currentnum, &tmp1) ;
    QString date2string = QDate::currentDate().toString("yy-MM-dd")  ;
    currentnumtostring = date2string.remove("-") + tmp1 ;


    return 0 ;
}

/*���������������*/
int First_form::save_data_as_file(const char* filename,uchar *save_item, int length)
{
    int fd ;

    fd = open(filename, O_CREAT | O_RDWR ,0666) ;
    if(fd < 0)
    {
        return -1 ;
    }
    if (write(fd, save_item, length) < 0)
    {
            return -1 ;
    }

    ::close(fd) ;
    return 0 ;
}


/*ȷ�ϲ鿴��ʷ�Ĳ�*/
/*���ڴ���ѡ�����ں�֪ͨ���*/
void First_form::date_select_slot()
{
    QString tmpdir ;
    QString low_date, up_date ;

    int read_year, up_year ;
    int read_mon, up_mon ;
    int read_day , up_day ;

    read_year = select_date->read_year ;
    up_year   = select_date->up_year ;
    read_mon  = select_date->read_mon ;
    up_mon    = select_date->up_mon ;
    read_day  = select_date->read_day ;
    up_day    = select_date->up_day ;


    tmpdir = QString("%1").arg(read_year) + "/" + QString("%1").arg(read_mon) + "/" + QString("%1").arg(read_day);
    low_date = QString("%1").arg(read_year) + "-" + QString("%1").arg(read_mon) + "-" + QString("%1").arg(read_day) ;
    up_date = QString("%1").arg(up_year) + "-" + QString("%1").arg(up_mon) + "-" + QString("%1").arg(up_day) ;

    if(select_date->who_calls == 1)//��ʷ���ݱ����ϴ���ӡ����(objName == "histroyButton")   //(select_date->who_calls == 1)//
     update_history_ui(low_date,up_date ) ;             //����
    else if(select_date->who_calls == 2)//ԭʼ���ݱ���ϸ�Ĳ��Խ��
      update_primary_ui(low_date,up_date ) ;
    else if(select_date->who_calls == 3)//debug���ݱ�
      update_Debug_ui(low_date,up_date) ;
    else                                //4 ��Ŀͳ�Ʊ�
      update_Classify_ui(low_date,up_date) ;
}
/*����ԭʼ����*/
void First_form::on_ex_primaryButton_clicked()
{
    info2error_dialog(this->isEN?"fsPlease wait while exporting..."
                                 :tr("fs���ڵ���,���Ժ�..")) ;
  QDir dir(EXPORT_PAT) ;
  dir.setFilter(QDir::Dirs );
  dir.setSorting(QDir::DirsFirst);
  QFileInfoList list = dir.entryInfoList() ;
  QFileInfoList t_list ;

  //
  for(int i=0; i<list.count(); i++)
  {
      qDebug() <<__LINE__ <<__FUNCTION__
              << list.at(i).fileName();
      if(list.at(i).fileName() !="." && list.at(i).fileName() !="..")
          t_list << list.at(i) ;
  }

  if(t_list.count() >= 1)
  {

              freshButton_clicked() ;//ˢ��һ���豸ѡ�����

              bool success_flag = false;//������һ�������ɹ�����Ȼ����û��ѡ��Ե��豸


              form_count_num = 0 ;

              if( debug_data_count )
              {

                  //QDir *dir=new QDir(dirname);//���Ҫ��ȡ��¼���ļ���ַ

                  QString single_info ;
                  QStringList export_info ;
                  //char buffer[LOCAL_FILE_SIZE] ;
                  SAVE_DEBUG_ITEM load_item ;


                  for(unsigned int i=0; i <debug_page_all; i++)
                  {
                       RECORD_LIST tmp_list = debug_list.at(i) ;
                       for(int j=0; j < tmp_list.count; j++)
                       {

                          //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
                          disableButton_clicked(0) ;
                          hide_button(0) ;  //���ذ���
                          single_info.clear() ;
                          if(read_debugfile(tmp_list.file_name[j],&load_item) < 0)
                          {
                              printf("read data file failed.\n") ;
                              break ;
                              /**/
                          }
                          else
                          {
                              single_info = single_info + QString("%1,").arg(load_item.num)
                              + QString::fromLocal8Bit(load_item.Time) + ","
                              + QString("%1,").arg(load_item.TC)
                              + QString("%1,").arg(load_item.Peaks_value[0])
                              + QString("%1,").arg(load_item.Peaks_value[0])
                              + QString("%1").arg(load_item.Peaks_value[0])
                               + "\r\n";
                          }
                           export_info << single_info ;
                      }
                  }

              if(USB_has[1])
              {

                  QString save_filename = t_list.at(0).absoluteFilePath()
                     + "/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss").replace(" ","_").replace(":","-") + ".csv" ;
                  myHelper::export_primary(save_filename, export_info) ;
                  success_flag = true ;
                  form_count = 1 ;
                  form_count_num = form_count_num + 8 +  debug_data_count/10;
              }
              if(USB_has[3])
              {
                  QString save_filename = t_list.at(1).absoluteFilePath()
                     + "/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss").replace(" ","_").replace(":","-") + ".csv" ;
                  myHelper::export_primary(save_filename,export_info) ;
                  //qDebug() << save_filename;
                  success_flag = true ;
                  form_count = 1 ;
                  form_count_num = form_count_num +8 +  debug_data_count/10;
              }
              if(success_flag)
                  form_count_str = (this->isEN?"faExport success": tr("fa�����ɹ�"));//myHelper::ShowMessageBoxQuesion(tr("�����ɹ�!")) ;
              else
              {
                  info2error_dialog(this->isEN?"Select an export device!"
                                             :tr("��ѡ��ɵ����豸!")) ;
                  //myHelper::ShowMessageBoxQuesion(tr("��ѡ��ɵ����豸!")) ;
                 // info2error_dialog(tr("ex")) ;
              }
              disableButton_clicked(1) ;
              hide_button(1) ;
      }
      else
      {
              info2error_dialog(this->isEN?"No current record!"
                                         :tr("��ǰ�޼�¼!")) ;
      }
  }
  else
  {

              info2error_dialog(this->isEN?"Please insert U disk!"
                                         :tr("�����U��!")) ;
              //info2error_dialog(tr("ex")) ;
  }
}

void First_form::on_exportButton_clicked()
{

    info2error_dialog(this->isEN?"fsPlease wait while  exporting..."
                               :tr("fs���ڵ���,���Ժ�..")) ;
  QDir dir(EXPORT_PAT) ;
  dir.setFilter(QDir::Dirs );
  dir.setSorting(QDir::DirsFirst);
  QFileInfoList list = dir.entryInfoList() ;
  QFileInfoList t_list ;

  QPushButton *btn = (QPushButton *)sender();
  QString objName = btn->objectName();

  int count ;
  //
  for(int i=0; i<list.count(); i++)
  {
      qDebug() <<__LINE__ <<__FUNCTION__
              << list.at(i).fileName();
      if(list.at(i).fileName() !="." && list.at(i).fileName() !="..")
          t_list << list.at(i) ;
  }

  if(objName == "exportButton" )
  {
        count = history_page_all ;
  }
  else
  {
        count = primary_page_all ;
  }

  if(t_list.count() >= 1)
  {

      if( count )
      {
          info2error_dialog(this->isEN?"fsPlease wait while  exporting..."
                                     :tr("fs���ڵ���,���Ժ�..")) ;
          QString single_info ;
          QStringList export_info ;
          QString num ;
          //char buffer[LOCAL_FILE_SIZE] ;
          SAVE_ITEM load_item ;


          bool is_none = 1 ;



            for(int i=0; i < count; i++)
            {
                RECORD_LIST tmp_list ;
                if(objName == "exportButton" )
                    tmp_list = record_list.at(i) ;
                else
                    tmp_list = primary_list.at(i) ;

                 for(int j=0; j < tmp_list.count; j++)
                 {
                      //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
                     if(int(tmp_list.check_state[j]) == 0)
                         continue ;
                      disableButton_clicked(0) ;
                      hide_button(0) ;  //���ذ���
                      single_info.clear() ;

                      QList <SUB_SAVE_ITEM> tm_list ;
                      int fd ;
                      if(read_localfile(tmp_list.file_name[j],&load_item, &fd) < 0)
                      {
                          printf("read data file failed.\n") ;
                          break ;
                          /**/
                      }

                      for(int q=0; q<load_item.sub_count; q++)
                      {
                          SUB_SAVE_ITEM tmp ;
                          int sub_size = sizeof(SUB_SAVE_ITEM) ;
                          unsigned char buffer[sub_size] ;

                          int nread = read(fd, buffer, sub_size) ;

                          if(nread == sub_size)
                             memcpy(&tmp, buffer, sub_size) ;
                          else
                             break ;

                          tm_list << tmp ;
                      }
                      ::close(fd) ;


                      is_none = 0 ;
                      num = QString::fromLocal8Bit(load_item.c_Nums) ;


                      if(  objName == "exportButton" )
                      {
                          QString age;
                          if (load_item.age_valuse[0])
                          {
                              age = QString(load_item.age_valuse) + detail_form->age_unit->itemText(load_item.age_index) + ",";
                          }
                          else
                          {
                              age = ",";
                          }

                          QString cvalues;
                          unsigned int mintime = ~0;
                          for (int i = 0; i < 5; i++)
                          {
                              if (tm_list.size() > i)
                              {
                                  cvalues += QString("%1,").arg(tm_list.at(i).Cvalue);
                                  if (mintime > tm_list.at(i).time)
                                  {
                                      mintime = tm_list.at(i).time;
                                  }
                              }
                              else
                              {
                                  cvalues += ",";
                              }

                          }

                          single_info = QString::fromLocal8Bit(load_item.serial_code) + ","
                                  + num + ","
                                  + QString::fromLocal8Bit(load_item.c_Nums)
                                  + QString::fromLocal8Bit(load_item.p_name) + ","
                                  + QString::fromLocal8Bit(load_item.sex) + ","
                                  + age
                                  + (QString("[%1%2%3],").arg(load_item.BarCode[0]&0xFF, 2, 16, QLatin1Char('0'))
                                      .arg(load_item.BarCode[1]&0xFF, 2, 16, QLatin1Char('0'))
                                      .arg(load_item.BarCode[2]&0xFF, 2, 16, QLatin1Char('0')))
                                     .remove(5,1)
                                  + QString::fromLocal8Bit(load_item.Type) + ","
                                  + QString::fromLocal8Bit(load_item.Prj_name) + ","
                                  + cvalues
                                  + ((mintime == (unsigned int)~0)? "":
                                              QDateTime::fromTime_t(mintime).toString("yyyy/MM/dd HH:mm:ss"))
                                  + "\r\n";
                      }
                      else
                      {
                          for (int x = 0; x < tm_list.count(); x ++)
                          {
                              single_info = single_info +num + ","
                                      +  QString::fromLocal8Bit(load_item.Prj_name);


                              single_info += ","
                                      + QString("%1/").arg(tm_list.at(x).Xx[0])
                                      + QString("%1/").arg(tm_list.at(x).Xx[1])
                                      + QString("%1/").arg(tm_list.at(x).Xx[2])
                                      + QString("%1,").arg(tm_list.at(x).Xx[3])
                                      + QString("%1,").arg(tm_list.at(x).Cvalue)
                                      + tm_list.at(x).Unit + ","
                                      + QDateTime::fromTime_t(tm_list.at(0).time).toString("HH:mm:ss")
                                      + "\r\n";
                          }
                      }
                      single_info += "\r\n";
                      export_info << single_info ;
                 }
            }


            if(is_none)
            {
                info2error_dialog(this->isEN?"Please select data!"
                                           :tr("��ѡ������!")) ;

                disableButton_clicked(1) ;
                hide_button(1) ;
                return ;
            }

              freshButton_clicked() ;//ˢ��һ���豸ѡ�����

              bool success_flag = false;//������һ�������ɹ�����Ȼ����û��ѡ��Ե��豸


              form_count_num = 0 ;


              if(USB_has[0])
              {
                  QString save_filename = t_list.at(0).absoluteFilePath()
                     + "/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss").replace(" ","_").replace(":","-") + ".csv" ;

                  QString headr;
                  if(objName == "exportButton" )
                  {
                       headr  = headr +
                               tr("��ˮ��,")  +
                               tr("������,") +
                               tr("����,") +
                               tr("�Ա�,") +
                               tr("����,")+
                               tr("����ֵ,") +
                               tr("��������,") +
                               tr("��Ŀ,") +
                               tr("Ũ��(1),") +
                               tr("Ũ��(2),") +
                               tr("Ũ��(3),") +
                               tr("Ũ��(4),") +
                               tr("Ũ��(5),") +
                               tr("ʱ��")+
                               "\r\n";
                  }
                  else
                  {
                        headr  = headr + tr("���к�,") + tr("��Ŀ,") + "(X1,X2,X3,X4," + tr("Ũ��,")+ tr("��λ,") + tr("ʱ��")+ ")n,(...)m\r\n";
                  }

                  myHelper::export_asv(headr, save_filename, export_info) ;
                  success_flag = true ;
                  form_count = 1 ;
                  if(objName == "exportButton")
                    form_count_num = form_count_num + 8 +  history_data_count/10;
                  else
                    form_count_num = form_count_num + 8 +  primary_data_count/10; ;
              }

              if(success_flag)
                  form_count_str = (this->isEN?"faExport success":tr("fa�����ɹ�")) ;//myHelper::ShowMessageBoxQuesion(tr("�����ɹ�!")) ;
              else
              {
                  info2error_dialog(this->isEN?"Select an export device!"
                                             :tr("��ѡ��ɵ����豸!")) ;

              }
              disableButton_clicked(1) ;
              hide_button(1) ;
      }
      else
      {
              info2error_dialog(this->isEN?"No current record!"
                                         :tr("��ǰ�޼�¼!")) ;
      }
  }
  else
  {
              info2error_dialog(this->isEN?"Please insert U disk!"
                                         :tr("�����U��!")) ;

  }

}
void First_form::on_printsingleButton_clicked()
{
    //rowCount ;

   bool is_notempty = 0;
   //print_done = 0 ;
   //print_current = 0 ;
    //��ȡ��ѡ�е��б��,�����б�Ż�ȡ��Ϣ
    for(int i=0; i<record_list.count(); i++)
        for(int j=0; j<record_list.at(i).count; j++)
             if(record_list.at(i).check_state[j] == 1)
             {
                 is_notempty = 1 ;
                 //print_done++ ;
                 //break ;
             }
    if(is_notempty)
   {
       if(button_lock)
       {
           disableButton_clicked(0);
           hide_button(0) ;  //���ذ���

           for(unsigned int j=0; j<history_page_all; j++)
           {
               RECORD_LIST tmp_list = record_list.at(j) ;
               if(j == history_page_all-1)  //last time
               {
                   //print_current = 0 ;
                   //print_done = tmp_list.count ;
               }
               for(int i=0; i<tmp_list.count; i++)
               {
                    if(tmp_list.check_state[i])
                   {
                        //print_current++ ;
                        int ret = print_event(QString::fromLocal8Bit(tmp_list.file_name[i]), 0) ;
                        if(ret == -2)
                        {
                            disableButton_clicked(1);
                            hide_button(1) ;
                            return ;
                        }
                        else if(ret == -1)
                        {
//                            disableButton_clicked(1);
//                            hide_button(1) ;
                        }
                        else
                        {
                            myHelper::msDelay(1000);
                        }
                        //
                   }
               }
           }

           disableButton_clicked(1);
           hide_button(1) ;

           //if(print_done != 1)                                                                            //ֻ��ӡһ�β���ʾ
               myHelper::ShowMessageBoxQuesion(this->isEN?"Print OK!"
                                                        :tr("��ӡ���!")) ;
           //myHelper::ShowMessageBoxError(titem->text()) ;
           //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
       }

   }
   else
   {
       info2error_dialog(this->isEN?"Please select data!"
                                  :tr("��ѡ������!")) ;
   }
}

void First_form::on_printallButton_clicked()
{



   if(history_page_all != 0)
   {
       if(button_lock)
       {
           disableButton_clicked(0);
           if(myHelper::ShowMessageBoxInfo(this->isEN?"Print all?"
                                                       :tr("�Ƿ��ӡȫ��")))
           {
               //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
               hide_button(0) ;  //���ذ���


               for(unsigned int j=0; j < history_page_all; j++)
               {
                   RECORD_LIST tmp_list = record_list.at(j) ;
                   for(int i=0; i < tmp_list.count; i++)
                   {
                           /*print*/
                       //print_current ++ ;
                       int ret = print_event(QString::fromLocal8Bit(tmp_list.file_name[i]), 0) ;
                       if(ret == -2)
                       {
                           disableButton_clicked(1);
                           hide_button(1) ;
                           return ;
                       }
                       else if(ret == -1)
                       {
                           disableButton_clicked(1);
                           hide_button(1) ;
                       }
                       else
                       {
                           myHelper::msDelay(4000);
                       }
                   }
               }


               delay_100ms(LONG_LOCK_TIME);

               myHelper::ShowMessageBoxQuesion(this->isEN?"Print OK!"
                                                        :tr("��ӡ���!")) ;
           }
           else
               disableButton_clicked(1);
       }

   }
   else
   {
       info2error_dialog(this->isEN?"No current record!"
                                  :tr("��ǰ�޼�¼!")) ;
   }
}

/*���ϴ�*/
void First_form::on_uploadsingleButton_clicked()
{

    RECORD_LIST tmp_list;

   bool is_notempty = 0;

    //��ȡ��ѡ�е��б��,�����б�Ż�ȡ��Ϣ
  //int row = ui->tableWidget_history->currentRow() ;
   for(int i=0; i<record_list.count(); i++)
       for(int j=0; j<record_list.at(i).count; j++)
            if(record_list.at(i).check_state[j] == 1)
            {
                is_notempty = 1 ;
                break ;
            }
   if(is_notempty)
   {
       if(button_lock)
       {
            disableButton_clicked(0);
           for(unsigned int j=0; j<history_page_all; j++)
           {
                tmp_list = record_list.at(j) ;
               if(j == history_page_all-1)  //last time
               {

               }
               for(int i=0; i<tmp_list.count; i++)
               {
                    if(tmp_list.check_state[i])
                   {

                       uploadInterface.Upload(QString::fromLocal8Bit(tmp_list.file_name[i]));

                   }

                }
           }

           myHelper::ShowMessageBoxQuesion(this->isEN?"Upload successfully!"
                                                        :tr("�ϴ��ɹ�!")) ;
            disableButton_clicked(1) ;
       }
   }
   else
   {
       info2error_dialog(this->isEN?"Please select data!"
                                  :tr("��ѡ������!")) ;
   }
}
/*��ʷ����ȫ���ϴ� 2018/09/04*/
void First_form::on_uploadallButton_clicked()
{

    if(history_page_all != 0)
    {
        if(button_lock)
        {

            if(myHelper::ShowMessageBoxInfo(this->isEN?"Upload all?"
                                            :tr("�Ƿ�ȫ���ϴ�?")))
            {
                disableButton_clicked(0);
                hide_button(0) ;  //���ذ���
                //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
//                disableButton_clicked(0) ;

                //uart_upload_current = 0 ;
                //uart_upload_done = history_data_count ; //
                for(unsigned int j=0; j < history_page_all; j++)
                {
                    RECORD_LIST tmp_list = record_list.at(j) ;
                    for(int i=0; i < tmp_list.count; i++)
                    {
                            /*print*/
                        //disableButton_clicked(0);
                        uploadInterface.Upload(QString::fromLocal8Bit(tmp_list.file_name[i]));

                    }
                }
                myHelper::ShowMessageBoxQuesion(this->isEN?"Upload successfully!"
                                                         :tr("�ϴ��ɹ�!")) ;

                disableButton_clicked(1);
                hide_button(1) ;
            }
        }

    }
    else
    {
        info2error_dialog(this->isEN?"No current record!"
                                   :tr("��ǰ�޼�¼!")) ;
    }
}
/*ɾ����¼*/
void First_form::on_delsigButton_clicked()
{

    bool is_notempty = 0;
     //��ȡ��ѡ�е��б��,�����б�Ż�ȡ��Ϣ
   //int row = ui->tableWidget_history->currentRow() ;
    for(int i=0; i<record_list.count(); i++)
        for(int j=0; j<record_list.at(i).count; j++)
             if(record_list.at(i).check_state[j] == 1)
             {
                 is_notempty = 1 ;
                 break ;
             }
    if(is_notempty)
    {
        if(button_lock)
        {

            for(unsigned int j=0; j<history_page_all; j++)
            {
                RECORD_LIST tmp_list = record_list.at(j) ;
                if((quint32)j == history_page_all-1)  //last time
                {
                    //print_current = 0 ;
                    //print_done = tmp_list.count ;
                }
                for(int i=0; i<tmp_list.count; i++)
                {
                     if(tmp_list.check_state[i])
                    {
                         QString cmd = "rm " + QString::fromLocal8Bit( tmp_list.file_name[i] );
                        system(cmd.toLocal8Bit().constData()) ;
                    }

                }
           }

            this->select_date->who_calls =1 ;
            date_select_slot() ;
            this->select_date->who_calls =2 ;
            date_select_slot() ;
            myHelper::write_system_record("log/diary.ini", "A301", QDateTime::currentDateTime()) ;//�ռǼ�¼
        }
    }
    else
    {
        info2error_dialog(this->isEN?"Please select data!"
                                   :tr("��ѡ������!")) ;
    }
}
void First_form::on_delallButton_clicked()
{
    if(history_page_all != 0)
    {
        if(button_lock)
        {
            disableButton_clicked(0) ;
            if(myHelper::ShowMessageBoxInfo(this->isEN?"Delete all?"
                                            :tr("�Ƿ�ȫ��ɾ��?")))
            {
                //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������


                for(unsigned int j=0; j < history_page_all; j++)
                {
                    RECORD_LIST tmp_list = record_list.at(j) ;
                    for(int i=0; i < tmp_list.count; i++)
                    {
                        QString cmd = "rm " + QString::fromLocal8Bit( tmp_list.file_name[i] );
                       system(cmd.toLocal8Bit().constData()) ;

                    }
                }

                this->select_date->who_calls =1 ;
                date_select_slot() ;
                this->select_date->who_calls =2 ;
                date_select_slot() ;
                myHelper::write_system_record("log/diary.ini", "A301", QDateTime::currentDateTime()) ;//�ռǼ�¼

            }
            disableButton_clicked(1);
        }

    }
    else
    {
        info2error_dialog(this->isEN?"No current record!"
                                   :tr("��ǰ�޼�¼!")) ;
    }
}
/*ˢ��U���б�*/
void First_form::freshButton_clicked()
{


    QDir dir(EXPORT_PAT) ;
    dir.setFilter(QDir::Dirs );
    dir.setSorting(QDir::DirsFirst);
    QFileInfoList list = dir.entryInfoList() ;
    if(list.count() == 3)
    {
        USB_has[0] = true;
        USB_has[1] = true;
    }
    else if(list.count() > 3)
    {
        USB_has[0] = true;
        USB_has[1] = true;
        USB_has[2] = true;
        USB_has[3] = true;
    }
    else
    {
        USB_has[0] = false;
        USB_has[1] = false;
        USB_has[2] = false;
        USB_has[3] = false;
    }

}


/*����������ȷ֮����ת�����Ӧ�Ľ���*/
void  First_form::correct_password_primary_slot(int correct_flag)
{
    if(correct_flag == 1)
        ui->tableWidget_primary->show();
    else if(correct_flag == 2)
    {
        ui->showcurveButton->show() ;
        ui->ex_primaryButton->show() ;
    }
    else
    {
        //ui->tabWidget_histroy->setCurrentIndex(0);
    }

}
//��ʾ��������
void First_form::on_showcurveButton_clicked()
{


    int row = ui->tableWidget_debug->currentRow() ;
    if(row > -1)
    {
        int fd ;
        SAVE_DEBUG_ITEM load_item ;
        int file_size = sizeof(load_item) ;
        uchar buffer[file_size] ;
        //
        fd = open(debug_list.at(debug_page).file_name[row], O_RDONLY);
        if(fd < 0)
        {
            perror("open");
            return  ;
        }

        bzero(buffer, file_size) ;
        //��ȡ����
        if( read(fd, buffer, file_size) < 0)
        {

            perror("read");
            return ;
        }

         memcpy(&load_item, buffer, file_size) ;
         this->curve_form->win_length = load_item.Datas_number;
         this->curve_form->peak_number = load_item.Peak_number ;
         for(int q=0; (q<load_item.Datas_number)&&(q<400); q++)
             this->curve_form->y_datas[q] = load_item.Datas[q] ;

         for(int q=0; (q<load_item.Peak_number)&&(q<10);  q++)
             this->curve_form->position[q] = load_item.Peaks_position[q] ;

         emit show_curveform(this->isEN) ;
     }
    else
    {
         info2error_dialog(this->isEN?"faSelect a row of data."
                                    :tr("fa��ѡ��һ������.")) ;
    }
}

void First_form::history_turnpage_event(int page)
{
    int i ;
    //����������Ӣ���ڸ�ʽ��ת�� 2018/09/18
    char temp_Time[16] ;
    bzero(temp_Time,16);

    if(record_list.count() < 1)
        return ;
    RECORD_LIST tmp_list =  record_list.at(page);

    for(i=0; i< PAGE_DATA_NUMS; i++)
    {
        ui->tableWidget_history->removeRow(0);
    }

    ui->tableWidget_history->setRowCount(tmp_list.count);


    for(i=0; i < tmp_list.count; i++)
    {
        QList <SUB_SAVE_ITEM> tm_list ;
        SAVE_ITEM load_item ;
        int fd ;
        SUB_SAVE_ITEM tmp ;
        bool bad_file = 0;

        read_localfile(QString::fromLocal8Bit(tmp_list.file_name[i]), &load_item, &fd) ;
        if(load_item.sub_count == 0 )
        {
            //ui->tableWidget_history->setRowCount(0);
           // break  ;
            bad_file = 1 ;
        }
        int q ;
        for(q=0; q<load_item.sub_count; q++)
        {
            if( read_localfile_sub(fd, &tmp, fd) < 0)
                bad_file = 1;
            else
                //break ;
            tm_list << tmp ;
        }

        if(q != load_item.sub_count)             //��ֹ�ļ���
        {
            //ui->tableWidget_history->setRowCount(0);
            bad_file = 1 ;
            //break  ;
        }
        ::close(fd) ;

        //��ˮ���ַ�����ʽ
        ui->tableWidget_history->setItem(i , 0, new QTableWidgetItem(QString::fromLocal8Bit(load_item.serial_code)));
        // ����������
        ui->tableWidget_history->setItem(i , 1, new QTableWidgetItem(QString::fromLocal8Bit(load_item.c_Nums)));
        // ��Ӧ��Ŀ����
        ui->tableWidget_history->setItem(i , 2,
            new QTableWidgetItem(QString("%1%2%3")
            .arg(load_item.BarCode[0]&0xFF, 2, 16, QLatin1Char('0'))
            .arg(load_item.BarCode[1]&0xFF, 2, 16, QLatin1Char('0'))
            .arg(load_item.BarCode[2]&0xFF, 2, 16, QLatin1Char('0'))
            .toUpper().remove(5,1)));

         if(bad_file)
         {
             ui->tableWidget_history->setItem(i , 3, new QTableWidgetItem(tr("������")));  //edit225
             ui->tableWidget_history->setItem(i , 4, new QTableWidgetItem(tr("������")));  //edit225
             ui->tableWidget_history->setItem(i , 5, new QTableWidgetItem(tr("������")));  //edit225
         }
         else
         {
             if(load_item.sub_count == 1)
             {
                  // ��Ŀ��
                  ui->tableWidget_history->setItem(i , 3, new QTableWidgetItem(QString::fromLocal8Bit(tm_list.at(0).Name)));  //edit225
                  // c_value��Cvale�ľ�ȷfloat_decimalλС�����ɵ�ASCII�ַ�����ʾ
                  ui->tableWidget_history->setItem(i , 4, new QTableWidgetItem(QString::fromLocal8Bit(tm_list.at(0).c_value)));  //edit225
                  // ��Cvalue���ݵ�������λ
                  ui->tableWidget_history->setItem(i , 5, new QTableWidgetItem(tm_list.at(0).Unit));  //edit225
             }
             else
             {
                 ui->tableWidget_history->setItem(i , 3, new QTableWidgetItem(QString::fromLocal8Bit(load_item.Prj_name)));  //edit225
                 ui->tableWidget_history->setItem(i , 4, new QTableWidgetItem("..."));  //edit225
                 ui->tableWidget_history->setItem(i , 5, new QTableWidgetItem("..."));  //edit225
             }
        }
          // �ýṹ�����ʱ�䣬�ַ�����ʽ�����ﾫȷʱ����
          ui->tableWidget_history->setItem(i , 6, new QTableWidgetItem(load_item.Time));
          if(this->isEN)
          {
              strcpy(temp_Time, load_item.Time);
              for(int j = 0; j < 10; j++)
              {
                  if(j == 0 || (j > 0 && j < 4))
                      temp_Time[j + 6] = load_item.Time[j];
                  else if(j == 5 || (j > 5 && j < 10))
                      temp_Time[j - 5] = load_item.Time[j];
              }
              temp_Time[5] = '-';
              ui->tableWidget_history->setItem(i , 6, new QTableWidgetItem(temp_Time));
               bzero(temp_Time,16);
          }
          // ��������
          ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit(load_item.Type)));
          if(this->isEN)
          {
              QString temp_Type = QString::fromLocal8Bit(load_item.Type);
              if(temp_Type.toLocal8Bit() == "Ѫ��/Ѫ��")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Serum/Plasma")));
              }
              if(temp_Type.toLocal8Bit() == "ȫѪ")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Whole Blood")));
              }
              if(temp_Type.toLocal8Bit() == "ĩ��Ѫ")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Peripheral Blood")));
              }
              if(temp_Type.toLocal8Bit() == "��Һ")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Urine")));
              }
              if(temp_Type.toLocal8Bit() == "�ʿ�")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("QC")));
              }
          }
          //����
          ui->tableWidget_history->setItem(i , 8, new QTableWidgetItem(QString::fromLocal8Bit(load_item.p_name)));
          //�Ա�
          ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem(QString::fromLocal8Bit(load_item.sex)));

          if(this->isEN)
          {
                QString sex_temp = QString::fromLocal8Bit(load_item.sex);
              if(sex_temp.toLocal8Bit() == "��")
                ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem("Male"));
              else if(sex_temp.toLocal8Bit() == "Ů")
                  ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem("Female"));
              else
                  ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem(" "));
          }
          //��������䵥λ
          ui->tableWidget_history->setItem(i , 10, new QTableWidgetItem(
                                               load_item.age_valuse[0]?
                                               QString(load_item.age_valuse) + this->detail_form->age_unit->itemText(load_item.age_index):
                                               QString("")));

    }
    ui->label_page->setText(QString("%1").arg(page+ 1)) ;
    //���ù�ѡ
    ui->checkBox_history_1->setChecked(0) ;ui->checkBox_history_1->setEnabled(0);
    ui->checkBox_history_2->setChecked(0) ;ui->checkBox_history_2->setEnabled(0);
    ui->checkBox_history_3->setChecked(0) ;ui->checkBox_history_3->setEnabled(0);
    ui->checkBox_history_4->setChecked(0) ;ui->checkBox_history_4->setEnabled(0);
    ui->checkBox_history_5->setChecked(0) ;ui->checkBox_history_5->setEnabled(0);

    if(tmp_list.count > 0) {ui->checkBox_history_1->setEnabled(1);if(tmp_list.check_state[0])ui->checkBox_history_1->setChecked(1);}
    if(tmp_list.count > 1) {ui->checkBox_history_2->setEnabled(1);if(tmp_list.check_state[1])ui->checkBox_history_2->setChecked(1);}
    if(tmp_list.count > 2) {ui->checkBox_history_3->setEnabled(1);if(tmp_list.check_state[2])ui->checkBox_history_3->setChecked(1);}
    if(tmp_list.count > 3) {ui->checkBox_history_4->setEnabled(1);if(tmp_list.check_state[3])ui->checkBox_history_4->setChecked(1);}
    if(tmp_list.count > 4) {ui->checkBox_history_5->setEnabled(1);if(tmp_list.check_state[4])ui->checkBox_history_5->setChecked(1);}


}
//��һҳ
void First_form::on_pagedownButton_clicked()
{

    if(history_page < (history_page_all-1))
        history_page++ ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//upһҳ
void First_form::on_pageupButton_clicked()
{

    if(history_page > 0)
        history_page-- ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//first ҳ
void First_form::on_firstButton_clicked()
{
    history_page = 0 ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//last ҳ
void First_form::on_lastButton_clicked()
{

    history_page = history_page_all - 1 ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//���湳ѡ״̬
void First_form::_save_clicked(int page, char state[PAGE_DATA_NUMS])
{
    RECORD_LIST tmp ;
    tmp = record_list.at(page) ;
    for(int i=0; i<tmp.count; i++)
    {
         tmp.check_state[i] = state[i] ;
    }
    record_list.replace(page, tmp) ;
}
void First_form::save_clicked()
{
    char state[PAGE_DATA_NUMS] ;
    if(record_list.at(history_page).count > 0)state[0] =  ui->checkBox_history_1->isChecked();
    if(record_list.at(history_page).count > 1) state[1] =  ui->checkBox_history_2->isChecked();
    if(record_list.at(history_page).count > 2) state[2] =  ui->checkBox_history_3->isChecked();
    if(record_list.at(history_page).count > 3) state[3] =  ui->checkBox_history_4->isChecked();
    if(record_list.at(history_page).count > 4) state[4] =  ui->checkBox_history_5->isChecked();
    _save_clicked(history_page, state) ;
}
void First_form::on_checkBox_history_1_clicked()
{
    if(history_data_count)
        save_clicked() ;
}

void First_form::on_editButton_clicked()
{
    //history_edit_form.show() ;
    //��ȡ��ѡ�е��б��,�����б�Ż�ȡ��Ϣ

   int row = ui->tableWidget_history->currentRow() ;
   if(row != -1)
   {
      if(ui->tableWidget_history->item(row, 2)->text() != tr("������"))
      {
          select_date->who_calls = 1;
          history_edit_form->show_form(record_list.at(history_page).file_name[row]);
      }
   }
   else
   {
       info2error_dialog(this->isEN?"faSelect a row of data."
                                  :tr("fa��ѡ��һ������.")) ;
   }

}

void First_form::on_checkBox_history_all_clicked()
{
    bool state = ui->checkBox_history_all->isChecked() ;
    for(int i=0; i<record_list.count(); i++)
    {
        RECORD_LIST list_sig = record_list.at(i) ;
        for(int j=0; j<list_sig.count; j++)
        {
            list_sig.check_state[j] = state ;
        }
        record_list.replace(i, list_sig);
    }
    history_turnpage_event(history_page) ;
}
//
void First_form::primary_turnpage_event(int page)
{
    int i ;
    if(primary_list.count() < 1)
        return ;
    RECORD_LIST tmp_list =  primary_list.at(page);

    for(i=0; i< PAGE_DATA_NUMS; i++)
    {
        ui->tableWidget_primary->removeRow(0);
    }
    ui->tableWidget_primary->setRowCount(tmp_list.count);



    for(i=0; i < tmp_list.count; i++)
    {
        int fd ;
        SAVE_ITEM load_item ;
        SUB_SAVE_ITEM sub_item;

         if (read_localfile(QString::fromLocal8Bit(tmp_list.file_name[i]), &load_item, &fd) < 0)
         {

             continue;
         }

         ui->tableWidget_primary->setItem(i , 0, new QTableWidgetItem(QString::fromLocal8Bit(load_item.serial_code)));

         ui->tableWidget_primary->setItem(i , 1, new QTableWidgetItem(QString::fromLocal8Bit(load_item.c_Nums)));
         ui->tableWidget_primary->setItem(i , 2, new QTableWidgetItem((QString("%1%2%3").arg(load_item.BarCode[0]&0xFF, 2, 16, QLatin1Char('0'))
                                                                      .arg(load_item.BarCode[1]&0xFF, 2, 16, QLatin1Char('0'))
                                                                      .arg(load_item.BarCode[2]&0xFF, 2, 16, QLatin1Char('0'))).toUpper()
                                                                     .remove(5,1)));

         ui->tableWidget_primary->setItem(i, 3, new QTableWidgetItem(QString::fromLocal8Bit(load_item.Prj_name)));  //edit225



         QTableWidgetItem *sublist[5] = { 0, 0, 0, 0, 0 };
         for (int x = 0; x < load_item.sub_count; x++)
         {

             if (read_localfile_sub(fd, &sub_item, 0) < 0)
             {
                 perror("read ");
                 continue;
             }
             if (sublist[sub_item.channel % 5] == 0)
             {
                sublist[sub_item.channel % 5] = new QTableWidgetItem(QString("%1").arg(sub_item.Cvalue));
             }
        }
         ::close(fd) ;
         for (int x = 0; x < 5; x++)
         {
             if (sublist[x])
             {
                 ui->tableWidget_primary->setItem(i, 4 + x, sublist[x]);
             }
         }
         ui->tableWidget_primary->setItem(i, 9,  new QTableWidgetItem(QString::fromLocal8Bit(tmp_list.file_name[i])));

    }
    ui->label_page_2->setText(QString("%1").arg(page+ 1)) ;



    //���ù�ѡ
    ui->checkBox_history_12->setChecked(0) ;
    ui->checkBox_history_12->setEnabled(0);
    ui->checkBox_history_13->setChecked(0) ;
    ui->checkBox_history_13->setEnabled(0);
    ui->checkBox_history_14->setChecked(0) ;
    ui->checkBox_history_14->setEnabled(0);
    ui->checkBox_history_15->setChecked(0) ;
    ui->checkBox_history_15->setEnabled(0);
    ui->checkBox_history_16->setChecked(0) ;
    ui->checkBox_history_16->setEnabled(0);

    if(tmp_list.count > 0) {ui->checkBox_history_12->setEnabled(1);
    if(tmp_list.check_state[0])ui->checkBox_history_12->setChecked(1);}
    if(tmp_list.count > 1) {ui->checkBox_history_13->setEnabled(1);
    if(tmp_list.check_state[1])ui->checkBox_history_13->setChecked(1);}
    if(tmp_list.count > 2) {ui->checkBox_history_14->setEnabled(1);
    if(tmp_list.check_state[2])ui->checkBox_history_14->setChecked(1);}
    if(tmp_list.count > 3) {ui->checkBox_history_15->setEnabled(1);
    if(tmp_list.check_state[3])ui->checkBox_history_15->setChecked(1);}
    if(tmp_list.count > 4) {ui->checkBox_history_16->setEnabled(1);
    if(tmp_list.check_state[4])ui->checkBox_history_16->setChecked(1);}

}
void First_form::on_pageupButton_2_clicked()
{

    if(primary_page > 0)
        primary_page-- ;
    if(primary_data_count)
        primary_turnpage_event(primary_page) ;
}

void First_form::on_pagedownButton_2_clicked()
{

    if(primary_page < (primary_page_all-1))
        primary_page++ ;
    if(primary_data_count)
        primary_turnpage_event(primary_page) ;
}

void First_form::on_firstButton_2_clicked()
{

    primary_page = 0 ;
    if(primary_data_count)
        primary_turnpage_event(primary_page) ;
}

void First_form::on_lastButton_2_clicked()
{

    primary_page = primary_page_all - 1 ;
    if(primary_data_count)
        primary_turnpage_event(primary_page) ;
}
//���湳ѡ״̬
void First_form::_save_clicked_primary(int page, char state[PAGE_DATA_NUMS])
{
    RECORD_LIST tmp ;
    tmp = primary_list.at(page) ;
    for(int i=0; i<tmp.count; i++)
    {
         tmp.check_state[i] = state[i] ;
    }
    primary_list.replace(page, tmp) ;
}
void First_form::save_clicked_primary()
{
    char state[PAGE_DATA_NUMS] ;
    if(record_list.at(primary_page).count > 0)state[0] =  ui->checkBox_history_12->isChecked();
    if(record_list.at(primary_page).count > 1) state[1] =  ui->checkBox_history_13->isChecked();
    if(record_list.at(primary_page).count > 2) state[2] =  ui->checkBox_history_14->isChecked();
    if(record_list.at(primary_page).count > 3) state[3] =  ui->checkBox_history_15->isChecked();
    if(record_list.at(primary_page).count > 4) state[4] =  ui->checkBox_history_16->isChecked();
    _save_clicked_primary(primary_page, state) ;
}
void First_form::on_checkBox_history_12_clicked()
{
    if(primary_data_count)
        save_clicked_primary() ;
}


void First_form::on_checkBox_primary_all_clicked()
{
    bool state = ui->checkBox_primary_all->isChecked() ;
    for(int i=0; i<primary_list.count(); i++)
    {
        RECORD_LIST list_sig = primary_list.at(i) ;
        for(int j=0; j<list_sig.count; j++)
        {
            list_sig.check_state[j] = state ;
        }
        primary_list.replace(i, list_sig);
    }
    primary_turnpage_event(primary_page) ;
}

/////////////////
void First_form::debug_turnpage_event(int page)
{
    if(debug_list.count() < 1)
        return ;

    SAVE_DEBUG_ITEM load_item ;
    // int file_size = sizeof(SAVE_DEBUG_ITEM);
    RECORD_LIST tmp_list =  debug_list.at(page);
//    uchar buffer[file_size] ;


    for(int i=0; i< PAGE_DATA_NUMS; i++)
    {
        ui->tableWidget_debug->removeRow(0);
    }
    ui->tableWidget_debug->setRowCount(tmp_list.count);
    //read_debugfile(QString::fromLocal8Bit(tmp_list.file_name[0]), &load_item) ;
    for(int i=0; i < tmp_list.count; i++)
    {
        read_debugfile(QString::fromLocal8Bit(tmp_list.file_name[i]), &load_item) ;

        for(int q=0; q<5; q++)
           ui->tableWidget_debug->setItem(i , q, new QTableWidgetItem(QString("%1").arg(load_item.Peaks_value[q])));
        ui->tableWidget_debug->setItem(i , 5, new QTableWidgetItem(QString("%1").arg(load_item.TC) ));
        ui->tableWidget_debug->setItem(i, 6, new QTableWidgetItem(QString("%1").arg(load_item.Datas_number) ) );
        ui->tableWidget_debug->setItem(i ,7, new QTableWidgetItem(QString::fromAscii(load_item.Time) ) );

    }
    ui->label_page_3->setText(QString("%1").arg(page+ 1)) ;
}

void First_form::on_pageupButton_3_clicked()
{

    if(debug_page > 0)
        debug_page-- ;
    if(debug_data_count)
        debug_turnpage_event(debug_page) ;
}

void First_form::on_pagedownButton_3_clicked()
{

    if(debug_page < (debug_page_all-1))
        debug_page++ ;
    if(debug_data_count)
        debug_turnpage_event(debug_page) ;
}

void First_form::on_firstButton_3_clicked()
{

    debug_page = 0 ;
    if(debug_data_count)
        debug_turnpage_event(debug_page) ;
}

void First_form::on_lastButton_3_clicked()
{

    debug_page = debug_page_all - 1 ;
    if(debug_data_count)
        debug_turnpage_event(debug_page) ;
}

void First_form::form_count_slot(QString tx)
{
    info2error_dialog(tx) ;
}
void First_form::on_histroyButton_show_clicked()
{
    select_date->show() ;
    select_date->who_calls = 1 ;

}



void First_form::on_histroyButton_show_2_clicked()
{
    select_date->show() ;
    select_date->who_calls = 2 ;
}

void First_form::on_histroyButton_show_3_clicked()
{
    select_date->show() ;
    select_date->who_calls = 3 ;
}

void First_form::on_histroyButton_show_4_clicked()
{
    select_date->show() ;
    select_date->who_calls = 4 ;
}
/*ͳ�����ݵ���*/
void First_form::on_histroyButton_export_st_clicked()
{
    info2error_dialog(this->isEN?"fsPlease wait while exporting..."
                               :tr("fs���ڵ���,���Ժ�..")) ;
  QDir dir(EXPORT_PAT) ;
  dir.setFilter(QDir::Dirs );
  dir.setSorting(QDir::DirsFirst);
  QFileInfoList list = dir.entryInfoList() ;
  QFileInfoList t_list ;

  int count = ui->tableWidget_classify->rowCount() ;
  int col_count = ui->tableWidget_classify->columnCount() ;
  //
  for(int i=0; i<list.count(); i++)
  {
     // qDebug() << list.at(i).fileName();
      if(list.at(i).fileName() !="." && list.at(i).fileName() !="..")
          t_list << list.at(i) ;
  }

  if(t_list.count() >= 1 )
  {
      if( count )
      {
          info2error_dialog(this->isEN?"fsPlease wait while exporting..."
                                     :tr("fs���ڵ���,���Ժ�..")) ;
          QString headr;
          QString single_info ;
          QStringList export_info ;

          /*�б�ͷ*/
          headr = headr + " " + "," ;
          for(int i=0; i < col_count; i++)
              headr = headr +  ui->tableWidget_classify->horizontalHeaderItem(i)->text() + "," ;
          headr = headr + "\r\n" ;

          for(int i=0; i < count; i++)
          {
              single_info.clear() ;
              single_info = single_info + ui->tableWidget_classify->takeVerticalHeaderItem(i)->text() + "," ;
              for(int k=0; k < col_count; k++)
              {
                    single_info = single_info + ui->tableWidget_classify->item(i, k)->text() + "," ;
              }
               single_info = single_info + "\r\n" ;
              export_info << single_info ;
          }


          freshButton_clicked() ;//ˢ��һ���豸ѡ�����

          bool success_flag = false;//������һ�������ɹ�����Ȼ����û��ѡ��Ե��豸


          form_count_num = 0 ;


          if(USB_has[0])
          {
              QString save_filename = t_list.at(0).absoluteFilePath()
                 + "/st_" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss").replace(" ","_").replace(":","-") + ".csv" ;

              myHelper::export_asv(headr, save_filename, export_info) ;
              success_flag = true ;
              form_count = 1 ;

              form_count_num = form_count_num + 8 + count/10;

          }
          if(USB_has[2])
          {
              QString save_filename = t_list.at(0).absoluteFilePath()
                 + "/" +QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss").replace(" ","_").replace(":","-") + ".csv" ;

              myHelper::export_asv(headr, save_filename,export_info) ;

              success_flag = true ;
              form_count = 1 ;

              form_count_num = form_count_num + 8 +  count/10; ;
          }

          if(success_flag)
              form_count_str =(this->isEN?"faExport success":tr("fa�����ɹ�"));//myHelper::ShowMessageBoxQuesion(tr("�����ɹ�!")) ;
          else
          {
              info2error_dialog(this->isEN?"Select an export device!"
                                         :tr("��ѡ��ɵ����豸!")) ;

          }
          disableButton_clicked(1) ;
          hide_button(1) ;
      }
      else
      {
              info2error_dialog(this->isEN?"No current record!"
                                         :tr("��ǰ�޼�¼!")) ;
      }
  }
  else
  {

              info2error_dialog(this->isEN?"Please insert U disk"
                                         :tr("�����U��!")) ;

  }
}


/*********************************
*��Ŀ�������
*
**********************************/
void First_form::on_toolButton_main_p_zhuxiang_clicked()
{
    ui->toolButton_main_p_zhuxiang->setEnabled(0) ;
    ui->toolButton_main_p_zixiang->setEnabled(1) ;
    ui->toolButton_main_p_quxian->setEnabled(1) ;
    ui->toolButton_main_p_buchang->setEnabled(1) ;
    ui->toolButton_main_p_setting->setEnabled(1);
    ui->stackedWidget_6->setCurrentIndex(0) ;
}

void First_form::on_toolButton_main_p_zixiang_clicked()
{
    ui->toolButton_main_p_zhuxiang->setEnabled(1) ;
    ui->toolButton_main_p_zixiang->setEnabled(0) ;
    ui->toolButton_main_p_quxian->setEnabled(1) ;
    ui->toolButton_main_p_buchang->setEnabled(1) ;
    ui->toolButton_main_p_setting->setEnabled(1);
    ui->stackedWidget_6->setCurrentIndex(1) ;
}

void First_form::on_toolButton_main_p_quxian_clicked()
{
    ui->toolButton_main_p_zhuxiang->setEnabled(1) ;
    ui->toolButton_main_p_zixiang->setEnabled(1) ;
    ui->toolButton_main_p_quxian->setEnabled(0) ;
    ui->toolButton_main_p_buchang->setEnabled(1) ;
    ui->toolButton_main_p_setting->setEnabled(1);
    ui->stackedWidget_6->setCurrentIndex(2) ;
}

void First_form::on_toolButton_main_p_buchang_clicked()
{
    ui->toolButton_main_p_zhuxiang->setEnabled(1) ;
    ui->toolButton_main_p_zixiang->setEnabled(1) ;
    ui->toolButton_main_p_quxian->setEnabled(1) ;
    ui->toolButton_main_p_buchang->setEnabled(0) ;
    ui->toolButton_main_p_setting->setEnabled(1);
    ui->stackedWidget_6->setCurrentIndex(3) ;
}
void First_form::on_toolButton_main_p_setting_clicked()
{
    ui->toolButton_main_p_zhuxiang->setEnabled(1) ;
    ui->toolButton_main_p_zixiang->setEnabled(1) ;
    ui->toolButton_main_p_quxian->setEnabled(1) ;
    ui->toolButton_main_p_buchang->setEnabled(1) ;
    ui->toolButton_main_p_setting->setEnabled(0);
    ui->stackedWidget_6->setCurrentIndex(4) ;
}


bool First_form::load_set_project(const ItemManager::ID_info &project)
{
    if(!itemMat->loadItem(project, &poct_item))
    {
        printf("LoadIDHex: failed\n") ;
    }
    else
    {
        /*������Ŀ����*/
        currentsubpj_num = 0 ;                    //ѡ������Ŀ�ı�־
        set_project_info(poct_item) ;

        itemMat->setCur_info(project);
        item_update_itemList();

        return true;
    }
    return false;
}


/*������Ŀ����*/
void First_form::set_project_info(const POCT_ITEM &poct_item)
{
    int type = itemMat->getIdInfo(&poct_item).type;

    DBG_DEBUG(DBG_CFLINE("barcode=%s, type=%d", qPrintable(poct_item.BarCode), type));

/*����Ŀ����*/
    if (type == 0)
    {
        ui->radioButton_2->setVisible(poct_item.ItemCount > 1);
        ui->radioButton_3->setVisible(poct_item.ItemCount > 2);
        ui->radioButton_4->setVisible(poct_item.ItemCount > 3);
        ui->radioButton_5->setVisible(poct_item.ItemCount > 4);
    }
    else
    {
        ui->radioButton_2->setVisible(poct_item.SIs[1].siChannel);
        ui->radioButton_3->setVisible(poct_item.SIs[2].siChannel);
        ui->radioButton_4->setVisible(poct_item.SIs[3].siChannel);
        ui->radioButton_5->setVisible(poct_item.SIs[4].siChannel);
    }

    ui->radioButton->setChecked(1);
    radio_buttonClick();


/*����Ŀ����*/

    ui->lineEdit_chanpingmingcheng->setText(poct_item.ReportTitle);
    ui->lineEdit_xiangmutiaoma->setText(poct_item.BarCode);
    ui->lineEdit_chanpingdaima->setText(QString("%1").arg(poct_item.ProductCode));
    ui->lineEdit_tonddaoshu->setText(QString::number(poct_item.ItemCount));
    ui->checkBox_jiayang->setChecked(poct_item.MinCheck);
    ui->checkBox_chonding->setChecked(poct_item.MaxCheck);






    if (type == 0)
    {

        ui->tableWidget_Peak->setRowCount(poct_item.PeakCount);

        QTableWidgetItem *temp = new QTableWidgetItem((this->isEN?"Single Channel":tr("��ͨ��")));
        temp->setTextAlignment(Qt::AlignCenter);
        ui->tableWidget_Peak->setItem(0, 0, temp);
        ui->tableWidget_Peak->setSpan(0, 0, poct_item.PeakCount, 1);


        for (int x = 0; x < poct_item.PeakCount; x++)
        {
            temp = new QTableWidgetItem(QString::number(poct_item.Peaks[x].From));
            temp->setTextAlignment(Qt::AlignCenter);
            ui->tableWidget_Peak->setItem(x, 1, temp);

            temp = new QTableWidgetItem(QString::number(poct_item.Peaks[x].To));
            temp->setTextAlignment(Qt::AlignCenter);
            ui->tableWidget_Peak->setItem(x, 2, temp);

            temp = new QTableWidgetItem(QString::number(poct_item.Peaks[x].Count));
            temp->setTextAlignment(Qt::AlignCenter);
            ui->tableWidget_Peak->setItem(x, 3, temp);

            temp = new QTableWidgetItem(QString::number(poct_item.Peaks[x].Style));
            temp->setTextAlignment(Qt::AlignCenter);
            ui->tableWidget_Peak->setItem(x, 4, temp);
        }
    }
    else
    {
        int row = 0;
        ui->tableWidget_Peak->setRowCount(0);

        for(int i = 0; i < ARRAYSIZE(poct_item.SIs) && i < type; i++ )
        {

            const POCT_SUBITEM *sub = &poct_item.SIs[i];
            if (!sub->siChannel)
            {
                continue;
            }

            ui->tableWidget_Peak->setRowCount(row + sub->PeakCount);

            QTableWidgetItem *temp = new QTableWidgetItem(QString::number(i+1));
            temp->setTextAlignment(Qt::AlignCenter);

            ui->tableWidget_Peak->setItem(row, 0, temp);

            for (int x = 0; x < sub->PeakCount; x++)
            {
                temp = new QTableWidgetItem(QString::number(sub->siPeaks[x].From));
                temp->setTextAlignment(Qt::AlignCenter);
                ui->tableWidget_Peak->setItem(row + x, 1, temp);

                temp = new QTableWidgetItem(QString::number(sub->siPeaks[x].To));
                temp->setTextAlignment(Qt::AlignCenter);
                ui->tableWidget_Peak->setItem(row + x, 2, temp);

                temp = new QTableWidgetItem(QString::number(sub->siPeaks[x].Count));
                temp->setTextAlignment(Qt::AlignCenter);
                ui->tableWidget_Peak->setItem(row + x, 3, temp);

                temp = new QTableWidgetItem(QString::number(sub->siPeaks[x].Style));
                temp->setTextAlignment(Qt::AlignCenter);
                ui->tableWidget_Peak->setItem(row + x, 4, temp);
            }
            if (sub->PeakCount)
            {
                ui->tableWidget_Peak->setSpan(row, 0, sub->PeakCount, 1);
            }
            row += sub->PeakCount;
        }
    }
//-----------------1_18--------------------------
    if (ui->spinBox_curve_No->value() != 1)
    {
        ui->spinBox_curve_No->setValue(1);
    }
    else
    {
        on_spinBox_curve_No_valueChanged(0);
    }
}

/*����Ŀ�л�ʱ�ı����Ӧ����ʾ��Ϣ*/
void First_form::radio_buttonClick()
{
    QRadioButton *btn = qobject_cast<QRadioButton *>(sender());
    QString objName = btn? btn->objectName(): "";

    if(objName == "radioButton_2")
    {
        currentsubpj_num = 1 ;
    }
    else if(objName == "radioButton_3")
    {
        currentsubpj_num = 2 ;
    }
    else if(objName == "radioButton_4")
    {
        currentsubpj_num = 3 ;
    }
    else if(objName == "radioButton_5")
    {
        currentsubpj_num = 4 ;
    }
    else
    {
        currentsubpj_num = 0 ;
    }

    QLineEdit*edits[2][9] =
    {
        {
            ui->lineEdit_stype0, ui->lineEdit_stype1, ui->lineEdit_stype2,
            ui->lineEdit_stype3, ui->lineEdit_stype4, ui->lineEdit_stype5,
            ui->lineEdit_stype6, ui->lineEdit_stype7, ui->lineEdit_stype8
        },
        {
            ui->lineEdit_stype0_2, ui->lineEdit_stype1_2, ui->lineEdit_stype2_2,
            ui->lineEdit_stype3_2, ui->lineEdit_stype4_2, ui->lineEdit_stype5_2,
            ui->lineEdit_stype6_2, ui->lineEdit_stype7_2, ui->lineEdit_stype8_2
        }
    };



    if(ui->listWidget_setP_2->count() != 0)//����Ŀ��ʱ��ż��� 2018-10-22
    {
            for (int i = 0; i < 9; i++)
            {
                edits[0][i]->setText(QString::number(poct_item.SIs[currentsubpj_num].Ratios[i]));
                edits[1][i]->setText(QString::number(poct_item.SIs[currentsubpj_num].CurveNos[i]+1));
            }
        ui->lineEdit_Hatch->setText(QString::number(poct_item.SIs[currentsubpj_num].SubHatch));

        ItemManager::CalcModel cm = itemMat->buildModel(poct_item.SIs[currentsubpj_num]);

         ui->lineEdit_P1->setText(cm.P1);
         ui->lineEdit_P2->setText(cm.P2);
         ui->lineEdit_P3->setText(cm.P3);

         ui->lineEdit_tc_p->setText(cm.Model);

    if (poct_item.MinCheck)
    {
        ui->lineEdit_mixval->setVisible(true);
        ui->label_61->setVisible(true);
        ui->lineEdit_mixval->setText(QString::number(poct_item.SIs[currentsubpj_num].SubMinValue));
    }
    else
    {
        ui->lineEdit_mixval->setVisible(false);
        ui->label_61->setVisible(false);
    }

    for(int i=0; i<5;i++)
    {

                if (!poct_item.SIs[currentsubpj_num].Name[i].isEmpty())
                {
                    ui->tableWidget_item->setItem(i, 0, new QTableWidgetItem(poct_item.SIs[currentsubpj_num].Name[i]));
                    ui->tableWidget_item->setItem(i, 1, new QTableWidgetItem(poct_item.SIs[currentsubpj_num].Unit[i]));
                    ui->tableWidget_item->setItem(i, 2, new QTableWidgetItem(QString::number(poct_item.SIs[currentsubpj_num].RangeMin[i])));
                    ui->tableWidget_item->setItem(i, 3, new QTableWidgetItem(QString::number(poct_item.SIs[currentsubpj_num].RangeMax[i])));
                }
                else
                {
                    ui->tableWidget_item->setItem(i, 0, new QTableWidgetItem(QString()));
                    ui->tableWidget_item->setItem(i, 1, new QTableWidgetItem(QString()));
                    ui->tableWidget_item->setItem(i, 2, new QTableWidgetItem(QString()));
                    ui->tableWidget_item->setItem(i, 3, new QTableWidgetItem(QString()));
                }
        }
    }
}

void First_form::on_spinBox_curve_No_valueChanged(int )
{
    int index = ui->spinBox_curve_No->value() - 1;
    /*��������*/
    ui->label_std_num->setText( QString("%1").arg(poct_item.Curves[index].StdCount) ) ;
    ui->label_nongdu_change->setText( QString("%1").arg(poct_item.Curves[index].ConcTrans) ) ;
    ui->label_fanyingzhi_change->setText( QString("%1").arg(poct_item.Curves[index].RespTrans) ) ;
    ui->label_nihe_way->setText( QString("%1").arg(poct_item.Curves[index].Method) ) ;

    if(1 != poct_item.Curves[index].Method)
    {
        ui->label_fenduan_p->setVisible(0) ;
        ui->label_cishu_auto->setVisible(0) ;
        ui->label_cishu->setVisible(0) ;
        ui->label_126->setVisible(0) ;
        ui->label_128->setVisible(0) ;
        ui->label_129->setVisible(0) ;
    }
    else
    {
        ui->label_fenduan_p->setVisible(1) ;
        ui->label_cishu_auto->setVisible(1) ;
        ui->label_cishu->setVisible(1) ;
        ui->label_126->setVisible(1) ;
        ui->label_128->setVisible(1) ;
        ui->label_129->setVisible(1) ;
        ui->label_fenduan_p->setText( QString("%1").arg(poct_item.Curves[index].SectPosi) ) ;
        ui->label_cishu_auto->setText( QString("%1").arg(poct_item.Curves[index].SectLimits[0]) ) ;
        ui->label_cishu->setText( QString("%1").arg(poct_item.Curves[index].SectLimits[1]) ) ;
    }


    ui->tableWidget_curve->setRowCount(poct_item.Curves[index].StdCount) ;
    for(int i=0; i<poct_item.Curves[index].StdCount;i++)
    {
        ui->tableWidget_curve->setItem(i, 0, new QTableWidgetItem(QString("%1").arg(poct_item.Curves[index].Concs[i])));
        ui->tableWidget_curve->setItem(i, 1, new QTableWidgetItem(QString("%1").arg(poct_item.Curves[index].Resps[i])));
    }
}

//������ĿΪ��ǰ
void First_form::on_pushButton_setitem_clicked()
{
     //�����ҳ���Ŀ���ĸ��ļ�
    if(itemList.size() <= 0 )
    {
        info2error_dialog(this->isEN?"No current project!"
                                     :tr("��ǰ����Ŀ!")) ;
        return ;
    }
    if(ui->listWidget_setP_2->currentRow()>=0)
    {
        // DBG_DEBUG("%s", qPrintable(itemList.at(ui->listWidget_setP_2->currentRow()).bcode));
        load_set_project(itemList.at(ui->listWidget_setP_2->currentRow()) );
        info2error_dialog(this->isEN?"fa Set success!"
                                   :tr("fa�趨�ɹ�!")) ;
        return;
    }
    else
    {
        info2error_dialog(this->isEN?"Please select Item!"
                                   :tr("��ѡ����Ŀ!")) ;
    }

}
/*ɸѡ*/
void First_form::on_comboBox_prj_currentIndexChanged(int)
{
    //ui->histroyButton->click() ;
    this->select_date->who_calls =1 ;
    date_select_slot() ;

}

void First_form::on_comboBox_prj_2_currentIndexChanged(int)
{
    //ui->primaryButton->click() ;
    this->select_date->who_calls = 2 ;
    date_select_slot() ;
}
/*��Ŀ�ο�ֵ*/
void First_form::on_pushButton_refer_edit_clicked()
{
    if(ui->tableWidget_refer->rowCount() <=0 )
    {
        info2error_dialog(this->isEN?"No current project!"
                                     :tr("��ǰ����Ŀ!")) ;
        return ;
    }
    int row = ui->tableWidget_refer->currentRow() ;
    if(row < 0)
    {
        info2error_dialog(this->isEN?"Please select Item!"
                                   :tr("��ѡ����Ŀ!")) ;
        return ;
    }

    prj_form->prj_name->setText(ui->tableWidget_refer->item(row, 0)->text() ) ;
    prj_form->low_edit->setText(ui->tableWidget_refer->item(row, 1)->text() ) ;
    prj_form->up_edit->setText(ui->tableWidget_refer->item(row, 2)->text() ) ;

    prj_form->show() ;
}
void First_form::save_refer_edit()
{
    int row = ui->tableWidget_refer->currentRow() ;
    QString low = prj_form->low_edit->text() ;
    QString up  = prj_form->up_edit->text() ;
    if(row < 0)
    {
        return ;
    }
    /*����*/
    ui->tableWidget_refer->item(row, 1)->setText(low) ;
    ui->tableWidget_refer->item(row, 2)->setText(up) ;
    /*�޸�*/
    PROJECT_ITEM tmp = idpro_unique_list.at(row) ;
    if(low.isEmpty()){
        tmp.low =  -1 ;
        tmp.str_low = "-1" ;
    }
    else{
        tmp.low = low.toDouble() ;
        tmp.str_low = low ;
    }

    if(up.isEmpty()){
        tmp.up = -1 ;
        tmp.str_up = "-1" ;
    }
    else{
        tmp.up = up.toDouble() ;
        tmp.str_up = up ;
    }
    idpro_unique_list.replace(row, tmp) ;
    /*����*/
    myHelper::WriteIDProject(&idpro_unique_list) ;
    myHelper::write_system_record("log/diary.ini", "A403", QDateTime::currentDateTime()) ;//�ռǼ�¼
}




void First_form::on_pushButton_refer_del_clicked()
{

    if(ui->tableWidget_refer->rowCount() <=0 )
    {
        info2error_dialog(this->isEN?"No current project!"
                                     :tr("��ǰ����Ŀ!")) ;
        return ;
    }
    int row = ui->tableWidget_refer->currentRow() ;
    if(row < 0)
    {
        info2error_dialog(this->isEN?"Please select Item!"
                                   :tr("��ѡ����Ŀ!")) ;
        return ;
    }
    if(!myHelper::ShowMessageBoxInfo(this->isEN?"Delete?"
                                     :tr("�Ƿ�ɾ��?")))
        return ;
    /*�޸�*/
 //   PROJECT_ITEM tmp = idpro_unique_list.at(row) ;
    idpro_unique_list.removeAt(row ) ;
    /*����*/
    myHelper::WriteIDProject(&idpro_unique_list) ;

    ui->tableWidget_refer->setRowCount(idpro_unique_list.count()) ;
    for(int k=0; k<idpro_unique_list.count(); k++ )
    {
        ui->tableWidget_refer->setItem(k, 0, new QTableWidgetItem(idpro_unique_list.at(k).prj_name));
        if(idpro_unique_list.at(k).low >= 0 )
            ui->tableWidget_refer->setItem(k, 1, new QTableWidgetItem(QString("%1").arg(idpro_unique_list.at(k).low)));
        else
            ui->tableWidget_refer->setItem(k, 1, new QTableWidgetItem(""));
        if(idpro_unique_list.at(k).up >= 0 )
            ui->tableWidget_refer->setItem(k, 2, new QTableWidgetItem(QString("%1").arg(idpro_unique_list.at(k).up)));
        else
            ui->tableWidget_refer->setItem(k, 2, new QTableWidgetItem(""));
    }
}
/*********************************
*���ò˵�����&ϵͳ����
*
**********************************/
void First_form::on_toolButton_sub_s_jichu_clicked()
{
    ui->toolButton_sub_s_jichu->setEnabled(0) ;
    ui->toolButton_sub_s_tongxi->setEnabled(1) ;
    ui->toolButton_sub_s_yonghu->setEnabled(1) ;
    ui->stackedWidget_4->setCurrentIndex(0) ;
}

void First_form::on_toolButton_sub_s_tongxi_clicked()
{
    ui->toolButton_sub_s_jichu->setEnabled(1) ;
    ui->toolButton_sub_s_tongxi->setEnabled(0) ;
    ui->toolButton_sub_s_yonghu->setEnabled(1) ;
    ui->stackedWidget_4->setCurrentIndex(1) ;
}


void First_form::on_toolButton_sub_s_yonghu_clicked()
{
    ui->toolButton_sub_s_jichu->setEnabled(1) ;
    ui->toolButton_sub_s_tongxi->setEnabled(1) ;
    ui->toolButton_sub_s_yonghu->setEnabled(0) ;
    ui->stackedWidget_4->setCurrentIndex(2) ;
}
void First_form::on_commandLinkButton_setsave_clicked()
{

    if(myHelper::ShowMessageBoxInfo(this->isEN?"Save?"
                                    :tr("�Ƿ񱣴�?")))
    {
        set_test.Startnum = ui->spinBox_startnum->value() ;

        set_test.Numlenth = ui->spinBox_lenght_num->value();

        set_test.Autoprint = ui->checkBox_autoprint->isChecked();
        set_test.Scanbar = ui->checkBox_checkbar->isChecked();
        set_test.keepdays = ui->spinBox_keeptime->value();
        set_test.Autotest = ui->checkBox_autotest->isChecked();
        set_test.Beep = ui->checkBox_Beep->isChecked();
        Beep_Dri::Get_Beep()->setEnable(set_test.Beep);

        ui->TH_show_lb->setVisible(set_test.showTemperature);

        int min  = ui->spinBox_temMin->value();
        int max  = ui->spinBox_temMax->value();

        if (button_lock) qApp->processEvents();
        if(ui->checkBox_temp->isVisible())
            on_allButton_clicked(qPrintable(QString("COM19%1,%2 ").arg(max).arg(min)));

        update_currentnumtostring();

        QStringList infos ;
        infos << QString("%1").arg(set_test.Startnum)
              << QString("%1").arg(set_test.Numlenth)
              << QString("%1").arg(set_test.Samelenth)
              << QString("%1").arg(set_test.Autoprint)
              << QString("%1").arg(set_test.Scanbar)
              << QString("%1").arg(set_test.keepdays)//�������������������㣬�����ǰ��� 2018/09/10
              << QString("%1").arg(set_test.Autotest)
              << QString("%1").arg(set_test.showTemperature)
            << QString("%1").arg(set_test.Beep) ;

        myHelper::WriteConfig(infos, "Set_test") ;

        myHelper::ShowMessageBoxQuesion(this->isEN?"Save successfully!"
                                                 :tr("����ɹ�!")) ;
        myHelper::write_system_record("log/diary.ini", "A401", QDateTime::currentDateTime()) ;//�ռǼ�¼
    }
}

void First_form::on_pushButton_baudnext_clicked()
{

    QPushButton *btn = (QPushButton *)sender();
    QString objName = btn->objectName();

    if (objName == "pushButton_baudnext")
    {
        int max_index = ui->comboBox_buad->count() -1;
        int cur_index = ui->comboBox_buad->currentIndex() ;

        if(cur_index + 1 <= max_index )
            ui->comboBox_buad->setCurrentIndex(cur_index + 1);
        else
            ui->comboBox_buad->setCurrentIndex(0);
    }

}

void First_form::on_commandLinkButton_lis_clicked()
{
    if(button_lock)
    {
        if(myHelper::ShowMessageBoxInfo(this->isEN?"Save?"
                                        :tr("�Ƿ񱣴�")))
        {
            disableButton_clicked(0);//����
            set_lis.auto_upload = ui->comboBox_autoupload->currentIndex();
            set_lis.udp_port = ui->spinBox_udp_host->value() ;
            set_lis.udp_ip = (QString("%1.%2.%3.%4").arg(ui->spinBox_ip1->value())
                              .arg(ui->spinBox_ip2->value())
                               .arg(ui->spinBox_ip3->value())
                               .arg(ui->spinBox_ip4->value())) ;
            set_lis.uart_buad = ui->comboBox_buad->currentIndex();
            set_lis.com = ui->comboBox_buad->currentIndex() ;
            set_lis.current_upload_way = ui->comboBox_uploadway->currentIndex() ;
           // set_lis.language = ui->comboBox_selectLan->currentIndex();
            set_lis.local_ip = (QString("%1.%2.%3.%4").arg(ui->spinBox_ip1_2->value())
                              .arg(ui->spinBox_ip2_2->value())
                               .arg(ui->spinBox_ip3_2->value())
                               .arg(ui->spinBox_ip4_2->value())) ;

            QStringList hscrplis ;
            hscrplis << QString("%1").arg(0) ;
            myHelper::WriteConfig(hscrplis, "Set_crp") ;

             QStringList infos ;
             infos << QString("%1").arg(set_lis.auto_upload)
                   << QString("%1").arg(set_lis.udp_port)
                   << set_lis.udp_ip
                   << QString("%1").arg(set_lis.uart_buad)
                   << QString("%1").arg(set_lis.com)
                   << QString("%1").arg(set_lis.current_upload_way)
                   << QString("%1").arg(set_lis.language)
                      << set_lis.local_ip;
             myHelper::WriteConfig(infos, "Set_lis") ;

              uploadInterface.resetConnect(
                          set_lis.uart_buad,
                          set_lis.udp_ip,
                          set_lis.udp_port,
                          set_lis.local_ip);
        }
        disableButton_clicked(1);//����
    }
}

void First_form::on_commandLinkButton_time_save_clicked()
{
    disableButton_clicked(1);//����
        if(button_lock)
        {
            if(myHelper::ShowMessageBoxInfo(this->isEN?"Save?"
                                            :tr("�Ƿ񱣴�")))
            {
                disableButton_clicked(0);//����
                QString time ;
                time = QString("date -s \"%1-%2-%3 %4:%5:%6\"")
                        .arg(ui->spinBox_year_2->value())
                        .arg(ui->spinBox_month_2->value())
                        .arg(ui->spinBox_day_2->value())
                        .arg(ui->spinBox_hour->value())
                        .arg(ui->spinBox_minute->value())
                        .arg(QTime::currentTime().toString("ss"));

                serial_thead->Time_lock.lock();
                 system(time.toLocal8Bit().constData()) ;  //����ϵͳʱ�Ӹ�ʽ: date ����ʱ����.��
                 system("hwclock  -w") ;                          //-w ��ϵͳʱ��ͬ����Ӳ��ʱ��
                 system("sync");                                       //-s ��Ӳ��ʱ��ͬ����ϵͳʱ��
                serial_thead->Time_lock.unlock();//�����������ʱ��deʱ��ᵼ�´����̶߳��������ſ������� 2018-10-22
                qDebug() <<__LINE__ <<__FUNCTION__<<time;
                myHelper::ShowMessageBoxQuesion(this->isEN?"Save successfully!"
                                                         :tr("����ɹ�!")) ;
                myHelper::write_system_record("log/diary.ini", "A501", QDateTime::currentDateTime()) ;//�ռǼ�¼
            }
            disableButton_clicked(1);//����
        }
}
/*ϵͳ����*/
void First_form::on_pushButton_update_clicked()
{
    QDir dir(EXPORT_PAT) ;
    dir.setFilter(QDir::Dirs );
    dir.setSorting(QDir::DirsFirst);
    QFileInfoList list = dir.entryInfoList() ;
    QFileInfoList t_list ;

    for(int i=0; i<list.count(); i++)
    {
        qDebug() <<__LINE__ <<__FUNCTION__
                << list.at(i).fileName();
        if(list.at(i).fileName() !="." && list.at(i).fileName() !="..")
            t_list << list.at(i) ;
    }


    if(t_list.count() == 1)
    {
        if (myHelper::FileIsExist(t_list.at(0).absoluteFilePath() + "/update")) //
        {
            if(
                   myHelper::FileIsExist(t_list.at(0).absoluteFilePath() + "/update/" + "QMain") &&
                   myHelper::FileIsExist(t_list.at(0).absoluteFilePath() + "/update/" + "config.ini") &&
                   myHelper::FileIsExist(t_list.at(0).absoluteFilePath() + "/update/" + "update")
            ){
                 //�������������Ժ�..һ����
                 if(myHelper::ShowMessageBoxInfo(this->isEN?"Upgrade procedure has been detected?"
                                                 :tr("�Ѽ�⵽���������Ƿ�����?")))
                 {
                     QString sh_path;

                     detect_timer.stop();
                     button_lock = 0 ;

// �Ѹ����ļ�������
                     sh_path = "cp -r " + t_list.at(0).absoluteFilePath() + "/update/ " + ".";
                     system("rm update/* -rf");
                     system( sh_path.toLocal8Bit().constData() ) ;//linux command in terminal
                                                                                                //cp -r /media/sda1/update/ .
                     if(myHelper::FileIsExist("update/update"))
                     {
                            info2error_dialog(this->isEN?"fsUpgrade now, please wait..."
                                                       :tr("fs��������,���Ժ�..")) ;
                            system("bash update/update") ;//ִ��update�ű�

                            form_count = 1 ;
                            form_count_num= 60 ;
                            form_count_str = (this->isEN?"fsThe upgrade was successful. turn off the power and restart "
                                                       :tr("fs�����ɹ�����رյ�Դ������ϵͳ"));

                     }
                     else
                     {
                        info2error_dialog(this->isEN?"Upgrade error!"
                                                   :tr("��������!")) ;
                     }
                 }
            }
           else
            {
                info2error_dialog(this->isEN?"The upgrade procedure is incomplete!"
                                           :tr("������������!")) ;
                return ;
            }
        }
        else
        {
            info2error_dialog(this->isEN?"Unable to detect upgrade procedure!"
                                       :tr("��ⲻ����������!")) ;
        }

    }
    else if(t_list.count() >= 1)
    {
        info2error_dialog(this->isEN?"Please remove excess storage equipment"
                                   :tr("��γ�����Ĵ����豸!")) ;
    }
    else
    {
        info2error_dialog(this->isEN?"Please insert U disk!"
                                   :tr("�����U��!")) ;
    }
}

void First_form::on_pushButton_register_clicked()
{
    QString tt = ui->label_cmp_name->text() ;

    //QString ret ;
    if(!tt.isEmpty())
    {
        if(!tt.isEmpty())
            reg_form->name->setText(tt);
    }
    else
        reg_form->name->clear();
    reg_form->address->setText(reg_form->str_addr) ;

   reg_form->show();
}
/*����ע�ᴰ��*/
void First_form::register_form()
{
    QString code = reg_form->str_code ;                             //�ͻ�����ע���� ,ǰ��λΪ��� ,����λΪMD5ֵ
    QString name =  reg_form->str_name ;                        //��������
    QString num = reg_form->str_num ;                               //�������к�Ŷ��
    int len = reg_form->str_name.toLocal8Bit().length() ;
    if(code.isEmpty() || name.isEmpty())
    {
        info2error_dialog(this->isEN?"Input name and registration code cannot be empty!"
                                   :tr("�������ƺ�ע���벻��Ϊ��!")) ;
    }
    else
    {
        if(len > 30)
        {
            info2error_dialog(this->isEN?"Enter no more than 15 words for the name!"
                                       :tr("�������Ʋ��ܳ���15������!")) ;
        }
        else
        {
            QString md_v ;
            QString ret ;

           md_v = MD5String(num + name) ;                           //������+��˾�� -->���MD5ֵ
           ret = md_v.mid(2,6) ;

            qDebug() <<__LINE__ <<__FUNCTION__<< "reg code:"<<ret;

            unsigned char ture_num, ture_num1,ture_num2 ;
            unsigned char md5_num, md5_num1, md5_num2 ;

             myHelper::mystring2hex(md_v.at(0), &ture_num1) ;
             myHelper::mystring2hex(md_v.at(1), &ture_num2)  ;
             ture_num = ture_num1*16 + ture_num2 ;


            myHelper::mystring2hex(code.at(0), &md5_num1) ;
            myHelper::mystring2hex(code.at(1), &md5_num2)  ;
            md5_num = md5_num1*16  + md5_num2 ;

            register_array[4][0] = md5_num^ture_num ;


            //printf("register_array[4][0] ==> %x \n",register_array[4][0] );
            printf("recover ==> %x , area_code = %d,  md5_num=%x\n",register_array[4][0]^ md5_num,  register_array[4][0], md5_num);



            if(ret == code.mid(2,6))                                                //ǰ��λΪ��Ų����бȽ�
            {
                //�ȹر��Զ����
                info2error_dialog(this->isEN?"fsData is being saved, please wait..."
                                           :tr("fs���ڱ�������,���Ժ�...")) ;

                reg_form->hide();
                //
                char tmp[30],tmp2[10] ;
                bzero(tmp, 30);bzero(tmp2, 10) ;
                char *p =  tmp;
                 memcpy(tmp, name.toLocal8Bit().constData(), len)  ;
                 //ע��Ļ�������
                 for(int ii=0; ii<3; ii++)
                     for(int jj=0; jj<10; jj++)
                     {
                             register_array[ii][jj] = *p ;
                             p++ ;
                     }
                 //ratio�ĸ�����Χ
                 for(int jj=0; jj<10; jj++)
                 {
                         register_array[3][jj] = 0 ;
                         p++ ;
                 }
                 register_array[3][0] = 0x0a ;

                 //address
                 myHelper::write_config_sig("address.ini", "Address",  "address", reg_form->str_addr) ;


                on_allButton_clicked("COM16") ; //дע����
                ui->label_cmp_name->setText(name);
                ui->label_cmp_addr->setText(reg_form->str_addr);
                INSTITUTION = name ;                                       //���������ƴ�����
                init_finsh = 1 ;                                           //�Ƿ����Զ����
                myHelper::write_system_record("log/diary.ini", "A404", QDateTime::currentDateTime()) ;//�ռǼ�¼
            }
            else
            {
                info2error_dialog(this->isEN?"Registration code error!"
                                           :tr("ע�������!")) ;
            }
        }

    }
}
//У׼
void First_form::on_pushButton_ts_ca_clicked()
{

    if(myHelper::ShowMessageBoxInfo(this->isEN?"The old profile is about to be deleted. Will the calibration continue?"
                                    :tr("����ɾ���������ļ�,�Ƿ��������У׼?")))//tr("������ֵ�У׼��ͷ��У׼���Ϊ����״̬,��رյ�Դ����!")))
    {
      //system("/usr/bin/ts_calibrate ") ;
        info2error_dialog(this->isEN?"fsThe configuration file is being deleted. Please wait a moment..."
                                   :tr("fs����ɾ�������ļ�,���Ժ�..")) ;
       system("rm /etc/pointercal") ;
       QElapsedTimer t;
       t.start();
       while(t.elapsed()<4000)
       QCoreApplication::processEvents();
         info2error_dialog(this->isEN?"fsThe  Calibration already, please restart the power, "
                                      "so that the system into the calibration interface!"
                                    :tr("fsУ׼׼������,��������Դ,ʹϵͳ����У׼����!")) ;
       //exit(1 ) ;
    }
}

void First_form::on_change_languagepushButton_clicked()
{
    set_lis.language = 0 ;

    /*���浽INI*/
    //if(ui->commandLinkButton_time_save->text() == "Save")
        //set_lis.language = 1 ;
      //else

        if(init_tmp < 2)    //��ʼ��������¼
        {
            myHelper::write_config_sig("config.ini", "Set_lis", "language", QString("%1").arg(set_lis.language)) ;
            myHelper::write_system_record("log/diary.ini", "A804", QDateTime::currentDateTime()) ;//�ռǼ�¼
        }

        emit chage_language(0) ;                                //chinese

        ui->change_languagepushButton->setEnabled(0) ;

        ui->change_languagepushButton_english->setEnabled(1) ;


        /*    ����ķ����޸�hui����״̬ ...2018-09-1      */
        ui->label_Liushuihao_Format->setText("NO.YYMMDD");
        //spinBox_year_2  spinBox_mon_2  spinBox_day_2  label_yearInSet
        ui->label_yearInSet->setGeometry(30,30,61,41);
        ui->label_monthInSet->setGeometry(120,30,61,41);
        ui->label_dayInSet->setGeometry(220,30,61,41);

        ui->spinBox_year_2->setGeometry(24,80,71,51);
        ui->spinBox_month_2->setGeometry(120,80,71,51);
        ui->spinBox_day_2->setGeometry(220,80,71,51);


        /*�޸Ĳ���ҳ���µ�������������ϵͳ���Ա仯  2018/09/18      */
        if(ui->label_batch_2->text().toLocal8Bit() == "Serum/Plasma")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Ѫ��/Ѫ��") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit()== "Whole Blood")
            ui->label_batch_2->setText(QString::fromLocal8Bit("ȫѪ") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "Peripheral Blood")
            ui->label_batch_2->setText(QString::fromLocal8Bit("ĩ��Ѫ") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "Urine")
            ui->label_batch_2->setText(QString::fromLocal8Bit("��Һ") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit()== "QC")
            ui->label_batch_2->setText(QString::fromLocal8Bit("�ʿ�") )  ;
        ui->checkBox_Beep->setText(tr("��������"));
}
void First_form::on_change_languagepushButton_english_clicked()
{
    qDebug() <<__LINE__ <<__FUNCTION__<<"change language enlish";
    set_lis.language = 1 ;      //english

    if(init_tmp < 2)  //��ʼ��������¼
    {
        myHelper::write_config_sig("config.ini", "Set_lis", "language", QString("%1").arg(set_lis.language)) ;
        myHelper::write_system_record("log/diary.ini", "A804", QDateTime::currentDateTime()) ;//�ռǼ�¼
    }

    emit chage_language(1) ;

    ui->change_languagepushButton->setEnabled(1) ;

    ui->change_languagepushButton_english->setEnabled(0) ;

     /*�޸����ò˵�Ŀ¼��ϵͳ����ΪӢ��ʱ��ˮ����ʼֵ��ϵͳʱ�����ʾ��ʽ
      Ŀǰû�и��õİ취��ֻ����д����-_-|||    2018-08-31      */

    ui->label_Liushuihao_Format->setText("NO.MMDDYY");
    QRect temp;
    temp = ui->spinBox_year_2->geometry();
    ui->spinBox_year_2->setGeometry(ui->spinBox_day_2->geometry());
    ui->spinBox_day_2->setGeometry(ui->spinBox_month_2->geometry());
    ui->spinBox_month_2->setGeometry(temp);

    temp = ui->label_yearInSet->geometry();
    ui->label_yearInSet->setGeometry(ui->label_dayInSet->geometry());
    ui->label_dayInSet->setGeometry(ui->label_monthInSet->geometry());
    ui->label_monthInSet->setGeometry(temp);
    ui->label_HisSaveTime->setText(tr("Record Keeping Time(Days):"));
    ui->checkBox_Beep->setText("Touch  buzzer");
//    ui->label_TempContrlRange->setText(tr("Temperature Control(��):"));

    /*�޸Ĳ���ҳ���µ�������������ϵͳ���Ա仯  2018/09/18      */
        if(ui->label_batch_2->text().toLocal8Bit() == "Ѫ��/Ѫ��")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Serum/Plasma") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit()== "ȫѪ")
           ui->label_batch_2->setText(QString::fromLocal8Bit("Whole Blood") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "ĩ��Ѫ")
           ui->label_batch_2->setText(QString::fromLocal8Bit("Peripheral Blood") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "��Һ")
           ui->label_batch_2->setText(QString::fromLocal8Bit("Urine") )  ;
       else if(ui->label_batch_2->text().toLocal8Bit()== "�ʿ�")
            ui->label_batch_2->setText(QString::fromLocal8Bit("QC") )  ;
}


 void  First_form::change_language_slot(int sw)
 {
     ui->comboBox_test_model->blockSignals(true);
     //2018/09/04
     this->isEN = myHelper::read_config_sig(CONFIG_INI,
                                                 "Set_lis",
                                                 "language").toInt() ;

     ui->lineEdit_std_print_declar->setText((this->isEN?"This Result Is Only For "
                                                        "This Sample!"
                                                     :tr("�����ֻ�Ա��ݱ걾����")));

    if(!ui->label_prj->text().isEmpty())//������Ŀ���յ�ʱ��ȥ������
        this->initChannelShow(1);//�����ʵʱ��Ӣ��ʾ
    qDebug() <<__LINE__ <<__FUNCTION__<<"sw = 1";
     QFont font ;
    if(sw)//sw == 1 ΪӢ��
    {
       if(translator->load(":/english_to_zh.qm"))
       {
           qDebug() <<__LINE__ <<__FUNCTION__<<"load file.qm is success!";
        }
        else
        {
            qDebug() <<__LINE__ <<__FUNCTION__<<"to load faluse!!";
        }
        QCoreApplication::installTranslator(translator);

        font.setPointSize(12) ;
        ui->label_17->setFont(font) ;//����������
        ui->label_34->setFont(font) ;//��������
    }
    else
    {
        QCoreApplication::removeTranslator(translator) ;
        /*�����ţ���Ʒ����...*/
        font.setPointSize(16) ;
       ui->label_17->setFont(font) ;
       ui->label_34->setFont(font) ;
    }

    emit update_ui_password();
    emit update_ui_errordialog() ;
    emit update_ui_register() ;
    emit update_ui_detial_form() ;
    emit update_ui_history_edit() ;
    emit update_ui_keyboard() ;
    emit update_ui_numkeyboard() ;

    emit update_ui_prj_pm() ;
    emit update_ui_multicard() ;
    emit update_ui_date() ;


    ui->retranslateUi(this);
   //���ù��ڽ����ͼƬ
    //QPixmap qpix ;
    //qpix.load("logo.png") ;
    //ui->label->setPixmap(qpix);

    ui->label_cmp_name->setText(INSTITUTION);
    /*������Ŀ����*/
    if (!itemMat->getCur_info().bcode.isEmpty())
    {
        load_set_project(itemMat->getCur_info());
    }
    /*���´��̿ռ�*/
    check_disk() ;
    /*���ڽ����*/

    /*3�����ͺ�*/
    ui->label_91->setText(system_config.machine) ;
    /*4�����汾*/
    ui->label_93->setText(system_config.version[sw] + (system_config.hasBuild? myHelper::GetBuildTime():QString())) ;
    /*5�������� */
    QString tmpSampleType;
    QStringList stypes;
    for (int i = 0; i < 9; i++)
    {
        tmpSampleType = system_config.sample_type[sw][i];
        if (!tmpSampleType.isEmpty())
        {
            ui->stackedWidget->findChildren<QLabel*>(QString("label_stype%1").arg(i)).at(0)->setText(tmpSampleType);
            stypes << tmpSampleType;
        }
    }
    ui->comboBox_type->clear();
    ui->comboBox_type->addItems(stypes);


    QStringList testmodel;

    testmodel   << (this->isEN?"Signle Channel":tr("��ͨ��"))
                << tr("1����")
                << tr("2����")
                << tr("3����")
                << tr("4����")
                << (this->isEN?"Five-MultiCard":tr("5����"));

    ui->comboBox_test_model->clear();
    int newIndex = 0;
    for (int i = 0, j = 0; i < testmodel.size(); i++)
    {
        if (i == 0 || i == 5)
        {
            ui->comboBox_test_model->addItem(testmodel.at(i), i);
            if (i == wait_for_test_cur_model)
            {
                newIndex = j;
            }
            j++;
        }
    }
    ui->comboBox_test_model->setCurrentIndex(newIndex);
    ui->comboBox_test_model->blockSignals(false);
    setTestButtonSt();

    ui->comboBox_uploadway->setCurrentIndex(set_lis.current_upload_way);
    ui->comboBox_buad->setCurrentIndex(set_lis.uart_buad);
    ui->comboBox_autoupload->setCurrentIndex(set_lis.auto_upload);
}
void First_form::on_pushButton_multicard_clicked()
 {
     muti_card_set->list->clear() ;
     QStringList head ;
     head << (this->isEN?"Item":tr("��Ŀ"))
          << (this->isEN?"SubItem":tr("����"))
          << (this->isEN?"Output":tr("���"));
     muti_card_set->list->setHorizontalHeaderLabels(head) ;
     //1ȷ������
     int row_count = 0;
     for(int i=0; i<multi_card_list.count(); i++)
         row_count += multi_card_list.at(i).sub_count ;
     muti_card_set->list->setRowCount(row_count) ;
     muti_card_set->list->setColumnCount(3) ;

     /*2�ȳ�ʼ��������������*/
     for(int i=0; i<3; i++)
         for(int k=0; k<row_count; k++)
             muti_card_set->list->setItem(k, i, new QTableWidgetItem(" ")) ;

     /*3�ϲ���Ԫ��*/
     QTableWidgetItem*  itemGet ;
     int current_row = 0;                                                                //���ڼ�¼��ǰ�������
     for(int i=0; i<multi_card_list.count(); i++)
     {
         muti_card_set->list->setSpan(current_row, 0, multi_card_list.at(i).sub_count, 1);        //�ϲ���Ԫ��

         itemGet = muti_card_set->list->item(current_row, 0) ;                                                      //��һ��
         itemGet->setText(multi_card_list.at(i).main_name) ;

         for(int k=0; k<multi_card_list.at(i).sub_count; k++)
         {
             itemGet = muti_card_set->list->item(current_row + k, 1) ;                                           //��2��
             itemGet->setText(multi_card_list.at(i).sub_name[k]) ;

             QCheckBox *comBox = new QCheckBox() ;                                                                //��3��
             //qDebug() << multi_card_list.at(i).sub_use[k] ;
             comBox->setChecked(multi_card_list.at(i).sub_use[k]) ;
             muti_card_set->list->setCellWidget(current_row + k, 2, comBox) ;

         }

         current_row += multi_card_list.at(i).sub_count ;
     }

     /*��ʼ��ʾ*/
     muti_card_set->show() ;
 }

 void First_form::add_multi_card_item()
 {
     for (QList<ItemManager::ID_info>::const_iterator it = itemList.constBegin(); it != itemList.constEnd(); it++)
     {
         if (it->type == 0)
         {
             continue;
         }

         bool has = false;

         for(QList <MUTI_CARD>::const_iterator mit = multi_card_list.constBegin(); mit != multi_card_list.constEnd(); mit++)
         {
             if(it->title == mit->main_name)
             {
                 has = true;
                 break;
             }
         }

         if (!has)
         {
             POCT_ITEM tmp ;
             MUTI_CARD multi_tmp ;

             multi_tmp.sub_count = 0 ;
             if(!itemMat->loadItem(*it, &tmp))
             {
                 printf("LoadIDHex: failed,no project file \n") ;
             }
             else
             {
                 //1
                 multi_tmp.main_name = tmp.ReportTitle.remove(" ") ;

                 for(int i=0; i<tmp.ItemCount; i++)
                 {
                     for(int j = 0; j < 5; j++)          //����Ŀ�������Ŀ
                     {
                         if(!tmp.SIs[i].Name[j].isEmpty() )
                         {
                             //2
                             multi_tmp.sub_name[multi_tmp.sub_count] = tmp.SIs[i].Name[j].remove(" ") ;

                             //3
                             multi_tmp.sub_count ++ ;
                         }
                     }
                 }
                 //4
                 for(int k=0; k<25; k++) multi_tmp.sub_use[k] = 1 ;

             }
             if(tmp.ItemCount && multi_tmp.sub_count)         //û������Ŀ����û��������Ŀ?
             {
                 if(! (tmp.ItemCount == 1 && multi_tmp.sub_count == 1) )       //����Ŀ���棬ֻ��һ��������Ŀ�Ͳ�������
                     multi_card_list << multi_tmp;
             }
         }
     }
 }
 void First_form::save_multi_item_slot()
 {
     int current_row = 0;
     QCheckBox *newBox  ;


     for(int k=0; k<multi_card_list.count(); k++)
     {
           MUTI_CARD tmp_muti = multi_card_list.at(k);
           for(int y=0; y<tmp_muti.sub_count; y++)
           {
                newBox = qobject_cast<QCheckBox*>(muti_card_set->list->cellWidget(current_row + y, 2));
                 tmp_muti.sub_use[y] = newBox->isChecked() ;
           }
           multi_card_list.replace( k, tmp_muti) ;
           current_row += tmp_muti.sub_count ;
     }

     myHelper::Write_multi_card_par("Project/multi_card.ini", multi_card_list) ;
 }

 void First_form::on_commandLinkButton_print_save_clicked()
 {
    disableButton_clicked(1);//����
     if(button_lock)
     {
         disableButton_clicked(0);//����
         if(myHelper::ShowMessageBoxInfo(this->isEN?"Save?"
                                         :tr("�Ƿ񱣴�")))
         {
             if(ui->lineEdit_std_print_declar->text().toLocal8Bit().length() > 31)
             {
                 emit info2error_dialog(this->isEN?"Report statements should be no more than 15 words!"
                                                 :tr("�����������ܳ���15������"));
                 return ;
             }
             set_test.Autoprint = ui->checkBox_autoprint->isChecked() ;

             myHelper::write_config_sig("config.ini", "Set_test", "Autoprint", QString("%1").arg(set_test.Autoprint )) ;
             myHelper::write_config_sig("config.ini", "Set_lis", "print_detail", QString("%1").arg(ui->checkBox_print_detail->isChecked())) ;
             myHelper::write_config_sig("config.ini", "Set_lis", "print_count", QString("%1").arg(ui->spinBox_print_count->value())) ;
             myHelper::write_config_sig("config.ini", "Set_lis", "print_declar", ui->lineEdit_std_print_declar->text()) ;

             disableButton_clicked(1);
             myHelper::ShowMessageBoxQuesion(this->isEN?"Save successfully!"
                                                      :tr("����ɹ�!")) ;
            myHelper::write_system_record("log/diary.ini", "A601", QDateTime::currentDateTime()) ;//�ռǼ�¼
         }
     }
     disableButton_clicked(1);//����
 }
 /*��Ŀ*/





/*���ּ���*/
void First_form::on_num1Button_clicked()
{
    QPushButton *btn = (QPushButton *)sender();
    QString objName = btn->objectName();
    QString str ;

    if(objName != "removeButton")
    {
       str =  btn->text();
       ui->lineEdit_xiangmuxishu->setText(ui->lineEdit_xiangmuxishu->text() + str);
    }
    else if(objName == "removeButton")
    {
        QString old_str = ui->lineEdit_xiangmuxishu->text() ;
        int old_str_num = old_str.count() ;
        if(old_str_num > 0)
            ui->lineEdit_xiangmuxishu->setText(old_str.remove(old_str_num -1 , 1));
    }

}
/*�ɵ��ڵĲ���ϵ���б�ѡ��仯*/
void First_form::on_tableWidget_xishu_currentItemChanged(QTableWidgetItem *, QTableWidgetItem *)
{
   //
    int row = ui->tableWidget_xishu->currentRow() ;
    if(row >=0 )
    {

        QString str = ui->tableWidget_xishu->item(row, 1)->text() ;

        ui->lineEdit_xiangmuxishu->setText(str);
    }
}
/*����ɵ��ڵĲ���ϵ��*/
void First_form::on_savexishuButton_clicked()
{

    int row = ui->tableWidget_xishu->currentRow() ;
    if(row >=0 )
    {

        QString str = ui->lineEdit_xiangmuxishu->text().remove(" ");
        RATIO_ITEM tmp ;
        tmp = pro_ratio_list.at(row) ;
        tmp.str_ratio = str ;
        pro_ratio_list.replace(row, tmp) ;
        myHelper::Write_Ratio(&pro_ratio_list) ;

        ui->tableWidget_xishu->item(row, 1)->setText(str); ;

        myHelper::write_system_record("log/diary.ini", "A701", QDateTime::currentDateTime()) ;//�ռǼ�¼
    }
}

void First_form::on_pushButton_xitong_jiaozhun_clicked()
{
    ui->pushButton_xitong_jiaozhun->setEnabled(0) ;
    ui->pushButton_xitong_shuju->setEnabled(1) ;
    ui->pushButton_xitong_yuyang->setEnabled(1) ;
    ui->stackedWidget_8->setCurrentIndex(0) ;
}

void First_form::on_pushButton_xitong_shuju_clicked()
{

    ui->pushButton_xitong_jiaozhun->setEnabled(1) ;
    ui->pushButton_xitong_shuju->setEnabled(0) ;
    ui->pushButton_xitong_yuyang->setEnabled(1) ;
    ui->stackedWidget_8->setCurrentIndex(1) ;
}

void First_form::on_pushButton_xitong_yuyang_clicked()
{

    ui->pushButton_xitong_jiaozhun->setEnabled(1) ;
    ui->pushButton_xitong_shuju->setEnabled(1) ;
    ui->pushButton_xitong_yuyang->setEnabled(0) ;
    ui->stackedWidget_8->setCurrentIndex(2) ;
}

void First_form::on_toolButton_xitong_gongneng_clicked()
{
    ui->toolButton_xitong_gongneng->setEnabled(0) ;
    ui->toolButton_xitong_moshi->setEnabled(1) ;

    ui->stackedWidget_7->setCurrentIndex(0) ;
}

void First_form::on_toolButton_xitong_moshi_clicked()
{
    ui->toolButton_xitong_gongneng->setEnabled(1) ;
    ui->toolButton_xitong_moshi->setEnabled(0) ;

    ui->stackedWidget_7->setCurrentIndex(1) ;

    myHelper::write_system_record("log/diary.ini", "A805", QDateTime::currentDateTime()) ;//�ռǼ�¼
}


/*********************************
*���˵�������л���
*
**********************************/
void First_form::on_btnT_menu_clicked()
{


    ui->stackedWidget->setCurrentIndex(0);
    ui->stackedWidget_3->setCurrentIndex(1);
    //
    ui->lineEdit_next_num_2->setFocus() ;

}

void First_form::on_btnH_menu_clicked()
{
    ui->stackedWidget->setCurrentIndex(1);
    ui->stackedWidget_3->setCurrentIndex(3);
}
void First_form::on_btnP_menu_clicked()
{
    ui->stackedWidget->setCurrentIndex(2);
    ui->stackedWidget_3->setCurrentIndex(4);
    // ui->stackedWidget_6->setCurrentIndex(0);

}

void First_form::on_btnS_menu_clicked()
{

    ui->stackedWidget->setCurrentIndex(3);
    ui->stackedWidget_3->setCurrentIndex(6);

}

void First_form::on_btnD_menu_clicked()
{


    ui->stackedWidget->setCurrentIndex(4);
    ui->stackedWidget_3->setCurrentIndex(7);

    /*ÿ�ν���ˢ��һ��*/
    if(!ui->toolButton_jilu_baojing->isEnabled())
        on_toolButton_jilu_baojing_clicked() ;
    else if(!ui->toolButton_jilu_guzhang->isEnabled())
        on_toolButton_jilu_guzhang_clicked() ;
    else if(!ui->toolButton_jilu_riji->isEnabled())
        on_toolButton_jilu_riji_clicked() ;

}
void First_form::on_btnQ_menu_clicked()
{
    ui->stackedWidget->setCurrentIndex(7);
    ui->stackedWidget_3->setCurrentIndex(5);

    /*�����̿ռ�*/
        check_disk() ;

}

void First_form::on_btna_menu_clicked()
{
    ui->stackedWidget->setCurrentIndex(9);
    ui->stackedWidget_3->setCurrentIndex(2);

}

void First_form::on_btnp_menu_clicked()
{
    ui->stackedWidget->setCurrentIndex(8);
    ui->stackedWidget_3->setCurrentIndex(8);

}
void  First_form::correct_password_slot(int sw)
{
    if(sw == 1)
    {

        ui->stackedWidget->setCurrentIndex(2);
    }
    else if(sw == 3)
    {

        ui->stackedWidget->setCurrentIndex(4);
    }
}
/*********************************
*��ʱ��
**********************************/
void First_form::timer_init()
{
    detect_timer.start(10,this);

}

void First_form::timerEvent(QTimerEvent *)
{

    if( lockbytimer )                                                           //��һ��ʱ���������������
    {
        if(lockbytimer_num == 0)
        {
            lockbytimer = 0 ;
            hide_button(1) ;
            emit set_button_signal();
        }
        else
        {
            lockbytimer_num-- ;
        }
    }
    /*�Զ���⿨*/
    static int tm = 0;

    if( button_lock && init_finsh && ui->checkBox_autotest->isChecked())
    {
        if(tm != 250)//��ʱ��ѭ��
        {
             tm++ ;
        }
        else
        {
            qDebug() <<__LINE__ <<__FUNCTION__<<"last_one = "<< last_one;
            tm = 0 ;
            if(last_one == 1)                                             //�����һ��ִ�е������ǲ��ԣ�����Ҫ�ȴ�һ��ʱ��ż������
            {
                 last_one = 0;
            }
            else
            {
                 qDebug() <<__LINE__ <<__FUNCTION__<<"HasReagentCard = "<< serial_thead->HasReagentCard;
                if(ui->checkBox_autotest->isChecked() )
                {
                    qDebug() <<__LINE__ <<__FUNCTION__<<"stop_auto = "<< stop_auto;
                    qDebug() <<__LINE__ <<__FUNCTION__<<"auto_ok_flag = "<< auto_ok_flag;

                    if(stop_auto && (ui->stackedWidget->currentIndex() == 0) && !auto_ok_flag)      //false ����Ҫֹͣ���
                     {
                            qDebug() <<__LINE__ <<__FUNCTION__<<"only oneneeen";
                             on_allButton_clicked("COM13") ;//�����Զ�����ָ��
                     }
                     button_lock = true; //����������û�취������һ���¼�
                }
            }
        }
    }
}


void First_form::time_out_solt()
{
    static int system_init = 0 ;
    ui->LCD_TIME->setText(QTime::currentTime().toString("hh:mm:ss") ) ;
    ui->LCD_DATE->setText(this->isEN?(QDate::currentDate().toString("MM-dd-yyyy"))
                               :(QDate::currentDate().toString("yyyy-MM-dd")));

    /*****************���������˳���ʾ���ڳ���ʱ��***********************/
    if(form_count)
    {
        if(form_count_num <= 0)
        {
            form_count = 0 ;

            emit form_count_signal(form_count_str) ;                   //�ָ�Ϊ����ť���Թرյ���ʾ����

        }
        else
        {
            form_count_num-- ;
        }
    }
    /***************������ʼ������ʱ**************************************/
    if(system_init < (INIT_TIME+1) )
    {
        ui->progressBar_2->setValue(system_init * 100 / INIT_TIME);
        system_init++ ;
    }

    /**********************��׼����ʱ��ĵ���*****************************/
    int flag = 0;
    for (int x = 0; x < 5; x++)
    {
        if(test_task[x].wait_for_test > 0 )
        {
            test_task[x].wait_for_test --;
            flag = 1;
        }
        else if (!test_task[x].wait_for_test && wait_for_test_cur_num == -1)// ����ʱ�ѵ�==0,�Ҳ�������Ϊ��
        {
            disableButton_clicked(0) ;
            button_lock = 1 ;
            wait_for_test_cur_num = x;
            qDebug() <<__LINE__ <<__FUNCTION__<<wait_for_test_cur_num;
            on_allButton_clicked("COM01") ;//����������
            flag = 1;
        }
    }
    if(flag == 1)
    {
        update_status();
    }

    /**********************�Զ����Թ�·����λ*****************************/
    if (stop_auto && auto_ok_flag && wait_for_test_cur_num == -1)
    {
        int x;
        for (x = 0; x < 5; x++)
        {
            if (test_task[x].wait_for_test != -1)
            {
                break;
            }
        }
        if (x == 5)
        {
            auto_ok_flag--;
            setTestButtonSt();
            if (!auto_ok_flag)
            {
                serial_thead->push_cmd("COM04");/*��·����λ*/
            }
        }
    }
}

void First_form::setTestButtonSt()
{
    bool testing = false;
    for (int i = 0; i < int (ARRAYSIZE(test_task)); i++)
    {
        if (test_task[i].wait_for_test != -1)
        {
            testing = true;
            break;
        }
    }
    QString str = (this->isEN?"Cancel"
                            :tr("ȡ��"));
    if (!testing)
    {
        if (ui->checkBox_autotest->isChecked())
        {
            if (auto_ok_flag)
            {
                str =(this->isEN?tr("Autotesting(%1)").arg(auto_ok_flag)
                               :tr("�Զ�����(%1)").arg(auto_ok_flag)) ;
            }
            else
            {
                str = (this->isEN?"Autotesting"
                                :tr("�Զ�������"));
            }
        }
        else
        {
            str = (this->isEN?"Test"
                            :tr("����")) ;
        }
    }
    ui->rcardButton->setText(str);
}

void First_form::initChannelShow(bool Resul_realTime)
{
    QString msg;
    if(Resul_realTime)//���Ա任 �����ʾ��ҲҪ�任
    {
        if ( !ui->ret_40->isVisible()     //��֤�������ʾ���ǵ�ͨ���Ľ��
            &&ui->ret_40->text().isEmpty()//��֤�������ʾ���ǵ�ͨ���Ľ��
            && !(ui->label_serial_num->text().isEmpty()))//��֤�ող��Թ�
        {
                QStringList msg_itemName;
                    msg.clear();
                    msg_itemName = arr[0][0]->text().split(":");//���Լ�������Ŀ���ָ�����
                     msg = (this->isEN?"Single channel reagent card: "
                                     :tr("��ͨ���Լ���: "));
                    msg += msg_itemName.at(1);
                    ui->ret_00->setText(msg);// ��һ����ʾ
                 if(!(arr[0][1]->text().isEmpty()))
                 {
                        if(arr[0][1]->text().contains("C"))
                        {
                                 msg.clear();
                                 msg = (this->isEN?"Exception C Line":tr("C���쳣"));
                                arr[0][1]->setText(msg);// ��2����ʾ
                        }
                 }
        }
       if(!ui->ret_40->text().isEmpty() && !(ui->label_serial_num->text().isEmpty()))
        {
            for (int x = 0; x < 5; x++)
             {
                  if(!(arr[x][0]->text().isEmpty()))
                  {
                        msg = QString::number(x + 1) + (this->isEN?" Reagent card "
                                                                     :tr(" ���Լ��� "));
                        msg += poct_item.SIs[x].Name[0];
                      show_ret(true, x, 0, msg);//      ��һ��
                      show_ret(true, x, 1, "ChangeLang");//  �ڶ���
                  }
                else
                {
                        msg.clear();
                        show_ret(1, x, 0, " ");//      ��һ��
                        show_ret(1, x, 1, " ");//      �ڶ���
                }
             }
        }
    }
    else//�������Խ������ʾ
    {
        for (int x = 0; x < 5; x++)
        {
                int ch = Channel2Index(x);
                if (ch != -1)
                {
                            if (wait_for_test_cur_model == 0)
                            {
                                msg = (this->isEN?"Single channel reagent card: "
                                                :tr("��ͨ���Լ���: "));
                            }
                            else
                            {
                                msg = QString::number(x + 1) + (this->isEN?" Reagent card "
                                                                         :tr(" ���Լ��� "));
                            }
                            msg += poct_item.SIs[ch].Name[0];
                }
                else
                {
                        msg.clear();
                }
                show_ret(ch != -1, x, 0, msg);//      ��һ��
            }
            update_status();//����û�����ڶ�����ʾ ����״̬
    }
}


/*********************************
*���Բ���
*
**********************************/
void First_form::debug_ui_init()
{

    //ui->curve
   ui->curve->xAxis->setLabel("x");
   ui->curve->yAxis->setLabel("y");

   ui->curve->addGraph() ;

   //
   QObject::connect(ui->restButton_2, SIGNAL(clicked()), this, SLOT(restButton_clicked())) ;
   QObject::connect(this, SIGNAL(show_curveform(int)), curve_form, SLOT(show_slot(int))) ;



}


/*********************************
*��־
*
**********************************/
void First_form::on_pageupButton_log_clicked()
{
    int diary_page = ui->label_page_diary->text().toInt();

    if(diary_page > 1)
        diary_page-- ;

    QString text ;

    if(!ui->toolButton_jilu_riji->isEnabled())
    {
        myHelper::read_config_sig("log/diary.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

       diary_turn_page(diary_page, 3) ;
    }
    else if(!ui->toolButton_jilu_guzhang->isEnabled())
    {
        myHelper::read_config_sig("log/error.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

       diary_turn_page(diary_page, 2) ;
    }
    else if(!ui->toolButton_jilu_baojing->isEnabled())
    {
        myHelper::read_config_sig("log/warning.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

       diary_turn_page(diary_page, 1) ;
    }
    ui->label_page_diary->setText(QString("%1").arg(diary_page)) ;

}

void First_form::on_pagedownButton_log_clicked()
{
    int diary_page = ui->label_page_diary->text().toInt();
    int diary_page_all = ui->label_pageall_diary->text().toInt();

    if(diary_page_all > diary_page)
        diary_page++ ;

    QString text ;
    if(!ui->toolButton_jilu_riji->isEnabled())
    {
        myHelper::read_config_sig("log/diary.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 3) ;
    }
    else if(!ui->toolButton_jilu_guzhang->isEnabled())
    {
        myHelper::read_config_sig("log/error.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 2) ;
    }
    else if(!ui->toolButton_jilu_baojing->isEnabled())
    {
        myHelper::read_config_sig("log/warning.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 1) ;
    }
    ui->label_page_diary->setText(QString("%1").arg(diary_page)) ;
}
void First_form::on_firstButton_log_clicked()
{
    int diary_page = ui->label_page_diary->text().toInt();
   //  int diary_page_all = ui->label_pageall_diary->text().toInt();

    diary_page = 1 ;
    QString text ;

    if(!ui->toolButton_jilu_riji->isEnabled())
    {
        myHelper::read_config_sig("log/diary.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 3) ;
    }
    else if(!ui->toolButton_jilu_guzhang->isEnabled())
    {
        myHelper::read_config_sig("log/error.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 2) ;
    }
    else if(!ui->toolButton_jilu_baojing->isEnabled())
    {
        myHelper::read_config_sig("log/warning.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 1) ;
    }
    ui->label_page_diary->setText(QString("%1").arg(diary_page)) ;
}
void First_form::on_lastButton_log_clicked()
{
    int diary_page = ui->label_page_diary->text().toInt();
    int diary_page_all = ui->label_pageall_diary->text().toInt();

    diary_page = diary_page_all ;
    QString text ;

    if(!ui->toolButton_jilu_riji->isEnabled())
    {
        myHelper::read_config_sig("log/diary.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 3) ;
    }
    else if(!ui->toolButton_jilu_guzhang->isEnabled())
    {
        myHelper::read_config_sig("log/error.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 2) ;
    }
    else if(!ui->toolButton_jilu_baojing->isEnabled())
    {
        myHelper::read_config_sig("log/warning.ini", "HEAD", "Count", &text) ;
        int count = text.toInt() ;
        if(count <= 0)
            return ;

        diary_turn_page(diary_page, 1) ;
    }
    ui->label_page_diary->setText(QString("%1").arg(diary_page)) ;
}

//
void First_form::on_toolButton_jilu_baojing_clicked()
{
    ui->toolButton_jilu_baojing->setEnabled(0) ;
    ui->toolButton_jilu_guzhang->setEnabled(1) ;
    ui->toolButton_jilu_riji->setEnabled(1) ;

    ui->tableWidget_diary->clear() ;

    ui->tableWidget_diary->setRowCount(0) ;
    ui->tableWidget_diary->setColumnCount(3) ;
    ui->tableWidget_diary->setColumnWidth(0, 100) ;
    ui->tableWidget_diary->setColumnWidth(1, 450) ;
    ui->tableWidget_diary->setColumnWidth(2, 210) ;

    QStringList head ;
    head << (this->isEN?"Warning Code":tr("��������"))
         << (this->isEN?"Descripe":tr("�¼�����") )
         << (this->isEN?"Time":tr("ʱ��"));
    ui->tableWidget_diary->setHorizontalHeaderLabels(head) ;

    /*�ȶ����ж�������¼*/
    QString text ;
    int count ;
    int page_all ;
    myHelper::read_config_sig("log/warning.ini", "HEAD", "Count", &text) ;
    count = text.toInt() ;
    if(count <= 0)
        return ;
    else if(count > LOG_COUNT_MAX)
        count = LOG_COUNT_MAX ;

    page_all = count/PAGE_DIARY_COUNT ;
    if(page_all == 0)
        page_all = 1 ;
    else if(count%PAGE_DIARY_COUNT != 0)
        page_all+=1 ;

    ui->label_pageall_diary->setText(QString("%1").arg(page_all)) ;
    ui->label_page_diary->setText("1") ;
    diary_turn_page(1, 1) ;
}

void First_form::on_toolButton_jilu_guzhang_clicked()
{
    ui->toolButton_jilu_baojing->setEnabled(1) ;
    ui->toolButton_jilu_guzhang->setEnabled(0) ;
    ui->toolButton_jilu_riji->setEnabled(1) ;

    ui->tableWidget_diary->clear() ;

    ui->tableWidget_diary->setRowCount(0) ;
    ui->tableWidget_diary->setColumnCount(3) ;
    ui->tableWidget_diary->setColumnWidth(0, 100) ;
    ui->tableWidget_diary->setColumnWidth(1, 450) ;
    ui->tableWidget_diary->setColumnWidth(2, 210) ;

    QStringList head ;
    head << (this->isEN?"Fault Code":tr("���ϴ���"))
         << (this->isEN?"Descripe":tr("�¼�����") )
         << (this->isEN?"Time":tr("ʱ��"));
    ui->tableWidget_diary->setHorizontalHeaderLabels(head) ;

    /*�ȶ����ж�������¼*/
    QString text ;
    int count ;
    int page_all ;
    myHelper::read_config_sig("log/error.ini", "HEAD", "Count", &text) ;
    count = text.toInt() ;
    if(count <= 0)
        return ;
    else if(count > LOG_COUNT_MAX)
        count = LOG_COUNT_MAX ;

    page_all = count/PAGE_DIARY_COUNT ;
    if(page_all == 0)
        page_all=1 ;
    else if(count%PAGE_DIARY_COUNT != 0)
        page_all+=1 ;

    ui->label_pageall_diary->setText(QString("%1").arg(page_all)) ;
    ui->label_page_diary->setText("1") ;

    diary_turn_page(1, 2) ;
}

void First_form::on_toolButton_jilu_riji_clicked()
{
    ui->toolButton_jilu_baojing->setEnabled(1) ;
    ui->toolButton_jilu_guzhang->setEnabled(1) ;
    ui->toolButton_jilu_riji->setEnabled(0) ;

    ui->tableWidget_diary->clear() ;

    ui->tableWidget_diary->setRowCount(0) ;
    ui->tableWidget_diary->setColumnCount(2) ;
    ui->tableWidget_diary->setColumnWidth(0, 550) ;
    ui->tableWidget_diary->setColumnWidth(1, 210) ;

    QStringList head ;
    head << (this->isEN?"Descripe":tr("�¼�����"))
         << (this->isEN?"Time":tr("ʱ��"));
    ui->tableWidget_diary->setHorizontalHeaderLabels(head) ;

    /*�ȶ����ж�������¼*/
    QString text ;
    int count ;
    int page_all ;
    myHelper::read_config_sig("log/diary.ini", "HEAD", "Count", &text) ;
    count = text.toInt() ;
    if(count <= 0)
        return ;
    else if(count > LOG_COUNT_MAX)
        count = LOG_COUNT_MAX ;

    page_all = count/PAGE_DIARY_COUNT ;
    if(page_all == 0)
        page_all=1 ;
    else if(count%PAGE_DIARY_COUNT != 0)
        page_all+=1 ;

    ui->label_pageall_diary->setText(QString("%1").arg(page_all)) ;
    ui->label_page_diary->setText("1") ;

    diary_turn_page(1, 3) ;
}

void First_form::diary_turn_page(int page, int type)
{
    QDateTime time_Date_temp;//������ʷ���棬Ӣ�İ汾��ʱ����ʾ��ʽ 201/09/25
    switch(type)
    {
        case 1://����
        {
            QString text ;
            QStringList text_list ;
            int row_count, display_count, start_row ;   //row_countȷ����ǰҳҪ��ʾ��������¼


            myHelper::read_config_sig("log/warning.ini", "HEAD", "Count", &text) ;
            int record_count =  text.toInt()   ;
            /*ȷ���ܹ���������¼*/
            display_count = record_count;
            if(display_count > LOG_COUNT_MAX)
                display_count = LOG_COUNT_MAX ;

            /*ȷ����ǰҳҪ��ʾ������*/
            if((display_count - (page-1)*PAGE_DIARY_COUNT)  > PAGE_DIARY_COUNT)     //ʣ�µ���������һҳ������
                row_count = PAGE_DIARY_COUNT ;
            else                                                                                                                        //
                row_count = display_count - (page-1)*PAGE_DIARY_COUNT ;
            ui->tableWidget_diary->setRowCount(row_count) ;
            /*��ʼ��ʾ*/
            start_row = record_count - (page-1)*PAGE_DIARY_COUNT ;                                 //�����µĿ�ʼ

            /**/
            for(int i=0; i<row_count; i++)
            {
                myHelper::read_config_sig("log/warning.ini", "CONTENT", QString("%1").arg(start_row - i), &text) ;

                text_list = text.split("@") ;
                time_Date_temp = QDateTime::fromString(text_list.at(1),"yyyy-MM-dd hh:mm:ss" );
              //  qDebug() <<__LINE__ <<__FUNCTION__<<time_Date_temp.toString("MM-dd-yyyy hh:mm:ss");

                if(text_list.count() > 1)
                {
                    QString warning ;
                    myHelper::code_to_waring(text_list.at(0), warning,this->isEN) ;
                    ui->tableWidget_diary->setItem(i, 0, new QTableWidgetItem(text_list.at(0))) ;
                    ui->tableWidget_diary->setItem(i, 1, new QTableWidgetItem(warning)) ;
                    ui->tableWidget_diary->setItem(i, 2, new QTableWidgetItem(text_list.at(1))) ;
                    if(this->isEN)
                         ui->tableWidget_diary->setItem(i, 2, new QTableWidgetItem(
                                                                    time_Date_temp.toString("MM-dd-yyyy hh:mm:ss"))) ;
                }
            }
            break ;
        }
        case 2://����
        {
            QString text ;
            QStringList text_list ;
            int row_count, display_count, start_row ;   //row_countȷ����ǰҳҪ��ʾ��������¼

            myHelper::read_config_sig("log/error.ini", "HEAD", "Count", &text) ;
            int record_count =  text.toInt()   ;
            /*ȷ���ܹ���������¼*/
            display_count = record_count;
            if(display_count > LOG_COUNT_MAX)
                display_count = LOG_COUNT_MAX ;

            /*ȷ����ǰҳҪ��ʾ������*/
            if((display_count - (page-1)*PAGE_DIARY_COUNT)  > PAGE_DIARY_COUNT)     //ʣ�µ���������һҳ������
                row_count = PAGE_DIARY_COUNT ;
            else                                                                                                                        //
                row_count = display_count - (page-1)*PAGE_DIARY_COUNT ;
            ui->tableWidget_diary->setRowCount(row_count) ;
            /*��ʼ��ʾ*/
            start_row = record_count - (page-1)*PAGE_DIARY_COUNT ;                                 //�����µĿ�ʼ
            /**/
            for(int i=0; i<row_count; i++)
            {
                myHelper::read_config_sig("log/error.ini", "CONTENT", QString("%1").arg(start_row - i), &text) ;

                text_list = text.split("@") ;
                time_Date_temp = QDateTime::fromString(text_list.at(1),"yyyy-MM-dd hh:mm:ss" );
                if(text_list.count() > 1)
                {
                    QString error ;
                    myHelper::code_to_error(text_list.at(0), error,this->isEN) ;
                    ui->tableWidget_diary->setItem(i, 0, new QTableWidgetItem(text_list.at(0))) ;
                    ui->tableWidget_diary->setItem(i, 1, new QTableWidgetItem(error)) ;
                    ui->tableWidget_diary->setItem(i, 2, new QTableWidgetItem(text_list.at(1))) ;
                     if(this->isEN)
                         ui->tableWidget_diary->setItem(i, 2, new QTableWidgetItem(
                                                                    time_Date_temp.toString("MM-dd-yyyy hh:mm:ss"))) ;
                }
            }
            break ;
        }
        case 3://������־
        {

                QString text ;
                QStringList text_list ;
                int row_count, display_count, start_row ;   //row_countȷ����ǰҳҪ��ʾ��������¼

                myHelper::read_config_sig("log/diary.ini", "HEAD", "Count", &text) ;
                int record_count =  text.toInt()   ;
                /*ȷ���ܹ���������¼*/
                display_count = record_count;
                if(display_count > LOG_COUNT_MAX)
                    display_count = LOG_COUNT_MAX ;

                /*ȷ����ǰҳҪ��ʾ������*/
                if((display_count - (page-1)*PAGE_DIARY_COUNT)  > PAGE_DIARY_COUNT)     //ʣ�µ���������һҳ������
                    row_count = PAGE_DIARY_COUNT ;
                else                                                                                                                        //
                    row_count = display_count - (page-1)*PAGE_DIARY_COUNT ;
                ui->tableWidget_diary->setRowCount(row_count) ;
                /*��ʼ��ʾ*/
                start_row = record_count - (page-1)*PAGE_DIARY_COUNT ;                                 //�����µĿ�ʼ
                /**/
                for(int i=0; i<row_count; i++)
                {
                    myHelper::read_config_sig("log/diary.ini", "CONTENT", QString("%1").arg(start_row - i), &text) ;

                    text_list = text.split("@") ;
                    time_Date_temp = QDateTime::fromString(text_list.at(1),"yyyy-MM-dd hh:mm:ss" );
                    if(text_list.count() > 1)
                    {
                        QString diary ;
                        myHelper::code_to_diary(text_list.at(0), diary,this->isEN) ;
                        ui->tableWidget_diary->setItem(i, 0, new QTableWidgetItem(diary)) ;
                        ui->tableWidget_diary->setItem(i, 1, new QTableWidgetItem(text_list.at(1))) ;
                         if(this->isEN)
                         ui->tableWidget_diary->setItem(i, 1, new QTableWidgetItem(
                                                                    time_Date_temp.toString("MM-dd-yyyy hh:mm:ss"))) ;
                    }
                }
                break ;
        }
    }
}


/*���ּ���������Ϻ�Ĵ���*/
void  First_form::numkeyboard_slot(QLineEdit *line) //
{
    line->clearFocus() ;                                                        //ȡ������

    number_form->ex_ine_edit = line ;                                  //Ϊ������׼��
    number_form->line_edit->clear() ;
    number_form->line_edit->setText( line->text() ) ;          //
    number_form->show() ;
}



void First_form::comboBox_p1Value_2_currentIndexChanged(int index)
{
    myHelper::write_config_sig("config.ini", "Debug", "P1", QString("%1").arg(index)) ;
}

void First_form::comboBox_p2Value_2_currentIndexChanged(int index)
{
    myHelper::write_config_sig("config.ini", "Debug", "P2", QString("%1").arg(index)) ;
}


int First_form::Channel2Index(int i)
{
    if (i < wait_for_test_cur_model && test_task[i].wait_for_test_old >= 0)
    {
        return i;
    }
    else if (!(wait_for_test_cur_model || i))
    {
        return 0;
    }
    return  -1;
}

void First_form::try_save()
{

    setTestButtonSt();
    if (wait_for_test_cur_num != -1)
    {
        test_task[wait_for_test_cur_num].wait_for_test = -1;
        wait_for_test_cur_num = -1;
    }

    int tmp = 0;
    for (int x = 0; x < 5; x++)
    {
        if (test_task[x].wait_for_test != -1)
        {
            return;
        }
        if (!test_task[x].subResult.isEmpty())
        {
           tmp++;
        }
    }

    // �����û������Ŀ������Ŀû��������
    if (!tmp)
    {
        slot_try_done();
        return;
    }

    SAVE_ITEM test_item ;
    QList<SUB_SAVE_ITEM> sub_list ;

    bzero(&test_item, sizeof(test_item)) ;

    QStringList Type_temp; //Ϊ�˷�����Ӣ��ʾ��������ͳһ��������� 2018/09/18
    Type_temp << QString::fromLocal8Bit("Ѫ��/Ѫ��")
                        << QString::fromLocal8Bit("ȫѪ")
                        << QString::fromLocal8Bit("ĩ��Ѫ")
                        << QString::fromLocal8Bit("��Һ")
                        << QString::fromLocal8Bit("�ʿ�");
    switch (ui->comboBox_type->currentIndex()) {
    case 0:
        memcpy(test_item.Type,
                       Type_temp.at(0).toLocal8Bit().constData(),
                       Type_temp.at(0).toLocal8Bit().length() );
        break;
    case 1:
        memcpy(test_item.Type,
                       Type_temp.at(1).toLocal8Bit().constData(),
                       Type_temp.at(1).toLocal8Bit().length() );
        break;
    case 2:
        memcpy(test_item.Type,
                       Type_temp.at(2).toLocal8Bit().constData(),
                       Type_temp.at(2).toLocal8Bit().length() );
        break;
    case 3:
        memcpy(test_item.Type,
                       Type_temp.at(3).toLocal8Bit().constData(),
                       Type_temp.at(3).toLocal8Bit().length() );
        break;
    case 4:
        memcpy(test_item.Type,
                       Type_temp.at(4).toLocal8Bit().constData(),
                       Type_temp.at(4).toLocal8Bit().length() );
        break;
    default:
        break;
    }

     if(!ui->lineEdit_std_print_declar_2->text().isEmpty())                                                        //���Խ����������
     {
             QString tmp = ui->lineEdit_std_print_declar_2->text();
             strcpy(test_item.c_Nums,  tmp.toLocal8Bit().constData()) ;
             if(tmp.length() > 12)
             {
                 tmp.insert(12,"\n");
             }
             ui->label_current_num->setText(tmp);
     }
     else  if(!ui->lineEdit_next_num_2->text().isEmpty())                                           //���Խ���ɨ��ǹ����
     {
         QString tmp = ui->lineEdit_next_num_2->text();
        strcpy(test_item.c_Nums, tmp.toLocal8Bit().constData()) ;
        if(tmp.length() > 12)
        {
            tmp.insert(12,"\n");
        }
        ui->label_current_num->setText(tmp);

     }
     else if( (ui->lineEdit_std_print_declar_2->text().isEmpty()&&ui->lineEdit_next_num_2->text().isEmpty())&&
                 !ui->label_current_num->text().isEmpty())      //������������ �������� 2018/09/21
     {
            ulong temp_long = ui->label_current_num->text().toULong();
            temp_long += 1;
            QString temp_str = QString::number(temp_long);
            strcpy(test_item.c_Nums,  temp_str.toLocal8Bit().constData()) ;
            if(temp_str.length() > 12)
            {
                temp_str.insert(12,"\n");
            }
            ui->label_current_num->setText(temp_str);
         }
     else
     {
         test_item.c_Nums[0] = '\0';//û��������
     }

     memcpy(test_item.serial_code, currentnumtostring.toAscii(), currentnumtostring.toAscii().length() + 1 )  ;

     //
     test_item.serial_num = currentDebugnum ;

     // modify barcode
     QString fixBarcode;
     myHelper::read_config_sig("sys_config.ini", "SYSTEM", "modifyBarCode", &fixBarcode) ;
     if (!fixBarcode.isEmpty())
     {
         card_value = fixBarcode;
     }

     QString tmpCardCode = card_value;
     for(int i = 0; i < 3; i++)
     {
         if (tmpCardCode.length() < i*2+2) tmpCardCode += "00";
         test_item.BarCode[i] = QByteArray::fromHex(tmpCardCode.mid(i*2, 2).toAscii()).constData()[0];
     }

     /*�ж��ٸ�������Ŀ*/
     // ��������Ŀ������ʱ��
     unsigned int newtime = 0;
     for(int k = 0; k < ARRAYSIZE(test_task); k++)
     {
        for (int i = 0; i < test_task[k].subResult.size(); i++)
        {
            sub_list << test_task[k].subResult.at(i);
            if (newtime < test_task[k].subResult.at(i).time)
            {
                newtime = test_task[k].subResult.at(i).time;
            }
        }
     }

     strcpy(test_item.Time,QDateTime::fromTime_t(newtime).toString("yyyy-MM-dd").toLatin1().data());
     test_item.sub_count = sub_list.count() ;

     if(!this->detail_form->pname.trimmed().isEmpty())
     {
         QByteArray name = this->detail_form->pname.trimmed().toLocal8Bit();
         unsigned int len = name.length();
         if (len >= sizeof (test_item.p_name))
         {
             len = sizeof (test_item.p_name) - 1;
         }
         memcpy(test_item.p_name, name.constData(), len) ;//������Ϣ
     }

     if(!this->detail_form->page.trimmed().isEmpty())
     {
         QString age_show = QString().sprintf((
                          detail_form->page.trimmed().contains(QString("."))?
                          "%.1f":"%.0f"),
                          detail_form->page.trimmed().toFloat());
         strncpy(test_item.age_valuse, qPrintable(age_show), sizeof (test_item.age_valuse)) ;
         test_item.age_index = detail_form->age_unit->currentIndex();

     }
     else
     {
         test_item.age_valuse[0] = 0;
     }

     switch(detail_form->psex )
     {
         case 1:memcpy(test_item.sex, tr("��").toLocal8Bit().constData(), tr("��").toLocal8Bit().length());break ;
         case 2:memcpy(test_item.sex, tr("Ů").toLocal8Bit().constData(), tr("Ů").toLocal8Bit().length());break ;
         default : memcpy(test_item.sex, "  ", 2 ) ;
     }

     //���ԭ������Ϣ
     detail_form->pname.clear() ;
     detail_form->page.clear() ;
     detail_form->psex = 0 ;


     //10_27
     memcpy(test_item.Prj_name, poct_item.ReportTitle.toLocal8Bit().constData(),32) ;


     /*����ͳ��*/
     //if(ui->checkBox_usercode->isChecked())
     {
         test_item.Classify_code = ui->lineEdit_classify_numkeyboard->text().toInt() ;
     }
//     else
//     {
//         test_item.Classify_code = 255 ;
//    }

     /*�ŵ�������*/
     int whole_file_size = sizeof (SAVE_ITEM) + sizeof(SUB_SAVE_ITEM) * sub_list.count();


     uchar id_file_buffer[whole_file_size];
     bzero(id_file_buffer, whole_file_size) ;

     memcpy(id_file_buffer, &test_item, sizeof(test_item)) ;
     for(int y=0; y<sub_list.count(); y++)
         memcpy(&id_file_buffer[sizeof(test_item) + sizeof(SUB_SAVE_ITEM)*y], &(sub_list.at(y)), sizeof(SUB_SAVE_ITEM)) ;

     /*�ж���û�и���Ŀ��Ŀ¼*/
     QString dir_str  ;
     QString Bar_code = poct_item.BarCode;


     if (!fixBarcode.isEmpty())
     {

         Bar_code = fixBarcode;
     }

     if(Bar_code.isEmpty())
     {
       dir_str = dirname + "/empty"  ;
     }
     else
     {

         dir_str = dirname + "/" + Bar_code;
     }

     if(!QDir().exists(dir_str))
     {

         QString com_dir = "mkdir -p " + dir_str ;

         system(com_dir.toLocal8Bit().constData()) ;
     }

     QString all_date = dir_str + "/" +nextfilename;

     currentfilename = all_date ; /*1_4*/

     if (save_data_as_file(all_date.toLocal8Bit().constData(), id_file_buffer, whole_file_size) < 0)
     {
         printf("test write failed \n") ;
     }

     ui->label_serial_num->setText(currentnumtostring);
    /*  �ڲ���ҳ����ʾ�������� 2018/09/18  */
     ui->label_batch_2->setText(QString::fromLocal8Bit(test_item.Type) )  ;
     if(this->isEN)
      {
         QString temp_Type = QString::fromLocal8Bit(test_item.Type);
         if(temp_Type.toLocal8Bit() == "Ѫ��/Ѫ��")
             ui->label_batch_2->setText(QString::fromLocal8Bit("Serum/Plasma") )  ;
         else if(temp_Type.toLocal8Bit() == "ȫѪ")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Whole Blood") )  ;
         else if(temp_Type.toLocal8Bit() == "ĩ��Ѫ")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Peripheral Blood") )  ;
         else if(temp_Type.toLocal8Bit() == "��Һ")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Urine") )  ;
        else if(temp_Type.toLocal8Bit() == "�ʿ�")
             ui->label_batch_2->setText(QString::fromLocal8Bit("QC") )  ;
     }
     ui->label_prj->setText(QString::fromLocal8Bit(test_item.Prj_name) )  ;

     //clear
     ui->lineEdit_std_print_declar_2->clear() ;
     ui->lineEdit_next_num_2->clear() ;
     this->detail_form->name->clear() ;
     this->detail_form->age->clear() ;
     this->detail_form->sex->setCurrentIndex(0) ;


 /*�Ƿ��ӡ*/
     if(set_test.Autoprint)
     {
         print_event(all_date, 0) ;
     }
 //�Ƿ��Զ��ϴ�
     if(set_lis.auto_upload)
     {
         uploadInterface.Upload(all_date);
     }
 /*Ϊ��һ����¼��׼�� */

                                                                                          //���к�����
     currentDebugnum++ ;
     currentnum ++;
     int num_tmp[2] = {currentnum, currentDebugnum} ;
     lseek(num_fd, 0, SEEK_SET) ;                                                                //����֮ǰ�����к�

     if( write(num_fd, num_tmp, 8) < 0)    {/**/}

    update_currentnumtostring();

    slot_try_done();

}

 void First_form::slot_try_done()
 {
     // �˿�
     serial_thead->push_cmd("COM11");
     wait_sate = 0;
     on_rcardButton_clicked();
     myHelper::msDelay(3000);
     delay_100ms(LONG_LOCK_TIME) ;
 }

void First_form::on_his_prj_view_bt_clicked()
{
    int row = ui->tableWidget_primary->currentRow();

    if (row == -1)
    {
        emit info2error_dialog(this->isEN?"Please select one of the lines"
                                        :tr("��ѡ������һ��"));
    }
    else
    {
        QString tmp = ui->tableWidget_primary->item(row, 9)->text();
        his_prg_view->show_info(tmp);
    }

}

void First_form::update_status()
{

    for (int x = 0; x < 5; x++)
    {

        if (arr[x][0]->isVisible())
        {
            int index = arr[x][0]->text().left(1).toInt();
            if (index && index != x + 1)
            {
                continue;
            }

            if (test_task[x].wait_for_test < 0)
            {
                continue;
            }

            QString tmp;
            if (test_task[x].wait_for_test > 0)
            {
                tmp = (this->isEN?"Incubatting":tr("������"));
                tmp += QString::number(test_task[x].wait_for_test) + " / ";
                tmp += QString::number(test_task[x].wait_for_test_old);
            }
            else
            {

                tmp = (wait_for_test_cur_num == x)?
                                                 (this->isEN?"Measuring":tr("���ڲ���"))
                                                :(this->isEN?"Waiting":tr("�ȴ�����"));
            }
            show_ret(true, x, 1, tmp);
        }
    }
}

void First_form::show_ret(bool vis, int row, int col, QString str)
{
        if(col == 1 && str == "ChangeLang" && ui->ret_40->text().contains("5"))//ϵͳ���Ա仯�ڶ�������ҲҪ�ı� 2018/10/10
        {
                for(int i = 0; i < 5; i++)
                {
                        if(arr[i][1]->text().contains("C"))
                        {
                                arr[i][1]->setText((this->isEN?"Exception C Line":tr("C���쳣")));
                        }
                }
        }
        if(str != "ChangeLang")//��������
        {
                if (vis)
                {
                    arr[row][0]->setVisible(true);
                    arr[row][1]->setVisible(true);
                    arr[row][col]->setText(str);
                }
                else
                {
                    arr[row][0]->setVisible(false);
                    arr[row][1]->setVisible(false);
                    arr[row][0]->setText(str);
                    arr[row][1]->setText(str);
                }
        }
}

void First_form::on_toolButton_jilu_del_pressed()
{
    static bool is_waitting = 0 ;
    if(!is_waitting)
    {
        int i ;
        is_waitting = 1 ;
        QElapsedTimer t;
        for( i=0; i<5000; i++)
        {
            if(!ui->toolButton_jilu_del->isDown())
                break ;
            else
            {
                t.start();
                while(t.elapsed()<1)
                {
                    QCoreApplication::processEvents();
                }
            }

        }

        is_waitting = 0 ;
        if(i >= 5000)
        {

            int type;
            QString filename;
            if (!ui->toolButton_jilu_baojing->isEnabled())
            {
                type = 1;
                filename = "log/warning.ini";
            }
            else if (!ui->toolButton_jilu_guzhang->isEnabled())
            {
                type = 2;
                filename = "log/error.ini";
            }
            else
            {
                type = 3;
                filename = "log/diary.ini";
            }


            QList<QTableWidgetItem*> select = ui->tableWidget_diary->selectedItems();
            if (select.size() == 0)
            {
                return ;
            }

            int row = select.at(0)->row();
            if (row == -1)
            {
                return ;
            }

            int page = ui->label_page_diary->text().toInt();
            if (page == 0)
            {
                return ;
            }


            row += (page - 1) * PAGE_DIARY_COUNT;


            /*�ȶ����ж�������¼*/

            QSettings *set = new QSettings(filename, QSettings::IniFormat);
            set->beginGroup("HEAD");
            int count = set->value("Count").toInt();
            set->endGroup();
            if(count <= 0)
            {
                delete set;
                return ;
            }

            int ncount = count - row;

            set->beginGroup("CONTENT");


            while (ncount < count)
            {
                set->setValue(QString("%1").arg(ncount), set->value(QString("%1").arg(ncount+1)));
                ncount++;
            }
            set->endGroup();

            set->beginGroup("HEAD");
            set->setValue("Count", QString("%1").arg(count-1));
            set->endGroup();

            delete(set) ;

            if (type == 1)
            {
                on_toolButton_jilu_baojing_clicked();
            }
            else if (type == 2)
            {
                on_toolButton_jilu_guzhang_clicked();
            }
            else
            {
                on_toolButton_jilu_riji_clicked();
            }

        }
    }
}

void First_form::on_comboBox_test_model_currentIndexChanged(int index)
{
    wait_for_test_cur_model = ui->comboBox_test_model->itemData(index).toInt();
    qDebug() <<__LINE__ <<__FUNCTION__<<wait_for_test_cur_model;
    myHelper::write_config_sig("config.ini", "AFS1200", "TestMode", QString::number(wait_for_test_cur_model)) ;
}

void First_form::on_toolButton_pressed()
{
    static bool is_waitting = 0 ;
    if(!is_waitting)
    {
        is_waitting = 1 ;
        QElapsedTimer t;
        for(int i = 0; ; i++)
        {
            if(!ui->toolButton->isDown())
            {
                break ;
            }
            else if (i == 500)
            {
                ui->toolButton->setText(myHelper::GetBuildTime());
            }

            t.start();
            while(t.elapsed() < 10)
                QCoreApplication::processEvents();
        }
        ui->toolButton->setText("");
        is_waitting = 0 ;
    }
}
/* ���ز��ֹ��� 2018/09/14  */
void First_form::Not_Show_Temp()
{
            /* �¶ȿ��� */
    ui->label_TempContrlRange->hide();
    ui->spinBox_temMin->hide();
    ui->spinBox_temMax->hide();
    ui->checkBox_temp->hide();

    ui->checkBox_PrintTest->hide(); //��ӡ
    ui->checkBox_print_detail->hide();//��ӡ�߼���Ϣ
}

void First_form::on_checkBox_autotest_clicked()
{
    if(ui->checkBox_autotest->isChecked())
    {
            ui->rcardButton->setText(this->isEN?("Testing"):tr("�Զ�������"));
             ui->rcardButton->setDisabled(1);
           if(sender()  == ui->checkBox_autotest)
                serial_thead->push_cmd("COM04");//��·����λ
            stop_auto = 1;
    }
    else
    {
        ui->rcardButton->setText(this->isEN?("Test"):tr("����"));
         ui->rcardButton->setEnabled(1);
    }
}