/********************************************************************************
** Form generated from reading UI file 'select_date.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_SELECT_DATE_H
#define UI_SELECT_DATE_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCalendarWidget>
#include <QtWidgets/QDialog>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QRadioButton>
#include <QtWidgets/QToolButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Select_date
{
public:
    QPushButton *histroyButton_show_toweek;
    QPushButton *histroyButton_show_tomonth;
    QPushButton *histroyButton_show_today;
    QCalendarWidget *calendarWidget;
    QLabel *label;
    QPushButton *histroyButton_last_year;
    QPushButton *histroyButton_next_year;
    QPushButton *histroyButton_last_mon;
    QPushButton *histroyButton_next_mon;
    QToolButton *toolButton;
    QToolButton *toolButton_2;
    QLabel *label_year;
    QLabel *label_7;
    QLabel *label_8;
    QLabel *label_mon;
    QRadioButton *radioButton_start;
    QRadioButton *radioButton_end;
    QWidget *layoutWidget;
    QHBoxLayout *horizontalLayout;
    QLabel *label_2;
    QLineEdit *lineEdit_start;
    QWidget *layoutWidget1;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_3;
    QLineEdit *lineEdit_end;
    QWidget *widget_title;
    QHBoxLayout *horizontalLayout_3;
    QLabel *lab_Ico;
    QLabel *lab_Title;
    QWidget *widget_menu;
    QHBoxLayout *horizontalLayout_4;

    void setupUi(QDialog *Select_date)
    {
        if (Select_date->objectName().isEmpty())
            Select_date->setObjectName(QStringLiteral("Select_date"));
        Select_date->resize(800, 480);
        Select_date->setMinimumSize(QSize(692, 443));
        Select_date->setMaximumSize(QSize(962, 480));
        Select_date->setModal(true);
        histroyButton_show_toweek = new QPushButton(Select_date);
        histroyButton_show_toweek->setObjectName(QStringLiteral("histroyButton_show_toweek"));
        histroyButton_show_toweek->setGeometry(QRect(340, 50, 100, 60));
        histroyButton_show_tomonth = new QPushButton(Select_date);
        histroyButton_show_tomonth->setObjectName(QStringLiteral("histroyButton_show_tomonth"));
        histroyButton_show_tomonth->setGeometry(QRect(450, 50, 100, 60));
        histroyButton_show_today = new QPushButton(Select_date);
        histroyButton_show_today->setObjectName(QStringLiteral("histroyButton_show_today"));
        histroyButton_show_today->setGeometry(QRect(230, 50, 100, 60));
        calendarWidget = new QCalendarWidget(Select_date);
        calendarWidget->setObjectName(QStringLiteral("calendarWidget"));
        calendarWidget->setGeometry(QRect(150, 150, 471, 191));
        calendarWidget->setVerticalHeaderFormat(QCalendarWidget::NoVerticalHeader);
        calendarWidget->setNavigationBarVisible(false);
        calendarWidget->setDateEditEnabled(false);
        label = new QLabel(Select_date);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(270, 110, 281, 31));
        QFont font;
        font.setPointSize(16);
        label->setFont(font);
        histroyButton_last_year = new QPushButton(Select_date);
        histroyButton_last_year->setObjectName(QStringLiteral("histroyButton_last_year"));
        histroyButton_last_year->setGeometry(QRect(40, 160, 100, 60));
        histroyButton_next_year = new QPushButton(Select_date);
        histroyButton_next_year->setObjectName(QStringLiteral("histroyButton_next_year"));
        histroyButton_next_year->setGeometry(QRect(40, 230, 100, 60));
        histroyButton_last_mon = new QPushButton(Select_date);
        histroyButton_last_mon->setObjectName(QStringLiteral("histroyButton_last_mon"));
        histroyButton_last_mon->setGeometry(QRect(630, 160, 100, 60));
        histroyButton_next_mon = new QPushButton(Select_date);
        histroyButton_next_mon->setObjectName(QStringLiteral("histroyButton_next_mon"));
        histroyButton_next_mon->setGeometry(QRect(630, 230, 100, 60));
        toolButton = new QToolButton(Select_date);
        toolButton->setObjectName(QStringLiteral("toolButton"));
        toolButton->setGeometry(QRect(550, 390, 100, 60));
        toolButton_2 = new QToolButton(Select_date);
        toolButton_2->setObjectName(QStringLiteral("toolButton_2"));
        toolButton_2->setGeometry(QRect(440, 390, 100, 60));
        label_year = new QLabel(Select_date);
        label_year->setObjectName(QStringLiteral("label_year"));
        label_year->setGeometry(QRect(100, 120, 61, 27));
        label_year->setFont(font);
        label_year->setLayoutDirection(Qt::RightToLeft);
        label_7 = new QLabel(Select_date);
        label_7->setObjectName(QStringLiteral("label_7"));
        label_7->setGeometry(QRect(180, 120, 61, 27));
        label_7->setFont(font);
        label_8 = new QLabel(Select_date);
        label_8->setObjectName(QStringLiteral("label_8"));
        label_8->setGeometry(QRect(590, 120, 51, 27));
        label_8->setFont(font);
        label_mon = new QLabel(Select_date);
        label_mon->setObjectName(QStringLiteral("label_mon"));
        label_mon->setGeometry(QRect(550, 120, 31, 27));
        label_mon->setFont(font);
        label_mon->setLayoutDirection(Qt::RightToLeft);
        radioButton_start = new QRadioButton(Select_date);
        radioButton_start->setObjectName(QStringLiteral("radioButton_start"));
        radioButton_start->setGeometry(QRect(150, 360, 36, 36));
        radioButton_start->setChecked(true);
        radioButton_end = new QRadioButton(Select_date);
        radioButton_end->setObjectName(QStringLiteral("radioButton_end"));
        radioButton_end->setGeometry(QRect(150, 410, 36, 36));
        layoutWidget = new QWidget(Select_date);
        layoutWidget->setObjectName(QStringLiteral("layoutWidget"));
        layoutWidget->setGeometry(QRect(180, 360, 181, 38));
        horizontalLayout = new QHBoxLayout(layoutWidget);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        horizontalLayout->setContentsMargins(0, 0, 0, 0);
        label_2 = new QLabel(layoutWidget);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setFont(font);

        horizontalLayout->addWidget(label_2);

        lineEdit_start = new QLineEdit(layoutWidget);
        lineEdit_start->setObjectName(QStringLiteral("lineEdit_start"));
        lineEdit_start->setMinimumSize(QSize(0, 36));

        horizontalLayout->addWidget(lineEdit_start);

        layoutWidget1 = new QWidget(Select_date);
        layoutWidget1->setObjectName(QStringLiteral("layoutWidget1"));
        layoutWidget1->setGeometry(QRect(180, 410, 181, 38));
        horizontalLayout_2 = new QHBoxLayout(layoutWidget1);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
        label_3 = new QLabel(layoutWidget1);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setFont(font);

        horizontalLayout_2->addWidget(label_3);

        lineEdit_end = new QLineEdit(layoutWidget1);
        lineEdit_end->setObjectName(QStringLiteral("lineEdit_end"));
        lineEdit_end->setMinimumSize(QSize(0, 36));

        horizontalLayout_2->addWidget(lineEdit_end);

        widget_title = new QWidget(Select_date);
        widget_title->setObjectName(QStringLiteral("widget_title"));
        widget_title->setGeometry(QRect(0, 0, 801, 40));
        QSizePolicy sizePolicy(QSizePolicy::Preferred, QSizePolicy::Fixed);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(widget_title->sizePolicy().hasHeightForWidth());
        widget_title->setSizePolicy(sizePolicy);
        widget_title->setMinimumSize(QSize(100, 28));
        QFont font1;
        font1.setPointSize(20);
        widget_title->setFont(font1);
        horizontalLayout_3 = new QHBoxLayout(widget_title);
        horizontalLayout_3->setSpacing(0);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        horizontalLayout_3->setContentsMargins(0, 0, 0, 0);
        lab_Ico = new QLabel(widget_title);
        lab_Ico->setObjectName(QStringLiteral("lab_Ico"));
        QSizePolicy sizePolicy1(QSizePolicy::Minimum, QSizePolicy::Preferred);
        sizePolicy1.setHorizontalStretch(0);
        sizePolicy1.setVerticalStretch(0);
        sizePolicy1.setHeightForWidth(lab_Ico->sizePolicy().hasHeightForWidth());
        lab_Ico->setSizePolicy(sizePolicy1);
        lab_Ico->setMinimumSize(QSize(31, 0));
        lab_Ico->setAlignment(Qt::AlignCenter);

        horizontalLayout_3->addWidget(lab_Ico);

        lab_Title = new QLabel(widget_title);
        lab_Title->setObjectName(QStringLiteral("lab_Title"));
        QSizePolicy sizePolicy2(QSizePolicy::Expanding, QSizePolicy::Preferred);
        sizePolicy2.setHorizontalStretch(0);
        sizePolicy2.setVerticalStretch(0);
        sizePolicy2.setHeightForWidth(lab_Title->sizePolicy().hasHeightForWidth());
        lab_Title->setSizePolicy(sizePolicy2);
        QFont font2;
        font2.setFamily(QString::fromUtf8("\345\276\256\350\275\257\351\233\205\351\273\221"));
        font2.setPointSize(10);
        font2.setBold(false);
        font2.setItalic(false);
        font2.setWeight(50);
        lab_Title->setFont(font2);
        lab_Title->setStyleSheet(QString::fromUtf8("font: 10pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));
        lab_Title->setAlignment(Qt::AlignLeading|Qt::AlignLeft|Qt::AlignVCenter);

        horizontalLayout_3->addWidget(lab_Title);

        widget_menu = new QWidget(widget_title);
        widget_menu->setObjectName(QStringLiteral("widget_menu"));
        sizePolicy1.setHeightForWidth(widget_menu->sizePolicy().hasHeightForWidth());
        widget_menu->setSizePolicy(sizePolicy1);
        horizontalLayout_4 = new QHBoxLayout(widget_menu);
        horizontalLayout_4->setSpacing(0);
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        horizontalLayout_4->setContentsMargins(0, 0, 0, 0);

        horizontalLayout_3->addWidget(widget_menu);


        retranslateUi(Select_date);

        QMetaObject::connectSlotsByName(Select_date);
    } // setupUi

    void retranslateUi(QDialog *Select_date)
    {
        Select_date->setWindowTitle(QApplication::translate("Select_date", "Date", nullptr));
        histroyButton_show_toweek->setText(QApplication::translate("Select_date", "\346\234\254\345\221\250", nullptr));
        histroyButton_show_tomonth->setText(QApplication::translate("Select_date", "\346\234\254\346\234\210", nullptr));
        histroyButton_show_today->setText(QApplication::translate("Select_date", "\344\273\212\345\244\251", nullptr));
        label->setText(QApplication::translate("Select_date", "--\346\210\226\351\200\211\346\213\251\350\265\267\346\255\242\346\227\245\346\234\237\346\237\245\350\257\242--", nullptr));
        histroyButton_last_year->setText(QApplication::translate("Select_date", "\344\270\212\344\270\200\345\271\264", nullptr));
        histroyButton_next_year->setText(QApplication::translate("Select_date", "\344\270\213\344\270\200\345\271\264", nullptr));
        histroyButton_last_mon->setText(QApplication::translate("Select_date", "\344\270\212\344\270\200\346\234\210", nullptr));
        histroyButton_next_mon->setText(QApplication::translate("Select_date", "\344\270\213\344\270\200\346\234\210", nullptr));
        toolButton->setText(QApplication::translate("Select_date", "\347\241\256\345\256\232", nullptr));
        toolButton_2->setText(QApplication::translate("Select_date", "\345\217\226\346\266\210", nullptr));
        label_year->setText(QString());
        label_7->setText(QApplication::translate("Select_date", "\345\271\264", nullptr));
        label_8->setText(QApplication::translate("Select_date", "\346\234\210", nullptr));
        label_mon->setText(QString());
        radioButton_start->setText(QString());
        radioButton_end->setText(QString());
        label_2->setText(QApplication::translate("Select_date", "\350\265\267", nullptr));
        label_3->setText(QApplication::translate("Select_date", "\346\255\242", nullptr));
        lab_Ico->setText(QString());
        lab_Title->setText(QApplication::translate("Select_date", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'\345\276\256\350\275\257\351\233\205\351\273\221'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<table border=\"0\" style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:20pt;\">\346\227\245\346\234\237\351\200\211\346\213\251</span></p></td></tr></table></body></html>", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Select_date: public Ui_Select_date {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_SELECT_DATE_H
