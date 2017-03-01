var options={
	hostname:"127.0.0.1",
	port:1334,
	path:"/",
	method:"GET"
};
var http=require("http");
var req=http.request(options,function(res){
	console.log("status:"+res.statusCode);
	console.log("headers:"+JSON.stringify(res.headers));
	res.setEncoding("utf-8");
	res.on("data",function(chunk){
		console.log(chunk);
	});
});
req.end();