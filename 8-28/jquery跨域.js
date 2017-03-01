 jQuery Ajax 简单的实现跨域请求

html 代码清单：
[html] view plain copy 在CODE上查看代码片派生到我的代码片
<script type="text/javascript" src="http://www.youxiaju.com/js/jquery-1.4.2.min.js"></script>  
<script type="text/javascript">  
$(function(){  
$.ajax(  
    {  
        type:'get',  
        url : 'http://www.youxiaju.com/validate.php?loginuser=lee&loginpass=123456',  
        dataType : 'jsonp',  
        jsonp:"jsoncallback",  
        success  : function(data) {  
            alert("用户名："+ data.user +" 密码："+ data.pass);  
        },  
        error : function() {  
            alert('fail');  
        }  
    }  
);  
})  
</script>  

服务端 validate.php 代码清单：
[php] view plain copy 在CODE上查看代码片派生到我的代码片
<?php  
header('Content-Type:text/html;Charset=utf-8');  
$arr = array(  
    "user" => $_GET['loginuser'],  
    "pass" => $_GET['loginpass'],  
    "name" => 'response'  
  
);  
echo $_GET['jsoncallback'] . "(".json_encode($arr).")"; 



AJAX 跨域请求 - JSONP获取JSON数据

博客分类： Javascript /Jquery / Bootstrap / Web
 
Asynchronous JavaScript and XML (Ajax ) 是驱动新一代 Web 站点（流行术语为 Web 2.0 站点）的关键技术。Ajax 允许在不干扰 Web 应用程序的显示和行为的情况下在后台进行数据检索。使用 XMLHttpRequest 函数获取数据，它是一种 API，允许客户端 JavaScript 通过 HTTP 连接到远程服务器。Ajax 也是许多 mashup 的驱动力，它可将来自多个地方的内容集成为单一 Web 应用程序。
 
不过，由于受到浏览器的限制，该方法不允许跨域通信。如果尝试从不同的域请求数据，会出现安全错误。如果能控制数 据驻留的远程服务器并且每个请求都前往同一域，就可以避免这些安全错误。但是，如果仅停留在自己的服务器上，Web 应用程序还有什么用处呢？如果需要从多个第三方服务器收集数据时，又该怎么办？
 
理解同源策略限制
同源策略阻止从一个域上加载的脚本获取或操作另一个域上的文档属性。也就是说，受到请求的 URL 的域必须与当前 Web 页面的域相同。这意味着浏览器隔离来自不同源的内容，以防止它们之间的操作。这个浏览器策略很旧，从 Netscape Navigator 2.0 版本开始就存在。
 
克服该限制的一个相对简单的方法是让 Web 页面向它源自的 Web 服务器请求数据，并且让 Web 服务器像代理一样将请求转发给真正的第三方服务器。尽管该技术获得了普遍使用，但它是不可伸缩的。另一种方式是使用框架要素在当前 Web 页面中创建新区域，并且使用 GET 请求获取任何第三方资源。不过，获取资源后，框架中的内容会受到同源策略的限制。
 
克服该限制更理想方法是在 Web 页面中插入动态脚本元素，该页面源指向其他域中的服务 URL 并且在自身脚本中获取数据。脚本加载时它开始执行。该方法是可行的，因为同源策略不阻止动态脚本插入，并且将脚本看作是从提供 Web 页面的域上加载的。但如果该脚本尝试从另一个域上加载文档，就不会成功。幸运的是，通过添加 JavaScript Object Notation (JSON) 可以改进该技术。
 
1、什么是JSONP？
 
要了解JSONP，不得不提一下JSON，那么什么是JSON ？
JSON is a subset of the object literal notation of JavaScript. Since JSON is a subset of JavaScript, it can be used in the language with no muss or fuss.
JSONP(JSON with Padding)是一个非官方的协议，它允许在服务器端集成Script tags返回至客户端，通过javascript callback的形式实现跨域访问（这仅仅是JSONP简单的实现形式）。
 
2、JSONP有什么用？
由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源，为了实现跨域请求，可以通过script标签实现跨域请求，然后在服务端输出JSON数据并执行回调函数，从而解决了跨域的数据请求。
 
3、如何使用JSONP？
下边这一DEMO实际上是JSONP的简单表现形式，在客户端声明回调函数之后，客户端通过script标签向服务器跨域请求数据，然后服务端返回相应的数据并动态执行回调函数。
 
HTML代码 （任一 ）：
 
Html代码  收藏代码
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />  
<script type="text/javascript">  
    function jsonpCallback(result) {  
        //alert(result);  
        for(var i in result) {  
            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        }  
    }  
    var JSONP=document.createElement("script");  
    JSONP.type="text/javascript";  
    JSONP.src="http://crossdomain.com/services.php?callback=jsonpCallback";  
    document.getElementsByTagName("head")[0].appendChild(JSONP);  
</script>  
 
或者
 
Html代码  收藏代码
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />  
<script type="text/javascript">  
    function jsonpCallback(result) {  
        alert(result.a);  
        alert(result.b);  
        alert(result.c);  
        for(var i in result) {  
            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        }  
    }  
</script>  
<script type="text/javascript" src="http://crossdomain.com/services.php?callback=jsonpCallback"></script>  
 
JavaScript的链接，必须在function的下面。
 
服务端PHP代码 （services.php）：
 
Php代码  收藏代码
<?php  
  
//服务端返回JSON数据  
$arr=array('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);  
$result=json_encode($arr);  
//echo $_GET['callback'].'("Hello,World!")';  
//echo $_GET['callback']."($result)";  
//动态执行回调函数  
$callback=$_GET['callback'];  
echo $callback."($result)";  
 
如果将上述JS客户端代码用jQuery的方法来实现，也非常简单。
 
$.getJSON
$.ajax
$.get
 
客户端JS代码在jQuery中的实现方式1：
 
Js代码  收藏代码
<script type="text/javascript" src="jquery.js"></script>  
<script type="text/javascript">  
    $.getJSON("http://crossdomain.com/services.php?callback=?",  
    function(result) {  
        for(var i in result) {  
            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        }  
    });  
</script>  
 
客户端JS代码在jQuery中的实现方式2：
 
Js代码  收藏代码
<script type="text/javascript" src="jquery.js"></script>  
<script type="text/javascript">  
    $.ajax({  
        url:"http://crossdomain.com/services.php",  
        dataType:'jsonp',  
        data:'',  
        jsonp:'callback',  
        success:function(result) {  
            for(var i in result) {  
                alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
            }  
        },  
        timeout:3000  
    });  
</script>  
 
客户端JS代码在jQuery中的实现方式3：
 
Js代码  收藏代码
<script type="text/javascript" src="jquery.js"></script>  
<script type="text/javascript">  
    $.get('http://crossdomain.com/services.php?callback=?', {name: encodeURIComponent('tester')}, function (json) { for(var i in json) alert(i+":"+json[i]); }, 'jsonp');  
</script>  
 
其中 jsonCallback 是客户端注册的，获取 跨域服务器 上的json数据 后，回调的函数。
http://crossdomain.com/services.php?callback=jsonpCallback
这个 url 是跨域服务 器取 json 数据的接口，参数为回调函数的名字，返回的格式为
 
Js代码  收藏代码
jsonpCallback({msg:'this is json data'})  
 
Jsonp原理： 
首先在客户端注册一个callback, 然后把callback的名字传给服务器。

此时，服务器先生成 json 数据。
然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp.

最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。

客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里.（动态执行回调函数）

使用JSON的优点在于：
比XML轻了很多，没有那么多冗余的东西。
JSON也是具有很好的可读性的，但是通常返回的都是压缩过后的。不像XML这样的浏览器可以直接显示，浏览器对于JSON的格式化的显示就需要借助一些插件了。
在JavaScript中处理JSON很简单。
其他语言例如PHP对于JSON的支持也不错。
JSON也有一些劣势：
JSON在服务端语言的支持不像XML那么广泛，不过JSON.org上提供很多语言的库。
如果你使用eval()来解析的话，会容易出现安全问题。
尽管如此，JSON的优点还是很明显的。他是Ajax数据交互的很理想的数据格式。
 
主要提示：
JSONP 是构建 mashup 的强大技术，但不幸的是，它并不是所有跨域通信需求的万灵药。它有一些缺陷，在提交开发资源之前必须认真考虑它们。
 
第一，也是最重要的一点，没有关于 JSONP 调用的错误处理。如果动态脚本插入有效，就执行调用；如果无效，就静默失败。失败是没有任何提示的。例如，不能从服务器捕捉到 404 错误，也不能取消或重新开始请求。不过，等待一段时间还没有响应的话，就不用理它了。（未来的 jQuery 版本可能有终止 JSONP 请求的特性）。
 
JSONP 的另一个主要缺陷是被不信任的服务使用时会很危险。因为 JSONP 服务返回打包在函数调用中的 JSON 响应，而函数调用是由浏览器执行的，这使宿主 Web 应用程序更容易受到各类攻击。如果打算使用 JSONP 服务，了解它能造成的威胁非常重要