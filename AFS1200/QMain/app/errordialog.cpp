#include "errordialog.h"
#include "ui_errordialog.h"
#include "iconhelper.h"
#include "myhelper.h"
#include <QDebug>
ErrorDialog::ErrorDialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ErrorDialog)
{
    ui->setupUi(this);

    //this->mousePressed = false;
    //���ô������������
    this->setWindowFlags(Qt::FramelessWindowHint);
    //���ô���ر�ʱ�Զ��ͷ��ڴ�
   // this->setAttribute(Qt::WA_DeleteOnClose);
    //����ͼ������
    IconHelper::Instance()->SetIcon(ui->lab_Ico, QChar(0xf015), 12);
    //IconHelper::Instance()->SetIcon(ui->btnMenu_Close, QChar(0xf00d), 10);
    //�����رհ�ť
   // connect(ui->btnMenu_Close, SIGNAL(clicked()), this, SLOT(close()));
   // connect(ui->btnCancel, SIGNAL(clicked()), this, SLOT(close()));
    //���������ʾ

    //this->setCursor(Qt::BlankCursor);   //�������
       //this->setCursor(Qt::ArrowCursor);  //��ʾ�������
       //this��Ϊ��Ҫ�������Ĳ������Ϳ��������ƶ����ò���ʱ��Ч����Ч��
    this->isEN = myHelper::read_config_sig("config.ini",
                                                "Set_lis",
                                                "language").toInt() ;
}

void ErrorDialog::SetMessage(const QString &msg, int type)
{

    this->setCursor(Qt::BlankCursor);   //�������
       //this->setCursor(Qt::ArrowCursor);  //��ʾ�������
       //this��Ϊ��Ҫ�������Ĳ������Ϳ��������ƶ����ò���ʱ��Ч����Ч��
    //��ʾ��Ϣ��
    if (type == 0)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/info.png);");
        ui->btnCancel->setVisible(false);   //ȡ����ť���ɼ�
        ui->btnOk->setVisible(true);
        ui->lab_Title->setText((this->isEN?"Tips":tr("��ʾ")));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    //ѯ����Ϣ��
    else if (type == 1)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/question.png);");
        ui->lab_Title->setText((this->isEN?"Ask":tr("ѯ��")));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    //������Ϣ��
    else if (type == 2)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/error.png);");
        ui->btnCancel->setVisible(false);
        ui->btnOk->setVisible(true);
         ui->lab_Title->setText((this->isEN?"Error":tr("����")));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    else if (type == 3)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/question.png);");
        ui->btnOk->setVisible(false);
        ui->btnCancel->setVisible(false);   //ȡ����ť���ɼ�
        ui->lab_Title->setText((this->isEN?"Tips":tr("��ʾ")));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }

    ui->labInfo->setText(msg);
    ui->labInfo->setStyleSheet("font-size:24px");
}

void ErrorDialog::on_btnOk_clicked()
{
    this->hide();
}

void ErrorDialog::get_error_info(QString sw)
{
    if(sw.mid(0,2) == "fs")
    {
        QString sw_1 = sw.remove(0,2) ;
        SetMessage(sw_1, 3) ;
        this->show();
    }
    else if(sw.mid(0,2) == "fa")
    {
        QString sw_1 = sw.remove(0,2) ;
        SetMessage(sw_1, 0) ;
        this->show();
    }
    else if(sw.mid(0,2) == "ex")
    {
        this->hide();
    }
    else
    {
        SetMessage(sw, 2) ;
        this->show();
    }

}

ErrorDialog::~ErrorDialog()
{
    delete ui;
}

void ErrorDialog::update_ui()
{
     ui->retranslateUi(this);
     this->isEN = myHelper::read_config_sig("config.ini",
                                                 "Set_lis",
                                                 "language").toInt() ;
}
