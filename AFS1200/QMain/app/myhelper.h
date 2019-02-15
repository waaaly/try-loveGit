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

#define LOG_COUNT_MAX 800

namespace myHelper
{

    void SetGBK2312Code();//设置编码为GB2312

    void SetStyle(const QString &StyleName);//设置皮肤样式
    void Sleep(int sec);//延时

    void SetMessage(const QString &msg,int type);//设置消息框的参数，样式……

    bool ShowMessageBoxInfo(QString info);//显示信息框
    void ShowMessageBoxError(QString info);//显示错误框
    int ShowMessageBoxQuesion(QString info);//显示询问框
    QString ShowInputBox(QWidget *frm,QString info);//显示标准输入框

    void ReadConfig(QStringList *info) ;
    void WriteConfig(QStringList info, QString group) ;

    void ReadIDProject(QList<PROJECT_ITEM> *info) ;
    void WriteIDProject(QList<PROJECT_ITEM> *info) ;
    void export_asv(QString headr, QString filename, QStringList texts);
    void export_primary(QString filename, QStringList texts) ;
    void format_num(bool same_falg, int format_lenth, int source, QString *format_n) ;
    void delete_record(int days, QDateTime currentday) ;
    void Write_Classifyfile(QString filepath, QString title, QString code, QString value) ;
    void Read_Classifyfile(QString filepath, QString title, QString code, QString *value) ;
    void ReadAll_Classifyfile(QString filepath, QString title, QString code, QStringList *value) ;
    void Read_Ratio(QList<RATIO_ITEM> *info) ;
    void Write_Ratio(QList<RATIO_ITEM> *info) ;
    void CheckConfig(QString filename) ;
    void create_config_file(QString filename, bool exist) ;
    void write_config_sig(QString filename, QString group, QString sub, QString text) ;
    void read_config_sig(const QString &filename, const QString &group, const QString &sub, QString *text) ;
    QString read_config_sig(const QString &filename, const QString &group, const QString &sub) ;

    bool FileIsExist(QString strFile);

   int get_ratio(QString pname, QList <RATIO_ITEM> pro_ratio_list) ;
   bool sort_date(QStringList *sorted_date, QList<QFileInfo> *fileInfo) ;
   int decode_date(QString sort_tmp, QList<QFileInfo> *fileInfo) ;
   void read_record(QString low, QString up, QList<QFileInfo> *fileInfo, QStringList *prj_list, QString fliter) ;
   void read_Debug(QString low, QString up, QList<QFileInfo> *fileInfo) ;
   bool mystring2hex(QString sc, unsigned char *det) ;
   void Merge(QList<QFileInfo> *r,QList<QFileInfo> *rf, int i, int m, int n) ;
   void MergeSort(QList<QFileInfo> *r, QList<QFileInfo> *rf, int lenght) ;
   void MergeSort_2(QList<QFileInfo> *k,int n) ;

   void read_system_config(SYSTEM_CONFIG *cfg) ;

   void Read_multi_card_par( QString filepath, QList <MUTI_CARD> *multi_card_list, QStringList info) ;
   void Write_multi_card_par( QString filepath, QList <MUTI_CARD> multi_card_list) ;

   void write_system_record(QString path, QString info_text, QDateTime info_time) ;

   void code_to_diary(QString code, QString &diary, int language = 0) ;
   void code_to_waring(QString code, QString &diary, int language = 0) ;//中英标志位，默认为中文
   void code_to_error(QString code, QString &diary, int language = 0) ;

   // 小延时
   void msDelay(int ms);

   // 20170104
   const QString& GetBuildTime();

}

#endif // MYHELPER_H
