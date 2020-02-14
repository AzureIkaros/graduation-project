var express = require('express');
var router = express.Router();

const getCode = require("../utils");
const connection = require("../utils/mysql");
const passWdChange = require('../utils/passWdChange')


let code = "";

router.post('/api/adminLogin', (req, res, next) => {

    let data = req.body;

    connection.query(`select * from admin where username = '${data.username}'`, (error, results, fields) => {
        if (error) {
            console.log(error);
        };

        /* 
        0.正确
        1.用户名或密码错误
        2.验证码错误    
        */
        if(results.length == 0){
            //用户名不匹配
            code = getCode();
            res.json({ status: 0, error: 1, code });
            return
        }else if (data.username == results[0].username && passWdChange(data.password) == results[0].password && data.code.toUpperCase() == code.toUpperCase()) {
            //验证正确
            res.json({ status: 0, error: 0 });
        } else if (data.code.toUpperCase() != code.toUpperCase()) {
            //验证码错误
            code = getCode();
            res.json({ status: 0, error: 2, code });
        } else {
            //用户名或密码错误
            code = getCode();
            res.json({ status: 0, error: 1, code });
        }
    });
})


//获取验证码
router.get('/api/getCode', (req, res, next) => {
    code = getCode();
    res.json({
        status: 0,
        code
    })
})


//密码修改
router.post('/api/pushPassWD',(req,res,next)=>{
    let data = req.body;
    connection.query(`select  * from admin where username = '${data.username}'`,(err,results,fields)=>{
        if(err){
            console.log(err);
            return;
        }
            
        
        /*
            0:密码正确
            1:密码错误或用户名
            2:密码修改失败
        */
        
        if(results.length == 0){
            res.json({
                status:0,
                error:1
            });
            return;
        }else{
            if(results[0].password == passWdChange(data.oldPassWd)){
                //密码匹配
                connection.query(`update admin set password = '${passWdChange(data.newPassWd)}' where username = '${data.username}'`,(ere,results,fields)=>{
                    if(err){
                        console.log(err);
                        return;
                    }

                    res.json({
                        status:0,
                        error:0
                    })
                })
            }else{
                //密码不匹配
                res.json({
                    status:0,
                    error:1
                });
            }
        }

    })
})


module.exports = router;