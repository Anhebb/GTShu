//// components/dynamic/dynamic.js
const db = wx.cloud.database();
var util = require('../../libs/utils/util.js');
const app = getApp();
Component({
  properties: {
    userPhotoUrl: { //头像地址
      type: String,
      value: '../../images/dynamic/demo2.png'
    },
    userName: { // 微信名
      type: String,
      value: '只道寻常'
    },
    time: { // 时间
      type: String,
      value: '2019/07/13 10:00'
    },
    contentText: { // 内容文字
      type: String,
      value: '我希望这个世界能多一些善良，我希望我能时不时看见你们的喜讯，我希望你们热爱自己的生命。'
    },
    contentPhotoUrl: { // 内容照片地址数组
      type: Array,
      value: [
        {url:"../../images/dynamic/demo1.png"},
        { url: "../../images/dynamic/demo1.png" },
        { url: "../../images/dynamic/demo1.png" },
        { url: "../../images/dynamic/demo1.png" },
        { url: "../../images/dynamic/demo1.png" },
        { url: "../../images/dynamic/demo1.png" },
        { url: "../../images/dynamic/demo1.png" },
        { url: "../../images/dynamic/demo1.png" }
      ]
    },
    conmentCount: { // 评论数
      type: String,
      value: '9'
    },
    likeCount: { // 点赞数
      type: String,
      value: ''
    },
    postId: {
      type: String,
      value: ''
    },
    isClickable: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    preview: function (event) {
      var src = event.currentTarget.dataset.src;//获取data-src
      wx.previewImage({
        current: src,
        urls: this.properties.contentPhotoUrl,
      })
    },
    goToDetailPage: function(event) {
      wx.navigateTo({
        url: '../../pages/detailPage/detailPage?postId=' + event.currentTarget.dataset.postid,
      });
    },

    likeUpvote: function(event){
      let time = util.formatTime(new Date());
      let that = this;
      //判断是否点赞过
      // db.collection('likes_collection').where({
      //   postId: that.data.postId
      // })
      // .get({
      //   success: function(res){
      //     console.log(res.data);
          //已经点过赞
          // for(let i=0;i<=res.data)
          // if (app.globalData.myOpenId == res.data[0].userId){
          //   wx.showToast({
          //     title: '你已经点过赞',
          //   })
          // }
      //   }
      // })

       wx.cloud.callFunction({
         name: 'addLikeCnt',
         data: {
           postId: this.data.postId
         }, 
         success: function (res) {
            db.collection('posts_collection').where({
              _id: that.data.postId
           })
           .get({
             success: res => {
               that.setData({
                 likeCount: res.data[0].likeCnt
               })
             }
           })
         },
         fail: console.error 
       })

       //新增点赞记录
       db.collection('likes_collection').add({
         data: {
           postId: that.data.postId,
           userId: app.globalData.myOpenId,
           time: time
         },
         success: function(res){
           console.log(res)
         },fail: console.error
       })
    }
  }
})
 