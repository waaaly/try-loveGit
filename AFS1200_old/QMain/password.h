#ifndef PASSWORD_H
#define PASSWORD_H


#include <QWidget>
#include "app/myhelper.h"

namespace Ui {
class password;
}

class password : public QWidget
{
    Q_OBJECT

public:
    explicit password(QWidget *parent = 0);
    ~password();

private slots:
    void on_pushButton_num1_clicked();

    void on_pushButton_enter_clicked();

    void on_pushButton_delete_clicked();

    void on_pushButton_cancel_clicked();

    void show_input(int sw);
    void hide_input(int sw) ;

    void update_ui() ;
signals:
    void info2error_dialog(QString) ;
    void correct_password_project(int) ;
    void correct_password_primary(int) ;
    void beep() ;
private:
    Ui::password *ui;

    int sw_flag ;
};
#endif // PASSWORD_H
