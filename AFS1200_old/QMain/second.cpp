#include "second.h"
#include "ui_second.h"
#include "app/iconhelper.h"

Second::Second(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Second)
{
    ui->setupUi(this);
    //设置窗体标题栏隐藏
    this->setWindowFlags(Qt::FramelessWindowHint);
    //设置窗体关闭时自动释放内存
    this->setAttribute(Qt::WA_DeleteOnClose);
    //设置图形字体
    IconHelper::Instance()->SetIcon(ui->lab_Ico, QChar(0xf015), 12);
    IconHelper::Instance()->SetIcon(ui->btnMenu_Close, QChar(0xf00d), 10);
    //关联关闭按钮
    QObject::connect(ui->btnMenu_Close, SIGNAL(clicked()), this, SLOT(on_btnClose_slot()));

}

Second::~Second()
{
    delete ui;
}

void Second::on_btnClose_slot()
{
    this->hide();
}
