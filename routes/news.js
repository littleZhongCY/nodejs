var express = require('express')
var router = express.Router()
let mongoose = require('mongoose')

mongoose.connect(
  'mongodb://47.101.134.233:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (err) {
    if (err) throw err
    console.log('数据库连接成功')
  }
)
let newsSchema = new mongoose.Schema({
  content: String
})

let newModle = mongoose.model('news', newsSchema, 'news')
/* GET users listing. */
router.get('/getNews', function (req, res, next) {
  newModle.find({}).exec((err, data) => {
    if (err) throw err
    res.send({
      data: data.reverse(),
      code: 0
    })
  })
})

router.post('/changeNews', function (req, res) {
  console.log(req.body)
  newModle.findById(req.body.id).exec((err, data) => {
    data.content = req.body.content
    data.save()
    res.send({
      data: '修改成功',
      code: 0
    })
  })
})


router.post('/uploadNews', function (req, res, next) {
  if (req.body.content) {
    let newsEntity = new newModle()
    newsEntity.content = req.body.content
    newsEntity.save()
    res.send({
      data: '写入成功',
      code: 0
    })
  } else {
    res.send({
      data: '你怎么什么都没写呢！',
      code: -1
    })
  }
})
router.post('/removeNews', function (req, res, next) {
  console.log(req.body)
  newModle.findById(
    req.body.content
  ).exec((err, data) => {
    if (!data) {
      res.send({
        data: '删除失败,数据不存在',
        code: -1
      })
      return
    }
    data.remove(function (err) {
      if (err) throw err
      res.send({
        data: '删除成功',
        code: 0
      })
    })
  })
})

module.exports = router