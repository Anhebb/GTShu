// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _  = db.command;

  return db.collection('comments_collection').doc(event.commentid).remove({
    success: function(res) {
      console.log(res.data);
    },
    fail: function(err) {
      console.log(err);
    }
  })
}