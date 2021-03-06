#ifndef GETCONC_H
#define GETCONC_H
#include "../ID/uIDCardDef.h"


//#endif // GETCONC_H



extern double CONCS[21],RESPS[21];                    // 标准品浓度和反应值
extern int    iDots;                          // 标准点数量
extern int    iNs[2];                         // 多项式次数
extern int    iSect;                          // 分段位置(如果是分段多项式)
extern char   cLogX;                          // x取对数
extern char   cLogY;                          // y取对数
extern int    iFitType;                       // 拟合方式
extern double dA[16],dA1[16];                 // 系数



double Calcys(double a[],double x);

double CalcCorrelation(double x[], double y[], int n);  // 计算相关性

double FindY(double x1,                          // 自变量区间小值
             double x2,                          // 自变量区间大值
             double cy);                         // 因变量y值

bool MultiFit(
                double dxs[],          // x数据数组
                double dys[],          // y数据数组
                int    idots,          // 数据组数
                int    isect,          // 分段位置(如果是分段多项式)
                char   clogx,          // x取对数
                char   clogy,          // y取对数
                int    ifittype,       // 拟合方式
                int    ins[],          // 多项式拟合次数
                double a[],            // 系数
                double a1[],           // 第二段系数(如果是分段多项式)
                double &r);            // 相关系数
double CalcConc(double resp);          // 根据tc计算浓度

double old_GetConc(double mtc,               // 反应值
               double mx[],              // 标准品浓度
               double my[],              // 标准品反应值
               unsigned char m_SubFlag,  // 分段标志
               unsigned char m_LogB,     // 取对数标志
               double a0[],              // 两段的参数
               double a1[],
               int L,                    // 点数
               int p)  ;                  // 分段位置

double old_CalcY(double a[],int n,double x) ;

double old_FindY(double a[],                         // 多项式参数
             double x1,                          // 自变量区间小值
             double x2,                          // 自变量区间大值
             double cy) ;                         // 因变量y值

// 曲线拟合
void LB_CurveFit(                      //曲线拟合
                POCT_ITEM liCalc,                  // 项目
                int iIndex,                       //子项序号
                double mx[],                     // 返回子项浓度数值组
                double my[],                      //返回子项反应值数值组
                double a0[],                      //返回第一段系数
                double a1[],                     // 返回第二段系数
                int n[])   ;                       //返回两段的次数

int old_FitEqu( double mx[],                 // x数组
            double my[],                 // y数组
            bool mSubFlag,               // 0不分段    1分段
            bool mLogFlag,               // 0不取对数  1取对数
            int L,                       // 点的个数
            double a0[],                 // 第一段方程的参数
            double a1[],                 // 第二段方程的参数
            int n[],                     // 输出方程的次数
            int p,                       // 分段点
            double mtc,
            double *mtx) ;
int old_fitequ(double mx[],double my[],bool mSubFlag,bool mLogFlag,int L,
    double a0[],double a1[],int n[],int p,double mtc,double *mtx) ;
void old_polyfit(int n,double x[],double y[],int poly_n,double a[]) ;
void old_gauss_solve(int n,double A[],double x[],double b[]) ;

//__declspec(dllexport) __stdcall
void old_PolyFit(int n,
             double x[],
             double y[],
             int poly_n,
             double a[]) ;



//int _matherr (struct _exception *a);
#endif
