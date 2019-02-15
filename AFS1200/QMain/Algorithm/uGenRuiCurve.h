
#ifndef uGenRuiCurveH
#define uGenRuiCurveH



extern double dx[21], dy[21];
extern double iAllDots;
extern double CONCS[21],RESPS[21];                    // 标准品浓度和反应值
extern int    iDots;                          // 标准点数量
extern int    iNs[2];                         // 多项式次数
extern int    iSect;                          // 分段位置(如果是分段多项式)
extern char   cLogX;                          // x取对数
extern char   cLogY;                          // y取对数
extern int    iFitType;                       // 拟合方式
extern double dA[16],dA1[16];                 // 系数


bool isIncreOrDecre(long lDataNum, double fArrData[]  , int nIncreaseFlag = 0) ;

bool FindInsertPos(long lDataNum, double fArrData[], double fNewVal, long lRetInsertPos) ;

bool DoGausEquation(long lRabkNum, double a[], double B[], double x[]) ;

bool Get2MitrixProduct(double a[], long ARowsCount, long AColsCount, double B[], long BColsCount,
                       double ResultP[]) ;

bool GetATranspose(double a[], long ARowsCount, long AColsCount, double ResultAt[]) ;

bool Sort2ArrDatas(long lDataNum, double fArrFist[], double fArrSecond[]) ;

double Round(double dVal, short iPlaces) ;

void MergeSort(double *k,int n) ;

bool GetReferParasVal_Logic5P(
        long lDataNum, double fArrR[],double fArrC[],
        double *fr0, double *fa, double *fb, double *fc, double *fK)  ;

char GetResponseVal_Logic5P(double fK, double fa, double fb, double fc, double fr0,  double fInC, double *fRetResult) ;

bool GetReferParasVal_Exponential5p(long lDataNum, double fArrR[], double fArrC[], double *fr0,
                                    double *fa, double *fb, double *fc, double *fK);

bool multi_GetReferParasVal_Logic5P(long lDataNum, int *pos,
                                    double fArrR[],double fArrC[],
                                    double a[], double a1[]) ;

double  DoHalfDiv_Logic5P(double fLimta, double fLimtb, double fR0, double fK, double fa,
                                double fb, double fc, double fInR) ;

double multi_DoHalfDiv_Logic5P(double fInR) ;

#endif
