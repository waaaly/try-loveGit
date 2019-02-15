#ifndef ERRORDIALOG_H
#define ERRORDIALOG_H

#include <QDialog>

namespace Ui {
class ErrorDialog;
}

class ErrorDialog : public QDialog
{
    Q_OBJECT
    
public:
    explicit ErrorDialog(QWidget *parent = 0);
    ~ErrorDialog();
    void SetMessage(const QString &msg, int type) ;

private slots:
    void on_btnOk_clicked();
    void get_error_info(QString sw) ;
    void update_ui() ;
private:
    Ui::ErrorDialog *ui;
signals:
    void beep() ;
};

#endif // ERRORDIALOG_H
