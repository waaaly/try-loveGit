/********************************************************************************
** Form generated from reading UI file 'showcurve.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_SHOWCURVE_H
#define UI_SHOWCURVE_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGroupBox>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QPushButton>
#include "qcustomplot.h"

QT_BEGIN_NAMESPACE

class Ui_Showcurve
{
public:
    QGroupBox *groupBox;
    QCustomPlot *curve;
    QPushButton *shutdownButton;

    void setupUi(QDialog *Showcurve)
    {
        if (Showcurve->objectName().isEmpty())
            Showcurve->setObjectName(QStringLiteral("Showcurve"));
        Showcurve->resize(552, 343);
        QIcon icon;
        icon.addFile(QStringLiteral(":/image/update.png"), QSize(), QIcon::Normal, QIcon::Off);
        Showcurve->setWindowIcon(icon);
        groupBox = new QGroupBox(Showcurve);
        groupBox->setObjectName(QStringLiteral("groupBox"));
        groupBox->setGeometry(QRect(0, 0, 551, 341));
        curve = new QCustomPlot(groupBox);
        curve->setObjectName(QStringLiteral("curve"));
        curve->setGeometry(QRect(10, 10, 441, 321));
        shutdownButton = new QPushButton(groupBox);
        shutdownButton->setObjectName(QStringLiteral("shutdownButton"));
        shutdownButton->setGeometry(QRect(460, 280, 81, 50));
        shutdownButton->setMinimumSize(QSize(0, 50));
        shutdownButton->setMaximumSize(QSize(150, 50));
        QFont font;
        font.setPointSize(24);
        shutdownButton->setFont(font);

        retranslateUi(Showcurve);

        QMetaObject::connectSlotsByName(Showcurve);
    } // setupUi

    void retranslateUi(QDialog *Showcurve)
    {
        Showcurve->setWindowTitle(QApplication::translate("Showcurve", "Curve", nullptr));
        groupBox->setTitle(QString());
        shutdownButton->setText(QApplication::translate("Showcurve", "\345\205\263\351\227\255", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Showcurve: public Ui_Showcurve {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_SHOWCURVE_H
