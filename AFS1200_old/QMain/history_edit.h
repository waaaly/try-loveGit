#ifndef HISTORY_EDIT_H
#define HISTORY_EDIT_H

#include <QDialog>
#include <QStyledItemDelegate>
#include "ID/uIDCardDef.h"
#include "app/myhelper.h"

namespace Ui {
    class History_edit;
}

class History_edit : public QDialog
{
    Q_OBJECT

public:
    explicit History_edit(QWidget *parent = 0);
    ~History_edit();
    void show_form(const char *filename) ;
private:
    Ui::History_edit *ui;
    QString filename ;

private slots:
    void on_Button_save_clicked();
    void on_Button_close_clicked();
       void update_ui() ;
signals:
    void beep() ;
};

#endif // HISTORY_EDIT_H
