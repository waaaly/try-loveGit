#include "multi_card_set.h"
#include "ui_multi_card_set.h"
#include <QCheckBox>
#include <QTextCodec>
#include <QSettings>

Multi_card_set::Multi_card_set(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Multi_card_set)
{
    this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框

    ui->setupUi(this);
    list = ui->tableWidget ;
}

Multi_card_set::~Multi_card_set()
{
    delete ui;
}

void Multi_card_set::on_pushButton_ok_clicked()
{
    emit save_multi_item_signal() ;
    this->hide() ;
}

void Multi_card_set::on_pushButton_cal_clicked()
{
    this->hide() ;
}
void Multi_card_set::update_ui()
{
    ui->retranslateUi(this);
}
