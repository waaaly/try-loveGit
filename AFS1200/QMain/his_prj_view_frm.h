#ifndef HIS_PRJ_VIEW_FRM_H
#define HIS_PRJ_VIEW_FRM_H

#include <QWidget>
#include <QDebug>
#include "ID/uIDCardDef.h"
#include <QList>

namespace Ui {
class his_prj_view_frm;
}

class his_prj_view_frm : public QWidget
{
    Q_OBJECT

public:
    explicit his_prj_view_frm(QWidget *parent = 0);
    ~his_prj_view_frm();

    void show_info(QString path_name);

public slots:
    void update_ui();

private slots:
    void on_exit_bt_clicked();

private:
    Ui::his_prj_view_frm *ui;

    bool load_info(QString path, SAVE_ITEM& head, QList<SUB_SAVE_ITEM>& sub);

    void init_ui();


signals:
    void errinfo(QString info);

};

#endif // HIS_PRJ_VIEW_FRM_H
