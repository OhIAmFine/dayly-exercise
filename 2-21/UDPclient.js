var dgram=require("dgram");
var message=new Buffer("我爱学习");
var client=dgram.createSocket("udp4");
client.send(message,0,message.length,41234,"localhost",function(err,byte){
	client.close();
});