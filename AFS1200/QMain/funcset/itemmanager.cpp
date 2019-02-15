#include "itemmanager.h"
#include <QStringList>
#include "uCmbCalc.h"
#include <QDebug>
#include "funcset.h"
#include <QApplication>
#include <QFile>
#include <QDir>
#include <QSettings>
#include "debug.h"
#include "../app/myhelper.h"

ItemManager::ItemManager(QObject *parent)
    : QObject(parent)
{
    if (!QDir(ITEMSAVEDIR).exists())
    {
        QDir().mkdir(ITEMSAVEDIR);
    }

    QSettings ini("config.ini");
    ini.beginGroup("AFS1200");
    QStringList curItem = ini.value("curItem", QString("")).toString().split("_");
    ini.endGroup();
    if (curItem.size() == 2)
    {
        foreach (ID_info info, getItemList(curItem.at(1).toInt(), curItem.at(0)))
        {
            cur_info = info;
            break;
        }
    }
}

QString ItemManager::getArrow(const QString &pName, const QString &value)
{
    QList <PROJECT_ITEM> _idpro_unique_list ;
    myHelper::ReadIDProject(&_idpro_unique_list)  ;
    int tab_num = _idpro_unique_list.count() ;
    int i ;
    QString up_range = "" ;
    QString low_range = "" ;

    for( i=0; i<tab_num; i++)
    {
        QString tx = _idpro_unique_list.at(i).prj_name ;
        if(tx.remove(" ") == pName)
            break ;
    }
    if(i<tab_num)
    {

        if(_idpro_unique_list.at(i).up >= 0 )
            up_range = _idpro_unique_list.at(i).str_up ;

        if(_idpro_unique_list.at(i).low >= 0 )
            low_range = _idpro_unique_list.at(i).str_low ;
    }

    QString result = value ;
    if(result.contains("<") || result.contains(">"))
        return "" ;
    else
    {
        double fResult = result.toDouble() ;
        if(!low_range.isEmpty())
        {
            bool ok ;
            double fRange = low_range.toDouble(&ok) ;
            if(ok)
            {
                if(fResult < fRange)
                    return  tr("↓") ;
            }
        }
        if(!up_range.isEmpty())
        {
            bool ok ;
            double fRange = up_range.toDouble(&ok) ;
            if(ok)
            {
                if(fResult > fRange)
                    return tr("↑") ;
            }
        }

    }
    return "" ;
}

QString ItemManager::getRefer(const QString &pName)
{
    QList <PROJECT_ITEM> _idpro_unique_list ;
    myHelper::ReadIDProject(&_idpro_unique_list)  ;
    int tab_num = _idpro_unique_list.count() ;
    int i ;

    int isEN = myHelper::read_config_sig("config.ini",
                                                 "Set_lis",
                                                 "language").toInt() ;
    for( i=0; i<tab_num; i++)
    {
        QString tx = _idpro_unique_list.at(i).prj_name ;
        if(tx.remove(" ") == pName)
            break ;
    }
    if(i<tab_num)
    {
        QString up_range = "" ;
        QString low_range = "" ;
        if(_idpro_unique_list.at(i).up >= 0 )
            up_range = _idpro_unique_list.at(i).str_up ;

        if(_idpro_unique_list.at(i).low >= 0 )
            low_range = _idpro_unique_list.at(i).str_low ;

        if(!up_range.isEmpty() || !low_range.isEmpty())
        {

            QString sub_line ;
            QString tmp ;
            sub_line.fill(' ',24) ;

            if(!up_range.isEmpty() && !low_range.isEmpty())
                tmp = (isEN?"   (Reference range:":tr("         (参考范围:")) + low_range  + tr( " - ") + up_range + ")";
            else if(!low_range.isEmpty())
                tmp = (isEN?"   (Reference range:":tr("         (参考范围: > ")) + low_range  + ")";
            else if(!up_range.isEmpty())
                tmp = (isEN?"   (Reference range:":tr("         (参考范围: < "))  + up_range + ")";

            sub_line =  sub_line.replace(0, tmp.length(), tmp) + "\r\n" ;
            // 20170328
            return sub_line ;
        }
    }
    return "" ;
}





// 生成计数公式
ItemManager::CalcModel ItemManager::buildModel(const POCT_SUBITEM &poctitem, const QString &format)
{
    CalcModel model;                      // 返回值在这里面

    model.P1 = QString(format).arg(poctitem.CalcPosi[0] + 1);
    model.P2 = QString(format).arg(poctitem.CalcPosi[1] + 1);
    model.P3 = QString(format).arg(poctitem.CalcPosi[2] + 1);

    QString strModel;
    switch(poctitem.CalcMode)
    {
    case 0:
        strModel = "[P1]/[P2]";
        break ;
    case 1:
        strModel = "[P1]";
        break ;
    case 2:
        strModel = "[P1]+[P2]";
        break ;
    case 3:
        strModel = "[P1]+[P2]+[P3]";
        break ;
    case 4:
        strModel = "([P1]+[P2])/[P3]";
        break ;
    case 5:
        strModel = "[P1]/([P1]+[P2]+[P3])";
        break ;
    case 6:
        strModel = "[P1]/([P1]+[P2])";
        break ;
    case 7:
        strModel = "[P1]/([P2]+[P3])";
        break ;
    case 8:
        strModel = "([P1]+B)/([P2]+B)";
        break ;
    }
    strModel.replace("[P1]", model.P1);
    strModel.replace("[P2]", model.P2);
    strModel.replace("[P3]", model.P3);
    model.Model = strModel;

    return model;
}

/*
取项目的简单信息
*/
ItemManager::ID_info ItemManager::getIdInfo(const ID_ITEM *idc)
{
    ItemManager::ID_info retval;

    if (!memcmp(idc->FileHead, "LABSIMID", 8))
    {
        retval.bcode = FuncSet::Hex2s(HEX2SARGS(idc->BarCode));
        retval.title = FuncSet::Hex2s(HEX2SARGS(idc->ReportTitle));
        retval.batch = FuncSet::Hex2s(HEX2SARGS(idc->Batch));

        if (idc->Items[0].siChannel == 0)
        {
            // 非多联卡
            retval.type = 0;
        }
        else
        {
            // 多联卡
            retval.type = idc->ItemCount > 5? 0: idc->ItemCount;
        }
    }
    else
    {
        retval.type = 0;
    }

    return retval;
}
ItemManager::ID_info ItemManager::getIdInfo(const POCT_ITEM *idc)
{
    ItemManager::ID_info retval;

    if (!idc->BarCode.isEmpty())
    {
        retval.bcode = idc->BarCode;
        retval.title = idc->ReportTitle;
        retval.batch = idc->Batch;

        if (idc->SIs[0].siChannel == 0)
        {
            // 非多联卡
            retval.type = 0;
        }
        else
        {
            // 多联卡
            retval.type = idc->ItemCount > 5? 0: idc->ItemCount;
        }
    }
    else
    {
        retval.type = 0;
    }

    return retval;
}

bool ItemManager::saveIdHex(const ID_ITEM *idc)
{
    bool retval = false;
    ID_info info = ItemManager::getIdInfo(idc);
    QFile idf(QString(ITEMSAVEDIR"/%1_%2.HEX").arg(info.bcode).arg(info.type));
    if (idf.open(QIODevice::WriteOnly))
    {
        idf.write((const char*)idc, sizeof (*idc));
        idf.close();
        retval = true;
        emit itemListUpdate();
    }
    return retval;
}

void ItemManager::deleteIdHex(const ItemManager::ID_info &info)
{
    QFile idf(QString(ITEMSAVEDIR"/%1_%2.HEX").arg(info.bcode).arg(info.type));
    if (idf.exists())
    {
        idf.remove();
        emit itemListUpdate();
    }
}

QList<ItemManager::ID_info> ItemManager::getItemList(qint32 type, const QString &bcode)
{
    QList<ItemManager::ID_info> retval;

    QFile idf;
    QString filter("%1_%2.HEX");
    filter = filter.arg(bcode.isEmpty()? "*": bcode).arg(type == -1? "*": QString::number(type));
    foreach (QString name, QDir(ITEMSAVEDIR).entryList(QStringList()<<filter))
    {
        idf.setFileName(QString(ITEMSAVEDIR"/%1").arg(name));
        idf.open(QIODevice::ReadOnly);
        retval << getIdInfo((const ID_ITEM*)idf.read(sizeof (ID_ITEM)).constData());
        idf.close();
    }
    return retval;
}

bool ItemManager::loadItem(const ItemManager::ID_info &info, POCT_ITEM *item)
{
    bool retval = false;
    QFile idf(QString(ITEMSAVEDIR"/%1_%2.HEX").arg(info.bcode).arg(info.type));

    if (idf.exists() && idf.open(QIODevice::ReadOnly))
    {

        if (idf.size() >= sizeof (ID_ITEM))
        {

            ID_ITEM *idi = new ID_ITEM;
            idf.read((char*)idi, sizeof (ID_ITEM));

            ID_info cur_info = getIdInfo(idi);
            if (cur_info.type == info.type && cur_info.bcode == info.bcode)
            {

                if (!item || ID2POCT(*idi, *item))
                {

                    retval = true;
                }

            }

            delete idi;
        }

        idf.close();
    }

    return retval;
}

bool ItemManager::ID2POCT(const ID_ITEM &id, POCT_ITEM &item)
{
    if (
            id.ItemCount > 5
            ||
            id.ItemCount < 1
            ||
            id.CurveCnt > 10
    ) {
        return false;
    }


    // 公司代码
    item.CompanyCode = id.CompanyCode;
    // 公司名称
    item.CompanyName = FuncSet::Hex2s(HEX2SARGS(id.CompanyName));
    // 条码
    item.BarCode     = FuncSet::Hex2s(HEX2SARGS(id.BarCode)).toUpper();
    // 批号前缀
    item.BatchPre    = FuncSet::Hex2s(HEX2SARGS(id.BatchPre));
    // 批号
    item.Batch       = FuncSet::Hex2s(HEX2SARGS(id.Batch));
    item.ReportTitle = FuncSet::Hex2s(HEX2SARGS(id.ReportTitle)) ;
    // 区域启用
    item.AreaValid   = id.AreaValid;
    // 区域名称
    item.Area        = FuncSet::Hex2s((id.Area));

    // 设备类型
    item.DeviceType  = id.DeviceType;
    // 产品代码
    item.ProductCode = id.ProductCode;
    // 年
    item.Year        = id.Year;
    // 月
    item.Month       = id.Month;
    // 流水号
    item.SerialNo    = id.SerialNo;
    // 有效月数
    item.ValidMonth  = id.ValidMonth;
    // 是否减本底
    item.Blank       = id.Blank;
    item.Reversal    = id.Reversal ;
    item.ReversalBase= id.ReversalBase ;

    // 是否判断未加样
    item.MinCheck   = id.MinCheck;
    item.MinValue   = id.MinValue;
    item.MinPosi    = id.MinPosi;

    // 是否判断冲顶
    item.MaxCheck   = id.MaxCheck;
    item.MaxPosi    = id.MaxPosi;
    item.MaxValue   = id.MaxValue;

    item.PeakCount     = id.PeakCount % 16;
    item.BasePeak      = id.PeakCount / 16;
    memcpy(item.Peaks, id.Peaks, sizeof (id.Peaks));

    // 项目数量
    item.ItemCount  = id.ItemCount;
    // 项目参数
    for(int k = 0; k < id.ItemCount; k++)
    {
        const ID_SUBITEM   *si = &id.Items[k];           // 子项目结构体
        POCT_SUBITEM *psi = &item.SIs[k];

        for(int j = 0; j < 5; j++)
        {
            //2016-0805
            psi->Name[j] = FuncSet::Hex2s(HEX2SARGS(si->Name[j]));  // 项目名称
            psi->Unit[j] = FuncSet::Hex2s(HEX2SARGS(si->Unit[j]));  // 计量单位
            psi->RangeMin[j] = si->RangeMin[j];        // 范围小值
            psi->RangeMax[j] = si->RangeMax[j];
        }

        psi->RangeDec = si->RangeDec;

        for(int j = 0; j < 3; j++)                     // 计算公式峰值位置
        {
            psi->CalcPosi[j]  = si->CalcPosi[j] % 16;
            psi->CalcPosi2[j] = si->CalcPosi[j] / 16;
        }

        psi->CalcMode     = si->CalcMode % 16;         // 峰值计算方法
        psi->CalcMode2    = si->CalcMode / 16;         // 峰值计算方法


        for(int i = 0; i < 4; i++)
        {
            psi->CurveNos[i]      = 0x0f & si->CurveNos[i] ;
            psi->CurveNos[i + 5]  = si->CurveNos[i] >> 4;

            psi->CurveNos2[i]     = 0x0f & si->CurveNos2[i] ;
            psi->CurveNos2[i + 5] = si->CurveNos2[i] >> 4;
        }
        psi->CurveNos[4] = 0x0f & si->CurveNos[4] ;

        for(int i = 0; i < 9; i++)
        {
            psi->Ratios[i] = si->Ratios[i] ;
        }

        psi->DblCurve      = si->DblCurve;
        psi->RatioDec      = si->RatioDec;
        psi->PeakCount     = si->PeakCount % 16;
        psi->BasePeak      = si->PeakCount / 16;
        psi->SubCheck      = si->SubCheck;
        psi->SubHatch      = si->SubHatch;
        psi->siChannel     = si->siChannel;
        psi->SubMinValue   = si->SubMinValue;
        psi->LessThan      = si->LessThan;            // T值小于该值时乘以一下系数
        psi->LessThanRatio = si->LessThanRatio;       // 系数
        memcpy(psi->siPeaks, si->siPeaks, sizeof (si->siPeaks));

    }

    for(int i = 0; i < 10; i++)                       // 拟合曲线
    {
        item.Curves[i] = id.Curves[i];
    }
    item.CurveCnt = id.CurveCnt;

    //-------2017-05-31----------组合输出数据变换--------------------------------
    // 3个组合输出结构体
    ID_COMBOUT   idcomb[3];

    BYTE *p = (BYTE*)idcomb;
    // 3个组合输出保存在前3条曲线中
    for(int i =0; i < 3; i++)
    {
        memcpy(p, id.Curves[i].Extend01, 20); // 复制第1个块
        p += 20;
        memcpy(p, id.Curves[i].Extend02, 20); // 复制第2个块
        p += 20;
    }

    POCT_COMBOUT *pc = item.CombOut;
    for(int i = 0; i < 3; i++, pc++)                        // 转换3个组合输出结构体数据
    {
        pc->Name = FuncSet::Hex2s(HEX2SARGS(idcomb[i].Name));           // 组合输出名称
        pc->Unit = FuncSet::Hex2s(HEX2SARGS(idcomb[i].Unit));           // 组合输出单位
        pc->OutputDec = idcomb[i].Decs / 16;        // 输出小数位数
        pc->RangeDec  = idcomb[i].Decs % 16;        // 范围小数位数
        pc->RangeMax  = idcomb[i].RangeMax;         // 范围大值
        pc->RangeMin  = idcomb[i].RangeMin;         // 范围小值
        pc->Constant  = idcomb[i].Constant;         // 常数项
        for(int j = 0; j < 3; j++)
        {
            pc->Formula[j] = idcomb[i].Formula[j];   // 公式内容
        }
    }

    return true;
}
ItemManager::ID_info ItemManager::getCur_info() const
{
    return cur_info;
}

void ItemManager::setCur_info(const ID_info &value)
{
    if (cur_info.type != value.type || cur_info.bcode != value.bcode)
    {
        cur_info = value;
        QSettings ini("config.ini");
        ini.beginGroup("AFS1200");
        if (value.bcode.isEmpty())
        {
            ini.setValue("curItem", QString(""));
        }
        else
        {
            ini.setValue("curItem", QString("%1_%2").arg(value.bcode).arg(value.type));
        }

        ini.endGroup();
    }
}

Q_GLOBAL_STATIC(ItemManager, myself)
ItemManager *ItemManager::instance()
{
    return myself();
}
