const express = require('express');
const conn = require("../utils/mysql");
const {
    checkToken
} = require("../utils/token");

const router = express.Router();


router.post('/api/getTable', (req, res, next) => {
    checkToken(req.body.token, res, () => {
        conn.query("select * from tableset", (error, result) => {
            if (error)
                throw error;
            result = result.filter((item)=>{
                return item.table_name !== "admin"
            }).filter(item=>{
                return item.table_name !== "tableset"
            })
            res.json(result)
        })
    })
})

router.post('/api/deleteTable',(req,res,next)=>{
    checkToken(req.body.token, res, () => {
        conn.query(`delete from tableset where id="${req.body.id}"`, (error, result) => {
            if(error){
                res.json({
                    status:0,
                    error:1
                })
                throw error;
            }
            conn.query(`drop table ${req.body.table_name}`,(error,result)=>{
                if(error){
                    res.json({
                        status:0,
                        error:1
                    })
                    throw error;
                }
                res.json({
                    status:0,
                    error:0
                })
            })
        })
    })
})

module.exports = router;