var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/user",{ useNewUrlParser: true, useUnifiedTopology:true },function (err) {
  if (err) throw err
  console.log('数据库连接成功')
})

let helloSchema = new mongoose.Schema({
  name: String
})
let helloModel = mongoose.model('user', helloSchema, 'user')
router.get('/', function (req, res) {
  console.log(req.query.password)
  helloModel.find({
    "user": req.query.user
  }).exec((err, data) => {
    console.log(data)
    if (data.length == 0) {
      res.send({
        data: -1,
        msg: '登录失败，用户名不存在'
      })
    } else {
      console.log(typeof data[0])
      console.log(data[0]['user'])
      console.log(data[0].password)
      if (req.query.password == data[0].password) {
        res.send({
          data: 0,
          msg: '登陆成功'
        })
      } else {
        res.send({
          data: -1,
          msg: '登陆失败，密码错误'
        })
      }
    }
  })
  // let helloEntity = new helloModel()
  // helloEntity.name = req.query.name
  // helloEntity.password = req.query.password
  // helloEntity.save()
});
router.get('/sayhello', (req, res) => {
  res.send('今天的天气不错')
})
router.post('/login', (req, res) => {
  console.log(req.body)
})
module.exports = router;
