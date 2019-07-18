const app = getApp();
const db = wx.cloud.database({ env: 'gtshu-zkry2' });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "暂无内容",
    myOpenId:'',
    //判断页面是否为空 0为空页，1为有数据页
    showTreSqu: '0',
    showMyTree: '0',
    // tab切换
    currentTab: 0,
    listData:[
      {
        //头像地址
        userPhotoUrl: '../../images/dynamic/demo2.png',
       // 微信名
       userName: '只道寻常',
       // 时间
       time: '2019/07/13 10:00',
       // 内容文字
       contentText: '我希望这个世界能多一些善良，我希望我能时不时看见你们的喜讯，我希望你们热爱自己的生命。',
       // 内容照片地址数组
       contentPhotoUrl: [
         { url: "../../images/dynamic/demo1.png" },
       ]
       },

       {
        //头像地址
        userPhotoUrl: '../../images/dynamic/demo2.png',
        // 微信名
        userName: '只道寻常',
        // 时间
        time: '2019/07/13 10:00',
        // 内容文字
        contentText: '我希望这个世界能多一些善良，我希望我能时不时看见你们的喜讯，我希望你们热爱自己的生命。',
        // 内容照片地址数组
        contentPhotoUrl: [
          { url: "../../images/dynamic/demo1.png" },
        ]
      }
    ]
  },

  async onLoad(options) {
    wx.hideTabBar();
    app.editTabbar();
    let that = this;
    this.data.listData = [];
    
    if (that.data.currentTab == '0')  {
      await db.collection('posts_collection').orderBy('time', 'desc').where({
        permission: 1
      }).get().then(res => {
        that.data.listData = res.data;
      });
      if (this.data.listData.length > 0) {
        this.setData({
          showTreSqu: '1'
        });
      }
      else {
        this.setData({
          showTreSqu: '0'
        })
      }
    } else {
      await db.collection('posts_collection').orderBy('time', 'desc').where({
        _openid: app.globalData.myOpenId
      }).get().then(res => {
        that.data.listData = res.data;
      });

      if (this.data.listData.length > 0) {
        this.setData({
          showMyTree: '1'
        });
      }
      else {
        this.setData({
          showMyTree: '0'
        });
      }
    }

    //获取用户openID
    await wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: function(res) {
        that.setData({
          myOpenId: res.result.openid
        })
      },
      fail: function(err) {
        console.log(err);
      }
    });

    for (var i = 0; i < that.data.listData.length; i++) {
      await db.collection('userInfo_collection').where({
        _openid: that.data.listData[i]._openid
      }).get().then(res => {
        that.data.listData[i].avatarUrl = res.data[0].userInfo.avatarUrl;
        that.data.listData[i].name = res.data[0].userInfo.nickName;
      });
      this.setData({
        listData: that.data.listData
      })
    }
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
    let that = this;
    if (this.data.currentTab == 0) {
      this.onLoad()
    }
    else if (this.data.currentTab == 1) {
      for (var i = 0; i < this.data.listData.length; i++) {
        if (this.data.listData[i]._openid != this.data.myOpenId) {
          this.data.listData.splice(i, 1);
          i--;
          console.log("切换到我的树洞")
        }
      }
      this.setData({
        listData: that.data.listData
      });

      this.onShow();
    }
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
    let that = this;
    if (this.data.currentTab==0){
      this.onLoad()
    }
    else {
      for (var i = 0; i < this.data.listData.length; i++) {
        if (this.data.listData[i]._openid != this.data.myOpenId) {
          this.data.listData.splice(i, 1);
          i--;
          console.log("切换到我的树洞")
        }
      }
      this.setData({
        listData: that.data.listData
      });
    }

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
  /**
    * 滑动切换tab
    */
  bindChange: function (e) {
    let that = this;
    that.setData({ currentTab: e.detail.current });

    
    if (that.data.currentTab == '0') {
      this.onLoad();
    } else if (this.data.currentTab == '1') {
      this.onLoad();
    }

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
