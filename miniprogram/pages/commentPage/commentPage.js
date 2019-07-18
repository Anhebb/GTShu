const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "暂无内容",
    //判断页面是否为空 0为空页，1为有数据页
    showTreSqu: '1',
    showMyTree: '1',
    // tab切换
    currentTab: "0",

    commentData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // app.editTabbar();
    const db = wx.cloud.database();
    const _  = db.command;

    // 评论过我的
    if (this.data.currentTab === "0") {
      let myPosts = [];
      let allCommentsToMe = [];

      // 先获取我所发布过的所有动态
      await db.collection('posts_collection').where({
        _openid: app.globalData.myOpenId
      }).get()
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          myPosts.push(res.data[i]._id);
        }
      })
      .catch(err => {
        console.log(err);
      });

      // 再获取所有评论我的评论，过滤自己评论自己的
      await db.collection('comments_collection').where(
        _.or([
          {
            postId: _.in(myPosts)
          },
          {
            replyToUserId: app.globalData.myOpenId
          }
        ])
      ).where({
        authorUserId: _.neq(app.globalData.myOpenId)
      }).get()
      .then(res => {
        allCommentsToMe = res.data;
      })
      .catch(err => {
        console.log(err);
      });

      for (var i = 0; i < allCommentsToMe.length; i++) {
        if (allCommentsToMe[i].replyToCommentId === '') {
          await db.collection("posts_collection").doc(allCommentsToMe[i].postId).get()
          .then(res => {
            allCommentsToMe[i].replyToContent = res.data.content;
            return db.collection("userInfo_collection").where({
              _openid: allCommentsToMe[i].authorUserId
            }).get()
            .then(r => {
              allCommentsToMe[i].authorName = r.data[0].userInfo.nickName;
            })
            .catch(e => {
              console.log(e);
            })
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          await db.collection("comments_collection").doc(allCommentsToMe[i].replyToCommentId).get()
          .then(res => {
            allCommentsToMe[i].replyToContent = res.data.text;
            return db.collection("userInfo_collection").where({
              _openid: allCommentsToMe[i].authorUserId
            }).get()
              .then(r => {
                allCommentsToMe[i].authorName = r.data[0].userInfo.nickName;
              })
              .catch(e => {
                console.log(e);
              })
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
      this.setData({
        commentData: allCommentsToMe
      });
    }
    // 我评论过的
    else {
      let allCommentsIpost = [];

      await db.collection('comments_collection').where({
        authorUserId: app.globalData.myOpenId
      }).get()
      .then(res => {
        allCommentsIpost = res.data;
      })
      .catch(err => {
        console.log(err);
      });

      for (var i = 0; i < allCommentsIpost.length; i++) {
        if (allCommentsIpost[i].replyToCommentId === '') {
          await db.collection("posts_collection").doc(allCommentsIpost[i].postId).get()
          .then(res => {
            allCommentsIpost[i].replyToContent = res.data.content;
            return db.collection("userInfo_collection").where({
              _openid: allCommentsIpost[i].authorUserId
            }).get()
              .then(r => {
                allCommentsIpost[i].authorName = r.data[0].userInfo.nickName;
              })
              .catch(e => {
                console.log(e);
              })
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          await db.collection("comments_collection").doc(allCommentsIpost[i].replyToCommentId).get()
          .then(res => {
            console.log(res);
            allCommentsIpost[i].replyToContent = res.data.text;
            return db.collection("userInfo_collection").where({
              _openid: allCommentsIpost[i].authorUserId
            }).get()
              .then(r => {
                allCommentsIpost[i].authorName = r.data[0].userInfo.nickName;
              })
              .catch(e => {
                console.log(e);
              })
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
      this.setData({
        commentData: allCommentsIpost
      });
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
    * 滑动切换tab
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
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

    if (e.target.dataset.current === "0") {
      console.log("评论我的");
      this.onLoad();
    } else {
      console.log("我的评论");
      this.onLoad();
    }
  },

  deleteComment: function(e) {
    let that = this;

    wx.cloud.callFunction({
      name: 'deleteComment',
      data: {
        commentid: e.currentTarget.dataset.commentid
      },
      success: function(res) {
        wx.showToast({
          title: '删除成功！',
        });
        that.onLoad();
      },
      fail: function(err) {
        console.log(err);
      }
    });

    wx.cloud.callFunction({
      name: 'subCommentCnt',
      data: {
        postId: e.currentTarget.dataset.postid
      },
      success: function(res) {
 
      },
      fail: function(err) {
        console.log(err);
      }
    });
  }
})