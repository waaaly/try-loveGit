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
    int isEN;//中文为 0 ，英文为 1
};

#endif // ERRORDIALOG_H
