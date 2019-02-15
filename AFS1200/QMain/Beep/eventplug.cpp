#include "eventplug.h"
#include <QEvent>
#include <QDebug>
#include <QTimer>

EventPlug::EventPlug()
{

}
EventPlug::~EventPlug()
{

}


bool EventPlug::eventFilter(QObject *obj, QEvent *evt)
{
    /* 20170306 ÊÂ¼þ¶ªÊ§
    if (evt->type() == QEvent::MouseButtonRelease)
    {
        emit send_signal_t(evt);
    }
    return QObject::eventFilter(obj, evt);
    */

    QEvent::Type t = evt->type();
    bool rt = QObject::eventFilter(obj, evt);
    if (t == QEvent::MouseButtonPress)
    {

        emit send_signal_t(evt);
    }
    return rt;
}
void EventPlug::send_slot_t()
{
    //printf(" event!! \n ") ;
    emit send_signal_t(NULL);
}

#include <QPushButton>
#include <QTabBar>
void EventPlug::find_obj(QObject *obj)
{
    QObjectList objs = obj->children();
    foreach (QObject *obj_child, objs)
    {
        foreach (QString cn, *filter_list)
        {
            if (obj_child->objectName() != "btn_std_2" && // ?¨²?¡¤¡À¨¤?????¡ã??????
                obj_child->objectName() != "toolButton" && // ???????????¡ã
                    QString(obj_child->metaObject()->className()).contains(cn))
            {
                // filter_list << "Button" << "CheckBox" << "TabBar";
                // QAbstractButton Q3Button, QCheckBox, QPushButton, QRadioButton, and QToolButton.
                if(QString(obj_child->metaObject()->className()).contains("Button")
                    || QString(obj_child->metaObject()->className()).contains("CheckBox")){
                    QAbstractButton *btn =  (QAbstractButton *)obj_child ;
                    QObject::connect(btn, SIGNAL(clicked(bool)), this,  SLOT(send_slot_t()) );
                }else if(QString(obj_child->metaObject()->className()).contains("TabBar")){
                    QTabBar *btn = (QTabBar*)obj_child ;
                    QObject::connect(btn, SIGNAL(currentChanged(int)), this,  SLOT(send_slot_t()) );
                }
                    //obj_child->installEventFilter(this);

                break;
            }
        }
        find_obj(obj_child);
    }
}

void EventPlug::filter_init(QObject *p, const QStringList &f)
{
    filter_list = &f;
    if (!filter_list->isEmpty() && p)
    {
        find_obj(p);
    }
}
