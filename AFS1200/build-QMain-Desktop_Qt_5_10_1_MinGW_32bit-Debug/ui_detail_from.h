/********************************************************************************
** Form generated from reading UI file 'detail_from.ui'
**
** Created by: Qt User Interface Compiler version 5.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_DETAIL_FROM_H
#define UI_DETAIL_FROM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Detail_from
{
public:
    QLineEdit *lineEdit_age_numkeyboard;
    QPushButton *cancelButton;
    QLabel *label;
    QPushButton *enterButton;
    QLineEdit *lineEdit_pname;
    QLabel *label_2;
    QComboBox *comboBox_sex;
    QLabel *label_3;
    QWidget *widget_title;
    QHBoxLayout *horizontalLayout_2;
    QLabel *lab_Ico;
    QLabel *lab_Title;
    QWidget *widget_menu;
    QHBoxLayout *horizontalLayout_3;
    QComboBox *comboBox_age_unit;

    void setupUi(QWidget *Detail_from)
    {
        if (Detail_from->objectName().isEmpty())
            Detail_from->setObjectName(QStringLiteral("Detail_from"));
        Detail_from->setWindowModality(Qt::NonModal);
        Detail_from->resize(800, 480);
        QIcon icon;
        icon.addFile(QStringLiteral(":/image/info.png"), QSize(), QIcon::Normal, QIcon::Off);
        Detail_from->setWindowIcon(icon);
        lineEdit_age_numkeyboard = new QLineEdit(Detail_from);
        lineEdit_age_numkeyboard->setObjectName(QStringLiteral("lineEdit_age_numkeyboard"));
        lineEdit_age_numkeyboard->setGeometry(QRect(270, 156, 151, 36));
        lineEdit_age_numkeyboard->setFocusPolicy(Qt::ClickFocus);
        cancelButton = new QPushButton(Detail_from);
        cancelButton->setObjectName(QStringLiteral("cancelButton"));
        cancelButton->setGeometry(QRect(240, 280, 120, 60));
        QFont font;
        font.setPointSize(12);
        cancelButton->setFont(font);
        label = new QLabel(Detail_from);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(183, 101, 81, 37));
        QFont font1;
        font1.setPointSize(24);
        label->setFont(font1);
        label->setLayoutDirection(Qt::RightToLeft);
        enterButton = new QPushButton(Detail_from);
        enterButton->setObjectName(QStringLiteral("enterButton"));
        enterButton->setGeometry(QRect(400, 280, 120, 60));
        enterButton->setFont(font);
        lineEdit_pname = new QLineEdit(Detail_from);
        lineEdit_pname->setObjectName(QStringLiteral("lineEdit_pname"));
        lineEdit_pname->setGeometry(QRect(270, 106, 261, 36));
        lineEdit_pname->setFocusPolicy(Qt::ClickFocus);
        label_2 = new QLabel(Detail_from);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(183, 151, 81, 37));
        label_2->setFont(font1);
        label_2->setLayoutDirection(Qt::RightToLeft);
        comboBox_sex = new QComboBox(Detail_from);
        comboBox_sex->addItem(QString());
        comboBox_sex->addItem(QString());
        comboBox_sex->addItem(QString());
        comboBox_sex->setObjectName(QStringLiteral("comboBox_sex"));
        comboBox_sex->setGeometry(QRect(270, 210, 261, 36));
        label_3 = new QLabel(Detail_from);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setGeometry(QRect(150, 210, 111, 31));
        label_3->setFont(font1);
        label_3->setLayoutDirection(Qt::RightToLeft);
        widget_title = new QWidget(Detail_from);
        widget_title->setObjectName(QStringLiteral("widget_title"));
        widget_title->setGeometry(QRect(0, 0, 801, 40));
        QSizePolicy sizePolicy(QSizePolicy::Preferred, QSizePolicy::Fixed);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(widget_title->sizePolicy().hasHeightForWidth());
        widget_title->setSizePolicy(sizePolicy);
        widget_title->setMinimumSize(QSize(100, 28));
        QFont font2;
        font2.setPointSize(20);
        widget_title->setFont(font2);
        horizontalLayout_2 = new QHBoxLayout(widget_title);
        horizontalLayout_2->setSpacing(0);
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
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
        QFont font3;
        font3.setFamily(QString::fromUtf8("\345\276\256\350\275\257\351\233\205\351\273\221"));
        font3.setPointSize(10);
        font3.setBold(false);
        font3.setItalic(false);
        font3.setWeight(50);
        lab_Title->setFont(font3);
        lab_Title->setStyleSheet(QString::fromUtf8("font: 10pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));
        lab_Title->setAlignment(Qt::AlignLeading|Qt::AlignLeft|Qt::AlignVCenter);

        horizontalLayout_2->addWidget(lab_Title);

        widget_menu = new QWidget(widget_title);
        widget_menu->setObjectName(QStringLiteral("widget_menu"));
        sizePolicy1.setHeightForWidth(widget_menu->sizePolicy().hasHeightForWidth());
        widget_menu->setSizePolicy(sizePolicy1);
        horizontalLayout_3 = new QHBoxLayout(widget_menu);
        horizontalLayout_3->setSpacing(0);
        horizontalLayout_3->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));

        horizontalLayout_2->addWidget(widget_menu);

        comboBox_age_unit = new QComboBox(Detail_from);
        comboBox_age_unit->setObjectName(QStringLiteral("comboBox_age_unit"));
        comboBox_age_unit->setGeometry(QRect(430, 156, 100, 36));

        retranslateUi(Detail_from);

        QMetaObject::connectSlotsByName(Detail_from);
    } // setupUi

    void retranslateUi(QWidget *Detail_from)
    {
        Detail_from->setWindowTitle(QString());
        lineEdit_age_numkeyboard->setText(QString());
        cancelButton->setText(QApplication::translate("Detail_from", "\345\217\226\346\266\210", nullptr));
        label->setText(QApplication::translate("Detail_from", "\345\247\223\345\220\215", nullptr));
        enterButton->setText(QApplication::translate("Detail_from", "\347\241\256\345\256\232", nullptr));
        lineEdit_pname->setText(QString());
        label_2->setText(QApplication::translate("Detail_from", "\345\271\264\351\276\204", nullptr));
        comboBox_sex->setItemText(0, QString());
        comboBox_sex->setItemText(1, QApplication::translate("Detail_from", "\347\224\267", nullptr));
        comboBox_sex->setItemText(2, QApplication::translate("Detail_from", "\345\245\263", nullptr));

        label_3->setText(QApplication::translate("Detail_from", "\346\200\247\345\210\253", nullptr));
        lab_Ico->setText(QString());
        lab_Title->setText(QApplication::translate("Detail_from", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'\345\276\256\350\275\257\351\233\205\351\273\221'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<table border=\"0\" style=\"-qt-table-type: root; margin-top:4px; margin-bottom:4px; margin-left:4px; margin-right:4px;\">\n"
"<tr>\n"
"<td style=\"border: none;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:20pt;\">\351\253\230\347\272\247\344\277\241\346\201\257</span></p></td></tr></table></body></html>", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Detail_from: public Ui_Detail_from {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_DETAIL_FROM_H
