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
#
#include "app/chagecode.h"
#include "app/number_board.h"
#include "typewritting/syszuxim.h"
#include "typewritting/syszuxpinyin.h"


namespace Ui {
class First_form;
}

class First_form : public QWidget
{
    Q_OBJECT

public:
    explicit First_form(QWidget *parent = 0);
    ~First_form();

    QDateTime currendatetime  ;
    QTime currenttime  ;

private:
    Ui::First_form *ui;
    void ui_init() ;
    void tcp_initial() ;
    void allButton_clicked(const char com[]) ;
    void enold() ;

    QBasicTimer detect_timer;
    void timer_init() ;

    bool enold_flag ;

    bool form_count ;
    int form_count_num ;
    QString form_count_str ;

    void prepare_print_data( QString *com_line) ;
    void prepare_print_data0( QString *com_line) ;
    void prepare_print_data1( QString *com_line) ;
    void prepare_print_data2( QString *com_line) ;
    void prepare_print_data3( QString *com_line) ;
    void print_title() ;
     void print_org() ;
     void auto_test(int sw) ;
     void standby();//2018/10/11 增加待机位，因为退卡要走两次

private slots:
    void on_pushButton_save_dianji_clicked();
    void on_pushButton_change_dianji_clicked();
    void on_pushButton_save_tiaoma_clicked();
    void on_pushButton_change_tiaoma_clicked();
    void on_pushButton_write_chuangkouchangdu_clicked();
    void on_pushButton_read_chuangkouchangdu_clicked();
    void on_pushButton_write_yuandianceshi_clicked();
    void on_pushButton_read_yuandianceshi_clicked();
    void on_pushButton_write_tiaoxinglianxu_clicked();
    void on_pushButton_read_tiaoxinglianxu_clicked();
    void on_pushButton_write_ceshifangda_clicked();
    void on_pushButton_read_ceshifangda_clicked();
    void on_pushButton_write_tiaomafangda_clicked();
    void on_pushButton_pushButton_read_tiaomafangda_clicked();
    void on_pushButton_write_tiaomajuli_clicked();
    void on_pushButton_read_tiaomajuli_clicked();
    void on_pushButton_write_tiaomalist_clicked();
    void on_pushButton_read_tiaomalist_clicked();
    void on_pushButton_write_tiaomachangdu_clicked();
    void on_pushButton_read_tiaomachangdu_clicked();
    void on_pushButton_write_yuandiantiaoma_clicked();
    void on_pushButton_read_yuandiantiaoma_clicked();
    void on_pushButton_write_yanse_clicked();
    void on_pushButton_read_yanse_clicked();
    void on_pushButton_write_disucishu_clicked();
    void on_pushButton_read_disucishu_clicked();
    void on_pushButton_write_disupinlv_clicked();
    void on_pushButton_read_disupinlv_clicked();
    void on_pushButton_write_suobu_clicked();
    void on_pushButton_pushButton_read_suobu_clicked();
    void on_pushButton_write_jiasupinlv_clicked();
    void on_pushButton_read_jiasupinlv_clicked();
    void on_pushButton_write_jiasubushu_clicked();
    void on_pushButton_read_jiasubushu_clicked();
    void on_pushButton_write_yunsu_clicked();
    void on_pushButton_read_yunsu_clicked();
    void on_pushButton_write_diuka_clicked();
    void on_pushButton_read_diuka_clicked();
    void on_pushButton_start__clicked();
    void on_toolButton_auto_clicked();
    void on_pushButton_upload_test_clicked();
    void on_pushButton_read_id_2_clicked();
    void on_pushButton_wifi_test_2_clicked();
    void on_pushButton_wifi_test_clicked();
    void on_pushButton_print_test_clicked();
    void on_toolButton_update_clicked();
    void on_toolButton_cal_clicked();
    void on_pushButton_enold_del_clicked();
    void on_lineEdit_std_oldtimes_textChanged(QString );
    void on_pushButton_enold_start_clicked();
    void on_toolButton_enold_clicked();
    void on_pushButton_save_time_clicked();
    void on_toolButton_RTC_clicked();
    void on_toolButton_USB_clicked();
    void on_pushButton_upload_send_2_clicked();
    void on_toolButton_wlan_clicked();
    void on_pushButton_upload_send_3_clicked();
    void on_toolButton_upload_clicked();
    void on_pushButton_upload_del_clicked();
    void on_pushButton_upload_send_clicked();
    void on_comboBox_5_currentIndexChanged(int index);
    void on_pushButton_cpu_del_clicked();
    void on_pushButton_read_id_clicked();
    void on_pushButton_card_out_clicked();
    void on_pushButton_card_in_clicked();
    void on_comboBox_4_currentIndexChanged(int index);
    void on_toolButton_cpu_clicked();
    void on_pushButton_IC_del_info_clicked();
    void on_pushButton_wifi_con_2_clicked();
    void on_comboBox_3_currentIndexChanged(int index);
    void on_toolButton_ICcard_clicked();
    void wifi_Button_clicked(const char com[]);
    void on_pushButton_wifi_send_clicked();
    void on_pushButton_wifi_del_info_clicked();
    void on_comboBox_2_currentIndexChanged(int index);
    void on_pushButton_wifi_con_clicked();
    void on_listWidget_wifi_list_currentRowChanged(int currentRow);
    void on_pushButton_wifi_refresh_clicked();
    void on_toolButton_WiFi_clicked();
    void on_comboBox_currentIndexChanged(int index);
    void on_pushButton_print_del_info_clicked();
    void on_main_Button_clicked();
    void on_toolButton_print_clicked();
    void on_pushButton_print_send_clicked();
    void on_pushButton_print_read_clicked() ;
    void time_out_solt() ;
    void get_datas_event(int sw) ;

    void form_count_slot(QString tx) ;
    void on_pushButton_read_id_3_clicked();
/*****************************************************/
    void on_pushButton_read_yuandiantiaoma_2_clicked();

    void on_pushButton_write_yuandianceshi_2_clicked();

    void on_pushButton_read_tiaoxinglianxu_2_clicked();

    void on_pushButton_write_tiaoxinglianxu_2_clicked();

    void on_pushButton_read_tiaomachangdu_2_clicked();

    void on_pushButton_write_tiaomachangdu_2_clicked();

    void on_pushButton_clicked();

    void on_checkBox_clicked();
/***********************************************************/
    void on_pushButton_upload_Clear_clicked();

    void on_radioButton_3_clicked();

    void on_radioButton_4_clicked();

protected:
    void timerEvent(QTimerEvent *) ;
 /*thread*/
 signals:
     void info2error_dialog(QString) ;
     void form_count_signal(QString) ;

public :
     void calcCRC(void*cmd);

     private:
        bool MulitCard;
};

#endif // FIRST_FORM_H
