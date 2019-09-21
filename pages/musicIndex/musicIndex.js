// pages/musicIndex/musicIndex.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultPic: '../images/defaultPic.png',
        indexTitle: '咪乐馆',
        myHeight: '',
        myWidth: '',
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        offset: 0,
        limit: 6,
        //1新碟 2新歌
        type: 1,
        //banner
        banners: [],
        //推荐
        recommend: [],
        //新碟新歌
        newSong: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(app.globalData.userInfo)
        this.renderBanners()
        this.recommend(this.data.limit);
        this.renderNewSong(this.data.type);
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
                this.setData({
                    banners: res.data.banners
                })
            }
        })
    },
    // 推荐歌单数据
    recommend(limit) {
        wx.request({
            url: app.url + `/personalized?offset=${this.data.offset}&limit=${limit}`,
            success: res => {
                var len = res.data.result.length;
                if (len / 6 > 1) {
                    var newList = res.data.result.splice(len - 6, len);
                    this.setData({
                        recommend: newList
                    })
                } else {
                    this.setData({
                        recommend: res.data.result
                    })
                }
            }
        })
    },
    // 新碟新歌数据
    renderNewSong(type) {
        //新碟
        if (type == 1) {
            wx.request({
                url: app.url + '/top/album?limit=3',
                success: res => {
                    this.setData({
                        newSong: res.data.albums
                    })
                }
            })
        }
        //新歌/personalized/newsong
        if (type == 2) {
            wx.request({
                url: app.url + '/personalized/newsong',
                success: res => {
                    var len1 = res.data.result.length;
                    var ids = [];
                    res.data.result.forEach(item => {
                        ids.push(item.id)
                    })
                    var [a, b, c, ...rest] = ids
                    wx.request({
                        url: app.url + '/song/detail?ids=' + a + "," + b + "," + c,
                        success: res => {
                            var newSongPicList = [];
                            //   处理新歌图片数据
                            res.data.songs.forEach(item => {
                                console.log(item.al.picUrl)
                                console.log(item.al.name)
                                let obj = {};
                                obj.name = item.al.name;
                                obj.picUrl = item.al.picUrl;
                                newSongPicList.push(obj)
                            })
                            this.setData({
                                newSong: newSongPicList
                            })
                        }
                    })

                }
            })
        }

    },
    //加载下一页数据
    refreshData() {
        this.data.limit += 6;
        this.recommend(this.data.limit)
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
    identifySong() {
        wx.navigateTo({
            url: '/pages/identifySong/identifySong',
        })
    },
    // 去歌单广场
    songList() {
        wx.navigateTo({
            url: '/pages/songList/songList',
        })
    },
    //新歌 新碟切换
    changestatus(e) {
        // console.log(e.currentTarget)
        var type = e.currentTarget.dataset.type;
        this.setData({
            type: type
        })
        this.renderNewSong(this.data.type)
        console.log(this.data.type)
    }
})