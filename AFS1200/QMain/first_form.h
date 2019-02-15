#ifndef FIRST_FORM_H
#define FIRST_FORM_H

#include <QWidget>
#include <QPushButton>
#include <QTime>
#include <QBasicTimer>
#include <QDateTime>
#include <QDir>
#include <QListWidget>
#include <QTableWidgetItem>
#include <QLineEdit>
#include <QLabel>
#include <QProcess>
#include <QMouseEvent>
#include <QStyledItemDelegate>

#include "myserial.h"
#include "ID/uIDCardDef.h"
#include "password.h"
#include "app/register.h"
#include "app/prj_parameter.h"
#include "curve/showcurve.h"
#include "detail_from.h"
#include "history_edit.h"
#include "app/number_board.h"
#include "typewritting/syszuxim.h"
#include "typewritting/syszuxpinyin.h"
#include "app/select_date.h"
#include "his_prj_view_frm.h"
#include "app/mythread.h"
#include "funcset/itemmanager.h"
#include "app/multi_card_set.h"
#include "common/printer.h"
#include "common/uploadlis.h"
#include "common/personalinfo.h"
#include "app/errordialog.h"
#include "Beep/beep_dri.h"

namespace Ui {
class First_form;
}

class First_form : public QWidget
{
    Q_OBJECT

public:
    explicit First_form(QWidget *parent = 0);
    ~First_form();

     /************** UI类  *****************/
      Register *reg_form ;
      Prj_parameter *prj_form ;
      Showcurve *curve_form ;
      Detail_from *detail_form ;
      History_edit *history_edit_form ;
      Number_board *number_form ;
      Select_date *select_date ;
      Multi_card_set *muti_card_set ;
      ErrorDialog *errordialog;
      /*************************************/
      Mythread *serial_thead;//开启一个线程用于串口传输

      POCT_ITEM poct_item ;
      SET_TEST set_test ;
      SET_LIS  set_lis ;
      QList<RECORD_LIST> record_list ;
      QList<RECORD_LIST> primary_list ;
      QList<RECORD_LIST> debug_list ;
      //多联卡设置
      QList <MUTI_CARD> multi_card_list ;
      QList <PROJECT_ITEM> idpro_unique_list ;
      QList <RATIO_ITEM> pro_ratio_list ;
      // id卡列表
      QList<ItemManager::ID_info> itemList;

      int num_fd ;//存放当前序列号的文件句柄

      bool stop_auto ;//用在第二次检测卡是真的存在之后，不进行继续检测，这时-->stop_auto = 0

      int last_one ;

      bool form_count ;
      int form_count_num ;
      QString form_count_str ;

      bool lockbytimer ;
      int lockbytimer_num ;
      QString INSTITUTION ; //机构名字-->客户的客户

      int init_tmp ; //12_01

      bool init_finsh ;

      struct {
          QList<SUB_SAVE_ITEM> subResult;
          int wait_for_test;
          int wait_for_test_old;
      } test_task[5];

      bool wait_sate ; // 为 0， 说明正在孵化时间，为1， 空闲时间

      float T_ratio_range ;

      unsigned int history_page ;
      unsigned int history_page_all ;
      unsigned int history_data_count ;

      unsigned int primary_page ;
      unsigned int primary_page_all ;
      unsigned int primary_data_count ;

      unsigned int debug_page ;
      unsigned int debug_page_all ;
      unsigned int debug_data_count ;
     his_prj_view_frm *his_prg_view;
     QLabel *arr[5][2];//结果区的2行5列label

/*********************************  UI控件槽函数  ***************************************/
 public slots:
     void readidcardButton();
     void change_language_slot(int sw) ;
     void comboBox_p2Value_2_currentIndexChanged(int index);
     void comboBox_p1Value_2_currentIndexChanged(int index);
     void on_lineEdit_classify_numkeyboard_textChanged(QString );
     void on_change_languagepushButton_english_clicked();
     void on_lastButton_log_clicked();
     void on_pagedownButton_log_clicked();
     void on_firstButton_log_clicked();
     void on_toolButton_jilu_riji_clicked();
     void on_toolButton_jilu_guzhang_clicked();
     void on_toolButton_jilu_baojing_clicked();
     void on_pageupButton_log_clicked();
     void on_toolButton_xitong_moshi_clicked();
     void on_toolButton_xitong_gongneng_clicked();
     void on_pushButton_xitong_yuyang_clicked();
     void on_pushButton_xitong_shuju_clicked();
     void on_pushButton_xitong_jiaozhun_clicked();
     void on_toolButton_main_p_buchang_clicked();
     void on_toolButton_main_p_quxian_clicked();
     void on_toolButton_main_p_zixiang_clicked();
     void on_toolButton_main_p_zhuxiang_clicked();
     void on_commandLinkButton_print_save_clicked();
     void on_btnp_menu_clicked();
     void on_btna_menu_clicked();
     void on_pushButton_multicard_clicked();
     void on_toolButton_sub_s_yonghu_clicked();
     void on_toolButton_sub_s_tongxi_clicked();
     void on_toolButton_sub_s_jichu_clicked();
     void on_histroyButton_export_st_clicked();
     void on_histroyButton_show_4_clicked();
     void on_histroyButton_show_3_clicked();
     void on_histroyButton_show_2_clicked();
     void on_histroyButton_show_clicked();
     void on_toolButton_sub_h_origin_clicked();
     void on_toolButton_sub_h_tongji_clicked();
     void on_toolButton_sub_h_rcord_clicked();
     void on_pushButton_default_clicked();
     void on_delallButton_clicked();
     void on_delsigButton_clicked();
     void on_btn_std_2_clicked();
     void on_btn_std_clicked();
     void on_comboBox_type_currentIndexChanged(int index);
     void on_checkBox_primary_all_clicked();
     void on_checkBox_history_all_clicked();
     void on_btnQ_menu_clicked();
     void on_pushButton_refer_del_clicked();
     void on_pushButton_refer_edit_clicked();
     void on_checkBox_switch_mode_clicked();
     void on_checkBox_usegun_clicked();
     void on_checkBox_history_12_clicked();
     void on_comboBox_prj_2_currentIndexChanged(int index) ;
     void on_comboBox_prj_currentIndexChanged(int index) ;
     void on_pushButton_setitem_clicked();
     void on_spinBox_curve_No_valueChanged(int );
     void on_pushButton_de_num_clicked();
     void on_pushButton_add_num_clicked();
     void on_pushButton_deleteitem_clicked();
     void on_main_Button_clicked();
     void on_lastButton_3_clicked();
     void on_firstButton_3_clicked();
     void on_pagedownButton_3_clicked();
     void on_pageupButton_3_clicked();
     void on_lastButton_2_clicked();
     void on_firstButton_2_clicked();
     void on_pagedownButton_2_clicked();
     void on_pageupButton_2_clicked();
     void on_checkBox_history_1_clicked();
     void on_editButton_clicked();
     void on_lastButton_clicked();
     void on_firstButton_clicked();
     void on_pageupButton_clicked();
     void on_pagedownButton_clicked();
     void on_detailButton_clicked();
     void on_change_languagepushButton_clicked();
     void on_showcurveButton_clicked();
     void on_exportButton_clicked();
    // void on_btnClose_slot() ;
     void on_startButton_clicked();
     void on_rcardButton_clicked();
     void restButton_clicked();
     void on_btnT_menu_clicked() ;
     void on_btnH_menu_clicked() ;
     void on_btnP_menu_clicked();
     void on_printButton_clicked();
     void on_btnS_menu_clicked();
     void on_uploadsingleButton_clicked();
     void on_uploadallButton_clicked();
     void on_printsingleButton_clicked();
     void on_printallButton_clicked();
     void on_commandLinkButton_setsave_clicked();
     void on_commandLinkButton_lis_clicked();
     void on_pushButton_baudnext_clicked();
     void on_commandLinkButton_time_save_clicked();
     void on_btnD_menu_clicked();
     void on_ex_primaryButton_clicked();
     void on_pushButton_update_clicked();
     void on_num1Button_clicked();
     void on_tableWidget_xishu_currentItemChanged(QTableWidgetItem *current, QTableWidgetItem *previous);
     void on_savexishuButton_clicked();
     void on_pushButton_register_clicked();
     void on_pushButton_ts_ca_clicked();
     void on_toolButton_main_p_setting_clicked();
     void on_his_prj_view_bt_clicked();
     void on_toolButton_jilu_del_pressed();
     void on_comboBox_test_model_currentIndexChanged(int index);
     void on_toolButton_pressed();
     void on_checkBox_autotest_clicked();
/*************************************************************************************************/
    int item_update() ;
    void freshButton_clicked();
    void radio_buttonClick() ;
    void time_out_solt() ;
    void get_datas_event(int sw, unsigned int arg);/*thread*/
    void correct_password_slot(int sw) ;
    void  correct_password_primary_slot(int correct_flag) ;
    void numkeyboard_slot(QLineEdit *line) ;  //QLineEdit *line
    void set_button_signal_slot() ;
    void date_select_slot() ;
    void save_multi_item_slot() ;
    void form_count_slot(QString tx) ;
    void register_form() ;
    void save_refer_edit() ;
private:
/*********************************  私有属性  ***************************************/
     Ui::First_form *ui;
     QString staydate ; //用于比较最新的日期，判断是否已到了第二天
     QString dirname ;  //当前存放记录的目录，以日期命名，如2015/10/10
     QString nextfilename ;//下一个要写入数据的文件名
     QString currentfilename ;//当前测试完后数据存放的文件名
     QString currentnumtostring ;//当前序列号格式化为用户所需
     QBasicTimer detect_timer;

     QTranslator *translator ;

     Printer thermalPrinter ;

     UploadLis uploadInterface;

     bool paper_isEmpty ;

     int currentnum ;   //存放当前序列号
     int currentDebugnum ;   //存放当前序列号
     int currentyear ;  //存放当前的年份
     int currentmon ;   //存放当前的月份
     int currentday ;   //存放当前的天数
     int currentsubpj_num ;//子项目的序号
     int currentidfile ;
     int print_done ;   //记录一次性好打印的文件数目
     //int print_current ;    //记录已经打印好多少文件数目
     //int uart_upload_done ;//记录一次性上传文件数目
     //int uart_upload_current ;//记录已经上传好多少文件数目
     bool button_lock ;

     bool USB_has[4];
     int isEN;//CN : 0    EN : 1 ##2018/09/03

     SYSTEM_CONFIG system_config ;  //系统配置
/*************************************************************************************************/
private:
     /*********************************  私有方法  ***************************************/
     /**************  更新历史查看窗口  ***********************/
    int update_history_ui(QString low, QString up) ;
    int update_primary_ui(QString low, QString up);
    int update_Debug_ui(QString low, QString up) ;
    int update_Classify_ui(QString low, QString up) ;
    /*****************************************************/
    int read_num(QString dirname) ;    //读取是否当前日期是否已经有序列号，若没有则自动初始化一个值
    int read_localfile(QString fpath, SAVE_ITEM* load_item , int *fd);//读取本地文件并转化为自定义的项目数据
    int read_localfile_sub(int fd, SUB_SAVE_ITEM *sub_item, int addr);
    int read_debugfile(QString fpath, SAVE_DEBUG_ITEM* load_item) ;
    int print_event(QString fpath, SAVE_ITEM* load_item);  //
    int upload_event(QString fpath); //
    bool upload_event_check(const char*pname, int row); //
    void prepare_upload_data( QString *buffer,  SAVE_ITEM *load_item, SUB_SAVE_ITEM sbu_item); //格式化好要上传的数据
    void history_tablewidget_init() ;
    void test_ui_init() ;
    void setting_init() ;
    void load_settingfile() ;
    bool load_set_project(const ItemManager::ID_info &project) ;
    int  history_form_init() ;
    void font_init() ;
    void ui_init() ;
    void update_currentnumtostring();
    void check_dog(uint cmp_code, uint area_code) ;
    void check_disk() ;
    void debug_ui_init() ;
    int initial_dir() ;    //初始化当前记录存放的目录
    void set_project_info(const POCT_ITEM &poct_item) ;

    //int print_title() ;
    //int print_org() ;
    void print_detect() ;

    void disableButton_clicked(bool flag) ;

    int save_data_as_file(const char* filename, uchar *save_item, int length) ;  //当测试完之后保存报告到本地
    void timer_init() ;
    void classify_record() ;

    void delay_100ms(int) ;

    void history_turnpage_event(int page) ;
    void _save_clicked(int page, char state[]) ;
    void save_clicked() ;
    void primary_turnpage_event(int page) ;
    void _save_clicked_primary(int page, char state[]) ;
    void save_clicked_primary() ;
    void debug_turnpage_event(int page) ;
    void time_turnpage_event(int page) ;
    void set_time_checkstate(int page) ;

    void hide_button(bool flag) ;

    void time_add_sample_event(unsigned char flag) ;
    void add_multi_card_item();

    void diary_turn_page(int page, int type) ;

    // 初始化孵化时间，如果time 0，使用成员全局当前项目参数指定
    int InitHatchTime(int time);

    int Channel2Index(int);
    void update_status();

     // 尝试去保存。
     // 当全部通道均检测完成时才实际保存数据
    void try_save();
    void on_allButton_clicked(const char com[]);

    void show_ret(bool vis, int row = 0, int col = 0, QString str = QString());

    void Not_Show_Temp();//2018/09/14

    int get_cvalue() ;
    void show_conc(float cv_value, char c_value[12], const POCT_SUBITEM *subobj, int sub, unsigned char dec) ;

     // 成功一次测试作业，保存的目录在path处
    void slot_try_done();
    void post_err(unsigned int arg = 0);

protected:

    void item_update_itemList() ;
    void timerEvent(QTimerEvent *) ;
    //void setClassifyEnable(bool flg);
    void setTestButtonSt();
    void initChannelShow(bool Resul_realTime );//为了区分是谁来调用这个函数 2018/09/06
                                                //1：change_language_slot 0：其他

signals:
     //上位机计时器时间到了改变状态颜色
     void counter_timeout(int) ;
     //调用信息框
     void info2error_dialog(QString) ;
     //调用密码框
     void call4password(int) ;
     //hide密码框
     void hide4password(int) ;
     //第二次检测卡成功，进入测试
     void check_signal() ;
     //因为在处理串口返回信息的槽里直接恢复button会出先通讯错误，因此特设置这个槽
     void set_button_signal() ;
     //信息框倒计时
     void form_count_signal(QString) ;
     //给计时器线程发信号
     void com2timer(uchar *) ;
     //完成注册
     void already_register() ;
     //在调试测试显示曲线
     void show_curveform(int ) ;
     //改变语言
     void chage_language(int) ;
/******************  UI 翻译  ***********************/
/**/     void update_ui_password() ;
/**/     void update_ui_errordialog() ;
/**/     void update_ui_register() ;
/**/     void update_ui_detial_form() ;
/**/     void update_ui_history_edit() ;
/**/     void update_ui_keyboard() ;
/**/     void update_ui_numkeyboard() ;
/**/     void update_ui_changecode() ;
/**/     void update_ui_prj_pm() ;
/**/     void update_ui_date() ;
/**/     void update_ui_multicard() ;
/******************  UI 翻译  ***********************/


};

#endif // FIRST_FORM_H
