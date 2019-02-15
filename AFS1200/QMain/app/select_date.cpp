#include "select_date.h"
#include "ui_select_date.h"
#include <QDebug>

Select_date::Select_date(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Select_date)
{
   // setWindowFlags(Qt::MSWindowsFixedSizeDialogHint
   // | Qt::WindowTitleHint
   // | Qt::CustomizeWindowHint);
    this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框

    ui->setupUi(this);

    if(ui->histroyButton_show_today->text() == "Today")
    {
        ui->lineEdit_end->setText(QDate::currentDate().toString("MM-dd-yyyy")) ;
        ui->lineEdit_start->setText(QDate::currentDate().toString("MM-dd-yyyy"));
    }
    else
   {
        ui->lineEdit_start->setText(QDate::currentDate().toString("yyyy-MM-dd")) ;
        ui->lineEdit_end->setText(QDate::currentDate().toString("yyyy-MM-dd")) ;
    }

    QStringList c_today = QDate::currentDate().toString("yyyy-MM-dd").split("-") ;

    ui->label_year->setText(c_today.at(0)) ;
    ui->label_mon->setText(c_today.at(1)) ;

    read_year = c_today.at(0).toInt();
    read_mon = c_today.at(1).toInt();
    read_day = c_today.at(2).toInt();

    up_year = c_today.at(0).toInt();
    up_mon = c_today.at(1).toInt();
    up_day = c_today.at(2).toInt();
}

Select_date::~Select_date()
{
    delete ui;
}

void Select_date::on_calendarWidget_clicked(QDate date)
{
    if(ui->radioButton_start->isChecked())
    {
        if(ui->histroyButton_show_today->text() == "Today")
            ui->lineEdit_start->setText(date.toString("MM-dd-yyyy")) ;
        else
            ui->lineEdit_start->setText(date.toString("yyyy-MM-dd")) ;
    }
    else
    {
        if(ui->histroyButton_show_today->text() == "Today")
            ui->lineEdit_end->setText(date.toString("MM-dd-yyyy")) ;
        else
            ui->lineEdit_end->setText(date.toString("yyyy-MM-dd")) ;
    }

}

void Select_date::on_toolButton_2_clicked()
{
    this->hide() ;
}

void Select_date::on_toolButton_clicked()
{
    QStringList read = ui->lineEdit_start->text().split("-") ;
    QStringList up_date = ui->lineEdit_end->text().split("-") ;

    if(read.count()>=2 && up_date.count()>=2)
    {
        if(ui->histroyButton_show_today->text() == "Today")
        {
            read_year = read.at(2).toInt();
            read_mon = read.at(0).toInt();
            read_day = read.at(1).toInt();
            up_year = up_date.at(2).toInt();
            up_mon = up_date.at(0).toInt();
            up_day = up_date.at(1).toInt();
        }
        else
        {
            read_year = read.at(0).toInt();
            read_mon = read.at(1).toInt();
            read_day = read.at(2).toInt();
            up_year = up_date.at(0).toInt();
            up_mon = up_date.at(1).toInt();
            up_day = up_date.at(2).toInt();
        }

        emit enter_date() ;
    }
    this->hide() ;
}

void Select_date::on_calendarWidget_currentPageChanged(int year, int month)
{
    ui->label_year->setText(QString("%1").arg(year)) ;
    ui->label_mon->setText(QString("%1").arg(month)) ;
}

void Select_date::on_histroyButton_last_year_clicked()
{
    ui->calendarWidget->showPreviousYear() ;
}

void Select_date::on_histroyButton_next_year_clicked()
{
    ui->calendarWidget->showNextYear() ;
}

void Select_date::on_histroyButton_last_mon_clicked()
{
    ui->calendarWidget->showPreviousMonth() ;
}

void Select_date::on_histroyButton_next_mon_clicked()
{
    ui->calendarWidget->showNextMonth() ;
}

void Select_date::on_histroyButton_show_today_clicked()
{
    QStringList c_today = QDate::currentDate().toString("yyyy-MM-dd").split("-") ;
    read_year = c_today.at(0).toInt();
    read_mon = c_today.at(1).toInt();
    read_day = c_today.at(2).toInt();

    up_year = c_today.at(0).toInt();
    up_mon = c_today.at(1).toInt();
    up_day = c_today.at(2).toInt();

    emit enter_date() ;
    this->hide() ;
}

void Select_date::on_histroyButton_show_toweek_clicked()
{
    QDate today = QDate::currentDate() ;
    QDate low_day ;

    int week_num = today.dayOfWeek() ;                              //星期的枚举序号，星期一（1），星期天（7）

    //qDebug() << week_num ;
    /*确定起始日期为星期天*/
    if(week_num != 7)
    {
        low_day = today.addDays(-week_num) ;                    //日期

        QStringList c_low_day = low_day.toString("yyyy-MM-dd").split("-") ;
        read_year = c_low_day.at(0).toInt();
        read_mon = c_low_day.at(1).toInt();
        read_day = c_low_day.at(2).toInt();

        QStringList c_today = today.toString("yyyy-MM-dd").split("-") ;
        up_year = c_today.at(0).toInt();
        up_mon = c_today.at(1).toInt();
        up_day = c_today.at(2).toInt();



        //up_daty = today.addDays((6-week_num)) ;
    }
    else
    {
        QStringList c_today = today.toString("yyyy-MM-dd").split("-") ;
        read_year = c_today.at(0).toInt();
        read_mon = c_today.at(1).toInt();
        read_day = c_today.at(2).toInt();

        up_year = c_today.at(0).toInt();
        up_mon = c_today.at(1).toInt();
        up_day = c_today.at(2).toInt();

    }
    emit enter_date() ;
    this->hide() ;
}

void Select_date::on_histroyButton_show_tomonth_clicked()
{
    QDate today = QDate::currentDate() ;

    QStringList c_today = today.toString("yyyy-MM-dd").split("-") ;
    read_year = c_today.at(0).toInt();
    read_mon = c_today.at(1).toInt();
    read_day = 1 ;

    up_year = c_today.at(0).toInt();
    up_mon = c_today.at(1).toInt();
    up_day = today.day();

    //qDebug() << up_day ;


    emit enter_date() ;
    this->hide() ;
}

void Select_date::update_ui()
{
    ui->retranslateUi(this);
     if(ui->histroyButton_show_today->text() == "Today")
    {
        ui->lineEdit_end->setText(QDate::currentDate().toString("MM-dd-yyyy")) ;
        ui->lineEdit_start->setText(QDate::currentDate().toString("MM-dd-yyyy"));
    }

    else
   {
        ui->lineEdit_start->setText(QDate::currentDate().toString("yyyy-MM-dd")) ;
        ui->lineEdit_end->setText(QDate::currentDate().toString("yyyy-MM-dd")) ;
    }
}
