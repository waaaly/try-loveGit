
#include "debug.h"

#ifdef DEBUGLOG_ENABLE

#include <QFile>
#include <QDateTime>
#include <QThread>

class LogOutput{
public:
    virtual ~LogOutput() {}
    virtual void output(const QString &msg) = 0;
};


class DBG_console: public LogOutput
{
public:
    virtual void output(const QString &msg)
    {
        qDebug(qPrintable(msg));
    }
};

class DBG_file: public LogOutput
{
public:
    DBG_file()
    {
        file.setFileName(DBG_FILENAME);
        file.open(QIODevice::ReadWrite | QIODevice::Text);
    }
    ~DBG_file()
    {
        file.flush();
        file.close();
    }
    virtual void output(const QString &msg)
    {
        if (file.isOpen())
        {
            file.write(qPrintable(msg));
            file.write("\n");
        }
    }
    QFile file;
};

#ifdef DEB_ENABLE_NETWORK
//  .pro 里要添加network依赖库
#include <QUdpSocket>
class DBG_udp: public LogOutput
{
public:
    virtual void output(const QString &msg)
    {
        udp.writeDatagram(
                    QByteArray(qPrintable(msg))+"\n",
                    DBG_REMOTEIPADDR,
                    DBG_REMOTEPORT);
    }
    QUdpSocket udp;
};
#endif


ScopeAnchor__::ScopeAnchor__(QString file, int line, QString func)
    :fileName(file)
    ,fileLine(line)
    ,funcName(func)
{
    QString result =
            QString("+Enter: %1: %2: %3")
            .arg(fileName)
            .arg(fileLine)
            .arg(funcName);
    DBG_DEBUG(qPrintable(result));

}

ScopeAnchor__::~ScopeAnchor__()
{
    QString result =
            QString("-Leave: %1: %2: %3")
            .arg(fileName)
            .arg(fileLine)
            .arg(funcName);
    DBG_DEBUG(qPrintable(result));
}

Q_GLOBAL_STATIC(LogWriter, logsys)
LogWriter *LogWriter::Instance()
{
    return logsys();
}


LogWriter::LogWriter() :
    QObject(0),
    putout(NULL)
{
    setLogLevel(LOG_DEBUG);
    setLogOutput(LOG_CONSOLE);
    connect(this, SIGNAL(writeLog_sig(QString)), SLOT(writeLog(QString)));
}

LogWriter::~LogWriter()
{
    if (putout) delete putout;
}
void LogWriter::setLogOutput(const LOGOUTPUT &logOutput)
{
    if (!_logOutput || _logOutput != logOutput)
    {
        if (putout)
        {
            delete putout;
            putout = NULL;
        }
        _logOutput = logOutput;
        switch (logOutput) {
        case LOG_FILE:
            putout = new DBG_file();
            break;
#ifdef DEB_ENABLE_NETWORK
        case LOG_UDP:
            putout = new DBG_udp();
            break;
#endif
        case LOG_CONSOLE:
            putout = new DBG_console();
            break;
        }
    }
}

void LogWriter::PrintLog(LOGLEVEL level, const char *msg,  ...)
{
    if (level < _logLevel)  return;     //low level

    char logBuffer[8192] = {0};

    va_list vl_fmt;                     //buffer
    va_start(vl_fmt, msg);
    vsprintf(logBuffer, msg, vl_fmt);
    va_end(vl_fmt);

    QString logLevel = getLevelStr(level);
    QString logTime = QDateTime::currentDateTime().toString("yyMMdd_hhmmss.zzz");

    emit writeLog_sig(QString().sprintf(
                          "*[%s][%s][%-10p]{%s}",
                          qPrintable(logTime),
                          qPrintable(logLevel),
                          QThread::currentThreadId(),
                          logBuffer));
}

QString LogWriter::getLevelStr(LOGLEVEL level)
{
    switch(level) {
    case LOG_DEBUG: return "LOG_DEBUG"; break;
    case LOG_INFO:  return "LOG_INFO ";  break;
    case LOG_WARN:  return "LOG_WARN ";  break;
    case LOG_ERROR: return "LOG_ERROR"; break;
    default: break;
    }
    return QString();
}

void LogWriter::writeLog(const QString msg)
{
    if (putout)
    {
        putout->output(msg);
    }
}



#endif // DEBUGLOG_ENABLE

