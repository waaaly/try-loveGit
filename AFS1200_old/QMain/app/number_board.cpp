#include "number_board.h"
#include "ui_number_board.h"

Number_board::Number_board(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Number_board)
{
    //this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框
    setWindowFlags(Qt::MSWindowsFixedSizeDialogHint
    | Qt::WindowTitleHint
    | Qt::CustomizeWindowHint);
    ui->setupUi(this);
    this->line_edit = ui->lineEdit ;

    connect(ui->pushButton_num2, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num3, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num4, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num5, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num6, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num7, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num8, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num9, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num0, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;
    connect(ui->pushButton_num10, SIGNAL(clicked()), this, SLOT(on_pushButton_num1_clicked()) ) ;

}

Number_board::~Number_board()
{
    delete ui;
}

void Number_board::on_pushButton_num1_clicked()
{
    QPushButton *btn = (QPushButton *)sender();
    //QString objName = btn->objectName();

    ui->lineEdit->setText(ui->lineEdit->text() + btn->text());
}

void Number_board::on_pushButton_delete_clicked()
{
    QString old_str = ui->lineEdit->text() ;
    int old_str_num = old_str.count() ;
    if(old_str_num > 0)
    ui->lineEdit->setText(old_str.remove(old_str_num -1 , 1));
}

void Number_board::on_pushButton_cancel_clicked()
{
    hide( ) ;
}

void Number_board::on_pushButton_enter_clicked()
{
    ex_ine_edit->setText(ui->lineEdit->text()) ;
    hide() ;
}
