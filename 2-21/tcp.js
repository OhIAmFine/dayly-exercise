var net=require("net");
var server=net.createServer(function(socket){
	socket.on("data",function(){
		socket.write("i know who you are");
	});
	socket.on("end",function(){
		console.log("connection lost");
	});
	socket.write("welcome tcp server");
});
server.listen(8124,function(){
	console.log("server bound");
});
// server.listen("/tmp/echo.sock");
// var server=net.createServer();
// server.on("connection",function(socket){
	//新的连接
// });
// server.listen(8124);