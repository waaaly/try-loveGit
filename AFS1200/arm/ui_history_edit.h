/********************************************************************************
** Form generated from reading UI file 'history_edit.ui'
**
** Created: Tue Oct 23 13:30:05 2018
**      by: Qt User Interface Compiler version 4.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_HISTORY_EDIT_H
#define UI_HISTORY_EDIT_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QComboBox>
#include <QtGui/QDialog>
#include <QtGui/QGridLayout>
#include <QtGui/QHBoxLayout>
#include <QtGui/QHeaderView>
#include <QtGui/QLabel>
#include <QtGui/QLineEdit>
#include <QtGui/QPushButton>
#include <QtGui/QTableWidget>
#include <QtGui/QToolButton>
#include <QtGui/QWidget>

QT_BEGIN_NAMESPACE

class Ui_History_edit
{
public:
    QTableWidget *tableWidget_result;
    QPushButton *Button_close;
    QWidget *widget_title;
    QHBoxLayout *horizontalLayout_2;
    QLabel *lab_Ico;
    QLabel *lab_Title;
    QPushButton *Button_save;
    QToolButton *toolButton;
    QWidget *layoutWidget;
    QGridLayout *gridLayout;
    QLabel *label_8;
    QLabel *label_batch;
    QLabel *label_2;
    QLabel *label_10;
    QLabel *label_serial;
    QLabel *label_3;
    QLabel *label_itemt;
    QLineEdit *lineEdit_pname;
    QLabel *label_current_num;
    QLabel *label_5;
    QLabel *label_4;
    QLabel *label_9;
    QComboBox *comboBox_sex;
    QLabel *label;
    QLabel *label_batch_2;
    QHBoxLayout *horizontalLayout;
    QLineEdit *lineEdit_age_numkeyboard;
    QComboBox *comboBox_age_unit;

    void setupUi(QDialog *History_edit)
    {
        if (History_edit->objectName().isEmpty())
            History_edit->setObjectName(QString::fromUtf8("History_edit"));
        History_edit->resize(800, 480);
        QIcon icon;
        icon.addFile(QString::fromUtf8(":/image/info.png"), QSize(), QIcon::Normal, QIcon::Off);
        History_edit->setWindowIcon(icon);
        History_edit->setSizeGripEnabled(false);
        tableWidget_result = new QTableWidget(History_edit);
        if (tableWidget_result->columnCount() < 5)
            tableWidget_result->setColumnCount(5);
        QTableWidgetItem *__qtablewidgetitem = new QTableWidgetItem();
        tableWidget_result->setHorizontalHeaderItem(0, __qtablewidgetitem);
        QTableWidgetItem *__qtablewidgetitem1 = new QTableWidgetItem();
        tableWidget_result->setHorizontalHeaderItem(1, __qtablewidgetitem1);
        QTableWidgetItem *__qtablewidgetitem2 = new QTableWidgetItem();
        tableWidget_result->setHorizontalHeaderItem(2, __qtablewidgetitem2);
        QTableWidgetItem *__qtablewidgetitem3 = new QTableWidgetItem();
        tableWidget_result->setHorizontalHeaderItem(3, __qtablewidgetitem3);
        QTableWidgetItem *__qtablewidgetitem4 = new QTableWidgetItem();
        tableWidget_result->setHorizontalHeaderItem(4, __qtablewidgetitem4);
        tableWidget_result->setObjectName(QString::fromUtf8("tableWidget_result"));
        tableWidget_result->setGeometry(QRect(100, 250, 541, 201));
        tableWidget_result->horizontalHeader()->setDefaultSectionSize(100);
        tableWidget_result->horizontalHeader()->setMinimumSectionSize(20);
        Button_close = new QPushButton(History_edit);
        Button_close->setObjectName(QString::fromUtf8("Button_close"));
        Button_close->setGeometry(QRect(660, 400, 110, 50));
        Button_close->setMinimumSize(QSize(110, 50));
        Button_close->setMaximumSize(QSize(150, 50));
        QFont font;
        font.setPointSize(24);
        Button_close->setFont(font);
        widget_title = new QWidget(History_edit);
        widget_title->setObjectName(QString::fromUtf8("widget_title"));
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
        horizontalLayout_2 = new QHBoxLayout(widget_title);
        horizontalLayout_2->setSpacing(0);
        horizontalLayout_2->setObjectName(QString::fromUtf8("horizontalLayout_2"));
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
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
        QFont font2;
        font2.setFamily(QString::fromUtf8("\345\276\256\350\275\257\351\233\205\351\273\221"));
        font2.setPointSize(10);
        font2.setBold(false);
        font2.setItalic(false);
        font2.setWeight(50);
        lab_Title->setFont(font2);
        lab_Title->setStyleSheet(QString::fromUtf8("font: 10pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));
        lab_Title->setAlignment(Qt::AlignLeading|Qt::AlignLeft|Qt::AlignVCenter);

        horizontalLayout_2->addWidget(lab_Title);

        Button_save = new QPushButton(History_edit);
        Button_save->setObjectName(QString::fromUtf8("Button_save"));
        Button_save->setGeometry(QRect(660, 330, 110, 50));
        Button_save->setMinimumSize(QSize(110, 50));
        Button_save->setMaximumSize(QSize(150, 50));
        Button_save->setFont(font);
        toolButton = new QToolButton(History_edit);
        toolButton->setObjectName(QString::fromUtf8("toolButton"));
        toolButton->setGeometry(QRect(6, 389, 91, 81));
        toolButton->setStyleSheet(QString::fromUtf8("QToolButton{\n"
"border: none;\n"
"background: none;\n"
"}\n"
"QToolButton:hover{\n"
"border: none;\n"
"background: none;\n"
"}\n"
"QToolButton:pressed{\n"
"border: none;\n"
"background: none;\n"
"}"));
        layoutWidget = new QWidget(History_edit);
        layoutWidget->setObjectName(QString::fromUtf8("layoutWidget"));
        layoutWidget->setGeometry(QRect(100, 50, 541, 198));
        gridLayout = new QGridLayout(layoutWidget);
        gridLayout->setObjectName(QString::fromUtf8("gridLayout"));
        gridLayout->setHorizontalSpacing(10);
        gridLayout->setVerticalSpacing(12);
        gridLayout->setContentsMargins(0, 0, 0, 0);
        label_8 = new QLabel(layoutWidget);
        label_8->setObjectName(QString::fromUtf8("label_8"));
        label_8->setFont(font1);
        label_8->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label_8, 1, 2, 1, 1);

        label_batch = new QLabel(layoutWidget);
        label_batch->setObjectName(QString::fromUtf8("label_batch"));

        gridLayout->addWidget(label_batch, 1, 1, 1, 1);

        label_2 = new QLabel(layoutWidget);
        label_2->setObjectName(QString::fromUtf8("label_2"));
        label_2->setFont(font1);
        label_2->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label_2, 1, 0, 1, 1);

        label_10 = new QLabel(layoutWidget);
        label_10->setObjectName(QString::fromUtf8("label_10"));
        label_10->setFont(font1);
        label_10->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label_10, 0, 2, 1, 1);

        label_serial = new QLabel(layoutWidget);
        label_serial->setObjectName(QString::fromUtf8("label_serial"));

        gridLayout->addWidget(label_serial, 0, 3, 1, 1);

        label_3 = new QLabel(layoutWidget);
        label_3->setObjectName(QString::fromUtf8("label_3"));
        label_3->setFont(font1);
        label_3->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label_3, 2, 0, 1, 1);

        label_itemt = new QLabel(layoutWidget);
        label_itemt->setObjectName(QString::fromUtf8("label_itemt"));

        gridLayout->addWidget(label_itemt, 1, 3, 1, 1);

        lineEdit_pname = new QLineEdit(layoutWidget);
        lineEdit_pname->setObjectName(QString::fromUtf8("lineEdit_pname"));
        QSizePolicy sizePolicy3(QSizePolicy::Preferred, QSizePolicy::Preferred);
        sizePolicy3.setHorizontalStretch(0);
        sizePolicy3.setVerticalStretch(0);
        sizePolicy3.setHeightForWidth(lineEdit_pname->sizePolicy().hasHeightForWidth());
        lineEdit_pname->setSizePolicy(sizePolicy3);
        lineEdit_pname->setMinimumSize(QSize(0, 30));

        gridLayout->addWidget(lineEdit_pname, 2, 1, 1, 1);

        label_current_num = new QLabel(layoutWidget);
        label_current_num->setObjectName(QString::fromUtf8("label_current_num"));

        gridLayout->addWidget(label_current_num, 0, 1, 1, 1);

        label_5 = new QLabel(layoutWidget);
        label_5->setObjectName(QString::fromUtf8("label_5"));
        label_5->setFont(font1);
        label_5->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label_5, 4, 0, 1, 1);

        label_4 = new QLabel(layoutWidget);
        label_4->setObjectName(QString::fromUtf8("label_4"));
        label_4->setFont(font1);
        label_4->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label_4, 3, 0, 1, 1);

        label_9 = new QLabel(layoutWidget);
        label_9->setObjectName(QString::fromUtf8("label_9"));
        label_9->setFont(font1);
        label_9->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label_9, 2, 2, 1, 1);

        comboBox_sex = new QComboBox(layoutWidget);
        comboBox_sex->setObjectName(QString::fromUtf8("comboBox_sex"));
        sizePolicy3.setHeightForWidth(comboBox_sex->sizePolicy().hasHeightForWidth());
        comboBox_sex->setSizePolicy(sizePolicy3);

        gridLayout->addWidget(comboBox_sex, 2, 3, 1, 1);

        label = new QLabel(layoutWidget);
        label->setObjectName(QString::fromUtf8("label"));
        label->setFont(font1);
        label->setLayoutDirection(Qt::RightToLeft);

        gridLayout->addWidget(label, 0, 0, 1, 1);

        label_batch_2 = new QLabel(layoutWidget);
        label_batch_2->setObjectName(QString::fromUtf8("label_batch_2"));

        gridLayout->addWidget(label_batch_2, 4, 1, 1, 1);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QString::fromUtf8("horizontalLayout"));
        lineEdit_age_numkeyboard = new QLineEdit(layoutWidget);
        lineEdit_age_numkeyboard->setObjectName(QString::fromUtf8("lineEdit_age_numkeyboard"));
        QSizePolicy sizePolicy4(QSizePolicy::Ignored, QSizePolicy::Preferred);
        sizePolicy4.setHorizontalStretch(0);
        sizePolicy4.setVerticalStretch(0);
        sizePolicy4.setHeightForWidth(lineEdit_age_numkeyboard->sizePolicy().hasHeightForWidth());
        lineEdit_age_numkeyboard->setSizePolicy(sizePolicy4);
        lineEdit_age_numkeyboard->setMinimumSize(QSize(0, 30));

        horizontalLayout->addWidget(lineEdit_age_numkeyboard);

        comboBox_age_unit = new QComboBox(layoutWidget);
        comboBox_age_unit->setObjectName(QString::fromUtf8("comboBox_age_unit"));
        sizePolicy3.setHeightForWidth(comboBox_age_unit->sizePolicy().hasHeightForWidth());
        comboBox_age_unit->setSizePolicy(sizePolicy3);

        horizontalLayout->addWidget(comboBox_age_unit);


        gridLayout->addLayout(horizontalLayout, 3, 1, 1, 1);

        gridLayout->setColumnMinimumWidth(1, 1);
        gridLayout->setColumnMinimumWidth(3, 1);

        retranslateUi(History_edit);

        QMetaObject::connectSlotsByName(History_edit);
    } // setupUi

    void retranslateUi(QDialog *History_edit)
    {
        History_edit->setWindowTitle(QApplication::translate("History_edit", "History", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem = tableWidget_result->horizontalHeaderItem(0);
        ___qtablewidgetitem->setText(QApplication::translate("History_edit", "\351\241\271\347\233\256\345\220\215\347\247\260", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem1 = tableWidget_result->horizontalHeaderItem(1);
        ___qtablewidgetitem1->setText(QApplication::translate("History_edit", "\346\265\223\345\272\246", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem2 = tableWidget_result->horizontalHeaderItem(2);
        ___qtablewidgetitem2->setText(QApplication::translate("History_edit", "\345\215\225\344\275\215", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem3 = tableWidget_result->horizontalHeaderItem(3);
        ___qtablewidgetitem3->setText(QApplication::translate("History_edit", "\346\265\213\350\257\225\351\200\232\351\201\223", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem4 = tableWidget_result->horizontalHeaderItem(4);
        ___qtablewidgetitem4->setText(QApplication::translate("History_edit", "\346\265\213\350\257\225\346\227\266\351\227\264", 0, QApplication::UnicodeUTF8));
        Button_close->setText(QApplication::translate("History_edit", "\345\205\263\351\227\255", 0, QApplication::UnicodeUTF8));
        lab_Ico->setText(QString());
        lab_Title->setText(QApplication::translate("History_edit", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'\345\276\256\350\275\257\351\233\205\351\273\221'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<table border=\"0\" style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:20pt;\">\351\253\230\347\272\247\344\277\241\346\201\257</span></p></td></tr></table></body></html>", 0, QApplication::UnicodeUTF8));
        Button_save->setText(QApplication::translate("History_edit", "\344\277\235\345\255\230", 0, QApplication::UnicodeUTF8));
        toolButton->setText(QString());
        label_8->setText(QApplication::translate("History_edit", "\351\241\271\347\233\256:", 0, QApplication::UnicodeUTF8));
        label_batch->setText(QString());
        label_2->setText(QApplication::translate("History_edit", "\346\235\241\347\240\201\345\200\274:", 0, QApplication::UnicodeUTF8));
        label_10->setText(QApplication::translate("History_edit", "\346\265\201\346\260\264\345\217\267:", 0, QApplication::UnicodeUTF8));
        label_serial->setText(QString());
        label_3->setText(QApplication::translate("History_edit", "\345\247\223\345\220\215:", 0, QApplication::UnicodeUTF8));
        label_itemt->setText(QString());
        lineEdit_pname->setText(QString());
        label_current_num->setText(QString());
        label_5->setText(QApplication::translate("History_edit", "\346\240\267\346\234\254\347\261\273\345\236\213:", 0, QApplication::UnicodeUTF8));
        label_4->setText(QApplication::translate("History_edit", "\345\271\264\351\276\204:", 0, QApplication::UnicodeUTF8));
        label_9->setText(QApplication::translate("History_edit", "\346\200\247\345\210\253:", 0, QApplication::UnicodeUTF8));
        comboBox_sex->clear();
        comboBox_sex->insertItems(0, QStringList()
         << QString()
         << QApplication::translate("History_edit", "\347\224\267", 0, QApplication::UnicodeUTF8)
         << QApplication::translate("History_edit", "\345\245\263", 0, QApplication::UnicodeUTF8)
        );
        label->setText(QApplication::translate("History_edit", "\346\240\267\346\234\254\345\217\267:", 0, QApplication::UnicodeUTF8));
        label_batch_2->setText(QString());
        lineEdit_age_numkeyboard->setText(QString());
    } // retranslateUi

};

namespace Ui {
    class History_edit: public Ui_History_edit {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_HISTORY_EDIT_H
