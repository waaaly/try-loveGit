#ifndef ITEMMANAGER_H
#define ITEMMANAGER_H


#include <QObject>
#include "../ID/uIDCardDef.h"

class ItemManager : public QObject
{
Q_OBJECT
public:

    // TC计算方法
    struct CalcModel
    {
        QString P1, P2, P3;
        QString Model;
    };
    CalcModel buildModel(
            const POCT_SUBITEM &poctitem,          // 模板项目
            const QString &format = QString("X%1") // 生成格式
    );

    // 重要结构
    struct ID_info{
        QString bcode;
        QString title;
        QString batch;
        quint32 type; // 1 为单卡
    };
    ID_info getIdInfo(const ID_ITEM *idc);
    ID_info getIdInfo(const POCT_ITEM *idc);


    bool saveIdHex(const ID_ITEM *idc);
    void deleteIdHex(const ID_info &info);

    // type == -1,不分类
    QList<ID_info> getItemList(qint32 type = -1, const QString &bcode = QString());
    bool loadItem(const ID_info &info, POCT_ITEM *item);


    bool ID2POCT(const ID_ITEM &id, POCT_ITEM &item);

    ID_info getCur_info() const;
    void setCur_info(const ID_info &value);

    static ItemManager *instance();
    explicit ItemManager(QObject *parent = 0);

    static QString getArrow(const QString &pName, const QString &value);


    static QString getRefer(const QString &pName);


signals:
    void itemListUpdate();

private:
    Q_DISABLE_COPY(ItemManager)
    ID_info cur_info;

};


#define itemMat ItemManager::instance()
#define ITEMSAVEDIR "Project"

#endif // ITEMMANAGER_H
