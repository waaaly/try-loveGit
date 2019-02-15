/****************************************************************************
** Meta object code from reading C++ file 'password.h'
**
** Created: Tue Oct 23 13:31:30 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/password.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'password.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_password[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
      11,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       4,       // signalCount

 // signals: signature, parameters, type, tag, flags
      10,    9,    9,    9, 0x05,
      37,    9,    9,    9, 0x05,
      67,    9,    9,    9, 0x05,
      97,    9,    9,    9, 0x05,

 // slots: signature, parameters, type, tag, flags
     104,    9,    9,    9, 0x08,
     133,    9,    9,    9, 0x08,
     163,    9,    9,    9, 0x08,
     194,    9,    9,    9, 0x08,
     228,  225,    9,    9, 0x08,
     244,  225,    9,    9, 0x08,
     260,    9,    9,    9, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_password[] = {
    "password\0\0info2error_dialog(QString)\0"
    "correct_password_project(int)\0"
    "correct_password_primary(int)\0beep()\0"
    "on_pushButton_num1_clicked()\0"
    "on_pushButton_enter_clicked()\0"
    "on_pushButton_delete_clicked()\0"
    "on_pushButton_cancel_clicked()\0sw\0"
    "show_input(int)\0hide_input(int)\0"
    "update_ui()\0"
};

const QMetaObject password::staticMetaObject = {
    { &QWidget::staticMetaObject, qt_meta_stringdata_password,
      qt_meta_data_password, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &password::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *password::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *password::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_password))
        return static_cast<void*>(const_cast< password*>(this));
    return QWidget::qt_metacast(_clname);
}

int password::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QWidget::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: info2error_dialog((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 1: correct_password_project((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 2: correct_password_primary((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 3: beep(); break;
        case 4: on_pushButton_num1_clicked(); break;
        case 5: on_pushButton_enter_clicked(); break;
        case 6: on_pushButton_delete_clicked(); break;
        case 7: on_pushButton_cancel_clicked(); break;
        case 8: show_input((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 9: hide_input((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 10: update_ui(); break;
        default: ;
        }
        _id -= 11;
    }
    return _id;
}

// SIGNAL 0
void password::info2error_dialog(QString _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void password::correct_password_project(int _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void password::correct_password_primary(int _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}

// SIGNAL 3
void password::beep()
{
    QMetaObject::activate(this, &staticMetaObject, 3, 0);
}
QT_END_MOC_NAMESPACE
