#ifndef UCMBCALC_H
#define UCMBCALC_H

#include <string>
#include <stack>

#define ARGMAXNUM 6
class CmbCalc
{
public:
    // size 最大为ARGMAXNUM
    // arg:[1-5]为5个基本参数，[0]为常数
    CmbCalc(const unsigned char data[3], const float *arg = NULL, int size = ARGMAXNUM);
    CmbCalc();
    virtual ~CmbCalc();
    void SetData(const unsigned char data[3]);
    void SetArg(const float *arg, int size = ARGMAXNUM);
    const unsigned char *GetData() const;
    virtual const char *GetFormula() const ;
    virtual float GetResult();

    int isErr() const;
    int clsErr();

    // 静态接口，直接取结果
    static float Calc(const unsigned char data[3], const float *arg, int size = ARGMAXNUM);
    static float Calc(
        const unsigned char data[3],
        float Vc, float V1, float V2 = 0,
        float V3 = 0, float V4 = 0, float V5 = 0
    );

private:
    unsigned char data[3];
    float *arg;
    std::string *formula;
    int err;

protected:
    virtual void Init();
    virtual void Relese();

    virtual void BuildFormula();

};


#ifdef QT_CORE_LIB
#include <QString>
#endif

namespace ExprCalc
{
//中缀表达式转化后缀表达式
void InfixToPostfix(std::string &dest, const std::string &src);
//后缀表达式求值（计算器）
float Calculate(const std::string &_infix, int *err = 0, std::string *postfix = 0);

// 安全pop，如果 没有数据，就直接抛异常
float sPOP(std::stack<float> &s);
//flag为1时表示栈内优先级  flag为0表示栈外优先级
int GetPriority(char ch, int flag);


#ifdef QT_CORE_LIB
// 用QT实现
// 校验表达式是否合法
bool CheckRight(const QString &str);
#endif




// SD和均值计算
double calc_avr(double *data, int size);
double calc_sd(double *data, int size, double *out_avr);

}

#endif // UCMBCALC_H
