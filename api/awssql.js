var express = require('express')
var mysql = require('mysql')
var mybatisMapper = require('mybatis-mapper')
var dbconfig = require('../db/config.js')

var router = express.Router();
var pool = mysql.createPool(dbconfig); 

router.use(express.json())//번역이 필요해서 사용한것
//node의 main을 기준으로 경로 계산해야됨!!! 
mybatisMapper.createMapper(['./mapper/introduceSql.xml'])
var format = { language : 'sql', indent : '  '}


router.post('/', (req, res, next) =>{ 
    var params = req.body;//받은것
    var query = mybatisMapper.getStatement(
    params.mapper, params.mapper_id, params, format );

    pool.getConnection(function(err, connection) {
        if(err) console.log("DB접속불가:" +err)

        connection.query(
            query,//query 가 인설트인지 셀렐트인지 받는 것
            (error, result) => {
                if(error) throw error;
                if(req.body.crud == 'select'){
                    res.send(result)
                }else{
                    res.send("succ")
                }
                
            })       
        connection.release(); 
    }) 
})

module.exports = router