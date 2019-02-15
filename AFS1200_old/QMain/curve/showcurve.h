#ifndef SHOWCURVE_H
#define SHOWCURVE_H

#include <QDialog>

namespace Ui {
    class Showcurve;
}

class Showcurve : public QDialog
{
    Q_OBJECT

public:
    explicit Showcurve(QWidget *parent = 0);
    ~Showcurve();
    int win_length ;
   // float x_datas[512] ;
    float y_datas[512] ;
    int position[10] ;
    int peak_number ;


private:
    Ui::Showcurve *ui;

private slots:
    void on_shutdownButton_clicked();
    void show_slot() ;
signals:
    void beep() ;
};

#endif // SHOWCURVE_H
