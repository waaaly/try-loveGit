/****************************************************************************
** Meta object code from reading C++ file 'beep_dri.h'
**
** Created: Tue Oct 23 13:31:38 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/Beep/beep_dri.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'beep_dri.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_Beep_Dri[] = {

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
      15,   10,    9,    9, 0x0a,
      28,    9,    9,    9, 0x2a,
      41,   38,    9,    9, 0x0a,
      67,    9,   57,    9, 0x0a,
      82,   78,    9,    9, 0x0a,

       0        // eod
};

static const char qt_meta_stringdata_Beep_Dri[] = {
    "Beep_Dri\0\0time\0beep_on(int)\0beep_on()\0"
    "sw\0setEnable(bool)\0Beep_Dri*\0Get_Beep()\0"
    "p,f\0regedit_wid(QObject*,QStringList)\0"
};

const QMetaObject Beep_Dri::staticMetaObject = {
    { &QThread::staticMetaObject, qt_meta_stringdata_Beep_Dri,
      qt_meta_data_Beep_Dri, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &Beep_Dri::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *Beep_Dri::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *Beep_Dri::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_Beep_Dri))
        return static_cast<void*>(const_cast< Beep_Dri*>(this));
    return QThread::qt_metacast(_clname);
}

int Beep_Dri::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QThread::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: beep_on((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 1: beep_on(); break;
        case 2: setEnable((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 3: { Beep_Dri* _r = Get_Beep();
            if (_a[0]) *reinterpret_cast< Beep_Dri**>(_a[0]) = _r; }  break;
        case 4: regedit_wid((*reinterpret_cast< QObject*(*)>(_a[1])),(*reinterpret_cast< const QStringList(*)>(_a[2]))); break;
        default: ;
        }
        _id -= 5;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
