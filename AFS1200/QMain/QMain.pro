#-------------------------------------------------
#
# Project created by QtCreator 2015-04-15T11:04:54
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets printsupport

TARGET = QMain
TEMPLATE = app


SOURCES += main.cpp\
    app/mythread.cpp \
    app/myhelper.cpp \
    app/iconhelper.cpp \
    app/frmmessagebox.cpp \
    myserial.cpp \
    first_form.cpp \
    app/errordialog.cpp \
    password.cpp \
    encode/MD5.cpp \
    app/register.cpp \
    curve/qcustomplot.cpp \
    curve/showcurve.cpp \
    detail_from.cpp \
    history_edit.cpp \
    app/prj_parameter.cpp \
    app/number_board.cpp \
    app/select_date.cpp \
    his_prj_view_frm.cpp \
    funcset/debug.cpp \
    funcset/itemmanager.cpp \
    funcset/funcset.cpp \
    app/multi_card_set.cpp \
    common/printer.cpp \
    common/uploadlis.cpp \
    Beep/beep_dri.cpp \
    Beep/eventplug.cpp


HEADERS  += \
    app/mythread.h \
    app/myhelper.h \
    app/iconhelper.h \
    app/frmmessagebox.h \
    myserial.h \
    first_form.h \
    ID/uIDCardDef.h \
    Algorithm/GetConc.h \
    app/errordialog.h \
    password.h \
    encode/MD5.h \
    app/register.h \
    curve/qcustomplot.h \
    curve/showcurve.h \
    detail_from.h \
    history_edit.h \
    app/prj_parameter.h \
    app/number_board.h \
    typewritting/syszuxpinyin.h \
    typewritting/syszuxim.h \
    app/select_date.h \
    his_prj_view_frm.h \
    Algorithm/uGenRuiCurve.h \
    funcset/debug.h \
    funcset/itemmanager.h \
    funcset/funcset.h \
    app/multi_card_set.h \
    common/personalinfo.h \
    common/printer.h \
    common/uploadlis.h \
    Beep/beep_dri.h \
    Beep/eventplug.h


FORMS    += \
    app/frmmessagebox.ui \
    first_form.ui \
    app/errordialog.ui \
    password.ui \
    app/register.ui \
    curve/showcurve.ui \
    detail_from.ui \
    history_edit.ui \
    typewritting/syszuxpinyin.ui \
    app/prj_parameter.ui \
    app/number_board.ui \
    app/select_date.ui \
    his_prj_view_frm.ui \
    app/multi_card_set.ui



RESOURCES += \
    rc.qrc

#TRANSLATIONS += zh_to_zh.ts
TRANSLATIONS += english_to_zh.ts

LIBS += ../QMain/build_var.cpp -L../lib -lsyszuxpinyin -L../QMain/Algorithm -lAlg_1000

DEFINES += DEBUGLOG_ENABLE
# DESTDIR=$$PWD/../../Output/update/lu

