//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    show:false,
    position:'left',
    motto: 'Hello mimi音乐',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function () {
      wx.setNavigationBarTitle({
          title: '用户登录',
      })
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
         wx.setStorage({
             key: 'userInfo',
             data: this.data.userInfo||'',
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
    wx.setStorage({
        key: 'userInfo',
        data: this.data.userInfo||'',
    })
  },
  // 去云村首页
  goMusicIndex(){
    wx.switchTab({
      url: '/pages/musicIndex/musicIndex?userInfo=' + this.data.userInfo,
    })
  },
  //关于我弹窗层
  aboutMe(){
    console.log('打开弹出层')
    this.setData({
      show: true
    })
  },
  //关闭弹窗
  onClose(){
    this.setData({
      show:false
    })
  }
})
