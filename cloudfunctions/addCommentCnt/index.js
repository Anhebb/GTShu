// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _  = db.command;

  return db.collection('posts_collection').doc(event.postId).update({
    data: {
      commentCnt: _.inc(1)
    },
    success: function(res) {
      console.log(res.data);
    },
    fail: function(err) {
      console.log(err);
    }
  })
}