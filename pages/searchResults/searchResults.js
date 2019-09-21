// pages/searchResults/searchResults.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue:'',
        active:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        console.log(e.words)
        this.setData({
            searchValue: e.words||'暂无搜索'
        })
        this.renderData(e.words)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // tab切换
    onChange(e){

    },
    // 默认为 1 即单曲, 取值意义: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
    renderData(type = 1,words){
        wx.request({
            url: app.url + "/search?keywords=" + words +" & type"+type,
            success:res=>{
                console.log(res.data.result)
            }
        })
    }
})