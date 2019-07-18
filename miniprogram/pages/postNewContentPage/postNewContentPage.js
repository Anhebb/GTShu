// miniprogram/pages/postNewContentPage/postNewContentPage.js 
const util = require('../../libs/utils/util.js');

Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    content: '',
    photoList: [],
    permission: 1
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

  textChanged: function (e) {
    this.data.content = e.detail.value;
  },

  handleAddPhoto: function () {
    var that = this;

    wx.chooseImage({
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length + that.data.photoList.length > 9) {
          wx.showToast({
            icon: 'none',
            title: '最多只能添加9张照片！',
          });

          return;
        }
        that.data.photoList = that.data.photoList.concat(tempFilePaths);
        that.setData({
          photoList: that.data.photoList
        })
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  removeImage: function (e) {
    var that = this;

    this.data.photoList.splice(this.data.photoList.indexOf(e.currentTarget.dataset.path), 1);
    this.setData({
      photoList: that.data.photoList
    });
  },

  handleRadioChange: function (e) {
    if (e.detail.value === 'all') {
      this.data.permission = 1;
    } else {
      this.data.permission = 2;
    }
  },

  /** 
   * 处理按下“发布”按钮 
   */
  handleSubmit: function () {
    var that = this;
    const db = wx.cloud.database();

    if (this.data.content.length < 10) {
      wx.showToast({
        icon: 'none',
        title: '话题内容不能少于10个字',
      });
      return;
    }

    var uploadedPhotoList = [];
    Promise.all(that.data.photoList.map((item) => {
      return wx.cloud.uploadFile({
        cloudPath: 'uploadPhoto/' + Date.now() + item.match(/\.[^.]+?$/)[0], // 文件名称  
        filePath: item,
      })
    })).then(res => {
      res.map((item) => {
        uploadedPhotoList.push(item.fileID);
      });

      console.log(uploadedPhotoList);

      db.collection('posts_collection').add({
        data: {
          content: that.data.content,
          photoList: uploadedPhotoList,
          permission: that.data.permission,
          time: util.formatTime(new Date()),
          commentCnt: 0,
          likeCnt: 0
        }
      }).then(r => {
        console.log(r);
        wx.showToast({
          title: '发表成功！',
        });
        wx.navigateBack();
      }).catch(e => {
        console.log(e);
        wx.showToast({
          title: '发表失败！',
        });
      });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '发表失败！',
      });
    });
  }
})