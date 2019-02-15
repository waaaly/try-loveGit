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
    //设置窗体标题栏隐藏
    this->setWindowFlags(Qt::FramelessWindowHint);
    //设置窗体关闭时自动释放内存
   // this->setAttribute(Qt::WA_DeleteOnClose);
    //设置图形字体
    IconHelper::Instance()->SetIcon(ui->lab_Ico, QChar(0xf015), 12);
    //IconHelper::Instance()->SetIcon(ui->btnMenu_Close, QChar(0xf00d), 10);
    //关联关闭按钮
   // connect(ui->btnMenu_Close, SIGNAL(clicked()), this, SLOT(close()));
   // connect(ui->btnCancel, SIGNAL(clicked()), this, SLOT(close()));
    //窗体居中显示

    //this->setCursor(Qt::BlankCursor);   //隐藏鼠标
       //this->setCursor(Qt::ArrowCursor);  //显示正常鼠标
       //this改为需要隐藏鼠标的部件，就可以令当鼠标移动到该部件时候，效果生效。
    this->isEN = myHelper::read_config_sig("config.ini",
                                                "Set_lis",
                                                "language").toInt() ;
}

void ErrorDialog::SetMessage(const QString &msg, int type)
{

    this->setCursor(Qt::BlankCursor);   //隐藏鼠标
       //this->setCursor(Qt::ArrowCursor);  //显示正常鼠标
       //this改为需要隐藏鼠标的部件，就可以令当鼠标移动到该部件时候，效果生效。
    //提示消息框
    if (type == 0)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/info.png);");
        ui->btnCancel->setVisible(false);   //取消按钮不可见
        ui->btnOk->setVisible(true);
        ui->lab_Title->setText((this->isEN?"Tips":tr("提示")));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    //询问消息框
    else if (type == 1)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/question.png);");
        ui->lab_Title->setText((this->isEN?"Ask":tr("询问")));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    //错误消息框
    else if (type == 2)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/error.png);");
        ui->btnCancel->setVisible(false);
        ui->btnOk->setVisible(true);
         ui->lab_Title->setText((this->isEN?"Error":tr("错误")));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    else if (type == 3)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/question.png);");
        ui->btnOk->setVisible(false);
        ui->btnCancel->setVisible(false);   //取消按钮不可见
        ui->lab_Title->setText((this->isEN?"Tips":tr("提示")));
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
