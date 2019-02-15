#ifndef DETAIL_FROM_H
#define DETAIL_FROM_H

#include <QWidget>
#include <QComboBox>
#include <QStyledItemDelegate>

namespace Ui {
    class Detail_from;
}

class Detail_from : public QWidget
{
    Q_OBJECT

public:
    explicit Detail_from(QWidget *parent = 0);
    ~Detail_from();


    QString pname ;
    char psex ;
    QString page ;

    QLineEdit *name ;
    QLineEdit *age ;
    QComboBox *sex ;

private:
    Ui::Detail_from *ui;

private slots:
    void on_cancelButton_clicked();
    void on_enterButton_clicked();
    void update_ui() ;
signals:
    void beep() ;
};

#endif // DETAIL_FROM_H
