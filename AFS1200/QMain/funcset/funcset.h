#ifndef FUNCSET_H
#define FUNCSET_H

#include <QString>

/*
 * 通用函数功能集合
*/

// 使用命名空间，防止名字重合
namespace FuncSet
{
    void postEventSleep(int ms, int sleep = 10);

    // 取当前时间的时间戳
    unsigned int getTimeStamp() ;
    QString timeStampToString(unsigned int val, const QString &format = "yyyy-MM-dd hh:mm:ss");

#define HEX2SARGS(a) ((const quint8 *)a), sizeof (a)
    QString Hex2s(const quint8 *str, int maxlen = -1);


}

#endif // FUNCSET_H
