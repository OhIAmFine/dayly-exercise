var http=require('http');
var server=http.createServer(function(req,res){
	res.writeHead(200,{"Content-type":"text/html"});
	res.write("<p> i am a p </p>");
	res.end("<p>ahahah</p>")
});
server.listen(3000);
console.log("server is starting");
server.on("close",function(){
	console.log("server is closed");
})	;
server.close();