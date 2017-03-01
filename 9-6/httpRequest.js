 var http=require("http");
 var querystring=require("querystring");
 http.createServer(function(req,res){
 	console.log("请求到来。开始解析");
 	var post="";
 	req.on("data",function(chunk){
 		post+=chunk;
 	});
 	req.on("end",function(){
 		post=querystring.parse(post);
 		//解析完成
 		console.log("参数解析完成，返回name参数");
 		res.end(post);
 	})
 }).listen(3000);

 //客户端请求
 var contents=querystring.stringify({
 	name:"sam",
 	age:21,
 	address:"chongqing"
 });

 var options={
 	host:"localhost",
 	path:"/",
 	port:3000,
 	method:"post",
 	headers:{
 		"Content-type":"application/x-www-form-urlencode",
 		"Content-length":contents.length
 	}
 };

 var req=http.request(options,function(res){
 	res.setEncoding("utf-8");
 	res.on("data",function(data){
 		console.log("houtai后台返回数据");
 		console.log(data);
 	})
 });
 req.write(contents);
 req.end();