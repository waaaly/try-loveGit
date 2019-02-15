/****************************************************************************
** Meta object code from reading C++ file 'frmmessagebox.h'
**
** Created: Tue Oct 23 13:31:28 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/frmmessagebox.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'frmmessagebox.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_frmMessageBox[] = {

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
      15,   14,   14,   14, 0x05,

 // slots: signature, parameters, type, tag, flags
      22,   14,   14,   14, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_frmMessageBox[] = {
    "frmMessageBox\0\0beep()\0on_btnOk_clicked()\0"
};

const QMetaObject frmMessageBox::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_frmMessageBox,
      qt_meta_data_frmMessageBox, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &frmMessageBox::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *frmMessageBox::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *frmMessageBox::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_frmMessageBox))
        return static_cast<void*>(const_cast< frmMessageBox*>(this));
    return QDialog::qt_metacast(_clname);
}

int frmMessageBox::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: beep(); break;
        case 1: on_btnOk_clicked(); break;
        default: ;
        }
        _id -= 2;
    }
    return _id;
}

// SIGNAL 0
void frmMessageBox::beep()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}
QT_END_MOC_NAMESPACE
