#ifndef SELECT_DATE_H
#define SELECT_DATE_H

#include <QDialog>
#include <QDate>
#include <QCalendarWidget>
#include <QLabel>

namespace Ui {
    class Select_date;
}

class Select_date : public QDialog
{
    Q_OBJECT

public:
    explicit Select_date(QWidget *parent = 0);
    ~Select_date();

    int read_year ;
    int up_year ;
    int read_mon ;
    int up_mon ;
    int read_day ;
    int up_day ;

    unsigned char who_calls ; /*1*/


private:
    Ui::Select_date *ui;

private slots:
    void on_histroyButton_show_tomonth_clicked();
    void on_histroyButton_show_toweek_clicked();
    void on_histroyButton_show_today_clicked();
    void on_histroyButton_next_mon_clicked();
    void on_histroyButton_last_mon_clicked();
    void on_histroyButton_next_year_clicked();
    void on_histroyButton_last_year_clicked();
    void on_calendarWidget_currentPageChanged(int year, int month);
    void on_toolButton_clicked();
    void on_toolButton_2_clicked();
    void on_calendarWidget_clicked(QDate date);
     void update_ui() ;
signals:
    void enter_date() ;
};

#endif // SELECT_DATE_H
