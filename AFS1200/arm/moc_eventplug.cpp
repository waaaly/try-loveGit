/****************************************************************************
** Meta object code from reading C++ file 'eventplug.h'
**
** Created: Tue Oct 23 13:31:39 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/Beep/eventplug.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'eventplug.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_EventPlug[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       2,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: signature, parameters, type, tag, flags
      15,   11,   10,   10, 0x05,

 // slots: signature, parameters, type, tag, flags
      38,   10,   10,   10, 0x0a,

       0        // eod
};

static const char qt_meta_stringdata_EventPlug[] = {
    "EventPlug\0\0evt\0send_signal_t(QEvent*)\0"
    "send_slot_t()\0"
};

const QMetaObject EventPlug::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_EventPlug,
      qt_meta_data_EventPlug, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &EventPlug::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *EventPlug::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *EventPlug::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_EventPlug))
        return static_cast<void*>(const_cast< EventPlug*>(this));
    return QObject::qt_metacast(_clname);
}

int EventPlug::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: send_signal_t((*reinterpret_cast< QEvent*(*)>(_a[1]))); break;
        case 1: send_slot_t(); break;
        default: ;
        }
        _id -= 2;
    }
    return _id;
}

// SIGNAL 0
void EventPlug::send_signal_t(QEvent * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}
QT_END_MOC_NAMESPACE
