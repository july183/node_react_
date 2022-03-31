var express = require('express')
var router = express.Router();

var normalpage = require('../routes/normal')
var awssql = require('./awssql')

router.use(express.urlencoded({ extended : true }))
//리액트에서 비동기로 요청시
router.post('/', (req, res, next) =>{   
   var sqlsideis = req.query.type; //localhost:3000/prointerview?type=list 
   if( sqlsideis == 'aws'){
       // localhost:3000/prointerview?type=aws
          req.body.mapper = "introduceSql" //mapper namespace로 설정
          req.body.crud = "select" // select, insert, update, delete 중 선택
          req.body.mapper_id = "interview" // sql문 정보를 담고있는 객체의 id

          router.use('/', awssql )
          next('route')
       
   }else if(type == 'write'){ //평범한 라우팅이 이쪽으로 오시오.
        //localhost:3000/prointerview
        req.body.mapper = "introduceSql"
        req.body.crud = "insert"
        req.body.mapper_id = "interviewinsert"

        router.use('/', normalpage )
        next('route')
   }   
})

module.exports = router;