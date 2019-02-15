/****************************************************************************
** Meta object code from reading C++ file 'register.h'
**
** Created: Tue Oct 23 13:31:30 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/register.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'register.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Register[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       6,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      10,    9,    9,    9, 0x05,
      25,    9,    9,    9, 0x05,

 // slots: signature, parameters, type, tag, flags
      32,    9,    9,    9, 0x08,
      55,    9,    9,    9, 0x08,
      74,    9,    9,    9, 0x08,
      88,    9,    9,    9, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_Register[] = {
    "Register\0\0input_signal()\0beep()\0"
    "on_btnCancel_clicked()\0on_btnOk_clicked()\0"
    "show_button()\0update_ui()\0"
};

const QMetaObject Register::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_Register,
      qt_meta_data_Register, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Register::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Register::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Register::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Register))
        return static_cast<void*>(const_cast< Register*>(this));
    return QDialog::qt_metacast(_clname);
}

int Register::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: input_signal(); break;
        case 1: beep(); break;
        case 2: on_btnCancel_clicked(); break;
        case 3: on_btnOk_clicked(); break;
        case 4: show_button(); break;
        case 5: update_ui(); break;
        default: ;
        }
        _id -= 6;
    }
    return _id;
}

// SIGNAL 0
void Register::input_signal()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}

// SIGNAL 1
void Register::beep()
{
    QMetaObject::activate(this, &staticMetaObject, 1, 0);
}
QT_END_MOC_NAMESPACE
