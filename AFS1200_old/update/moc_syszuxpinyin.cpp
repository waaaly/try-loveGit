/****************************************************************************
** Meta object code from reading C++ file 'syszuxpinyin.h'
**
** Created: Thu Oct 11 16:18:49 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/typewritting/syszuxpinyin.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'syszuxpinyin.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_SyszuxPinyin[] = {

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
      23,   14,   13,   13, 0x05,
      43,   13,   13,   13, 0x05,

 // slots: signature, parameters, type, tag, flags
      50,   14,   13,   13, 0x0a,
      75,   13,   13,   13, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_SyszuxPinyin[] = {
    "SyszuxPinyin\0\0gemfield\0sendPinyin(QString)\0"
    "beep()\0buttonClickResponse(int)\0"
    "on_pushButton_cancel_clicked()\0"
};

const QMetaObject SyszuxPinyin::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_SyszuxPinyin,
      qt_meta_data_SyszuxPinyin, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &SyszuxPinyin::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *SyszuxPinyin::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *SyszuxPinyin::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_SyszuxPinyin))
        return static_cast<void*>(const_cast< SyszuxPinyin*>(this));
    if (!strcmp(_clname, "Ui::Dialog"))
        return static_cast< Ui::Dialog*>(const_cast< SyszuxPinyin*>(this));
    return QDialog::qt_metacast(_clname);
}

int SyszuxPinyin::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: sendPinyin((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 1: beep(); break;
        case 2: buttonClickResponse((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 3: on_pushButton_cancel_clicked(); break;
        default: ;
        }
        _id -= 4;
    }
    return _id;
}

// SIGNAL 0
void SyszuxPinyin::sendPinyin(QString _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void SyszuxPinyin::beep()
{
    QMetaObject::activate(this, &staticMetaObject, 1, 0);
}
QT_END_MOC_NAMESPACE
