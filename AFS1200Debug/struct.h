#ifndef STRUCT_H
#define STRUCT_H
#include <StdCtrls.hpp>

typedef struct
{
    unsigned short int From;                     // 峰值起点
    unsigned short int To;                       // 峰值终点
    unsigned char Count;                    // 取值个数
    unsigned char Style;                    // 取值计算方式
} ID_PEAK;

typedef struct
{
    int   Position[10];            // 峰值位置
    float Value[10];               // 峰值结果
    float Vallery[9];              // 两峰之间的最小值
    int   From[10];
    int   To[10];
} ID_PEAKRESULT;


typedef struct
{
    BYTE  Method;
		// 1   拟合方法
		//     0 : 直线
		//     1 : 多项式
		//     2 : MMF
		//     3 : 三次样条
		//     4 : 对数拟合
		//     5 : 幂函数拟合
		//     6 : 逻辑斯蒂模型
		//     7 : 指数拟合
		//     8 : 线性插值
		//     9 : Logistic拟合(4参数)
		//     10: Logistic拟合(5参数)
    BYTE  SectPosi;                // 1   多项式分段位置0表示不分段

    BYTE  SectLimits[2];           // 2   多项式次数 0表示自动 1-6表示次数
	
	BYTE  ConcTrans;               // 1   浓度变换   1 : 取对数 0 : 不处理
    BYTE  RespTrans;               // 1   反应值变换 1 : 取对数 0 : 不处理

	BYTE dec_std;
	BYTE StdCount;                // 1   标准品个数

	float Concs[16];               // 64  标准品浓度  2017-05-26 由21变成16
    float Resps[16];               // 64  标准品反应值

} IDCURVE;




#define ISTYLE_SEND 0
#define ISTYLE_RECV 1
void DisplayData(TMemo*mShow, int istyle,const char buf[],int icount);


#endif // STRUCT_H