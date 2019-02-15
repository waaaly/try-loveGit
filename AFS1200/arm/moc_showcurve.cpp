/****************************************************************************
** Meta object code from reading C++ file 'showcurve.h'
**
** Created: Tue Oct 23 13:31:33 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/curve/showcurve.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'showcurve.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Showcurve[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       3,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: signature, parameters, type, tag, flags
      11,   10,   10,   10, 0x05,

 // slots: signature, parameters, type, tag, flags
      18,   10,   10,   10, 0x08,
      46,   10,   10,   10, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_Showcurve[] = {
    "Showcurve\0\0beep()\0on_shutdownButton_clicked()\0"
    "show_slot(int)\0"
};

const QMetaObject Showcurve::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_Showcurve,
      qt_meta_data_Showcurve, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Showcurve::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Showcurve::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Showcurve::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Showcurve))
        return static_cast<void*>(const_cast< Showcurve*>(this));
    return QDialog::qt_metacast(_clname);
}

int Showcurve::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: beep(); break;
        case 1: on_shutdownButton_clicked(); break;
        case 2: show_slot((*reinterpret_cast< int(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 3;
    }
    return _id;
}

// SIGNAL 0
void Showcurve::beep()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}
QT_END_MOC_NAMESPACE
