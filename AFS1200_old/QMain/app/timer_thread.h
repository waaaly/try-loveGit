#ifndef TIMER_THREAD_H
#define TIMER_THREAD_H
#include <QThread>
#include <QLabel>
#include <QTimer>
#include "myserial.h"

class Timerthread : public QThread
{
    Q_OBJECT
public:
    explicit Timerthread(QObject *parent = 0);
    QBasicTimer detect_timer;
    uchar old_state[8] ;
    uchar new_state[8] ;

//public slots:
    //void showTimesslot();
protected:
    void run();
    void timerEvent(QTimerEvent *) ;
private:
    MySerial timer_serial ;
    bool send_com ;
    uchar com[24] ;
    bool connect_flag ;
signals:
    void timerthread_signal(uchar*) ;
    void wamer_signal(uchar) ;
    void check_connected(int) ;
private slots:
    void get_com(uchar* gcom) ;
    
};

#endif // MYTHREAD_H
