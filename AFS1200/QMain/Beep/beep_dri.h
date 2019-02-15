#ifndef BEEP_DRI_H
#define BEEP_DRI_H

#include <QEvent>
#include "Beep/eventplug.h"
#include <QObject>
#include <QThread>

class Beep_Dri : public QThread
{
Q_OBJECT
public:
    EventPlug * ep;

    void run();

public slots:
    void beep_on(int time = 100);  // 蜂鸣器响应

    // void beep_off();

    void setEnable(bool sw);

    static Beep_Dri *Get_Beep();

    void regedit_wid(QObject *p, const QStringList &f);



private:
    int beep_fd;   // 蜂鸣器文件设备描述符
    int is_enable; // 0为使能

    int beep_type;

    void set_beep(bool on_off);

    explicit Beep_Dri(QObject *parent = 0);
    virtual ~Beep_Dri();
    // 20170306
    bool beep_flag;
    int wait_time;
};

#endif // BEEP_DRI_H
