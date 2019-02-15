/****************************************************************************
** Meta object code from reading C++ file 'errordialog.h'
**
** Created: Thu Oct 11 16:18:48 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/errordialog.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'errordialog.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_ErrorDialog[] = {

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
      13,   12,   12,   12, 0x05,

 // slots: signature, parameters, type, tag, flags
      20,   12,   12,   12, 0x08,
      42,   39,   12,   12, 0x08,
      66,   12,   12,   12, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_ErrorDialog[] = {
    "ErrorDialog\0\0beep()\0on_btnOk_clicked()\0"
    "sw\0get_error_info(QString)\0update_ui()\0"
};

const QMetaObject ErrorDialog::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_ErrorDialog,
      qt_meta_data_ErrorDialog, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &ErrorDialog::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *ErrorDialog::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *ErrorDialog::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_ErrorDialog))
        return static_cast<void*>(const_cast< ErrorDialog*>(this));
    return QDialog::qt_metacast(_clname);
}

int ErrorDialog::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: beep(); break;
        case 1: on_btnOk_clicked(); break;
        case 2: get_error_info((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 3: update_ui(); break;
        default: ;
        }
        _id -= 4;
    }
    return _id;
}

// SIGNAL 0
void ErrorDialog::beep()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}
QT_END_MOC_NAMESPACE
