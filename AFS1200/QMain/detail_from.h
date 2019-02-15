#ifndef DETAIL_FROM_H
#define DETAIL_FROM_H

#include <QWidget>
#include <QComboBox>
#include <QStyledItemDelegate>

extern const char *age_unit_list[4][2] ;
#define GET_AGEUNIT(s) QString::fromUtf8(s)


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
    QString page_unit;
    int prev_unit;

    QLineEdit *name ;
    QLineEdit *age ;
    QComboBox *sex ;
    QComboBox *age_unit;

private:
    Ui::Detail_from *ui;

private slots:
    void on_cancelButton_clicked();
    void on_enterButton_clicked();
    void update_ui() ;
    void on_lineEdit_age_numkeyboard_textChanged(const QString &arg1);

};

#endif // DETAIL_FROM_H
