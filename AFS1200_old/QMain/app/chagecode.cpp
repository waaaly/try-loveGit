#include "chagecode.h"
#include "ui_chagecode.h"
#include <QTextCodec>

ChageCode::ChageCode(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ChageCode)
{
    //���ñ���
    QTextCodec *codec=QTextCodec::codecForName("GB2312");
    QTextCodec::setCodecForLocale(codec);

     QTextCodec::setCodecForTr(QTextCodec::codecForName("GB2312"));     //Ҫ�� setupUI֮ǰ����ȻUI�Ͳ��Ǹñ���

     //this->setWindowFlags(Qt::FramelessWindowHint );                              //��Ҫ�˵����ͱ����
     setWindowFlags(Qt::MSWindowsFixedSizeDialogHint
     | Qt::WindowTitleHint
     | Qt::CustomizeWindowHint);

    ui->setupUi(this);



    lineedit = ui->lineEdit_std6 ;
    gun_lineedit = ui->lineEdit_gun ;
    ui->lineEdit_std6->setVisible(0) ;

    QFont font ;
    font = ui->label_warning->font() ;
    QPalette pe;
    pe.setColor(QPalette::WindowText,Qt::red);

    font.setPointSize(16) ;
    ui->label_warning->setFont(font) ;
    ui->label_warning->setPalette(pe);
}

ChageCode::~ChageCode()
{
    delete ui;
}

void ChageCode::on_pushButton_ok_clicked()
{
    QLineEdit *tmp_line ;
    if(ui->checkBox_usegun->isChecked())
    {
        tmp_line = ui->lineEdit_gun ;
        final_use_line = ui->lineEdit_gun ;
    }
    else
    {
        tmp_line = ui->lineEdit_std6 ;
        final_use_line = ui->lineEdit_std6 ;
    }

    if(tmp_line->text().length() > 22)
    {
        ui->label_warning->setText(tr("���벻�ó���22���ַ�!")) ;
        return ;
    }
    else if(tmp_line->text().isEmpty())
    {
        ui->label_warning->setText(tr("���벻��Ϊ��!")) ;
        return ;
    }
    ui->label_warning->clear() ;
    emit save_edit() ;
    hide() ;
}

void ChageCode::on_pushButton_cancel_clicked()
{
    ui->label_warning->clear() ;
    hide() ;
}

void ChageCode::on_lineEdit_textChanged(QString )
{
    if(ui->lineEdit_std6->text().toLocal8Bit().length() > 22)
    {
        //ui->pushButton_ok->setVisible(0) ;
        //ui->label_2->setVisible(1) ;
    }
    else
    {
        //ui->pushButton_ok->setVisible(1) ;
        //ui->label_2->setVisible(0) ;
    }
}

void ChageCode::on_checkBox_usegun_clicked()
{
    if(ui->checkBox_usegun->isChecked() )
    {
        ui->lineEdit_std6->setVisible(0) ;
        ui->lineEdit_gun->setVisible(1) ;
    }
    else
    {
        ui->lineEdit_std6->setVisible(1) ;
        ui->lineEdit_gun->setVisible(0) ;
    }
}
