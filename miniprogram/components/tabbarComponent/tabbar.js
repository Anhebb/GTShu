// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    news_num: {
      type: String,
      value: ''
    },
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#3B49E0",
        "list": [
          {
            "pagePath": "pages/treeHolePage/treeHolePage",
            "iconPath": "icon/树洞1.png",
            "selectedIconPath": "icon/树洞2.png",
            "text": "首页"
          },
          {
            "pagePath": "pages/postNewContentPage/postNewContentPage",
            "iconPath": "icon/加号.png",
            "text": "发布话题"
          },
          {
            "pagePath": "pages/messagePage/messagePage",
            "iconPath": "icon/消息1.png",
            "selectedIconPath": "icon/消息2.png",
            "text": "我的"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready: function () {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
