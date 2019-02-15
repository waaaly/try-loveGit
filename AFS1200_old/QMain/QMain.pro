#-------------------------------------------------
#
# Project created by QtCreator 2015-04-15T11:04:54
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets printsupport

TARGET = QMain
TEMPLATE = app

UI_DIR = .


SOURCES += main.cpp\
    app/mythread.cpp \
    app/myhelper.cpp \
    app/iconhelper.cpp \
    app/frmmessagebox.cpp \
    myserial.cpp \
    first_form.cpp \
    app/errordialog.cpp \
    app/timer_thread.cpp \
    WIFI/wifi_thread.cpp \
    app/chagecode.cpp \
    app/number_board.cpp


HEADERS  += \
    app/mythread.h \
    app/myhelper.h \
    app/iconhelper.h \
    app/frmmessagebox.h \
    myserial.h \
    first_form.h \
    app/errordialog.h \
    app/timer_thread.h \
    WIFI/wifi_thread.h \
    typewritting/syszuxpinyin.h \
    typewritting/syszuxim.h \
    app/chagecode.h \
    app/number_board.h


FORMS    += \
    app/frmmessagebox.ui \
    first_form.ui \
    app/errordialog.ui \
    typewritting/syszuxpinyin.ui \
    app/chagecode.ui \
    app/number_board.ui



RESOURCES += \
    rc.qrc

#TRANSLATIONS += zh_to_zh.ts
TRANSLATIONS += english_to_zh.ts

LIBS += -L../lib -lsyszuxpinyin

DESTDIR=$$PWD/../update
