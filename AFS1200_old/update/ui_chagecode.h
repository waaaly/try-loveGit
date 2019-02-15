/********************************************************************************
** Form generated from reading UI file 'chagecode.ui'
**
** Created: Thu Oct 11 16:01:51 2018
**      by: Qt User Interface Compiler version 4.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CHAGECODE_H
#define UI_CHAGECODE_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QCheckBox>
#include <QtGui/QDialog>
#include <QtGui/QGroupBox>
#include <QtGui/QHBoxLayout>
#include <QtGui/QHeaderView>
#include <QtGui/QLabel>
#include <QtGui/QLineEdit>
#include <QtGui/QPushButton>
#include <QtGui/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ChageCode
{
public:
    QLabel *label_warning;
    QGroupBox *groupBox;
    QPushButton *pushButton_cancel;
    QPushButton *pushButton_ok;
    QCheckBox *checkBox_usegun;
    QWidget *layoutWidget;
    QHBoxLayout *horizontalLayout;
    QLineEdit *lineEdit_std6;
    QLineEdit *lineEdit_gun;
    QLabel *label;

    void setupUi(QDialog *ChageCode)
    {
        if (ChageCode->objectName().isEmpty())
            ChageCode->setObjectName(QString::fromUtf8("ChageCode"));
        ChageCode->resize(396, 216);
        ChageCode->setMaximumSize(QSize(9999, 9999));
        QIcon icon;
        icon.addFile(QString::fromUtf8(":/image/info.png"), QSize(), QIcon::Normal, QIcon::Off);
        ChageCode->setWindowIcon(icon);
        ChageCode->setModal(false);
        label_warning = new QLabel(ChageCode);
        label_warning->setObjectName(QString::fromUtf8("label_warning"));
        label_warning->setGeometry(QRect(20, 130, 301, 17));
        groupBox = new QGroupBox(ChageCode);
        groupBox->setObjectName(QString::fromUtf8("groupBox"));
        groupBox->setGeometry(QRect(0, 0, 391, 211));
        pushButton_cancel = new QPushButton(groupBox);
        pushButton_cancel->setObjectName(QString::fromUtf8("pushButton_cancel"));
        pushButton_cancel->setGeometry(QRect(160, 160, 97, 41));
        pushButton_ok = new QPushButton(groupBox);
        pushButton_ok->setObjectName(QString::fromUtf8("pushButton_ok"));
        pushButton_ok->setGeometry(QRect(270, 160, 97, 41));
        checkBox_usegun = new QCheckBox(groupBox);
        checkBox_usegun->setObjectName(QString::fromUtf8("checkBox_usegun"));
        checkBox_usegun->setGeometry(QRect(20, 40, 141, 31));
        QFont font;
        font.setPointSize(16);
        checkBox_usegun->setFont(font);
        checkBox_usegun->setChecked(true);
        checkBox_usegun->setTristate(false);
        layoutWidget = new QWidget(groupBox);
        layoutWidget->setObjectName(QString::fromUtf8("layoutWidget"));
        layoutWidget->setGeometry(QRect(90, 91, 241, 29));
        horizontalLayout = new QHBoxLayout(layoutWidget);
        horizontalLayout->setObjectName(QString::fromUtf8("horizontalLayout"));
        horizontalLayout->setContentsMargins(0, 0, 0, 0);
        lineEdit_std6 = new QLineEdit(layoutWidget);
        lineEdit_std6->setObjectName(QString::fromUtf8("lineEdit_std6"));

        horizontalLayout->addWidget(lineEdit_std6);

        lineEdit_gun = new QLineEdit(layoutWidget);
        lineEdit_gun->setObjectName(QString::fromUtf8("lineEdit_gun"));

        horizontalLayout->addWidget(lineEdit_gun);

        label = new QLabel(groupBox);
        label->setObjectName(QString::fromUtf8("label"));
        label->setGeometry(QRect(20, 90, 81, 31));

        retranslateUi(ChageCode);

        QMetaObject::connectSlotsByName(ChageCode);
    } // setupUi

    void retranslateUi(QDialog *ChageCode)
    {
        ChageCode->setWindowTitle(QString());
        label_warning->setText(QApplication::translate("ChageCode", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Ubuntu'; font-size:11pt; font-weight:400; font-style:normal;\">\n"
"<table border=\"0\" style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\"-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"></p></td></tr></table></body></html>", 0, QApplication::UnicodeUTF8));
        groupBox->setTitle(QString());
        pushButton_cancel->setText(QApplication::translate("ChageCode", "\345\217\226\346\266\210", 0, QApplication::UnicodeUTF8));
        pushButton_ok->setText(QApplication::translate("ChageCode", "\347\241\256\345\256\232", 0, QApplication::UnicodeUTF8));
        checkBox_usegun->setText(QApplication::translate("ChageCode", "\344\275\277\347\224\250\346\211\253\347\240\201\346\236\252", 0, QApplication::UnicodeUTF8));
        label->setText(QApplication::translate("ChageCode", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Ubuntu'; font-size:11pt; font-weight:400; font-style:normal;\">\n"
"<table style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:18pt;\">\347\274\226\347\240\201\345\217\267:</span></p></td></tr></table></body></html>", 0, QApplication::UnicodeUTF8));
    } // retranslateUi

};

namespace Ui {
    class ChageCode: public Ui_ChageCode {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CHAGECODE_H
