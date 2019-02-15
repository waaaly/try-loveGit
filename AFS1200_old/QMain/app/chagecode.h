#ifndef CHAGECODE_H
#define CHAGECODE_H

#include <QDialog>
#include <QLineEdit>

namespace Ui {
    class ChageCode;
}

class ChageCode : public QDialog
{
    Q_OBJECT

public:
    explicit ChageCode(QWidget *parent = 0);
    ~ChageCode();
   QLineEdit *lineedit ;
   QLineEdit *gun_lineedit ;
   QLineEdit *final_use_line ;
   QString new_code ;
   QString old_code ;
   int page ;
   int row ;

private:
    Ui::ChageCode *ui;

private slots:
    void on_checkBox_usegun_clicked();
    void on_lineEdit_textChanged(QString );
    void on_pushButton_cancel_clicked();
    void on_pushButton_ok_clicked();
signals:
    void save_edit() ;
};

#endif // CHAGECODE_H
