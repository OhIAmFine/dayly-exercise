JSON字符串:
var str1 = '{ "name": "cxh", "sex": "man" }'; 
JSON对象:
var str2 = { "name": "cxh", "sex": "man" };
一、JSON字符串转换为JSON对象
要使用上面的str1，必须使用下面的方法先转化为JSON对象：
//由JSON字符串转换为JSON对象
var obj = eval('(' + str + ')');
或者
var obj = str.parseJSON(); //由JSON字符串转换为JSON对象
或者
var obj = JSON.parse(str); //由JSON字符串转换为JSON对象
然后，就可以这样读取：
Alert(obj.name);
Alert(obj.sex);
特别注意：如果obj本来就是一个JSON对象，那么使用eval（）函数转换后（哪怕是多次转换）还是JSON对象，但是使用parseJSON（）函数处理后会有问题（抛出语法异常）。
二、可以使用toJSONString()或者全局方法JSON.stringify()将JSON对象转化为JSON字符串。
例如：
var last=obj.toJSONString(); //将JSON对象转化为JSON字符
或者
var last=JSON.stringify(obj); //将JSON对象转化为JSON字符
alert(last);
注意：
上面的几个方法中，除了eval()函数是js自带的之外，其他的几个方法都来自json.js包。新版本的 JSON 修改了 API，将 JSON.stringify() 和 JSON.parse() 两个方法都注入到了 Javascript 的内建对象里面，前者变成了 Object.toJSONString()，而后者变成了 String.parseJSON()。如果提示找不到toJSONString()和parseJSON()方法，则说明您的json包版本太低。