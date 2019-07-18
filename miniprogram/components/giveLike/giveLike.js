// components/giveLike/giveLike.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    time: { // 多少分钟前
      type: String,
      value: '3分钟前'
    },
    userName: { // 微信名
      type: String,
      value: '只道寻常'
    },
    commentText: { // 评论动态内容
      type: String,
      value: '我希望这个世界能多一些善良，我希望我能时不时看见你们的喜讯，我希望你们热爱自己的生命。'
    },
    dynamicContent: { // 动态内容
      type: String,
      value: '知道自己的潜力还没有完全被发挥出来，可不知道总是在怕什么，总是习惯性地不尽全力...得到的结果也常常差那么一丢丢，然后又总是不甘心。。。仿佛进入大学以来这种模式已经循环了四个学期了。。。可能我是在怕，如果拼尽全力了又因为运气差了那么一点点该怎么平置那时的心态吧？？这么看来或许我是个脆弱的？。亦或者，是被什么羁绊住了？再或者。。我需要一个让自己勇往直前不退缩的理由吧!!。。什么时候谁给我一个？？'
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

  }
})