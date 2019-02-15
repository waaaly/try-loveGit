#include "uCmbCalc.h"

#include <string.h>
#include <stdio.h>
#include <math.h>

// 调试宏
#define __CMBCALC__DEBUG_ 0

using namespace ExprCalc;

// size 最大为ARGMAXNUM
CmbCalc::CmbCalc(const unsigned char data[3], const float *arg, int size)
{
    clsErr();
    // 初始化成员空间
    Init();
    // 设置结构数据
    SetData(data);
    // 设置参数
    if (arg)
    {
        SetArg(arg, size);
    }

}

// 无参构造函数
CmbCalc::CmbCalc()
{
    clsErr();
    // 初始化成员空间
    Init();
}

CmbCalc::~CmbCalc()
{
    // 释放资源
    Relese();
}
void CmbCalc::Init()
{
    // 用于存储
    arg     = new float [ARGMAXNUM];
    formula = new std::string;
}

void CmbCalc::Relese()
{
    // 释放内存
    if (arg)     delete []arg;
    if (formula) delete formula;
    // 清洁空间
    arg     = NULL;
    formula = NULL;
}
void CmbCalc::SetData(const unsigned char *data)
{
    if (data)
    {
        // 拷贝数据到内部缓存
        this->data[0] = data[0];
        this->data[1] = data[1];
        this->data[2] = data[2];
        // 生成可视公式
        BuildFormula();
    }
    else
    {
        err = 3;
    }
}
void CmbCalc::BuildFormula()
{
    // 临时存储公式
    char tmpf[16];
    // 用于迭代存入公式
    char *p = tmpf;
    // 初始化
    memset(tmpf, 0, sizeof tmpf);
    formula->clear();

    for (int i = 0; i < 6; i++)
    {
        // 有前置的（，会后置未来的）
        if ( *p == ')') p++;
        // 依次取每4位
        int cmd = (data[i >> 1] >> (((~i & 1)) << 2)) & 0xf;
        switch (cmd)
        {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            *p++ = 'V';
            *p++ = cmd != 6? cmd + '0': 'c';
            break;
        case 7:
            *p++ = '(';
            // 预测未来括号的位置
            // 参考公式定义
            p[5] = ')';
            break;
        case 8:
            *p++ = '+';
            break;
        case 9:
            *p++ = '-';
            break;
        case 10:
            *p++ = '*';
            break;
        case 11:
            *p++ = '/';
            break;
        case 0:
            break;
        default:
            err = 5;
            return ;

        }
    }
    *formula = tmpf;
}

/*
// 设定公式中的参数
arg[0] -> Vc
arg[1] -> V1
arg[2] -> V2
arg[3] -> V3
arg[4] -> V4
arg[5] -> V5
其中
0 < size <= 6;
*/
void CmbCalc::SetArg(const float *arg, int size)
{
    // 安全检查
    if (!arg)
    {
        err = 3;
        return ;
    }
    if (size > ARGMAXNUM)
    {
        err = 4;
        size = ARGMAXNUM;
    }
    // 数据拷贝
    for (int i = 0; i < size; i++)
    {
        this->arg[i] = arg[i];
    }
    for (int i = size; i < ARGMAXNUM; i++)
    {
        this->arg[i] = 0;
    }
}

const unsigned char *CmbCalc::GetData() const
{
    return data;
}

const char *CmbCalc::GetFormula() const
{
    return formula->c_str();
}
// 构造整形到字符串的宏
static inline std::string toStr(int num, const char *head)
{
    char tmp[16];
    sprintf(tmp, "%s%d", head, num);
    return tmp;
}
// 构造整形到字符串的宏
static inline std::string toStr(float num)
{
    char tmp[16];
    if (num < 0)
    {
        sprintf(tmp, "(0%f)", num);
    }
    else
    {
        sprintf(tmp, "%f", num);
    }
    return tmp;
}

// 取返回结果
// 必须已经设定公式和参数之后，若返回-1，通过isErr的返回值来判断是否有错
float CmbCalc::GetResult()
{
    float ret = -1.0f;

    if (!formula->empty())
    {
        // 临时公式
        std::string tmpf = *formula;
        std::string::size_type pos;
        for (int i = 1; i <= 5; i++)
        {
            pos = tmpf.find(toStr(i, "V"));
            if (pos != std::string::npos)
            {
                tmpf = tmpf.replace(pos, 2, toStr(arg[i]));
            }
        }
        pos = tmpf.find("Vc");
        if (pos != std::string::npos)
        {
            tmpf = tmpf.replace(pos, 2, toStr(arg[0]));
        }
        ret = Calculate(tmpf, &err);
    }
    else
    {
        err = 6;
    }
    return ret;
}


// 静态接口，直接取结果
float CmbCalc::Calc(const unsigned char data[3], const float *arg, int size)
{
    if (!(data && arg && size))
    {
        return -1;
    }
    CmbCalc calc(data, arg, size);
    return calc.GetResult();
}
// 静态接口，直接取结果
float CmbCalc::Calc(
    const unsigned char data[3],
    float Vc, float V1, float V2,
    float V3, float V4, float V5
)
{
    float arg[6] = {Vc, V1, V2, V3, V4, V5};
    return Calc(data, arg);
}

// 判断前面的操作是否有错，0没有错
int CmbCalc::isErr() const
{
    return -err;
}
// 返回错误代码，并清除错误标记
// 没有错就返回0；
int CmbCalc::clsErr()
{
    int ret = isErr();
    err = 0;
    return ret;
}




//获取操作符的优先级
//flag为1时表示栈内优先级  flag为0表示栈外优先级
int ExprCalc::GetPriority(char ch, int flag)
{
    if (ch == '+' || ch == '-')
    {
        if (flag)
        {
            return 3;
        }
        else
        {
            return 2;
        }
    }
    else if (ch == '*' || ch == '/')
    {
        if (flag)
        {
            return 5;
        }
        else
        {
            return 4;
        }
    }
    else if (ch == '(')
    {
        if (flag)
        {
            return 1;
        }
        else
        {
            return 6;
        }
    }
    else if (ch == ')')
    {
        if (flag)
        {
            return 6;
        }
        else
        {
            return 1;
        }
    }
    else
    {

        return -1;
    }
}

//中缀表达式转化后缀表达式
void ExprCalc::InfixToPostfix(std::string &dest, const std::string &src)
{

    std::stack<char> s;               //保存操作符，使其按照优先级从大到小输出
    const char* _cur = src.c_str();   //用一个指针指向中缀表达式
    int isdgt = 0;                    // 前一个是否数字，为了区分数字间的间隔

    dest.clear();
    while (*_cur != '\0')
    {
        //如果是数字字符和点，那么保存
        if ((*_cur >= '0' && *_cur <= '9') || *_cur == '.')
        {
            dest.append(1, *_cur);
            _cur++;
            isdgt = 1;
            continue;
        }

        //如果是操作符，那么分情况讨论
        else if (*_cur == '+' ||* _cur == '-' ||*_cur == '*' ||*_cur == '/' || *_cur == '(' ||*_cur == ')')
        {
            if (isdgt)
            {
                dest.append(1, ' ');
                isdgt = 0;
            }
            if (s.empty())//
            {
                s.push(*_cur);
                _cur++;
            }
            else
            {
                if (*_cur == ')')
                {
                    while (!s.empty() && s.top() != '(')
                    {
                        dest.append(1, s.top());
                        s.pop();
                    }
                    if (!s.empty())
                    {
                        s.pop();//删除栈顶的‘(’
                    }
                    *_cur++;
                }
                //如果当前操作符的优先级大于栈顶元素的优先级，将当前操作符入栈
                else if (GetPriority(*_cur, 0) > GetPriority(s.top(), 1))
                {
                    s.push(*_cur);
                    _cur++;
                }
                else
                {

                    while (!s.empty() && GetPriority(*_cur, 0) < GetPriority(s.top(), 1))
                    {
                        dest.append(1, s.top());
                        s.pop();
                    }
                    s.push(*_cur);
                    _cur++;
                }
            }
        }
        else//跳过空格
        {
            dest.append(1, *_cur++);
        }
    }
    //将栈内剩余元素放入表达式
    while (!s.empty())
    {
        dest.append(1, s.top());
        s.pop();
    }
}

// 安全pop，如果 没有数据，就直接抛异常
float ExprCalc::sPOP(std::stack<float> &s)
{
    if (s.empty())
    {
        throw -1;
    }
    float ret = s.top();
    s.pop();
    return ret;
}
//中缀表达式求值（计算器）
float ExprCalc::Calculate(const std::string &_infix, int *err, std::string *postfix)
{

    std::string _postfix;
    InfixToPostfix(_postfix, _infix);

    float temp = 0;      //保存数字字符转化后的数字
    float res  = -1;      //保存运算结果

    std::stack<float> s; //注意前后两个栈的使用用途不同，实例化也不同
    const char *_cur = _postfix.c_str();


    try  // 捕获运算异常
    {
        while (*_cur != '\0')
        {
            if ((*_cur >= '0'&& *_cur <= '9') || *_cur == '.')
            {
                res = 0;
                int point = -1; // 小数点位置
                while ((*_cur >= '0'&& *_cur <= '9') || *_cur == '.')
                {
                    if (*_cur == '.')
                    {
                        point = 0;
                    }
                    else
                    {
                        temp = *_cur - '0';//将数字字符转化为数字
                        res = res * 10 + temp;//  例如：12
                        if (point >= 0)
                        {
                            // 如果有小数点，记录小数位数
                            point ++;
                        }
                    }
                    _cur++;
                }
                while (point > 0)
                {
                    point--;
                    res /= 10;
                }
                s.push(res);
            }
            else if (*_cur == '+' || *_cur == '-' || *_cur == '*' || *_cur == '/')
            {
                float right = sPOP(s);//先取出来的是右操作数
                float left = sPOP(s);

                switch (*_cur)
                {
                case '+':
                    s.push(left + right);
                    break;
                case '-':
                    s.push(left - right);
                    break;
                case '*':
                    s.push(left * right);
                    break;
                case '/':
                    if (right)
                    {
                        s.push(left / right);
                    }
                    else
                    {
                        throw -1;
                    }
                    break;
                }
                _cur++;
            }
            else//跳过空格
            {
                _cur++;
            }
        }
        res = sPOP(s);
        if (err) *err = 0;
        if (postfix) *postfix = _postfix;
    }
    catch (...)
    {
        res = -1;
        if (err) *err= 1;
    }
    return res;
}

#ifdef QT_CORE_LIB
#include <QRegExp>
bool ExprCalc::CheckRight(const QString &str)
{
    QString text = str;

    // 字符合法性
    QRegExp re("^([+*/()\\-]|\\d+(\\.\\d+)?)*$");

    // 字符是否合法，含 小数 +-*/()
    if (!re.exactMatch(text))
    {
        return false;
    }
    // 反证法，所有不合规则的情况
    re.setPattern(".*("              // 前跳过合法字节
                  "\\d\\(|"          // '('前不允许是数字
                  "\\([*/)]|"        // '('后不允许是*/)
                  "[+*/\\-]\\)|"     // ')'前不允许是+*/-
                  "\\.[+*/()\\-]|"   // '.'后不允许是+*/()-  //其实在数字合法性也检测过了
                  "[+*/()\\-]\\.|"   // '.'前不允许是+*/()-  //其实在数字合法性也检测过了
                  "[+*/.\\-]{2}|"    // 符号 +*/-不能连续出现两次
                  "\\.\\d+\\.|"      // '.'不能再一个数字上出现最少两次 //其实在数字合法性也检测过了
                  "\\)\\d|"          // ')'后不允许是数字
                  "\\)\\("           // ')('组合不能有
                  ").*");            // 后忽略没匹配到的字节
    // 非法组合，如果符合非法规则，表示不是合法的表达式
    if (re.exactMatch(text))
    {
        return false;
    }

    // 校验括号的对称
    // 除去非括号字符
    re.setPattern("[\\d.+*/\\-]*");
    text.replace(re, "");

    // 每次消掉能直接匹配的一对()
    re.setPattern("\\(\\)");
    QString tmp;
    do {
        tmp = text;
        // 字符串不为空且能消，就循环
    } while (!text.isEmpty() && text.replace(re, "") != tmp);

    // 如果能完全消掉，说明括号对称
    return !text.size();
}
#endif


#if __CMBCALC__DEBUG_
int main()
{
    unsigned char cmd[3] = {0x18, 0x28, 0x30};
    printf("%g\n", CmbCalc::Calc(cmd, 0, -10, 54.3, -24.4));

    return 0;
}
#endif


double ExprCalc::calc_sd(double *data, int size, double *out_avr)
{
    double lavr;
    double ret = 0;
    double *avr = out_avr;
    if (!avr) avr = &lavr;
    if (data && size)
    {
        *avr = calc_avr(data, size);

        if (size > 1)
        {
            double tmp = 0;
            for(int i = 0; i < size; i++)
            {
                tmp  += pow(data[i] - *avr, 2);
            }
            ret = sqrt(tmp / (size - 1));
        }
    }
    return ret;
}


double ExprCalc::calc_avr(double *data, int size)
{
    double ret = 0;
    if (data && size)
    {
        for (int i = 0; i < size; i++)
        {
            ret += data[i];
        }
        ret /= size;
    }

    return ret;
}
