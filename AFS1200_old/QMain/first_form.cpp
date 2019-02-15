#include <QList>
#include <QPushButton>
#include <QMouseEvent>
#include <QPixmap>
#include <QString>
#include <QDebug>
#include <QTime>
#include <QDateTime>
#include <QDir>
#include <QSettings>
#include <QAbstractItemView>
#include <QScrollBar>
#include <QVector>
#include <QDesktopServices>
#include <QFileDialog>
#include <QElapsedTimer>
#include "first_form.h"
#include "ui_first_form.h"
#include "app/iconhelper.h"
#include "app/myhelper.h"
#include "app/frmmessagebox.h"




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

/*udp*/

#include <sys/un.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>


#define EXPORT_PAT "/media"                                    //modify20160818

#define BUFFER_SIZE PIPE_BUF                                       //fifo���������ֵ4K

#define LOCK_TIME 10                                                         //����Ƭ��ͨѶ�ļ��ʱ��
#define LONG_LOCK_TIME 40                                           //����Ƭ��ͨѶ�ļ��ʱ��

#define NO_ICCARD -5
#define READ_IC_FAILED -55


unsigned char head_buffer[BUFFER_SIZE] ;                    //����24�ֽ�ͷ
unsigned int package[BUFFER_SIZE];                               //���մ����ݰ�
unsigned char idfile_buffer[BUFFER_SIZE] ;
unsigned char timer_buffer[1024] ;
unsigned char card_value[3] ;                                             //���տ���ֵ
//
extern unsigned char wifi_big_buffer[2048] ;                 //
extern char wifi_ssid[64] ;
extern char wifi_pws[64]  ;
extern float ad_t; // ��ʪ��
extern float ad_h; // ��ʪ��

static int tcp_sock ;                                                                 //����Ƭ����ͨѶ
static struct sockaddr_in tcp_server_addr ;

static int wifi_sock ;                                                                 //��wifiͨѶ
static struct sockaddr_in wifi_server_addr ;

unsigned char G_COM[24]  = {0x01,0x00,0x00,0x02,  0x00,0x00,0x00,0x02,  0x58,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x00,  0x00,0x00,0x00,0x5f } ;
int g_com_sw ;


First_form::First_form(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::First_form)
{
    ui->setupUi(this);

    tcp_initial() ;

    ui_init() ;

    ui->stackedWidget->setCurrentIndex(0) ;

}

void First_form::ui_init()
{
     this->setWindowFlags(Qt::FramelessWindowHint );   //��Ҫ�˵����ͱ����

    ui->pushButton_read_id_3->hide();//���ض�ȡ�¶� 2018/10/11
    ui->pushButton_change_tiaoma->hide();
    ui->pushButton_save_tiaoma->hide();
    ui->pushButton_change_dianji->hide();
    ui->pushButton_save_dianji->hide();
    this->MulitCard = true;//������Բ���Ĭ�ϲ�ѯ������
    ui->label_OldTips->hide();//�������ϻ���ʾ

     QFont font = ui->LCD_DATE->font() ;
     QPalette pe;
     pe.setColor(QPalette::WindowText,Qt::white);

     font.setPointSize(26) ;
     ui->LCD_DATE->setFont(font) ;
     ui->LCD_TIME->setFont(font) ;
     ui->LCD_DATE->setPalette(pe);
     ui->LCD_TIME->setPalette(pe);

     /*keyboard*/
     QWSInputMethod *im = new SyszuxIM;
     QWSServer::setCurrentInputMethod(im) ;
     im->updateHandler(QWSInputMethod::FocusIn);
     im->updateHandler(QWSInputMethod::FocusOut);

     enold_flag = 0 ;//�ϻ���־

     form_count = 0 ;          //��ʾ�����ͣ��ʱ�䵹��
     connect(this, SIGNAL(form_count_signal(QString)), this, SLOT(form_count_slot(QString))) ;


     ui->lineEdit_std_stop_date->setText(QDate::currentDate().toString("yyyy-MM-dd"));
     ui->lineEdit_std_stop_time->setText(QTime::currentTime().addSecs(60*60).toString("hh:mm"));

     connect(ui->checkBox_2, SIGNAL(clicked(bool)), SLOT(on_checkBox_clicked()));
     connect(ui->checkBox_3, SIGNAL(clicked(bool)), SLOT(on_checkBox_clicked()));
     connect(ui->checkBox_4, SIGNAL(clicked(bool)), SLOT(on_checkBox_clicked()));

}
void First_form::form_count_slot(QString tx)
{
    info2error_dialog(tx) ;
}
void First_form::tcp_initial()
{

    bzero(&tcp_server_addr, sizeof(tcp_server_addr)) ;
    tcp_server_addr.sin_family = AF_INET ;//ʹ��ipv4��socket����
    tcp_server_addr.sin_port = htons(8555) ;
    //�����ʮ���Ƶ�ip��ַת���ɶ�����
    inet_pton(AF_INET, "127.0.0.1", &tcp_server_addr.sin_addr) ;
    //����һ����ʽ�׽���  Э����     Э������    Э����
    tcp_sock = socket(     AF_INET,   SOCK_STREAM,    0) ;
    if(tcp_sock < 0)
    {
       printf("socket faulst!!!\n") ;
    }

    //connnect
    if(::connect(tcp_sock, (struct sockaddr*)&tcp_server_addr, sizeof(tcp_server_addr)) < 0)
    {
        printf("socketconnect faulst!!!\n") ;
    }

    bzero(&wifi_server_addr, sizeof(wifi_server_addr)) ;
    wifi_server_addr.sin_family = AF_INET ;
    wifi_server_addr.sin_port = htons(8556) ;
    inet_pton(AF_INET, "127.0.0.1", &wifi_server_addr.sin_addr) ;

    wifi_sock = socket(AF_INET, SOCK_STREAM, 0) ;
    if(wifi_sock < 0)
    {
       printf("socket faulst!!!\n") ;
    }
    //connnect
    if(::connect(wifi_sock, (struct sockaddr*)&wifi_server_addr, sizeof(wifi_server_addr)) < 0)
    {
        printf("socketconnect faulst!!!\n") ;
    }
}

/*thread*/
First_form::~First_form()
{
    delete ui;
}


void First_form::get_datas_event(int sw)
{

     printf("get_datas_event, %x case  \n",sw) ;


     switch(sw)                                                                                                 //case�¼���Ӧ����ı��
     {

         case (NO_ICCARD):{
             if(ui->stackedWidget->currentIndex() == 4)
                 info2error_dialog(tr("��ID��.")) ;
             else
                info2error_dialog(tr("��IC��.")) ;
            break ;
         }
         case (READ_IC_FAILED):{
            info2error_dialog(tr("��ȡ����.")) ;
            break ;
         }
         case 19:
         case 17:
        case 3:
        case 4:  {
            char buffer[72] = " ";
            QString tx ;
            for(int j=0; j<24; j++)
            {
                sprintf(&buffer[j*3], "%02X ", head_buffer[ j]) ;
            }
            tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
            if(this->enold_flag == 0)
                ui->plainTextEdit_cpu->appendPlainText(tx ) ;
            else
                ui->plainTextEdit->appendPlainText(tx ) ;
            break ;
         }
        case 9:
         {
            info2error_dialog(tr("ex")) ;
            QString tx = tr("����: ") ;


            for(int i=0; i<128; i++)
            {
                char buffer[50] = " ";
                for(int j=0; j<16; j++)
                {
                    sprintf(&buffer[j*3], "%02X ", idfile_buffer[i*16 + j]) ;
                }
                tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
                if(ui->stackedWidget->currentIndex() == 4)
                    ui->plainTextEdit_cpu->appendPlainText(tx ) ;
                else
                    ui->plainTextEdit_ICCARD->appendPlainText(tx ) ;
            }

            break ;

         }

         case 18:
         {
             char buffer[72] = " ";
             QString tx ;
             for(int j=0; j<24; j++)
             {
                 sprintf(&buffer[j*3], "%02X ", head_buffer[ j]) ;
             }
             tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
             QString out = tr("�¶�%1��   ʪ��%2��");

             out = out.arg(QString().sprintf("%.1f", ad_t)).arg(QString().sprintf("%.1f", ad_h));

             if(this->enold_flag == 0)
             {
                 ui->plainTextEdit_cpu->appendPlainText(tx ) ;
                 ui->plainTextEdit_cpu->appendPlainText(out ) ;
             }
                 else
             {
                 ui->plainTextEdit->appendPlainText(tx ) ;
                 ui->plainTextEdit->appendPlainText(out ) ;
             }
         } break;



         case 21:{

             if(head_buffer[0] != 'o')
             {
                 QString tx = tr("����: ") ;
                 char buffer[10] = " ";
                 sprintf(buffer, "%2X", head_buffer[0]) ;
                 tx.append(QString::fromLocal8Bit(buffer)) ;
                 ui->plainTextEdit_print->appendPlainText(tx ) ;
             }
             break ;
         }
         case 30:{
             char buffer[48] ;
             QString tx ;
             memcpy(buffer, head_buffer, 48) ;
             tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
             ui->plainTextEdit_upload->appendPlainText(tx ) ;
         }
         case 40:{
                 char buf[256] ;
                 memcpy(buf, wifi_big_buffer, 256) ;
                 ui->plainTextEdit_wifi->appendPlainText(tr("����:")) ;
                 ui->plainTextEdit_wifi->appendPlainText(QString::fromLocal8Bit(buf)) ;
                 info2error_dialog(tr("ex")) ;

             }
         case 42:{
                 QStringList wifi_list  ;
                 int i = 0 ;
                 int j = 0 ;
                 char one_line[128] ;
                 bzero(one_line, 128) ;
                 while(wifi_big_buffer[i] != '\0')  //head_buffer
                 {

                     if(wifi_big_buffer[i] == '\r')  //�õ�һ������  //head_buffer[
                     {
                          one_line[j] = '\0' ;
                          QString string_one_line = QString::fromLocal8Bit(one_line) ; //
                          QStringList tmp_list = string_one_line.split(",");

                          //+CWLAP:(4,"ChinaNet-wRK3",-88,"60:bb:0c:8a:ea:dc",11,-46)
                          if(tmp_list.count() > 1)
                          {
                              QString tmp = tmp_list.at(1) ;
                             wifi_list << tmp.remove("\"") ;  //"ChinaNet-wRK3"
                          }

                          //
                          i+=1 ; //delete '\n'
                          string_one_line.clear() ;
                          j = 0 ;

                     }
                     else
                     {
                          one_line[j] = wifi_big_buffer[i] ; //head_buffer
                          i++ ;
                          j++ ;
                     }
                 }
                 int list_row = wifi_list.count() ;
                 if( list_row > 0)
                 {
                     disconnect(ui->listWidget_wifi_list,SIGNAL(currentRowChanged(int)), this, SLOT(on_listWidget_wifi_list_currentRowChanged(int))) ;
                     ui->listWidget_wifi_list->clear() ;
                     for(int k=0; k<list_row ; k++)
                         ui->listWidget_wifi_list->insertItem(k, wifi_list.at(k)) ;
                     connect(ui->listWidget_wifi_list,SIGNAL(currentRowChanged(int)), this, SLOT(on_listWidget_wifi_list_currentRowChanged(int))) ;

                 }
                 char buf[2048] ;
                 memcpy(buf, wifi_big_buffer, 2048) ;
                 ui->plainTextEdit_wifi->appendPlainText(tr("����:")) ;
                 ui->plainTextEdit_wifi->appendPlainText(QString::fromLocal8Bit(buf)) ;
                 info2error_dialog(tr("ex")) ;
                 break ;
             }
         case 48:{
             char buf[20] ;
             memcpy(buf, wifi_big_buffer, 20) ;
             ui->plainTextEdit_wifi->appendPlainText(tr("����:")) ;
             ui->plainTextEdit_wifi->appendPlainText(QString::fromLocal8Bit(buf)) ;
             info2error_dialog(tr("ex")) ;
             break ;
         }
         case (61):
         {
             QString tx = tr("����: ") ;
             char buffer[10] = " ";
             memcpy(buffer, head_buffer, 10) ;
             tx.append(QString::fromLocal8Bit(buffer)) ;
             ui->plainTextEdit_print->appendPlainText(tx ) ;
              info2error_dialog(tr("ex")) ;
              break ;

         }
         case (62):
         {
             QString tx = tr("����: ") ;
             char buffer[10] = " ";
             memcpy(buffer, head_buffer, 10) ;
             tx.append(QString::fromLocal8Bit(buffer)) ;
             ui->plainTextEdit_wifi->appendPlainText(tx ) ;
             info2error_dialog(tr("ex")) ;

             break ;
         }
         case (63):
         {
             QString tx = tr("����: ") ;
             char buffer[10] = " ";
             memcpy(buffer, head_buffer, 10) ;
             tx.append(QString::fromLocal8Bit(buffer)) ;
             ui->plainTextEdit_ICCARD->appendPlainText(tx ) ;
             info2error_dialog(tr("ex")) ;

             break ;
         }
         case (64):
         {
             QString tx = tr("����: ") ;
             char buffer[10] = " ";
             memcpy(buffer, head_buffer, 10) ;
             tx.append(QString::fromLocal8Bit(buffer)) ;
             ui->plainTextEdit_cpu->appendPlainText(tx ) ;
             info2error_dialog(tr("ex")) ;

             break ;
         }
         case (65):
         {
             QString tx = tr("����: ") ;
             char buffer[10] = " ";
             memcpy(buffer, head_buffer, 10) ;
             tx.append(QString::fromLocal8Bit(buffer)) ;
             ui->plainTextEdit_upload->appendPlainText(tx ) ;
             info2error_dialog(tr("ex")) ;

             break ;
         }
        case (-60):
             {
                 info2error_dialog(tr("����Ϣ����.")) ;

             }
             case (71):
             {
                 ui->label_32->setText(tr("����")) ;//��ӡ��
                 break ;
             }
             case (72):
             {
                 ui->label_33->setText(tr("����")) ;//wifi
                 break ;
             }
             case (73):
             {
                ui->label_34->setText(tr("����")) ;//IC��
                 break ;
             }
             case (74):
             {
                ui->label_35->setText(tr("����")) ;//���ش���
                break ;
             }
             case (75):
             {
                 ui->label_36->setText(tr("����")) ;//��������(LIS)
                break ;
             }
             case (-71):
             {
                 ui->label_32->setText(tr("�쳣")) ;
                 break ;
             }
             case (-72):
             {
                 ui->label_33->setText(tr("�쳣")) ;
                 break ;
             }
             case (-73):
             {
                ui->label_34->setText(tr("�쳣")) ;
                 break ;
             }
             case (-74):
             {
                ui->label_35->setText(tr("�쳣")) ;
                break ;
             }
             case (-75):
             {
                 ui->label_36->setText(tr("�쳣")) ;
                break ;
             }
/**********************��д���룬���ԣ��������*********************************/
            case 80:{
                    char buffer[72] = " ";
                    QString tx ;
                    for(int j=0; j<24; j++)
                    {
                        sprintf(&buffer[j*3], "%02X ", head_buffer[j]) ;
                    }
                    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
                    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

                     int value = (head_buffer[7]<<8) + head_buffer[8] ;
                     qDebug() <<__LINE__ <<__FUNCTION__<< "value ="<<value;
                    switch(g_com_sw)
                    {
                        case 1: ui->lineEdit_std_yunsu->setText(QString("%1").arg(value)) ;break ;
                        case 2: ui->lineEdit_std_diukapinlv->setText(QString("%1").arg(value)) ;break ;
                        case 3: ui->lineEdit_std_jiasubushu->setText(QString("%1").arg(value)) ;break ;
                        case 4: ui->lineEdit_std_jiasupinlv->setText(QString("%1").arg(value)) ;break ;
                        case 5: ui->checkBox_suobu->setChecked(value) ;break ;
                        case 6: ui->lineEdit_std_disupinlv->setText(QString("%1").arg(value)) ;break ;
                        case 7: ui->lineEdit_std_disucishu->setText(QString("%1").arg(value)) ;break ;
                        case 8: ui->comboBox_yanse->setCurrentIndex( value) ;break ;
                        case 9: ui->lineEdit_std_yuandiantiaoma->setText( QString("%1").arg(value)) ;break ;
                        case 10: ui->lineEdit_std_tiaomachangdu->setText( QString("%1").arg(value)) ;break ;
                        case 11: ui->lineEdit_std_tiaomalist->setText( QString("%1").arg(value)) ;break ;
                        case 12: ui->lineEdit_std_tiaomajuli->setText( QString("%1").arg(value)) ;break ;
                        case 13: ui->lineEdit_std_tiaomafangda->setText( QString("%1").arg(value)) ;break ;
                        case 14: ui->lineEdit_std_ceshifangda->setText( QString("%1").arg(value)) ;break ;
                        case 15: ui->lineEdit_std_tiaoxinglianxu->setText( QString("%1").arg(value)) ;break ;
                        case 16: ui->lineEdit_std_yuandianceshi->setText( QString("%1").arg(value)) ;break ;
                        case 17: ui->lineEdit_std_chuangkouchangdu->setText( QString("%1").arg(value)) ;break ;
                        case 18:{
                                                                /* ��·��վ��*/
                                    value = (head_buffer[8]<<8) + head_buffer[9] ;
                                    ui->lineEdit_std_yuandiantiaoma_2->setText(QString::number(value));
                                    break;
                                     }
                                                            /*x���վ������Ƶ��*/
                        case 19:{
                                    value = (head_buffer[8]<<8) + head_buffer[9] ;
                                    ui->lineEdit_std_tiaoxinglianxu_2->setText(QString::number(value));
                                    break;
                                }
                                                             /*xӫ��ɨ�贰�ڳ���*/
                         case 20:{
                                value = (head_buffer[8]<<8) + head_buffer[9] ;
                                ui->lineEdit_std_tiaomachangdu_2->setText(QString::number(value));
                                break;
                            }
                    }
                    memcpy(head_buffer,"0",24);
                    qDebug() <<__LINE__ <<__FUNCTION__<<"head_buffer ="<<head_buffer[0];
              }
         }
}
/**/
void First_form::allButton_clicked(const char com[])
{
    char buffer[BUFFER_SIZE + 1];

    bzero(buffer, sizeof(buffer)) ;
    memcpy(buffer, com, COM_NAME_LEN) ;
    //����Ƭ��ͨ�ţ�д������д����
    //��֪ͨ�����̷߳����źţ����ӵ�get_data_event��
    if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
    {
        printf("write failed\n") ;
    }
}
/*********************************
*****��ӡ
***********************************/
void First_form::prepare_print_data0( QString *com_line)
{
    QString sub_line ;
    QString tmp ;

    com_line->clear();
    //
    sub_line.clear();
    sub_line.fill('_',31) ;
   // *com_line = *com_line + sub_line + "\r\n";
    //
    QString time = tr("��ӡʱ��:") + QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss").mid(0, 19) + "\r\n" ;
    //
    QString text ;//= ui->textEdit_declar->toPlainText().split(":").at(1);
            text = tr("�����ֻ�Ա��ݱ걾����") + "\r\n";
    //qDebug() << ui->textEdit_declar->toPlainText() ;
    *com_line = *com_line + "PRI00"+ sub_line + text + time  + "\r\n \r\n \r\n \r\n";
}
void First_form::prepare_print_data1( QString *com_line)
{
    QString sub_line ;
    QString tmp ;
//    QString up_range, low_range ;

    com_line->clear() ;
    *com_line = *com_line + "PRI00" ;

    sub_line.clear() ;
    sub_line.fill(' ',24) ;
    tmp = tr("PCT") ;
    sub_line =  sub_line.replace(0, tmp.length(), tmp) ;
    tmp.clear() ;

    tmp = "1.234" ;//QString("%1").arg(load_item->Cvalue[0]) ;
    sub_line =  sub_line.replace(13, tmp.length(), tmp) ;
    tmp.clear() ;
    tmp = tmp + "  " + "ng/ml" ;
    sub_line =  sub_line.replace(22, tmp.length(), tmp) + "\r\n";
     *com_line = *com_line + sub_line ;

    //
   sub_line.clear() ;
   sub_line.fill(' ',24) ;


   tmp = tr("(�ο���Χ:") + tr( "0.1 �� 100")  + ")";

    sub_line =  sub_line.replace(8, tmp.length(), tmp) + "\r\n" ;
    *com_line = *com_line + sub_line ;

    sub_line = "\r\n" ;
    *com_line = *com_line + sub_line;
}

void First_form::prepare_print_data( QString *com_line)
{
    QString sub_line ;
    QString tmp ;

    com_line->clear();
    *com_line = *com_line + "PRI00" ;



     //
    sub_line.clear() ;
     sub_line.fill(' ',18) ;
     tmp = tr("�����Ŀ") ;
     sub_line =  sub_line.replace(0, tmp.length(), tmp) ;
     tmp.clear();
     tmp = tr("���") ;
     sub_line =  sub_line.replace(9, tmp.length(), tmp) ;
     tmp.clear();
     tmp = tr("��λ") ;
     sub_line =  sub_line.replace(18, tmp.length(), tmp) + "\r\n";

     *com_line = *com_line + sub_line;

     //
     sub_line.clear();
     sub_line.fill('_',31) ;
     *com_line = *com_line + sub_line + "\r\n";


}

void First_form::prepare_print_data2( QString *com_line)
{

    com_line->clear();
     //
     *com_line = "PRI00" + tr("���ʱ��: 2020-12-12 23:01:02 \r\n") ;

}
void First_form::prepare_print_data3( QString *com_line)
{
//    QString sub_line ;
//    QString tmp ;


    com_line->clear();

    *com_line =  "PRI00";

    *com_line = *com_line  + tr("������: 1234ABCDEF56") + "\r\n"  ;


    *com_line = *com_line + tr("��������:Ѫ��/Ѫ��") + "\r\n";

//    *com_line = *com_line + tr("����:��������")+ "\r\n";

//    tmp.clear();


    //
//    sub_line.clear();
//    sub_line.fill(' ',18) ;
    //tmp.clear();
//    tmp = tr("�Ա�:��") ;
//    sub_line =  sub_line.replace(0, tmp.length(), tmp) ;


//    tmp = tr("����:20")  ;

//    sub_line =  sub_line.replace(  12, tmp.length(), tmp) ;
//    *com_line = *com_line + sub_line + "\r\n";
    //

}

void First_form::standby()
{
    char buffer[72] = " ";
    QString tx ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", Drop[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    if(this->enold_flag == 0)
        ui->plainTextEdit_cpu->appendPlainText(tx ) ;
    else
        ui->plainTextEdit->appendPlainText(tx ) ;
    allButton_clicked("COM04") ;
}

void First_form::print_title()
{

    char buffer[BUFFER_SIZE + 1];
     bzero(buffer, sizeof(buffer)) ;
    QString com_line ;//com_line = com_line +  ;

    com_line.clear();
    com_line = com_line + "PRI00" +tr("         ��ⱨ�浥 \r\n") ;//+ "\r\n" + "\r\n"  ;
    memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
    if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
    {
        printf("write failed\n") ;

    }
    //
    /*memcpy(buffer,enlarge_1 , 8) ;                                                  //�ָ�һ������
    if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
    {
        printf("write failed\n") ;
        return -1 ;
    }*/

}
/*��ӡ�̶��ı���*/
void First_form::print_org()
{

    char buffer[BUFFER_SIZE + 1];
     bzero(buffer, sizeof(buffer)) ;
    QString com_line ;//com_line = com_line +  ;


    com_line.clear();
    com_line = com_line + "PRI00" + tr("������������Ƽ����޹�˾") + "\r\n"  ;
    memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
    if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
    {
        printf("write failed\n") ;

    }

}
void First_form::on_pushButton_print_send_clicked()
{
    char buffer[BUFFER_SIZE] ;
    QString com_line ;

      print_org() ;
      usleep(300000) ;

      print_title() ;//
    usleep(300000) ;

      /*5*/
     com_line.clear() ;
     prepare_print_data3(&com_line) ;
     bzero(buffer, BUFFER_SIZE) ;
     memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
     if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
     {
         printf("write failed\n") ;

     }
     usleep(300000) ;



      /*3*/
     com_line.clear() ;
     prepare_print_data( &com_line) ;
     bzero(buffer, BUFFER_SIZE) ;
     memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
     if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
     {
         printf("write failed\n") ;

     }
    usleep(300000) ;


      /*2*/
     for(int k=0; k<1; k++)
     {
         prepare_print_data1( &com_line) ;
         bzero(buffer, BUFFER_SIZE) ;
         memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
         if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
         {
             printf("write failed\n") ;

         }
         usleep(300000) ;
     }


      /*1*/
      prepare_print_data0( &com_line) ;
      bzero(buffer, BUFFER_SIZE) ;
      memcpy(buffer, com_line.toLocal8Bit().constData(), com_line.toLocal8Bit().length() + 1) ;
      if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
      {
          printf("write failed\n") ;

      }

}
void First_form::on_toolButton_print_clicked()
{
    ui->label_dev_0->setText(uart_config[print_serial_use].name) ;
    ui->label_baud_0->setText(QString("%1").arg(uart_config[print_serial_use].baud)) ;
    ui->stackedWidget->setCurrentIndex(1) ;

}
void First_form::on_pushButton_print_read_clicked()
{
    QString cmd = "PRI01" ;
    int    size = cmd.toLocal8Bit().length() + 1 ;
    char buffer[size] ;
    memcpy(buffer, cmd.toLocal8Bit().constData(), size) ;
    if(write(tcp_sock, buffer, size) < 0)
    {
        printf("write failed\n") ;
    }
    ui->plainTextEdit_print->appendPlainText(tr("����: 10 04 04 02") ) ;
}
void First_form::on_pushButton_print_del_info_clicked()
{
    ui->plainTextEdit_print->clear() ;
}

void First_form::on_comboBox_currentIndexChanged(int index)
{
    print_serial_use = index ;
    ui->label_dev_0->setText(uart_config[print_serial_use].name) ;
    ui->label_baud_0->setText(QString("%1").arg(uart_config[print_serial_use].baud)) ;

}
/*********************************
*WiFi
*
**********************************/
void First_form::on_toolButton_WiFi_clicked()
{

    ui->label_dev_1->setText(uart_config[wifi_serial_use].name) ;
    ui->label_baud_1->setText(QString("%1").arg(uart_config[wifi_serial_use].baud)) ;
    ui->stackedWidget->setCurrentIndex(2) ;
}

void First_form::wifi_Button_clicked(const char com[])
{
    char buffer[BUFFER_SIZE + 1];
    //�����¼��У���ʱ���ð�ť���ɰ���ֱ���¼�������
    bzero(buffer, sizeof(buffer)) ;
    memcpy(buffer, com, COM_NAME_LEN) ;
    //д֪ͨ���ܵ���֪�����߳�
    if(write(wifi_sock, buffer, COM_NAME_LEN) < 0)
    {
        printf("write failed\n") ;
    }
}

void First_form::on_pushButton_wifi_refresh_clicked()
{
   wifi_Button_clicked("WIF02") ;
    info2error_dialog(tr("fs���Ժ�..")) ;
}

void First_form::on_listWidget_wifi_list_currentRowChanged(int currentRow)
{
    if(currentRow < 0)
        return ;
    ui->lineEdit_std_wifi_costom->setText( ui->listWidget_wifi_list->currentItem()->text() ) ;
}
void First_form::on_pushButton_wifi_con_clicked()
{
        QString name =  ui->lineEdit_std_wifi_costom->text() ;
        QString pwd = ui->lineEdit_std_wifi_wifi_pass->text() ;

        if((name.length()<64) && (pwd.length()<64))
        {
            bzero(wifi_ssid, 64) ;
            bzero(wifi_pws, 64) ;
            memcpy(wifi_ssid, name.toLocal8Bit().constData(), name.toLocal8Bit().length()) ;
            memcpy(wifi_pws, pwd.toLocal8Bit().constData(), pwd.toLocal8Bit().length()) ;
        }
        else
            info2error_dialog(tr("���벻�ó���64���ַ�")) ;
        wifi_Button_clicked("WIF08") ;
        info2error_dialog(tr("fs���Ժ�..")) ;
}

void First_form::on_comboBox_2_currentIndexChanged(int index)
{
    wifi_serial_use = index ;
    ui->label_dev_1->setText(uart_config[wifi_serial_use].name) ;
    ui->label_baud_1->setText(QString("%1").arg(uart_config[wifi_serial_use].baud)) ;
}
void First_form::on_pushButton_wifi_del_info_clicked()
{
    ui->plainTextEdit_wifi->clear() ;
}
void First_form::on_pushButton_wifi_send_clicked()
{
    char com[512] ;
    QString comline ;
    QString str = "wifi-udp send test !" ;
    comline = comline + "WIF00" + str ;//+ "\r\n";

    ui->plainTextEdit_wifi->appendPlainText(tr("Send:")) ;
    ui->plainTextEdit_wifi->appendPlainText(str) ;
    memcpy(com, comline.toLocal8Bit().constData(), comline.toLocal8Bit().length() );

    wifi_Button_clicked(com ) ;
}

void First_form::on_toolButton_ICcard_clicked()
{
    ui->label_dev_2->setText(uart_config[IC_serial_use].name) ;
    ui->label_baud_2->setText(QString("%1").arg(uart_config[IC_serial_use].baud)) ;
    ui->stackedWidget->setCurrentIndex(3) ;
}
void First_form::on_comboBox_3_currentIndexChanged(int index)
{
    IC_serial_use = index ;
    ui->label_dev_2->setText(uart_config[IC_serial_use].name) ;
    ui->label_baud_2->setText(QString("%1").arg(uart_config[IC_serial_use].baud)) ;
}
void First_form::on_pushButton_wifi_con_2_clicked()
{
    info2error_dialog(tr("fs��ȡ�У����Ժ�..")) ;

    allButton_clicked("ICC05") ;
}
void First_form::on_pushButton_IC_del_info_clicked()
{
    ui->plainTextEdit_ICCARD->clear() ;
}
/*********************************
*�װ�
*
**********************************/
void First_form::on_toolButton_cpu_clicked()
{
    ui->label_dev_3->setText(uart_config[th_serial_use].name) ;
    ui->label_baud_3->setText(QString("%1").arg(uart_config[th_serial_use].baud)) ;
    ui->stackedWidget->setCurrentIndex(4) ;
}
void First_form::on_comboBox_4_currentIndexChanged(int index)
{
    th_serial_use = index ;
    ui->label_dev_3->setText(uart_config[th_serial_use].name) ;
    ui->label_baud_3->setText(QString("%1").arg(uart_config[th_serial_use].baud)) ;
}

void First_form::on_pushButton_card_in_clicked()
{
    char buffer[72] = " ";
    QString tx ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", Rest[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    if(this->enold_flag == 0)
        ui->plainTextEdit_cpu->appendPlainText(tx ) ;
    else
        ui->plainTextEdit->appendPlainText(tx ) ;
    allButton_clicked("COM03") ;
}

void First_form::on_pushButton_card_out_clicked()
{
    standby();
    usleep(500) ;
    on_pushButton_card_in_clicked();
    usleep(500) ;
    standby();
    usleep(500) ;
    on_pushButton_card_in_clicked();
}
void First_form::on_pushButton_read_id_clicked()
{
    info2error_dialog(tr("fs��ȡ�У����Ժ�..")) ;
    char buffer[72] = " ";
    QString tx ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", Ridc[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;
    allButton_clicked("COM09") ;
}
void First_form::on_pushButton_cpu_del_clicked()
{
    ui->plainTextEdit_cpu->clear() ;
}
/*********************************
*�ϴ�
*
**********************************/

void First_form::on_toolButton_upload_clicked()
{
    ui->label_dev_4->setText(uart_config[upload_serial_use].name) ;
    ui->label_baud_4->setText(QString("%1").arg(uart_config[upload_serial_use].baud)) ;
    ui->stackedWidget->setCurrentIndex(5) ;
}
void First_form::on_comboBox_5_currentIndexChanged(int index)
{
    upload_serial_use = index ;
    ui->label_dev_4->setText(uart_config[upload_serial_use].name) ;
    ui->label_baud_4->setText(QString("%1").arg(uart_config[upload_serial_use].baud)) ;
}

void First_form::on_pushButton_upload_send_clicked()
{
    char buffer[512] ;
    QString tx = "uart upload test !" ;
    QString com_line ;
    com_line = "UPL00" + tx ;
    memcpy(buffer, com_line.toAscii().constData(), COM_NAME_LEN) ;
    //д֪ͨ���ܵ���֪�����߳�
    if(write(tcp_sock, buffer, COM_NAME_LEN) < 0)
    {
        printf("write failed\n") ;
    }
    tx = tr("����: ") + tx ;
    ui->plainTextEdit_upload->appendPlainText(tx ) ;

}
void First_form::on_pushButton_upload_del_clicked()
{
    ui->plainTextEdit_upload->clear() ;
}
/**********************************
*����
*
**********************************/
void First_form::on_pushButton_upload_send_3_clicked()
{
    //���ñ���IP
    QString set_local_ip = "ifconfig eth0 " + ui->lineEdit_std_ip->text() + " netmask 255.255.255.0";
    system(set_local_ip.toLocal8Bit().constData()) ;
    set_local_ip = "route add default gw " + ui->lineEdit_std_gw->text() ;
    system(set_local_ip.toLocal8Bit().constData()) ;
}
void First_form::on_toolButton_wlan_clicked()
{
    ui->stackedWidget->setCurrentIndex(6) ;
}
void First_form::on_pushButton_upload_send_2_clicked()
{
    QString _ip = "ping -c 1 " + ui->lineEdit_std_client_ip->text()  ;
    ui->plainTextEdit_wlan->appendPlainText(_ip);
    int ret = system(_ip.toLocal8Bit().constData());
    if(ret == 0)
    {
        ui->plainTextEdit_wlan->appendPlainText(tr("��������ͨ!"));
    }
    else
        ui->plainTextEdit_wlan->appendPlainText(tr("��������ʧ��!"));

}

void First_form::on_pushButton_upload_Clear_clicked()
{
    ui->plainTextEdit_wlan->clear();
}

/*********************************
*USB
*
**********************************/
void First_form::on_toolButton_USB_clicked()
{
    QFileDialog *fileDialog = new QFileDialog(this) ;
    fileDialog->setWindowTitle( tr("U�̲鿴"));
    fileDialog->setDirectory(EXPORT_PAT);
    fileDialog->setOption(QFileDialog::ReadOnly) ;
    fileDialog->exec() ;

}
/*********************************
*RTC
*
**********************************/
void First_form::on_toolButton_RTC_clicked()
{
    ui->lineEdit_std_time->setText(QTime::currentTime().toString()) ;
    ui->lineEdit_std_date->setText(currendatetime.toString("yyyy-MM-dd")) ;
    ui->stackedWidget->setCurrentIndex(7) ;
}
void First_form::on_pushButton_save_time_clicked()
{
    QString time ;
    time = QString("date -s \"") + ui->lineEdit_std_date->text() + " " + ui->lineEdit_std_time->text() + "\"";
    system(time.toLocal8Bit().constData()) ;
    system("hwclock -w") ;//bug !!!  ���𷵻��ź� -5
}
/*********************************
*ENOLD
*
**********************************/

void First_form::on_toolButton_enold_clicked()
{
    ui->stackedWidget->setCurrentIndex(8) ;
}

void First_form::on_pushButton_enold_start_clicked()
{

    if(ui->pushButton_enold_start->text() == tr("��ʼ"))
    {
        ui->pushButton_enold_start->setText(tr("ֹͣ")) ;
        enold_flag = 1 ;
        ui->label_OldTips->show();
        ui->label_OldTips->setText(tr("�����ϻ�������"));
    }
    else
    {
        ui->pushButton_enold_start->setText(tr("��ʼ")) ;
        ui->label_OldTips->setText(tr("�ֶ�ֹͣ�ϻ�!"));
        enold_flag = 0 ;
    }
}
void First_form::enold()
{
    static int swi = 0 ;

    int count = ui->lineEdit_4->text().toInt() ;
    if(count%500 == 0)
        ui->plainTextEdit->clear() ;


    /**************************�ϻ�����******************************/
    /**********1����    2����    3��·������λ    4��ӡ����ӡ ****************/
    switch(swi)
    {
    case 0: ui->pushButton_card_in->click() ;break ;
    case 1: ui->pushButton_card_out->click() ; break ;
    case 2:
                ui->pushButton->setText(QString::number((ui->pushButton->text().toInt()+1) % 16));
                ui->pushButton->click();
                break;
    case 3: on_pushButton_print_send_clicked(); break;
    }

    swi++;
    if (swi > 3)
    {
        swi = 0 ;
        ui->lineEdit_4->setText(QString("%1").arg(count + 1)) ;
    }
}
void First_form::on_lineEdit_std_oldtimes_textChanged(QString tx)
{
    if(tx.toInt() > 100000)
    {
          ui->lineEdit_std_oldtimes->setText("100000") ;
    }
}

void First_form::on_pushButton_enold_del_clicked()
{
    ui->plainTextEdit->clear() ;
}
/*********************************
*auto test
*
**********************************/
void First_form::on_toolButton_auto_clicked()
{
    ui->stackedWidget->setCurrentIndex(9) ;
}

void First_form::on_pushButton_start__clicked()
{
    info2error_dialog(tr("fs������,���Ժ�..")) ;

    QElapsedTimer t;
    t.start();
    while(t.elapsed()<1000)
        QCoreApplication::processEvents();

    for(int i=0; i<5; i++)
    {
        auto_test(i) ;
        usleep(100000) ;
    }

    /*ip*/
    QString _ip = "ping -c 1 " + ui->lineEdit_std_client_ip->text()  ;

    int ret = system(_ip.toLocal8Bit().constData());
    if(ret == 0)
    {
        ui->label_37->setText(tr("����"));
    }
    else
        ui->label_37->setText(tr("�쳣"));

    /*USB*/

    QDir dir(EXPORT_PAT) ;
    dir.setFilter(QDir::Dirs );
    dir.setSorting(QDir::DirsFirst);
    QFileInfoList list = dir.entryInfoList() ;
    QFileInfoList t_list ;

    for(int i=0; i<list.count(); i++)
    {
        //qDebug() << list.at(i).fileName();
        if(list.at(i).fileName() !="." && list.at(i).fileName() !="..")
            t_list << list.at(i) ;
    }
    if(t_list.count() > 0)
        ui->label_38->setText(tr("����"));
    else
        ui->label_38->setText(tr("�쳣"));

    info2error_dialog(tr("ex")) ;
}

/*********************************
*cal
*
**********************************/
void First_form::on_toolButton_cal_clicked()
{
    if(myHelper::ShowMessageBoxInfo(tr("������ֵ�У׼��ͷ��У׼���Ϊ����״̬,��رյ�Դ����!")))
    {

      //system("/usr/bin/ts_calibrate ") ;
       //system("./touchscreen.sh") ;
       exit(1 ) ;
    }
}


/*ϵͳ����*/
void First_form::on_toolButton_update_clicked()
{
    info2error_dialog(tr("fs���Ժ�..")) ;
    QElapsedTimer t;
    t.start();
    while(t.elapsed()<100)
    QCoreApplication::processEvents();


    QDir dir(EXPORT_PAT) ;
    dir.setFilter(QDir::Dirs );
    dir.setSorting(QDir::DirsFirst);
    QFileInfoList list = dir.entryInfoList() ;
    QFileInfoList t_list ;

    for(int i=0; i<list.count(); i++)
    {
        qDebug() << list.at(i).fileName();
        if(list.at(i).fileName() !="." && list.at(i).fileName() !="..")
            t_list << list.at(i) ;
    }


    if(t_list.count() == 1)
    {
        if(myHelper::FileIsExist(t_list.at(0).absoluteFilePath() + "/update")) //
        {
            if(myHelper::FileIsExist(t_list.at(0).absoluteFilePath() + "/update/" + "update"))
            {
                     //�������������Ժ�..һ����
                     if(myHelper::ShowMessageBoxInfo(tr("�Ѽ�⵽���������Ƿ�����?")))
                     {
                         QString sh_path;

                         detect_timer.stop();



                         sh_path = sh_path + "cp -r " + t_list.at(0).absoluteFilePath() + "/update/ " + ".";
                         system( sh_path.toLocal8Bit().constData() ) ;
                         if(myHelper::FileIsExist("update/update"))
                         {
                                info2error_dialog(tr("fs��������,���Ժ�..")) ;
                                system("bash update/update") ;
                                form_count = 1 ;
                                form_count_num= 30 ;
                                 system("sync") ;
                                form_count_str = tr("fs�����ɹ�����رյ�Դ������ϵͳ") ;
                         }
                         else
                         {
                             info2error_dialog(tr("��������!")) ;
                          }
                     }else
                     {
                        info2error_dialog(tr("ex")) ;
                     }

            }

        }
        else
        {
            info2error_dialog(tr("��ⲻ����������!")) ;
        }

    }
    else if(t_list.count() >= 1)
    {
        info2error_dialog(tr("��γ�����Ĵ����豸!")) ;
    }
    else
    {
        info2error_dialog(tr("�����U��!")) ;
    }
}

/*********************************
*��ʱ��
*
**********************************/

void First_form::timer_init()
{
    detect_timer.start(10,this);
}


void First_form::timerEvent(QTimerEvent *)
{
    //static bool flag ;

}

void First_form::calcCRC(void *cmd)
{
    unsigned char *buf = (unsigned char*)cmd;
    buf[23] = 0;
    for (int i = 0; i < 23; i++)
    {
        buf[23] += buf[i];
    }
}
/*******  1s��ʱ��  *********/
void First_form::time_out_solt()
{
    static int old_time = 0 ;
    /*ʱ����ʾLCD*/
    currendatetime = QDateTime::currentDateTime() ;
    currenttime = QTime::currentTime() ;

    ui->LCD_TIME->setText( currenttime.toString("hh:mm:ss") ) ;
    ui->LCD_DATE->setText(currendatetime.toString("yyyy-MM-dd"));

    /*���������˳���ʾ���ڳ���ʱ��*/
    if(form_count)
    {
        if(form_count_num <= 0)
        {
            form_count = 0 ;
            emit form_count_signal(form_count_str) ;                   //�ָ�Ϊ����ť���Թرյ���ʾ����
        }
        else
            form_count_num-- ;
    }

/*************************�ϻ����ڶ�ʱ������*****************************/
    if(enold_flag)
    {
        if(ui->radioButton->isChecked())//�����ϻ�
        {
            if(ui->lineEdit_4->text().toInt() < ui->lineEdit_std_oldtimes->text().toInt())
            {

                if(old_time > 3)//4�ζ�ʱʱ���ϻ�һ��
                {
                    enold() ;
                    old_time = 0 ;
                }
                else
                    old_time++ ;
            }
            else
            {
                enold_flag = 0 ;//������������־λ����
            }
        }
        else//ʱ���ϻ�
        {
            QString date = ui->lineEdit_std_stop_date->text() ;
            QString time = ui->lineEdit_std_stop_time->text() + ":00";
            QDateTime datetime = QDateTime::fromString(date + " " + time,  "yyyy-MM-dd hh:mm:ss") ;
            if(QDateTime::currentDateTime() < datetime)
            {

                if(old_time > 3)
                {
                    enold() ;
                    old_time = 0 ;
                }
                else
                    old_time++ ;
            }
            else
            {
                enold_flag = 0 ;//����ʱ�䣬��־λ����
            }
        }
    }
    else
    {
        if(ui->pushButton_enold_start->text() == tr("ֹͣ"))
       {
            ui->pushButton_enold_start->setText(tr("��ʼ")) ;
             ui->label_OldTips->setText(tr("�ϻ�����������"));
        }
    }
}

void First_form::on_main_Button_clicked()
{
    ui->stackedWidget->setCurrentIndex(0) ;
}


void First_form::on_pushButton_print_test_clicked()
{
    info2error_dialog(tr("fa�ѷ�����Ϣ������5���ڷ��ͻظ�5���ַ�.")) ;
    QString tx = tr("����: Send by print uart") ;

    ui->plainTextEdit_print->appendPlainText(tx ) ;
   allButton_clicked("COM61") ;
}

void First_form::on_pushButton_wifi_test_clicked()
{
    info2error_dialog(tr("fa�ѷ�����Ϣ������5���ڷ��ͻظ�5���ַ�.")) ;

    QString tx = tr("����: Send by wifi uart") ;

    ui->plainTextEdit_wifi->appendPlainText(tx ) ;
    allButton_clicked("COM62") ;
}

void First_form::on_pushButton_wifi_test_2_clicked()
{
    info2error_dialog(tr("fa�ѷ�����Ϣ������5���ڷ��ͻظ�5���ַ�.")) ;

    QString tx = tr("����: Send by IC uart ") ;

    ui->plainTextEdit_ICCARD->appendPlainText(tx ) ;
    allButton_clicked("COM63") ;
}

void First_form::on_pushButton_read_id_2_clicked()
{
    info2error_dialog(tr("fa�ѷ�����Ϣ������5���ڷ��ͻظ�5���ַ�.")) ;

    QString tx = tr("����: Send by board uart") ;

    ui->plainTextEdit_cpu->appendPlainText(tx ) ;
    allButton_clicked("COM64") ;
}

void First_form::on_pushButton_upload_test_clicked()
{
    info2error_dialog(tr("fa�ѷ�����Ϣ������5���ڷ��ͻظ�5���ַ�.")) ;

    QString tx = tr("����: Send by extern uart ") ;

    ui->plainTextEdit_upload->appendPlainText(tx ) ;
    allButton_clicked("COM65") ;
}

void First_form::auto_test(int sw)
{
    switch(sw)
    {
        case 0:allButton_clicked("COM71") ; break ;
        case 1:allButton_clicked("COM72") ; break ;
        case 2:allButton_clicked("COM73") ; break ;
        case 3:allButton_clicked("COM74") ; break ;
        case 4:allButton_clicked("COM75") ; break ;
        default: ;
    }

}

void First_form::on_pushButton_read_yunsu_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x00,0x00,0x00,0x00,
                       0x00,
                       0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;


    g_com_sw = 1 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_yunsu_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[8] = (unsigned char)(ui->lineEdit_std_yunsu->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_yunsu->text().toInt() % 256) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 1 ;
    allButton_clicked("COM80") ;
}
void First_form::on_pushButton_read_diuka_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x01,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 2 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_diuka_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x01,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[8] = (unsigned char)(ui->lineEdit_std_diukapinlv->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_diukapinlv->text().toInt() % 256) ;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 2 ;
    allButton_clicked("COM80") ;
}


void First_form::on_pushButton_read_jiasubushu_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x10,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 3 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_jiasubushu_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x10,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[8] = (unsigned char)(ui->lineEdit_std_jiasubushu->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_jiasubushu->text().toInt() % 256) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 3 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_jiasupinlv_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x11,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 4 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_jiasupinlv_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x11,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[8] = (unsigned char)(ui->lineEdit_std_jiasupinlv->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_jiasupinlv->text().toInt() % 256) ;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 4 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_pushButton_read_suobu_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x0f,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 5 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_suobu_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x0f,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    //G_COM[8] = (unsigned char)(ui->lineEdit_std_jiasubushu->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->checkBox_suobu->isChecked()) ;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 5 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_disupinlv_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x12,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 6 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_disupinlv_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x12,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[8] = (unsigned char)(ui->lineEdit_std_disupinlv->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_disupinlv->text().toInt() % 256) ;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 6 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_disucishu_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x13,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 7 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_disucishu_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x13,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[8] = (unsigned char)(ui->lineEdit_std_disucishu->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_disucishu->text().toInt() % 256) ;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 7 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_yanse_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x0e,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 8 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_yanse_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x0e,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    //G_COM[8] = (unsigned char)(ui->lineEdit_std_yanse->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->comboBox_yanse->currentIndex()) ;


    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 8 ;
    allButton_clicked("COM80") ;
}
//-------------------------�������------------------------------------
void First_form::on_pushButton_read_yuandiantiaoma_clicked()
{
    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x02,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 9 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_yuandiantiaoma_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x02,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_yuandiantiaoma->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_yuandiantiaoma->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 9 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_tiaomachangdu_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x03,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
            G_COM[9] = 1;

    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 10 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_tiaomachangdu_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x03,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_tiaomachangdu->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_tiaomachangdu->text().toInt() % 256) ;
    qDebug() <<__LINE__ <<__FUNCTION__<<G_COM[7]<<G_COM[8] ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 10 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_tiaomalist_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x07,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 11 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_tiaomalist_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x07,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_tiaomalist->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_tiaomalist->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
   calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 11 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_tiaomajuli_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x08,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 12 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_tiaomajuli_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x08,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_tiaomajuli->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_tiaomajuli->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
      calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 12 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_pushButton_read_tiaomafangda_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x09,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 13 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_tiaomafangda_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x09,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_tiaomafangda->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_tiaomafangda->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 13 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_ceshifangda_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x0b,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 14 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_ceshifangda_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x0b,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_ceshifangda->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_ceshifangda->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 14 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_tiaoxinglianxu_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x0a,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 15 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_tiaoxinglianxu_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x0a,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_tiaoxinglianxu->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_tiaoxinglianxu->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
   calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 15 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_yuandianceshi_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x04,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 16 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_yuandianceshi_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x04,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_yuandianceshi->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_yuandianceshi->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 16 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_chuangkouchangdu_clicked()
{

    unsigned char _com[24]  = {0x01,0x00,0x01,0x02,
                       0x06,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;
    if(this->MulitCard == false)
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 17 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_chuangkouchangdu_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x02,
                       0x06,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;
    memcpy(G_COM, _com, 24) ;

    G_COM[7] = (unsigned char)(ui->lineEdit_std_chuangkouchangdu->text().toInt() / 256) ;
    G_COM[8] = (unsigned char)(ui->lineEdit_std_chuangkouchangdu->text().toInt() % 256) ;
    if(this->MulitCard == true)
        G_COM[9] = 0;
    else
        G_COM[9] = 1;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 17 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_change_tiaoma_clicked()
{
    QString value_str ;// = ui->lineEdit_std_yuandiantiaoma->text() ;
    myHelper::read_config_sig("board.ini", "Bar-Test", "yuandiantiaoma", &value_str) ;
    ui->lineEdit_std_yuandiantiaoma->setText(value_str) ;


    myHelper::read_config_sig("board.ini", "Bar-Test", "tiaomachangdu", &value_str) ;
    ui->lineEdit_std_tiaomachangdu->setText(value_str) ;


    myHelper::read_config_sig("board.ini", "Bar-Test", "tiaomalist", &value_str) ;
    ui->lineEdit_std_tiaomalist->setText(value_str) ;


    myHelper::read_config_sig("board.ini", "Bar-Test", "tiaomajuli", &value_str) ;
    ui->lineEdit_std_tiaomajuli->setText(value_str) ;


    myHelper::read_config_sig("board.ini", "Bar-Test", "tiaomafangda", &value_str) ;
     ui->lineEdit_std_tiaomafangda->setText(value_str) ;


    myHelper::read_config_sig("board.ini", "Bar-Test", "ceshifangda", &value_str) ;
    ui->lineEdit_std_ceshifangda->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Bar-Test", "tiaoxinglianxu", &value_str) ;
    ui->lineEdit_std_tiaoxinglianxu->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Bar-Test", "yuandianceshi", &value_str) ;
    ui->lineEdit_std_yuandianceshi->setText(value_str) ;


    myHelper::read_config_sig("board.ini", "Bar-Test", "chuangkouchangdu", &value_str) ;
    ui->lineEdit_std_chuangkouchangdu->setText(value_str) ;
}

void First_form::on_pushButton_save_tiaoma_clicked()
{

    QString value_str = ui->lineEdit_std_yuandiantiaoma->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "yuandiantiaoma", value_str) ;

    value_str = ui->lineEdit_std_tiaomachangdu->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "tiaomachangdu", value_str) ;

    value_str = ui->lineEdit_std_tiaomalist->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "tiaomalist", value_str) ;

    value_str = ui->lineEdit_std_tiaomajuli->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "tiaomajuli", value_str) ;

    value_str = ui->lineEdit_std_tiaomafangda->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "tiaomafangda", value_str) ;

    value_str = ui->lineEdit_std_ceshifangda->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "ceshifangda", value_str) ;

    value_str = ui->lineEdit_std_tiaoxinglianxu->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "tiaoxinglianxu", value_str) ;

    value_str = ui->lineEdit_std_yuandianceshi->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "yuandianceshi", value_str) ;

    value_str = ui->lineEdit_std_chuangkouchangdu->text() ;
    myHelper::write_config_sig("board.ini", "Bar-Test", "chuangkouchangdu", value_str) ;
}

void First_form::on_pushButton_change_dianji_clicked()
{
    QString value_str ;

    myHelper::read_config_sig("board.ini", "Motor", "yunsu", &value_str) ;
    ui->lineEdit_std_yunsu->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Motor", "diukapinlv", &value_str) ;
    ui->lineEdit_std_diukapinlv->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Motor", "jiasubushu", &value_str) ;
    ui->lineEdit_std_jiasubushu->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Motor", "jiasupinlv", &value_str) ;
    ui->lineEdit_std_jiasupinlv->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Motor", "suobu", &value_str) ;
    ui->checkBox_suobu->setChecked(value_str.toInt()) ;

    myHelper::read_config_sig("board.ini", "Motor", "disupinlv", &value_str) ;
    ui->lineEdit_std_disupinlv->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Motor", "disucishu", &value_str) ;
    ui->lineEdit_std_disucishu->setText(value_str) ;

    myHelper::read_config_sig("board.ini", "Motor", "yanse", &value_str) ;
    ui->comboBox_yanse->setCurrentIndex(value_str.toInt()) ;
}

void First_form::on_pushButton_save_dianji_clicked()
{
    QString value_str = ui->lineEdit_std_yunsu->text() ;
    myHelper::write_config_sig("board.ini", "Motor", "yunsu", value_str) ;

    value_str = ui->lineEdit_std_diukapinlv->text() ;
    myHelper::write_config_sig("board.ini", "Motor", "diukapinlv", value_str) ;

    value_str = ui->lineEdit_std_jiasubushu->text() ;
    myHelper::write_config_sig("board.ini", "Motor", "jiasubushu", value_str) ;

    value_str = ui->lineEdit_std_jiasupinlv->text() ;
    myHelper::write_config_sig("board.ini", "Motor", "jiasupinlv", value_str) ;

    value_str = QString("%1").arg(ui->checkBox_suobu->isChecked()) ;
    myHelper::write_config_sig("board.ini", "Motor", "suobu", value_str) ;

    value_str = ui->lineEdit_std_disupinlv->text() ;
    myHelper::write_config_sig("board.ini", "Motor", "disupinlv", value_str) ;

    value_str = ui->lineEdit_std_disucishu->text() ;
    myHelper::write_config_sig("board.ini", "Motor", "disucishu", value_str) ;

    value_str =  QString("%1").arg(ui->comboBox_yanse->currentIndex()) ;
    myHelper::write_config_sig("board.ini", "Motor", "yanse", value_str) ;

}



static void out_to_pte(QPlainTextEdit *pte, unsigned char G_COM[])
{
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    pte->appendPlainText(QString::fromLocal8Bit("����: ") + QString::fromLocal8Bit(buffer) ) ;

}


void First_form::on_pushButton_read_id_3_clicked()
{
    out_to_pte(ui->plainTextEdit_cpu, (unsigned char*)TH_REF);
    allButton_clicked("COM18");
}


void First_form::on_pushButton_read_yuandiantiaoma_2_clicked()//����·��վ�㲽��
{
    unsigned char _com[24]  = {0x01,0x00,0x01,0x12,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;

    memcpy(G_COM, _com, 24) ;
    G_COM[7] = ui->pushButton->text().toInt();
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 18 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_yuandianceshi_2_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x12,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;

    memcpy(G_COM, _com, 24) ;
    G_COM[7] = ui->pushButton->text().toInt();
    G_COM[8] = (unsigned char)(ui->lineEdit_std_yuandiantiaoma_2->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_yuandiantiaoma_2->text().toInt() % 256) ;
   // wcom2[23]=0xb6 ;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 18 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_tiaoxinglianxu_2_clicked()//�����վ������Ƶ��
{

    char _com[24]  = {0x01,0x00,0x01,0x11,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;

    memcpy(G_COM, _com, 24) ;
    G_COM[7] = ui->pushButton->text().toInt();
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 19 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_tiaoxinglianxu_2_clicked()
{

    char _com[24]  = {0x01,0x00,0x00,0x11,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;

    memcpy(G_COM, _com, 24) ;
    G_COM[7] = ui->pushButton->text().toInt();
    G_COM[8] = (unsigned char)(ui->lineEdit_std_tiaoxinglianxu_2->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_tiaoxinglianxu_2->text().toInt() % 256) ;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 19 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_read_tiaomachangdu_2_clicked()
{

    char _com[24]  = {0x01,0x00,0x01,0x15,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;

    memcpy(G_COM, _com, 24) ;
    G_COM[7] = ui->pushButton->text().toInt();
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 20 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_write_tiaomachangdu_2_clicked()
{


    char _com[24]  = {0x01,0x00,0x00,0x15,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00,
                       0x00,0x00,0x00,0x00 } ;

    memcpy(G_COM, _com, 24) ;
    G_COM[7] = ui->pushButton->text().toInt();
    G_COM[8] = (unsigned char)(ui->lineEdit_std_tiaomachangdu_2->text().toInt() / 256) ;
    G_COM[9] = (unsigned char)(ui->lineEdit_std_tiaomachangdu_2->text().toInt() % 256) ;
    calcCRC(G_COM);

    QString tx ;
    char buffer[80] ;
    for(int j=0; j<24; j++)
    {
        sprintf(&buffer[j*3], "%02X ", G_COM[ j]) ;
    }
    tx = tr("����: ") + QString::fromLocal8Bit(buffer) ;
    ui->plainTextEdit_cpu->appendPlainText(tx ) ;

    g_com_sw = 20 ;
    allButton_clicked("COM80") ;
}

void First_form::on_pushButton_clicked()
{
    int index = ui->pushButton->text().toInt();
    char buf[24];
    memcpy(buf, Offset_dev, 24);
    buf[7] += index;
    buf[23] += index;
    out_to_pte(ui->plainTextEdit_cpu, (unsigned char*)buf);

    sprintf(buf, "COM17%d", index);
    allButton_clicked(buf);
}

void First_form::on_checkBox_clicked()
{
    quint32 val = 0;
    if (ui->checkBox->isChecked())
    {
        val += 1 << 3;
    }
    if (ui->checkBox_2->isChecked())
    {
        val += 1 << 2;
    }
    if (ui->checkBox_3->isChecked())
    {
        val += 1 << 1;
    }
    if (ui->checkBox_4->isChecked())
    {
        val += 1 << 0;
    }
    ui->pushButton->setText(QString::number(val));
}

void First_form::on_radioButton_3_clicked()
{
    this->MulitCard = true;//������
    ui->radioButton_3->setChecked(1);
    ui->radioButton_4->setChecked(0);
}

void First_form::on_radioButton_4_clicked()
{
    this->MulitCard = false;//��ͨ��
    ui->radioButton_3->setChecked(0);
    ui->radioButton_4->setChecked(1);
}
