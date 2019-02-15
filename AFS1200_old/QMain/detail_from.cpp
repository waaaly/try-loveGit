#include "detail_from.h"
#include "ui_detail_from.h"

Detail_from::Detail_from(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Detail_from)
{
    setWindowFlags(Qt::MSWindowsFixedSizeDialogHint
    | Qt::WindowTitleHint
    | Qt::CustomizeWindowHint);
    ui->setupUi(this);
    //设置窗体标题栏隐藏
    //this->setWindowFlags(Qt::FramelessWindowHint);

    name = ui->lineEdit_pname;
    age = ui->lineEdit_age_numkeyboard;
    sex = ui->comboBox_sex;


    pname = " ";
    psex =  0;
    page = " ";
    /*设置下拉框大小*/
    QStyledItemDelegate* itemDelegate = new QStyledItemDelegate();
    QList<QComboBox *> com_btns = this->findChildren<QComboBox *>();
    foreach (QComboBox * com_btn, com_btns) {
        com_btn->setItemDelegate(itemDelegate) ;
    }
}

Detail_from::~Detail_from()
{
    delete ui;
}

void Detail_from::on_enterButton_clicked()
{
    emit beep() ;
    pname = name->text();
    page = age->text();
    psex = sex->currentIndex();

    this->hide() ;
}

void Detail_from::on_cancelButton_clicked()
{
    emit beep() ;
    name->setText(pname) ;
    age->setText(page) ;
    sex->setCurrentIndex(psex) ;

    this->hide() ;
}

void Detail_from:: update_ui()
{

    ui->retranslateUi(this);

}
