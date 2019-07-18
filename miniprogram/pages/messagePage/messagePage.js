const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum_num: 1,
    list: [
      { imgurl: "../../images/messagePage/评论.png", text: '评论', num: 1, jturl: '../../images/messagePage/jt.png' },
      { imgurl: "../../images/messagePage/点赞.png", text: '点赞', num: 1, jturl: '../../images/messagePage/jt.png' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sum = 0;
    for (let i = 0; i < this.data.list.length; i++) {
      sum = sum + this.data.list[i].num;
    };
    this.setData({
      sum_num: sum
    }),
      app.editTabbar();

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
  commentOrlike: function(e){
    if (e.target.dataset.current == 0){
      wx.navigateTo({
        url: '../commentPage/commentPage',
      })
    } 
    if (e.target.dataset.current == 1){
      wx.navigateTo({
        url: '../getLikePage/getLikePage',
      })
    }
  }
})