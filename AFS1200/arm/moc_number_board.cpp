/****************************************************************************
** Meta object code from reading C++ file 'number_board.h'
**
** Created: Tue Oct 23 13:31:35 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/number_board.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'number_board.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Number_board[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       5,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: signature, parameters, type, tag, flags
      14,   13,   13,   13, 0x08,
      44,   13,   13,   13, 0x08,
      75,   13,   13,   13, 0x08,
     106,   13,   13,   13, 0x08,
     135,   13,   13,   13, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_Number_board[] = {
    "Number_board\0\0on_pushButton_enter_clicked()\0"
    "on_pushButton_cancel_clicked()\0"
    "on_pushButton_delete_clicked()\0"
    "on_pushButton_num1_clicked()\0update_ui()\0"
};

const QMetaObject Number_board::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_Number_board,
      qt_meta_data_Number_board, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Number_board::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Number_board::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Number_board::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Number_board))
        return static_cast<void*>(const_cast< Number_board*>(this));
    return QDialog::qt_metacast(_clname);
}

int Number_board::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: on_pushButton_enter_clicked(); break;
        case 1: on_pushButton_cancel_clicked(); break;
        case 2: on_pushButton_delete_clicked(); break;
        case 3: on_pushButton_num1_clicked(); break;
        case 4: update_ui(); break;
        default: ;
        }
        _id -= 5;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
