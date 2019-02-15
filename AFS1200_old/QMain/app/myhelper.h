/***************************************************************
 *Copyright(c) 2014-2015 Company By LH Unigress
 *All rights reserved.
 *文件名称：帮助及参数设置文件
 *简要描述：设置一些提示框、系统编码格式、皮肤、字符格式
 *
 *当前版本：V2.0
 *作者：Kelvin Li
 *创作日期：2014/10
 *说明：
*****************************************************************/
#ifndef MYHELPER_H
#define MYHELPER_H

#include <QTextCodec>
#include <QMessageBox>
#include <QInputDialog>
#include <QFile>
#include <QTranslator>
#include <QDateTime>
#include <QFileInfo>
#include <QObject>

#include "ID/uIDCardDef.h"

class myHelper : public QObject
{
    Q_OBJECT
public:
    static void SetGBK2312Code();//设置编码为GB2312
    static void SetUTF8Code();//设置编码为UTF8
    static void SetStyle(const QString &StyleName);//设置皮肤样式
    static void SetChinese();//加载中文字符
    static void Setnone() ;

    static void Sleep(int sec);//延时

    static void SetMessage(const QString &msg,int type);//设置消息框的参数，样式……

    static bool ShowMessageBoxInfo(QString info);//显示信息框
    static void ShowMessageBoxError(QString info);//显示错误框
    static int ShowMessageBoxQuesion(QString info);//显示询问框
    static QString ShowInputBox(QWidget *frm,QString info);//显示标准输入框
    static int ShowMessageBoxPayInfo(QString info);//显示付款信息框
    static bool SetBox(QLabel* lab, QString str) ;
    static void ReadConfig(QStringList *info) ;
    static void WriteConfig(QStringList info, QString group) ;
    static void ReadIDfile(QStringList *info) ;
    static void ReadIDProject(QList<PROJECT_ITEM> *info) ;
    static void WriteIDProject(QList<PROJECT_ITEM> *info) ;
    static void export_asv(QString headr, QString filename, QStringList texts);
    static void export_primary(QString filename, QStringList texts) ;
    static void format_num(bool same_falg, int format_lenth, int source, QString *format_n) ;
    static void  delete_record(int days, QDateTime currentday) ;
    static void Write_Classifyfile(QString filepath, QString title, QString code, QString value) ;
    static void Read_Classifyfile(QString filepath, QString title, QString code, QString *value) ;
    static void ReadAll_Classifyfile(QString filepath, QString title, QString code, QStringList *value) ;
    static void Read_Ratio(QList<RATIO_ITEM> *info) ;
    static void Write_Ratio(QList<RATIO_ITEM> *info) ;
    static void CheckConfig(QString filename) ;
    static void create_config_file(QString filename, bool exist) ;
    static void write_config_sig(QString filename, QString group, QString sub, QString text) ;
    static void read_config_sig(QString filename, QString group, QString sub, QString *text) ;

    static bool FileIsExist(QString strFile);
    static bool CopyFile(QString sourceFile,QString targetFile);//复制文件
   static  bool check_idfile() ;
   static int get_ratio(QString pname, QList <RATIO_ITEM> pro_ratio_list) ;
   static bool sort_date(QStringList *sorted_date, QList<QFileInfo> *fileInfo) ;
   static int decode_date(QString sort_tmp, QList<QFileInfo> *fileInfo) ;
   static void read_record(QString low, QString up, QList<QFileInfo> *fileInfo, QStringList *prj_list, QString fliter) ;
   static void read_Debug(QString low, QString up, QList<QFileInfo> *fileInfo) ;
   static bool mystring2hex(QString sc, unsigned char *det) ;
   static void Merge(QList<QFileInfo> *r,QList<QFileInfo> *rf, int i, int m, int n) ;
   static void MergeSort(QList<QFileInfo> *r, QList<QFileInfo> *rf, int lenght) ;
   static void MergeSort_2(QList<QFileInfo> *k,int n) ;

   static void read_system_config(SYSTEM_CONFIG *cfg) ;
   static int write_lost_found(QString file_n, char prj[32], int time, char code[24], QList<LOST_FOUND> *det, uchar act, int whereis) ;
   static int read_lost_found(QString file_c, QString file_n,QList<LOST_FOUND> *det) ;
public:
    explicit myHelper(QObject *parent = 0);
    
signals:
    
public slots:
    
};

#endif // MYHELPER_H
