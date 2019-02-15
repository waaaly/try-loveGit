#ifndef PRJ_PARAMETER_H
#define PRJ_PARAMETER_H

#include <QDialog>
#include <QLineEdit>
#include <QLabel>

namespace Ui {
    class Prj_parameter;
}

class Prj_parameter : public QDialog
{
    Q_OBJECT

public:
    explicit Prj_parameter(QWidget *parent = 0);
    ~Prj_parameter();

    QLabel *prj_name ;
    QLineEdit *low_edit ;
    QLineEdit *up_edit ;

private:
    Ui::Prj_parameter *ui;

private slots:
    void on_cancelButton_clicked();
    void on_enterButton_clicked();
    void update_ui() ;
signals:
    void save_edit() ;
};

#endif // PRJ_PARAMETER_H
