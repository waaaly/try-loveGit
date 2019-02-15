/********************************************************************************
** Form generated from reading UI file 'number_board.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_NUMBER_BOARD_H
#define UI_NUMBER_BOARD_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Number_board
{
public:
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
    QWidget *widget_title;
    QHBoxLayout *horizontalLayout_2;
    QLabel *lab_Ico;
    QLabel *lab_Title;
    QWidget *widget_menu;
    QHBoxLayout *horizontalLayout_3;

    void setupUi(QDialog *Number_board)
    {
        if (Number_board->objectName().isEmpty())
            Number_board->setObjectName(QStringLiteral("Number_board"));
        Number_board->resize(800, 480);
        QIcon icon;
        icon.addFile(QStringLiteral(":/image/info.png"), QSize(), QIcon::Normal, QIcon::Off);
        Number_board->setWindowIcon(icon);
        layoutWidget = new QWidget(Number_board);
        layoutWidget->setObjectName(QStringLiteral("layoutWidget"));
        layoutWidget->setGeometry(QRect(140, 100, 551, 361));
        gridLayout = new QGridLayout(layoutWidget);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setHorizontalSpacing(12);
        gridLayout->setContentsMargins(0, 0, 0, 0);
        pushButton_num7 = new QPushButton(layoutWidget);
        pushButton_num7->setObjectName(QStringLiteral("pushButton_num7"));
        pushButton_num7->setMinimumSize(QSize(0, 60));
        pushButton_num7->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num7, 3, 0, 1, 1);

        pushButton_num5 = new QPushButton(layoutWidget);
        pushButton_num5->setObjectName(QStringLiteral("pushButton_num5"));
        pushButton_num5->setMinimumSize(QSize(0, 60));
        pushButton_num5->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num5, 2, 1, 1, 1);

        pushButton_num6 = new QPushButton(layoutWidget);
        pushButton_num6->setObjectName(QStringLiteral("pushButton_num6"));
        pushButton_num6->setMinimumSize(QSize(0, 60));
        pushButton_num6->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num6, 2, 2, 1, 1);

        pushButton_num2 = new QPushButton(layoutWidget);
        pushButton_num2->setObjectName(QStringLiteral("pushButton_num2"));
        pushButton_num2->setMinimumSize(QSize(0, 60));
        pushButton_num2->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num2, 0, 1, 1, 1);

        pushButton_num9 = new QPushButton(layoutWidget);
        pushButton_num9->setObjectName(QStringLiteral("pushButton_num9"));
        pushButton_num9->setMinimumSize(QSize(0, 60));
        pushButton_num9->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num9, 3, 2, 1, 1);

        pushButton_num8 = new QPushButton(layoutWidget);
        pushButton_num8->setObjectName(QStringLiteral("pushButton_num8"));
        pushButton_num8->setMinimumSize(QSize(0, 60));
        pushButton_num8->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num8, 3, 1, 1, 1);

        pushButton_num3 = new QPushButton(layoutWidget);
        pushButton_num3->setObjectName(QStringLiteral("pushButton_num3"));
        pushButton_num3->setMinimumSize(QSize(0, 60));
        pushButton_num3->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num3, 0, 2, 1, 1);

        pushButton_num4 = new QPushButton(layoutWidget);
        pushButton_num4->setObjectName(QStringLiteral("pushButton_num4"));
        pushButton_num4->setMinimumSize(QSize(0, 60));
        pushButton_num4->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num4, 2, 0, 1, 1);

        pushButton_num0 = new QPushButton(layoutWidget);
        pushButton_num0->setObjectName(QStringLiteral("pushButton_num0"));
        pushButton_num0->setMinimumSize(QSize(0, 60));
        pushButton_num0->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num0, 4, 1, 1, 1);

        pushButton_num1 = new QPushButton(layoutWidget);
        pushButton_num1->setObjectName(QStringLiteral("pushButton_num1"));
        pushButton_num1->setMinimumSize(QSize(0, 60));
        pushButton_num1->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num1, 0, 0, 1, 1);

        pushButton_enter = new QPushButton(layoutWidget);
        pushButton_enter->setObjectName(QStringLiteral("pushButton_enter"));
        pushButton_enter->setMinimumSize(QSize(0, 60));
        pushButton_enter->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_enter, 5, 2, 1, 1);

        pushButton_delete = new QPushButton(layoutWidget);
        pushButton_delete->setObjectName(QStringLiteral("pushButton_delete"));
        pushButton_delete->setMinimumSize(QSize(85, 60));
        pushButton_delete->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_delete, 4, 2, 1, 1);

        pushButton_cancel = new QPushButton(layoutWidget);
        pushButton_cancel->setObjectName(QStringLiteral("pushButton_cancel"));
        pushButton_cancel->setMinimumSize(QSize(0, 60));
        pushButton_cancel->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_cancel, 5, 0, 1, 1);

        pushButton_num10 = new QPushButton(layoutWidget);
        pushButton_num10->setObjectName(QStringLiteral("pushButton_num10"));
        pushButton_num10->setMinimumSize(QSize(85, 60));
        pushButton_num10->setMaximumSize(QSize(16777215, 60));

        gridLayout->addWidget(pushButton_num10, 4, 0, 1, 1);

        lineEdit = new QLineEdit(Number_board);
        lineEdit->setObjectName(QStringLiteral("lineEdit"));
        lineEdit->setGeometry(QRect(140, 60, 551, 36));
        widget_title = new QWidget(Number_board);
        widget_title->setObjectName(QStringLiteral("widget_title"));
        widget_title->setGeometry(QRect(0, 0, 801, 40));
        QSizePolicy sizePolicy(QSizePolicy::Preferred, QSizePolicy::Fixed);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(widget_title->sizePolicy().hasHeightForWidth());
        widget_title->setSizePolicy(sizePolicy);
        widget_title->setMinimumSize(QSize(100, 28));
        QFont font;
        font.setPointSize(20);
        widget_title->setFont(font);
        horizontalLayout_2 = new QHBoxLayout(widget_title);
        horizontalLayout_2->setSpacing(0);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
        lab_Ico = new QLabel(widget_title);
        lab_Ico->setObjectName(QStringLiteral("lab_Ico"));
        QSizePolicy sizePolicy1(QSizePolicy::Minimum, QSizePolicy::Preferred);
        sizePolicy1.setHorizontalStretch(0);
        sizePolicy1.setVerticalStretch(0);
        sizePolicy1.setHeightForWidth(lab_Ico->sizePolicy().hasHeightForWidth());
        lab_Ico->setSizePolicy(sizePolicy1);
        lab_Ico->setMinimumSize(QSize(31, 0));
        lab_Ico->setAlignment(Qt::AlignCenter);

        horizontalLayout_2->addWidget(lab_Ico);

        lab_Title = new QLabel(widget_title);
        lab_Title->setObjectName(QStringLiteral("lab_Title"));
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
        widget_menu->setObjectName(QStringLiteral("widget_menu"));
        sizePolicy1.setHeightForWidth(widget_menu->sizePolicy().hasHeightForWidth());
        widget_menu->setSizePolicy(sizePolicy1);
        horizontalLayout_3 = new QHBoxLayout(widget_menu);
        horizontalLayout_3->setSpacing(0);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        horizontalLayout_3->setContentsMargins(0, 0, 0, 0);

        horizontalLayout_2->addWidget(widget_menu);


        retranslateUi(Number_board);

        QMetaObject::connectSlotsByName(Number_board);
    } // setupUi

    void retranslateUi(QDialog *Number_board)
    {
        Number_board->setWindowTitle(QString());
        pushButton_num7->setText(QApplication::translate("Number_board", "7", nullptr));
        pushButton_num5->setText(QApplication::translate("Number_board", "5", nullptr));
        pushButton_num6->setText(QApplication::translate("Number_board", "6", nullptr));
        pushButton_num2->setText(QApplication::translate("Number_board", "2", nullptr));
        pushButton_num9->setText(QApplication::translate("Number_board", "9", nullptr));
        pushButton_num8->setText(QApplication::translate("Number_board", "8", nullptr));
        pushButton_num3->setText(QApplication::translate("Number_board", "3", nullptr));
        pushButton_num4->setText(QApplication::translate("Number_board", "4", nullptr));
        pushButton_num0->setText(QApplication::translate("Number_board", "0", nullptr));
        pushButton_num1->setText(QApplication::translate("Number_board", "1", nullptr));
        pushButton_enter->setText(QApplication::translate("Number_board", "\347\241\256\345\256\232", nullptr));
        pushButton_delete->setText(QApplication::translate("Number_board", "<--", nullptr));
        pushButton_cancel->setText(QApplication::translate("Number_board", "\345\217\226\346\266\210", nullptr));
        pushButton_num10->setText(QApplication::translate("Number_board", ".", nullptr));
        lab_Ico->setText(QString());
        lab_Title->setText(QApplication::translate("Number_board", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'\345\276\256\350\275\257\351\233\205\351\273\221'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<table border=\"0\" style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:20pt;\">\346\225\260\345\255\227\351\224\256\347\233\230</span></p></td></tr></table></body></html>", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Number_board: public Ui_Number_board {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_NUMBER_BOARD_H
