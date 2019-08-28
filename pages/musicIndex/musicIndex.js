// pages/musicIndex/musicIndex.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexTitle: '咪乐馆',
    myHeight: '',
    myWidth: '',
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    //banner
    banners: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.userInfo)
    this.renderBanners()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // banner数据-
  renderBanners() {
    wx.request({
      url: app.url + '/banner?type=2',
      success: res => {
        console.log(res.data)
        this.setData({
          banners: res.data.banners
        })
      }
    })
  },
  //处理图片高度
  imgheight(e) {
    var that = this;
    var winH = wx.getSystemInfo({
      success: function(res) {
        //窗口宽度
        // console.log(res.windowWidth, res.windowHeight)
        var winW = res.windowWidth;
        //图片宽高
        var picW = e.detail.width;
        var picH = e.detail.height;
        //处理后的图片相对高度
        var handlePicH = winW / (picW / picH);
        var myWidth = winW;
        that.setData({
          myHeight: handlePicH,
          myWidth: myWidth
        })
      },
    })
  },
  // 到搜索页面
  handleSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 听歌识曲页面
  identifySong(){
    wx.navigateTo({
      url: '/pages/identifySong/identifySong',
    })
  }
})