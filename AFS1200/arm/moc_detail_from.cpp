/****************************************************************************
** Meta object code from reading C++ file 'detail_from.h'
**
** Created: Tue Oct 23 13:31:33 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/detail_from.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'detail_from.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Detail_from[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: signature, parameters, type, tag, flags
      13,   12,   12,   12, 0x08,
      39,   12,   12,   12, 0x08,
      64,   12,   12,   12, 0x08,
      81,   76,   12,   12, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_Detail_from[] = {
    "Detail_from\0\0on_cancelButton_clicked()\0"
    "on_enterButton_clicked()\0update_ui()\0"
    "arg1\0on_lineEdit_age_numkeyboard_textChanged(QString)\0"
};

const QMetaObject Detail_from::staticMetaObject = {
    { &QWidget::staticMetaObject, qt_meta_stringdata_Detail_from,
      qt_meta_data_Detail_from, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Detail_from::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Detail_from::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Detail_from::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Detail_from))
        return static_cast<void*>(const_cast< Detail_from*>(this));
    return QWidget::qt_metacast(_clname);
}

int Detail_from::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QWidget::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: on_cancelButton_clicked(); break;
        case 1: on_enterButton_clicked(); break;
        case 2: update_ui(); break;
        case 3: on_lineEdit_age_numkeyboard_textChanged((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 4;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
