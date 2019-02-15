#ifndef PERSONALINFO_H
#define PERSONALINFO_H

#include <QString>
#include "ID/uIDCardDef.h"
#include "app/myhelper.h"
#include "detail_from.h"
#include <QDebug>

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include "../detail_from.h"

#define CONFIG_INI "config.ini"
#define SYS_INI "sys_config.ini"
#define LOCAL_FILE_SIZE int (sizeof (SAVE_ITEM))

struct Result{
    QString pName ;
    QString result ;
    QString unit ;
} ;

class Results
{
private:


public:
    QList<Result> results ;
    void add(QString pName, QString result, QString unit){
        Result tmp ;
        tmp.pName = pName ;
        tmp.result = result ;
        tmp.unit = unit.remove(" ") ;
        results.append(tmp);
    }
    void clear(){
        results.clear() ;
    }
    int count() const {
        return results.count() ;
    }
};

class GeneralInfo{
public:
    QString companyName ;   // 机构名称
    QString reportName ;
    QString Title ;         // 报告名称
    QString serialNo ;      //
    QString sampleNo ;      //
    QString sampleType ;
    QString name ;
    QString sex ;
    QString age ;
    QString testTime ;

    Results results ;

    QString declare ;
    QString printTime ;

    static int read_localfile(QString fpath, SAVE_ITEM* load_item , int *fd)
    {
        int t_fd ;


        t_fd = open( fpath.toLocal8Bit().constData(), O_RDONLY);

        if(t_fd < 0)
        {
            printf("open data failed.\n") ;

            return -1 ;
            /**/
        }
        else
        {

             char buffer[LOCAL_FILE_SIZE] ;

             bzero(buffer, LOCAL_FILE_SIZE) ;

            //读取数据
            if( read(t_fd, buffer, LOCAL_FILE_SIZE) < 0)
            {
                ::close(t_fd) ;
                 return -1 ;
            }

            *fd = t_fd ;

             memcpy(load_item, buffer, LOCAL_FILE_SIZE) ;

        }
        // remember close fd after call

        return 0 ;
    }
    static int read_localfile_sub(int fd, SUB_SAVE_ITEM *sub_item)
    {

             int nread ;
             unsigned char buffer[sizeof(SUB_SAVE_ITEM)] ;

             nread = read(fd, buffer, sizeof(SUB_SAVE_ITEM)) ;
             if(nread == sizeof(SUB_SAVE_ITEM))
             {
                memcpy(sub_item, buffer, sizeof(SUB_SAVE_ITEM)) ;
                return 0 ;
            }
             else
             {
                  return -1 ;
             }
             return 0 ;
    }
    /* 2018/09/06 添加第二个参数默认为零*/
 int parseData(const QString &filePath, QString company )
{
        //bzero(buffer, sizeof(buffer)) ;

        SAVE_ITEM load_print_item ;
        int fd = -1 ;

        read_localfile(filePath.toLocal8Bit().constData(), &load_print_item, &fd) ;
        if( fd < 0)
        {
            printf("open data failed:%s\n",filePath.toLocal8Bit().constData() );
            return -1 ;
        }
        SUB_SAVE_ITEM tmp_list[load_print_item.sub_count] ;

        /*判断数据错误*/
        if(load_print_item.sub_count == 0 )
        {
            return -1 ;
        }
        for(int q=0; q<load_print_item.sub_count; q++)
        {
            if( read_localfile_sub(fd, &tmp_list[q]) < 0)
            {
                close(fd);
                return -1 ;
            }
        }
        close(fd);

        int isEnglish = myHelper::read_config_sig(CONFIG_INI,
                                                           "Set_lis",
                                                           "language").toInt() ;

        declare     = myHelper::read_config_sig(CONFIG_INI, "Set_lis", "print_declar") ;
                        //language==0? QObject::tr("本结果只对本份标本负责!\r\n") :  "Only for this result!" ;
        companyName = company  ;

        //报告名称 流水号 4、样本号 5、样本类型  6、姓名 7、性别  8、年龄 9、检测时间
        Title       = QString::fromLocal8Bit(load_print_item.Prj_name) ;


        sampleNo = QString::fromLocal8Bit(load_print_item.c_Nums).mid(0, 22) ;

        sampleType  = QString::fromLocal8Bit(load_print_item.Type) ;
        if(company == "uploand" && isEnglish)
        {
            if(sampleType.toLocal8Bit() == "血清/血浆")
                sampleType = (QString::fromLocal8Bit("Serum/Plasma") )  ;
            else if(sampleType.toLocal8Bit() == "全血")
                sampleType =(QString::fromLocal8Bit("Whole Blood") )  ;
            else if(sampleType.toLocal8Bit() == "末梢血")
                sampleType =(QString::fromLocal8Bit("Peripheral Blood") )  ;
            else if(sampleType.toLocal8Bit() == "尿液")
                sampleType =(QString::fromLocal8Bit("Urine") )  ;
            else if(sampleType.toLocal8Bit() == "质控")
                sampleType =(QString::fromLocal8Bit("QC") )  ;
            else{ qDebug() <<__LINE__ <<__FUNCTION__<< "is not ok!\n";}
        }

        name        = QString::fromLocal8Bit(load_print_item.p_name) ;

        sex         = QString::fromLocal8Bit(load_print_item.sex) ;
        if(company == "uploand" && isEnglish)
        {
              if(sex.toLocal8Bit() == "男")
                        sex = (QString::fromLocal8Bit("Male") )  ;
                else if(sex.toLocal8Bit() == "女")
                    sex = (QString::fromLocal8Bit("Female") )  ;
        }
        qDebug() <<__LINE__ <<__FUNCTION__<<sampleType;
        qDebug() <<__LINE__ <<__FUNCTION__<<sex;

        if (load_print_item.age_valuse[0])
        {
            age     = QString(load_print_item.age_valuse) +
                    " " +
                    GET_AGEUNIT(age_unit_list[int(load_print_item.age_index)][isEnglish]);
        }
        else
        {
            age.clear();
        }
        serialNo    = QString(load_print_item.serial_code);
        if(isEnglish)
        {
                printTime = QDateTime::currentDateTime().toString("MM-dd-yyyy hh:mm:ss") ;
        }
        else
        {
                printTime = QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss") ;
        }

        //OutName,sResult,Unit,ReportName
        //if(load_print_item.sub_count > 1)                // 单项目要把具体的项目名打出来
        //    Title = "title" ;
        //else
            reportName = Title ;

        this->results.clear() ;
        unsigned int minTime = ~0;
        for(int i=0; i<load_print_item.sub_count; i++){

            this->results.add(QString::fromLocal8Bit(tmp_list[i].Name),
                              QString::fromLocal8Bit(tmp_list[i].c_value),
                              QString::fromLocal8Bit(tmp_list[i].Unit) );

            if (minTime > tmp_list[i].time)
            {
                minTime = tmp_list[i].time;
            }
        }

        if (minTime != (unsigned int)~0)
        {
            if(isEnglish)
            {
                testTime  = QDateTime::fromTime_t(minTime).toString("MM-dd-yyyy hh:mm:ss");
            }
            else
            {
                testTime  = QDateTime::fromTime_t(minTime).toString("yyyy-MM-dd hh:mm:ss");
            }
        }
        else
        {
            testTime    = QString::fromAscii(load_print_item.Time) ;
        }

        return 0 ;

    }

};


#endif // PERSONALINFO_H

