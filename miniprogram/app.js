//app.js
App({
  onLaunch: function () {
    
    //隐藏自带的tabbar

    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'gtshu-zkry2',
        traceUser: true,
      })
    }

    this.globalData = {
      tabBar: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#3B49E0",
        "list": [
          {
            "pagePath": "/pages/treeHolePage/treeHolePage",
            "iconPath": "icon/树洞1.png",
            "selectedIconPath": "icon/树洞2.png",
            "text": "首页"
          },
          {
            "pagePath": "/pages/postNewContentPage/postNewContentPage",
            "iconPath": "icon/加号.png",
            "isSpecial": true,
            "text": "发布话题"
          },
          {
            "pagePath": "/pages/messagePage/messagePage",
            "iconPath": "icon/消息1.png",
            "selectedIconPath": "icon/消息2.png",
            "text": "消息"
          }
        ]
      }
    }
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  }
})
