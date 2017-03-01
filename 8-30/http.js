var http=require("http");
console.log("Start http ")
http.createServer(function(req,res){
	console.log(req.url);
	res.writeHead(200,{"Content-type":"text/html"});
	res.write("<p>This is a http server</p>");
	res.end("<p>Thank you watching</p>");
}).listen(3000);