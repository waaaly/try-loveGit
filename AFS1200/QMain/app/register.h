#ifndef REGISTER_H
#define REGISTER_H

#include <QDialog>
#include <QLineEdit>
#include <QLabel>
//#include "typewritting/syszuxim.h"
//#include "typewritting/syszuxpinyin.h"

namespace Ui {
class Register;
}

class Register : public QDialog
{
    Q_OBJECT

public:
    explicit Register(QDialog *parent = 0);
    ~Register();
    QLineEdit *name ;
    QLineEdit *code ;
    QLineEdit *address ;
    QLabel *num ;

    QString str_code ;
    QString str_name ;
    QString str_num ;
    QString str_addr ;


private slots:
    void on_btnCancel_clicked();
    void on_btnOk_clicked();
    void show_button() ;
    void update_ui() ;

signals:
    void input_signal() ;
    void beep() ;
private:
    Ui::Register *ui;
};

#endif // REGISTER_H
