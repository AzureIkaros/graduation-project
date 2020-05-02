var express = require('express');
var router = express.Router();

const spider = require("../utils/spider");
const {
    checkToken
} = require("../utils/token");

router.post("/api/getSpiderInfo", (req, res, next) => {
    checkToken(req.body.token, res, () => {
        res.json(spider.getSpiderInfo())
    })
})

router.post('/api/setSpiderInfo', (req, res, next) => {
    checkToken(req.body.token, res, () => {
        spider.setSpiderInfo(req.body, res);
    })

})

router.post('/api/stopSpider', (req, res, next) => {
    checkToken(req.body.token, res, () => {
        spider.stopSpider();
        res.json({
            status: "ok"
        })
    })
})

router.post('/api/endSpider', (req, res, next) => {
    checkToken(req.body.token,res,()=>{
        res.json(spider.endSpider());
    })
        
    
})

module.exports = router;