#ifndef MULTI_CARD_SET_H
#define MULTI_CARD_SET_H

#include <QDialog>
#include <QTableWidget>

namespace Ui {
    class Multi_card_set;
}

class Multi_card_set : public QDialog
{
    Q_OBJECT

public:
    explicit Multi_card_set(QWidget *parent = 0);
    ~Multi_card_set();
    QTableWidget *list ;

private:
    Ui::Multi_card_set *ui;

private slots:
    void on_pushButton_cal_clicked();
    void on_pushButton_ok_clicked();
    void update_ui() ;
signals:
    void save_multi_item_signal() ;
};

#endif // MULTI_CARD_SET_H
