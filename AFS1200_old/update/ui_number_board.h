/********************************************************************************
** Form generated from reading UI file 'number_board.ui'
**
** Created: Thu Oct 11 16:01:51 2018
**      by: Qt User Interface Compiler version 4.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_NUMBER_BOARD_H
#define UI_NUMBER_BOARD_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QDialog>
#include <QtGui/QGridLayout>
#include <QtGui/QGroupBox>
#include <QtGui/QHeaderView>
#include <QtGui/QLineEdit>
#include <QtGui/QPushButton>
#include <QtGui/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Number_board
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
    QPushButton *pushButton_num0;
    QPushButton *pushButton_num1;
    QPushButton *pushButton_enter;
    QPushButton *pushButton_delete;
    QPushButton *pushButton_cancel;
    QPushButton *pushButton_num10;
    QLineEdit *lineEdit;

    void setupUi(QDialog *Number_board)
    {
        if (Number_board->objectName().isEmpty())
            Number_board->setObjectName(QString::fromUtf8("Number_board"));
        Number_board->resize(586, 456);
        QIcon icon;
        icon.addFile(QString::fromUtf8(":/image/info.png"), QSize(), QIcon::Normal, QIcon::Off);
        Number_board->setWindowIcon(icon);
        groupBox = new QGroupBox(Number_board);
        groupBox->setObjectName(QString::fromUtf8("groupBox"));
        groupBox->setGeometry(QRect(0, 0, 581, 451));
        layoutWidget = new QWidget(groupBox);
        layoutWidget->setObjectName(QString::fromUtf8("layoutWidget"));
        layoutWidget->setGeometry(QRect(15, 75, 551, 341));
        gridLayout = new QGridLayout(layoutWidget);
        gridLayout->setObjectName(QString::fromUtf8("gridLayout"));
        gridLayout->setContentsMargins(0, 0, 0, 0);
        pushButton_num7 = new QPushButton(layoutWidget);
        pushButton_num7->setObjectName(QString::fromUtf8("pushButton_num7"));
        pushButton_num7->setMinimumSize(QSize(0, 50));
        pushButton_num7->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num7, 3, 0, 1, 1);

        pushButton_num5 = new QPushButton(layoutWidget);
        pushButton_num5->setObjectName(QString::fromUtf8("pushButton_num5"));
        pushButton_num5->setMinimumSize(QSize(0, 50));
        pushButton_num5->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num5, 2, 1, 1, 1);

        pushButton_num6 = new QPushButton(layoutWidget);
        pushButton_num6->setObjectName(QString::fromUtf8("pushButton_num6"));
        pushButton_num6->setMinimumSize(QSize(0, 50));
        pushButton_num6->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num6, 2, 2, 1, 1);

        pushButton_num2 = new QPushButton(layoutWidget);
        pushButton_num2->setObjectName(QString::fromUtf8("pushButton_num2"));
        pushButton_num2->setMinimumSize(QSize(0, 50));
        pushButton_num2->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num2, 0, 1, 1, 1);

        pushButton_num9 = new QPushButton(layoutWidget);
        pushButton_num9->setObjectName(QString::fromUtf8("pushButton_num9"));
        pushButton_num9->setMinimumSize(QSize(0, 50));
        pushButton_num9->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num9, 3, 2, 1, 1);

        pushButton_num8 = new QPushButton(layoutWidget);
        pushButton_num8->setObjectName(QString::fromUtf8("pushButton_num8"));
        pushButton_num8->setMinimumSize(QSize(0, 50));
        pushButton_num8->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num8, 3, 1, 1, 1);

        pushButton_num3 = new QPushButton(layoutWidget);
        pushButton_num3->setObjectName(QString::fromUtf8("pushButton_num3"));
        pushButton_num3->setMinimumSize(QSize(0, 50));
        pushButton_num3->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num3, 0, 2, 1, 1);

        pushButton_num4 = new QPushButton(layoutWidget);
        pushButton_num4->setObjectName(QString::fromUtf8("pushButton_num4"));
        pushButton_num4->setMinimumSize(QSize(0, 50));
        pushButton_num4->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num4, 2, 0, 1, 1);

        pushButton_num0 = new QPushButton(layoutWidget);
        pushButton_num0->setObjectName(QString::fromUtf8("pushButton_num0"));
        pushButton_num0->setMinimumSize(QSize(0, 50));
        pushButton_num0->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num0, 4, 1, 1, 1);

        pushButton_num1 = new QPushButton(layoutWidget);
        pushButton_num1->setObjectName(QString::fromUtf8("pushButton_num1"));
        pushButton_num1->setMinimumSize(QSize(0, 50));
        pushButton_num1->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_num1, 0, 0, 1, 1);

        pushButton_enter = new QPushButton(layoutWidget);
        pushButton_enter->setObjectName(QString::fromUtf8("pushButton_enter"));
        pushButton_enter->setMinimumSize(QSize(0, 50));
        pushButton_enter->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_enter, 5, 2, 1, 1);

        pushButton_delete = new QPushButton(layoutWidget);
        pushButton_delete->setObjectName(QString::fromUtf8("pushButton_delete"));
        pushButton_delete->setMinimumSize(QSize(85, 50));
        pushButton_delete->setMaximumSize(QSize(16777215, 50));

        gridLayout->addWidget(pushButton_delete, 4, 2, 1, 1);

        pushButton_cancel = new QPushButton(layoutWidget);
        pushButton_cancel->setObjectName(QString::fromUtf8("pushButton_cancel"));
        pushButton_cancel->setMinimumSize(QSize(0, 50));
        pushButton_cancel->setMaximumSize(QSize(16777215, 51));

        gridLayout->addWidget(pushButton_cancel, 5, 0, 1, 1);

        pushButton_num10 = new QPushButton(layoutWidget);
        pushButton_num10->setObjectName(QString::fromUtf8("pushButton_num10"));
        pushButton_num10->setMinimumSize(QSize(85, 50));
        pushButton_num10->setMaximumSize(QSize(16777215, 50));

        gridLayout->addWidget(pushButton_num10, 4, 0, 1, 1);

        lineEdit = new QLineEdit(groupBox);
        lineEdit->setObjectName(QString::fromUtf8("lineEdit"));
        lineEdit->setGeometry(QRect(10, 30, 551, 27));

        retranslateUi(Number_board);

        QMetaObject::connectSlotsByName(Number_board);
    } // setupUi

    void retranslateUi(QDialog *Number_board)
    {
        Number_board->setWindowTitle(QString());
        groupBox->setTitle(QString());
        pushButton_num7->setText(QApplication::translate("Number_board", "7", 0, QApplication::UnicodeUTF8));
        pushButton_num5->setText(QApplication::translate("Number_board", "5", 0, QApplication::UnicodeUTF8));
        pushButton_num6->setText(QApplication::translate("Number_board", "6", 0, QApplication::UnicodeUTF8));
        pushButton_num2->setText(QApplication::translate("Number_board", "2", 0, QApplication::UnicodeUTF8));
        pushButton_num9->setText(QApplication::translate("Number_board", "9", 0, QApplication::UnicodeUTF8));
        pushButton_num8->setText(QApplication::translate("Number_board", "8", 0, QApplication::UnicodeUTF8));
        pushButton_num3->setText(QApplication::translate("Number_board", "3", 0, QApplication::UnicodeUTF8));
        pushButton_num4->setText(QApplication::translate("Number_board", "4", 0, QApplication::UnicodeUTF8));
        pushButton_num0->setText(QApplication::translate("Number_board", "0", 0, QApplication::UnicodeUTF8));
        pushButton_num1->setText(QApplication::translate("Number_board", "1", 0, QApplication::UnicodeUTF8));
        pushButton_enter->setText(QApplication::translate("Number_board", "\347\241\256\345\256\232", 0, QApplication::UnicodeUTF8));
        pushButton_delete->setText(QApplication::translate("Number_board", "<--", 0, QApplication::UnicodeUTF8));
        pushButton_cancel->setText(QApplication::translate("Number_board", "\345\217\226\346\266\210", 0, QApplication::UnicodeUTF8));
        pushButton_num10->setText(QApplication::translate("Number_board", ".", 0, QApplication::UnicodeUTF8));
    } // retranslateUi

};

namespace Ui {
    class Number_board: public Ui_Number_board {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_NUMBER_BOARD_H
