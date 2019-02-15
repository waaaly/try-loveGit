/********************************************************************************
** Form generated from reading UI file 'password.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_PASSWORD_H
#define UI_PASSWORD_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QGroupBox>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_password
{
public:
    QGroupBox *groupBox;
    QWidget *layoutWidget;
    QGridLayout *gridLayout;
    QPushButton *pushButton_num7;
    QPushButton *pushButton_num5;
    QPushButton *pushButton_num6;
    QPushButton *pushButton_num2;
    QPushButton *pushButton_num9;
    QPushButton *pushButton_num8;
    QPushButton *pushButton_num3;
    QPushButton *pushButton_num4;
    QPushButton *pushButton_cancel;
    QPushButton *pushButton_enter;
    QPushButton *pushButton_num0;
    QPushButton *pushButton_num1;
    QLineEdit *lineEdit;
    QPushButton *pushButton_delete;

    void setupUi(QWidget *password)
    {
        if (password->objectName().isEmpty())
            password->setObjectName(QStringLiteral("password"));
        password->setWindowModality(Qt::NonModal);
        password->resize(580, 422);
        password->setLayoutDirection(Qt::LeftToRight);
        groupBox = new QGroupBox(password);
        groupBox->setObjectName(QStringLiteral("groupBox"));
        groupBox->setGeometry(QRect(0, 10, 571, 401));
        groupBox->setLayoutDirection(Qt::LeftToRight);
        layoutWidget = new QWidget(groupBox);
        layoutWidget->setObjectName(QStringLiteral("layoutWidget"));
        layoutWidget->setGeometry(QRect(10, 90, 551, 311));
        gridLayout = new QGridLayout(layoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        pushButton_num7 = new QPushButton(layoutWidget);
        pushButton_num7->setObjectName(QStringLiteral("pushButton_num7"));
        pushButton_num7->setMinimumSize(QSize(0, 50));
        pushButton_num7->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num7, 3, 0, 1, 1);

        pushButton_num5 = new QPushButton(layoutWidget);
        pushButton_num5->setObjectName(QStringLiteral("pushButton_num5"));
        pushButton_num5->setMinimumSize(QSize(0, 50));
        pushButton_num5->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num5, 2, 1, 1, 1);

        pushButton_num6 = new QPushButton(layoutWidget);
        pushButton_num6->setObjectName(QStringLiteral("pushButton_num6"));
        pushButton_num6->setMinimumSize(QSize(0, 50));
        pushButton_num6->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num6, 2, 2, 1, 1);

        pushButton_num2 = new QPushButton(layoutWidget);
        pushButton_num2->setObjectName(QStringLiteral("pushButton_num2"));
        pushButton_num2->setMinimumSize(QSize(0, 50));
        pushButton_num2->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num2, 0, 1, 1, 1);

        pushButton_num9 = new QPushButton(layoutWidget);
        pushButton_num9->setObjectName(QStringLiteral("pushButton_num9"));
        pushButton_num9->setMinimumSize(QSize(0, 50));
        pushButton_num9->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num9, 3, 2, 1, 1);

        pushButton_num8 = new QPushButton(layoutWidget);
        pushButton_num8->setObjectName(QStringLiteral("pushButton_num8"));
        pushButton_num8->setMinimumSize(QSize(0, 50));
        pushButton_num8->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num8, 3, 1, 1, 1);

        pushButton_num3 = new QPushButton(layoutWidget);
        pushButton_num3->setObjectName(QStringLiteral("pushButton_num3"));
        pushButton_num3->setMinimumSize(QSize(0, 50));
        pushButton_num3->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num3, 0, 2, 1, 1);

        pushButton_num4 = new QPushButton(layoutWidget);
        pushButton_num4->setObjectName(QStringLiteral("pushButton_num4"));
        pushButton_num4->setMinimumSize(QSize(0, 50));
        pushButton_num4->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num4, 2, 0, 1, 1);

        pushButton_cancel = new QPushButton(layoutWidget);
        pushButton_cancel->setObjectName(QStringLiteral("pushButton_cancel"));
        pushButton_cancel->setMinimumSize(QSize(0, 50));
        pushButton_cancel->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_cancel, 4, 0, 1, 1);

        pushButton_enter = new QPushButton(layoutWidget);
        pushButton_enter->setObjectName(QStringLiteral("pushButton_enter"));
        pushButton_enter->setMinimumSize(QSize(0, 50));
        pushButton_enter->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_enter, 4, 2, 1, 1);

        pushButton_num0 = new QPushButton(layoutWidget);
        pushButton_num0->setObjectName(QStringLiteral("pushButton_num0"));
        pushButton_num0->setMinimumSize(QSize(0, 50));
        pushButton_num0->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num0, 4, 1, 1, 1);

        pushButton_num1 = new QPushButton(layoutWidget);
        pushButton_num1->setObjectName(QStringLiteral("pushButton_num1"));
        pushButton_num1->setMinimumSize(QSize(0, 50));
        pushButton_num1->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num1, 0, 0, 1, 1);

        lineEdit = new QLineEdit(groupBox);
        lineEdit->setObjectName(QStringLiteral("lineEdit"));
        lineEdit->setGeometry(QRect(10, 40, 451, 27));
        pushButton_delete = new QPushButton(groupBox);
        pushButton_delete->setObjectName(QStringLiteral("pushButton_delete"));
        pushButton_delete->setGeometry(QRect(475, 25, 85, 50));
        pushButton_delete->setMinimumSize(QSize(85, 50));
        pushButton_delete->setMaximumSize(QSize(16777215, 50));

        retranslateUi(password);

        QMetaObject::connectSlotsByName(password);
    } // setupUi

    void retranslateUi(QWidget *password)
    {
        password->setWindowTitle(QApplication::translate("password", "Form", nullptr));
        groupBox->setTitle(QString());
        pushButton_num7->setText(QApplication::translate("password", "7", nullptr));
        pushButton_num5->setText(QApplication::translate("password", "5", nullptr));
        pushButton_num6->setText(QApplication::translate("password", "6", nullptr));
        pushButton_num2->setText(QApplication::translate("password", "2", nullptr));
        pushButton_num9->setText(QApplication::translate("password", "9", nullptr));
        pushButton_num8->setText(QApplication::translate("password", "8", nullptr));
        pushButton_num3->setText(QApplication::translate("password", "3", nullptr));
        pushButton_num4->setText(QApplication::translate("password", "4", nullptr));
        pushButton_cancel->setText(QApplication::translate("password", "\345\217\226\346\266\210", nullptr));
        pushButton_enter->setText(QApplication::translate("password", "\347\241\256\345\256\232", nullptr));
        pushButton_num0->setText(QApplication::translate("password", "0", nullptr));
        pushButton_num1->setText(QApplication::translate("password", "1", nullptr));
        pushButton_delete->setText(QApplication::translate("password", "<--", nullptr));
    } // retranslateUi

};

namespace Ui {
    class password: public Ui_password {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_PASSWORD_H
