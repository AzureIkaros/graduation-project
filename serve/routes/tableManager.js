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


router.post('/api/getTableInfo',(req,res,next)=>{
    checkToken(req.body.token, res, () => {
        let id = req.body.id;
        conn.query(`select * from tableset where id = '${id}'`,(error,result)=>{
            conn.query(`select * from ${result[0].table_name}`,(error,list)=>{
                res.json({
                    status:0,
                    data:list
                })
            })
        })
    })
})


router.post('/api/delTableInfo',(req,res,next)=>{
    checkToken(req.body.token, res, () => {
        conn.query(`delete from ${req.body.table_name} where id = '${req.body.id}'`,(error,result)=>{
            if(error){
                res.json({
                    status:1,
                    error:1
                })
                return;
            }
            if(result){
                res.json({
                    status:0,
                    error:0
                })
            }
        })
    })
})
module.exports = router;