/****************************************************************************
** Meta object code from reading C++ file 'chagecode.h'
**
** Created: Thu Oct 11 16:18:50 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/chagecode.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'chagecode.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_ChageCode[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       5,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: signature, parameters, type, tag, flags
      11,   10,   10,   10, 0x05,

 // slots: signature, parameters, type, tag, flags
      23,   10,   10,   10, 0x08,
      52,   10,   10,   10, 0x08,
      85,   10,   10,   10, 0x08,
     116,   10,   10,   10, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_ChageCode[] = {
    "ChageCode\0\0save_edit()\0"
    "on_checkBox_usegun_clicked()\0"
    "on_lineEdit_textChanged(QString)\0"
    "on_pushButton_cancel_clicked()\0"
    "on_pushButton_ok_clicked()\0"
};

const QMetaObject ChageCode::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_ChageCode,
      qt_meta_data_ChageCode, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &ChageCode::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *ChageCode::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *ChageCode::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_ChageCode))
        return static_cast<void*>(const_cast< ChageCode*>(this));
    return QDialog::qt_metacast(_clname);
}

int ChageCode::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: save_edit(); break;
        case 1: on_checkBox_usegun_clicked(); break;
        case 2: on_lineEdit_textChanged((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 3: on_pushButton_cancel_clicked(); break;
        case 4: on_pushButton_ok_clicked(); break;
        default: ;
        }
        _id -= 5;
    }
    return _id;
}

// SIGNAL 0
void ChageCode::save_edit()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}
QT_END_MOC_NAMESPACE
