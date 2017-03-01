var http=require("http");
http.createServer(function(req,res){
	res.writeHead(200,{"Content-Type":"text-plain"});
	res.end("helloworld\n");
}).listen(1334,"127.0.0.1");
console.log("Server running");
var options={
	hostname:"127.0.0.1",
	port:1334,
	path:"/",
	method:"GET"
};
// var http=require("http");
var req=http.request(options,function(res){
	console.log("status:"+res.statusCode);
	console.log("headers:"+JSON.stringify(res.headers));
	res.setEncoding("utf-8");
	res.on("data",function(chunk){
		console.log(chunk);
	});
});
req.end();

