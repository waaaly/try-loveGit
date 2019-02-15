#include "history_edit.h"
#include "ui_history_edit.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <limits.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>

#define FILE_SIZE 300

History_edit::History_edit(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::History_edit)
{
    setWindowFlags(Qt::MSWindowsFixedSizeDialogHint
    | Qt::WindowTitleHint
    | Qt::CustomizeWindowHint);
    //this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框
    ui->setupUi(this);

    QFont font ;
    font.setPointSize(20) ;
    //测试界面
    ui->label_current_num->setFont(font) ;
    ui->label_batch->setFont(font) ;
    ui->label_itemt->setFont(font) ;
    ui->label_batch_2->setFont(font) ;

    font.setPointSize(18) ;
    //ui->label_C_V_2->setFont(font) ;
   // ui->label_C_V_4->setFont(font) ;
    //ui->label_C_V_5->setFont(font) ;
   // ui->label_C_V_6->setFont(font) ;
    /*设置下拉框大小*/
    QStyledItemDelegate* itemDelegate = new QStyledItemDelegate();
    QList<QComboBox *> com_btns = this->findChildren<QComboBox *>();
    foreach (QComboBox * com_btn, com_btns) {
        com_btn->setItemDelegate(itemDelegate) ;
    }

}

History_edit::~History_edit()
{
    delete ui;
}

void History_edit::on_Button_close_clicked()
{
    emit beep() ;
    this->hide() ;
}

void History_edit::on_Button_save_clicked()
{
    emit beep() ;


    int list_count ;
    int sub_size = sizeof(SUB_SAVE_ITEM) ;
    int all_size   = FILE_SIZE + sub_size*25 ;
    int nread ;
    int fd;

    SAVE_ITEM load_item ;
    char buffer[all_size] ;

    /*1打开文件*/
    //QFile file(this->filename) ;

    if( (fd = ::open(this->filename.toLocal8Bit().constData(),  O_RDWR)) < 0 )
    {
        printf("open failed: \n",filename.toLocal8Bit().constData() ) ;
        return ;
    }
    /*2读取主项目*/
   // bzero(buffer, FILE_SIZE) ;
    if( (nread=read(fd, buffer, all_size)) < 0)
    {
        printf("size:", nread);
        printf("read failed \n") ;
        return ;
    }


    bzero(&load_item,FILE_SIZE  ) ;
    memcpy(&load_item, buffer, FILE_SIZE) ;
    //::close(fd) ;

    /*3读取子项目*/
     SUB_SAVE_ITEM tmp_list[25] ;
    //bzero( tmp_list, sub_size*load_item.sub_count) ;
  for(int q=0; q<load_item.sub_count; q++)
    {
           memcpy(&tmp_list[q], &buffer[FILE_SIZE + sub_size*q ], sub_size) ;
    }

    list_count = load_item.sub_count ;

    /*4保存编辑后的数据*/
   memcpy(load_item.sex, ui->comboBox_sex->currentText().toLocal8Bit().constData(), 3);
   memcpy(load_item.p_name, ui->lineEdit_pname->text().toLocal8Bit().constData(),
    ui->lineEdit_pname->text().toLocal8Bit().length() > 10?10:ui->lineEdit_pname->text().toLocal8Bit().length() ) ;//个人信息

    bool ok ;
    int age ;
    age = ui->lineEdit_age_numkeyboard->text().toInt( &ok, 10) ;
    if(ok)
        load_item.age =age ;
    else
        load_item.age =0 ;

     lseek(fd, 0, SEEK_SET) ;//覆盖之前的序列号

    //save
     int w_all_size = FILE_SIZE + sub_size*list_count ;
     uchar b_buffer[w_all_size ] ;
     bzero(b_buffer, w_all_size) ;

    memcpy(b_buffer, &load_item, FILE_SIZE) ;
     for(int q=0; q<list_count; q++)
        memcpy(&b_buffer[FILE_SIZE + q*sub_size], &tmp_list[q], sub_size) ;

     if(write(fd, b_buffer, w_all_size) < 0)
     {
         printf("write failed \n") ;
             return  ;
     }
    ::close(fd) ;

    this->hide() ;
}

void History_edit::show_form(const char *filename)
{

    //printf("file:%s \n",  filename.toLocal8Bit().constData() );
    SAVE_ITEM load_item ;
    uchar buffer[FILE_SIZE] ;

    this->filename = QString::fromLocal8Bit(filename)  ;

    int fd = ::open(filename, O_RDWR);
    if(fd < 0)
    {
        printf("open failed \n") ;
        return  ;
    }
    bzero(buffer, FILE_SIZE) ;
    //读取数据
    if( read(fd, buffer, FILE_SIZE) < 0)
    {
        printf("read failed \n") ;
        return ;
    }
    memcpy(&load_item, buffer, FILE_SIZE) ;

    QList <SUB_SAVE_ITEM> tm_list ;
    SUB_SAVE_ITEM tmp ;
    int list_count ;

    for(int q=0; q<load_item.sub_count; q++)
    {
        int sub_size = sizeof(SUB_SAVE_ITEM) ;
        unsigned char buffer[sub_size] ;

        int nread = read(fd, buffer, sub_size) ;

        if(nread == sub_size)
        {

           memcpy(&tmp, buffer, sub_size) ;

       }
        else
        {
            break ;
        }

        tm_list << tmp ;

    }
    ::close(fd) ;
    list_count = tm_list.count() ;

    //edit
    //QString value = ui->lineEdit_xiangmuxishu->text() ;
    //姓名
    ui->lineEdit_pname->setText(QString::fromLocal8Bit(load_item.p_name)) ;
    //qDebug("%x %x", load_item.sex[0], load_item.sex[1]) ;

    if(load_item.sex[0] == 0xc4)
        ui->comboBox_sex->setCurrentIndex(1) ;
    else if(load_item.sex[0] == 0xc5)
        ui->comboBox_sex->setCurrentIndex(2) ;
    else
        ui->comboBox_sex->setCurrentIndex(0) ;

    ui->lineEdit_age_numkeyboard->setText(QString("%1").arg(int(load_item.age)));
    //样品号
    if(load_item.Nums != 0)
    {
        QString tmp ;
        myHelper::format_num(1, 3, load_item.Nums, &tmp) ;
        ui->label_current_num->setText(tmp);
    }
    else
        ui->label_current_num->setText(QString::fromLocal8Bit(load_item.c_Nums));
   //条码值
    ui->label_batch->setText((QString("%1%2%3").arg(load_item.BarCode[0]&0xFF, 2, 16, QLatin1Char('0'))
                                                                  .arg(load_item.BarCode[1]&0xFF, 2, 16, QLatin1Char('0'))
                                                                  .arg(load_item.BarCode[2]&0xFF, 2, 16, QLatin1Char('0'))).toUpper()
                                                                 .remove(5,1));
    //项目名
    ui->label_itemt->setText(QString::fromLocal8Bit(load_item.Prj_name));
    //浓度值
    ui->tableWidget_result->setRowCount(list_count) ;
    for(int q=0; q<list_count; q++)
    {
        ui->tableWidget_result->setItem(q, 0, new QTableWidgetItem(QString::fromLocal8Bit( tm_list.at(q).Name) ) ) ;
        ui->tableWidget_result->setItem(q, 1, new QTableWidgetItem(QString::fromLocal8Bit( tm_list.at(q).c_value) ) ) ;
        ui->tableWidget_result->setItem(q, 2, new QTableWidgetItem(QString::fromLocal8Bit( tm_list.at(q).Unit) ) ) ;
    }


     //时间
     ui->label_time->setText(QString("%1-%2-%3  ").arg(load_item.Year)
                             .arg((int)load_item.Month)
                             .arg((int)load_item.Day )
                              );
     ui->label_time_2->setText( load_item.Time) ;
    //
    ui->label_batch_2->setText(QString::fromLocal8Bit(load_item.Type)) ;


    this->show();
}

void History_edit:: update_ui()
{

    ui->retranslateUi(this);

}
