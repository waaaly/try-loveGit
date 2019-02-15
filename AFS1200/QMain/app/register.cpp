#include "register.h"
#include "ui_register.h"
#include "iconhelper.h"
#include "myhelper.h"

Register::Register(QDialog *parent) :
    QDialog(parent),
    ui(new Ui::Register)
{
    ui->setupUi(this);

    this->setWindowFlags(Qt::FramelessWindowHint);
    //?¨¨???¡ã????¡À??¡À¡Á?????¡¤?????
   // this->setAttribute(Qt::WA_DeleteOnClose);
    //?¨¨??????¡Á???
    IconHelper::Instance()->SetIcon(ui->lab_Ico, QChar(0xf015), 12);

    name = ui->name_lineEdit;
    code = ui->code_lineEdit;
    num = ui->num_label;
    address = ui->lineEdit_std_address ;

    QFont font ;
    font.setPointSize(18) ;
    ui->label_4->setFont(font) ;
    ui->label_5->setFont(font) ;
    ui->label_6->setFont(font) ;
    ui->label_7->setFont(font) ;
    name->setFont(font) ;
    code->setFont(font) ;
    num->setFont(font) ;

    ui->btnCancel->hide();
}

Register::~Register()
{
    delete ui;
}

void Register::on_btnCancel_clicked()
{
    emit beep() ;
    this->hide();
}

void Register::on_btnOk_clicked()
{
    emit beep() ;
    str_code = ui->code_lineEdit->text() ;
    str_name = ui->name_lineEdit->text() ;
    str_num = ui->num_label->text() ;
    str_addr = ui->lineEdit_std_address->text() ;
    emit input_signal();
   // this->hide();
}

void  Register::show_button()
{
    ui->btnCancel->show();
}

void Register::update_ui()
{
    ui->retranslateUi(this);
}
