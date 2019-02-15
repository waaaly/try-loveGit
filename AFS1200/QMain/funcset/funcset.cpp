#include "funcset.h"
#include <QApplication>
#include <QElapsedTimer>
#include <QDateTime>



// 事件驱动的睡眠
void FuncSet::postEventSleep(int ms, int sleep)
{
    QElapsedTimer t;
    t.start();
    while (t.elapsed() < ms)
    {
        QApplication::processEvents();
        if (sleep) usleep(sleep*1000); // vdev.h
    }
}

// 取当前时间的时间戳
unsigned int FuncSet::getTimeStamp()
{
    return QDateTime::currentDateTime().toTime_t();
}

QString FuncSet::Hex2s(const quint8 *str, int maxlen)
{
    QString ret = QString::fromLocal8Bit((const char*)str);
    if (maxlen != -1)
    {
        ret = ret.left(maxlen);
    }
    return ret;
}

QString FuncSet::timeStampToString(unsigned int val, const QString &format)
{
    return QDateTime::fromTime_t(val).toString(format);
}
