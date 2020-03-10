// pages/searchResults/searchResults.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue:'',
        active:0,
        currentTitleId:'1018',
        // 导航标题
        // 默认为 1 即单曲, 取值意义: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
        titleList:[
            {id:'1018',title:'综合'},
            {id:'1',title:'单曲'},
            {id:'10',title:'专辑'},
            {id:'100',title:'歌手'},
            {id:'1000',title:'歌单'},
            {id:'1004',title:'MV'},
            {id:'1009',title:'电台'},
            {id:'1010',title:'视频'}
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        console.log(e)
        this.setData({
            searchValue: e.words||'暂无搜索'
        })
        this.renderData(1,e.words)
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
    // 搜索内容变化
    searchChange(e){
        console.log(e.detail)
        var searchValue=e.detail
        if(searchValue+"".trim()){
            this.setData({
                searchValue
            })
        }else{
            return 
        }
        this.renderData(this.data.currentTitleId,this.data.searchValue)
    },
    // tab切换
    onChange(e){
        console.log(e.detail.index)
        let currentIndex=e.detail.index
        // 根据当前的index区查找对应的标题列表的id
        var currentTitleId=this.data.titleList[currentIndex].id
        this.setData({
            currentTitleId
        })
        // 切换调用获取对应的内容(当前的titleId 关键字)
        this.renderData(this.data.currentTitleId,this.data.searchValue)
    },
    // 默认为 1 即单曲, 取值意义: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
    renderData(type,words){
        wx.request({
          url: app.url + "/search?keywords=" + words + " & type=" + type,
            success:res=>{
                console.log(res.data.result)
            }
        })
    }
})