/********************************************************************************
** Form generated from reading UI file 'prj_parameter.ui'
**
** Created: Tue Oct 23 13:30:05 2018
**      by: Qt User Interface Compiler version 4.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_PRJ_PARAMETER_H
#define UI_PRJ_PARAMETER_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QDialog>
#include <QtGui/QHBoxLayout>
#include <QtGui/QHeaderView>
#include <QtGui/QLabel>
#include <QtGui/QLineEdit>
#include <QtGui/QPushButton>
#include <QtGui/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Prj_parameter
{
public:
    QLabel *label_2;
    QLineEdit *lineEdit_up_numkeyboard;
    QLineEdit *lineEdit_low_numkeyboard;
    QPushButton *enterButton;
    QPushButton *cancelButton;
    QLabel *label;
    QLabel *label_4;
    QLabel *label_3;
    QWidget *widget_title;
    QHBoxLayout *horizontalLayout_2;
    QLabel *lab_Ico;
    QLabel *lab_Title;
    QWidget *widget_menu;
    QHBoxLayout *horizontalLayout_3;

    void setupUi(QDialog *Prj_parameter)
    {
        if (Prj_parameter->objectName().isEmpty())
            Prj_parameter->setObjectName(QString::fromUtf8("Prj_parameter"));
        Prj_parameter->resize(800, 470);
        QIcon icon;
        icon.addFile(QString::fromUtf8(":/image/info.png"), QSize(), QIcon::Normal, QIcon::Off);
        Prj_parameter->setWindowIcon(icon);
        label_2 = new QLabel(Prj_parameter);
        label_2->setObjectName(QString::fromUtf8("label_2"));
        label_2->setGeometry(QRect(180, 174, 111, 31));
        QFont font;
        font.setPointSize(20);
        label_2->setFont(font);
        label_2->setLayoutDirection(Qt::RightToLeft);
        lineEdit_up_numkeyboard = new QLineEdit(Prj_parameter);
        lineEdit_up_numkeyboard->setObjectName(QString::fromUtf8("lineEdit_up_numkeyboard"));
        lineEdit_up_numkeyboard->setGeometry(QRect(300, 240, 251, 27));
        lineEdit_up_numkeyboard->setFocusPolicy(Qt::ClickFocus);
        lineEdit_low_numkeyboard = new QLineEdit(Prj_parameter);
        lineEdit_low_numkeyboard->setObjectName(QString::fromUtf8("lineEdit_low_numkeyboard"));
        lineEdit_low_numkeyboard->setGeometry(QRect(300, 180, 251, 27));
        lineEdit_low_numkeyboard->setFocusPolicy(Qt::ClickFocus);
        enterButton = new QPushButton(Prj_parameter);
        enterButton->setObjectName(QString::fromUtf8("enterButton"));
        enterButton->setGeometry(QRect(480, 304, 97, 41));
        cancelButton = new QPushButton(Prj_parameter);
        cancelButton->setObjectName(QString::fromUtf8("cancelButton"));
        cancelButton->setGeometry(QRect(340, 304, 97, 41));
        label = new QLabel(Prj_parameter);
        label->setObjectName(QString::fromUtf8("label"));
        label->setGeometry(QRect(300, 124, 251, 31));
        label_4 = new QLabel(Prj_parameter);
        label_4->setObjectName(QString::fromUtf8("label_4"));
        label_4->setGeometry(QRect(180, 124, 111, 31));
        label_4->setFont(font);
        label_4->setLayoutDirection(Qt::RightToLeft);
        label_3 = new QLabel(Prj_parameter);
        label_3->setObjectName(QString::fromUtf8("label_3"));
        label_3->setGeometry(QRect(180, 234, 111, 31));
        label_3->setFont(font);
        label_3->setLayoutDirection(Qt::RightToLeft);
        widget_title = new QWidget(Prj_parameter);
        widget_title->setObjectName(QString::fromUtf8("widget_title"));
        widget_title->setGeometry(QRect(0, 0, 801, 40));
        QSizePolicy sizePolicy(QSizePolicy::Preferred, QSizePolicy::Fixed);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(widget_title->sizePolicy().hasHeightForWidth());
        widget_title->setSizePolicy(sizePolicy);
        widget_title->setMinimumSize(QSize(100, 28));
        widget_title->setFont(font);
        horizontalLayout_2 = new QHBoxLayout(widget_title);
        horizontalLayout_2->setSpacing(0);
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_2->setObjectName(QString::fromUtf8("horizontalLayout_2"));
        lab_Ico = new QLabel(widget_title);
        lab_Ico->setObjectName(QString::fromUtf8("lab_Ico"));
        QSizePolicy sizePolicy1(QSizePolicy::Minimum, QSizePolicy::Preferred);
        sizePolicy1.setHorizontalStretch(0);
        sizePolicy1.setVerticalStretch(0);
        sizePolicy1.setHeightForWidth(lab_Ico->sizePolicy().hasHeightForWidth());
        lab_Ico->setSizePolicy(sizePolicy1);
        lab_Ico->setMinimumSize(QSize(31, 0));
        lab_Ico->setAlignment(Qt::AlignCenter);

        horizontalLayout_2->addWidget(lab_Ico);

        lab_Title = new QLabel(widget_title);
        lab_Title->setObjectName(QString::fromUtf8("lab_Title"));
        QSizePolicy sizePolicy2(QSizePolicy::Expanding, QSizePolicy::Preferred);
        sizePolicy2.setHorizontalStretch(0);
        sizePolicy2.setVerticalStretch(0);
        sizePolicy2.setHeightForWidth(lab_Title->sizePolicy().hasHeightForWidth());
        lab_Title->setSizePolicy(sizePolicy2);
        QFont font1;
        font1.setFamily(QString::fromUtf8("\345\276\256\350\275\257\351\233\205\351\273\221"));
        font1.setPointSize(10);
        font1.setBold(false);
        font1.setItalic(false);
        font1.setWeight(50);
        lab_Title->setFont(font1);
        lab_Title->setStyleSheet(QString::fromUtf8("font: 10pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));
        lab_Title->setAlignment(Qt::AlignLeading|Qt::AlignLeft|Qt::AlignVCenter);

        horizontalLayout_2->addWidget(lab_Title);

        widget_menu = new QWidget(widget_title);
        widget_menu->setObjectName(QString::fromUtf8("widget_menu"));
        sizePolicy1.setHeightForWidth(widget_menu->sizePolicy().hasHeightForWidth());
        widget_menu->setSizePolicy(sizePolicy1);
        horizontalLayout_3 = new QHBoxLayout(widget_menu);
        horizontalLayout_3->setSpacing(0);
        horizontalLayout_3->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_3->setObjectName(QString::fromUtf8("horizontalLayout_3"));

        horizontalLayout_2->addWidget(widget_menu);


        retranslateUi(Prj_parameter);

        QMetaObject::connectSlotsByName(Prj_parameter);
    } // setupUi

    void retranslateUi(QDialog *Prj_parameter)
    {
        Prj_parameter->setWindowTitle(QApplication::translate("Prj_parameter", "Parameter", 0, QApplication::UnicodeUTF8));
        label_2->setText(QApplication::translate("Prj_parameter", "\344\275\216\345\200\274:", 0, QApplication::UnicodeUTF8));
        lineEdit_up_numkeyboard->setText(QString());
        lineEdit_low_numkeyboard->setText(QString());
        enterButton->setText(QApplication::translate("Prj_parameter", "\347\241\256\345\256\232", 0, QApplication::UnicodeUTF8));
        cancelButton->setText(QApplication::translate("Prj_parameter", "\345\217\226\346\266\210", 0, QApplication::UnicodeUTF8));
        label->setText(QString());
        label_4->setText(QApplication::translate("Prj_parameter", "\351\241\271\347\233\256:", 0, QApplication::UnicodeUTF8));
        label_3->setText(QApplication::translate("Prj_parameter", "\351\253\230\345\200\274:", 0, QApplication::UnicodeUTF8));
        lab_Ico->setText(QString());
        lab_Title->setText(QApplication::translate("Prj_parameter", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'\345\276\256\350\275\257\351\233\205\351\273\221'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<table border=\"0\" style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:20pt;\">\345\217\202\350\200\203\345\200\274</span></p></td></tr></table></body></html>", 0, QApplication::UnicodeUTF8));
    } // retranslateUi

};

namespace Ui {
    class Prj_parameter: public Ui_Prj_parameter {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_PRJ_PARAMETER_H
