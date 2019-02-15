/****************************************************************************
** Meta object code from reading C++ file 'syszuxim.h'
**
** Created: Thu Oct 11 16:18:50 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/typewritting/syszuxim.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'syszuxim.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_SyszuxIM[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      10,    9,    9,    9, 0x05,
      23,   18,    9,    9, 0x05,

 // slots: signature, parameters, type, tag, flags
      64,   55,    9,    9, 0x0a,
      87,    9,    9,    9, 0x0a,

       0        // eod
};

static const char qt_meta_stringdata_SyszuxIM[] = {
    "SyszuxIM\0\0_beep()\0line\0"
    "call_4_num_keyboard(QLineEdit*)\0"
    "gemfield\0confirmString(QString)\0"
    "get_beep_signal()\0"
};

const QMetaObject SyszuxIM::staticMetaObject = {
    { &QWSInputMethod::staticMetaObject, qt_meta_stringdata_SyszuxIM,
      qt_meta_data_SyszuxIM, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &SyszuxIM::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *SyszuxIM::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *SyszuxIM::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_SyszuxIM))
        return static_cast<void*>(const_cast< SyszuxIM*>(this));
    return QWSInputMethod::qt_metacast(_clname);
}

int SyszuxIM::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QWSInputMethod::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: _beep(); break;
        case 1: call_4_num_keyboard((*reinterpret_cast< QLineEdit*(*)>(_a[1]))); break;
        case 2: confirmString((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 3: get_beep_signal(); break;
        default: ;
        }
        _id -= 4;
    }
    return _id;
}

// SIGNAL 0
void SyszuxIM::_beep()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}

// SIGNAL 1
void SyszuxIM::call_4_num_keyboard(QLineEdit * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
QT_END_MOC_NAMESPACE
