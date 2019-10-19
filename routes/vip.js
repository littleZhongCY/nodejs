var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/sayhello', (req, res) => {
  res.send('今天的天气不错')
})
router.post('/login', (req, res) => {
  console.log(req.body)
  res.send('sucess')
})
module.exports = router;