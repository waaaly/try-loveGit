#ifndef EVENTPLUG_H
#define EVENTPLUG_H

#include <QObject>
#include <QEvent>
#include <QStringList>

class EventPlug :public QObject
{
Q_OBJECT
public:
    EventPlug();
    virtual ~EventPlug();

    bool eventFilter(QObject *obj, QEvent *evt);


    void filter_init(QObject *p, const QStringList &f);

signals:
    void send_signal_t(QEvent*evt);

public slots:
    void send_slot_t() ;

private:
    void find_obj(QObject *obj);
    const QStringList *filter_list;

};



#endif // EVENTPLUG_H
