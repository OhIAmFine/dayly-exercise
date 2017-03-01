var dgram=require("dgram");
var server=dgram.createSocket("udp4");
server.on("message",function(msg,info){
	console.log("server got "+msg+"form:"+info.address+":"+info.port);

});
server.on("listening",function(){
	var address=server.address();
	console.log("server listeing"+address.address+":"+address.port);
});
server.bind(41234);