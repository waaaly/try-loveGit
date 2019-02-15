#include "his_prj_view_frm.h"
#include "ui_his_prj_view_frm.h"
#include <QGraphicsDropShadowEffect>
#include "ID/uIDCardDef.h"
#include "app/myhelper.h"
#include <QList>
#include <QDateTime>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <QTableWidgetItem>



his_prj_view_frm::his_prj_view_frm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::his_prj_view_frm)
{
    ui->setupUi(this);
    this->setWindowFlags(Qt::FramelessWindowHint);



     QGraphicsDropShadowEffect *shadow_effect = new QGraphicsDropShadowEffect(this);
     shadow_effect->setOffset(-5, 5);
     shadow_effect->setColor(Qt::gray);
     shadow_effect->setBlurRadius(8);

     ui->tableWidget->hide();
     ui->tableWidget->setGraphicsEffect(shadow_effect);
     ui->tableWidget->show();

     shadow_effect = new QGraphicsDropShadowEffect(this);
     shadow_effect->setOffset(-5, 5);
     shadow_effect->setColor(Qt::gray);
     shadow_effect->setBlurRadius(8);

     ui->groupBox->hide();
     ui->groupBox->setGraphicsEffect(shadow_effect);
     ui->groupBox->show();

     shadow_effect = new QGraphicsDropShadowEffect(this);
     shadow_effect->setOffset(-5, 5);
     shadow_effect->setColor(Qt::gray);
     shadow_effect->setBlurRadius(8);

    ui->exit_bt->hide();
    ui->exit_bt->setGraphicsEffect(shadow_effect);
    ui->exit_bt->show();


}

void his_prj_view_frm::show_info(QString path_name)
{
    SAVE_ITEM head;
    QList<SUB_SAVE_ITEM> sub;

    init_ui();
    this->show();

    if (!load_info(path_name, head, sub))
    {
        emit errinfo(QString(tr("加载信息失败！")));
    }
    else
    {
        QString tmp;

        // 设置样品号
        if (head.c_Nums[0])
        {
            tmp = QString::fromLocal8Bit(head.c_Nums);
        }
        ui->yangpinghao_lb->setText(tmp);

        // 设置流水号
        tmp = QString::fromLocal8Bit(head.serial_code).mid(0, 22) ;
        ui->No_lb->setText(tmp);

        // 设置卡码
        tmp =QString("%1%2%3").arg(head.BarCode[0]&0xFF, 2, 16, QLatin1Char('0'))
                .arg(head.BarCode[1]&0xFF, 2, 16, QLatin1Char('0'))
                .arg(head.BarCode[2]&0xFF, 2, 16, QLatin1Char('0'));

        ui->tiaoma_lb->setText(tmp.left(5));

        // 设置项目名
        tmp = QString::fromLocal8Bit(head.Prj_name);
        ui->xiangmu_lb->setText(tmp);

        // 设置姓名
        tmp = QString::fromLocal8Bit(head.p_name);
        ui->xingming_lb->setText(tmp);

        // 设置性别
        tmp = QString::fromLocal8Bit(head.sex);
        ui->xingbie_lb->setText(tmp);
        if(ui->groupBox->title().toLocal8Bit() == "Information")
        {
            if(ui->xingbie_lb->text().toLocal8Bit() == "男")
                ui->xingbie_lb->setText("Male");
            else  if(ui->xingbie_lb->text().toLocal8Bit() == "女")
                ui->xingbie_lb->setText("Female");
            else
                ui->xingbie_lb->setText(" ");
        }
        // 设置年龄
        if (head.age_valuse[0])
        {
            tmp = QString(head.age_valuse);
        }
        else
        {
            tmp = "";
        }
        ui->nianlin_lb->setText(tmp);

        // 设置测试类型
        tmp = QString::fromLocal8Bit(head.Type);
        ui->leixing_lb->setText(tmp);
        qDebug() <<__LINE__ <<__FUNCTION__<< ui->groupBox->title();
        if(ui->groupBox->title().toLocal8Bit() == "Information")//英文状态 2018/09/20
        {
            if(tmp.toLocal8Bit() == "血清/血浆")
                ui->leixing_lb->setText("Serum/Plasma");
            else if(tmp.toLocal8Bit() == "全血")
                ui->leixing_lb->setText("Whole Blood");
            else if(tmp.toLocal8Bit() == "末梢血")
                ui->leixing_lb->setText("Peripheral Blood");
            else if(tmp.toLocal8Bit() == "尿液")
                ui->leixing_lb->setText("Urine");
            else if(tmp.toLocal8Bit() == "质控")
                ui->leixing_lb->setText("QC");
        }

        // 循环设置测试结果

        for (int x = 0; x < sub.count(); x++)
        {

            tmp.sprintf(
                        /* name time Cvalus Unit Xx Xx Xx Xx Tc */
                        "%%1 %-24s%.*f %%2\n\n  Xn: %.*f / %.*f / %.*f / %.*f     Tc: %.*f",
                        //QString::fromLocal8Bit(sub.at(x).Name).toUtf8().constData(),
                        QDateTime::fromTime_t(sub.at(x).time).toString("yyyy-MM-dd HH:mm:ss").toLatin1().data(),
                        sub.at(x).float_decimal,
                        sub.at(x).Cvalue,
                        //sub.at(x).Unit,
                        sub.at(x).float_decimal,
                        sub.at(x).Xx[0],
                        sub.at(x).float_decimal,
                        sub.at(x).Xx[1],
                        sub.at(x).float_decimal,
                        sub.at(x).Xx[2],
                        sub.at(x).float_decimal,
                        sub.at(x).Xx[3],
                        sub.at(x).float_decimal,
                        sub.at(x).TC
            );

            tmp = tmp
                    .arg(QString::fromLocal8Bit(sub.at(x).Name))
                    .arg(QString::fromLocal8Bit(sub.at(x).Unit));

            QTableWidgetItem *tmpt = new QTableWidgetItem(tmp);
            QFont font(tmpt->font());
            font.setPointSize(14);
            tmpt->setFont(font);
            ui->tableWidget->setItem(sub.at(x).channel, 0, tmpt);

        }
    }

}

his_prj_view_frm::~his_prj_view_frm()
{
    delete ui;

}

void his_prj_view_frm::on_exit_bt_clicked()
{
    this->hide();
}

void his_prj_view_frm::update_ui()
{

    ui->retranslateUi(this);

}

bool his_prj_view_frm::load_info(QString path, SAVE_ITEM& head, QList<SUB_SAVE_ITEM>& sub)
{

    char buf[sizeof (SAVE_ITEM) + sizeof (SUB_SAVE_ITEM) * 25];
    SAVE_ITEM *p = (SAVE_ITEM *)buf;
    SUB_SAVE_ITEM *q = (SUB_SAVE_ITEM*)(buf + sizeof (SAVE_ITEM));

    int t_fd ;
    t_fd = ::open( path.toLocal8Bit().constData(), O_RDONLY);

    if(t_fd < 0)
    {
        printf("open data failed.\n") ;
        return false ;
        /**/
    }

    //读取数据
    int len = read(t_fd, buf, sizeof (buf));
    ::close(t_fd) ;
    if (len == -1)
    {
         perror("read");
    }
    else if((unsigned int)len != sizeof (SAVE_ITEM) + p->sub_count * sizeof (SUB_SAVE_ITEM))
    {
        fprintf(stderr, " %s file size error!\n", path.toLatin1().data());
    }
    else
    {
        head = *p;
        for (int x = p->sub_count; x > 0; x--)
        {
            sub << *q;
            q++;
        }
        return true;
    }
    return false;
}

void his_prj_view_frm::init_ui()
{

    ui->yangpinghao_lb->clear();
    ui->No_lb->clear();
    ui->tiaoma_lb->clear();
    ui->xiangmu_lb->clear();
    ui->xingming_lb->clear();
    ui->xingbie_lb->clear();
    ui->nianlin_lb->clear();
    ui->leixing_lb->clear();
    ui->tableWidget->setColumnCount(0);
    ui->tableWidget->setColumnCount(1);
}

