var app = require('express')(); 

var preinterview = require('./api/preinterview')


app.use('/prointerview', preinterview);

app.set('port',8080)
app.get('/', (req, res) =>{  res.send(' / 루트요청 있었음'); })
app.listen(app.get('port'), () =>{
    console.log('콘솔에서 시간으로 확인해보면 바로 알게됨');
})