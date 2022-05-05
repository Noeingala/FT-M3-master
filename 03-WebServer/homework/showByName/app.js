var fs  = require("fs")
var http  = require("http")

http.createServer(function (req, res){
        fs.readFile(`${__dirname}/images/${req.url}.jpg`, function(err, data){
            if(err){ 
                res.writeHead(404, {'content-type':'text/plain'})
                res.end('Hubo un error')
            } else { 
                res.writeHead(200, {'content-type':'image/jpg'})
                res.end(data)}
        })
}).listen(3020, '127.0.0.1');
