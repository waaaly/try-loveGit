/****************************************************************************
** Meta object code from reading C++ file 'qcustomplot.h'
**
** Created: Tue Oct 23 13:31:31 2018
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../QMain/curve/qcustomplot.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'qcustomplot.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_QCPScatterStyle[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       1,   14, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // enums: name, flags, count, data
      16, 0x0,   18,   18,

 // enum data: key, value
      29, uint(QCPScatterStyle::ssNone),
      36, uint(QCPScatterStyle::ssDot),
      42, uint(QCPScatterStyle::ssCross),
      50, uint(QCPScatterStyle::ssPlus),
      57, uint(QCPScatterStyle::ssCircle),
      66, uint(QCPScatterStyle::ssDisc),
      73, uint(QCPScatterStyle::ssSquare),
      82, uint(QCPScatterStyle::ssDiamond),
      92, uint(QCPScatterStyle::ssStar),
      99, uint(QCPScatterStyle::ssTriangle),
     110, uint(QCPScatterStyle::ssTriangleInverted),
     129, uint(QCPScatterStyle::ssCrossSquare),
     143, uint(QCPScatterStyle::ssPlusSquare),
     156, uint(QCPScatterStyle::ssCrossCircle),
     170, uint(QCPScatterStyle::ssPlusCircle),
     183, uint(QCPScatterStyle::ssPeace),
     191, uint(QCPScatterStyle::ssPixmap),
     200, uint(QCPScatterStyle::ssCustom),

       0        // eod
};

static const char qt_meta_stringdata_QCPScatterStyle[] = {
    "QCPScatterStyle\0ScatterShape\0ssNone\0"
    "ssDot\0ssCross\0ssPlus\0ssCircle\0ssDisc\0"
    "ssSquare\0ssDiamond\0ssStar\0ssTriangle\0"
    "ssTriangleInverted\0ssCrossSquare\0"
    "ssPlusSquare\0ssCrossCircle\0ssPlusCircle\0"
    "ssPeace\0ssPixmap\0ssCustom\0"
};

const QMetaObject QCPScatterStyle::staticMetaObject = {
    { 0, qt_meta_stringdata_QCPScatterStyle,
      qt_meta_data_QCPScatterStyle, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPScatterStyle::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION
static const uint qt_meta_data_QCPPainter[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       2,   14, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // enums: name, flags, count, data
      11, 0x1,    4,   22,
      23, 0x1,    4,   30,

 // enum data: key, value
      36, uint(QCPPainter::pmDefault),
      46, uint(QCPPainter::pmVectorized),
      59, uint(QCPPainter::pmNoCaching),
      71, uint(QCPPainter::pmNonCosmetic),
      36, uint(QCPPainter::pmDefault),
      46, uint(QCPPainter::pmVectorized),
      59, uint(QCPPainter::pmNoCaching),
      71, uint(QCPPainter::pmNonCosmetic),

       0        // eod
};

static const char qt_meta_stringdata_QCPPainter[] = {
    "QCPPainter\0PainterMode\0PainterModes\0"
    "pmDefault\0pmVectorized\0pmNoCaching\0"
    "pmNonCosmetic\0"
};

const QMetaObject QCPPainter::staticMetaObject = {
    { &QPainter::staticMetaObject, qt_meta_stringdata_QCPPainter,
      qt_meta_data_QCPPainter, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPPainter::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION
static const uint qt_meta_data_QCPLayer[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       5,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      22,    9, 0x00095009,
      41,   33, 0x0a095001,
      50,   46, 0x02095001,
      77,   56, 0x00095009,
      91,   86, 0x01095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPLayer[] = {
    "QCPLayer\0QCustomPlot*\0parentPlot\0"
    "QString\0name\0int\0index\0QList<QCPLayerable*>\0"
    "children\0bool\0visible\0"
};

const QMetaObject QCPLayer::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_QCPLayer,
      qt_meta_data_QCPLayer, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLayer::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPLayer::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPLayer::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPLayer))
        return static_cast<void*>(const_cast< QCPLayer*>(this));
    return QObject::qt_metacast(_clname);
}

int QCPLayer::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QCustomPlot**>(_v) = parentPlot(); break;
        case 1: *reinterpret_cast< QString*>(_v) = name(); break;
        case 2: *reinterpret_cast< int*>(_v) = index(); break;
        case 3: *reinterpret_cast< QList<QCPLayerable*>*>(_v) = children(); break;
        case 4: *reinterpret_cast< bool*>(_v) = visible(); break;
        }
        _id -= 5;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 4: setVisible(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 5;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 5;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPLayerable[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       2,   14, // methods
       5,   24, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: signature, parameters, type, tag, flags
      23,   14,   13,   13, 0x05,

 // slots: signature, parameters, type, tag, flags
      58,   52,   47,   13, 0x0a,

 // properties: name, type, flags
      78,   47, 0x01095103,
      99,   86, 0x00095009,
     124,  110, 0x00095009,
      52,  140, 0x0049510b,
     150,   47, 0x01095103,

 // properties: notify_signal_id
       0,
       0,
       0,
       0,
       0,

       0        // eod
};

static const char qt_meta_stringdata_QCPLayerable[] = {
    "QCPLayerable\0\0newLayer\0layerChanged(QCPLayer*)\0"
    "bool\0layer\0setLayer(QCPLayer*)\0visible\0"
    "QCustomPlot*\0parentPlot\0QCPLayerable*\0"
    "parentLayerable\0QCPLayer*\0antialiased\0"
};

const QMetaObject QCPLayerable::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_QCPLayerable,
      qt_meta_data_QCPLayerable, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLayerable::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPLayerable::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPLayerable::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPLayerable))
        return static_cast<void*>(const_cast< QCPLayerable*>(this));
    return QObject::qt_metacast(_clname);
}

int QCPLayerable::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: layerChanged((*reinterpret_cast< QCPLayer*(*)>(_a[1]))); break;
        case 1: { bool _r = setLayer((*reinterpret_cast< QCPLayer*(*)>(_a[1])));
            if (_a[0]) *reinterpret_cast< bool*>(_a[0]) = _r; }  break;
        default: ;
        }
        _id -= 2;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< bool*>(_v) = visible(); break;
        case 1: *reinterpret_cast< QCustomPlot**>(_v) = parentPlot(); break;
        case 2: *reinterpret_cast< QCPLayerable**>(_v) = parentLayerable(); break;
        case 3: *reinterpret_cast< QCPLayer**>(_v) = layer(); break;
        case 4: *reinterpret_cast< bool*>(_v) = antialiased(); break;
        }
        _id -= 5;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setVisible(*reinterpret_cast< bool*>(_v)); break;
        case 3: setLayer(*reinterpret_cast< QCPLayer**>(_v)); break;
        case 4: setAntialiased(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 5;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 5;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPLayerable::layerChanged(QCPLayer * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}
static const uint qt_meta_data_QCPMarginGroup[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

       0        // eod
};

static const char qt_meta_stringdata_QCPMarginGroup[] = {
    "QCPMarginGroup\0"
};

const QMetaObject QCPMarginGroup::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_QCPMarginGroup,
      qt_meta_data_QCPMarginGroup, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPMarginGroup::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPMarginGroup::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPMarginGroup::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPMarginGroup))
        return static_cast<void*>(const_cast< QCPMarginGroup*>(this));
    return QObject::qt_metacast(_clname);
}

int QCPMarginGroup::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    return _id;
}
static const uint qt_meta_data_QCPLayoutElement[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       7,   14, // properties
       1,   35, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      28,   17, 0x00095009,
      41,   35, 0x13095001,
      46,   35, 0x13095103,
      65,   56, 0x0009510b,
      73,   56, 0x0009510b,
      94,   88, 0x15095103,
     106,   88, 0x15095103,

 // enums: name, flags, count, data
     118, 0x0,    3,   39,

 // enum data: key, value
     130, uint(QCPLayoutElement::upPreparation),
     144, uint(QCPLayoutElement::upMargins),
     154, uint(QCPLayoutElement::upLayout),

       0        // eod
};

static const char qt_meta_stringdata_QCPLayoutElement[] = {
    "QCPLayoutElement\0QCPLayout*\0layout\0"
    "QRect\0rect\0outerRect\0QMargins\0margins\0"
    "minimumMargins\0QSize\0minimumSize\0"
    "maximumSize\0UpdatePhase\0upPreparation\0"
    "upMargins\0upLayout\0"
};

const QMetaObject QCPLayoutElement::staticMetaObject = {
    { &QCPLayerable::staticMetaObject, qt_meta_stringdata_QCPLayoutElement,
      qt_meta_data_QCPLayoutElement, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLayoutElement::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPLayoutElement::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPLayoutElement::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPLayoutElement))
        return static_cast<void*>(const_cast< QCPLayoutElement*>(this));
    return QCPLayerable::qt_metacast(_clname);
}

int QCPLayoutElement::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayerable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QCPLayout**>(_v) = layout(); break;
        case 1: *reinterpret_cast< QRect*>(_v) = rect(); break;
        case 2: *reinterpret_cast< QRect*>(_v) = outerRect(); break;
        case 3: *reinterpret_cast< QMargins*>(_v) = margins(); break;
        case 4: *reinterpret_cast< QMargins*>(_v) = minimumMargins(); break;
        case 5: *reinterpret_cast< QSize*>(_v) = minimumSize(); break;
        case 6: *reinterpret_cast< QSize*>(_v) = maximumSize(); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 2: setOuterRect(*reinterpret_cast< QRect*>(_v)); break;
        case 3: setMargins(*reinterpret_cast< QMargins*>(_v)); break;
        case 4: setMinimumMargins(*reinterpret_cast< QMargins*>(_v)); break;
        case 5: setMinimumSize(*reinterpret_cast< QSize*>(_v)); break;
        case 6: setMaximumSize(*reinterpret_cast< QSize*>(_v)); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 7;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPLayout[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

       0        // eod
};

static const char qt_meta_stringdata_QCPLayout[] = {
    "QCPLayout\0"
};

const QMetaObject QCPLayout::staticMetaObject = {
    { &QCPLayoutElement::staticMetaObject, qt_meta_stringdata_QCPLayout,
      qt_meta_data_QCPLayout, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLayout::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPLayout::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPLayout::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPLayout))
        return static_cast<void*>(const_cast< QCPLayout*>(this));
    return QCPLayoutElement::qt_metacast(_clname);
}

int QCPLayout::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayoutElement::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    return _id;
}
static const uint qt_meta_data_QCPLayoutGrid[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       6,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      18,   14, 0x02095001,
      27,   14, 0x02095001,
      53,   39, 0x0009510b,
      74,   39, 0x0009510b,
      92,   14, 0x02095103,
     106,   14, 0x02095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPLayoutGrid[] = {
    "QCPLayoutGrid\0int\0rowCount\0columnCount\0"
    "QList<double>\0columnStretchFactors\0"
    "rowStretchFactors\0columnSpacing\0"
    "rowSpacing\0"
};

const QMetaObject QCPLayoutGrid::staticMetaObject = {
    { &QCPLayout::staticMetaObject, qt_meta_stringdata_QCPLayoutGrid,
      qt_meta_data_QCPLayoutGrid, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLayoutGrid::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPLayoutGrid::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPLayoutGrid::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPLayoutGrid))
        return static_cast<void*>(const_cast< QCPLayoutGrid*>(this));
    return QCPLayout::qt_metacast(_clname);
}

int QCPLayoutGrid::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayout::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< int*>(_v) = rowCount(); break;
        case 1: *reinterpret_cast< int*>(_v) = columnCount(); break;
        case 2: *reinterpret_cast< QList<double>*>(_v) = columnStretchFactors(); break;
        case 3: *reinterpret_cast< QList<double>*>(_v) = rowStretchFactors(); break;
        case 4: *reinterpret_cast< int*>(_v) = columnSpacing(); break;
        case 5: *reinterpret_cast< int*>(_v) = rowSpacing(); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 2: setColumnStretchFactors(*reinterpret_cast< QList<double>*>(_v)); break;
        case 3: setRowStretchFactors(*reinterpret_cast< QList<double>*>(_v)); break;
        case 4: setColumnSpacing(*reinterpret_cast< int*>(_v)); break;
        case 5: setRowSpacing(*reinterpret_cast< int*>(_v)); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 6;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPLayoutInset[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

       0        // eod
};

static const char qt_meta_stringdata_QCPLayoutInset[] = {
    "QCPLayoutInset\0"
};

const QMetaObject QCPLayoutInset::staticMetaObject = {
    { &QCPLayout::staticMetaObject, qt_meta_stringdata_QCPLayoutInset,
      qt_meta_data_QCPLayoutInset, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLayoutInset::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPLayoutInset::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPLayoutInset::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPLayoutInset))
        return static_cast<void*>(const_cast< QCPLayoutInset*>(this));
    return QCPLayout::qt_metacast(_clname);
}

int QCPLayoutInset::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayout::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    return _id;
}
static const uint qt_meta_data_QCPLineEnding[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       1,   14, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // enums: name, flags, count, data
      14, 0x0,   10,   18,

 // enum data: key, value
      26, uint(QCPLineEnding::esNone),
      33, uint(QCPLineEnding::esFlatArrow),
      45, uint(QCPLineEnding::esSpikeArrow),
      58, uint(QCPLineEnding::esLineArrow),
      70, uint(QCPLineEnding::esDisc),
      77, uint(QCPLineEnding::esSquare),
      86, uint(QCPLineEnding::esDiamond),
      96, uint(QCPLineEnding::esBar),
     102, uint(QCPLineEnding::esHalfBar),
     112, uint(QCPLineEnding::esSkewedBar),

       0        // eod
};

static const char qt_meta_stringdata_QCPLineEnding[] = {
    "QCPLineEnding\0EndingStyle\0esNone\0"
    "esFlatArrow\0esSpikeArrow\0esLineArrow\0"
    "esDisc\0esSquare\0esDiamond\0esBar\0"
    "esHalfBar\0esSkewedBar\0"
};

const QMetaObject QCPLineEnding::staticMetaObject = {
    { 0, qt_meta_stringdata_QCPLineEnding,
      qt_meta_data_QCPLineEnding, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLineEnding::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION
static const uint qt_meta_data_QCPGrid[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       6,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      13,    8, 0x01095103,
      28,    8, 0x01095103,
      47,    8, 0x01095103,
      72,   67, 0x4d095103,
      76,   67, 0x4d095103,
      87,   67, 0x4d095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPGrid[] = {
    "QCPGrid\0bool\0subGridVisible\0"
    "antialiasedSubGrid\0antialiasedZeroLine\0"
    "QPen\0pen\0subGridPen\0zeroLinePen\0"
};

const QMetaObject QCPGrid::staticMetaObject = {
    { &QCPLayerable::staticMetaObject, qt_meta_stringdata_QCPGrid,
      qt_meta_data_QCPGrid, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPGrid::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPGrid::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPGrid::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPGrid))
        return static_cast<void*>(const_cast< QCPGrid*>(this));
    return QCPLayerable::qt_metacast(_clname);
}

int QCPGrid::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayerable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< bool*>(_v) = subGridVisible(); break;
        case 1: *reinterpret_cast< bool*>(_v) = antialiasedSubGrid(); break;
        case 2: *reinterpret_cast< bool*>(_v) = antialiasedZeroLine(); break;
        case 3: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 4: *reinterpret_cast< QPen*>(_v) = subGridPen(); break;
        case 5: *reinterpret_cast< QPen*>(_v) = zeroLinePen(); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setSubGridVisible(*reinterpret_cast< bool*>(_v)); break;
        case 1: setAntialiasedSubGrid(*reinterpret_cast< bool*>(_v)); break;
        case 2: setAntialiasedZeroLine(*reinterpret_cast< bool*>(_v)); break;
        case 3: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 4: setSubGridPen(*reinterpret_cast< QPen*>(_v)); break;
        case 5: setZeroLinePen(*reinterpret_cast< QPen*>(_v)); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 6;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPAxis[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
      10,   14, // methods
      52,   64, // properties
       7,  272, // enums/sets
       0,    0, // constructors
       0,       // flags
       6,       // signalCount

 // signals: signature, parameters, type, tag, flags
       9,    8,    8,    8, 0x05,
      33,   24,    8,    8, 0x05,
      74,   56,    8,    8, 0x05,
     116,  106,    8,    8, 0x05,
     159,  153,    8,    8, 0x05,
     202,  153,    8,    8, 0x05,

 // slots: signature, parameters, type, tag, flags
     251,  246,    8,    8, 0x0a,
     290,  284,    8,    8, 0x0a,
     325,  309,    8,    8, 0x0a,
     384,  370,    8,    8, 0x0a,

 // properties: name, type, flags
     436,  427, 0x00095009,
     458,  445, 0x00095009,
     106,  467, 0x0049510b,
     484,  477, 0x06095103,
     284,  497, 0x0049510b,
     511,  506, 0x01095103,
     525,  506, 0x01095103,
     539,  535, 0x02095103,
     553,  506, 0x01095103,
     568,  506, 0x01095103,
     581,  506, 0x01095103,
     594,  506, 0x01095103,
     600,  506, 0x01095103,
     611,  535, 0x02095103,
     638,  628, 0x0009510b,
     658,  652, 0x40095103,
     679,  672, 0x43095103,
     694,  477, 0x06095103,
     722,  712, 0x0009510b,
     744,  736, 0x0a095103,
     772,  759, 0x0009510b,
     785,  736, 0x0a095103,
     798,  535, 0x02095103,
     814,  477, 0x06095103,
     839,  823, 0x0009510b,
     867,  850, 0x0009510b,
     884,  535, 0x02095103,
     897,  535, 0x02095103,
     911,  535, 0x02095103,
     924,  535, 0x02095103,
     940,  535, 0x02095103,
     962,  957, 0x4d095103,
     970,  957, 0x4d095103,
     978,  957, 0x4d095103,
     989,  652, 0x40095103,
     999,  672, 0x43095103,
    1010,  736, 0x0a095103,
    1016,  535, 0x02095103,
    1029,  535, 0x02095103,
    1037,  535, 0x02095103,
     370, 1044, 0x0049510b,
     309, 1044, 0x0049510b,
    1060,  652, 0x40095103,
    1082,  652, 0x40095103,
    1100,  672, 0x43095103,
    1123,  672, 0x43095103,
    1142,  957, 0x4d095103,
    1158,  957, 0x4d095103,
    1174,  957, 0x4d095103,
    1207, 1193, 0x0009510b,
    1219, 1193, 0x0009510b,
    1240, 1231, 0x00095009,

 // properties: notify_signal_id
       0,
       0,
       3,
       0,
       1,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       4,
       5,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,

 // enums: name, flags, count, data
     427, 0x1,    4,  300,
    1245, 0x1,    4,  308,
     628, 0x0,    2,  316,
     712, 0x0,    2,  320,
     467, 0x0,    2,  324,
    1255, 0x1,    4,  328,
    1044, 0x1,    4,  336,

 // enum data: key, value
    1270, uint(QCPAxis::atLeft),
    1277, uint(QCPAxis::atRight),
    1285, uint(QCPAxis::atTop),
    1291, uint(QCPAxis::atBottom),
    1270, uint(QCPAxis::atLeft),
    1277, uint(QCPAxis::atRight),
    1285, uint(QCPAxis::atTop),
    1291, uint(QCPAxis::atBottom),
    1300, uint(QCPAxis::ltNumber),
    1309, uint(QCPAxis::ltDateTime),
    1320, uint(QCPAxis::lsInside),
    1329, uint(QCPAxis::lsOutside),
    1339, uint(QCPAxis::stLinear),
    1348, uint(QCPAxis::stLogarithmic),
    1362, uint(QCPAxis::spNone),
    1369, uint(QCPAxis::spAxis),
    1376, uint(QCPAxis::spTickLabels),
    1389, uint(QCPAxis::spAxisLabel),
    1362, uint(QCPAxis::spNone),
    1369, uint(QCPAxis::spAxis),
    1376, uint(QCPAxis::spTickLabels),
    1389, uint(QCPAxis::spAxisLabel),

       0        // eod
};

static const char qt_meta_stringdata_QCPAxis[] = {
    "QCPAxis\0\0ticksRequest()\0newRange\0"
    "rangeChanged(QCPRange)\0newRange,oldRange\0"
    "rangeChanged(QCPRange,QCPRange)\0"
    "scaleType\0scaleTypeChanged(QCPAxis::ScaleType)\0"
    "parts\0selectionChanged(QCPAxis::SelectableParts)\0"
    "selectableChanged(QCPAxis::SelectableParts)\0"
    "type\0setScaleType(QCPAxis::ScaleType)\0"
    "range\0setRange(QCPRange)\0selectableParts\0"
    "setSelectableParts(QCPAxis::SelectableParts)\0"
    "selectedParts\0setSelectedParts(QCPAxis::SelectableParts)\0"
    "AxisType\0axisType\0QCPAxisRect*\0axisRect\0"
    "ScaleType\0double\0scaleLogBase\0QCPRange\0"
    "bool\0rangeReversed\0autoTicks\0int\0"
    "autoTickCount\0autoTickLabels\0autoTickStep\0"
    "autoSubTicks\0ticks\0tickLabels\0"
    "tickLabelPadding\0LabelType\0tickLabelType\0"
    "QFont\0tickLabelFont\0QColor\0tickLabelColor\0"
    "tickLabelRotation\0LabelSide\0tickLabelSide\0"
    "QString\0dateTimeFormat\0Qt::TimeSpec\0"
    "dateTimeSpec\0numberFormat\0numberPrecision\0"
    "tickStep\0QVector<double>\0tickVector\0"
    "QVector<QString>\0tickVectorLabels\0"
    "tickLengthIn\0tickLengthOut\0subTickCount\0"
    "subTickLengthIn\0subTickLengthOut\0QPen\0"
    "basePen\0tickPen\0subTickPen\0labelFont\0"
    "labelColor\0label\0labelPadding\0padding\0"
    "offset\0SelectableParts\0selectedTickLabelFont\0"
    "selectedLabelFont\0selectedTickLabelColor\0"
    "selectedLabelColor\0selectedBasePen\0"
    "selectedTickPen\0selectedSubTickPen\0"
    "QCPLineEnding\0lowerEnding\0upperEnding\0"
    "QCPGrid*\0grid\0AxisTypes\0SelectablePart\0"
    "atLeft\0atRight\0atTop\0atBottom\0ltNumber\0"
    "ltDateTime\0lsInside\0lsOutside\0stLinear\0"
    "stLogarithmic\0spNone\0spAxis\0spTickLabels\0"
    "spAxisLabel\0"
};

const QMetaObject QCPAxis::staticMetaObject = {
    { &QCPLayerable::staticMetaObject, qt_meta_stringdata_QCPAxis,
      qt_meta_data_QCPAxis, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPAxis::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPAxis::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPAxis::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPAxis))
        return static_cast<void*>(const_cast< QCPAxis*>(this));
    return QCPLayerable::qt_metacast(_clname);
}

int QCPAxis::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayerable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: ticksRequest(); break;
        case 1: rangeChanged((*reinterpret_cast< const QCPRange(*)>(_a[1]))); break;
        case 2: rangeChanged((*reinterpret_cast< const QCPRange(*)>(_a[1])),(*reinterpret_cast< const QCPRange(*)>(_a[2]))); break;
        case 3: scaleTypeChanged((*reinterpret_cast< QCPAxis::ScaleType(*)>(_a[1]))); break;
        case 4: selectionChanged((*reinterpret_cast< const QCPAxis::SelectableParts(*)>(_a[1]))); break;
        case 5: selectableChanged((*reinterpret_cast< const QCPAxis::SelectableParts(*)>(_a[1]))); break;
        case 6: setScaleType((*reinterpret_cast< QCPAxis::ScaleType(*)>(_a[1]))); break;
        case 7: setRange((*reinterpret_cast< const QCPRange(*)>(_a[1]))); break;
        case 8: setSelectableParts((*reinterpret_cast< const QCPAxis::SelectableParts(*)>(_a[1]))); break;
        case 9: setSelectedParts((*reinterpret_cast< const QCPAxis::SelectableParts(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 10;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast<int*>(_v) = QFlag(axisType()); break;
        case 1: *reinterpret_cast< QCPAxisRect**>(_v) = axisRect(); break;
        case 2: *reinterpret_cast< ScaleType*>(_v) = scaleType(); break;
        case 3: *reinterpret_cast< double*>(_v) = scaleLogBase(); break;
        case 4: *reinterpret_cast< QCPRange*>(_v) = range(); break;
        case 5: *reinterpret_cast< bool*>(_v) = rangeReversed(); break;
        case 6: *reinterpret_cast< bool*>(_v) = autoTicks(); break;
        case 7: *reinterpret_cast< int*>(_v) = autoTickCount(); break;
        case 8: *reinterpret_cast< bool*>(_v) = autoTickLabels(); break;
        case 9: *reinterpret_cast< bool*>(_v) = autoTickStep(); break;
        case 10: *reinterpret_cast< bool*>(_v) = autoSubTicks(); break;
        case 11: *reinterpret_cast< bool*>(_v) = ticks(); break;
        case 12: *reinterpret_cast< bool*>(_v) = tickLabels(); break;
        case 13: *reinterpret_cast< int*>(_v) = tickLabelPadding(); break;
        case 14: *reinterpret_cast< LabelType*>(_v) = tickLabelType(); break;
        case 15: *reinterpret_cast< QFont*>(_v) = tickLabelFont(); break;
        case 16: *reinterpret_cast< QColor*>(_v) = tickLabelColor(); break;
        case 17: *reinterpret_cast< double*>(_v) = tickLabelRotation(); break;
        case 18: *reinterpret_cast< LabelSide*>(_v) = tickLabelSide(); break;
        case 19: *reinterpret_cast< QString*>(_v) = dateTimeFormat(); break;
        case 20: *reinterpret_cast< Qt::TimeSpec*>(_v) = dateTimeSpec(); break;
        case 21: *reinterpret_cast< QString*>(_v) = numberFormat(); break;
        case 22: *reinterpret_cast< int*>(_v) = numberPrecision(); break;
        case 23: *reinterpret_cast< double*>(_v) = tickStep(); break;
        case 24: *reinterpret_cast< QVector<double>*>(_v) = tickVector(); break;
        case 25: *reinterpret_cast< QVector<QString>*>(_v) = tickVectorLabels(); break;
        case 26: *reinterpret_cast< int*>(_v) = tickLengthIn(); break;
        case 27: *reinterpret_cast< int*>(_v) = tickLengthOut(); break;
        case 28: *reinterpret_cast< int*>(_v) = subTickCount(); break;
        case 29: *reinterpret_cast< int*>(_v) = subTickLengthIn(); break;
        case 30: *reinterpret_cast< int*>(_v) = subTickLengthOut(); break;
        case 31: *reinterpret_cast< QPen*>(_v) = basePen(); break;
        case 32: *reinterpret_cast< QPen*>(_v) = tickPen(); break;
        case 33: *reinterpret_cast< QPen*>(_v) = subTickPen(); break;
        case 34: *reinterpret_cast< QFont*>(_v) = labelFont(); break;
        case 35: *reinterpret_cast< QColor*>(_v) = labelColor(); break;
        case 36: *reinterpret_cast< QString*>(_v) = label(); break;
        case 37: *reinterpret_cast< int*>(_v) = labelPadding(); break;
        case 38: *reinterpret_cast< int*>(_v) = padding(); break;
        case 39: *reinterpret_cast< int*>(_v) = offset(); break;
        case 40: *reinterpret_cast<int*>(_v) = QFlag(selectedParts()); break;
        case 41: *reinterpret_cast<int*>(_v) = QFlag(selectableParts()); break;
        case 42: *reinterpret_cast< QFont*>(_v) = selectedTickLabelFont(); break;
        case 43: *reinterpret_cast< QFont*>(_v) = selectedLabelFont(); break;
        case 44: *reinterpret_cast< QColor*>(_v) = selectedTickLabelColor(); break;
        case 45: *reinterpret_cast< QColor*>(_v) = selectedLabelColor(); break;
        case 46: *reinterpret_cast< QPen*>(_v) = selectedBasePen(); break;
        case 47: *reinterpret_cast< QPen*>(_v) = selectedTickPen(); break;
        case 48: *reinterpret_cast< QPen*>(_v) = selectedSubTickPen(); break;
        case 49: *reinterpret_cast< QCPLineEnding*>(_v) = lowerEnding(); break;
        case 50: *reinterpret_cast< QCPLineEnding*>(_v) = upperEnding(); break;
        case 51: *reinterpret_cast< QCPGrid**>(_v) = grid(); break;
        }
        _id -= 52;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 2: setScaleType(*reinterpret_cast< ScaleType*>(_v)); break;
        case 3: setScaleLogBase(*reinterpret_cast< double*>(_v)); break;
        case 4: setRange(*reinterpret_cast< QCPRange*>(_v)); break;
        case 5: setRangeReversed(*reinterpret_cast< bool*>(_v)); break;
        case 6: setAutoTicks(*reinterpret_cast< bool*>(_v)); break;
        case 7: setAutoTickCount(*reinterpret_cast< int*>(_v)); break;
        case 8: setAutoTickLabels(*reinterpret_cast< bool*>(_v)); break;
        case 9: setAutoTickStep(*reinterpret_cast< bool*>(_v)); break;
        case 10: setAutoSubTicks(*reinterpret_cast< bool*>(_v)); break;
        case 11: setTicks(*reinterpret_cast< bool*>(_v)); break;
        case 12: setTickLabels(*reinterpret_cast< bool*>(_v)); break;
        case 13: setTickLabelPadding(*reinterpret_cast< int*>(_v)); break;
        case 14: setTickLabelType(*reinterpret_cast< LabelType*>(_v)); break;
        case 15: setTickLabelFont(*reinterpret_cast< QFont*>(_v)); break;
        case 16: setTickLabelColor(*reinterpret_cast< QColor*>(_v)); break;
        case 17: setTickLabelRotation(*reinterpret_cast< double*>(_v)); break;
        case 18: setTickLabelSide(*reinterpret_cast< LabelSide*>(_v)); break;
        case 19: setDateTimeFormat(*reinterpret_cast< QString*>(_v)); break;
        case 20: setDateTimeSpec(*reinterpret_cast< Qt::TimeSpec*>(_v)); break;
        case 21: setNumberFormat(*reinterpret_cast< QString*>(_v)); break;
        case 22: setNumberPrecision(*reinterpret_cast< int*>(_v)); break;
        case 23: setTickStep(*reinterpret_cast< double*>(_v)); break;
        case 24: setTickVector(*reinterpret_cast< QVector<double>*>(_v)); break;
        case 25: setTickVectorLabels(*reinterpret_cast< QVector<QString>*>(_v)); break;
        case 26: setTickLengthIn(*reinterpret_cast< int*>(_v)); break;
        case 27: setTickLengthOut(*reinterpret_cast< int*>(_v)); break;
        case 28: setSubTickCount(*reinterpret_cast< int*>(_v)); break;
        case 29: setSubTickLengthIn(*reinterpret_cast< int*>(_v)); break;
        case 30: setSubTickLengthOut(*reinterpret_cast< int*>(_v)); break;
        case 31: setBasePen(*reinterpret_cast< QPen*>(_v)); break;
        case 32: setTickPen(*reinterpret_cast< QPen*>(_v)); break;
        case 33: setSubTickPen(*reinterpret_cast< QPen*>(_v)); break;
        case 34: setLabelFont(*reinterpret_cast< QFont*>(_v)); break;
        case 35: setLabelColor(*reinterpret_cast< QColor*>(_v)); break;
        case 36: setLabel(*reinterpret_cast< QString*>(_v)); break;
        case 37: setLabelPadding(*reinterpret_cast< int*>(_v)); break;
        case 38: setPadding(*reinterpret_cast< int*>(_v)); break;
        case 39: setOffset(*reinterpret_cast< int*>(_v)); break;
        case 40: setSelectedParts(QFlag(*reinterpret_cast<int*>(_v))); break;
        case 41: setSelectableParts(QFlag(*reinterpret_cast<int*>(_v))); break;
        case 42: setSelectedTickLabelFont(*reinterpret_cast< QFont*>(_v)); break;
        case 43: setSelectedLabelFont(*reinterpret_cast< QFont*>(_v)); break;
        case 44: setSelectedTickLabelColor(*reinterpret_cast< QColor*>(_v)); break;
        case 45: setSelectedLabelColor(*reinterpret_cast< QColor*>(_v)); break;
        case 46: setSelectedBasePen(*reinterpret_cast< QPen*>(_v)); break;
        case 47: setSelectedTickPen(*reinterpret_cast< QPen*>(_v)); break;
        case 48: setSelectedSubTickPen(*reinterpret_cast< QPen*>(_v)); break;
        case 49: setLowerEnding(*reinterpret_cast< QCPLineEnding*>(_v)); break;
        case 50: setUpperEnding(*reinterpret_cast< QCPLineEnding*>(_v)); break;
        }
        _id -= 52;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 52;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 52;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 52;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 52;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 52;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 52;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPAxis::ticksRequest()
{
    QMetaObject::activate(this, &staticMetaObject, 0, 0);
}

// SIGNAL 1
void QCPAxis::rangeChanged(const QCPRange & _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void QCPAxis::rangeChanged(const QCPRange & _t1, const QCPRange & _t2)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}

// SIGNAL 3
void QCPAxis::scaleTypeChanged(QCPAxis::ScaleType _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 3, _a);
}

// SIGNAL 4
void QCPAxis::selectionChanged(const QCPAxis::SelectableParts & _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 4, _a);
}

// SIGNAL 5
void QCPAxis::selectableChanged(const QCPAxis::SelectableParts & _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 5, _a);
}
static const uint qt_meta_data_QCPAbstractPlottable[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
      12,   34, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      31,   22,   21,   21, 0x05,
      65,   54,   21,   21, 0x05,

 // slots: signature, parameters, type, tag, flags
      89,   54,   21,   21, 0x0a,
     109,   22,   21,   21, 0x0a,

 // properties: name, type, flags
     135,  127, 0x0a095103,
     145,  140, 0x01095103,
     161,  140, 0x01095103,
     181,  140, 0x01095103,
     207,  202, 0x4d095103,
     211,  202, 0x4d095103,
     230,  223, 0x42095103,
     236,  223, 0x42095103,
     259,  250, 0x0009510b,
     267,  250, 0x0009510b,
      54,  140, 0x01495103,
      22,  140, 0x01495103,

 // properties: notify_signal_id
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       1,
       0,

       0        // eod
};

static const char qt_meta_stringdata_QCPAbstractPlottable[] = {
    "QCPAbstractPlottable\0\0selected\0"
    "selectionChanged(bool)\0selectable\0"
    "selectableChanged(bool)\0setSelectable(bool)\0"
    "setSelected(bool)\0QString\0name\0bool\0"
    "antialiasedFill\0antialiasedScatters\0"
    "antialiasedErrorBars\0QPen\0pen\0selectedPen\0"
    "QBrush\0brush\0selectedBrush\0QCPAxis*\0"
    "keyAxis\0valueAxis\0"
};

const QMetaObject QCPAbstractPlottable::staticMetaObject = {
    { &QCPLayerable::staticMetaObject, qt_meta_stringdata_QCPAbstractPlottable,
      qt_meta_data_QCPAbstractPlottable, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPAbstractPlottable::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPAbstractPlottable::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPAbstractPlottable::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPAbstractPlottable))
        return static_cast<void*>(const_cast< QCPAbstractPlottable*>(this));
    return QCPLayerable::qt_metacast(_clname);
}

int QCPAbstractPlottable::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayerable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: selectionChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 1: selectableChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 2: setSelectable((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 3: setSelected((*reinterpret_cast< bool(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 4;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QString*>(_v) = name(); break;
        case 1: *reinterpret_cast< bool*>(_v) = antialiasedFill(); break;
        case 2: *reinterpret_cast< bool*>(_v) = antialiasedScatters(); break;
        case 3: *reinterpret_cast< bool*>(_v) = antialiasedErrorBars(); break;
        case 4: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 5: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 6: *reinterpret_cast< QBrush*>(_v) = brush(); break;
        case 7: *reinterpret_cast< QBrush*>(_v) = selectedBrush(); break;
        case 8: *reinterpret_cast< QCPAxis**>(_v) = keyAxis(); break;
        case 9: *reinterpret_cast< QCPAxis**>(_v) = valueAxis(); break;
        case 10: *reinterpret_cast< bool*>(_v) = selectable(); break;
        case 11: *reinterpret_cast< bool*>(_v) = selected(); break;
        }
        _id -= 12;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setName(*reinterpret_cast< QString*>(_v)); break;
        case 1: setAntialiasedFill(*reinterpret_cast< bool*>(_v)); break;
        case 2: setAntialiasedScatters(*reinterpret_cast< bool*>(_v)); break;
        case 3: setAntialiasedErrorBars(*reinterpret_cast< bool*>(_v)); break;
        case 4: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 5: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 6: setBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 7: setSelectedBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 8: setKeyAxis(*reinterpret_cast< QCPAxis**>(_v)); break;
        case 9: setValueAxis(*reinterpret_cast< QCPAxis**>(_v)); break;
        case 10: setSelectable(*reinterpret_cast< bool*>(_v)); break;
        case 11: setSelected(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 12;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 12;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 12;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 12;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 12;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 12;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 12;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPAbstractPlottable::selectionChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCPAbstractPlottable::selectableChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
static const uint qt_meta_data_QCPAbstractItem[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
       4,   34, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      26,   17,   16,   16, 0x05,
      60,   49,   16,   16, 0x05,

 // slots: signature, parameters, type, tag, flags
      84,   49,   16,   16, 0x0a,
     104,   17,   16,   16, 0x0a,

 // properties: name, type, flags
     127,  122, 0x01095103,
     155,  142, 0x0009510b,
      49,  122, 0x01495103,
      17,  122, 0x01495103,

 // properties: notify_signal_id
       0,
       0,
       1,
       0,

       0        // eod
};

static const char qt_meta_stringdata_QCPAbstractItem[] = {
    "QCPAbstractItem\0\0selected\0"
    "selectionChanged(bool)\0selectable\0"
    "selectableChanged(bool)\0setSelectable(bool)\0"
    "setSelected(bool)\0bool\0clipToAxisRect\0"
    "QCPAxisRect*\0clipAxisRect\0"
};

const QMetaObject QCPAbstractItem::staticMetaObject = {
    { &QCPLayerable::staticMetaObject, qt_meta_stringdata_QCPAbstractItem,
      qt_meta_data_QCPAbstractItem, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPAbstractItem::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPAbstractItem::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPAbstractItem::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPAbstractItem))
        return static_cast<void*>(const_cast< QCPAbstractItem*>(this));
    return QCPLayerable::qt_metacast(_clname);
}

int QCPAbstractItem::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayerable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: selectionChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 1: selectableChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 2: setSelectable((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 3: setSelected((*reinterpret_cast< bool(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 4;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< bool*>(_v) = clipToAxisRect(); break;
        case 1: *reinterpret_cast< QCPAxisRect**>(_v) = clipAxisRect(); break;
        case 2: *reinterpret_cast< bool*>(_v) = selectable(); break;
        case 3: *reinterpret_cast< bool*>(_v) = selected(); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setClipToAxisRect(*reinterpret_cast< bool*>(_v)); break;
        case 1: setClipAxisRect(*reinterpret_cast< QCPAxisRect**>(_v)); break;
        case 2: setSelectable(*reinterpret_cast< bool*>(_v)); break;
        case 3: setSelected(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 4;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPAbstractItem::selectionChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCPAbstractItem::selectableChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
static const uint qt_meta_data_QCustomPlot[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
      23,   14, // methods
       9,  129, // properties
       1,  156, // enums/sets
       0,    0, // constructors
       0,       // flags
      18,       // signalCount

 // signals: signature, parameters, type, tag, flags
      19,   13,   12,   12, 0x05,
      50,   13,   12,   12, 0x05,
      75,   13,   12,   12, 0x05,
      99,   13,   12,   12, 0x05,
     126,   13,   12,   12, 0x05,
     167,  151,   12,   12, 0x05,
     218,  151,   12,   12, 0x05,
     286,  275,   12,   12, 0x05,
     327,  275,   12,   12, 0x05,
     390,  374,   12,   12, 0x05,
     447,  374,   12,   12, 0x05,
     528,  510,   12,   12, 0x05,
     588,  510,   12,   12, 0x05,
     666,  654,   12,   12, 0x05,
     705,  654,   12,   12, 0x05,
     750,   12,   12,   12, 0x05,
     775,   12,   12,   12, 0x05,
     790,   12,   12,   12, 0x05,

 // slots: signature, parameters, type, tag, flags
     826,  804,   12,   12, 0x0a,
     844,   12,   12,   12, 0x2a,
     858,   12,   12,   12, 0x0a,
     888,  872,   12,   12, 0x0a,
     925,   12,   12,   12, 0x2a,

 // properties: name, type, flags
     940,  934, 0x13095103,
     957,  949, 0x41095103,
     973,  968, 0x01095103,
    1010,  990, 0x0009510b,
    1046, 1031, 0x00095009,
    1057,  968, 0x01095103,
    1086, 1082, 0x02095103,
    1105,  968, 0x01095103,
    1147, 1126, 0x0009510b,

 // enums: name, flags, count, data
    1167, 0x0,    2,  160,

 // enum data: key, value
    1183, uint(QCustomPlot::limBelow),
    1192, uint(QCustomPlot::limAbove),

       0        // eod
};

static const char qt_meta_stringdata_QCustomPlot[] = {
    "QCustomPlot\0\0event\0mouseDoubleClick(QMouseEvent*)\0"
    "mousePress(QMouseEvent*)\0"
    "mouseMove(QMouseEvent*)\0"
    "mouseRelease(QMouseEvent*)\0"
    "mouseWheel(QWheelEvent*)\0plottable,event\0"
    "plottableClick(QCPAbstractPlottable*,QMouseEvent*)\0"
    "plottableDoubleClick(QCPAbstractPlottable*,QMouseEvent*)\0"
    "item,event\0itemClick(QCPAbstractItem*,QMouseEvent*)\0"
    "itemDoubleClick(QCPAbstractItem*,QMouseEvent*)\0"
    "axis,part,event\0"
    "axisClick(QCPAxis*,QCPAxis::SelectablePart,QMouseEvent*)\0"
    "axisDoubleClick(QCPAxis*,QCPAxis::SelectablePart,QMouseEvent*)\0"
    "legend,item,event\0"
    "legendClick(QCPLegend*,QCPAbstractLegendItem*,QMouseEvent*)\0"
    "legendDoubleClick(QCPLegend*,QCPAbstractLegendItem*,QMouseEvent*)\0"
    "event,title\0titleClick(QMouseEvent*,QCPPlotTitle*)\0"
    "titleDoubleClick(QMouseEvent*,QCPPlotTitle*)\0"
    "selectionChangedByUser()\0beforeReplot()\0"
    "afterReplot()\0onlyVisiblePlottables\0"
    "rescaleAxes(bool)\0rescaleAxes()\0"
    "deselectAll()\0refreshPriority\0"
    "replot(QCustomPlot::RefreshPriority)\0"
    "replot()\0QRect\0viewport\0QPixmap\0"
    "background\0bool\0backgroundScaled\0"
    "Qt::AspectRatioMode\0backgroundScaledMode\0"
    "QCPLayoutGrid*\0plotLayout\0"
    "autoAddPlottableToLegend\0int\0"
    "selectionTolerance\0noAntialiasingOnDrag\0"
    "Qt::KeyboardModifier\0multiSelectModifier\0"
    "LayerInsertMode\0limBelow\0limAbove\0"
};

const QMetaObject QCustomPlot::staticMetaObject = {
    { &QWidget::staticMetaObject, qt_meta_stringdata_QCustomPlot,
      qt_meta_data_QCustomPlot, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCustomPlot::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCustomPlot::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCustomPlot::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCustomPlot))
        return static_cast<void*>(const_cast< QCustomPlot*>(this));
    return QWidget::qt_metacast(_clname);
}

int QCustomPlot::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QWidget::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: mouseDoubleClick((*reinterpret_cast< QMouseEvent*(*)>(_a[1]))); break;
        case 1: mousePress((*reinterpret_cast< QMouseEvent*(*)>(_a[1]))); break;
        case 2: mouseMove((*reinterpret_cast< QMouseEvent*(*)>(_a[1]))); break;
        case 3: mouseRelease((*reinterpret_cast< QMouseEvent*(*)>(_a[1]))); break;
        case 4: mouseWheel((*reinterpret_cast< QWheelEvent*(*)>(_a[1]))); break;
        case 5: plottableClick((*reinterpret_cast< QCPAbstractPlottable*(*)>(_a[1])),(*reinterpret_cast< QMouseEvent*(*)>(_a[2]))); break;
        case 6: plottableDoubleClick((*reinterpret_cast< QCPAbstractPlottable*(*)>(_a[1])),(*reinterpret_cast< QMouseEvent*(*)>(_a[2]))); break;
        case 7: itemClick((*reinterpret_cast< QCPAbstractItem*(*)>(_a[1])),(*reinterpret_cast< QMouseEvent*(*)>(_a[2]))); break;
        case 8: itemDoubleClick((*reinterpret_cast< QCPAbstractItem*(*)>(_a[1])),(*reinterpret_cast< QMouseEvent*(*)>(_a[2]))); break;
        case 9: axisClick((*reinterpret_cast< QCPAxis*(*)>(_a[1])),(*reinterpret_cast< QCPAxis::SelectablePart(*)>(_a[2])),(*reinterpret_cast< QMouseEvent*(*)>(_a[3]))); break;
        case 10: axisDoubleClick((*reinterpret_cast< QCPAxis*(*)>(_a[1])),(*reinterpret_cast< QCPAxis::SelectablePart(*)>(_a[2])),(*reinterpret_cast< QMouseEvent*(*)>(_a[3]))); break;
        case 11: legendClick((*reinterpret_cast< QCPLegend*(*)>(_a[1])),(*reinterpret_cast< QCPAbstractLegendItem*(*)>(_a[2])),(*reinterpret_cast< QMouseEvent*(*)>(_a[3]))); break;
        case 12: legendDoubleClick((*reinterpret_cast< QCPLegend*(*)>(_a[1])),(*reinterpret_cast< QCPAbstractLegendItem*(*)>(_a[2])),(*reinterpret_cast< QMouseEvent*(*)>(_a[3]))); break;
        case 13: titleClick((*reinterpret_cast< QMouseEvent*(*)>(_a[1])),(*reinterpret_cast< QCPPlotTitle*(*)>(_a[2]))); break;
        case 14: titleDoubleClick((*reinterpret_cast< QMouseEvent*(*)>(_a[1])),(*reinterpret_cast< QCPPlotTitle*(*)>(_a[2]))); break;
        case 15: selectionChangedByUser(); break;
        case 16: beforeReplot(); break;
        case 17: afterReplot(); break;
        case 18: rescaleAxes((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 19: rescaleAxes(); break;
        case 20: deselectAll(); break;
        case 21: replot((*reinterpret_cast< QCustomPlot::RefreshPriority(*)>(_a[1]))); break;
        case 22: replot(); break;
        default: ;
        }
        _id -= 23;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QRect*>(_v) = viewport(); break;
        case 1: *reinterpret_cast< QPixmap*>(_v) = background(); break;
        case 2: *reinterpret_cast< bool*>(_v) = backgroundScaled(); break;
        case 3: *reinterpret_cast< Qt::AspectRatioMode*>(_v) = backgroundScaledMode(); break;
        case 4: *reinterpret_cast< QCPLayoutGrid**>(_v) = plotLayout(); break;
        case 5: *reinterpret_cast< bool*>(_v) = autoAddPlottableToLegend(); break;
        case 6: *reinterpret_cast< int*>(_v) = selectionTolerance(); break;
        case 7: *reinterpret_cast< bool*>(_v) = noAntialiasingOnDrag(); break;
        case 8: *reinterpret_cast< Qt::KeyboardModifier*>(_v) = multiSelectModifier(); break;
        }
        _id -= 9;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setViewport(*reinterpret_cast< QRect*>(_v)); break;
        case 1: setBackground(*reinterpret_cast< QPixmap*>(_v)); break;
        case 2: setBackgroundScaled(*reinterpret_cast< bool*>(_v)); break;
        case 3: setBackgroundScaledMode(*reinterpret_cast< Qt::AspectRatioMode*>(_v)); break;
        case 5: setAutoAddPlottableToLegend(*reinterpret_cast< bool*>(_v)); break;
        case 6: setSelectionTolerance(*reinterpret_cast< int*>(_v)); break;
        case 7: setNoAntialiasingOnDrag(*reinterpret_cast< bool*>(_v)); break;
        case 8: setMultiSelectModifier(*reinterpret_cast< Qt::KeyboardModifier*>(_v)); break;
        }
        _id -= 9;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 9;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCustomPlot::mouseDoubleClick(QMouseEvent * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCustomPlot::mousePress(QMouseEvent * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void QCustomPlot::mouseMove(QMouseEvent * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}

// SIGNAL 3
void QCustomPlot::mouseRelease(QMouseEvent * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 3, _a);
}

// SIGNAL 4
void QCustomPlot::mouseWheel(QWheelEvent * _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 4, _a);
}

// SIGNAL 5
void QCustomPlot::plottableClick(QCPAbstractPlottable * _t1, QMouseEvent * _t2)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 5, _a);
}

// SIGNAL 6
void QCustomPlot::plottableDoubleClick(QCPAbstractPlottable * _t1, QMouseEvent * _t2)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 6, _a);
}

// SIGNAL 7
void QCustomPlot::itemClick(QCPAbstractItem * _t1, QMouseEvent * _t2)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 7, _a);
}

// SIGNAL 8
void QCustomPlot::itemDoubleClick(QCPAbstractItem * _t1, QMouseEvent * _t2)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 8, _a);
}

// SIGNAL 9
void QCustomPlot::axisClick(QCPAxis * _t1, QCPAxis::SelectablePart _t2, QMouseEvent * _t3)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 9, _a);
}

// SIGNAL 10
void QCustomPlot::axisDoubleClick(QCPAxis * _t1, QCPAxis::SelectablePart _t2, QMouseEvent * _t3)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 10, _a);
}

// SIGNAL 11
void QCustomPlot::legendClick(QCPLegend * _t1, QCPAbstractLegendItem * _t2, QMouseEvent * _t3)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 11, _a);
}

// SIGNAL 12
void QCustomPlot::legendDoubleClick(QCPLegend * _t1, QCPAbstractLegendItem * _t2, QMouseEvent * _t3)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 12, _a);
}

// SIGNAL 13
void QCustomPlot::titleClick(QMouseEvent * _t1, QCPPlotTitle * _t2)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 13, _a);
}

// SIGNAL 14
void QCustomPlot::titleDoubleClick(QMouseEvent * _t1, QCPPlotTitle * _t2)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 14, _a);
}

// SIGNAL 15
void QCustomPlot::selectionChangedByUser()
{
    QMetaObject::activate(this, &staticMetaObject, 15, 0);
}

// SIGNAL 16
void QCustomPlot::beforeReplot()
{
    QMetaObject::activate(this, &staticMetaObject, 16, 0);
}

// SIGNAL 17
void QCustomPlot::afterReplot()
{
    QMetaObject::activate(this, &staticMetaObject, 17, 0);
}
static const uint qt_meta_data_QCPColorGradient[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       2,   14, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // enums: name, flags, count, data
      17, 0x0,    2,   22,
      36, 0x0,   12,   26,

 // enum data: key, value
      51, uint(QCPColorGradient::ciRGB),
      57, uint(QCPColorGradient::ciHSV),
      63, uint(QCPColorGradient::gpGrayscale),
      75, uint(QCPColorGradient::gpHot),
      81, uint(QCPColorGradient::gpCold),
      88, uint(QCPColorGradient::gpNight),
      96, uint(QCPColorGradient::gpCandy),
     104, uint(QCPColorGradient::gpGeography),
     116, uint(QCPColorGradient::gpIon),
     122, uint(QCPColorGradient::gpThermal),
     132, uint(QCPColorGradient::gpPolar),
     140, uint(QCPColorGradient::gpSpectrum),
     151, uint(QCPColorGradient::gpJet),
     157, uint(QCPColorGradient::gpHues),

       0        // eod
};

static const char qt_meta_stringdata_QCPColorGradient[] = {
    "QCPColorGradient\0ColorInterpolation\0"
    "GradientPreset\0ciRGB\0ciHSV\0gpGrayscale\0"
    "gpHot\0gpCold\0gpNight\0gpCandy\0gpGeography\0"
    "gpIon\0gpThermal\0gpPolar\0gpSpectrum\0"
    "gpJet\0gpHues\0"
};

const QMetaObject QCPColorGradient::staticMetaObject = {
    { 0, qt_meta_stringdata_QCPColorGradient,
      qt_meta_data_QCPColorGradient, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPColorGradient::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION
static const uint qt_meta_data_QCPAxisRect[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       5,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      20,   12, 0x41095103,
      36,   31, 0x01095103,
      73,   53, 0x0009510b,
     111,   94, 0x0009510b,
     121,   94, 0x0009510b,

       0        // eod
};

static const char qt_meta_stringdata_QCPAxisRect[] = {
    "QCPAxisRect\0QPixmap\0background\0bool\0"
    "backgroundScaled\0Qt::AspectRatioMode\0"
    "backgroundScaledMode\0Qt::Orientations\0"
    "rangeDrag\0rangeZoom\0"
};

const QMetaObject QCPAxisRect::staticMetaObject = {
    { &QCPLayoutElement::staticMetaObject, qt_meta_stringdata_QCPAxisRect,
      qt_meta_data_QCPAxisRect, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPAxisRect::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPAxisRect::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPAxisRect::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPAxisRect))
        return static_cast<void*>(const_cast< QCPAxisRect*>(this));
    return QCPLayoutElement::qt_metacast(_clname);
}

int QCPAxisRect::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayoutElement::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPixmap*>(_v) = background(); break;
        case 1: *reinterpret_cast< bool*>(_v) = backgroundScaled(); break;
        case 2: *reinterpret_cast< Qt::AspectRatioMode*>(_v) = backgroundScaledMode(); break;
        case 3: *reinterpret_cast< Qt::Orientations*>(_v) = rangeDrag(); break;
        case 4: *reinterpret_cast< Qt::Orientations*>(_v) = rangeZoom(); break;
        }
        _id -= 5;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setBackground(*reinterpret_cast< QPixmap*>(_v)); break;
        case 1: setBackgroundScaled(*reinterpret_cast< bool*>(_v)); break;
        case 2: setBackgroundScaledMode(*reinterpret_cast< Qt::AspectRatioMode*>(_v)); break;
        case 3: setRangeDrag(*reinterpret_cast< Qt::Orientations*>(_v)); break;
        case 4: setRangeZoom(*reinterpret_cast< Qt::Orientations*>(_v)); break;
        }
        _id -= 5;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 5;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 5;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPAbstractLegendItem[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
       7,   34, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      32,   23,   22,   22, 0x05,
      66,   55,   22,   22, 0x05,

 // slots: signature, parameters, type, tag, flags
      90,   55,   22,   22, 0x0a,
     110,   23,   22,   22, 0x0a,

 // properties: name, type, flags
     139,  128, 0x00095009,
     158,  152, 0x40095103,
     170,  163, 0x43095103,
     180,  152, 0x40095103,
     193,  163, 0x43095103,
      55,  211, 0x01495103,
      23,  211, 0x01495103,

 // properties: notify_signal_id
       0,
       0,
       0,
       0,
       0,
       0,
       1,

       0        // eod
};

static const char qt_meta_stringdata_QCPAbstractLegendItem[] = {
    "QCPAbstractLegendItem\0\0selected\0"
    "selectionChanged(bool)\0selectable\0"
    "selectableChanged(bool)\0setSelectable(bool)\0"
    "setSelected(bool)\0QCPLegend*\0parentLegend\0"
    "QFont\0font\0QColor\0textColor\0selectedFont\0"
    "selectedTextColor\0bool\0"
};

const QMetaObject QCPAbstractLegendItem::staticMetaObject = {
    { &QCPLayoutElement::staticMetaObject, qt_meta_stringdata_QCPAbstractLegendItem,
      qt_meta_data_QCPAbstractLegendItem, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPAbstractLegendItem::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPAbstractLegendItem::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPAbstractLegendItem::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPAbstractLegendItem))
        return static_cast<void*>(const_cast< QCPAbstractLegendItem*>(this));
    return QCPLayoutElement::qt_metacast(_clname);
}

int QCPAbstractLegendItem::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayoutElement::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: selectionChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 1: selectableChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 2: setSelectable((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 3: setSelected((*reinterpret_cast< bool(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 4;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QCPLegend**>(_v) = parentLegend(); break;
        case 1: *reinterpret_cast< QFont*>(_v) = font(); break;
        case 2: *reinterpret_cast< QColor*>(_v) = textColor(); break;
        case 3: *reinterpret_cast< QFont*>(_v) = selectedFont(); break;
        case 4: *reinterpret_cast< QColor*>(_v) = selectedTextColor(); break;
        case 5: *reinterpret_cast< bool*>(_v) = selectable(); break;
        case 6: *reinterpret_cast< bool*>(_v) = selected(); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 1: setFont(*reinterpret_cast< QFont*>(_v)); break;
        case 2: setTextColor(*reinterpret_cast< QColor*>(_v)); break;
        case 3: setSelectedFont(*reinterpret_cast< QFont*>(_v)); break;
        case 4: setSelectedTextColor(*reinterpret_cast< QColor*>(_v)); break;
        case 5: setSelectable(*reinterpret_cast< bool*>(_v)); break;
        case 6: setSelected(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 7;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPAbstractLegendItem::selectionChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCPAbstractLegendItem::selectableChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
static const uint qt_meta_data_QCPPlottableLegendItem[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

       0        // eod
};

static const char qt_meta_stringdata_QCPPlottableLegendItem[] = {
    "QCPPlottableLegendItem\0"
};

const QMetaObject QCPPlottableLegendItem::staticMetaObject = {
    { &QCPAbstractLegendItem::staticMetaObject, qt_meta_stringdata_QCPPlottableLegendItem,
      qt_meta_data_QCPPlottableLegendItem, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPPlottableLegendItem::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPPlottableLegendItem::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPPlottableLegendItem::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPPlottableLegendItem))
        return static_cast<void*>(const_cast< QCPPlottableLegendItem*>(this));
    return QCPAbstractLegendItem::qt_metacast(_clname);
}

int QCPPlottableLegendItem::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractLegendItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    return _id;
}
static const uint qt_meta_data_QCPLegend[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
      14,   34, // properties
       2,   90, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      17,   11,   10,   10, 0x05,
      62,   11,   10,   10, 0x05,

 // slots: signature, parameters, type, tag, flags
     124,  108,   10,   10, 0x0a,
     174,  160,   10,   10, 0x0a,

 // properties: name, type, flags
     213,  208, 0x4d095103,
     230,  223, 0x42095103,
     242,  236, 0x40095103,
     254,  247, 0x43095103,
     270,  264, 0x15095103,
     283,  279, 0x02095103,
     299,  208, 0x4d095103,
     108,  313, 0x0049510b,
     160,  313, 0x0049510b,
     329,  208, 0x4d095103,
     347,  208, 0x4d095103,
     369,  223, 0x42095103,
     383,  236, 0x40095103,
     396,  247, 0x43095103,

 // properties: notify_signal_id
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       0,
       1,
       0,
       0,
       0,
       0,
       0,

 // enums: name, flags, count, data
     414, 0x1,    3,   98,
     313, 0x1,    3,  104,

 // enum data: key, value
     429, uint(QCPLegend::spNone),
     436, uint(QCPLegend::spLegendBox),
     448, uint(QCPLegend::spItems),
     429, uint(QCPLegend::spNone),
     436, uint(QCPLegend::spLegendBox),
     448, uint(QCPLegend::spItems),

       0        // eod
};

static const char qt_meta_stringdata_QCPLegend[] = {
    "QCPLegend\0\0parts\0"
    "selectionChanged(QCPLegend::SelectableParts)\0"
    "selectableChanged(QCPLegend::SelectableParts)\0"
    "selectableParts\0setSelectableParts(SelectableParts)\0"
    "selectedParts\0setSelectedParts(SelectableParts)\0"
    "QPen\0borderPen\0QBrush\0brush\0QFont\0"
    "font\0QColor\0textColor\0QSize\0iconSize\0"
    "int\0iconTextPadding\0iconBorderPen\0"
    "SelectableParts\0selectedBorderPen\0"
    "selectedIconBorderPen\0selectedBrush\0"
    "selectedFont\0selectedTextColor\0"
    "SelectablePart\0spNone\0spLegendBox\0"
    "spItems\0"
};

const QMetaObject QCPLegend::staticMetaObject = {
    { &QCPLayoutGrid::staticMetaObject, qt_meta_stringdata_QCPLegend,
      qt_meta_data_QCPLegend, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPLegend::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPLegend::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPLegend::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPLegend))
        return static_cast<void*>(const_cast< QCPLegend*>(this));
    return QCPLayoutGrid::qt_metacast(_clname);
}

int QCPLegend::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayoutGrid::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: selectionChanged((*reinterpret_cast< QCPLegend::SelectableParts(*)>(_a[1]))); break;
        case 1: selectableChanged((*reinterpret_cast< QCPLegend::SelectableParts(*)>(_a[1]))); break;
        case 2: setSelectableParts((*reinterpret_cast< const SelectableParts(*)>(_a[1]))); break;
        case 3: setSelectedParts((*reinterpret_cast< const SelectableParts(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 4;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = borderPen(); break;
        case 1: *reinterpret_cast< QBrush*>(_v) = brush(); break;
        case 2: *reinterpret_cast< QFont*>(_v) = font(); break;
        case 3: *reinterpret_cast< QColor*>(_v) = textColor(); break;
        case 4: *reinterpret_cast< QSize*>(_v) = iconSize(); break;
        case 5: *reinterpret_cast< int*>(_v) = iconTextPadding(); break;
        case 6: *reinterpret_cast< QPen*>(_v) = iconBorderPen(); break;
        case 7: *reinterpret_cast<int*>(_v) = QFlag(selectableParts()); break;
        case 8: *reinterpret_cast<int*>(_v) = QFlag(selectedParts()); break;
        case 9: *reinterpret_cast< QPen*>(_v) = selectedBorderPen(); break;
        case 10: *reinterpret_cast< QPen*>(_v) = selectedIconBorderPen(); break;
        case 11: *reinterpret_cast< QBrush*>(_v) = selectedBrush(); break;
        case 12: *reinterpret_cast< QFont*>(_v) = selectedFont(); break;
        case 13: *reinterpret_cast< QColor*>(_v) = selectedTextColor(); break;
        }
        _id -= 14;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setBorderPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 2: setFont(*reinterpret_cast< QFont*>(_v)); break;
        case 3: setTextColor(*reinterpret_cast< QColor*>(_v)); break;
        case 4: setIconSize(*reinterpret_cast< QSize*>(_v)); break;
        case 5: setIconTextPadding(*reinterpret_cast< int*>(_v)); break;
        case 6: setIconBorderPen(*reinterpret_cast< QPen*>(_v)); break;
        case 7: setSelectableParts(QFlag(*reinterpret_cast<int*>(_v))); break;
        case 8: setSelectedParts(QFlag(*reinterpret_cast<int*>(_v))); break;
        case 9: setSelectedBorderPen(*reinterpret_cast< QPen*>(_v)); break;
        case 10: setSelectedIconBorderPen(*reinterpret_cast< QPen*>(_v)); break;
        case 11: setSelectedBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 12: setSelectedFont(*reinterpret_cast< QFont*>(_v)); break;
        case 13: setSelectedTextColor(*reinterpret_cast< QColor*>(_v)); break;
        }
        _id -= 14;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 14;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 14;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 14;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 14;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 14;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 14;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPLegend::selectionChanged(QCPLegend::SelectableParts _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCPLegend::selectableChanged(QCPLegend::SelectableParts _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
static const uint qt_meta_data_QCPPlotTitle[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       4,   14, // methods
       7,   34, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       2,       // signalCount

 // signals: signature, parameters, type, tag, flags
      23,   14,   13,   13, 0x05,
      57,   46,   13,   13, 0x05,

 // slots: signature, parameters, type, tag, flags
      81,   46,   13,   13, 0x0a,
     101,   14,   13,   13, 0x0a,

 // properties: name, type, flags
     127,  119, 0x0a095103,
     138,  132, 0x40095103,
     150,  143, 0x43095103,
     160,  132, 0x40095103,
     173,  143, 0x43095103,
      46,  191, 0x01495103,
      14,  191, 0x01495103,

 // properties: notify_signal_id
       0,
       0,
       0,
       0,
       0,
       1,
       0,

       0        // eod
};

static const char qt_meta_stringdata_QCPPlotTitle[] = {
    "QCPPlotTitle\0\0selected\0selectionChanged(bool)\0"
    "selectable\0selectableChanged(bool)\0"
    "setSelectable(bool)\0setSelected(bool)\0"
    "QString\0text\0QFont\0font\0QColor\0textColor\0"
    "selectedFont\0selectedTextColor\0bool\0"
};

const QMetaObject QCPPlotTitle::staticMetaObject = {
    { &QCPLayoutElement::staticMetaObject, qt_meta_stringdata_QCPPlotTitle,
      qt_meta_data_QCPPlotTitle, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPPlotTitle::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPPlotTitle::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPPlotTitle::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPPlotTitle))
        return static_cast<void*>(const_cast< QCPPlotTitle*>(this));
    return QCPLayoutElement::qt_metacast(_clname);
}

int QCPPlotTitle::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayoutElement::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: selectionChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 1: selectableChanged((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 2: setSelectable((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 3: setSelected((*reinterpret_cast< bool(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 4;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QString*>(_v) = text(); break;
        case 1: *reinterpret_cast< QFont*>(_v) = font(); break;
        case 2: *reinterpret_cast< QColor*>(_v) = textColor(); break;
        case 3: *reinterpret_cast< QFont*>(_v) = selectedFont(); break;
        case 4: *reinterpret_cast< QColor*>(_v) = selectedTextColor(); break;
        case 5: *reinterpret_cast< bool*>(_v) = selectable(); break;
        case 6: *reinterpret_cast< bool*>(_v) = selected(); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setText(*reinterpret_cast< QString*>(_v)); break;
        case 1: setFont(*reinterpret_cast< QFont*>(_v)); break;
        case 2: setTextColor(*reinterpret_cast< QColor*>(_v)); break;
        case 3: setSelectedFont(*reinterpret_cast< QFont*>(_v)); break;
        case 4: setSelectedTextColor(*reinterpret_cast< QColor*>(_v)); break;
        case 5: setSelectable(*reinterpret_cast< bool*>(_v)); break;
        case 6: setSelected(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 7;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPPlotTitle::selectionChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCPPlotTitle::selectableChanged(bool _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}
static const uint qt_meta_data_QCPColorScaleAxisRectPrivate[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       2,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: signature, parameters, type, tag, flags
      44,   30,   29,   29, 0x09,
     107,   91,   29,   29, 0x09,

       0        // eod
};

static const char qt_meta_stringdata_QCPColorScaleAxisRectPrivate[] = {
    "QCPColorScaleAxisRectPrivate\0\0"
    "selectedParts\0"
    "axisSelectionChanged(QCPAxis::SelectableParts)\0"
    "selectableParts\0"
    "axisSelectableChanged(QCPAxis::SelectableParts)\0"
};

const QMetaObject QCPColorScaleAxisRectPrivate::staticMetaObject = {
    { &QCPAxisRect::staticMetaObject, qt_meta_stringdata_QCPColorScaleAxisRectPrivate,
      qt_meta_data_QCPColorScaleAxisRectPrivate, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPColorScaleAxisRectPrivate::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPColorScaleAxisRectPrivate::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPColorScaleAxisRectPrivate::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPColorScaleAxisRectPrivate))
        return static_cast<void*>(const_cast< QCPColorScaleAxisRectPrivate*>(this));
    return QCPAxisRect::qt_metacast(_clname);
}

int QCPColorScaleAxisRectPrivate::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAxisRect::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: axisSelectionChanged((*reinterpret_cast< QCPAxis::SelectableParts(*)>(_a[1]))); break;
        case 1: axisSelectableChanged((*reinterpret_cast< QCPAxis::SelectableParts(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 2;
    }
    return _id;
}
static const uint qt_meta_data_QCPColorScale[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       6,   14, // methods
       8,   44, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       3,       // signalCount

 // signals: signature, parameters, type, tag, flags
      24,   15,   14,   14, 0x05,
      61,   51,   14,   14, 0x05,
     114,  102,   14,   14, 0x05,

 // slots: signature, parameters, type, tag, flags
     158,  148,   14,   14, 0x0a,
     181,   51,   14,   14, 0x0a,
     227,  218,   14,   14, 0x0a,

 // properties: name, type, flags
     275,  257, 0x0009510b,
     148,  280, 0x0049510b,
     308,  289, 0x0049510b,
     218,  322, 0x0049510b,
     347,  339, 0x0a095103,
     357,  353, 0x02095103,
     371,  366, 0x01095103,
     381,  366, 0x01095103,

 // properties: notify_signal_id
       0,
       0,
       1,
       2,
       0,
       0,
       0,
       0,

       0        // eod
};

static const char qt_meta_stringdata_QCPColorScale[] = {
    "QCPColorScale\0\0newRange\0"
    "dataRangeChanged(QCPRange)\0scaleType\0"
    "dataScaleTypeChanged(QCPAxis::ScaleType)\0"
    "newGradient\0gradientChanged(QCPColorGradient)\0"
    "dataRange\0setDataRange(QCPRange)\0"
    "setDataScaleType(QCPAxis::ScaleType)\0"
    "gradient\0setGradient(QCPColorGradient)\0"
    "QCPAxis::AxisType\0type\0QCPRange\0"
    "QCPAxis::ScaleType\0dataScaleType\0"
    "QCPColorGradient\0QString\0label\0int\0"
    "barWidth\0bool\0rangeDrag\0rangeZoom\0"
};

#ifdef Q_NO_DATA_RELOCATION
static const QMetaObjectAccessor qt_meta_extradata_QCPColorScale[] = {
        QCPAxis::getStaticMetaObject,
#else
static const QMetaObject *qt_meta_extradata_QCPColorScale[] = {
        &QCPAxis::staticMetaObject,
#endif //Q_NO_DATA_RELOCATION
    0
};

static const QMetaObjectExtraData qt_meta_extradata2_QCPColorScale = {
    qt_meta_extradata_QCPColorScale, 0 
};

const QMetaObject QCPColorScale::staticMetaObject = {
    { &QCPLayoutElement::staticMetaObject, qt_meta_stringdata_QCPColorScale,
      qt_meta_data_QCPColorScale, &qt_meta_extradata2_QCPColorScale }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPColorScale::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPColorScale::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPColorScale::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPColorScale))
        return static_cast<void*>(const_cast< QCPColorScale*>(this));
    return QCPLayoutElement::qt_metacast(_clname);
}

int QCPColorScale::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPLayoutElement::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: dataRangeChanged((*reinterpret_cast< QCPRange(*)>(_a[1]))); break;
        case 1: dataScaleTypeChanged((*reinterpret_cast< QCPAxis::ScaleType(*)>(_a[1]))); break;
        case 2: gradientChanged((*reinterpret_cast< QCPColorGradient(*)>(_a[1]))); break;
        case 3: setDataRange((*reinterpret_cast< const QCPRange(*)>(_a[1]))); break;
        case 4: setDataScaleType((*reinterpret_cast< QCPAxis::ScaleType(*)>(_a[1]))); break;
        case 5: setGradient((*reinterpret_cast< const QCPColorGradient(*)>(_a[1]))); break;
        default: ;
        }
        _id -= 6;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QCPAxis::AxisType*>(_v) = type(); break;
        case 1: *reinterpret_cast< QCPRange*>(_v) = dataRange(); break;
        case 2: *reinterpret_cast< QCPAxis::ScaleType*>(_v) = dataScaleType(); break;
        case 3: *reinterpret_cast< QCPColorGradient*>(_v) = gradient(); break;
        case 4: *reinterpret_cast< QString*>(_v) = label(); break;
        case 5: *reinterpret_cast< int*>(_v) = barWidth(); break;
        case 6: *reinterpret_cast< bool*>(_v) = rangeDrag(); break;
        case 7: *reinterpret_cast< bool*>(_v) = rangeZoom(); break;
        }
        _id -= 8;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setType(*reinterpret_cast< QCPAxis::AxisType*>(_v)); break;
        case 1: setDataRange(*reinterpret_cast< QCPRange*>(_v)); break;
        case 2: setDataScaleType(*reinterpret_cast< QCPAxis::ScaleType*>(_v)); break;
        case 3: setGradient(*reinterpret_cast< QCPColorGradient*>(_v)); break;
        case 4: setLabel(*reinterpret_cast< QString*>(_v)); break;
        case 5: setBarWidth(*reinterpret_cast< int*>(_v)); break;
        case 6: setRangeDrag(*reinterpret_cast< bool*>(_v)); break;
        case 7: setRangeZoom(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 8;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 8;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPColorScale::dataRangeChanged(QCPRange _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCPColorScale::dataScaleTypeChanged(QCPAxis::ScaleType _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void QCPColorScale::gradientChanged(QCPColorGradient _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}
static const uint qt_meta_data_QCPGraph[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       8,   14, // properties
       2,   38, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      19,    9, 0x0009510b,
      45,   29, 0x0009510b,
      68,   58, 0x0009510b,
      83,   78, 0x4d095103,
      99,   92, 0x06095103,
     117,  112, 0x01095103,
     146,  136, 0x0009510b,
     163,  112, 0x01095103,

 // enums: name, flags, count, data
       9, 0x0,    6,   46,
      58, 0x0,    4,   58,

 // enum data: key, value
     180, uint(QCPGraph::lsNone),
     187, uint(QCPGraph::lsLine),
     194, uint(QCPGraph::lsStepLeft),
     205, uint(QCPGraph::lsStepRight),
     217, uint(QCPGraph::lsStepCenter),
     230, uint(QCPGraph::lsImpulse),
     240, uint(QCPGraph::etNone),
     247, uint(QCPGraph::etKey),
     253, uint(QCPGraph::etValue),
     261, uint(QCPGraph::etBoth),

       0        // eod
};

static const char qt_meta_stringdata_QCPGraph[] = {
    "QCPGraph\0LineStyle\0lineStyle\0"
    "QCPScatterStyle\0scatterStyle\0ErrorType\0"
    "errorType\0QPen\0errorPen\0double\0"
    "errorBarSize\0bool\0errorBarSkipSymbol\0"
    "QCPGraph*\0channelFillGraph\0adaptiveSampling\0"
    "lsNone\0lsLine\0lsStepLeft\0lsStepRight\0"
    "lsStepCenter\0lsImpulse\0etNone\0etKey\0"
    "etValue\0etBoth\0"
};

const QMetaObject QCPGraph::staticMetaObject = {
    { &QCPAbstractPlottable::staticMetaObject, qt_meta_stringdata_QCPGraph,
      qt_meta_data_QCPGraph, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPGraph::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPGraph::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPGraph::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPGraph))
        return static_cast<void*>(const_cast< QCPGraph*>(this));
    return QCPAbstractPlottable::qt_metacast(_clname);
}

int QCPGraph::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractPlottable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< LineStyle*>(_v) = lineStyle(); break;
        case 1: *reinterpret_cast< QCPScatterStyle*>(_v) = scatterStyle(); break;
        case 2: *reinterpret_cast< ErrorType*>(_v) = errorType(); break;
        case 3: *reinterpret_cast< QPen*>(_v) = errorPen(); break;
        case 4: *reinterpret_cast< double*>(_v) = errorBarSize(); break;
        case 5: *reinterpret_cast< bool*>(_v) = errorBarSkipSymbol(); break;
        case 6: *reinterpret_cast< QCPGraph**>(_v) = channelFillGraph(); break;
        case 7: *reinterpret_cast< bool*>(_v) = adaptiveSampling(); break;
        }
        _id -= 8;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setLineStyle(*reinterpret_cast< LineStyle*>(_v)); break;
        case 1: setScatterStyle(*reinterpret_cast< QCPScatterStyle*>(_v)); break;
        case 2: setErrorType(*reinterpret_cast< ErrorType*>(_v)); break;
        case 3: setErrorPen(*reinterpret_cast< QPen*>(_v)); break;
        case 4: setErrorBarSize(*reinterpret_cast< double*>(_v)); break;
        case 5: setErrorBarSkipSymbol(*reinterpret_cast< bool*>(_v)); break;
        case 6: setChannelFillGraph(*reinterpret_cast< QCPGraph**>(_v)); break;
        case 7: setAdaptiveSampling(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 8;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 8;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 8;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPCurve[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       2,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      25,    9, 0x0009510b,
      48,   38, 0x0009510b,

       0        // eod
};

static const char qt_meta_stringdata_QCPCurve[] = {
    "QCPCurve\0QCPScatterStyle\0scatterStyle\0"
    "LineStyle\0lineStyle\0"
};

const QMetaObject QCPCurve::staticMetaObject = {
    { &QCPAbstractPlottable::staticMetaObject, qt_meta_stringdata_QCPCurve,
      qt_meta_data_QCPCurve, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPCurve::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPCurve::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPCurve::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPCurve))
        return static_cast<void*>(const_cast< QCPCurve*>(this));
    return QCPAbstractPlottable::qt_metacast(_clname);
}

int QCPCurve::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractPlottable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QCPScatterStyle*>(_v) = scatterStyle(); break;
        case 1: *reinterpret_cast< LineStyle*>(_v) = lineStyle(); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setScatterStyle(*reinterpret_cast< QCPScatterStyle*>(_v)); break;
        case 1: setLineStyle(*reinterpret_cast< LineStyle*>(_v)); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 2;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPBarsGroup[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       2,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      25,   13, 0x0009510b,
      44,   37, 0x06095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPBarsGroup[] = {
    "QCPBarsGroup\0SpacingType\0spacingType\0"
    "double\0spacing\0"
};

const QMetaObject QCPBarsGroup::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_QCPBarsGroup,
      qt_meta_data_QCPBarsGroup, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPBarsGroup::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPBarsGroup::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPBarsGroup::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPBarsGroup))
        return static_cast<void*>(const_cast< QCPBarsGroup*>(this));
    return QObject::qt_metacast(_clname);
}

int QCPBarsGroup::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< SpacingType*>(_v) = spacingType(); break;
        case 1: *reinterpret_cast< double*>(_v) = spacing(); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setSpacingType(*reinterpret_cast< SpacingType*>(_v)); break;
        case 1: setSpacing(*reinterpret_cast< double*>(_v)); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 2;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPBars[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       6,   14, // properties
       1,   32, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      15,    8, 0x06095103,
      31,   21, 0x0009510b,
      55,   41, 0x0009510b,
      65,    8, 0x06095103,
      84,   75, 0x00095009,
      93,   75, 0x00095009,

 // enums: name, flags, count, data
      21, 0x0,    3,   36,

 // enum data: key, value
     102, uint(QCPBars::wtAbsolute),
     113, uint(QCPBars::wtAxisRectRatio),
     129, uint(QCPBars::wtPlotCoords),

       0        // eod
};

static const char qt_meta_stringdata_QCPBars[] = {
    "QCPBars\0double\0width\0WidthType\0widthType\0"
    "QCPBarsGroup*\0barsGroup\0baseValue\0"
    "QCPBars*\0barBelow\0barAbove\0wtAbsolute\0"
    "wtAxisRectRatio\0wtPlotCoords\0"
};

const QMetaObject QCPBars::staticMetaObject = {
    { &QCPAbstractPlottable::staticMetaObject, qt_meta_stringdata_QCPBars,
      qt_meta_data_QCPBars, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPBars::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPBars::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPBars::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPBars))
        return static_cast<void*>(const_cast< QCPBars*>(this));
    return QCPAbstractPlottable::qt_metacast(_clname);
}

int QCPBars::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractPlottable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< double*>(_v) = width(); break;
        case 1: *reinterpret_cast< WidthType*>(_v) = widthType(); break;
        case 2: *reinterpret_cast< QCPBarsGroup**>(_v) = barsGroup(); break;
        case 3: *reinterpret_cast< double*>(_v) = baseValue(); break;
        case 4: *reinterpret_cast< QCPBars**>(_v) = barBelow(); break;
        case 5: *reinterpret_cast< QCPBars**>(_v) = barAbove(); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setWidth(*reinterpret_cast< double*>(_v)); break;
        case 1: setWidthType(*reinterpret_cast< WidthType*>(_v)); break;
        case 2: setBarsGroup(*reinterpret_cast< QCPBarsGroup**>(_v)); break;
        case 3: setBaseValue(*reinterpret_cast< double*>(_v)); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 6;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPStatisticalBox[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
      13,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      25,   18, 0x06095103,
      29,   18, 0x06095103,
      37,   18, 0x06095103,
      51,   18, 0x06095103,
      58,   18, 0x06095103,
      72,   18, 0x06095103,
      96,   80, 0x0009510b,
     105,   18, 0x06095103,
     111,   18, 0x06095103,
     129,  124, 0x4d095103,
     140,  124, 0x4d095103,
     154,  124, 0x4d095103,
     180,  164, 0x0009510b,

       0        // eod
};

static const char qt_meta_stringdata_QCPStatisticalBox[] = {
    "QCPStatisticalBox\0double\0key\0minimum\0"
    "lowerQuartile\0median\0upperQuartile\0"
    "maximum\0QVector<double>\0outliers\0width\0"
    "whiskerWidth\0QPen\0whiskerPen\0whiskerBarPen\0"
    "medianPen\0QCPScatterStyle\0outlierStyle\0"
};

const QMetaObject QCPStatisticalBox::staticMetaObject = {
    { &QCPAbstractPlottable::staticMetaObject, qt_meta_stringdata_QCPStatisticalBox,
      qt_meta_data_QCPStatisticalBox, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPStatisticalBox::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPStatisticalBox::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPStatisticalBox::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPStatisticalBox))
        return static_cast<void*>(const_cast< QCPStatisticalBox*>(this));
    return QCPAbstractPlottable::qt_metacast(_clname);
}

int QCPStatisticalBox::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractPlottable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< double*>(_v) = key(); break;
        case 1: *reinterpret_cast< double*>(_v) = minimum(); break;
        case 2: *reinterpret_cast< double*>(_v) = lowerQuartile(); break;
        case 3: *reinterpret_cast< double*>(_v) = median(); break;
        case 4: *reinterpret_cast< double*>(_v) = upperQuartile(); break;
        case 5: *reinterpret_cast< double*>(_v) = maximum(); break;
        case 6: *reinterpret_cast< QVector<double>*>(_v) = outliers(); break;
        case 7: *reinterpret_cast< double*>(_v) = width(); break;
        case 8: *reinterpret_cast< double*>(_v) = whiskerWidth(); break;
        case 9: *reinterpret_cast< QPen*>(_v) = whiskerPen(); break;
        case 10: *reinterpret_cast< QPen*>(_v) = whiskerBarPen(); break;
        case 11: *reinterpret_cast< QPen*>(_v) = medianPen(); break;
        case 12: *reinterpret_cast< QCPScatterStyle*>(_v) = outlierStyle(); break;
        }
        _id -= 13;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setKey(*reinterpret_cast< double*>(_v)); break;
        case 1: setMinimum(*reinterpret_cast< double*>(_v)); break;
        case 2: setLowerQuartile(*reinterpret_cast< double*>(_v)); break;
        case 3: setMedian(*reinterpret_cast< double*>(_v)); break;
        case 4: setUpperQuartile(*reinterpret_cast< double*>(_v)); break;
        case 5: setMaximum(*reinterpret_cast< double*>(_v)); break;
        case 6: setOutliers(*reinterpret_cast< QVector<double>*>(_v)); break;
        case 7: setWidth(*reinterpret_cast< double*>(_v)); break;
        case 8: setWhiskerWidth(*reinterpret_cast< double*>(_v)); break;
        case 9: setWhiskerPen(*reinterpret_cast< QPen*>(_v)); break;
        case 10: setWhiskerBarPen(*reinterpret_cast< QPen*>(_v)); break;
        case 11: setMedianPen(*reinterpret_cast< QPen*>(_v)); break;
        case 12: setOutlierStyle(*reinterpret_cast< QCPScatterStyle*>(_v)); break;
        }
        _id -= 13;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 13;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPColorMap[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       9,   14, // methods
       6,   59, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       3,       // signalCount

 // signals: signature, parameters, type, tag, flags
      22,   13,   12,   12, 0x05,
      59,   49,   12,   12, 0x05,
     112,  100,   12,   12, 0x05,

 // slots: signature, parameters, type, tag, flags
     156,  146,   12,   12, 0x0a,
     179,   49,   12,   12, 0x0a,
     225,  216,   12,   12, 0x0a,
     279,  255,   12,   12, 0x0a,
     340,  326,   12,   12, 0x2a,
     381,   12,   12,   12, 0x2a,

 // properties: name, type, flags
     146,  400, 0x0049510b,
     428,  409, 0x0049510b,
     216,  442, 0x0049510b,
     464,  459, 0x01095103,
     476,  459, 0x01095103,
     505,  490, 0x0009510b,

 // properties: notify_signal_id
       0,
       1,
       2,
       0,
       0,
       0,

       0        // eod
};

static const char qt_meta_stringdata_QCPColorMap[] = {
    "QCPColorMap\0\0newRange\0dataRangeChanged(QCPRange)\0"
    "scaleType\0dataScaleTypeChanged(QCPAxis::ScaleType)\0"
    "newGradient\0gradientChanged(QCPColorGradient)\0"
    "dataRange\0setDataRange(QCPRange)\0"
    "setDataScaleType(QCPAxis::ScaleType)\0"
    "gradient\0setGradient(QCPColorGradient)\0"
    "transformMode,thumbSize\0"
    "updateLegendIcon(Qt::TransformationMode,QSize)\0"
    "transformMode\0updateLegendIcon(Qt::TransformationMode)\0"
    "updateLegendIcon()\0QCPRange\0"
    "QCPAxis::ScaleType\0dataScaleType\0"
    "QCPColorGradient\0bool\0interpolate\0"
    "tightBoundary\0QCPColorScale*\0colorScale\0"
};

#ifdef Q_NO_DATA_RELOCATION
static const QMetaObjectAccessor qt_meta_extradata_QCPColorMap[] = {
        QCPAxis::getStaticMetaObject,
#else
static const QMetaObject *qt_meta_extradata_QCPColorMap[] = {
        &QCPAxis::staticMetaObject,
#endif //Q_NO_DATA_RELOCATION
    0
};

static const QMetaObjectExtraData qt_meta_extradata2_QCPColorMap = {
    qt_meta_extradata_QCPColorMap, 0 
};

const QMetaObject QCPColorMap::staticMetaObject = {
    { &QCPAbstractPlottable::staticMetaObject, qt_meta_stringdata_QCPColorMap,
      qt_meta_data_QCPColorMap, &qt_meta_extradata2_QCPColorMap }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPColorMap::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPColorMap::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPColorMap::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPColorMap))
        return static_cast<void*>(const_cast< QCPColorMap*>(this));
    return QCPAbstractPlottable::qt_metacast(_clname);
}

int QCPColorMap::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractPlottable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: dataRangeChanged((*reinterpret_cast< QCPRange(*)>(_a[1]))); break;
        case 1: dataScaleTypeChanged((*reinterpret_cast< QCPAxis::ScaleType(*)>(_a[1]))); break;
        case 2: gradientChanged((*reinterpret_cast< QCPColorGradient(*)>(_a[1]))); break;
        case 3: setDataRange((*reinterpret_cast< const QCPRange(*)>(_a[1]))); break;
        case 4: setDataScaleType((*reinterpret_cast< QCPAxis::ScaleType(*)>(_a[1]))); break;
        case 5: setGradient((*reinterpret_cast< const QCPColorGradient(*)>(_a[1]))); break;
        case 6: updateLegendIcon((*reinterpret_cast< Qt::TransformationMode(*)>(_a[1])),(*reinterpret_cast< const QSize(*)>(_a[2]))); break;
        case 7: updateLegendIcon((*reinterpret_cast< Qt::TransformationMode(*)>(_a[1]))); break;
        case 8: updateLegendIcon(); break;
        default: ;
        }
        _id -= 9;
    }
#ifndef QT_NO_PROPERTIES
      else if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QCPRange*>(_v) = dataRange(); break;
        case 1: *reinterpret_cast< QCPAxis::ScaleType*>(_v) = dataScaleType(); break;
        case 2: *reinterpret_cast< QCPColorGradient*>(_v) = gradient(); break;
        case 3: *reinterpret_cast< bool*>(_v) = interpolate(); break;
        case 4: *reinterpret_cast< bool*>(_v) = tightBoundary(); break;
        case 5: *reinterpret_cast< QCPColorScale**>(_v) = colorScale(); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setDataRange(*reinterpret_cast< QCPRange*>(_v)); break;
        case 1: setDataScaleType(*reinterpret_cast< QCPAxis::ScaleType*>(_v)); break;
        case 2: setGradient(*reinterpret_cast< QCPColorGradient*>(_v)); break;
        case 3: setInterpolate(*reinterpret_cast< bool*>(_v)); break;
        case 4: setTightBoundary(*reinterpret_cast< bool*>(_v)); break;
        case 5: setColorScale(*reinterpret_cast< QCPColorScale**>(_v)); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 6;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}

// SIGNAL 0
void QCPColorMap::dataRangeChanged(QCPRange _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void QCPColorMap::dataScaleTypeChanged(QCPAxis::ScaleType _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void QCPColorMap::gradientChanged(QCPColorGradient _t1)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}
static const uint qt_meta_data_QCPFinancial[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       7,   14, // properties
       1,   35, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      24,   13, 0x0009510b,
      42,   35, 0x06095103,
      53,   48, 0x01095103,
      71,   64, 0x42095103,
      85,   64, 0x42095103,
     104,   99, 0x4d095103,
     116,   99, 0x4d095103,

 // enums: name, flags, count, data
      13, 0x0,    2,   39,

 // enum data: key, value
     128, uint(QCPFinancial::csOhlc),
     135, uint(QCPFinancial::csCandlestick),

       0        // eod
};

static const char qt_meta_stringdata_QCPFinancial[] = {
    "QCPFinancial\0ChartStyle\0chartStyle\0"
    "double\0width\0bool\0twoColored\0QBrush\0"
    "brushPositive\0brushNegative\0QPen\0"
    "penPositive\0penNegative\0csOhlc\0"
    "csCandlestick\0"
};

const QMetaObject QCPFinancial::staticMetaObject = {
    { &QCPAbstractPlottable::staticMetaObject, qt_meta_stringdata_QCPFinancial,
      qt_meta_data_QCPFinancial, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPFinancial::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPFinancial::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPFinancial::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPFinancial))
        return static_cast<void*>(const_cast< QCPFinancial*>(this));
    return QCPAbstractPlottable::qt_metacast(_clname);
}

int QCPFinancial::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractPlottable::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< ChartStyle*>(_v) = chartStyle(); break;
        case 1: *reinterpret_cast< double*>(_v) = width(); break;
        case 2: *reinterpret_cast< bool*>(_v) = twoColored(); break;
        case 3: *reinterpret_cast< QBrush*>(_v) = brushPositive(); break;
        case 4: *reinterpret_cast< QBrush*>(_v) = brushNegative(); break;
        case 5: *reinterpret_cast< QPen*>(_v) = penPositive(); break;
        case 6: *reinterpret_cast< QPen*>(_v) = penNegative(); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setChartStyle(*reinterpret_cast< ChartStyle*>(_v)); break;
        case 1: setWidth(*reinterpret_cast< double*>(_v)); break;
        case 2: setTwoColored(*reinterpret_cast< bool*>(_v)); break;
        case 3: setBrushPositive(*reinterpret_cast< QBrush*>(_v)); break;
        case 4: setBrushNegative(*reinterpret_cast< QBrush*>(_v)); break;
        case 5: setPenPositive(*reinterpret_cast< QPen*>(_v)); break;
        case 6: setPenNegative(*reinterpret_cast< QPen*>(_v)); break;
        }
        _id -= 7;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 7;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 7;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemStraightLine[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       2,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      25,   20, 0x4d095103,
      29,   20, 0x4d095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemStraightLine[] = {
    "QCPItemStraightLine\0QPen\0pen\0selectedPen\0"
};

const QMetaObject QCPItemStraightLine::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemStraightLine,
      qt_meta_data_QCPItemStraightLine, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemStraightLine::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemStraightLine::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemStraightLine::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemStraightLine))
        return static_cast<void*>(const_cast< QCPItemStraightLine*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemStraightLine::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 1: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        }
        _id -= 2;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 2;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 2;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemLine[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       4,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      17,   12, 0x4d095103,
      21,   12, 0x4d095103,
      47,   33, 0x0009510b,
      52,   33, 0x0009510b,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemLine[] = {
    "QCPItemLine\0QPen\0pen\0selectedPen\0"
    "QCPLineEnding\0head\0tail\0"
};

const QMetaObject QCPItemLine::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemLine,
      qt_meta_data_QCPItemLine, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemLine::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemLine::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemLine::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemLine))
        return static_cast<void*>(const_cast< QCPItemLine*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemLine::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 1: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 2: *reinterpret_cast< QCPLineEnding*>(_v) = head(); break;
        case 3: *reinterpret_cast< QCPLineEnding*>(_v) = tail(); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 2: setHead(*reinterpret_cast< QCPLineEnding*>(_v)); break;
        case 3: setTail(*reinterpret_cast< QCPLineEnding*>(_v)); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 4;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemCurve[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       4,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      18,   13, 0x4d095103,
      22,   13, 0x4d095103,
      48,   34, 0x0009510b,
      53,   34, 0x0009510b,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemCurve[] = {
    "QCPItemCurve\0QPen\0pen\0selectedPen\0"
    "QCPLineEnding\0head\0tail\0"
};

const QMetaObject QCPItemCurve::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemCurve,
      qt_meta_data_QCPItemCurve, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemCurve::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemCurve::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemCurve::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemCurve))
        return static_cast<void*>(const_cast< QCPItemCurve*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemCurve::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 1: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 2: *reinterpret_cast< QCPLineEnding*>(_v) = head(); break;
        case 3: *reinterpret_cast< QCPLineEnding*>(_v) = tail(); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 2: setHead(*reinterpret_cast< QCPLineEnding*>(_v)); break;
        case 3: setTail(*reinterpret_cast< QCPLineEnding*>(_v)); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 4;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemRect[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       4,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      17,   12, 0x4d095103,
      21,   12, 0x4d095103,
      40,   33, 0x42095103,
      46,   33, 0x42095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemRect[] = {
    "QCPItemRect\0QPen\0pen\0selectedPen\0"
    "QBrush\0brush\0selectedBrush\0"
};

const QMetaObject QCPItemRect::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemRect,
      qt_meta_data_QCPItemRect, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemRect::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemRect::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemRect::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemRect))
        return static_cast<void*>(const_cast< QCPItemRect*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemRect::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 1: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 2: *reinterpret_cast< QBrush*>(_v) = brush(); break;
        case 3: *reinterpret_cast< QBrush*>(_v) = selectedBrush(); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 2: setBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 3: setSelectedBrush(*reinterpret_cast< QBrush*>(_v)); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 4;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemText[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
      13,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      19,   12, 0x43095103,
      25,   12, 0x43095103,
      44,   39, 0x4d095103,
      48,   39, 0x4d095103,
      67,   60, 0x42095103,
      73,   60, 0x42095103,
      93,   87, 0x40095103,
      98,   87, 0x40095103,
     119,  111, 0x0a095103,
     138,  124, 0x0009510b,
     156,  124, 0x0009510b,
     177,  170, 0x06095103,
     195,  186, 0x0009510b,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemText[] = {
    "QCPItemText\0QColor\0color\0selectedColor\0"
    "QPen\0pen\0selectedPen\0QBrush\0brush\0"
    "selectedBrush\0QFont\0font\0selectedFont\0"
    "QString\0text\0Qt::Alignment\0positionAlignment\0"
    "textAlignment\0double\0rotation\0QMargins\0"
    "padding\0"
};

const QMetaObject QCPItemText::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemText,
      qt_meta_data_QCPItemText, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemText::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemText::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemText::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemText))
        return static_cast<void*>(const_cast< QCPItemText*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemText::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QColor*>(_v) = color(); break;
        case 1: *reinterpret_cast< QColor*>(_v) = selectedColor(); break;
        case 2: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 3: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 4: *reinterpret_cast< QBrush*>(_v) = brush(); break;
        case 5: *reinterpret_cast< QBrush*>(_v) = selectedBrush(); break;
        case 6: *reinterpret_cast< QFont*>(_v) = font(); break;
        case 7: *reinterpret_cast< QFont*>(_v) = selectedFont(); break;
        case 8: *reinterpret_cast< QString*>(_v) = text(); break;
        case 9: *reinterpret_cast< Qt::Alignment*>(_v) = positionAlignment(); break;
        case 10: *reinterpret_cast< Qt::Alignment*>(_v) = textAlignment(); break;
        case 11: *reinterpret_cast< double*>(_v) = rotation(); break;
        case 12: *reinterpret_cast< QMargins*>(_v) = padding(); break;
        }
        _id -= 13;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setColor(*reinterpret_cast< QColor*>(_v)); break;
        case 1: setSelectedColor(*reinterpret_cast< QColor*>(_v)); break;
        case 2: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 3: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 4: setBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 5: setSelectedBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 6: setFont(*reinterpret_cast< QFont*>(_v)); break;
        case 7: setSelectedFont(*reinterpret_cast< QFont*>(_v)); break;
        case 8: setText(*reinterpret_cast< QString*>(_v)); break;
        case 9: setPositionAlignment(*reinterpret_cast< Qt::Alignment*>(_v)); break;
        case 10: setTextAlignment(*reinterpret_cast< Qt::Alignment*>(_v)); break;
        case 11: setRotation(*reinterpret_cast< double*>(_v)); break;
        case 12: setPadding(*reinterpret_cast< QMargins*>(_v)); break;
        }
        _id -= 13;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 13;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 13;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemEllipse[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       4,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      20,   15, 0x4d095103,
      24,   15, 0x4d095103,
      43,   36, 0x42095103,
      49,   36, 0x42095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemEllipse[] = {
    "QCPItemEllipse\0QPen\0pen\0selectedPen\0"
    "QBrush\0brush\0selectedBrush\0"
};

const QMetaObject QCPItemEllipse::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemEllipse,
      qt_meta_data_QCPItemEllipse, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemEllipse::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemEllipse::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemEllipse::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemEllipse))
        return static_cast<void*>(const_cast< QCPItemEllipse*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemEllipse::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 1: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 2: *reinterpret_cast< QBrush*>(_v) = brush(); break;
        case 3: *reinterpret_cast< QBrush*>(_v) = selectedBrush(); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 2: setBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 3: setSelectedBrush(*reinterpret_cast< QBrush*>(_v)); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 4;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemPixmap[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       6,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      22,   14, 0x41095103,
      34,   29, 0x01095103,
      61,   41, 0x00095009,
     100,   77, 0x00095009,
     124,  119, 0x4d095103,
     128,  119, 0x4d095103,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemPixmap[] = {
    "QCPItemPixmap\0QPixmap\0pixmap\0bool\0"
    "scaled\0Qt::AspectRatioMode\0aspectRatioMode\0"
    "Qt::TransformationMode\0transformationMode\0"
    "QPen\0pen\0selectedPen\0"
};

const QMetaObject QCPItemPixmap::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemPixmap,
      qt_meta_data_QCPItemPixmap, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemPixmap::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemPixmap::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemPixmap::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemPixmap))
        return static_cast<void*>(const_cast< QCPItemPixmap*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemPixmap::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPixmap*>(_v) = pixmap(); break;
        case 1: *reinterpret_cast< bool*>(_v) = scaled(); break;
        case 2: *reinterpret_cast< Qt::AspectRatioMode*>(_v) = aspectRatioMode(); break;
        case 3: *reinterpret_cast< Qt::TransformationMode*>(_v) = transformationMode(); break;
        case 4: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 5: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPixmap(*reinterpret_cast< QPixmap*>(_v)); break;
        case 1: setScaled(*reinterpret_cast< bool*>(_v)); break;
        case 4: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 5: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        }
        _id -= 6;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 6;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 6;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemTracer[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       9,   14, // properties
       1,   41, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      19,   14, 0x4d095103,
      23,   14, 0x4d095103,
      42,   35, 0x42095103,
      48,   35, 0x42095103,
      69,   62, 0x06095103,
      86,   74, 0x0009510b,
     102,   92, 0x0009510b,
     108,   62, 0x06095103,
     122,  117, 0x01095103,

 // enums: name, flags, count, data
      74, 0x0,    5,   45,

 // enum data: key, value
     136, uint(QCPItemTracer::tsNone),
     143, uint(QCPItemTracer::tsPlus),
     150, uint(QCPItemTracer::tsCrosshair),
     162, uint(QCPItemTracer::tsCircle),
     171, uint(QCPItemTracer::tsSquare),

       0        // eod
};

static const char qt_meta_stringdata_QCPItemTracer[] = {
    "QCPItemTracer\0QPen\0pen\0selectedPen\0"
    "QBrush\0brush\0selectedBrush\0double\0"
    "size\0TracerStyle\0style\0QCPGraph*\0graph\0"
    "graphKey\0bool\0interpolating\0tsNone\0"
    "tsPlus\0tsCrosshair\0tsCircle\0tsSquare\0"
};

const QMetaObject QCPItemTracer::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemTracer,
      qt_meta_data_QCPItemTracer, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemTracer::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemTracer::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemTracer::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemTracer))
        return static_cast<void*>(const_cast< QCPItemTracer*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemTracer::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 1: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 2: *reinterpret_cast< QBrush*>(_v) = brush(); break;
        case 3: *reinterpret_cast< QBrush*>(_v) = selectedBrush(); break;
        case 4: *reinterpret_cast< double*>(_v) = size(); break;
        case 5: *reinterpret_cast< TracerStyle*>(_v) = style(); break;
        case 6: *reinterpret_cast< QCPGraph**>(_v) = graph(); break;
        case 7: *reinterpret_cast< double*>(_v) = graphKey(); break;
        case 8: *reinterpret_cast< bool*>(_v) = interpolating(); break;
        }
        _id -= 9;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 2: setBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 3: setSelectedBrush(*reinterpret_cast< QBrush*>(_v)); break;
        case 4: setSize(*reinterpret_cast< double*>(_v)); break;
        case 5: setStyle(*reinterpret_cast< TracerStyle*>(_v)); break;
        case 6: setGraph(*reinterpret_cast< QCPGraph**>(_v)); break;
        case 7: setGraphKey(*reinterpret_cast< double*>(_v)); break;
        case 8: setInterpolating(*reinterpret_cast< bool*>(_v)); break;
        }
        _id -= 9;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 9;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 9;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
static const uint qt_meta_data_QCPItemBracket[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       4,   14, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // properties: name, type, flags
      20,   15, 0x4d095103,
      24,   15, 0x4d095103,
      43,   36, 0x06095103,
      63,   50, 0x0009510b,

       0        // eod
};

static const char qt_meta_stringdata_QCPItemBracket[] = {
    "QCPItemBracket\0QPen\0pen\0selectedPen\0"
    "double\0length\0BracketStyle\0style\0"
};

const QMetaObject QCPItemBracket::staticMetaObject = {
    { &QCPAbstractItem::staticMetaObject, qt_meta_stringdata_QCPItemBracket,
      qt_meta_data_QCPItemBracket, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QCPItemBracket::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QCPItemBracket::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QCPItemBracket::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QCPItemBracket))
        return static_cast<void*>(const_cast< QCPItemBracket*>(this));
    return QCPAbstractItem::qt_metacast(_clname);
}

int QCPItemBracket::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QCPAbstractItem::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    
#ifndef QT_NO_PROPERTIES
     if (_c == QMetaObject::ReadProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: *reinterpret_cast< QPen*>(_v) = pen(); break;
        case 1: *reinterpret_cast< QPen*>(_v) = selectedPen(); break;
        case 2: *reinterpret_cast< double*>(_v) = length(); break;
        case 3: *reinterpret_cast< BracketStyle*>(_v) = style(); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::WriteProperty) {
        void *_v = _a[0];
        switch (_id) {
        case 0: setPen(*reinterpret_cast< QPen*>(_v)); break;
        case 1: setSelectedPen(*reinterpret_cast< QPen*>(_v)); break;
        case 2: setLength(*reinterpret_cast< double*>(_v)); break;
        case 3: setStyle(*reinterpret_cast< BracketStyle*>(_v)); break;
        }
        _id -= 4;
    } else if (_c == QMetaObject::ResetProperty) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyDesignable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyScriptable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyStored) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyEditable) {
        _id -= 4;
    } else if (_c == QMetaObject::QueryPropertyUser) {
        _id -= 4;
    }
#endif // QT_NO_PROPERTIES
    return _id;
}
QT_END_MOC_NAMESPACE
