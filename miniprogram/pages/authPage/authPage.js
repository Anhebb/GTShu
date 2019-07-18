// miniprogram/pages/authPage/authPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 处理微信登陆授权
   */
  async handleAuthLogin(e) {
    const db = wx.cloud.database();

    // 用户允许授权
    if (e.detail.userInfo) {
      // 获取用户的信息
      app.globalData.userInfo = e.detail.userInfo;
      console.log(app.globalData.userInfo);

      // 查看用户的userInfo是否已经存储在数据库中
      let queryResult = [];
      await db.collection('userInfo_collection').where({
        _openid: app.globalData.myOpenId
      }).get().then(res => {
        queryResult = res.data;
      }).catch(err => {
        console.log(err);
      });

      if (queryResult.length > 0) {
        // 用户的userInfo已经存储在数据库中
        // TODO: 更新用户信息？
        wx.switchTab({
          url: '../treeHolePage/treeHolePage',
        });
      } else {
        db.collection('userInfo_collection').add({
          data: {
            userInfo: app.globalData.userInfo
          }
        }).then(res => {
          console.log(res);
          // TODO: 跳转到某一页面
          wx.switchTab({
            url: '../treeHolePage/treeHolePage',
          });
        }).catch(err => {
          console.log(err);
        });
      }
    }
    // 用户不允许授权
    else {
      wx.showToast({
        icon: 'none',
        title: '请允许授权登陆',
      });
    }
  }
})
