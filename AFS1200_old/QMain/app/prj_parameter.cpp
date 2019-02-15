#include "prj_parameter.h"
#include "ui_prj_parameter.h"

Prj_parameter::Prj_parameter(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Prj_parameter)
{
   // this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框
    setWindowFlags(Qt::MSWindowsFixedSizeDialogHint
    | Qt::WindowTitleHint
    | Qt::CustomizeWindowHint);
    ui->setupUi(this);

    QFont font  ;
    font.setPointSize(18) ;
    ui->label->setFont(font) ;

    prj_name = ui->label ;
    low_edit   = ui->lineEdit_low_numkeyboard ;
    up_edit    = ui->lineEdit_up_numkeyboard ;

}

Prj_parameter::~Prj_parameter()
{
    delete ui;
}

void Prj_parameter::on_enterButton_clicked()
{
    hide() ;
    emit save_edit( ) ;
}

void Prj_parameter::on_cancelButton_clicked()
{
    hide() ;
}
