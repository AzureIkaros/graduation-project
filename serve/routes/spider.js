var express = require('express');
var router = express.Router();

const spider = require("../utils/spider");


router.get("/api/getSpiderInfo",(req,res,next)=>{
    res.json(spider.getSpiderInfo());
})

router.post('/api/setSpiderInfo',(req,res,next)=>{
    spider.setSpiderInfo(req.body,res);
})

router.post('/api/stopSpider',(req,res,next)=>{
    spider.stopSpider();
    res.json({status:"ok"})
})

router.get('/api/endSpider',(req,res,next)=>{
    res.json(spider.endSpider());
})

module.exports = router;