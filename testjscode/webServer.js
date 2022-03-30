const http = require('http')

const server = http.createServer((req,res)=>{
    res.write('<h1>Hellow World</h1>');
    res.end('<p>Hello Server!</p>');
});
server.listen(8080);
server.on('listening',()=> {
    console.log('Waiting at 8080 port');
});
server.on('error', (error)=> {
    console.error(error);
});
