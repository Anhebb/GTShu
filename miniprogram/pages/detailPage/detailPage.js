// miniprogram/pages/detailPage/detailPage.js
const app = getApp();
const util = require('../../libs/utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPostDetail: undefined,
    allComments: [],
    myComment: '',
    replyToId: '',
    replyToName: '',
    inputHintText: '回复这条动态',
    replyToCommentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const db = wx.cloud.database();
    let that = this;

    console.log(options.postId);
    // 获取当前的动态信息
    db.collection('posts_collection').doc(options.postId).get()
    .then(res => {
      postDetail = res.data
      // 获取发布此动态信息的用户名字和头像
      db.collection('userInfo_collection').where({
        _openid: res.data._openid
      }).get()
      .then(r => {
        postDetail.avatarUrl = r.data[0].userInfo.avatarUrl;
        postDetail.name = r.data[0].userInfo.nickName;
        that.setData({
          curPostDetail: postDetail
        });
        
        // 获取此动态的所有评论
        db.collection('comments_collection').where({
          postId: postDetail._id
        }).orderBy('time', 'desc').get()
        .then(r1 => {
          that.data.allComments = r1.data;
          that.data.allComments.map(item => {
            db.collection('userInfo_collection').where({
              _openid: item.authorUserId
            }).get()
            .then(r2 => {
              item.avatarUrl = r2.data[0].userInfo.avatarUrl;
              item.name = r2.data[0].userInfo.nickName;
              that.setData({
                allComments: that.data.allComments
              });
            });
          });
          console.log(that.data.allComments);
        })
        .catch(e1 => {
          console.log(e1);
        })
      })
      .catch(e => {
        console.log(e);
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
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

  handleInput: function(e) {
    this.setData({
      myComment: e.detail.value
    });
  },

  handleComment() {
    let that = this;

    if (this.data.myComment.length === 0) {
      wx.showToast({
        title: '不允许空评论',
      });
    }

    const db = wx.cloud.database();

    if (this.data.replyToName !== '') {
      this.data.myComment = '回复@' + this.data.replyToName + '：' + this.data.myComment;
    }

    wx.cloud.callFunction({
      name: 'addCommentCnt',
      data: {
        postId: that.data.curPostDetail._id
      },
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    });

    db.collection('comments_collection').add({
      data: {
        postId: this.data.curPostDetail._id,
        replyToUserId: this.data.replyToId,
        replyToCommentId: this.data.replyToCommentId,
        authorUserId: app.globalData.myOpenId,
        time: util.formatTime(new Date()),
        text: this.data.myComment
      }
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '回复成功！',
      });
      that.onLoad({
        postId: that.data.curPostDetail._id
      });
    }).catch(err => {
      console.log(err);
    });
  },

  commentThisUser: function(e) {
    let that = this;

    this.data.replyToId = e.currentTarget.dataset.userid;
    this.data.replyToName = e.currentTarget.dataset.username;
    this.data.inputHintText = '回复' + this.data.replyToName;
    this.data.replyToCommentId = e.currentTarget.dataset.commentid;
    this.setData({
      inputHintText: that.data.inputHintText
    });
  },

  commentThisPost: function(e) {
    let that = this;

    this.data.replyToId = '';
    this.data.replyToName = '';
    this.data.inputHintText = '回复这条动态';
    this.data.replyToCommentId = '';
    this.setData({
      inputHintText: that.data.inputHintText
    });
  }
})