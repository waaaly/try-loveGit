/********************************************************************************
** Form generated from reading UI file 'his_prj_view_frm.ui'
**
** Created: Tue Oct 23 13:30:05 2018
**      by: Qt User Interface Compiler version 4.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_HIS_PRJ_VIEW_FRM_H
#define UI_HIS_PRJ_VIEW_FRM_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QGridLayout>
#include <QtGui/QGroupBox>
#include <QtGui/QHBoxLayout>
#include <QtGui/QHeaderView>
#include <QtGui/QLabel>
#include <QtGui/QPushButton>
#include <QtGui/QTableWidget>
#include <QtGui/QVBoxLayout>
#include <QtGui/QWidget>

QT_BEGIN_NAMESPACE

class Ui_his_prj_view_frm
{
public:
    QPushButton *exit_bt;
    QTableWidget *tableWidget;
    QGroupBox *groupBox;
    QGridLayout *gridLayout;
    QVBoxLayout *verticalLayout;
    QLabel *label_2;
    QLabel *label_3;
    QLabel *label_4;
    QLabel *label_5;
    QLabel *label_6;
    QLabel *label_7;
    QLabel *label_8;
    QLabel *label_9;
    QVBoxLayout *verticalLayout_2;
    QLabel *yangpinghao_lb;
    QLabel *No_lb;
    QLabel *tiaoma_lb;
    QLabel *xiangmu_lb;
    QLabel *xingming_lb;
    QLabel *xingbie_lb;
    QLabel *nianlin_lb;
    QLabel *leixing_lb;
    QWidget *widget_title;
    QHBoxLayout *horizontalLayout_2;
    QLabel *lab_Ico;
    QLabel *lab_Title;

    void setupUi(QWidget *his_prj_view_frm)
    {
        if (his_prj_view_frm->objectName().isEmpty())
            his_prj_view_frm->setObjectName(QString::fromUtf8("his_prj_view_frm"));
        his_prj_view_frm->resize(800, 480);
        his_prj_view_frm->setWindowOpacity(1);
        exit_bt = new QPushButton(his_prj_view_frm);
        exit_bt->setObjectName(QString::fromUtf8("exit_bt"));
        exit_bt->setGeometry(QRect(740, 70, 41, 361));
        QFont font;
        font.setFamily(QString::fromUtf8("Aharoni"));
        font.setPointSize(16);
        font.setBold(true);
        font.setWeight(75);
        exit_bt->setFont(font);
        exit_bt->setLayoutDirection(Qt::LeftToRight);
        tableWidget = new QTableWidget(his_prj_view_frm);
        if (tableWidget->columnCount() < 1)
            tableWidget->setColumnCount(1);
        if (tableWidget->rowCount() < 6)
            tableWidget->setRowCount(6);
        QTableWidgetItem *__qtablewidgetitem = new QTableWidgetItem();
        tableWidget->setVerticalHeaderItem(0, __qtablewidgetitem);
        QTableWidgetItem *__qtablewidgetitem1 = new QTableWidgetItem();
        tableWidget->setVerticalHeaderItem(1, __qtablewidgetitem1);
        QTableWidgetItem *__qtablewidgetitem2 = new QTableWidgetItem();
        tableWidget->setVerticalHeaderItem(2, __qtablewidgetitem2);
        QTableWidgetItem *__qtablewidgetitem3 = new QTableWidgetItem();
        tableWidget->setVerticalHeaderItem(3, __qtablewidgetitem3);
        QTableWidgetItem *__qtablewidgetitem4 = new QTableWidgetItem();
        tableWidget->setVerticalHeaderItem(4, __qtablewidgetitem4);
        QTableWidgetItem *__qtablewidgetitem5 = new QTableWidgetItem();
        tableWidget->setVerticalHeaderItem(5, __qtablewidgetitem5);
        QBrush brush(QColor(0, 0, 0, 240));
        brush.setStyle(Qt::NoBrush);
        QFont font1;
        font1.setFamily(QString::fromUtf8("Aharoni"));
        font1.setPointSize(12);
        font1.setBold(true);
        font1.setWeight(75);
        QTableWidgetItem *__qtablewidgetitem6 = new QTableWidgetItem();
        __qtablewidgetitem6->setFont(font1);
        __qtablewidgetitem6->setBackground(brush);
        tableWidget->setItem(0, 0, __qtablewidgetitem6);
        QBrush brush1(QColor(0, 0, 0, 240));
        brush1.setStyle(Qt::NoBrush);
        QTableWidgetItem *__qtablewidgetitem7 = new QTableWidgetItem();
        __qtablewidgetitem7->setFont(font1);
        __qtablewidgetitem7->setBackground(brush1);
        tableWidget->setItem(1, 0, __qtablewidgetitem7);
        QBrush brush2(QColor(0, 0, 0, 240));
        brush2.setStyle(Qt::NoBrush);
        QTableWidgetItem *__qtablewidgetitem8 = new QTableWidgetItem();
        __qtablewidgetitem8->setFont(font1);
        __qtablewidgetitem8->setBackground(brush2);
        tableWidget->setItem(2, 0, __qtablewidgetitem8);
        QBrush brush3(QColor(0, 0, 0, 240));
        brush3.setStyle(Qt::NoBrush);
        QTableWidgetItem *__qtablewidgetitem9 = new QTableWidgetItem();
        __qtablewidgetitem9->setFont(font1);
        __qtablewidgetitem9->setBackground(brush3);
        tableWidget->setItem(3, 0, __qtablewidgetitem9);
        QBrush brush4(QColor(0, 0, 0, 240));
        brush4.setStyle(Qt::NoBrush);
        QTableWidgetItem *__qtablewidgetitem10 = new QTableWidgetItem();
        __qtablewidgetitem10->setFont(font1);
        __qtablewidgetitem10->setBackground(brush4);
        tableWidget->setItem(4, 0, __qtablewidgetitem10);
        tableWidget->setObjectName(QString::fromUtf8("tableWidget"));
        tableWidget->setGeometry(QRect(230, 70, 501, 361));
        QFont font2;
        font2.setPointSize(11);
        tableWidget->setFont(font2);
        tableWidget->setFrameShape(QFrame::StyledPanel);
        tableWidget->setFrameShadow(QFrame::Plain);
        tableWidget->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        tableWidget->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        tableWidget->setAutoScroll(false);
        tableWidget->setAutoScrollMargin(0);
        tableWidget->setEditTriggers(QAbstractItemView::NoEditTriggers);
        tableWidget->setSelectionMode(QAbstractItemView::NoSelection);
        tableWidget->setShowGrid(true);
        tableWidget->setGridStyle(Qt::DotLine);
        tableWidget->setWordWrap(true);
        tableWidget->setColumnCount(1);
        tableWidget->horizontalHeader()->setVisible(false);
        tableWidget->horizontalHeader()->setDefaultSectionSize(481);
        tableWidget->horizontalHeader()->setHighlightSections(false);
        tableWidget->verticalHeader()->setDefaultSectionSize(60);
        tableWidget->verticalHeader()->setHighlightSections(false);
        tableWidget->verticalHeader()->setMinimumSectionSize(70);
        groupBox = new QGroupBox(his_prj_view_frm);
        groupBox->setObjectName(QString::fromUtf8("groupBox"));
        groupBox->setGeometry(QRect(20, 70, 201, 361));
        QFont font3;
        font3.setFamily(QString::fromUtf8("Aharoni"));
        font3.setPointSize(10);
        font3.setBold(true);
        font3.setWeight(75);
        groupBox->setFont(font3);
        groupBox->setFlat(false);
        groupBox->setCheckable(false);
        gridLayout = new QGridLayout(groupBox);
        gridLayout->setObjectName(QString::fromUtf8("gridLayout"));
        verticalLayout = new QVBoxLayout();
        verticalLayout->setObjectName(QString::fromUtf8("verticalLayout"));
        label_2 = new QLabel(groupBox);
        label_2->setObjectName(QString::fromUtf8("label_2"));

        verticalLayout->addWidget(label_2);

        label_3 = new QLabel(groupBox);
        label_3->setObjectName(QString::fromUtf8("label_3"));

        verticalLayout->addWidget(label_3);

        label_4 = new QLabel(groupBox);
        label_4->setObjectName(QString::fromUtf8("label_4"));

        verticalLayout->addWidget(label_4);

        label_5 = new QLabel(groupBox);
        label_5->setObjectName(QString::fromUtf8("label_5"));

        verticalLayout->addWidget(label_5);

        label_6 = new QLabel(groupBox);
        label_6->setObjectName(QString::fromUtf8("label_6"));

        verticalLayout->addWidget(label_6);

        label_7 = new QLabel(groupBox);
        label_7->setObjectName(QString::fromUtf8("label_7"));

        verticalLayout->addWidget(label_7);

        label_8 = new QLabel(groupBox);
        label_8->setObjectName(QString::fromUtf8("label_8"));

        verticalLayout->addWidget(label_8);

        label_9 = new QLabel(groupBox);
        label_9->setObjectName(QString::fromUtf8("label_9"));

        verticalLayout->addWidget(label_9);


        gridLayout->addLayout(verticalLayout, 0, 0, 1, 1);

        verticalLayout_2 = new QVBoxLayout();
        verticalLayout_2->setObjectName(QString::fromUtf8("verticalLayout_2"));
        yangpinghao_lb = new QLabel(groupBox);
        yangpinghao_lb->setObjectName(QString::fromUtf8("yangpinghao_lb"));

        verticalLayout_2->addWidget(yangpinghao_lb);

        No_lb = new QLabel(groupBox);
        No_lb->setObjectName(QString::fromUtf8("No_lb"));

        verticalLayout_2->addWidget(No_lb);

        tiaoma_lb = new QLabel(groupBox);
        tiaoma_lb->setObjectName(QString::fromUtf8("tiaoma_lb"));

        verticalLayout_2->addWidget(tiaoma_lb);

        xiangmu_lb = new QLabel(groupBox);
        xiangmu_lb->setObjectName(QString::fromUtf8("xiangmu_lb"));

        verticalLayout_2->addWidget(xiangmu_lb);

        xingming_lb = new QLabel(groupBox);
        xingming_lb->setObjectName(QString::fromUtf8("xingming_lb"));

        verticalLayout_2->addWidget(xingming_lb);

        xingbie_lb = new QLabel(groupBox);
        xingbie_lb->setObjectName(QString::fromUtf8("xingbie_lb"));

        verticalLayout_2->addWidget(xingbie_lb);

        nianlin_lb = new QLabel(groupBox);
        nianlin_lb->setObjectName(QString::fromUtf8("nianlin_lb"));

        verticalLayout_2->addWidget(nianlin_lb);

        leixing_lb = new QLabel(groupBox);
        leixing_lb->setObjectName(QString::fromUtf8("leixing_lb"));

        verticalLayout_2->addWidget(leixing_lb);


        gridLayout->addLayout(verticalLayout_2, 0, 1, 1, 1);

        gridLayout->setColumnStretch(0, 1);
        gridLayout->setColumnStretch(1, 2);
        widget_title = new QWidget(his_prj_view_frm);
        widget_title->setObjectName(QString::fromUtf8("widget_title"));
        widget_title->setGeometry(QRect(0, 0, 801, 40));
        QSizePolicy sizePolicy(QSizePolicy::Preferred, QSizePolicy::Fixed);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(widget_title->sizePolicy().hasHeightForWidth());
        widget_title->setSizePolicy(sizePolicy);
        widget_title->setMinimumSize(QSize(100, 28));
        QFont font4;
        font4.setPointSize(20);
        widget_title->setFont(font4);
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
        QFont font5;
        font5.setFamily(QString::fromUtf8("\345\276\256\350\275\257\351\233\205\351\273\221"));
        font5.setPointSize(10);
        font5.setBold(false);
        font5.setItalic(false);
        font5.setWeight(50);
        lab_Title->setFont(font5);
        lab_Title->setStyleSheet(QString::fromUtf8("font: 10pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));
        lab_Title->setAlignment(Qt::AlignLeading|Qt::AlignLeft|Qt::AlignVCenter);

        horizontalLayout_2->addWidget(lab_Title);


        retranslateUi(his_prj_view_frm);

        QMetaObject::connectSlotsByName(his_prj_view_frm);
    } // setupUi

    void retranslateUi(QWidget *his_prj_view_frm)
    {
        his_prj_view_frm->setWindowTitle(QApplication::translate("his_prj_view_frm", "Form", 0, QApplication::UnicodeUTF8));
        exit_bt->setText(QApplication::translate("his_prj_view_frm", "\350\277\224\n"
"\n"
"\n"
"\345\233\236", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem = tableWidget->verticalHeaderItem(0);
        ___qtablewidgetitem->setText(QApplication::translate("his_prj_view_frm", "\351\200\232\351\201\2231", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem1 = tableWidget->verticalHeaderItem(1);
        ___qtablewidgetitem1->setText(QApplication::translate("his_prj_view_frm", "\351\200\232\351\201\2232", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem2 = tableWidget->verticalHeaderItem(2);
        ___qtablewidgetitem2->setText(QApplication::translate("his_prj_view_frm", "\351\200\232\351\201\2233", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem3 = tableWidget->verticalHeaderItem(3);
        ___qtablewidgetitem3->setText(QApplication::translate("his_prj_view_frm", "\351\200\232\351\201\2234", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem4 = tableWidget->verticalHeaderItem(4);
        ___qtablewidgetitem4->setText(QApplication::translate("his_prj_view_frm", "\351\200\232\351\201\2235", 0, QApplication::UnicodeUTF8));
        QTableWidgetItem *___qtablewidgetitem5 = tableWidget->verticalHeaderItem(5);
        ___qtablewidgetitem5->setText(QApplication::translate("his_prj_view_frm", "\345\215\225\351\200\232\351\201\223", 0, QApplication::UnicodeUTF8));

        const bool __sortingEnabled = tableWidget->isSortingEnabled();
        tableWidget->setSortingEnabled(false);
        tableWidget->setSortingEnabled(__sortingEnabled);

        groupBox->setTitle(QApplication::translate("his_prj_view_frm", "\345\237\272\346\234\254\344\277\241\346\201\257", 0, QApplication::UnicodeUTF8));
        label_2->setText(QApplication::translate("his_prj_view_frm", "\346\240\267\346\234\254\345\217\267", 0, QApplication::UnicodeUTF8));
        label_3->setText(QApplication::translate("his_prj_view_frm", "No.", 0, QApplication::UnicodeUTF8));
        label_4->setText(QApplication::translate("his_prj_view_frm", "\346\235\241\347\240\201", 0, QApplication::UnicodeUTF8));
        label_5->setText(QApplication::translate("his_prj_view_frm", "\351\241\271\347\233\256", 0, QApplication::UnicodeUTF8));
        label_6->setText(QApplication::translate("his_prj_view_frm", "\345\247\223\345\220\215", 0, QApplication::UnicodeUTF8));
        label_7->setText(QApplication::translate("his_prj_view_frm", "\346\200\247\345\210\253", 0, QApplication::UnicodeUTF8));
        label_8->setText(QApplication::translate("his_prj_view_frm", "\345\271\264\351\276\204", 0, QApplication::UnicodeUTF8));
        label_9->setText(QApplication::translate("his_prj_view_frm", "\346\240\267\346\234\254\347\261\273\345\236\213", 0, QApplication::UnicodeUTF8));
        yangpinghao_lb->setText(QString());
        No_lb->setText(QString());
        tiaoma_lb->setText(QString());
        xiangmu_lb->setText(QString());
        xingming_lb->setText(QString());
        xingbie_lb->setText(QString());
        nianlin_lb->setText(QString());
        leixing_lb->setText(QString());
        lab_Ico->setText(QString());
        lab_Title->setText(QApplication::translate("his_prj_view_frm", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'\345\276\256\350\275\257\351\233\205\351\273\221'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<table border=\"0\" style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:20pt;\">\345\216\237\345\247\213\346\225\260\346\215\256\346\230\216\347\273\206</span></p></td></tr></table></body></html>", 0, QApplication::UnicodeUTF8));
    } // retranslateUi

};

namespace Ui {
    class his_prj_view_frm: public Ui_his_prj_view_frm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_HIS_PRJ_VIEW_FRM_H
