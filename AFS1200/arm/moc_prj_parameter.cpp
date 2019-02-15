/****************************************************************************
** Meta object code from reading C++ file 'prj_parameter.h'
**
** Created: Tue Oct 23 13:31:35 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/prj_parameter.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'prj_parameter.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Prj_parameter[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: signature, parameters, type, tag, flags
      15,   14,   14,   14, 0x05,

 // slots: signature, parameters, type, tag, flags
      27,   14,   14,   14, 0x08,
      53,   14,   14,   14, 0x08,
      78,   14,   14,   14, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_Prj_parameter[] = {
    "Prj_parameter\0\0save_edit()\0"
    "on_cancelButton_clicked()\0"
    "on_enterButton_clicked()\0update_ui()\0"
};

const QMetaObject Prj_parameter::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_Prj_parameter,
      qt_meta_data_Prj_parameter, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Prj_parameter::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Prj_parameter::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Prj_parameter::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Prj_parameter))
        return static_cast<void*>(const_cast< Prj_parameter*>(this));
    return QDialog::qt_metacast(_clname);
}

int Prj_parameter::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: save_edit(); break;
        case 1: on_cancelButton_clicked(); break;
        case 2: on_enterButton_clicked(); break;
        case 3: update_ui(); break;
        default: ;
        }
        _id -= 4;
    }
    return _id;
}

// SIGNAL 0
void Prj_parameter::save_edit()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}
QT_END_MOC_NAMESPACE
