#ifndef NUMBER_BOARD_H
#define NUMBER_BOARD_H

#include <QDialog>
#include <QLineEdit>

namespace Ui {
    class Number_board;
}

class Number_board : public QDialog
{
    Q_OBJECT

public:
    explicit Number_board(QWidget *parent = 0);
    ~Number_board();
    QLineEdit *line_edit ;
    QLineEdit *ex_ine_edit ;

private:
    Ui::Number_board *ui;

private slots:
    void on_pushButton_enter_clicked();
    void on_pushButton_cancel_clicked();
    void on_pushButton_delete_clicked();
    void on_pushButton_num1_clicked();
    void update_ui() ;
};

#endif // NUMBER_BOARD_H
