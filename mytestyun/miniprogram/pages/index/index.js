//index.js
const app = getApp()
const db = wx.cloud.database()
const table = db.collection("classifyTable")
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    top:'100rpx',
    left: '100rpx',
    
    classifyName:[],
    requestResult: '',
    currentItemId:0,
    currentPic:"https://gw.alicdn.com/tps/TB1ydZ2LVXXXXaJapXXXXXXXXXX-300-100.png",
    currentClass:{
      mainPic:"https://gw.alicdn.com/tps/TB1ydZ2LVXXXXaJapXXXXXXXXXX-300-100.png",
      classDetial:[
        {goodPic:"",goodName:"",goodPrice:""}
      ]
    }
  },

  scrollViewClick:function(event){
    var clickItemId=event.currentTarget.dataset.id.substring(8);
    var that=this;

    var e = 'that.data.classifyName[' + that.data.currentItemId +'].isCurrent';
    var b = 'that.data.classifyName[' + clickItemId +'].isCurrent';
    console.log(that.data.classifyName[clickItemId].mainPic)

    that.setData({
      currentItemId:clickItemId,
      ['classifyName[' + that.data.currentItemId+'].isCurrent']:false,
      ['classifyName[' + clickItemId +'].isCurrent'] :true,
      currentPic:that.data.classifyName[clickItemId].picURL
    })

    console.log(that.data.classifyName[0].isCurrent)



    // console.log(event)
    // var recode = event.currentTarget.datas
    // et.id
    // console.log(recode)
    // var that = this

    // table.doc(recode).get({
    //   success(res) {
    //     console.log(res.data)

    //     that.setData({
    //       currentClass:{
    //         mainPic:res.data.mainPic,
    //         classDetial:res.data.goodDetial
    //       }
    //     })

    //     console.log(that.data.currentClass)

    //     wx.cloud.getTempFileURL({
    //       fileList: [res.data.mainPic],
    //       success(res) {
    //         console.log(res.fileList[0])
    //         that.setData({
    //           currentClass:res.fileList[0].tempFileURL
    //         })
    //       },
    //       fail(res) {
    //         console.log(res)
    //       }
    //     })
    //   },
    //   fail(res) {
    //     console.log(res)
    //   }
    // })
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    var that = this
    table.doc("XH-vKuSiwXKAQrBm").get({
      success(res){
        console.log(res)
        that.setData({
          classifyName:res.data.classifyName
        })
        console.log(that.data.classifyName)
      }
    })
   
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
