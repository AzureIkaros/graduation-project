var express = require('express');
var router = express.Router();
var analyze = require('../utils/elasticsearch');
var connection = require("../utils/mysql");

router.post("/api/serach", async (req, res, next) => {

    let arr = [];
    let serResult = [];
    analyze(req.body.data).then(data => {
        let str = "'";
        data.tokens.forEach((value) => {
            str += `*${value.token}*;`
        })
        str += "'"
        connection.query(`select * from tableset`, (error, result) => {
            arr = result.filter(value => {
                if (value.table_name === 'admin' || value.table_name === 'tableset') {
                    return false;
                } else {
                    return true;
                }
            })
            arr.forEach((value, index) => {
                connection.query(`select * from ${value.table_name} where match(text) against(${str})`, (error, result) => {
                    serResult = serResult.concat(result);
                    if (index == arr.length - 1) {
                        res.json(serResult)
                    }
                })
            })

        })
    });
})

module.exports = router;