#include "beep_dri.h"
#include <unistd.h>
#include <fcntl.h>
#include <sys/types.h>
#include <QElapsedTimer>
#include <QApplication>
#include <signal.h>


#include <QTimer>
#include <QDebug>

Beep_Dri::Beep_Dri(QObject *parent) :
    QThread(parent)
{
    setEnable(true);
    const char *path;
    beep_type = ::access("/sys/class/gpio/gpio113/value", F_OK);
    if (beep_type)
    {
        path = "/dev/buzzer";
        beep_type = 1;
    }
    else
    {
        path = "/sys/class/gpio/gpio113/value";
    }

    beep_fd = ::open(path, O_RDWR);
    set_beep(false); // 20170331

    ep = new EventPlug();

    connect(ep, SIGNAL(send_signal_t(QEvent*)), this, SLOT(beep_on()));

//    start();

}


Beep_Dri::~Beep_Dri()
{
    if (beep_fd >= 0)
    {
        ::close(beep_fd);
    }

    delete ep;
}

void Beep_Dri::regedit_wid(QObject *p, const QStringList &f)
{
    ep->filter_init(p, f);
}

void Beep_Dri::beep_on(int time)  // 蜂鸣器响应
{
    if (!is_enable)
    {
        wait_time = time*1000;
        beep_flag = true;
         if (beep_flag)//由于usleep受系统时间干扰把蜂鸣器放这里触发
                            //但是，如果蜂鸣时间过长，因为是主线程，所以ui就会卡死蜂鸣时间长度
        {
            set_beep(true);
            usleep(wait_time);//100 000us
            set_beep(false);
            beep_flag = false;
        }
    }
}

void Beep_Dri::set_beep(bool on_off)
{

    // 如果蜂鸣器禁止并且这个操作是打开蜂鸣器，则忽略
    if (is_enable  && on_off)
    {
        return ;
    }

    char buf[2][2] =
    {
        {'0', '1'}, {0, 'o'}
    };
    write(beep_fd, &buf[beep_type][on_off? 0: 1], 1);
}

void Beep_Dri::setEnable(bool sw)
{
    is_enable = sw? 0: 1;
}

Beep_Dri* Beep_Dri::Get_Beep()
{
    static Beep_Dri beep;
    return &beep;
}

// 20170306
void Beep_Dri::run()
{
    beep_flag = false;
/*如果在这里触发蜂鸣器，那么在设置系统时间的时候会影响sleep函数，
 * 导致保存时间设置后蜂鸣器会不动作两到三分钟，所以在草函数beep_on里触发得了
 */
    forever
    {
        usleep(10000) ;
    }
}
// 20170306 end
