/*
2018-07-09
日志调试辅助工具
*/

#ifndef DEBUG_H
#define DEBUG_H

#include <QObject>

#ifndef DEBUGLOG_ENABLE

#define DBG_ANCHOR()

#define DBG_DEBUG(format, args...)
#define DBG_INFO(format, args...)
#define DBG_WARN(format, args...)
#define DBG_ERROR(format, args...)

#define DBG_SET_LEVEL_DEBUG()
#define DBG_SET_LEVEL_INFO()
#define DBG_SET_LEVEL_WARN()
#define DBG_SET_LEVEL_ERROR()
#define DBG_SET_LEVEL_NONE()

#define DBG_SET_OUTPUT_CONSOLE()
#define DBG_SET_OUTPUT_FILE()
#define DBG_SET_OUTPUT_UDP()

// 消除moc的编译提示
class ___: QObject {Q_OBJECT};

#else // DEBUGLOG_ENABLE

// 实现

// 作用域锚，用于定位流程的作用域过程
class ScopeAnchor__
{
public:
    ScopeAnchor__(QString file, int line, QString func);
    ~ScopeAnchor__();

private:
    QString fileName;
    int fileLine;
    QString funcName;
};

// 输出接口
class LogOutput;
// 输出日志调试类
class LogWriter : public QObject
{
    Q_OBJECT
public:
    // 全局静态实例，取其实例指针
    static LogWriter *Instance();

    enum LOGLEVEL{
        LOG_DEBUG = 0,      /**< Debug >**/
        LOG_INFO,           /**< Info  >**/
        LOG_WARN,           /**< Warn  >**/
        LOG_ERROR,          /**< Error >**/
		LOG_NONE            /**< None  >**/
    };
    enum LOGOUTPUT{
        LOG_CONSOLE,    // 控制台输出
#ifdef DEB_ENABLE_NETWORK
        LOG_UDP,        // 上传到UDP网络
#endif
        LOG_FILE        // 输出到文件
    };

    inline void setLogLevel(LOGLEVEL logLevel)
    {
        _logLevel = logLevel;
    }
    void setLogOutput(const LOGOUTPUT &logOutput);
	// 输出日志方法，格式参考printf的格式字符串
    void PrintLog(LOGLEVEL level, const char* msg, ...);

	// 用户一般不要手动创建，使用Instance()来自动获得，遵循单一实例模型
    LogWriter();
    ~LogWriter();

// 使用一对信号槽，实现多线程的安全支持
signals:
    void writeLog_sig(const QString msg);
private slots:
    void writeLog(const QString msg);

private:
    Q_DISABLE_COPY(LogWriter)
    QString    getLevelStr(LOGLEVEL level);

    LOGLEVEL   _logLevel;
    LOGOUTPUT  _logOutput;
    LogOutput* putout;
};

// ====配置
// 信息输出到控制台
#define DBG_SET_OUTPUT_CONSOLE() LogWriter::Instance()->setLogOutput(LogWriter::LOG_CONSOLE)
// 信息输出到文件
#define DBG_SET_OUTPUT_FILE()    LogWriter::Instance()->setLogOutput(LogWriter::LOG_FILE)
// 输出文件名
#define DBG_FILENAME             (QDateTime::currentDateTime().toString("MMddhhmmss") + ".log")

#ifdef DEB_ENABLE_NETWORK
// 输出到网络的udp上
#define DBG_SET_OUTPUT_UDP()     LogWriter::Instance()->setLogOutput(LogWriter::LOG_UDP)
// 远程主机的ip和port
#define DBG_REMOTEIPADDR         QHostAddress::LocalHost
#define DBG_REMOTEPORT           6666
#else // DEB_ENABLE_NETWORK
#define DBG_SET_OUTPUT_UDP()     DBG_SET_OUTPUT_CONSOLE()
#endif





// ====使用输出
// 调试输出
#define DBG_DEBUG(format, args...)  \
    LogWriter::Instance()->PrintLog(LogWriter::LOG_DEBUG, format, ##args)

#define DBG_INFO(format, args...)  \
    LogWriter::Instance()->PrintLog(LogWriter::LOG_INFO,  format, ##args)

#define DBG_WARN(format, args...)  \
    LogWriter::Instance()->PrintLog(LogWriter::LOG_WARN,  format, ##args)

#define DBG_ERROR(format, args...)  \
    LogWriter::Instance()->PrintLog(LogWriter::LOG_ERROR, format, ##args)

/*
e.g.
    DBG_DEBUG(DBG_CFLINE("test output ,arg0 = %d", 7))
*/
#define DBG_CFLINE(format, args...)  \
    "<%s:%d> " format, __FUNCTION__, __LINE__, ##args


// 调试输出配置
// 设置输出级别
// LOG_DEBUG > LOG_INFO > LOG_WARN > LOG_ERROR
#define DBG_SET_LEVEL_DEBUG() LogWriter::Instance()->setLogLevel(LogWriter::LOG_DEBUG)
#define DBG_SET_LEVEL_INFO()  LogWriter::Instance()->setLogLevel(LogWriter::LOG_INFO )
#define DBG_SET_LEVEL_WARN()  LogWriter::Instance()->setLogLevel(LogWriter::LOG_WARN )
#define DBG_SET_LEVEL_ERROR() LogWriter::Instance()->setLogLevel(LogWriter::LOG_ERROR)
#define DBG_SET_LEVEL_NONE()  LogWriter::Instance()->setLogLevel(LogWriter::LOG_NONE )

// 函数锚，一般建议在函数第一行定义
// 该函数一般用于测试函数调用过程和耗时判断
// 只有使能DBG_SET_LEVEL_DEBUG才有效，属调试信息
#define DBG_ANCHOR() ScopeAnchor__ scopeanchor__(__FILE__, __LINE__, __FUNCTION__)

#endif // DEBUGLOG_ENABLE

#endif // DEBUG_H
