const http = require('http')
const fs = require('fs');

http.createServer((req,res)=> {
    fs.readFile('./server02.html',(err,data)=>{
        if (err){
            throw err;
        }
        res.end(data);
    });
}).listen(8081, ()=> {
    console.log('Waiting at 8081 Port');
})