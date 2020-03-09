// pages/search/search.js
var arr = [];
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //热搜列表
        hotSearchList: [],
        //   搜索关键字
        searchValue: '',
        // 历史记录
        historyRecords:[
          '芒种'
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(app.globalData.searchRecords);
        
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
      this.getHotSearchList();
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
    //热搜列表
    getHotSearchList() {
        wx.request({
            url: app.url + '/search/hot/detail',
            success: res => {
                // console.log(res.data)
                if (res.data.code == 200) {
                    this.setData({
                        hotSearchList: res.data.data
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                    })
                }
            }
        })
    },
    //搜索结果页面
    goSearchResults(e) {
        console.log(e.currentTarget.dataset.words)
        let words = e.currentTarget.dataset.words;
        this.setData({
            searchValue: words
        })
        arr.push(words)
        arr=Array.from(new Set(arr))
        console.log(arr)
        this.setData({
            historyRecords: arr
        })
        setTimeout(()=>{
            wx.navigateTo({
                url: '/pages/searchResults/searchResults?words=' + words,
            })
        })
    },
    // 清空历史记录
    delRecords(){
        arr=[]
        this.setData({
            historyRecords: arr
        })
    }
})