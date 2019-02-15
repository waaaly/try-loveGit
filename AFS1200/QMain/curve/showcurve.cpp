#include "showcurve.h"
#include "ui_showcurve.h"
#include "curve/qcustomplot.h"

Showcurve::Showcurve(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Showcurve)
{
    this->setWindowFlags(Qt::FramelessWindowHint );                              //不要菜单栏和标题框
    ui->setupUi(this);
    //ui->curve
   ui->curve->xAxis->setLabel("x");
   ui->curve->yAxis->setLabel("y");
   //
   //ui->curve->yAxis->setRange(1000, 260000);
   //
   ui->curve->addGraph() ;
}

Showcurve::~Showcurve()
{
    delete ui;
}

void Showcurve::on_shutdownButton_clicked()
{
    emit beep() ;
    this->hide() ;
}

void Showcurve::show_slot(int isEn)
{
    if(isEn)
    {
        ui->shutdownButton->setText(tr("Close"));
    }
    else
    {
        ui->shutdownButton->setText(tr("关闭"));
    }
     ui->curve->xAxis->setRange(0, win_length + 10);
    //显示曲线
    QVector<double> x(win_length), y(win_length) ;
    int max_value = y_datas[0];
    for(int v=0; v<win_length; v++)
    {
        x[v] = v+1 ;
        y[v] = y_datas[v] ;

        if(max_value < y_datas[v])
            max_value = y_datas[v] ;
    }

    max_value = max_value + max_value/10 ;
    ui->curve->yAxis->setRange(0, max_value);
    ui->curve->graph(0)->setData(x, y);
    ui->curve->clearItems() ;

    for(int v=0; v<peak_number; v++)
    {
       QCPItemLine *arrow = new QCPItemLine(ui->curve);
       ui->curve->addItem(arrow) ;
       arrow->start->setCoords ( position[v], max_value); ;
       arrow->end->setCoords( position[v], y_datas[ position[v] ]); ;
       arrow->setHead(QCPLineEnding::esSpikeArrow);
    }

    ui->curve->replot();
    qDebug() <<__LINE__ <<__FUNCTION__<< "g signal" ;
    this->show() ;

}
