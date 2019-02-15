#include "password.h"
#include "ui_password.h"
#include <QDebug>

password::password(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::password)
{
    ui->setupUi(this);
    this->setWindowFlags(Qt::FramelessWindowHint);//不要菜单栏和标题框
    this->setAttribute(Qt::WA_DeleteOnClose);
    ui->lineEdit->setEchoMode(QLineEdit::Password);

    connect(ui->pushButton_num2, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num3, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num4, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num5, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num6, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num7, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num8, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num9, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num0, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;

    sw_flag = 0 ;
}

password::~password()
{
    delete ui;
}

void password::on_pushButton_num1_clicked()
{
    emit beep() ;
    QPushButton *btn = (QPushButton *)sender();
    QString objName = btn->objectName();
    if(objName == "pushButton_num1")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "1");
    }
    else if(objName == "pushButton_num2")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "2");
    }
    else if(objName == "pushButton_num3")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "3");
    }
    else if(objName == "pushButton_num4")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "4");
    }
    else if(objName == "pushButton_num5")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "5");
    }
    else if(objName == "pushButton_num6")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "6");
    }
    else if(objName == "pushButton_num7")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "7");
    }
    else if(objName == "pushButton_num8")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "8");
    }
    else if(objName == "pushButton_num9")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "9");
    }
    else if(objName == "pushButton_num0")
    {
        ui->lineEdit->setText(ui->lineEdit->text() + "0");
    }
}

void password::on_pushButton_enter_clicked()
{
    emit beep() ;
    if(ui->lineEdit->text() == "1212")
    {
        this->hide();
        switch(sw_flag)
        {
            case 1: emit correct_password_project(1);break ;
            case 2: emit correct_password_primary(1);break ;
            case 3: emit correct_password_project(3);break ;
            case 4: emit correct_password_primary(2);break ;
        }
    }
    else
    {
        emit info2error_dialog(tr("密码错误！"));
    }
}

void password::on_pushButton_delete_clicked()
{
    emit beep() ;
    QString old_str = ui->lineEdit->text() ;
    int old_str_num = old_str.count() ;
    if(old_str_num > 0)
    ui->lineEdit->setText(old_str.remove(old_str_num -1 , 1));
}

void password::on_pushButton_cancel_clicked()
{
    emit beep() ;
    this->hide() ;
    if(sw_flag == 2 || sw_flag == 4)
    {
       emit correct_password_primary(0);
    }
}

void password:: show_input(int sw)
{
    ui->lineEdit->clear();

     sw_flag =sw ;

    this->show();
}
void password:: hide_input(int sw)
{
    ui->lineEdit->clear() ;
    this->hide() ;
}
void password:: update_ui()
{

    ui->retranslateUi(this);

}
