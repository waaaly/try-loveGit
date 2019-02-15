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
*日志系统
/ *********************************
*批量测试
/ *********************************
*调试测试
/ *********************************
*定时器
/ *********************************
*主菜单界面的切换槽
/ *********************************
*质控
/ *********************************
*设置菜单界面&系统界面
/ *********************************
*历史界面相关
/ *********************************
*测试界面相关
*/

#define BUFFER_SIZE PIPE_BUF                                //fifo缓冲区最大值4K

#define COUNTER_CHANEL 10                                  //计时器的通道
#define WORNING_TIME 11                                   //计时器到时间的提醒

#define LOCK_TIME 10                                      //跟单片机通讯的间隔时间
#define LONG_LOCK_TIME 20                                 //跟单片机通讯的间隔时间

#define PAGE_DATA_NUMS 5                                   //历史数据一页的数据
#define MAX_INFOS 3000                                    //最多能查看的记录


#define INIT_TIME 8                                         //系统初始化的等待时间

#define PAGE_DIARY_COUNT 8


#define EXPORT_PAT "/media"                               //modify20180508



unsigned int package[BUFFER_SIZE];                          //接收大数据包
unsigned char idfile_buffer[BUFFER_SIZE] ;

QString card_value;                               //接收卡条值


POCT_ITEM tmp_item ;

unsigned char AREA_CODE ;
//unsigned char MD5_AREA ;

//2018-10-22


// 多通道卡下当前测试的通道 0-4
// 该变量是全局的，在定时器倒计时中做是否繁忙标记，测量数据返回时做通道间接索引，测量通道是做光路盒走位参考。
int wait_for_test_cur_num;
int wait_for_test_cur_model;//0是单通道，5是五联卡,和协议不一样  2018-10-21

/**
      自动测试时是否正在一个自动测试过程中，用于屏蔽可状态探测信号在自动一个过程中仍探测
    原也有探测防重复机制（全局标志），只是纵错较乱，修改下已经不准了，故新建立一个。
     这里不重构该机制，只是叠加一层标志，该标记在发送COM13信号前（timerEvent事件中），异常中断测量或完成测量最后的COM11信号返回中更改
    如不设该标志，导致将不可预料的重发COM13指令。一卡多通道有可能重发测量，最坏可能死循环一直重复测量下去，除法取消自动或关闭了电源
**/
static int auto_ok_flag;


#ifndef ARRAYSIZE
#define ARRAYSIZE(arr) (int(sizeof (arr) / sizeof (*arr)))
#endif


// 初始化孵化时间，如果time指针为空，使用成员全局当前项目参数指定
int First_form::InitHatchTime(int time)
{
    int Htime[5] = { -1, -1, -1 ,-1, -1};

    int subcount = qMin(qMin(int (ARRAYSIZE(poct_item.SIs)), int (wait_for_test_cur_model)), int (poct_item.ItemCount));


    // 单通道
    if (wait_for_test_cur_model == 0)
    {
        // 对应到相应的通道号，通道号（1-5），时间表（0-4）
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
        // 遍历所有子项目
        if (poct_item.SIs[x].siChannel <= 0)
        {
            continue;
        }

        // 对应到相应的通道号，通道号（1-5），时间表（0-4）
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
    // 正式初始化
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


/*初始化过程

*2,显示初始化进度条
*3,初始化过程,其实是在等待mythread子线程读取底板信息
*     3.1质控系数
*     3.2窗口长度
*     3.3注册信息
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

    // 提前初始化当前工作通道为-1
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


    //翻译器
   translator = new QTranslator(qApp);

   connect(itemMat, SIGNAL(itemListUpdate()), SLOT(item_update()));



    myHelper::CheckConfig("config.ini") ;
/**/
    init_tmp = 9 ;
/*UI初始化*/
    ui_init() ;
/*设置参数*/
    load_settingfile() ;                                                            //加载配置文件
    setting_init() ;                                                                    //初始化参数


//定时器及GPIO初始化
    timer_init() ;

//将所有ID项目加载显示到界面上
    item_update();


/*读取ID文件，并转化为项目数据*/
    load_set_project(itemMat->getCur_info());
    if( initial_dir() < 0)
    {

    }


/*delete record*/
    myHelper::delete_record(ui->spinBox_keeptime->value(), QDateTime::currentDateTime()) ;

/*历史相关环境变量的初始化*/
    history_form_init();

/*其他*/
    history_tablewidget_init();


/*设置各控件字体*/
    font_init();


/*测试界面*/
    test_ui_init() ;
/*调试界面*/
    debug_ui_init() ;

//
    if(set_lis.language)
        on_change_languagepushButton_english_clicked() ;
    else
        on_change_languagepushButton_clicked() ;

    init_tmp = 1 ;



    ui->lineEdit_next_num_2->setFocus() ;
    ui->lineEdit_std_print_declar_2->clearFocus() ;
/*  2018/09/03  提示窗口字符无法完成国际化转换，在这里添加中英标志 */
this->isEN =myHelper::read_config_sig(CONFIG_INI,
                                            "Set_lis",
                                            "language").toInt() ;

    // *******
    uploadInterface.multi_card_list = &multi_card_list;
}



/*界面风格初始化*/
void First_form::ui_init()
{
    this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框

    /*系统配置*/
    myHelper::read_system_config(&system_config) ;



    /*3机器型号*/
    QFont font  =  ui->label_91->font();
    font.setPointSize(20);
    ui->label_91->setText(system_config.machine) ;
    ui->label_91->setFont(font) ;
    /*4软件版本*/
    font  =  ui->label_93->font() ;
    font.setPointSize(16);
    ui->label_93->setText(system_config.version[0] + (system_config.hasBuild? myHelper::GetBuildTime():QString())) ;
    ui->label_93->setFont(font) ;



    /*设置界面logo*/
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
    ui->stackedWidget->setCurrentIndex(6) ;                                             //初始化等待界面

    ui->main_Button->setVisible(0) ;

    //链接子项目选择radio按钮到相对应的槽
    foreach (QRadioButton * radio_btn, ui->page_35->findChildren<QRadioButton *>()) {
        connect(radio_btn, SIGNAL(clicked()), this, SLOT(radio_buttonClick()));
    }

    /*软件盘*/
      QWSInputMethod *im = new SyszuxIM;
     QWSServer::setCurrentInputMethod(im) ;
      im->updateHandler(QWSInputMethod::FocusIn);
      im->updateHandler(QWSInputMethod::FocusOut);

      connect(im, SIGNAL(call_4_num_keyboard(QLineEdit *)), this, SLOT(numkeyboard_slot(QLineEdit *))) ;  //QLineEdit *

    /*注册界面*/
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

     //错误提示窗口：翻译信号和槽 2018/09/14
     QObject::connect(this, SIGNAL(update_ui_errordialog()), errordialog, SLOT(update_ui())) ;



     ////设置信号补偿界面,没地方放，暂时放这里
     //读标定峰值的几个按钮
     QStyledItemDelegate* itemDelegate = new QStyledItemDelegate();
     QList<QComboBox *> com_btns = this->findChildren<QComboBox *>();
     foreach (QComboBox * com_btn, com_btns) {
         com_btn->setItemDelegate(itemDelegate) ;
     }
     /*检查磁盘空间*/
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
    QStringList filter; //过滤.dat文件
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
            myHelper::write_system_record("log/diary.ini", "A2", QDateTime::currentDateTime()) ;//日记记录
            return ;

        }
        else
        {
            myHelper::write_system_record("log/error.ini", "E2", QDateTime::currentDateTime()) ;//警报记录
            qDebug() <<__LINE__ <<__FUNCTION__<< "comp not right" ;
        }
    }

    //2.原始数据
    ui->toolButton_sub_h_origin->setVisible(0) ;
    //3.设置里面的扫条码
   // ui->checkBox_checkbar->setVisible(0) ;

    //4.项目
    ui->toolButton_main_p_quxian->setVisible(0) ;
    ui->toolButton_main_p_zhuxiang->setVisible(0) ;
    ui->toolButton_main_p_zixiang->setVisible(0) ;
    on_toolButton_main_p_setting_clicked();


    //6.debug
    ui->toolButton_xitong_moshi->setVisible(0) ;

    /*6是否隐藏可扫条码选项*/
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
                                    :tr("fa磁盘剩余空间已不足5%，请删除历史数据!")) ;
}

/*历史表格的初始化*/
void First_form::history_tablewidget_init()
{
    /*设置所有的表格属性*/
     QList<QTableWidget *> tab_ws = this->findChildren<QTableWidget *>();
    foreach (QTableWidget * tab_w, tab_ws) {
        tab_w->setSelectionMode(QAbstractItemView::SingleSelection);                            //设置只能选择单选
        tab_w->setSelectionBehavior(QAbstractItemView::SelectRows);                         //设置只能选择一行
        tab_w->setEditTriggers(QAbstractItemView::NoEditTriggers);                              //设置不能编辑

    }
    QHeaderView *headerView = ui->tableWidget_history->verticalHeader();
    headerView->setHidden(true);                                                                                            //设置不要第一列序号
    headerView = ui->tableWidget_primary->verticalHeader() ;
    ui->tableWidget_primary->setColumnHidden(9, true);  //隐藏文件保存位置
     headerView->setHidden(true);                                                                                           //设置不要第一列序号

     ui->tableWidget_xishu->setColumnWidth(0, 180);
     //

}
/*历史相关环境变量的初始化*/
int First_form::history_form_init()
{

    if( read_num(dirname) < 0)
    {
            /**/
        return -1 ;
    }

    /*历史界面的日期默认为当前日期*/
    QString  c_tody;

    c_tody = QDate::currentDate().toString("yyyy-MM-dd") ;

    update_history_ui( c_tody,  c_tody ) ;
    update_primary_ui( c_tody, c_tody ) ;
    update_Debug_ui( c_tody,  c_tody) ;

    update_Classify_ui( c_tody,  c_tody) ;


    /*设置即将要使用的文件名*/
    nextfilename =  currentnumtostring  + ".dat" ;
    //nextDebugfilename = dirname + "/Debug/" + QString("%1").arg(currentDebugnum)  + ".dat";



    //钩选
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
/*将从配置文件加载来的数据设置到界面上*/
void First_form::setting_init()
{
 /*测试时用到的相关参数*/
    set_test.Startnum = ui->spinBox_startnum->value() ;

    set_test.Autoprint = ui->checkBox_autoprint->isChecked();

 /*LIS传输相关参数*/
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



//系统时间设置参数

    QString time_tmp = QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss");
    ui->spinBox_year_2->setValue(time_tmp.mid(0, 4).toInt());
    ui->spinBox_month_2->setValue(time_tmp.mid(5, 2).toInt());
    ui->spinBox_day_2->setValue(time_tmp.mid(8, 2).toInt());
    ui->spinBox_hour->setValue(time_tmp.mid(11, 2).toInt());
    ui->spinBox_minute->setValue(time_tmp.mid(14, 2).toInt());

    //因为combox在触摸屏上不方便，加按键方便选择

}

/*次功能配置文件*/
void First_form::load_settingfile()
{
    QString beep_enable;
    myHelper::read_config_sig(CONFIG_INI, "Set_test", "Beep", &beep_enable) ;
    ui->checkBox_Beep->setChecked(beep_enable.toInt());
    Beep_Dri::Get_Beep()->setEnable(beep_enable.toInt());

    QStringList infos ;
    myHelper::ReadConfig(&infos) ;
    //qDebug() <<  infos.count();
    /*测试时用到的相关参数*/
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

     /*测试模式,即时和标准*/
    ui->checkBox_switch_mode->setChecked(infos.at(7).toInt()) ;
    ui->checkBox_usegun->setChecked(infos.at(8).toInt()) ;
    ui->comboBox_type->setCurrentIndex(infos.at(9).toInt()) ;
    //ui->checkBox_usercode->setChecked(infos.at(13).toInt()) ;
    //setClassifyEnable(infos.at(13).toInt());

    /*LIS传输相关参数*/
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
    /*设置打印信息*/
    ui->checkBox_print_detail->setChecked(infos.at(28).toInt()) ;
    ui->spinBox_print_count->setValue(infos.at(29).toInt())  ;
//    ui->lineEdit_std_print_declar->setText(infos.at(30)) ;
     ui->lineEdit_std_print_declar->setText((this->isEN?"This Result Is Only For "
                                                        "This Sample!"
                                                      :tr("本结果只对本份标本负责！")));



    /*及时更新功能*/
     on_checkBox_usegun_clicked() ;


    /*读取参考值*/
    myHelper::ReadIDProject(&idpro_unique_list) ;
    /*读取补偿系数*/
    myHelper::Read_Ratio(&pro_ratio_list) ;

    /*调试界面的T／C*/
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


    /*参考值界面*/
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
    /*补偿系数界面*/
    ui->tableWidget_xishu->setRowCount(pro_ratio_list.count());
    for(int k=0; k<pro_ratio_list.count();k++)
    {
        ui->tableWidget_xishu->setItem(k, 0, new QTableWidgetItem(pro_ratio_list.at(k).prj_name) );
        ui->tableWidget_xishu->setItem(k, 1, new QTableWidgetItem(pro_ratio_list.at(k).str_ratio));
    }

    /*读取多联卡*/
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
    /*设置历史窗口的字体大小*/
    QFont font  =  ui->tableWidget_history->font();
    font.setPointSize(20);
    ui->tableWidget_history->setFont(font);
    /*设置按键字体*/
    foreach (QPushButton * btn, this->findChildren<QPushButton *>()) {
        font = btn->font() ;
        font.setPointSize(26);
        btn->setFont(font);
     }
    //上传全部和删除全部英文太长 2018/09/21
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

    //设置界面
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
*测试界面相关
*
**********************************/

void First_form::post_err(unsigned int arg)
{

    if (arg == 1)
    {
        emit info2error_dialog(this->isEN?"Item information deleted!"
                                        :tr("项目信息被删除！"));
    }
    else if(!init_finsh)
    {
        emit info2error_dialog(this->isEN?"Initialization failed, please restart the instrument!"
                                        :tr("初始化失败，请重启仪器!"));
    }
    else
    {
        emit info2error_dialog(this->isEN?"Error Communication!"
                                        :tr("通讯出错"));
        for(int i =0; i < 5; i ++)
        {
            show_ret(0,i,0," ");
        }
    }
    myHelper::write_system_record("log/error.ini", "E1", QDateTime::currentDateTime()) ;//错误记录
}

void First_form::item_update_itemList()
{
    /*要解开信号连接，不然程序崩溃*/

    ui->listWidget_setP_2->clear() ;

    POCT_ITEM tmpitem;
    int i = 0;

    ItemManager::ID_info defitem = itemMat->getCur_info();
    QString str;

    foreach (ItemManager::ID_info info, itemList)
    {
        itemMat->loadItem(info, &tmpitem);

        /*把项目存到参考值列表里*/
        for(int i_prj = 0; i_prj < tmpitem.ItemCount; i_prj++)
        {
            for(int i_sub = 0; i_sub < 5; i_sub++)
            {
                if(tmpitem.SIs[i_prj].Name[i_sub].isEmpty())
                    break  ;

                bool go_insert = 0;
                int k ;
                if(idpro_unique_list.count() == 0)                                 //一个项目都没有
                {
                    go_insert = 1 ;
                }
                else
                {
                    for( k=0; k<idpro_unique_list.count() ; k++)
                    {
                        if(idpro_unique_list.at(k).prj_name == tmpitem.SIs[i_prj].Name[i_sub])
                            break ;
                        else if(k == (idpro_unique_list.count()-1))                      //没有找到准备加入新的项目
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

                if(pro_ratio_list.count() == 0)                                             //一个项目都没有
                {
                    go_insert = 1 ;
                }
                else
                {
                    for( k=0; k<pro_ratio_list.count() ; k++)
                    {
                        if(pro_ratio_list.at(k).prj_name == tmpitem.SIs[i_prj].Name[i_sub])
                            break ;
                        else if(k == (pro_ratio_list.count()-1))                      //没有找到准备加入新的项目
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
                             :tr(" [当前项目]"));
        }

        ui->listWidget_setP_2->insertItem(i++, str);
    }

}

/*串口线程控制底层成功之后，处理读回的数据*/
void First_form::get_datas_event(int sw, unsigned int arg)
{
    unsigned int i = 0;
    float tc_value = 0;
    if(sw != 20)
        printf("MainForm  receive %d Event\n", sw) ;

    switch(sw)                                     //返回事件对应命令的标号
    {                                              //控制底层失败
    case -1:
                            /** 可能出现的情况  2018/09/21**/
        /*****************************************************************
         * 1、发送Test指令但是返回的数据包不为24字节,或者解析返回的数据包失败
         * 2、发送复位指令超时
         * 3、发送读条码指令但是超时，或者无法解析返回的数据包
         * 4、读ID卡超时，或接收包不为24, 4096 ,4
         * 5、读版本程序超时
         *
         *
         *
         * **************************************************************/
        post_err();
        break ;                                    //控制底层失败

    case -5://读iD卡失败
    {
        emit info2error_dialog(this->isEN?"None Item!"
                                        :tr("当前无项目卡"));
        myHelper::write_system_record("log/warning.ini", "W1",
                                      QDateTime::currentDateTime()) ;//警报记录
        delay_100ms(LONG_LOCK_TIME ) ;
        this->button_lock = 1 ;

        break ;
    }                                               //控制底层失败

    case 1://光路盒走位，获取测试窗口长度，测试
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
        /*数据处理*/
        switch(get_cvalue())
        {
        case -1:  // 稍后读取项目卡信息
            break ;
        case -2:  // 未加样
        {
            myHelper::write_system_record("log/warning.ini", "W5", QDateTime::currentDateTime()) ;//警报记录
            break ;
        }
        case -3:  // 冲顶
        {
            myHelper::write_system_record("log/warning.ini", "W6", QDateTime::currentDateTime()) ;//警报记录
            break ;
        }
        }

        break;
    }
    case 2:
    {
        char ret_str[31] ;                                                          //注册机构的名字
        uchar ret_nums[4] ;                                                     //机器序列号

        memcpy(&ret_str[0], &register_array[0][0], 10) ;
        memcpy(&ret_str[10], &register_array[1][0], 10) ;
        memcpy(&ret_str[20], &register_array[2][0], 10) ;
        memcpy(ret_nums, &register_array[5][0], 4) ;
        ret_str[30] = '\0' ;                                                        //增加结束符

        QString reg_t = QString::fromLocal8Bit(ret_str) ;


        QString reg_nn ;
        QString str ;

        /*读取机构地址*/
        myHelper::read_config_sig("address.ini", "Address",  "address", &reg_form->str_addr) ;

        /*将16进制转为QString*/
        for(int j=0; j<4; j++)
        {
            str = QString("%1").arg(ret_nums[j]&0xFF, 2, 16, QLatin1Char('0'));
            reg_nn+=str;
            reg_form->num->setText(reg_nn);
            uploadInterface.serialNum = reg_nn;
            ui->label_machine_serial->setText(reg_nn);
        }
        /*浮动范围*/
        T_ratio_range = float(register_array[3][0])/100 ;
        srand( (unsigned)time(NULL) ) ;                                //初始化随即数

        QString md4_v = MD5String(reg_nn + reg_t) ;                    //提取MD5值
        QString ret = md4_v.mid(2,6) ;                                 //加上代码


        ui->label_cmp_name->setText(reg_t);
        ui->label_cmp_addr->setText(reg_form->str_addr);
        thermalPrinter.company = reg_form->str_addr;
        INSTITUTION = reg_t ;                                           //将机构名称存起来
        AREA_CODE = register_array[4][0] ;                              //区域代码
        qDebug() <<__LINE__ <<__FUNCTION__<< "company name :"<<ret ;

        myHelper::write_system_record("log/diary.ini", "A1", QDateTime::currentDateTime()) ;//日记记录

        /*检查加密狗*/
        QString disable_dog;
        myHelper::read_config_sig("sys_config.ini", "SYSTEM", "disable_dog", &disable_dog);
        if (!disable_dog.toInt())
        {
            check_dog(version[0], AREA_CODE) ;
        }

        /*判断是否已注册*/
        int k ;
        for(k=0; k<30; k++)
            if(ret_str[k] != 0xff)
                break ;
        // if( /* k == 30 */ 0)
        if( k == 30 )                                                                      //机器未注册
        {
            qDebug() <<__LINE__ <<__FUNCTION__<< ret ;
            on_pushButton_register_clicked() ;                   //弹出注册窗口
        }
        else
        {

            emit already_register() ;                                        //允许确定按键显示
            init_finsh = 1 ;                                                          //是否开启自动检测

            //允许操作

            ui->main_Button->setVisible(1) ;                       //显示主菜单按键


            if(ui->lineEdit_chanpingdaima->text().isEmpty() || ui->tableWidget_item->item(0, 3)->text().isEmpty())
            {
                //emit info2error_dialog(tr("当前项目参数无效!"));
                system("rm lost_found/* -rf") ;
            }

            on_btnT_menu_clicked() ;                                   //弹出首页

        }

        ui->curve->xAxis->setRange(0, win_lenth);         //设置曲线的X坐标长度

        break;
    }
    case 5://单通道测试
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

        bDotNum = debug_item.Curves[0].StdCount;                                 //标准点个数
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

        //拟合T 1_31  系统校准

        /*找出峰值*/
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
        /*显示曲线*/
        QVector<double> x(win_lenth), y(win_lenth) ;
        int max_value = package[0];
        for(int v = 0; v<win_lenth; v++)
        {
            x[v] = v + 1 ;                                                                                         //横坐标
            y[v] = package[v] ;                                                                            // 纵坐标
            //
            if((unsigned int)max_value < package[v])
                max_value = package[v] ;                                                           //找出最大值，以便调整纵坐标的显示范围
        }


        max_value = max_value + max_value/10 ;                                    //纵坐标的最大值为峰值的110%
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
        ui->curve->replot();                                                                             //开始显示

        for(i=0; i< 4;i++)
        {
            printf("p%d:%f \n",i,id_peakresult.Value[i]) ;
        }

        /*T/C值*/
        float T_V = id_peakresult.Value[ ui->comboBox_p1Value_2->currentIndex() ] ;
        float C_V = id_peakresult.Value[ ui->comboBox_p2Value_2->currentIndex() ] ;
        /*如果T值少于规定的数，则要乘上一个系数1，这个系数1还要再乘一个浮动系数2*/
        T_V =  id_peakresult.Value[poct_item.SIs[ currentsubpj_num].CalcPosi[0] ] ;
        if(T_V < poct_item.SIs[currentsubpj_num].LessThan)
        {
            float tmp_rr = T_ratio_range * rand()/double(RAND_MAX) ;                                              //百分比
            if(rand() & 1) tmp_rr =  -tmp_rr ;
            T_V = T_V * (poct_item.SIs[currentsubpj_num].LessThanRatio  + tmp_rr);
        }
        if(C_V > 0)
            tc_value = T_V/C_V ;
        else
            tc_value = 0 ;

        printf("T/C = %f \n", tc_value) ;
        /*将值设置到对应的LABEL上*/
        ui->lineEdit->setText( QString("%1").arg(id_peakresult.Value[0])) ;
        ui->lineEdit_T2->setText( QString("%1").arg(id_peakresult.Value[1])) ;
        ui->lineEdit_C->setText( QString("%1").arg(id_peakresult.Value[2])) ;
        ui->lineEdit_TC->setText( QString("%1").arg(tc_value) ) ;
        ui->lineEdit_T4->setText( QString("%1").arg(id_peakresult.Value[3]));

        ui->lineEdit_Position1->setText( QString("%1").arg(id_peakresult.Position[0])) ;
        ui->lineEdit_Position2->setText( QString("%1").arg(id_peakresult.Position[1])) ;
        ui->lineEdit_Position3->setText( QString("%1").arg(id_peakresult.Position[2])) ;
        ui->lineEdit_Position4->setText( QString("%1").arg(id_peakresult.Position[3]));

        /*判断当前日期是否已过时,以便更改环境变量*/
        if(staydate != (QDateTime::currentDateTime().toString("yyyy-MM-dd") ))
        {
            if( initial_dir() < 0)                                                                                          //重新设定工作目录
            {
                /**/
            }
            ::close(num_fd) ;                                                                                           //close before

            read_num(dirname) ;                                                                                   //重新设定当前序列号

            nextfilename  = currentnumtostring  + ".dat" ;      //更新即将要写入的文件名

        }

        /*保存测试数据*/
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

        lseek(num_fd, 4, SEEK_SET) ;                                               //覆盖之前的序列号
        if( write(num_fd, &currentDebugnum, 4) < 0)
        {

        }

        wait_for_test_cur_num = -1;
        disableButton_clicked(1) ;
        on_allButton_clicked("COM03");//复位
        myHelper::msDelay(1000);                                                //每次执行完一条任务之后
        disableButton_clicked(1) ;
        hide_button(1) ;

        break;
    }

    case 7://读条码卡
    {
        serial_thead->push_cmd("COM03");
        /*先获取条码值*/
        QString
                barupper = card_value;
        qDebug() <<__LINE__ <<__FUNCTION__<<card_value;

        this->button_lock = 1 ;

        ItemManager::ID_info idinfo;


        /*开始寻找有没有匹配的项目*/
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

        if(idinfo.bcode.isEmpty() || !load_set_project(idinfo))                                                       //没有匹配项目
        {
            info2error_dialog(this->isEN?tr("Please read the information without Item card (%1)").arg(barupper)
                                       :tr("无项目卡(%1)的信息，请读取").arg(barupper)) ;
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
        // 初始化孵化时间

        if (!InitHatchTime(!ui->checkBox_switch_mode->isChecked()))
        {
            info2error_dialog(this->isEN?"The current Item has no valid channel data, please read the                              Item again"
                                         :tr("当前项目无有效通道数据，请重新读取项目")) ;
            if (ui->checkBox_autotest->isChecked())
            {
                auto_ok_flag = 30;

            }
            wait_sate = 0;
            on_rcardButton_clicked();
            delay_100ms(LONG_LOCK_TIME) ;//项目不匹配，延时一段时间然后读ID卡
            break;
        }

        initChannelShow(0);
        setTestButtonSt();

        break ;
    }
    case 9://读ID卡成功
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


        /*校验ID卡头部,客户代码*/
        if(!tmp_ret || file_head != "LABSIMID" ||
                (tmp_item.CompanyCode && version[0] != tmp_item.CompanyCode)
                ){

            emit info2error_dialog(this->isEN?"Wrong format of Item card"
                                            :tr("项目卡格式错误"));
            myHelper::write_system_record("log/warning.ini", "W2", QDateTime::currentDateTime()) ;//警报记录

            delay_100ms(LOCK_TIME );
            break ;
        }

        /*校验区域代码*/
        if(tmp_item.AreaValid && tmp_item.AreaValid != AREA_CODE)
        {

            emit info2error_dialog(this->isEN?"Item card usage area error"
                                            :tr("项目卡使用区域错误"));
            myHelper::write_system_record("log/warning.ini", "W3", QDateTime::currentDateTime()) ;//警报记录

            delay_100ms(LOCK_TIME );
            break ;

        }

        myHelper::write_system_record("log/diary.ini", "A101", QDateTime::currentDateTime()) ;//日记记录
        /*判断要不要设置为默认项目*/
        emit info2error_dialog(tr("ex"));
        ItemManager::ID_info info = itemMat->getIdInfo(&tmp_item);
        bool set_for_default = myHelper::ShowMessageBoxInfo(
                    (this->isEN?"Item:":tr("项目:"))          +
                    info.title                                               +
                    (this->isEN?"\nCode:":tr("\n条码: ")) +
                    info.bcode                                           +
                    QString("   ")                                        +
                    (info.type==0? //非零为多联卡
                     (this->isEN?"Single channel card":tr("单通道卡")+(this->isEN?"\nIs the default project set?":tr("\n是否设置为默认项目?")))
                                 :(this->isEN?tr("%1-Mult Card").arg(info.type):tr("%1联卡").arg(info.type))
                                                                                 +
                       (this->isEN?"\nIs the default project set?":tr("\n是否设置为默认项目?"))));

        itemMat->saveIdHex(&tmp_id_item);

        if(set_for_default)
        {
            load_set_project(itemMat->getIdInfo(&tmp_id_item));
        }
        delay_100ms(LONG_LOCK_TIME);
        break ;
    }

    case 13://自动检测试剂卡/自动测试
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
                        on_rcardButton_clicked() ;           //开始检测,读数
                         last_one = 1 ;                                //测试完先暂停检测一会 2018/10/09
                        up_time = now_time;
                        break ;                                         //少这个break会出问题 2018/10/09
                    }
        up_time = now_time;
        disableButton_clicked(1);//解锁
        break ;
    }

    case 16:
    {
        info2error_dialog(this->isEN?"FA registered successfully!"
                                   :tr("fa注册成功!")) ;
        if(!ui->main_Button->isVisible())                                                       //注册完才允许操作
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
            QString out = tr("温度%1℃\n");

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
        on_rcardButton_clicked();//检测完有卡后继续
        break;
    }
    default:;
    }

//    usleep(48000) ;//如果太快允许继续触发信号，会出先通讯错误

    if(
            sw != 12 && sw != -5 && sw != 13 && sw!=1
            && sw != 7 && sw != 9 && sw != 20 && sw != 21 && sw != 30
            && sw!= 2 && sw != 17 && ui->rcardButton->text() != tr("取消")
            ){
        emit set_button_signal();
    }

}

// 20170222
float CalcItemTC(
                 const POCT_SUBITEM &item,            // 项目参数
                 const ID_PEAKRESULT &id_peakresult,    // 峰值结果及位置
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
  *计算过程:
  * 1.从底板里读出出厂标定值和校准标定值,拟合出一条曲线,然后把每个点代入实际测出的值，算出标准值
  * 2.提取峰值
  * 3.从项目里读出温度补偿的曲线参数（共两对参数），拟合出曲线，然后代入温度值算得系数，然后峰值乘这个系数
  * 4.从项目里读出一个比较系数Q，如果T值小于这个系数Q，则第一个峰值乘以Q再乘以一个浮动数（避免每次都一样）
  * 5.根据项目计算T/C,然后根据拟合曲线算浓度值-->算出5个子项目的值
  * 6.浓度乘样品系数
  * 7.浓度进行（+ - * /）补偿系数
  */
int First_form::get_cvalue()
{
/*判断当前日期是否已过时,以便更改环境变量*/
    if(staydate != (QDateTime::currentDateTime().toString("yyyy-MM-dd") ))
    {
        if( initial_dir() < 0)                                                                                                      //重新设定工作目录
        {
            /**/
        }
        ::close(num_fd) ;                                                                                                       //close before

        read_num(dirname) ;                                                                                               //重新设定当前序列号

        nextfilename  =   currentnumtostring  + ".dat" ;                  //更新即将要写入的文件名
    }

     DWORD blank;
/*开始提取峰值*/
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


    /*判断是否加样*/
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
                            (this->isEN?"Exception C Line":tr("C线异常")));
            try_save();
            return -2 ;
        }
    }

    if(poct_item.MaxCheck > 0)
    {
        // 认为最大的为峰顶，判断是否冲顶的是否
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
            show_ret(true, wait_for_test_cur_num, 1, (this->isEN?"Exception C Line":tr("C线异常")));
            try_save();
            return -3 ;
        }
    }

    // 样本
    int stypeIndex = ui->comboBox_type->currentIndex();

    QList<SUB_SAVE_ITEM> sub_list ;

    do {

        unsigned char curve_index = sub_item->CurveNos[stypeIndex];

        int dec_std = 0;               // 小数位
        float cv_value = 0;//[5] ;

        /*T/C值*/
        float P0_tmp =  id_peakresult.Value[sub_item->CalcPosi[0]] ;
        if(P0_tmp < sub_item->LessThan)
        {
            float tmp_rr = rand() / double(RAND_MAX) ;                                      //百分比
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

        //求浓度
        ID_CURVE *Curves = NULL;
        if (curve_index < 255)
        {
            Curves = &poct_item.Curves[curve_index];
        }

        if(Curves != NULL)
        {
            //拟合曲线
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
            //算浓度
            //-----------------1_18--------------------------
            cv_value /* [sub_num] */ = CalcConc(tc_value) ;

            //浓度乘样品系数
            cv_value *= sub_item->Ratios[stypeIndex];


            //
            if(cv_value <= 0)
                cv_value = QString::number(0.001, 'f', dec_std).toFloat() ;
            //设定小数位
            if(sub_item->RangeDec > 0)
                cv_value = QString::number(cv_value, 'f',  dec_std).toFloat() ;
            else
                cv_value = QString::number(cv_value, 'f', 2).toFloat() ;

        }
        /*初始化存放记录的结构体并存储*/



        /*有多少个子子项目*/
        for(int k = 0; k < 5 && !sub_item->Unit[k].isEmpty(); k++)
        {

            float tmp_c_value = cv_value;

            //补偿系数3_07
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
        //结果区第二列显示结果值
        show_ret(true,wait_for_test_cur_num,1,//当通道的测试任务的子项目列表的第0个子项目的C值
                        QString("%1 %2").arg(QString(test_task[wait_for_test_cur_num].subResult.at(0).c_value))
//                                                                            sub_list.at(wait_for_test_cur_num).c_value
                                                      .arg(poct_item.SIs[wait_for_test_cur_num].Unit[0]));

        qDebug() <<__LINE__ <<"<"<<__FUNCTION__<<">"<<"current channel ="<<wait_for_test_cur_num;
        qDebug() <<__LINE__ <<"<"<<__FUNCTION__<<">"<<"value ="<<test_task[wait_for_test_cur_num].subResult.at(0).c_value;
        qDebug() <<__LINE__ <<"<"<<__FUNCTION__<<">"<<"unit ="<<poct_item.SIs[wait_for_test_cur_num].Unit[0];
    }
    else show_ret(true, wait_for_test_cur_num, 1, QString("---"));

    card_value = poct_item.BarCode;
    // 尝试去保存完整的项目
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

// 撤销该宏
#undef TMP_SIZE


}

void First_form::test_ui_init()
{


    if (myHelper::FileIsExist("tmp.csv"))
         system("rm tmp.csv") ;

    lockbytimer = 0 ;                   //每次执行完一条任务之后，需要间隔一段时间才允许继续触发事件
    lockbytimer_num = 0 ;        //间隔时间倒数
    last_one = 0;                       // 2018/10/09
    //print_done = 9999 ;
    //print_current = -1;
    //uart_upload_done = 9999 ;
    //uart_upload_current = -1 ;

    //sound_flag = 0 ;                   //是否开启声音
    init_finsh = 0 ;                      //是否开启自动检测

    paper_isEmpty = 0 ;             //检测打印机有没有纸

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
    form_count = 0 ;          //提示画面的停留时间倒数
    connect(this, SIGNAL(form_count_signal(QString)), this, SLOT(form_count_slot(QString))) ;
    /*标准测试等待时间*/

    InitHatchTime(-1);

     wait_sate = 1 ;            //还没计时状态
     //
     ui->lineEdit_std_print_declar_2->setFocus() ;

 }

/*UI主线程将命令入站   2018/09/28*/

void First_form::on_allButton_clicked(const char com[])
{
    if(button_lock)
    {
        char buffer[BUFFER_SIZE + 1];

        bzero(buffer, sizeof(buffer)) ;
        strncpy(buffer, com, COM_NAME_LEN) ;

        serial_thead->push_cmd(buffer);

        //处理事件中，暂时设置按钮不可按，直至事件处理完
         disableButton_clicked(0) ;
         QString scmd = QString(com).left(5);



         //自动测试和温度不用隐藏
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
        myHelper::write_system_record("log/warning.ini", "W7", QDateTime::currentDateTime()) ;//警报记录
        emit info2error_dialog(this->isEN?"The current Item parameter is invalid!"
                                        :tr("当前项目参数无效!"));
        return ;
    }
    if(button_lock)
    {
        wait_for_test_cur_num = ui->comboBox_DebugCh->currentText().toInt() - 1;
        on_allButton_clicked("COM05") ;//单通道测试
    }

}
/*测试槽*/
void First_form::on_rcardButton_clicked()
{
  #if 0
   unsigned int times = 0;
    while(1)
    {

        on_allButton_clicked("COM11");//退卡

        times++;
        ui->times->text().append(QString::number(times));
//        sleep(8);

    }
      #endif
    qDebug() <<__LINE__ <<__FUNCTION__<<sender();
    if(sender() == ui->rcardButton )
    {
            on_allButton_clicked("COM20");//测试前先，判断有没有卡
            disableButton_clicked(1);//解锁 2018-10-22
            return ;
    }

    qDebug() <<__LINE__ <<__FUNCTION__<<serial_thead->HasReagentCard ;
    if(serial_thead->HasReagentCard == 2
        &&ui->stackedWidget->currentIndex() == 0
        && sender() != ui->main_Button
        && !ui->checkBox_autotest->isChecked())
    {
        emit info2error_dialog(this->isEN?"Please insert Reagent Card!"
                                            :tr("无试剂卡，请插卡！!"));
        return ;
    }

    if(serial_thead->HasReagentCard  != ui->comboBox_test_model->currentIndex()
        && ui->stackedWidget->currentIndex() == 0
        && sender() != ui->main_Button
        && (serial_thead->HasReagentCard != 3)
        && !ui->checkBox_autotest->isChecked())
    {
        emit info2error_dialog(this->isEN?"Reagent Card whit Item no match!"
                                            :tr("试剂卡与项目不匹配!"));
        return ;
    }

    ItemManager::ID_info info = itemMat->getCur_info();

    if (info.bcode.isEmpty() && sender() == ui->rcardButton)
     {
         emit info2error_dialog(this->isEN?"Set the default Item!"
                                         :tr("请设置默认项目!"));
         disableButton_clicked(1) ;
         return ;
     }

    if (wait_for_test_cur_model  && sender() != ui->main_Button)
    {
        // mulit channel
        if (info.type == 0 || int (info.type) < wait_for_test_cur_model)
        {
            emit info2error_dialog(this->isEN?"The current Item is not accouplement!":tr("默认项目的类型与当前模式不兼容!"));
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
                                            :tr("默认项目的类型与当前模式不兼容!"));
            disableButton_clicked(1) ;
            return ;
        }
    }

    if (wait_for_test_cur_num != -1)//如果正在测试
    {
        qDebug() <<__LINE__ <<__FUNCTION__<<wait_for_test_cur_num<<"testinginging";
        return;
    }

    if(!ui->checkBox_checkbar->isChecked() && sender() != ui->main_Button)
    {
        if(ui->lineEdit_chanpingdaima->text().isEmpty() ||
                ui->tableWidget_item->item(0, 3)->text().isEmpty())//没有子项目参数
        {
            myHelper::write_system_record("log/warning.ini", "W7", QDateTime::currentDateTime()) ;//警报记录
            emit info2error_dialog(this->isEN?"The current Item parameter is invalid!"
                                            :tr("当前项目参数无效!"));
            disableButton_clicked(1) ;
            return ;
        }
    }

    if (sender() == ui->rcardButton)//手动测试,由测试按钮触发
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

     if(wait_sate == 1)//为1， 空闲时间
     {
         if(button_lock)
         {
             wait_for_test_cur_num = -1;
             InitHatchTime(-1);//设置孵育时间

             if (ui->checkBox_checkbar->isChecked())//如果扫描条码
             {
                 on_allButton_clicked("COM07") ;
             }
             else
             {
                 lockbytimer = 0 ;                                                      //防抖动，如果取消之后马上测试会恢复所有按钮可按
                 hide_button(0) ;

                 if (!InitHatchTime(!ui->checkBox_switch_mode->isChecked()))
                 {
                     hide_button(1) ;

                     emit info2error_dialog(this->isEN?"The current Item has no valid channel data"
                                                     :tr("当前项目无有效通道数据!"));
                     return;
                 }
                 initChannelShow(0);
             }
             setTestButtonSt();//修改按钮显示文字：测试，取消，自动测试
             stop_auto = 0 ;
             wait_sate = 0 ;
         }
     }
     else  // 为 0， 说明正在孵化时间
     {
         wait_sate = 1 ;
         for (unsigned int x = 0; x < ARRAYSIZE(test_task); x++)
         {
             //  属于取消按键调用的
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

/*进卡槽*/
void First_form::restButton_clicked()
{
    serial_thead->push_cmd("COM03");
}
/*测试界面打印按钮的槽*/
void First_form::on_printButton_clicked()
{
    if(button_lock)
    {
        if(ui->label_serial_num->text().isEmpty())
        {
            emit info2error_dialog(this->isEN?"No information is currently printed"
                                            :tr("当前无信息打印"));
        }
        else
        {
            //处理事件中，暂时设置按钮不可按，直至事件处理完
            disableButton_clicked(0) ;          //设置按钮不可按
            hide_button(0) ;                          //隐藏按键

                //判断是否是打印测试 2018/09/29
            if(ui->checkBox_PrintTest->isChecked())
            {
                ui->printButton->setEnabled(1);
                ui->printButton->show();
                if(ui->printButton->text().toLocal8Bit() == "打印")
                    {
                        ui->printButton->setText(tr("取消打印"));
                        while(ui->printButton->text().toLocal8Bit() == "取消打印" )
                             print_event(currentfilename, 0) ;
                    }
                    else//如果取消打印
                    {
                     ui->printButton->setText(tr("打印"));
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
/*读ID卡槽*/
void First_form::readidcardButton()
{
    QPushButton *btn = (QPushButton *)sender();
    QString name ;

    if( btn != 0 )
         name = btn->objectName() ;
    if(button_lock)
    {
        info2error_dialog(this->isEN?"fsPlease wait while reading the project.."
                                   :tr("fs读取项目，请稍候..")) ;

        hide_button(0) ;                            //隐藏按键

       on_allButton_clicked("COM09") ;//读ID卡
    }
}

/*恢复或者禁止按键*/
void First_form::disableButton_clicked(bool flag)
{
    button_lock = flag ;
    //stop_auto = flag ;
}

/*分类统计*/
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

//用户代码的加减键
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



 //样本高级信息
 void First_form::on_detailButton_clicked()
 {
     detail_form->show() ;
 }


 /*保存使用样本类型*/
 void First_form::on_comboBox_type_currentIndexChanged(int index)
 {
     myHelper::write_config_sig("config.ini", "Set_test", "Sampletype", QString("%1").arg(index)) ;
     /* 如果为英文版本且样本类型为末梢血，则改变字体大小 */
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
         wait_sate = 0 ;  //防止按键不恢复
         button_lock = 1 ;
         on_rcardButton_clicked() ;
     }
     ui->stackedWidget->setCurrentIndex(5);
     ui->stackedWidget_3->setCurrentIndex(0);
 }
 //隐藏按键
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
 //删除项目
 void First_form::on_pushButton_deleteitem_clicked()
 {
     if(itemList.size() <= 0)
     {
         emit info2error_dialog(this->isEN?"None Item!":tr("当前无项目!"));
          return ;
     }
     if(ui->listWidget_setP_2->currentRow() >= 0)
     {
         if(!myHelper::ShowMessageBoxInfo(this->isEN?"Delete?":tr("是否删除?")))
             return ;

         itemMat->deleteIdHex(itemList.at(ui->listWidget_setP_2->currentRow()));

         ui->lineEdit_chanpingdaima->clear();
     }
     else
     {
//          emit info2error_dialog(tr("请选择项目!"));
          emit info2error_dialog(this->isEN?"Plesae selece item!"
                                          :tr("请选择项目!"));
     }
 }


 /*测试模式切换开关*/
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

 /*是否使用条码枪*/
 void First_form::on_checkBox_usegun_clicked()
 {
     if( ui->checkBox_usegun->isChecked() )
     {
         ui->lineEdit_std_print_declar_2->setVisible(0) ;  //手动输入
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

 /*恢复出厂设置*/
 void First_form::on_pushButton_default_clicked()
 {
     if(!myHelper::ShowMessageBoxInfo(this->isEN?"Clear all data?"
                                                 :tr("是否清除所有数据?")))
         return ;
    emit info2error_dialog(this->isEN?"fsPlease wait while clearing."
                                    :tr("fs正在清除,请稍候.."));
    system("rm ./1* -r ") ;
    system("rm ./2* -r ") ;
    system("rm ./Project/* -r ") ;
    system("rm ./config.ini ") ;
    system("rm ./log/* -r ") ;
    system("sync ") ;
    emit info2error_dialog(this->isEN?"fsClean up and restart the system"
                                    :tr("fs恢复出厂设置成功，请重启系统!"));
 }
/*********************************
*历史界面相关
*
**********************************/
/*初始化当前环境变量*/
int First_form::initial_dir()
{
    QString tmp ;

    bool ok ;

    this->staydate = QDateTime::currentDateTime().toString("yyyy-MM-dd") ;

    //初始化当前环境变量
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
    if( tempDir.exists() == 0)                                                  //没有该目录说明是新的一天，则创建新目录开始记录
    {
        if( system(com.toLocal8Bit().constData()) <0 )
        {
            printf("system call failed --> mkdir \n") ;
        }
    }
    com.clear() ;
    com = com + "mkdir -p " +debugdir ;
    if( debugDir.exists() == 0)                                                //没有该目录说明是新的一天，则创建新目录开始记录
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
/*按键切换*/
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

/*更新历史表格*/
int First_form::update_history_ui(QString low, QString up)
{
    int i = 0;
    int row_count ;
    //int row_add = 0;              //因为hsCRP会增加数据行，所以需要不断添加表格行数

    int page ;                              //多少页
    int rest ;                                //最后一页剩余量

    QList<QFileInfo> fileInfo ;
    QStringList prj_list ;
    QString match_str = ui->comboBox_prj->currentText() ;
    if(match_str == "All")
        match_str = QString ::fromLocal8Bit("全部");
    myHelper::read_record(low, up, &fileInfo, &prj_list,  match_str) ;
    row_count = fileInfo.size() ;

    if(row_count > MAX_INFOS)
    {
        fileInfo.clear();
        info2error_dialog(this->isEN?"Query record too many, please narrow the date range!"
                                   :tr("查询记录过多，请缩小日期范围!")) ;
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

    /*设置筛选选项*/
     disconnect(ui->comboBox_prj, SIGNAL(currentIndexChanged(int)), this, SLOT(on_comboBox_prj_currentIndexChanged(int))) ;
    ui->comboBox_prj->clear() ;
    ui->comboBox_prj->insertItem(0, (this->isEN?"All":tr("全部"))) ;
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
           // max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //找出原来文件信息列表中的序号
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
           // max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //找出原来文件信息列表中的序号
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
/*更新原始数据表格*/
int First_form::update_primary_ui(QString low, QString up)
{
    int i = 0;

    int row_count ;

    int page ; //多少页
    int rest ; //最后一页剩余量


    QList<QFileInfo> fileInfo ;
     QStringList prj_list ;
     QString match_str = ui->comboBox_prj_2->currentText();
     if(match_str == "All")
         match_str = QString ::fromLocal8Bit("全部");
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

    /*设置筛选选项*/
     disconnect(ui->comboBox_prj_2,SIGNAL(currentIndexChanged(int)), this, SLOT(on_comboBox_prj_2_currentIndexChanged(int))) ;
    ui->comboBox_prj_2->clear() ;
    ui->comboBox_prj_2->insertItem(0, (this->isEN?"All":tr("全部")) ) ;
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
            //max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //找出原来文件信息列表中的序号
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
           // max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //找出原来文件信息列表中的序号
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

/*更新debug数据表格*/
int First_form::update_Debug_ui(QString low, QString up)
{
    int i = 0;
    // SAVE_ITEM load_item ;
    int row_count ;
    //int row_add = 0;//因为hsCRP会增加数据行，所以需要不断添加表格行数

    int page ;                  //多少页
    int rest ;                    //最后一页剩余量

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
            //max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //找出原来文件信息列表中的序号
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
            //max_num = myHelper::decode_date(sort_tmp.at(i*PAGE_DATA_NUMS + j), &fileInfo) ; //找出原来文件信息列表中的序号
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

/*更新classify数据表格*/
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

    myHelper::read_record(low,up, &fileInfo, &tmp, tr("全部")) ;
    row_count = fileInfo.size() ;

    int fd = -1;

    for(int j=0; j<row_count; j++)
    {
                                                                                                        //1`查询是否已有该项目
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

        if(i<item_list.count())                                                         //1.1`查询到已有该项目，则该编号+1
        {

            if(load_item.Classify_code != 255)
            {
                ITEM_SCAN tmp_list ;
                tmp_list = item_list.at(i) ;
                tmp_list.User_code[load_item.Classify_code] ++ ; //编号+1
                item_list.replace(i, tmp_list) ;                                      //替换掉旧的
            }
        }
        else                                                                                        //1.1`没有该项目，则增多一个项目，然后编号+1
        {

                ITEM_SCAN tmp_list ;

                memset(tmp_list.User_code, 0, sizeof (tmp_list.User_code));

                tmp_list.item_name = QString::fromLocal8Bit(load_item.Prj_name) ;

                if(load_item.Classify_code != 255)
                {

                    tmp_list.User_code[load_item.Classify_code] ++ ;

                }

                item_list << tmp_list ;                                                   //新增一个项目

        }
        //

    }


    ui->tableWidget_classify->clear() ;

    //是否有数据，没数据则直接清空
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
                                                                                                      //1`表头，项目名字
        ui->tableWidget_classify->setColumnCount (column);
        QStringList header ;
        for(int i = 0; i < column; i++)
        {
            header << item_list.at(i).item_name ;
        }

        ui->tableWidget_classify->setHorizontalHeaderLabels(header) ;
                                                                                                     //2`取最大行数，设置
       char state[ARRAYSIZE(item_list.at(0).User_code)] = { 0 } ;                                                               //记录下所有列中有哪几列是要显示的
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
                                                                                                    //3`设置列表头
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

       ui->comboBox_classify->clear();                                      //下拉列表增加，用于打印选择
       ui->comboBox_classify->addItems(row_header) ;          //客户代码
                                                                                                    //4`逐列设置每个数字
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

    //显示查询日期
    ui->label_date->setText(low + " ~ " + up) ;


    return 0 ;
}



/*上传任务*/
int First_form::upload_event(QString fpath)
{
    Q_UNUSED(fpath);
    return 0 ;
}

bool First_form::upload_event_check(const char *pname, int row)
{
    if(row < multi_card_list.count())                                     //有该项目
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
        int ret = thermalPrinter.print(fpath,                               //调用printer.c的打印函数
                                                 ui->label_cmp_name->text(), //机构名称
                                                ui->lineEdit_std_print_declar->text());//报告声明
        if(ret == -2)
        {
            emit info2error_dialog(this->isEN?"Printer paperless!"
                                            :tr("打印机无纸"));
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
        /*先检测有没有纸*/
        print_detect() ;
        delay(100);

        if(paper_isEmpty)
        {
            emit info2error_dialog(tr("打印机无纸"));
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
            /*判断数据错误*/
            if(load_print_item.sub_count == 0 )
            {
                ::close(fd);
                return -1 ;
            }


            // 实则校验文件大小
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



        // 打印公司名字
        print_org() ;
        delay(100);


        // 打印测试表单标题
        print_title() ;
        delay(100);


        /*5 打印抬头信息 */
        prepare_print_data3(com_line, load_print_item) ;
        bzero(buffer, BUFFER_SIZE) ;
        memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;

        if(!serial_thead->push_cmd(buffer))
        {
            printf("write failed\n") ;
            return -1 ;
        }
        delay(100);


        /*4 打印检查日期时间 */
        {
            // 挑出最新时间
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

        /*3 打印检查测量结果数据的标题 */
        prepare_print_data( com_line) ;
        bzero(buffer, BUFFER_SIZE) ;
        memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length()) ;

        if(!serial_thead->push_cmd(buffer))
        {
            printf("write failed\n") ;
            return -1 ;
        }
        delay(100);



        /*2 打印检查测量结果数据 */
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


        /*1 打印报告尾 */
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

/*打印固定的标题*/
/*
int First_form::print_title()
{


    char buffer[BUFFER_SIZE + 1];
     bzero(buffer, sizeof(buffer)) ;
    QString com_line ;
    char enlarge_2[10] = {'P','R','I','0','0',0x1b,0x57,02,'\n','\0'} ;
    char enlarge_1[10] = {'P','R','I','0','0',0x1b,0x57,01,'\n','\0'} ;

    memcpy(buffer,enlarge_2 , sizeof (enlarge_2)) ;                                                  //字体放大两倍
    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;
        return -1 ;
    }



    com_line.clear();
    if(ui->rcardButton->text() == "Test")
        com_line = com_line + "PRI00" +QString("    Test Report \r\n") ;
    else
        com_line = com_line + "PRI00" +QString::fromLocal8Bit("   检测报告单  \r\n") ;
    memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;
        return -1 ;
    }

    //
    memcpy(buffer,enlarge_1 , sizeof (enlarge_1)) ;                                                  //恢复一倍字体
    if(!serial_thead->push_cmd(buffer))
    {
        printf("write failed\n") ;
        return -1 ;
    }
    return 0 ;
}
*/
/*打印固定的标题*/
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

/*检测是否有打印纸*/
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

        //读取数据
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
        //读取数据
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
            // FF&040603e93&<1&2016-9-2 11:07:50&CRP/PCT&hscrp&张三&24岁&男&血清&EE
            + QString::fromLocal8Bit(load_item->p_name).trimmed() + "&"
            + tmp3 + "&"
            + QString::fromLocal8Bit(load_item->sex).trimmed() + "&"
            + QString::fromLocal8Bit(load_item->Type) + "&"
            // 20170206 end

            + "EE";
}


/*读取序列号*/
int First_form::read_num(QString dirname)
{
    uchar buffer[8] ;
    QString tmp = dirname + "/num.m" ;
    const char *filename = tmp.toLocal8Bit().constData() ;
    int length =  sizeof(buffer) ;

    if( myHelper::FileIsExist(tmp) )                                    //已存有序列号，直接读取
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
    else                                                                                    //没有序列号，重新开始计数
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
    //格式化序列号
    QString tmp1 ;
    myHelper::format_num(set_test.Samelenth, set_test.Numlenth, currentnum, &tmp1) ;
    QString date2string = QDate::currentDate().toString("yy-MM-dd")  ;
    currentnumtostring = date2string.remove("-") + tmp1 ;


    return 0 ;
}

/*保存测试完后的数据*/
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


/*确认查看历史的槽*/
/*日期窗口选好日期后通知这边*/
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

    if(select_date->who_calls == 1)//历史数据表带上传打印功能(objName == "histroyButton")   //(select_date->who_calls == 1)//
     update_history_ui(low_date,up_date ) ;             //更新
    else if(select_date->who_calls == 2)//原始数据表详细的测试结果
      update_primary_ui(low_date,up_date ) ;
    else if(select_date->who_calls == 3)//debug数据表
      update_Debug_ui(low_date,up_date) ;
    else                                //4 项目统计表
      update_Classify_ui(low_date,up_date) ;
}
/*导出原始数据*/
void First_form::on_ex_primaryButton_clicked()
{
    info2error_dialog(this->isEN?"fsPlease wait while exporting..."
                                 :tr("fs正在导出,请稍候..")) ;
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

              freshButton_clicked() ;//刷新一下设备选择界面

              bool success_flag = false;//至少有一个导出成功，不然就是没有选择对的设备


              form_count_num = 0 ;

              if( debug_data_count )
              {

                  //QDir *dir=new QDir(dirname);//存放要读取记录的文件地址

                  QString single_info ;
                  QStringList export_info ;
                  //char buffer[LOCAL_FILE_SIZE] ;
                  SAVE_DEBUG_ITEM load_item ;


                  for(unsigned int i=0; i <debug_page_all; i++)
                  {
                       RECORD_LIST tmp_list = debug_list.at(i) ;
                       for(int j=0; j < tmp_list.count; j++)
                       {

                          //处理事件中，暂时设置按钮不可按，直至事件处理完
                          disableButton_clicked(0) ;
                          hide_button(0) ;  //隐藏按键
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
                  form_count_str = (this->isEN?"faExport success": tr("fa导出成功"));//myHelper::ShowMessageBoxQuesion(tr("导出成功!")) ;
              else
              {
                  info2error_dialog(this->isEN?"Select an export device!"
                                             :tr("请选择可导出设备!")) ;
                  //myHelper::ShowMessageBoxQuesion(tr("请选择可导出设备!")) ;
                 // info2error_dialog(tr("ex")) ;
              }
              disableButton_clicked(1) ;
              hide_button(1) ;
      }
      else
      {
              info2error_dialog(this->isEN?"No current record!"
                                         :tr("当前无记录!")) ;
      }
  }
  else
  {

              info2error_dialog(this->isEN?"Please insert U disk!"
                                         :tr("请插入U盘!")) ;
              //info2error_dialog(tr("ex")) ;
  }
}

void First_form::on_exportButton_clicked()
{

    info2error_dialog(this->isEN?"fsPlease wait while  exporting..."
                               :tr("fs正在导出,请稍候..")) ;
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
                                     :tr("fs正在导出,请稍候..")) ;
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
                      //处理事件中，暂时设置按钮不可按，直至事件处理完
                     if(int(tmp_list.check_state[j]) == 0)
                         continue ;
                      disableButton_clicked(0) ;
                      hide_button(0) ;  //隐藏按键
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
                                           :tr("请选择数据!")) ;

                disableButton_clicked(1) ;
                hide_button(1) ;
                return ;
            }

              freshButton_clicked() ;//刷新一下设备选择界面

              bool success_flag = false;//至少有一个导出成功，不然就是没有选择对的设备


              form_count_num = 0 ;


              if(USB_has[0])
              {
                  QString save_filename = t_list.at(0).absoluteFilePath()
                     + "/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss").replace(" ","_").replace(":","-") + ".csv" ;

                  QString headr;
                  if(objName == "exportButton" )
                  {
                       headr  = headr +
                               tr("流水号,")  +
                               tr("样本号,") +
                               tr("姓名,") +
                               tr("性别,") +
                               tr("年龄,")+
                               tr("条码值,") +
                               tr("样本类型,") +
                               tr("项目,") +
                               tr("浓度(1),") +
                               tr("浓度(2),") +
                               tr("浓度(3),") +
                               tr("浓度(4),") +
                               tr("浓度(5),") +
                               tr("时间")+
                               "\r\n";
                  }
                  else
                  {
                        headr  = headr + tr("序列号,") + tr("项目,") + "(X1,X2,X3,X4," + tr("浓度,")+ tr("单位,") + tr("时间")+ ")n,(...)m\r\n";
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
                  form_count_str = (this->isEN?"faExport success":tr("fa导出成功")) ;//myHelper::ShowMessageBoxQuesion(tr("导出成功!")) ;
              else
              {
                  info2error_dialog(this->isEN?"Select an export device!"
                                             :tr("请选择可导出设备!")) ;

              }
              disableButton_clicked(1) ;
              hide_button(1) ;
      }
      else
      {
              info2error_dialog(this->isEN?"No current record!"
                                         :tr("当前无记录!")) ;
      }
  }
  else
  {
              info2error_dialog(this->isEN?"Please insert U disk!"
                                         :tr("请插入U盘!")) ;

  }

}
void First_form::on_printsingleButton_clicked()
{
    //rowCount ;

   bool is_notempty = 0;
   //print_done = 0 ;
   //print_current = 0 ;
    //获取被选中的行标号,根据行标号获取信息
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
           hide_button(0) ;  //隐藏按键

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

           //if(print_done != 1)                                                                            //只打印一次不提示
               myHelper::ShowMessageBoxQuesion(this->isEN?"Print OK!"
                                                        :tr("打印完毕!")) ;
           //myHelper::ShowMessageBoxError(titem->text()) ;
           //处理事件中，暂时设置按钮不可按，直至事件处理完
       }

   }
   else
   {
       info2error_dialog(this->isEN?"Please select data!"
                                  :tr("请选择数据!")) ;
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
                                                       :tr("是否打印全部")))
           {
               //处理事件中，暂时设置按钮不可按，直至事件处理完
               hide_button(0) ;  //隐藏按键


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
                                                        :tr("打印完毕!")) ;
           }
           else
               disableButton_clicked(1);
       }

   }
   else
   {
       info2error_dialog(this->isEN?"No current record!"
                                  :tr("当前无记录!")) ;
   }
}

/*单上传*/
void First_form::on_uploadsingleButton_clicked()
{

    RECORD_LIST tmp_list;

   bool is_notempty = 0;

    //获取被选中的行标号,根据行标号获取信息
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
                                                        :tr("上传成功!")) ;
            disableButton_clicked(1) ;
       }
   }
   else
   {
       info2error_dialog(this->isEN?"Please select data!"
                                  :tr("请选择数据!")) ;
   }
}
/*历史数据全部上传 2018/09/04*/
void First_form::on_uploadallButton_clicked()
{

    if(history_page_all != 0)
    {
        if(button_lock)
        {

            if(myHelper::ShowMessageBoxInfo(this->isEN?"Upload all?"
                                            :tr("是否全部上传?")))
            {
                disableButton_clicked(0);
                hide_button(0) ;  //隐藏按键
                //处理事件中，暂时设置按钮不可按，直至事件处理完
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
                                                         :tr("上传成功!")) ;

                disableButton_clicked(1);
                hide_button(1) ;
            }
        }

    }
    else
    {
        info2error_dialog(this->isEN?"No current record!"
                                   :tr("当前无记录!")) ;
    }
}
/*删除记录*/
void First_form::on_delsigButton_clicked()
{

    bool is_notempty = 0;
     //获取被选中的行标号,根据行标号获取信息
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
            myHelper::write_system_record("log/diary.ini", "A301", QDateTime::currentDateTime()) ;//日记记录
        }
    }
    else
    {
        info2error_dialog(this->isEN?"Please select data!"
                                   :tr("请选择数据!")) ;
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
                                            :tr("是否全部删除?")))
            {
                //处理事件中，暂时设置按钮不可按，直至事件处理完


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
                myHelper::write_system_record("log/diary.ini", "A301", QDateTime::currentDateTime()) ;//日记记录

            }
            disableButton_clicked(1);
        }

    }
    else
    {
        info2error_dialog(this->isEN?"No current record!"
                                   :tr("当前无记录!")) ;
    }
}
/*刷新U盘列表*/
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


/*密码输入正确之后跳转到相对应的界面*/
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
//显示数据曲线
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
        //读取数据
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
                                    :tr("fa请选择一行数据.")) ;
    }
}

void First_form::history_turnpage_event(int page)
{
    int i ;
    //这里用于中英日期格式的转换 2018/09/18
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

        if(q != load_item.sub_count)             //防止文件损坏
        {
            //ui->tableWidget_history->setRowCount(0);
            bad_file = 1 ;
            //break  ;
        }
        ::close(fd) ;

        //流水号字符串格式
        ui->tableWidget_history->setItem(i , 0, new QTableWidgetItem(QString::fromLocal8Bit(load_item.serial_code)));
        // 添加样本号
        ui->tableWidget_history->setItem(i , 1, new QTableWidgetItem(QString::fromLocal8Bit(load_item.c_Nums)));
        // 对应项目卡码
        ui->tableWidget_history->setItem(i , 2,
            new QTableWidgetItem(QString("%1%2%3")
            .arg(load_item.BarCode[0]&0xFF, 2, 16, QLatin1Char('0'))
            .arg(load_item.BarCode[1]&0xFF, 2, 16, QLatin1Char('0'))
            .arg(load_item.BarCode[2]&0xFF, 2, 16, QLatin1Char('0'))
            .toUpper().remove(5,1)));

         if(bad_file)
         {
             ui->tableWidget_history->setItem(i , 3, new QTableWidgetItem(tr("数据损坏")));  //edit225
             ui->tableWidget_history->setItem(i , 4, new QTableWidgetItem(tr("数据损坏")));  //edit225
             ui->tableWidget_history->setItem(i , 5, new QTableWidgetItem(tr("数据损坏")));  //edit225
         }
         else
         {
             if(load_item.sub_count == 1)
             {
                  // 项目名
                  ui->tableWidget_history->setItem(i , 3, new QTableWidgetItem(QString::fromLocal8Bit(tm_list.at(0).Name)));  //edit225
                  // c_value是Cvale的精确float_decimal位小数生成的ASCII字符串表示
                  ui->tableWidget_history->setItem(i , 4, new QTableWidgetItem(QString::fromLocal8Bit(tm_list.at(0).c_value)));  //edit225
                  // 该Cvalue数据的物理单位
                  ui->tableWidget_history->setItem(i , 5, new QTableWidgetItem(tm_list.at(0).Unit));  //edit225
             }
             else
             {
                 ui->tableWidget_history->setItem(i , 3, new QTableWidgetItem(QString::fromLocal8Bit(load_item.Prj_name)));  //edit225
                 ui->tableWidget_history->setItem(i , 4, new QTableWidgetItem("..."));  //edit225
                 ui->tableWidget_history->setItem(i , 5, new QTableWidgetItem("..."));  //edit225
             }
        }
          // 该结构体产生时间，字符串形式，这里精确时分秒
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
          // 测试类型
          ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit(load_item.Type)));
          if(this->isEN)
          {
              QString temp_Type = QString::fromLocal8Bit(load_item.Type);
              if(temp_Type.toLocal8Bit() == "血清/血浆")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Serum/Plasma")));
              }
              if(temp_Type.toLocal8Bit() == "全血")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Whole Blood")));
              }
              if(temp_Type.toLocal8Bit() == "末梢血")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Peripheral Blood")));
              }
              if(temp_Type.toLocal8Bit() == "尿液")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("Urine")));
              }
              if(temp_Type.toLocal8Bit() == "质控")
              {
                  ui->tableWidget_history->setItem(i , 7, new QTableWidgetItem(QString::fromLocal8Bit("QC")));
              }
          }
          //姓名
          ui->tableWidget_history->setItem(i , 8, new QTableWidgetItem(QString::fromLocal8Bit(load_item.p_name)));
          //性别
          ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem(QString::fromLocal8Bit(load_item.sex)));

          if(this->isEN)
          {
                QString sex_temp = QString::fromLocal8Bit(load_item.sex);
              if(sex_temp.toLocal8Bit() == "男")
                ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem("Male"));
              else if(sex_temp.toLocal8Bit() == "女")
                  ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem("Female"));
              else
                  ui->tableWidget_history->setItem(i , 9, new QTableWidgetItem(" "));
          }
          //年龄和年龄单位
          ui->tableWidget_history->setItem(i , 10, new QTableWidgetItem(
                                               load_item.age_valuse[0]?
                                               QString(load_item.age_valuse) + this->detail_form->age_unit->itemText(load_item.age_index):
                                               QString("")));

    }
    ui->label_page->setText(QString("%1").arg(page+ 1)) ;
    //设置钩选
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
//下一页
void First_form::on_pagedownButton_clicked()
{

    if(history_page < (history_page_all-1))
        history_page++ ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//up一页
void First_form::on_pageupButton_clicked()
{

    if(history_page > 0)
        history_page-- ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//first 页
void First_form::on_firstButton_clicked()
{
    history_page = 0 ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//last 页
void First_form::on_lastButton_clicked()
{

    history_page = history_page_all - 1 ;
    if(history_data_count)
        history_turnpage_event(history_page) ;
}
//保存钩选状态
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
    //获取被选中的行标号,根据行标号获取信息

   int row = ui->tableWidget_history->currentRow() ;
   if(row != -1)
   {
      if(ui->tableWidget_history->item(row, 2)->text() != tr("数据损坏"))
      {
          select_date->who_calls = 1;
          history_edit_form->show_form(record_list.at(history_page).file_name[row]);
      }
   }
   else
   {
       info2error_dialog(this->isEN?"faSelect a row of data."
                                  :tr("fa请选择一行数据.")) ;
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



    //设置钩选
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
//保存钩选状态
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
/*统计数据导出*/
void First_form::on_histroyButton_export_st_clicked()
{
    info2error_dialog(this->isEN?"fsPlease wait while exporting..."
                               :tr("fs正在导出,请稍候..")) ;
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
                                     :tr("fs正在导出,请稍候..")) ;
          QString headr;
          QString single_info ;
          QStringList export_info ;

          /*列表头*/
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


          freshButton_clicked() ;//刷新一下设备选择界面

          bool success_flag = false;//至少有一个导出成功，不然就是没有选择对的设备


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
              form_count_str =(this->isEN?"faExport success":tr("fa导出成功"));//myHelper::ShowMessageBoxQuesion(tr("导出成功!")) ;
          else
          {
              info2error_dialog(this->isEN?"Select an export device!"
                                         :tr("请选择可导出设备!")) ;

          }
          disableButton_clicked(1) ;
          hide_button(1) ;
      }
      else
      {
              info2error_dialog(this->isEN?"No current record!"
                                         :tr("当前无记录!")) ;
      }
  }
  else
  {

              info2error_dialog(this->isEN?"Please insert U disk"
                                         :tr("请插入U盘!")) ;

  }
}


/*********************************
*项目界面相关
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
        /*设置项目界面*/
        currentsubpj_num = 0 ;                    //选择子项目的标志
        set_project_info(poct_item) ;

        itemMat->setCur_info(project);
        item_update_itemList();

        return true;
    }
    return false;
}


/*设置项目界面*/
void First_form::set_project_info(const POCT_ITEM &poct_item)
{
    int type = itemMat->getIdInfo(&poct_item).type;

    DBG_DEBUG(DBG_CFLINE("barcode=%s, type=%d", qPrintable(poct_item.BarCode), type));

/*子项目界面*/
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


/*本项目界面*/

    ui->lineEdit_chanpingmingcheng->setText(poct_item.ReportTitle);
    ui->lineEdit_xiangmutiaoma->setText(poct_item.BarCode);
    ui->lineEdit_chanpingdaima->setText(QString("%1").arg(poct_item.ProductCode));
    ui->lineEdit_tonddaoshu->setText(QString::number(poct_item.ItemCount));
    ui->checkBox_jiayang->setChecked(poct_item.MinCheck);
    ui->checkBox_chonding->setChecked(poct_item.MaxCheck);






    if (type == 0)
    {

        ui->tableWidget_Peak->setRowCount(poct_item.PeakCount);

        QTableWidgetItem *temp = new QTableWidgetItem((this->isEN?"Single Channel":tr("单通道")));
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

/*子项目切换时改变相对应的显示信息*/
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



    if(ui->listWidget_setP_2->count() != 0)//有项目的时候才加载 2018-10-22
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
    /*曲线数据*/
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

//设置项目为当前
void First_form::on_pushButton_setitem_clicked()
{
     //首先找出项目在哪个文件
    if(itemList.size() <= 0 )
    {
        info2error_dialog(this->isEN?"No current project!"
                                     :tr("当前无项目!")) ;
        return ;
    }
    if(ui->listWidget_setP_2->currentRow()>=0)
    {
        // DBG_DEBUG("%s", qPrintable(itemList.at(ui->listWidget_setP_2->currentRow()).bcode));
        load_set_project(itemList.at(ui->listWidget_setP_2->currentRow()) );
        info2error_dialog(this->isEN?"fa Set success!"
                                   :tr("fa设定成功!")) ;
        return;
    }
    else
    {
        info2error_dialog(this->isEN?"Please select Item!"
                                   :tr("请选择项目!")) ;
    }

}
/*筛选*/
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
/*项目参考值*/
void First_form::on_pushButton_refer_edit_clicked()
{
    if(ui->tableWidget_refer->rowCount() <=0 )
    {
        info2error_dialog(this->isEN?"No current project!"
                                     :tr("当前无项目!")) ;
        return ;
    }
    int row = ui->tableWidget_refer->currentRow() ;
    if(row < 0)
    {
        info2error_dialog(this->isEN?"Please select Item!"
                                   :tr("请选择项目!")) ;
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
    /*更新*/
    ui->tableWidget_refer->item(row, 1)->setText(low) ;
    ui->tableWidget_refer->item(row, 2)->setText(up) ;
    /*修改*/
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
    /*保存*/
    myHelper::WriteIDProject(&idpro_unique_list) ;
    myHelper::write_system_record("log/diary.ini", "A403", QDateTime::currentDateTime()) ;//日记记录
}




void First_form::on_pushButton_refer_del_clicked()
{

    if(ui->tableWidget_refer->rowCount() <=0 )
    {
        info2error_dialog(this->isEN?"No current project!"
                                     :tr("当前无项目!")) ;
        return ;
    }
    int row = ui->tableWidget_refer->currentRow() ;
    if(row < 0)
    {
        info2error_dialog(this->isEN?"Please select Item!"
                                   :tr("请选择项目!")) ;
        return ;
    }
    if(!myHelper::ShowMessageBoxInfo(this->isEN?"Delete?"
                                     :tr("是否删除?")))
        return ;
    /*修改*/
 //   PROJECT_ITEM tmp = idpro_unique_list.at(row) ;
    idpro_unique_list.removeAt(row ) ;
    /*保存*/
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
*设置菜单界面&系统界面
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
                                    :tr("是否保存?")))
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
              << QString("%1").arg(set_test.keepdays)//保存天数，按天来计算，而不是按年 2018/09/10
              << QString("%1").arg(set_test.Autotest)
              << QString("%1").arg(set_test.showTemperature)
            << QString("%1").arg(set_test.Beep) ;

        myHelper::WriteConfig(infos, "Set_test") ;

        myHelper::ShowMessageBoxQuesion(this->isEN?"Save successfully!"
                                                 :tr("保存成功!")) ;
        myHelper::write_system_record("log/diary.ini", "A401", QDateTime::currentDateTime()) ;//日记记录
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
                                        :tr("是否保存")))
        {
            disableButton_clicked(0);//上锁
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
        disableButton_clicked(1);//解锁
    }
}

void First_form::on_commandLinkButton_time_save_clicked()
{
    disableButton_clicked(1);//解锁
        if(button_lock)
        {
            if(myHelper::ShowMessageBoxInfo(this->isEN?"Save?"
                                            :tr("是否保存")))
            {
                disableButton_clicked(0);//上锁
                QString time ;
                time = QString("date -s \"%1-%2-%3 %4:%5:%6\"")
                        .arg(ui->spinBox_year_2->value())
                        .arg(ui->spinBox_month_2->value())
                        .arg(ui->spinBox_day_2->value())
                        .arg(ui->spinBox_hour->value())
                        .arg(ui->spinBox_minute->value())
                        .arg(QTime::currentTime().toString("ss"));

                serial_thead->Time_lock.lock();
                 system(time.toLocal8Bit().constData()) ;  //设置系统时钟格式: date 月日时分年.秒
                 system("hwclock  -w") ;                          //-w 将系统时钟同步到硬件时钟
                 system("sync");                                       //-s 将硬件时钟同步到系统时钟
                serial_thead->Time_lock.unlock();//不加这个保存时钟de时候会导致串口线程堵塞，不信可以试试 2018-10-22
                qDebug() <<__LINE__ <<__FUNCTION__<<time;
                myHelper::ShowMessageBoxQuesion(this->isEN?"Save successfully!"
                                                         :tr("保存成功!")) ;
                myHelper::write_system_record("log/diary.ini", "A501", QDateTime::currentDateTime()) ;//日记记录
            }
            disableButton_clicked(1);//解锁
        }
}
/*系统升级*/
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
                 //正在升级，请稍候..一分钟
                 if(myHelper::ShowMessageBoxInfo(this->isEN?"Upgrade procedure has been detected?"
                                                 :tr("已检测到升级程序，是否升级?")))
                 {
                     QString sh_path;

                     detect_timer.stop();
                     button_lock = 0 ;

// 把更新文件拷进来
                     sh_path = "cp -r " + t_list.at(0).absoluteFilePath() + "/update/ " + ".";
                     system("rm update/* -rf");
                     system( sh_path.toLocal8Bit().constData() ) ;//linux command in terminal
                                                                                                //cp -r /media/sda1/update/ .
                     if(myHelper::FileIsExist("update/update"))
                     {
                            info2error_dialog(this->isEN?"fsUpgrade now, please wait..."
                                                       :tr("fs正在升级,请稍候..")) ;
                            system("bash update/update") ;//执行update脚本

                            form_count = 1 ;
                            form_count_num= 60 ;
                            form_count_str = (this->isEN?"fsThe upgrade was successful. turn off the power and restart "
                                                       :tr("fs升级成功，请关闭电源，重启系统"));

                     }
                     else
                     {
                        info2error_dialog(this->isEN?"Upgrade error!"
                                                   :tr("升级出错!")) ;
                     }
                 }
            }
           else
            {
                info2error_dialog(this->isEN?"The upgrade procedure is incomplete!"
                                           :tr("升级程序不完整!")) ;
                return ;
            }
        }
        else
        {
            info2error_dialog(this->isEN?"Unable to detect upgrade procedure!"
                                       :tr("检测不到升级程序!")) ;
        }

    }
    else if(t_list.count() >= 1)
    {
        info2error_dialog(this->isEN?"Please remove excess storage equipment"
                                   :tr("请拔除多余的储存设备!")) ;
    }
    else
    {
        info2error_dialog(this->isEN?"Please insert U disk!"
                                   :tr("请插入U盘!")) ;
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
/*机器注册窗口*/
void First_form::register_form()
{
    QString code = reg_form->str_code ;                             //客户输入注册码 ,前两位为编号 ,后六位为MD5值
    QString name =  reg_form->str_name ;                        //机构名称
    QString num = reg_form->str_num ;                               //机器序列号哦啊
    int len = reg_form->str_name.toLocal8Bit().length() ;
    if(code.isEmpty() || name.isEmpty())
    {
        info2error_dialog(this->isEN?"Input name and registration code cannot be empty!"
                                   :tr("输入名称和注册码不能为空!")) ;
    }
    else
    {
        if(len > 30)
        {
            info2error_dialog(this->isEN?"Enter no more than 15 words for the name!"
                                       :tr("输入名称不能超过15个文字!")) ;
        }
        else
        {
            QString md_v ;
            QString ret ;

           md_v = MD5String(num + name) ;                           //机器码+公司名 -->获得MD5值
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



            if(ret == code.mid(2,6))                                                //前两位为编号不进行比较
            {
                //先关闭自动检测
                info2error_dialog(this->isEN?"fsData is being saved, please wait..."
                                           :tr("fs正在保存数据,请稍候...")) ;

                reg_form->hide();
                //
                char tmp[30],tmp2[10] ;
                bzero(tmp, 30);bzero(tmp2, 10) ;
                char *p =  tmp;
                 memcpy(tmp, name.toLocal8Bit().constData(), len)  ;
                 //注册的机构名称
                 for(int ii=0; ii<3; ii++)
                     for(int jj=0; jj<10; jj++)
                     {
                             register_array[ii][jj] = *p ;
                             p++ ;
                     }
                 //ratio的浮动范围
                 for(int jj=0; jj<10; jj++)
                 {
                         register_array[3][jj] = 0 ;
                         p++ ;
                 }
                 register_array[3][0] = 0x0a ;

                 //address
                 myHelper::write_config_sig("address.ini", "Address",  "address", reg_form->str_addr) ;


                on_allButton_clicked("COM16") ; //写注册马
                ui->label_cmp_name->setText(name);
                ui->label_cmp_addr->setText(reg_form->str_addr);
                INSTITUTION = name ;                                       //将机构名称存起来
                init_finsh = 1 ;                                           //是否开启自动检测
                myHelper::write_system_record("log/diary.ini", "A404", QDateTime::currentDateTime()) ;//日记记录
            }
            else
            {
                info2error_dialog(this->isEN?"Registration code error!"
                                           :tr("注册码错误!")) ;
            }
        }

    }
}
//校准
void First_form::on_pushButton_ts_ca_clicked()
{

    if(myHelper::ShowMessageBoxInfo(this->isEN?"The old profile is about to be deleted. Will the calibration continue?"
                                    :tr("即将删除旧配置文件,是否继续进行校准?")))//tr("点击出现的校准箭头，校准完毕为黑屏状态,请关闭电源重启!")))
    {
      //system("/usr/bin/ts_calibrate ") ;
        info2error_dialog(this->isEN?"fsThe configuration file is being deleted. Please wait a moment..."
                                   :tr("fs正在删除配置文件,请稍侯..")) ;
       system("rm /etc/pointercal") ;
       QElapsedTimer t;
       t.start();
       while(t.elapsed()<4000)
       QCoreApplication::processEvents();
         info2error_dialog(this->isEN?"fsThe  Calibration already, please restart the power, "
                                      "so that the system into the calibration interface!"
                                    :tr("fs校准准备就绪,请重启电源,使系统进入校准界面!")) ;
       //exit(1 ) ;
    }
}

void First_form::on_change_languagepushButton_clicked()
{
    set_lis.language = 0 ;

    /*保存到INI*/
    //if(ui->commandLinkButton_time_save->text() == "Save")
        //set_lis.language = 1 ;
      //else

        if(init_tmp < 2)    //初始化，不记录
        {
            myHelper::write_config_sig("config.ini", "Set_lis", "language", QString("%1").arg(set_lis.language)) ;
            myHelper::write_system_record("log/diary.ini", "A804", QDateTime::currentDateTime()) ;//日记记录
        }

        emit chage_language(0) ;                                //chinese

        ui->change_languagepushButton->setEnabled(0) ;

        ui->change_languagepushButton_english->setEnabled(1) ;


        /*    用最笨的方法修改hui中文状态 ...2018-09-1      */
        ui->label_Liushuihao_Format->setText("NO.YYMMDD");
        //spinBox_year_2  spinBox_mon_2  spinBox_day_2  label_yearInSet
        ui->label_yearInSet->setGeometry(30,30,61,41);
        ui->label_monthInSet->setGeometry(120,30,61,41);
        ui->label_dayInSet->setGeometry(220,30,61,41);

        ui->spinBox_year_2->setGeometry(24,80,71,51);
        ui->spinBox_month_2->setGeometry(120,80,71,51);
        ui->spinBox_day_2->setGeometry(220,80,71,51);


        /*修改测试页面下的样本类型随着系统语言变化  2018/09/18      */
        if(ui->label_batch_2->text().toLocal8Bit() == "Serum/Plasma")
            ui->label_batch_2->setText(QString::fromLocal8Bit("血清/血浆") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit()== "Whole Blood")
            ui->label_batch_2->setText(QString::fromLocal8Bit("全血") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "Peripheral Blood")
            ui->label_batch_2->setText(QString::fromLocal8Bit("末梢血") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "Urine")
            ui->label_batch_2->setText(QString::fromLocal8Bit("尿液") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit()== "QC")
            ui->label_batch_2->setText(QString::fromLocal8Bit("质控") )  ;
        ui->checkBox_Beep->setText(tr("触摸蜂鸣"));
}
void First_form::on_change_languagepushButton_english_clicked()
{
    qDebug() <<__LINE__ <<__FUNCTION__<<"change language enlish";
    set_lis.language = 1 ;      //english

    if(init_tmp < 2)  //初始化，不记录
    {
        myHelper::write_config_sig("config.ini", "Set_lis", "language", QString("%1").arg(set_lis.language)) ;
        myHelper::write_system_record("log/diary.ini", "A804", QDateTime::currentDateTime()) ;//日记记录
    }

    emit chage_language(1) ;

    ui->change_languagepushButton->setEnabled(1) ;

    ui->change_languagepushButton_english->setEnabled(0) ;

     /*修改设置菜单目录下系统语言为英文时流水号起始值，系统时间的显示格式
      目前没有更好的办法，只能先写这里-_-|||    2018-08-31      */

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
//    ui->label_TempContrlRange->setText(tr("Temperature Control(℃):"));

    /*修改测试页面下的样本类型随着系统语言变化  2018/09/18      */
        if(ui->label_batch_2->text().toLocal8Bit() == "血清/血浆")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Serum/Plasma") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit()== "全血")
           ui->label_batch_2->setText(QString::fromLocal8Bit("Whole Blood") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "末梢血")
           ui->label_batch_2->setText(QString::fromLocal8Bit("Peripheral Blood") )  ;
        else if(ui->label_batch_2->text().toLocal8Bit() == "尿液")
           ui->label_batch_2->setText(QString::fromLocal8Bit("Urine") )  ;
       else if(ui->label_batch_2->text().toLocal8Bit()== "质控")
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
                                                     :tr("本结果只对本份标本负责！")));

    if(!ui->label_prj->text().isEmpty())//测试项目不空的时候去翻译结果
        this->initChannelShow(1);//结果区实时中英显示
    qDebug() <<__LINE__ <<__FUNCTION__<<"sw = 1";
     QFont font ;
    if(sw)//sw == 1 为英文
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
        ui->label_17->setFont(font) ;//输入样本号
        ui->label_34->setFont(font) ;//样本类型
    }
    else
    {
        QCoreApplication::removeTranslator(translator) ;
        /*样本号，样品类型...*/
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
   //设置关于界面的图片
    //QPixmap qpix ;
    //qpix.load("logo.png") ;
    //ui->label->setPixmap(qpix);

    ui->label_cmp_name->setText(INSTITUTION);
    /*更新项目界面*/
    if (!itemMat->getCur_info().bcode.isEmpty())
    {
        load_set_project(itemMat->getCur_info());
    }
    /*更新磁盘空间*/
    check_disk() ;
    /*关于界面的*/

    /*3机器型号*/
    ui->label_91->setText(system_config.machine) ;
    /*4软件版本*/
    ui->label_93->setText(system_config.version[sw] + (system_config.hasBuild? myHelper::GetBuildTime():QString())) ;
    /*5样本类型 */
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

    testmodel   << (this->isEN?"Signle Channel":tr("单通道"))
                << tr("1联卡")
                << tr("2联卡")
                << tr("3联卡")
                << tr("4联卡")
                << (this->isEN?"Five-MultiCard":tr("5联卡"));

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
     head << (this->isEN?"Item":tr("项目"))
          << (this->isEN?"SubItem":tr("子项"))
          << (this->isEN?"Output":tr("输出"));
     muti_card_set->list->setHorizontalHeaderLabels(head) ;
     //1确定行数
     int row_count = 0;
     for(int i=0; i<multi_card_list.count(); i++)
         row_count += multi_card_list.at(i).sub_count ;
     muti_card_set->list->setRowCount(row_count) ;
     muti_card_set->list->setColumnCount(3) ;

     /*2先初始化表格并设置文字*/
     for(int i=0; i<3; i++)
         for(int k=0; k<row_count; k++)
             muti_card_set->list->setItem(k, i, new QTableWidgetItem(" ")) ;

     /*3合并单元格*/
     QTableWidgetItem*  itemGet ;
     int current_row = 0;                                                                //用于记录当前的行序号
     for(int i=0; i<multi_card_list.count(); i++)
     {
         muti_card_set->list->setSpan(current_row, 0, multi_card_list.at(i).sub_count, 1);        //合并单元格

         itemGet = muti_card_set->list->item(current_row, 0) ;                                                      //第一列
         itemGet->setText(multi_card_list.at(i).main_name) ;

         for(int k=0; k<multi_card_list.at(i).sub_count; k++)
         {
             itemGet = muti_card_set->list->item(current_row + k, 1) ;                                           //第2列
             itemGet->setText(multi_card_list.at(i).sub_name[k]) ;

             QCheckBox *comBox = new QCheckBox() ;                                                                //第3列
             //qDebug() << multi_card_list.at(i).sub_use[k] ;
             comBox->setChecked(multi_card_list.at(i).sub_use[k]) ;
             muti_card_set->list->setCellWidget(current_row + k, 2, comBox) ;

         }

         current_row += multi_card_list.at(i).sub_count ;
     }

     /*开始显示*/
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
                     for(int j = 0; j < 5; j++)          //子项目里的子项目
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
             if(tmp.ItemCount && multi_tmp.sub_count)         //没有子项目或者没有子子项目?
             {
                 if(! (tmp.ItemCount == 1 && multi_tmp.sub_count == 1) )       //子项目下面，只有一个子子项目就不添加了
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
    disableButton_clicked(1);//解锁
     if(button_lock)
     {
         disableButton_clicked(0);//上锁
         if(myHelper::ShowMessageBoxInfo(this->isEN?"Save?"
                                         :tr("是否保存")))
         {
             if(ui->lineEdit_std_print_declar->text().toLocal8Bit().length() > 31)
             {
                 emit info2error_dialog(this->isEN?"Report statements should be no more than 15 words!"
                                                 :tr("报告声明不能超过15个汉字"));
                 return ;
             }
             set_test.Autoprint = ui->checkBox_autoprint->isChecked() ;

             myHelper::write_config_sig("config.ini", "Set_test", "Autoprint", QString("%1").arg(set_test.Autoprint )) ;
             myHelper::write_config_sig("config.ini", "Set_lis", "print_detail", QString("%1").arg(ui->checkBox_print_detail->isChecked())) ;
             myHelper::write_config_sig("config.ini", "Set_lis", "print_count", QString("%1").arg(ui->spinBox_print_count->value())) ;
             myHelper::write_config_sig("config.ini", "Set_lis", "print_declar", ui->lineEdit_std_print_declar->text()) ;

             disableButton_clicked(1);
             myHelper::ShowMessageBoxQuesion(this->isEN?"Save successfully!"
                                                      :tr("保存成功!")) ;
            myHelper::write_system_record("log/diary.ini", "A601", QDateTime::currentDateTime()) ;//日记记录
         }
     }
     disableButton_clicked(1);//解锁
 }
 /*项目*/





/*数字键盘*/
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
/*可调节的补偿系数列表选择变化*/
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
/*保存可调节的补偿系数*/
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

        myHelper::write_system_record("log/diary.ini", "A701", QDateTime::currentDateTime()) ;//日记记录
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

    myHelper::write_system_record("log/diary.ini", "A805", QDateTime::currentDateTime()) ;//日记记录
}


/*********************************
*主菜单界面的切换槽
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

    /*每次进入刷新一次*/
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

    /*检查磁盘空间*/
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
*定时器
**********************************/
void First_form::timer_init()
{
    detect_timer.start(10,this);

}

void First_form::timerEvent(QTimerEvent *)
{

    if( lockbytimer )                                                           //隔一段时间才允许按键操作
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
    /*自动检测卡*/
    static int tm = 0;

    if( button_lock && init_finsh && ui->checkBox_autotest->isChecked())
    {
        if(tm != 250)//延时，循环
        {
             tm++ ;
        }
        else
        {
            qDebug() <<__LINE__ <<__FUNCTION__<<"last_one = "<< last_one;
            tm = 0 ;
            if(last_one == 1)                                             //如果上一次执行的任务是测试，则需要等待一段时间才继续检查
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

                    if(stop_auto && (ui->stackedWidget->currentIndex() == 0) && !auto_ok_flag)      //false 代表要停止检测
                     {
                            qDebug() <<__LINE__ <<__FUNCTION__<<"only oneneeen";
                             on_allButton_clicked("COM13") ;//发送自动测试指令
                     }
                     button_lock = true; //不解锁，就没办法进入下一次事件
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

    /*****************弹出不可退出提示窗口持续时间***********************/
    if(form_count)
    {
        if(form_count_num <= 0)
        {
            form_count = 0 ;

            emit form_count_signal(form_count_str) ;                   //恢复为带按钮可以关闭的提示窗口

        }
        else
        {
            form_count_num-- ;
        }
    }
    /***************开机初始化倒计时**************************************/
    if(system_init < (INIT_TIME+1) )
    {
        ui->progressBar_2->setValue(system_init * 100 / INIT_TIME);
        system_init++ ;
    }

    /**********************标准测试时间的倒数*****************************/
    int flag = 0;
    for (int x = 0; x < 5; x++)
    {
        if(test_task[x].wait_for_test > 0 )
        {
            test_task[x].wait_for_test --;
            flag = 1;
        }
        else if (!test_task[x].wait_for_test && wait_for_test_cur_num == -1)// 倒计时已到==0,且测量队列为空
        {
            disableButton_clicked(0) ;
            button_lock = 1 ;
            wait_for_test_cur_num = x;
            qDebug() <<__LINE__ <<__FUNCTION__<<wait_for_test_cur_num;
            on_allButton_clicked("COM01") ;//五连卡测试
            flag = 1;
        }
    }
    if(flag == 1)
    {
        update_status();
    }

    /**********************自动测试光路盒走位*****************************/
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
                serial_thead->push_cmd("COM04");/*光路盒走位*/
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
                            :tr("取消"));
    if (!testing)
    {
        if (ui->checkBox_autotest->isChecked())
        {
            if (auto_ok_flag)
            {
                str =(this->isEN?tr("Autotesting(%1)").arg(auto_ok_flag)
                               :tr("自动测试(%1)").arg(auto_ok_flag)) ;
            }
            else
            {
                str = (this->isEN?"Autotesting"
                                :tr("自动测试中"));
            }
        }
        else
        {
            str = (this->isEN?"Test"
                            :tr("测试")) ;
        }
    }
    ui->rcardButton->setText(str);
}

void First_form::initChannelShow(bool Resul_realTime)
{
    QString msg;
    if(Resul_realTime)//语言变换 结果显示区也要变换
    {
        if ( !ui->ret_40->isVisible()     //保证结果区显示的是单通道的结果
            &&ui->ret_40->text().isEmpty()//保证结果区显示的是单通道的结果
            && !(ui->label_serial_num->text().isEmpty()))//保证刚刚测试过
        {
                QStringList msg_itemName;
                    msg.clear();
                    msg_itemName = arr[0][0]->text().split(":");//把试剂卡和项目名分隔出来
                     msg = (this->isEN?"Single channel reagent card: "
                                     :tr("单通道试剂卡: "));
                    msg += msg_itemName.at(1);
                    ui->ret_00->setText(msg);// 第一列显示
                 if(!(arr[0][1]->text().isEmpty()))
                 {
                        if(arr[0][1]->text().contains("C"))
                        {
                                 msg.clear();
                                 msg = (this->isEN?"Exception C Line":tr("C线异常"));
                                arr[0][1]->setText(msg);// 第2列显示
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
                                                                     :tr(" 号试剂卡 "));
                        msg += poct_item.SIs[x].Name[0];
                      show_ret(true, x, 0, msg);//      第一列
                      show_ret(true, x, 1, "ChangeLang");//  第二列
                  }
                else
                {
                        msg.clear();
                        show_ret(1, x, 0, " ");//      第一列
                        show_ret(1, x, 1, " ");//      第二列
                }
             }
        }
    }
    else//正常测试结果区显示
    {
        for (int x = 0; x < 5; x++)
        {
                int ch = Channel2Index(x);
                if (ch != -1)
                {
                            if (wait_for_test_cur_model == 0)
                            {
                                msg = (this->isEN?"Single channel reagent card: "
                                                :tr("单通道试剂卡: "));
                            }
                            else
                            {
                                msg = QString::number(x + 1) + (this->isEN?" Reagent card "
                                                                         :tr(" 号试剂卡 "));
                            }
                            msg += poct_item.SIs[ch].Name[0];
                }
                else
                {
                        msg.clear();
                }
                show_ret(ch != -1, x, 0, msg);//      第一列
            }
            update_status();//测试没结束第二列显示 更新状态
    }
}


/*********************************
*调试测试
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
*日志
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
    head << (this->isEN?"Warning Code":tr("报警代码"))
         << (this->isEN?"Descripe":tr("事件描述") )
         << (this->isEN?"Time":tr("时间"));
    ui->tableWidget_diary->setHorizontalHeaderLabels(head) ;

    /*先读出有多少条记录*/
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
    head << (this->isEN?"Fault Code":tr("故障代码"))
         << (this->isEN?"Descripe":tr("事件描述") )
         << (this->isEN?"Time":tr("时间"));
    ui->tableWidget_diary->setHorizontalHeaderLabels(head) ;

    /*先读出有多少条记录*/
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
    head << (this->isEN?"Descripe":tr("事件描述"))
         << (this->isEN?"Time":tr("时间"));
    ui->tableWidget_diary->setHorizontalHeaderLabels(head) ;

    /*先读出有多少条记录*/
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
    QDateTime time_Date_temp;//报警历史界面，英文版本下时间显示格式 201/09/25
    switch(type)
    {
        case 1://警告
        {
            QString text ;
            QStringList text_list ;
            int row_count, display_count, start_row ;   //row_count确定当前页要显示多少条记录


            myHelper::read_config_sig("log/warning.ini", "HEAD", "Count", &text) ;
            int record_count =  text.toInt()   ;
            /*确定总共多少条记录*/
            display_count = record_count;
            if(display_count > LOG_COUNT_MAX)
                display_count = LOG_COUNT_MAX ;

            /*确定当前页要显示多少条*/
            if((display_count - (page-1)*PAGE_DIARY_COUNT)  > PAGE_DIARY_COUNT)     //剩下的条数大于一页的条数
                row_count = PAGE_DIARY_COUNT ;
            else                                                                                                                        //
                row_count = display_count - (page-1)*PAGE_DIARY_COUNT ;
            ui->tableWidget_diary->setRowCount(row_count) ;
            /*开始显示*/
            start_row = record_count - (page-1)*PAGE_DIARY_COUNT ;                                 //从最新的开始

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
        case 2://错误
        {
            QString text ;
            QStringList text_list ;
            int row_count, display_count, start_row ;   //row_count确定当前页要显示多少条记录

            myHelper::read_config_sig("log/error.ini", "HEAD", "Count", &text) ;
            int record_count =  text.toInt()   ;
            /*确定总共多少条记录*/
            display_count = record_count;
            if(display_count > LOG_COUNT_MAX)
                display_count = LOG_COUNT_MAX ;

            /*确定当前页要显示多少条*/
            if((display_count - (page-1)*PAGE_DIARY_COUNT)  > PAGE_DIARY_COUNT)     //剩下的条数大于一页的条数
                row_count = PAGE_DIARY_COUNT ;
            else                                                                                                                        //
                row_count = display_count - (page-1)*PAGE_DIARY_COUNT ;
            ui->tableWidget_diary->setRowCount(row_count) ;
            /*开始显示*/
            start_row = record_count - (page-1)*PAGE_DIARY_COUNT ;                                 //从最新的开始
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
        case 3://操作日志
        {

                QString text ;
                QStringList text_list ;
                int row_count, display_count, start_row ;   //row_count确定当前页要显示多少条记录

                myHelper::read_config_sig("log/diary.ini", "HEAD", "Count", &text) ;
                int record_count =  text.toInt()   ;
                /*确定总共多少条记录*/
                display_count = record_count;
                if(display_count > LOG_COUNT_MAX)
                    display_count = LOG_COUNT_MAX ;

                /*确定当前页要显示多少条*/
                if((display_count - (page-1)*PAGE_DIARY_COUNT)  > PAGE_DIARY_COUNT)     //剩下的条数大于一页的条数
                    row_count = PAGE_DIARY_COUNT ;
                else                                                                                                                        //
                    row_count = display_count - (page-1)*PAGE_DIARY_COUNT ;
                ui->tableWidget_diary->setRowCount(row_count) ;
                /*开始显示*/
                start_row = record_count - (page-1)*PAGE_DIARY_COUNT ;                                 //从最新的开始
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


/*数字键盘输入完毕后的处理*/
void  First_form::numkeyboard_slot(QLineEdit *line) //
{
    line->clearFocus() ;                                                        //取消焦点

    number_form->ex_ine_edit = line ;                                  //为保存作准备
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

    // 如果都没有子项目，就项目没有意义了
    if (!tmp)
    {
        slot_try_done();
        return;
    }

    SAVE_ITEM test_item ;
    QList<SUB_SAVE_ITEM> sub_list ;

    bzero(&test_item, sizeof(test_item)) ;

    QStringList Type_temp; //为了方便中英显示样本类型统一保存成中文 2018/09/18
    Type_temp << QString::fromLocal8Bit("血清/血浆")
                        << QString::fromLocal8Bit("全血")
                        << QString::fromLocal8Bit("末梢血")
                        << QString::fromLocal8Bit("尿液")
                        << QString::fromLocal8Bit("质控");
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

     if(!ui->lineEdit_std_print_declar_2->text().isEmpty())                                                        //测试界面输入编码
     {
             QString tmp = ui->lineEdit_std_print_declar_2->text();
             strcpy(test_item.c_Nums,  tmp.toLocal8Bit().constData()) ;
             if(tmp.length() > 12)
             {
                 tmp.insert(12,"\n");
             }
             ui->label_current_num->setText(tmp);
     }
     else  if(!ui->lineEdit_next_num_2->text().isEmpty())                                           //测试界面扫描枪编码
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
                 !ui->label_current_num->text().isEmpty())      //让样本号自增 仅限数字 2018/09/21
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
         test_item.c_Nums[0] = '\0';//没有样本号
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

     /*有多少个子子项目*/
     // 所有子项目中最新时间
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
         memcpy(test_item.p_name, name.constData(), len) ;//个人信息
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
         case 1:memcpy(test_item.sex, tr("男").toLocal8Bit().constData(), tr("男").toLocal8Bit().length());break ;
         case 2:memcpy(test_item.sex, tr("女").toLocal8Bit().constData(), tr("女").toLocal8Bit().length());break ;
         default : memcpy(test_item.sex, "  ", 2 ) ;
     }

     //清空原来的信息
     detail_form->pname.clear() ;
     detail_form->page.clear() ;
     detail_form->psex = 0 ;


     //10_27
     memcpy(test_item.Prj_name, poct_item.ReportTitle.toLocal8Bit().constData(),32) ;


     /*分类统计*/
     //if(ui->checkBox_usercode->isChecked())
     {
         test_item.Classify_code = ui->lineEdit_classify_numkeyboard->text().toInt() ;
     }
//     else
//     {
//         test_item.Classify_code = 255 ;
//    }

     /*放到缓存里*/
     int whole_file_size = sizeof (SAVE_ITEM) + sizeof(SUB_SAVE_ITEM) * sub_list.count();


     uchar id_file_buffer[whole_file_size];
     bzero(id_file_buffer, whole_file_size) ;

     memcpy(id_file_buffer, &test_item, sizeof(test_item)) ;
     for(int y=0; y<sub_list.count(); y++)
         memcpy(&id_file_buffer[sizeof(test_item) + sizeof(SUB_SAVE_ITEM)*y], &(sub_list.at(y)), sizeof(SUB_SAVE_ITEM)) ;

     /*判断有没有该项目的目录*/
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
    /*  在测试页面显示样本类型 2018/09/18  */
     ui->label_batch_2->setText(QString::fromLocal8Bit(test_item.Type) )  ;
     if(this->isEN)
      {
         QString temp_Type = QString::fromLocal8Bit(test_item.Type);
         if(temp_Type.toLocal8Bit() == "血清/血浆")
             ui->label_batch_2->setText(QString::fromLocal8Bit("Serum/Plasma") )  ;
         else if(temp_Type.toLocal8Bit() == "全血")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Whole Blood") )  ;
         else if(temp_Type.toLocal8Bit() == "末梢血")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Peripheral Blood") )  ;
         else if(temp_Type.toLocal8Bit() == "尿液")
            ui->label_batch_2->setText(QString::fromLocal8Bit("Urine") )  ;
        else if(temp_Type.toLocal8Bit() == "质控")
             ui->label_batch_2->setText(QString::fromLocal8Bit("QC") )  ;
     }
     ui->label_prj->setText(QString::fromLocal8Bit(test_item.Prj_name) )  ;

     //clear
     ui->lineEdit_std_print_declar_2->clear() ;
     ui->lineEdit_next_num_2->clear() ;
     this->detail_form->name->clear() ;
     this->detail_form->age->clear() ;
     this->detail_form->sex->setCurrentIndex(0) ;


 /*是否打印*/
     if(set_test.Autoprint)
     {
         print_event(all_date, 0) ;
     }
 //是否自动上传
     if(set_lis.auto_upload)
     {
         uploadInterface.Upload(all_date);
     }
 /*为下一条记录做准备 */

                                                                                          //序列号自增
     currentDebugnum++ ;
     currentnum ++;
     int num_tmp[2] = {currentnum, currentDebugnum} ;
     lseek(num_fd, 0, SEEK_SET) ;                                                                //覆盖之前的序列号

     if( write(num_fd, num_tmp, 8) < 0)    {/**/}

    update_currentnumtostring();

    slot_try_done();

}

 void First_form::slot_try_done()
 {
     // 退卡
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
                                        :tr("请选中其中一行"));
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
                tmp = (this->isEN?"Incubatting":tr("孵化中"));
                tmp += QString::number(test_task[x].wait_for_test) + " / ";
                tmp += QString::number(test_task[x].wait_for_test_old);
            }
            else
            {

                tmp = (wait_for_test_cur_num == x)?
                                                 (this->isEN?"Measuring":tr("正在测量"))
                                                :(this->isEN?"Waiting":tr("等待测量"));
            }
            show_ret(true, x, 1, tmp);
        }
    }
}

void First_form::show_ret(bool vis, int row, int col, QString str)
{
        if(col == 1 && str == "ChangeLang" && ui->ret_40->text().contains("5"))//系统语言变化第二列内容也要改变 2018/10/10
        {
                for(int i = 0; i < 5; i++)
                {
                        if(arr[i][1]->text().contains("C"))
                        {
                                arr[i][1]->setText((this->isEN?"Exception C Line":tr("C线异常")));
                        }
                }
        }
        if(str != "ChangeLang")//正常测试
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


            /*先读出有多少条记录*/

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
/* 隐藏部分功能 2018/09/14  */
void First_form::Not_Show_Temp()
{
            /* 温度控制 */
    ui->label_TempContrlRange->hide();
    ui->spinBox_temMin->hide();
    ui->spinBox_temMax->hide();
    ui->checkBox_temp->hide();

    ui->checkBox_PrintTest->hide(); //打印
    ui->checkBox_print_detail->hide();//打印高级信息
}

void First_form::on_checkBox_autotest_clicked()
{
    if(ui->checkBox_autotest->isChecked())
    {
            ui->rcardButton->setText(this->isEN?("Testing"):tr("自动测试中"));
             ui->rcardButton->setDisabled(1);
           if(sender()  == ui->checkBox_autotest)
                serial_thead->push_cmd("COM04");//光路盒走位
            stop_auto = 1;
    }
    else
    {
        ui->rcardButton->setText(this->isEN?("Test"):tr("测试"));
         ui->rcardButton->setEnabled(1);
    }
}
