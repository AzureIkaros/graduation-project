var express = require('express');
var router = express.Router();

const getCode = require("../utils");
const connection = require("../utils/mysql");

let code = "";

router.post('/api/adminLogin',(req,res,next)=>{
    let data = req.body;
    connection.query(`select * from admin where username = '${data.username}'`,(error,results,fields)=>{
        if(error) console.log(error);

    })
    if(data.username == "abcd" && data.password == "123456" && data.code.toUpperCase == code.toUpperCase){
        res.json({status:0,error:0});
    }else if((data.username == "abcd" || data.password == "123456") && data.code.toUpperCase != code.toUpperCase){
        res.json({status:0,error:2});
    }else if(data.username != "abcd" || data.password != "123456" && data.code.toUpperCase != code.toUpperCase){
        res.json({status:0,error:2});
    }else{
        res.json({status:0,error:1});
    }
})


//获取验证码
router.get('/api/getCode',(req,res,next)=>{
    code = getCode();
    res.json({
        status:0,
        code
    })
})


module.exports = router;