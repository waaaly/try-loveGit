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
                    return  tr("��") ;
            }
        }
        if(!up_range.isEmpty())
        {
            bool ok ;
            double fRange = up_range.toDouble(&ok) ;
            if(ok)
            {
                if(fResult > fRange)
                    return tr("��") ;
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
                tmp = (isEN?"   (Reference range:":tr("         (�ο���Χ:")) + low_range  + tr( " - ") + up_range + ")";
            else if(!low_range.isEmpty())
                tmp = (isEN?"   (Reference range:":tr("         (�ο���Χ: > ")) + low_range  + ")";
            else if(!up_range.isEmpty())
                tmp = (isEN?"   (Reference range:":tr("         (�ο���Χ: < "))  + up_range + ")";

            sub_line =  sub_line.replace(0, tmp.length(), tmp) + "\r\n" ;
            // 20170328
            return sub_line ;
        }
    }
    return "" ;
}





// ���ɼ�����ʽ
ItemManager::CalcModel ItemManager::buildModel(const POCT_SUBITEM &poctitem, const QString &format)
{
    CalcModel model;                      // ����ֵ��������

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
ȡ��Ŀ�ļ���Ϣ
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
            // �Ƕ�����
            retval.type = 0;
        }
        else
        {
            // ������
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
            // �Ƕ�����
            retval.type = 0;
        }
        else
        {
            // ������
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


    // ��˾����
    item.CompanyCode = id.CompanyCode;
    // ��˾����
    item.CompanyName = FuncSet::Hex2s(HEX2SARGS(id.CompanyName));
    // ����
    item.BarCode     = FuncSet::Hex2s(HEX2SARGS(id.BarCode)).toUpper();
    // ����ǰ׺
    item.BatchPre    = FuncSet::Hex2s(HEX2SARGS(id.BatchPre));
    // ����
    item.Batch       = FuncSet::Hex2s(HEX2SARGS(id.Batch));
    item.ReportTitle = FuncSet::Hex2s(HEX2SARGS(id.ReportTitle)) ;
    // ��������
    item.AreaValid   = id.AreaValid;
    // ��������
    item.Area        = FuncSet::Hex2s((id.Area));

    // �豸����
    item.DeviceType  = id.DeviceType;
    // ��Ʒ����
    item.ProductCode = id.ProductCode;
    // ��
    item.Year        = id.Year;
    // ��
    item.Month       = id.Month;
    // ��ˮ��
    item.SerialNo    = id.SerialNo;
    // ��Ч����
    item.ValidMonth  = id.ValidMonth;
    // �Ƿ������
    item.Blank       = id.Blank;
    item.Reversal    = id.Reversal ;
    item.ReversalBase= id.ReversalBase ;

    // �Ƿ��ж�δ����
    item.MinCheck   = id.MinCheck;
    item.MinValue   = id.MinValue;
    item.MinPosi    = id.MinPosi;

    // �Ƿ��жϳ嶥
    item.MaxCheck   = id.MaxCheck;
    item.MaxPosi    = id.MaxPosi;
    item.MaxValue   = id.MaxValue;

    item.PeakCount     = id.PeakCount % 16;
    item.BasePeak      = id.PeakCount / 16;
    memcpy(item.Peaks, id.Peaks, sizeof (id.Peaks));

    // ��Ŀ����
    item.ItemCount  = id.ItemCount;
    // ��Ŀ����
    for(int k = 0; k < id.ItemCount; k++)
    {
        const ID_SUBITEM   *si = &id.Items[k];           // ����Ŀ�ṹ��
        POCT_SUBITEM *psi = &item.SIs[k];

        for(int j = 0; j < 5; j++)
        {
            //2016-0805
            psi->Name[j] = FuncSet::Hex2s(HEX2SARGS(si->Name[j]));  // ��Ŀ����
            psi->Unit[j] = FuncSet::Hex2s(HEX2SARGS(si->Unit[j]));  // ������λ
            psi->RangeMin[j] = si->RangeMin[j];        // ��ΧСֵ
            psi->RangeMax[j] = si->RangeMax[j];
        }

        psi->RangeDec = si->RangeDec;

        for(int j = 0; j < 3; j++)                     // ���㹫ʽ��ֵλ��
        {
            psi->CalcPosi[j]  = si->CalcPosi[j] % 16;
            psi->CalcPosi2[j] = si->CalcPosi[j] / 16;
        }

        psi->CalcMode     = si->CalcMode % 16;         // ��ֵ���㷽��
        psi->CalcMode2    = si->CalcMode / 16;         // ��ֵ���㷽��


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
        psi->LessThan      = si->LessThan;            // TֵС�ڸ�ֵʱ����һ��ϵ��
        psi->LessThanRatio = si->LessThanRatio;       // ϵ��
        memcpy(psi->siPeaks, si->siPeaks, sizeof (si->siPeaks));

    }

    for(int i = 0; i < 10; i++)                       // �������
    {
        item.Curves[i] = id.Curves[i];
    }
    item.CurveCnt = id.CurveCnt;

    //-------2017-05-31----------���������ݱ任--------------------------------
    // 3���������ṹ��
    ID_COMBOUT   idcomb[3];

    BYTE *p = (BYTE*)idcomb;
    // 3��������������ǰ3��������
    for(int i =0; i < 3; i++)
    {
        memcpy(p, id.Curves[i].Extend01, 20); // ���Ƶ�1����
        p += 20;
        memcpy(p, id.Curves[i].Extend02, 20); // ���Ƶ�2����
        p += 20;
    }

    POCT_COMBOUT *pc = item.CombOut;
    for(int i = 0; i < 3; i++, pc++)                        // ת��3���������ṹ������
    {
        pc->Name = FuncSet::Hex2s(HEX2SARGS(idcomb[i].Name));           // ����������
        pc->Unit = FuncSet::Hex2s(HEX2SARGS(idcomb[i].Unit));           // ��������λ
        pc->OutputDec = idcomb[i].Decs / 16;        // ���С��λ��
        pc->RangeDec  = idcomb[i].Decs % 16;        // ��ΧС��λ��
        pc->RangeMax  = idcomb[i].RangeMax;         // ��Χ��ֵ
        pc->RangeMin  = idcomb[i].RangeMin;         // ��ΧСֵ
        pc->Constant  = idcomb[i].Constant;         // ������
        for(int j = 0; j < 3; j++)
        {
            pc->Formula[j] = idcomb[i].Formula[j];   // ��ʽ����
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
