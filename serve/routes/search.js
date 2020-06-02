var express = require('express');
var router = express.Router();
var analyze = require('../utils/elasticsearch');
var connection = require("../utils/mysql");

router.post("/api/serach", async (req, res, next) => {

    let arr = [];
    let serResult = [];
    analyze(req.body.data).then(data => {
        let str = "";
        data.tokens.forEach((value) => {
            str += `+${value.token} `
        })
        console.log(`str:${str}`)
        connection.query(`select * from tableset`, (error, result) => {
            arr = result.filter(value => {
                if (value.table_name === 'admin' || value.table_name === 'tableset') {
                    return false;
                } else {
                    return true;
                }
            })
            arr.forEach((value, index) => {
                connection.query(`select * from ${value.table_name} where match(text) against('${str}')`, (error, result) => {
                    serResult = serResult.concat(result);
                    if (index == arr.length - 1) {
                        serResult.sort((x, y) => {
                            return y.clickNum - x.clickNum;
                        })
                        res.json(serResult)
                    }
                })
            })

        })
    });
});

router.post("/api/click", (req, res, next) => {
    connection.query(`update ${req.body.table_name} set clickNum = ${req.body.clickNum + 1} where id = '${req.body.id}'`,(error,result)=>{
        if(error){
            res.json({
                status:0,
                error:1
            })
            return;
        }
        res.json({
            status:0,
            error:0
        })
    })
})

module.exports = router;