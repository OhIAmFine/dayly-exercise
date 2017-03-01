二进制数组

ArrayBuffer对象
TypedArray视图
复合视图
DataView视图
二进制数组的应用
二进制数组（ArrayBuffer对象、TypedArray视图和DataView视图）是JavaScript操作二进制数据的一个接口。这些对象早就存在，属于独立的规格（2011年2月发布），ES6将它们纳入了ECMAScript规格，并且增加了新的方法。

这个接口的原始设计目的，与WebGL项目有关。所谓WebGL，就是指浏览器与显卡之间的通信接口，为了满足JavaScript与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个32位整数，两端的JavaScript脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像C语言那样，直接操作字节，将4个字节的32位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。

二进制数组就是在这种背景下诞生的。它很像C语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了JavaScript处理二进制数据的能力，使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信。

二进制数组由三类对象组成。

（1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

（2）TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。

（3）DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。

简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。

TypedArray视图支持的数据类型一共有9种（DataView视图支持除Uint8C以外的其他8种）。

数据类型	字节长度	含义	对应的C语言类型
Int8	1	8位带符号整数	signed char
Uint8	1	8位不带符号整数	unsigned char
Uint8C	1	8位不带符号整数（自动过滤溢出）	unsigned char
Int16	2	16位带符号整数	short
Uint16	2	16位不带符号整数	unsigned short
Int32	4	32位带符号整数	int
Uint32	4	32位不带符号的整数	unsigned int
Float32	4	32位浮点数	float
Float64	8	64位浮点数	double
注意，二进制数组并不是真正的数组，而是类似数组的对象。

很多浏览器操作的API，用到了二进制数组操作二进制数据，下面是其中的几个。

File API
XMLHttpRequest
Fetch API
Canvas
WebSockets
ArrayBuffer对象
概述
ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

var buf = new ArrayBuffer(32);
上面代码生成了一段32字节的内存区域，每个字节的值默认都是0。可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。

为了读写这段内容，需要为它指定视图。DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。

var buf = new ArrayBuffer(32);
var dataView = new DataView(buf);
dataView.getUint8(0) // 0
上面代码对一段32字节的内存，建立DataView视图，然后以不带符号的8位整数格式，读取第一个元素，结果得到0，因为原始内存的ArrayBuffer对象，默认所有位都是0。

另一种TypedArray视图，与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。

var buffer = new ArrayBuffer(12);

var x1 = new Int32Array(buffer);
x1[0] = 1;
var x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2
上面代码对同一段内存，分别建立两种视图：32位带符号整数（Int32Array构造函数）和8位不带符号整数（Uint8Array构造函数）。由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图。

TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的ArrayBuffer实例，并同时完成对这段内存的赋值。

var typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]
上面代码使用TypedArray视图的Uint8Array构造函数，新建一个不带符号的8位整数视图。可以看到，Uint8Array直接使用普通数组作为参数，对底层内存的赋值同时完成。

ArrayBuffer.prototype.byteLength
ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度。

var buffer = new ArrayBuffer(32);
buffer.byteLength
// 32
如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。

if (buffer.byteLength === n) {
  // 成功
} else {
  // 失败
}
ArrayBuffer.prototype.slice()
ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。

var buffer = new ArrayBuffer(8);
var newBuffer = buffer.slice(0, 3);
上面代码拷贝buffer对象的前3个字节（从0开始，到第3个字节前面结束），生成一个新的ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。

slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。

ArrayBuffer.isView()
ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。

var buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

var v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true
TypedArray视图
概述
ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。ArrayBuffer有两种视图，一种是TypedArray视图，另一种是DataView视图。前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

目前，TypedArray视图一共包括9种类型，每一种视图都是一种构造函数。

Int8Array：8位有符号整数，长度1个字节。
Uint8Array：8位无符号整数，长度1个字节。
Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
Int16Array：16位有符号整数，长度2个字节。
Uint16Array：16位无符号整数，长度2个字节。
Int32Array：32位有符号整数，长度4个字节。
Uint32Array：32位无符号整数，长度4个字节。
Float32Array：32位浮点数，长度4个字节。
Float64Array：64位浮点数，长度8个字节。
这9个构造函数生成的数组，统称为TypedArray视图。它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。普通数组与TypedArray数组的差异主要在以下方面。

TypedArray数组的所有成员，都是同一种类型。
TypedArray数组的成员是连续的，不会有空位。
TypedArray数组成员的默认值为0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是10个空位；new Uint8Array(10)返回一个TypedArray数组，里面10个成员都是0。
TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。
构造函数
TypedArray数组提供9种构造函数，用来生成相应类型的数组实例。

构造函数有多种用法。

（1）TypedArray(buffer, byteOffset=0, length?)

同一个ArrayBuffer对象之上，可以根据不同的数据类型，建立多个视图。

// 创建一个8字节的ArrayBuffer
var b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
var v1 = new Int32Array(b);

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
var v2 = new Uint8Array(b, 2);

// 创建一个指向b的Int16视图，开始于字节2，长度为2
var v3 = new Int16Array(b, 2, 2);
上面代码在一段长度为8个字节的内存（b）之上，生成了三个视图：v1、v2和v3。

视图的构造函数可以接受三个参数：

第一个参数（必需）：视图对应的底层ArrayBuffer对象。
第二个参数（可选）：视图开始的字节序号，默认从0开始。
第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。
因此，v1、v2和v3是重叠的：v1[0]是一个32位整数，指向字节0～字节3；v2[0]是一个8位无符号整数，指向字节2；v3[0]是一个16位整数，指向字节2～字节3。只要任何一个视图对内存有所修改，就会在另外两个视图上反应出来。

注意，byteOffset必须与所要建立的数据类型一致，否则会报错。

var buffer = new ArrayBuffer(8);
var i16 = new Int16Array(buffer, 1);
// Uncaught RangeError: start offset of Int16Array should be a multiple of 2
上面代码中，新生成一个8个字节的ArrayBuffer对象，然后在这个对象的第一个字节，建立带符号的16位整数视图，结果报错。因为，带符号的16位整数需要两个字节，所以byteOffset参数必须能够被2整除。

如果想从任意字节开始解读ArrayBuffer对象，必须使用DataView视图，因为TypedArray视图只提供9种固定的解读格式。

（2）TypedArray(length)

视图还可以不通过ArrayBuffer对象，直接分配内存而生成。

var f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];
上面代码生成一个8个成员的Float64Array数组（共64字节），然后依次对每个成员赋值。这时，视图构造函数的参数就是成员的个数。可以看到，视图数组的赋值操作与普通数组的操作毫无两样。

（3）TypedArray(typedArray)

TypedArray数组的构造函数，可以接受另一个TypedArray实例作为参数。

var typedArray = new Int8Array(new Uint8Array(4));
上面代码中，Int8Array构造函数接受一个Uint8Array实例作为参数。

注意，此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的。新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图。

var x = new Int8Array([1, 1]);
var y = new Int8Array(x);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 1
上面代码中，数组y是以数组x为模板而生成的，当x变动的时候，y并没有变动。

如果想基于同一段内存，构造不同的视图，可以采用下面的写法。

var x = new Int8Array([1, 1]);
var y = new Int8Array(x.buffer);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 2
（4）TypedArray(arrayLikeObject)

构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。

var typedArray = new Uint8Array([1, 2, 3, 4]);
注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。

上面代码从一个普通的数组，生成一个8位无符号整数的TypedArray实例。

TypedArray数组也可以转换回普通数组。

var normalArray = Array.prototype.slice.call(typedArray);
数组方法
普通数组的操作方法和属性，对TypedArray数组完全适用。

TypedArray.prototype.copyWithin(target, start[, end = this.length])
TypedArray.prototype.entries()
TypedArray.prototype.every(callbackfn, thisArg?)
TypedArray.prototype.fill(value, start=0, end=this.length)
TypedArray.prototype.filter(callbackfn, thisArg?)
TypedArray.prototype.find(predicate, thisArg?)
TypedArray.prototype.findIndex(predicate, thisArg?)
TypedArray.prototype.forEach(callbackfn, thisArg?)
TypedArray.prototype.indexOf(searchElement, fromIndex=0)
TypedArray.prototype.join(separator)
TypedArray.prototype.keys()
TypedArray.prototype.lastIndexOf(searchElement, fromIndex?)
TypedArray.prototype.map(callbackfn, thisArg?)
TypedArray.prototype.reduce(callbackfn, initialValue?)
TypedArray.prototype.reduceRight(callbackfn, initialValue?)
TypedArray.prototype.reverse()
TypedArray.prototype.slice(start=0, end=this.length)
TypedArray.prototype.some(callbackfn, thisArg?)
TypedArray.prototype.sort(comparefn)
TypedArray.prototype.toLocaleString(reserved1?, reserved2?)
TypedArray.prototype.toString()
TypedArray.prototype.values()
上面所有方法的用法，请参阅数组方法的介绍，这里不再重复了。

注意，TypedArray数组没有concat方法。如果想要合并多个TypedArray数组，可以用下面这个函数。

function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4))
// Uint8Array [1, 2, 3, 4]
另外，TypedArray数组与普通数组一样，部署了Iterator接口，所以可以被遍历。

let ui8 = Uint8Array.of(0, 1, 2);
for (let byte of ui8) {
  console.log(byte);
}
// 0
// 1
// 2
字节序
字节序指的是数值在内存中的表示方式。

var buffer = new ArrayBuffer(16);
var int32View = new Int32Array(buffer);

for (var i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}
上面代码生成一个16字节的ArrayBuffer对象，然后在它的基础上，建立了一个32位整数的视图。由于每个32位整数占据4个字节，所以一共可以写入4个整数，依次为0，2，4，6。

如果在这段数据上接着建立一个16位整数的视图，则可以读出完全不一样的结果。

var int16View = new Int16Array(buffer);

for (var i = 0; i < int16View.length; i++) {
  console.log("Entry " + i + ": " + int16View[i]);
}
// Entry 0: 0
// Entry 1: 0
// Entry 2: 2
// Entry 3: 0
// Entry 4: 4
// Entry 5: 0
// Entry 6: 6
// Entry 7: 0
由于每个16位整数占据2个字节，所以整个ArrayBuffer对象现在分成8段。然后，由于x86体系的计算机都采用小端字节序（little endian），相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址，所以就得到了上面的结果。

比如，一个占据四个字节的16进制数0x12345678，决定其大小的最重要的字节是“12”，最不重要的是“78”。小端字节序将最不重要的字节排在前面，储存顺序就是78563412；大端字节序则完全相反，将最重要的字节排在前面，储存顺序就是12345678。目前，所有个人电脑几乎都是小端字节序，所以TypedArray数组内部也采用小端字节序读写数据，或者更准确的说，按照本机操作系统设定的字节序读写数据。

这并不意味大端字节序不重要，事实上，很多网络设备和特定的操作系统采用的是大端字节序。这就带来一个严重的问题：如果一段数据是大端字节序，TypedArray数组将无法正确解析，因为它只能处理小端字节序！为了解决这个问题，JavaScript引入DataView对象，可以设定字节序，下文会详细介绍。

下面是另一个例子。

// 假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
var buffer = new ArrayBuffer(4);
var v1 = new Uint8Array(buffer);
v1[0] = 2;
v1[1] = 1;
v1[2] = 3;
v1[3] = 7;

var uInt16View = new Uint16Array(buffer);

// 计算机采用小端字节序
// 所以头两个字节等于258
if (uInt16View[0] === 258) {
  console.log('OK'); // "OK"
}

// 赋值运算
uInt16View[0] = 255;    // 字节变为[0xFF, 0x00, 0x03, 0x07]
uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]
下面的函数可以用来判断，当前视图是小端字节序，还是大端字节序。

const BIG_ENDIAN = Symbol('BIG_ENDIAN');
const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

function getPlatformEndianness() {
  let arr32 = Uint32Array.of(0x12345678);
  let arr8 = new Uint8Array(arr32.buffer);
  switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
    case 0x12345678:
      return BIG_ENDIAN;
    case 0x78563412:
      return LITTLE_ENDIAN;
    default:
      throw new Error('Unknown endianness');
  }
}
总之，与普通数组相比，TypedArray数组的最大优点就是可以直接操作内存，不需要数据类型转换，所以速度快得多。

