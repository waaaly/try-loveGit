/****************************************************************************
** Meta object code from reading C++ file 'timer_thread.h'
**
** Created: Mon Oct 15 10:39:01 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/timer_thread.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'timer_thread.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Timerthread[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       3,       // signalCount

 // signals: signature, parameters, type, tag, flags
      13,   12,   12,   12, 0x05,
      40,   12,   12,   12, 0x05,
      60,   12,   12,   12, 0x05,

 // slots: signature, parameters, type, tag, flags
      86,   81,   12,   12, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_Timerthread[] = {
    "Timerthread\0\0timerthread_signal(uchar*)\0"
    "wamer_signal(uchar)\0check_connected(int)\0"
    "gcom\0get_com(uchar*)\0"
};

const QMetaObject Timerthread::staticMetaObject = {
    { &QThread::staticMetaObject, qt_meta_stringdata_Timerthread,
      qt_meta_data_Timerthread, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Timerthread::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Timerthread::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Timerthread::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Timerthread))
        return static_cast<void*>(const_cast< Timerthread*>(this));
    return QThread::qt_metacast(_clname);
}

int Timerthread::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QThread::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: timerthread_signal((*reinterpret_cast< uchar*(*)>(_a[1]))); break;
        case 1: wamer_signal((*reinterpret_cast< uchar(*)>(_a[1]))); break;
        case 2: check_connected((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 3: get_com((*reinterpret_cast< uchar*(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 4;
    }
    return _id;
}

// SIGNAL 0
void Timerthread::timerthread_signal(uchar * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void Timerthread::wamer_signal(uchar _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void Timerthread::check_connected(int _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}
QT_END_MOC_NAMESPACE
