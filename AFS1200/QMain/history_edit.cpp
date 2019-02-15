#include "history_edit.h"
#include "ui_history_edit.h"
#include <QDebug>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <limits.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>
#include <QElapsedTimer>
#include "detail_from.h"

#define FILE_SIZE sizeof (SAVE_ITEM)

History_edit::History_edit(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::History_edit)
{

    //设置编码
    myHelper::SetGBK2312Code() ;
    this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框
    ui->setupUi(this);

    QFont font ;
    font.setPointSize(20) ;
    //测试界面
    //ui->label_current_num->setFont(font) ;
    ui->label_batch->setFont(font) ;
    ui->label_itemt->setFont(font) ;
    ui->label_batch_2->setFont(font) ;
    ui->label_serial->setFont(font) ;

    font.setPointSize(18) ;

    /*设置下拉框大小*/
    QStyledItemDelegate* itemDelegate = new QStyledItemDelegate();
    QList<QComboBox *> com_btns = this->findChildren<QComboBox *>();
    foreach (QComboBox * com_btn, com_btns) {
        com_btn->setItemDelegate(itemDelegate) ;
    }
    this->isEN =myHelper::read_config_sig("config.ini",
                                                "Set_lis",
                                                "language").toInt() ;
    update_ui();

}

History_edit::~History_edit()
{
    delete ui;
}

void History_edit::on_Button_close_clicked()
{
    this->hide() ;
}

void History_edit::on_Button_save_clicked()
{
#define all_size (FILE_SIZE+sizeof(SUB_SAVE_ITEM)*25)
    char *buffer = new char[all_size] ;
    int nread ;
    int fd;

    SAVE_ITEM *Item = (SAVE_ITEM*)buffer;
    SUB_SAVE_ITEM *SubItem = (SUB_SAVE_ITEM*)(buffer + sizeof (SAVE_ITEM));

    if( (fd = ::open(this->filename.toLocal8Bit().constData(),  O_RDWR)) < 0 )
    {
        printf("open failed: %s\n",filename.toLocal8Bit().constData() ) ;
        delete [] buffer;
        return ;
    }

    if( (nread=read(fd, buffer, all_size)) < 0)
    {
        printf("size:%d\n", nread);
        printf("read failed \n") ;
        delete [] buffer;
        ::close(fd);
        return ;
    }
    bzero(buffer + nread, all_size - nread) ;

    for(int q = 0; q < Item->sub_count; q++)
    {
        QLineEdit *newLineEdit = qobject_cast<QLineEdit*>(ui->tableWidget_result->cellWidget(q, 1)) ;
        if(newLineEdit)
        {
            bzero(SubItem[q].c_value, sizeof (SubItem[q].c_value)) ;
            strncpy(SubItem[q].c_value, newLineEdit->text().toLocal8Bit().constData(), sizeof (SubItem[q].c_value)) ;
            SubItem[q].Cvalue = newLineEdit->text().toFloat() ;
        }
    }

    /*4保存编辑后的数据*/
    strncpy(Item->p_name, ui->lineEdit_pname->text().toLocal8Bit().constData(), sizeof (Item->p_name));
    if(ui->comboBox_sex->currentIndex() == 1)
        strncpy(Item->sex, "男", sizeof (Item->sex));
    else if(ui->comboBox_sex->currentIndex() == 2)
        strncpy(Item->sex, "女", sizeof (Item->sex));
     else
        strncpy(Item->sex, ui->comboBox_sex->currentText().toLocal8Bit().constData(), sizeof (Item->sex));

    if (ui->lineEdit_age_numkeyboard->text().isEmpty())
    {
        Item->age_valuse[0] = 0;
    }
    else
    {
        Item->age_index = ui->comboBox_age_unit->currentIndex();

        QString age_show = QString().sprintf((
                                                 ui->lineEdit_age_numkeyboard->text().contains(QString("."))?
                                                     "%.1f":"%.0f"),
                                             ui->lineEdit_age_numkeyboard->text().toFloat());
        strncpy(Item->age_valuse, qPrintable(age_show), sizeof (Item->age_valuse)) ;
    }
    lseek(fd, 0, SEEK_SET) ;//覆盖之前的序列号

    if(write(fd, buffer, nread) < 0)
    {
        printf("write failed \n") ;
    }
    else
    {
        this->hide() ;
        emit save_signal();
    }
    ::close(fd) ;
    delete [] buffer;
#undef all_size
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
        ::close(fd);
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


    ui->lineEdit_pname->setText(QString::fromLocal8Bit(load_item.p_name)) ;
    QString sex_temp = QString::fromLocal8Bit((load_item.sex));
    if(sex_temp.toLocal8Bit() == "男")
        ui->comboBox_sex->setCurrentIndex(1) ;
    else if(sex_temp.toLocal8Bit() == "女")
         ui->comboBox_sex->setCurrentIndex(2) ;
    else
          ui->comboBox_sex->setCurrentIndex(0) ;

    if (load_item.age_valuse[0])
    {
        ui->lineEdit_age_numkeyboard->setText(QString(load_item.age_valuse));
        ui->comboBox_age_unit->setCurrentIndex(load_item.age_index);
    }
    else
    {
        ui->lineEdit_age_numkeyboard->clear();

    }
    // 流水号
    ui->label_serial->setText(QString::fromLocal8Bit(load_item.serial_code)) ;
    // 样本号
    if (load_item.c_Nums[0])
    {
        ui->label_current_num->setText(QString::fromLocal8Bit(load_item.c_Nums));
    }
    else
    {
        ui->label_current_num->clear();
    }
   //条码值
    ui->label_batch->setText((QString("%1%2%3").arg(load_item.BarCode[0]&0xFF, 2, 16, QLatin1Char('0'))
                                                                  .arg(load_item.BarCode[1]&0xFF, 2, 16, QLatin1Char('0'))
                                                                  .arg(load_item.BarCode[2]&0xFF, 2, 16, QLatin1Char('0'))).toUpper()
                                                                 .remove(5,1));
    //项目名
    ui->label_itemt->setText(QString::fromLocal8Bit(load_item.Prj_name));
    ui->tableWidget_result->setRowCount(0) ;
    //浓度值
    ui->tableWidget_result->setRowCount(list_count) ;


    ui->tableWidget_result->setColumnWidth(0, 80);
    ui->tableWidget_result->setColumnWidth(1, 80);
    ui->tableWidget_result->setColumnWidth(2, 80);
    ui->tableWidget_result->setColumnWidth(3, 120);
    ui->tableWidget_result->setColumnWidth(4, 160);

    for(int q=0; q<list_count; q++)
    {
        ui->tableWidget_result->setItem(q, 0, new QTableWidgetItem(QString::fromLocal8Bit( tm_list.at(q).Name) ) ) ;
        ui->tableWidget_result->setItem(q, 1, new QTableWidgetItem(QString::fromLocal8Bit( tm_list.at(q).c_value) ) ) ;
        ui->tableWidget_result->setItem(q, 2, new QTableWidgetItem(QString::fromLocal8Bit( tm_list.at(q).Unit) ) ) ;
        ui->tableWidget_result->setItem(q, 3, new QTableWidgetItem(tm_list.at(q).channel==5?
                                                                                                (this->isEN?"Single Channel":tr("单通道"))
                                                                                                :QString::number( tm_list.at(q).channel + 1) ) ) ;
        ui->tableWidget_result->setItem(q, 4, new QTableWidgetItem(QDateTime::fromTime_t( tm_list.at(q).time).toString("yyyy-MM-dd HH:mm:ss") ) ) ;
    }

    ui->label_batch_2->setText(QString::fromLocal8Bit(load_item.Type)) ;

    if(this->isEN)
     {
        QString temp_Type = QString::fromLocal8Bit(load_item.Type);
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
    this->show();
}

void History_edit:: update_ui()
{
    QString language;
    myHelper::read_config_sig ("config.ini", "Set_lis", "language", &language);
    unsigned int lg_sw = (unsigned int)language.toInt();
    if (lg_sw > 1)
    {
        lg_sw = 0;
    }
    while (ui->comboBox_age_unit->count())
    {
        ui->comboBox_age_unit->removeItem(0);
    }
    QStringList list;
    for (int x = 0; x < int (sizeof (age_unit_list) / sizeof (age_unit_list[0])); x++)
    {
       list << GET_AGEUNIT(age_unit_list[x][lg_sw]);
    }
    ui->comboBox_age_unit->addItems(list);

    ui->retranslateUi(this);
    this->isEN =myHelper::read_config_sig("config.ini",
                                                "Set_lis",
                                                "language").toInt() ;
}



void History_edit::on_toolButton_pressed()
{
    static bool is_waitting = 0 ;
    if(!is_waitting)
    {
        int i ;
        is_waitting = 1 ;
        QElapsedTimer t;
        for( i=0; i<5000; i++)
        {
            if(!ui->toolButton->isDown())
                break ;
            else
            {
                t.start();
                while(t.elapsed()<1)
                QCoreApplication::processEvents();
            }

        }

        is_waitting = 0 ;
        if(i >= 5000)
        {
            //printf("isDown!!!!!!!!!!!\n") ;
            int rows = ui->tableWidget_result->rowCount() ;
            for(int k=0; k<rows; k++)
            {
                QString tx = ui->tableWidget_result->item(k, 1)->text() ;
                QLineEdit *lineEdit_std = new QLineEdit() ;
                lineEdit_std->setObjectName(QString("lineEdit_std_%1").arg(k)) ;

                lineEdit_std->setText(tx) ;
                ui->tableWidget_result->removeCellWidget(k, 1) ;
                ui->tableWidget_result->setCellWidget(k, 1, lineEdit_std) ;
            }
        }
    }
}
