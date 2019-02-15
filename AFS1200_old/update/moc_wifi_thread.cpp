/****************************************************************************
** Meta object code from reading C++ file 'wifi_thread.h'
**
** Created: Mon Oct 15 10:39:02 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/WIFI/wifi_thread.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'wifi_thread.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Wifithread[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       3,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       3,       // signalCount

 // signals: signature, parameters, type, tag, flags
      12,   11,   11,   11, 0x05,
      31,   11,   11,   11, 0x05,
      47,   11,   11,   11, 0x05,

       0        // eod
};

static const char qt_meta_stringdata_Wifithread[] = {
    "Wifithread\0\0thread_signal(int)\0"
    "wifi_state(int)\0info2error_dialog(QString)\0"
};

const QMetaObject Wifithread::staticMetaObject = {
    { &QThread::staticMetaObject, qt_meta_stringdata_Wifithread,
      qt_meta_data_Wifithread, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Wifithread::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Wifithread::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Wifithread::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Wifithread))
        return static_cast<void*>(const_cast< Wifithread*>(this));
    return QThread::qt_metacast(_clname);
}

int Wifithread::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QThread::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: thread_signal((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 1: wifi_state((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 2: info2error_dialog((*reinterpret_cast< QString(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 3;
    }
    return _id;
}

// SIGNAL 0
void Wifithread::thread_signal(int _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void Wifithread::wifi_state(int _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void Wifithread::info2error_dialog(QString _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}
QT_END_MOC_NAMESPACE
