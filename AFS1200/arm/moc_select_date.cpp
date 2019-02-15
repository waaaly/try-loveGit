/****************************************************************************
** Meta object code from reading C++ file 'select_date.h'
**
** Created: Tue Oct 23 13:31:36 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/app/select_date.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'select_date.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Select_date[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
      13,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: signature, parameters, type, tag, flags
      13,   12,   12,   12, 0x05,

 // slots: signature, parameters, type, tag, flags
      26,   12,   12,   12, 0x08,
      66,   12,   12,   12, 0x08,
     105,   12,   12,   12, 0x08,
     143,   12,   12,   12, 0x08,
     179,   12,   12,   12, 0x08,
     215,   12,   12,   12, 0x08,
     252,   12,   12,   12, 0x08,
     300,  289,   12,   12, 0x08,
     346,   12,   12,   12, 0x08,
     370,   12,   12,   12, 0x08,
     401,  396,   12,   12, 0x08,
     434,   12,   12,   12, 0x08,

       0        // eod
};

static const char qt_meta_stringdata_Select_date[] = {
    "Select_date\0\0enter_date()\0"
    "on_histroyButton_show_tomonth_clicked()\0"
    "on_histroyButton_show_toweek_clicked()\0"
    "on_histroyButton_show_today_clicked()\0"
    "on_histroyButton_next_mon_clicked()\0"
    "on_histroyButton_last_mon_clicked()\0"
    "on_histroyButton_next_year_clicked()\0"
    "on_histroyButton_last_year_clicked()\0"
    "year,month\0on_calendarWidget_currentPageChanged(int,int)\0"
    "on_toolButton_clicked()\0"
    "on_toolButton_2_clicked()\0date\0"
    "on_calendarWidget_clicked(QDate)\0"
    "update_ui()\0"
};

const QMetaObject Select_date::staticMetaObject = {
    { &QDialog::staticMetaObject, qt_meta_stringdata_Select_date,
      qt_meta_data_Select_date, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Select_date::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Select_date::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Select_date::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Select_date))
        return static_cast<void*>(const_cast< Select_date*>(this));
    return QDialog::qt_metacast(_clname);
}

int Select_date::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QDialog::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: enter_date(); break;
        case 1: on_histroyButton_show_tomonth_clicked(); break;
        case 2: on_histroyButton_show_toweek_clicked(); break;
        case 3: on_histroyButton_show_today_clicked(); break;
        case 4: on_histroyButton_next_mon_clicked(); break;
        case 5: on_histroyButton_last_mon_clicked(); break;
        case 6: on_histroyButton_next_year_clicked(); break;
        case 7: on_histroyButton_last_year_clicked(); break;
        case 8: on_calendarWidget_currentPageChanged((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 9: on_toolButton_clicked(); break;
        case 10: on_toolButton_2_clicked(); break;
        case 11: on_calendarWidget_clicked((*reinterpret_cast< QDate(*)>(_a[1]))); break;
        case 12: update_ui(); break;
        default: ;
        }
        _id -= 13;
    }
    return _id;
}

// SIGNAL 0
void Select_date::enter_date()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}
QT_END_MOC_NAMESPACE
