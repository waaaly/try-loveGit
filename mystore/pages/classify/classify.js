//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    classifyStr:[
      '今日推荐',
      '男女服饰',
      '内衣配饰',
      '箱包首饰',
      '美妆护肤',
      '钟表珠宝',
      '手机数码',
      '电脑办公',
      '家用电器',
      '食品生鲜',
      '酒水饮料',
      '运动户外',
      '你说',
      '过',
      '把爱',
      '放开',
      '会走',
      '更远',
      '或许',
      '命运',
      '的签',
      '只让',
      '我们',
      '遇见',
      '或许我们',
      '只能爱',
      '这一季的',
      '秋天',
      '飘落',
      '后的',
      '碎片',
      '让我',
      '怎么捡'
    ]
  },

  scrollViewClick:function(event){
    console.log(event)    //打印出view中所有属性的值，包括“点击获取data-id绑定的id值”

    console.log(event.currentTarget)    //打印出data-id绑定的id值

    console.log(event.currentTarget.dataset.index)   //打印出index的值
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
