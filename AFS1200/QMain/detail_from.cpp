#include "detail_from.h"
#include "ui_detail_from.h"
#include "app/myhelper.h"
#include <QDebug>
const char *age_unit_list[4][2]
=
{
    {
        "岁", "Year"
    },{

        "月","Month"
    },{
        "周","Week"
    },{
        "天","Day"
    }
};

Detail_from::Detail_from(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Detail_from)
{
     //设置窗体标题栏隐藏
    this->setWindowFlags(Qt::FramelessWindowHint);
    ui->setupUi(this);

    name = ui->lineEdit_pname;
    age = ui->lineEdit_age_numkeyboard;
    sex = ui->comboBox_sex;
    age_unit = ui->comboBox_age_unit;

    pname = " ";
    psex =  0;
    page = " ";
    page_unit = " ";
    prev_unit = 0;

    /*设置下拉框大小*/
    QStyledItemDelegate* itemDelegate = new QStyledItemDelegate();
    QList<QComboBox *> com_btns = this->findChildren<QComboBox *>();
    foreach (QComboBox * com_btn, com_btns) {
        com_btn->setItemDelegate(itemDelegate) ;
    }
    update_ui();
}

Detail_from::~Detail_from()
{
    delete ui;
}

void Detail_from::on_enterButton_clicked()
{
    pname = name->text();
    page = age->text();
    psex = sex->currentIndex();

    page_unit = age_unit->currentText();
    prev_unit = age_unit->currentIndex();  //2017-06-16

    this->hide() ;
}

void Detail_from::on_cancelButton_clicked()
{
    name->setText(pname) ;
    age->setText(page) ;
    sex->setCurrentIndex(psex) ;
    age_unit->setCurrentIndex(prev_unit);   //2017-06-16

    this->hide() ;
}

void Detail_from:: update_ui()
{
    QString language;
    myHelper::read_config_sig ("config.ini", "Set_lis", "language", &language);
    unsigned int lg_sw = (unsigned int)language.toInt();

    while (ui->comboBox_age_unit->count())
    {
        ui->comboBox_age_unit->removeItem(0);
    }
    QStringList list;
    for (int x = 0; x < int (sizeof (age_unit_list) / sizeof (age_unit_list[0])); x++)
    {
        list << GET_AGEUNIT((lg_sw == 0)?age_unit_list[x][0]:age_unit_list[x][1]);
    }
    ui->comboBox_age_unit->addItems(list);
    ui->retranslateUi(this);
}

void Detail_from::on_lineEdit_age_numkeyboard_textChanged(const QString &arg1)
{
    QString text_fixed = QString().sprintf((arg1.contains(QString("."))?"%.1f":"%.0f"),arg1.toFloat());

    if(text_fixed.toFloat() >= 1000)
    {
        if(text_fixed.contains("."))
        {
            text_fixed = "999.9";
        }
        else
        {
            text_fixed = "999";
        }
    }

    if(!arg1.isEmpty())
    {
        ui->lineEdit_age_numkeyboard->setText(text_fixed);
    }
}
