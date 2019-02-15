#include "frmmessagebox.h"
#include "ui_frmmessagebox.h"
#include "iconhelper.h"
#include "myhelper.h"

frmMessageBox::frmMessageBox(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::frmMessageBox)
{
    ui->setupUi(this);

    this->mousePressed = false;
    //���ô������������
    this->setWindowFlags(Qt::FramelessWindowHint);
    //���ô���ر�ʱ�Զ��ͷ��ڴ�
    this->setAttribute(Qt::WA_DeleteOnClose);
    //����ͼ������
    IconHelper::Instance()->SetIcon(ui->lab_Ico, QChar(0xf015), 12);
    //IconHelper::Instance()->SetIcon(ui->btnMenu_Close, QChar(0xf00d), 10);
    //�����رհ�ť
    //connect(ui->btnMenu_Close, SIGNAL(clicked()), this, SLOT(close()));
    connect(ui->btnCancel, SIGNAL(clicked()), this, SLOT(close()));
    //���������ʾ

    //this->setCursor(Qt::BlankCursor);   //�������
       //this->setCursor(Qt::ArrowCursor);  //��ʾ�������
       //this��Ϊ��Ҫ�������Ĳ������Ϳ��������ƶ����ò���ʱ��Ч����Ч��
    QFont ft ;
     ft.setPointSize(20);
    ui->btnCancel->setFont(ft) ;
    ui->btnOk->setFont(ft) ;

}

frmMessageBox::~frmMessageBox()
{
    delete ui;
}

void frmMessageBox::SetMessage(const QString &msg, int type)
{

    this->setCursor(Qt::BlankCursor);   //�������
       //this->setCursor(Qt::ArrowCursor);  //��ʾ�������
       //this��Ϊ��Ҫ�������Ĳ������Ϳ��������ƶ����ò���ʱ��Ч����Ч��

    //��ʾ��Ϣ��
    if (type == 0)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/info.png);");
        ui->btnCancel->setVisible(false);   //ȡ����ť���ɼ�
        ui->lab_Title->setText(tr("��ʾ"));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    //ѯ����Ϣ��
    else if (type == 1)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/question.png);");
        ui->lab_Title->setText(tr("ѯ��"));
        ui->lab_Title->setStyleSheet("font-size:24px");
    }
    //������Ϣ��
    else if (type == 2)
    {
        ui->labIcoMain->setStyleSheet("border-image: url(:/image/error.png);");
        ui->btnCancel->setVisible(false);
        ui->lab_Title->setText(tr("����"));
        ui->lab_Title->setStyleSheet("font-size:24px");


    }

    ui->labInfo->setText(msg);
    ui->labInfo->setStyleSheet("font-size:24px");
}

void frmMessageBox::on_btnOk_clicked()
{
    done(1);

    this->close();
}
/*

void frmMessageBox::mousePressEvent(QMouseEvent *e)
{
    if (e->button() == Qt::LeftButton) {
        mousePressed = true;
        mousePoint = e->globalPos() - this->pos();
        e->accept();
    }
}

void frmMessageBox::mouseMoveEvent(QMouseEvent *e)
{
    if (mousePressed && (e->buttons() && Qt::LeftButton)) {
        this->move(e->globalPos() - mousePoint);
        e->accept();
    }
}

void frmMessageBox::mouseReleaseEvent(QMouseEvent *)
{
    mousePressed = false;
}*/
