// miniprogram/pages/index/index.js
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
    wx.hideTabBar();
    // 先使用云函数login获取用户的openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.myOpenId = res.result.openid;
        console.log(app.globalData.myOpenId);
        // 检查用户是否已经授权登陆
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权
              // 获取用户信息
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo = res.userInfo;
                  console.log(app.globalData.userInfo);
                  wx.switchTab({
                    url: '../treeHolePage/treeHolePage',
                  });
                }
              });
            } else {
              // 还未授权
              // 跳转到授权页面
              wx.redirectTo({
                url: '../authPage/authPage',
              })
            }
          }
        });
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
      }
    })
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

  }
})