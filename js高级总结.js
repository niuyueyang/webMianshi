//5种基本数据类型
/*
* String
* Number
* boolean
* undefined
* null
* */

//事件委托是什么
/*答案: 利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行！*/

//ie:阻止冒泡ev.cancelBubble = true;非IE ev.stopPropagation();

//如何阻止默认事件
/*(1)return false；(2) ev.preventDefault();*/

// 添加 删除 替换 插入到某个接点的方法
/*答案：
1）创建新节点
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点

2）添加、移除、替换、插入
appendChild()      //添加
removeChild()      //移除
replaceChild()      //替换
insertBefore()      //插入

3）查找
getElementsByTagName()    //通过标签名称
getElementsByName()     //通过元素的Name属性的值
getElementById()        //通过元素Id，唯一性
---------------------*/

// 字符串有哪些原生方法，列举一下？
// charAt()	返回在指定位置的字符。
// charCodeAt()	返回在指定的位置的字符的 Unicode 编码。
// concat()	连接字符串。
// indexOf()	检索字符串。
// match()	找到一个或多个正则表达式的匹配。
// replace()	替换与正则表达式匹配的子串。
// search()	检索与正则表达式相匹配的值。
// slice()	提取字符串的片断，并在新的字符串中返回被提取的部分。
// split()	把字符串分割为字符串数组。
// toLocaleLowerCase()	把字符串转换为小写。
// toLocaleUpperCase()	把字符串转换为大写。
// toLowerCase()	把字符串转换为小写。
// toUpperCase()	把字符串转换为大写。
// substr()	从起始索引号提取字符串中指定数目的字符。
// substring()	提取字符串中两个指定的索引号之间的字符。

//cookie localStorage sessionStorage
/*cookie 有它致命的缺点：
存储量太小，只有 4KB
所有 HTTP 请求都带着，会影响获取资源的效率
API 简单，需要封装才能用
所有的api请求都会携带cookie，所以cookie不太安全，使用的时候一般都需要做加密处理*/

/*
* 存储量增大到 5MB，不会带到 HTTP 请求中
*/

/*总结前端性能优化的解决方案

优化原则和方向
性能优化的原则是以更好的用户体验为标准，具体就是实现下面的目标：
多使用内存、缓存或者其他方法
减少 CPU 和GPU 计算，更快展现



优化的方向有两个：
减少页面体积，提升网络加载
优化页面渲染


减少页面体积，提升网络加载
静态资源的压缩合并（JS 代码压缩合并、CSS 代码压缩合并、雪碧图）
静态资源缓存（资源名称加 MD5 戳）
使用 CDN 让资源加载更快*/

/*优化页面渲染
CSS 放前面，JS 放后面
懒加载（图片懒加载、下拉加载更多）
减少DOM 查询，对 DOM 查询做缓存
减少DOM 操作，多个操作尽量合并在一起执行（DocumentFragment）
事件节流
尽早执行操作（DOMContentLoaded）
使用 SSR 后端渲染，数据直接输出到 HTML 中，减少浏览器使用 JS 模板渲染页面 HTML 的时间*/



// 图片懒加载与预加载
// 图片懒加载的原理就是暂时不设置图片的src属性，而是将图片的url隐藏起来，比如先写在data-src里面，
// 等某些事件触发的时候(比如滚动到底部，点击加载图片)再将图片真实的url放进src属性里面，从而实现图片的延迟加载

// 图片预加载是指在一些需要展示大量图片的网站，实现图片的提前加载。从而提升用户体验。常用的方式有两种，
// 一种是隐藏在css的background的url属性里面，一种是通过javascript的Image对象设置实例对象的src属性实现图片的预加载。相关代码如下：

//CSS预加载图片方式：
/*#preload-01 { background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px; }  
#preload-02 { background: url(http://domain.tld/image-02.png) no-repeat -9999px -9999px; }  
#preload-03 { background: url(http://domain.tld/image-03.png) no-repeat -9999px -9999px; }*/
// Javascript预加载图片的方式：
function preloadImg(url) {
  var img = new Image();
  img.src = url;
  if(img.complete) {
    //接下来可以使用图片了
    //do something here
  } else {
    img.onload = function() {
      //接下来可以使用图片了
      //do something here
    };
  }
}

/*浏览器的渲染过程：
解析HTML构建 DOM(DOM树)，并行请求 css/image/js
CSS 文件下载完成，开始构建 CSSOM(CSS树)
CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)
布局(Layout)：计算出每个节点在屏幕中的位置
显示(Painting)：通过显卡把页面画到屏幕上
DOM树 和 渲染树 的区别：
DOM树与HTML标签一一对应，包括head和隐藏元素
渲染树不包括head和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的css属性*/

/*重绘和回流（重排）的区别和关系？
重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流

注意：JS获取Layout属性值（如：offsetLeft、scrollTop、getComputedStyle等）也会引起回流。因为浏览器需要通过回流计算最新值
回流必将引起重绘，而重绘不一定会引起回流*/

//如何最小化重绘(repaint)和回流(reflow)？

/*需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
需要创建多个DOM节点时，使用DocumentFragment创建完后一次性的加入document
缓存Layout属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
尽量避免用table布局（table元素一旦触发回流就会导致table里所有的其它元素回流）
避免使用css表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx*/








//解释jsonp的原理，以及为什么不是真正的ajax
/*答案：动态创建script标签，回调函数
Ajax是页面无刷新请求数据操作*/

//”==”和“===”的不同
//
// 答案：前者会自动转换类型,再判断是否相等
// 后者不会自动类型转换，直接去比较

// 对作用域上下文和this的理解，看下列代码：
var User = {
  count: 1,
  getCount: function() {
    return this.count;
  }
};
console.log(User.getCount()); // what?
var func = User.getCount;
console.log(func()); // what?
/*问两处console输出什么？为什么？
答案:是1和undefined。
func是在window的上下文中被执行的，所以不会访问到count属性。
*/

//当一个DOM节点被点击时候，我们希望能够执行一个函数，应该怎么做?
  box.onlick= function(){}

  box.addEventListener("click",function(){},false);
/*<button onclick="xxx()"></button>*/

//javaScript的2种变量范围有什么不同？
// 全局变量：当前页面内有效
// 局部变量：函数方法内有效

// js延迟加载的方式有哪些？
// defer和async、动态创建DOM方式（创建script，插入到DOM中，加载完毕后callBack）、按需异步载入js

//希望获取到页面中所有的checkbox怎么做？(不使用第三方框架)
var inputs = document.getElementsByTagName("input");//获取所有的input标签对象
var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
for(var i=0;i<inputs.length;i++){
  var obj = inputs[i];
  if(obj.type=='checkbox'){
    checkboxArray.push(obj);
  }
}

//如何获取javascript三个数中的最大值和最小值？
Math.max(a,b,c);//最大值
Math.min(a,b,c)//最小值

//readonly不可编辑，但可以选择和复制；值可以传递到后台
//disabled不能编辑，不能复制，不能选择；值不可以传递到后台

var uname = 'jack'
function change() {
  alert(uname) // ?
  var uname = 'lily'
  alert(uname)  //?
}
change()
//分别alert出 undefined，lily，（变量声明提前问题）

//可视区域距离页面顶部的距离
scrollTop=document.documentElement.scrollTop||document.body.scrollTop

//可视区的大小：
//(1)innerXXX（不兼容ie）
window.innerHeight //可视区高度，包含滚动条宽度
window.innerWidth  //可视区宽度，包含滚动条宽度
//(2)document.documentElement.clientXXX(兼容ie)
document.documentElement.clientWidth//可视区宽度，不包含滚动条宽度
document.documentElement.clientHeight//可视区高度，不包含滚动条宽度

/*节点的种类有几种，分别是什么？
(1)元素节点：nodeType ===1;
(2)文本节点：nodeType ===3;
(3)属性节点：nodeType ===2;*/


/*innerHTML和outerHTML的区别
innerHTML(元素内包含的内容）
outerHTML(自己以及元素内的内容）*/

/*offsetWidth offsetHeight和clientWidth clientHeight的区别
(1)offsetWidth （content宽度+padding宽度+border宽度）
(2)offsetHeight（content高度+padding高度+border高度）
(3)clientWidth（content宽度+padding宽度）
(4)clientHeight（content高度+padding高度）*/

//对象引用类型
/*
* Object ：任意对象
* Function：一种特别的对象
* Array：一种特别的对象
* */

//判断类型
/*
* typeof可以判断undefined、数值、字符串、布尔值、function，但是不能判断null与object object与array
* instanceof 判断对象具体类型，也可以判断函数
* === 可以判断undefined null
* */
typeof(function(){})//function
typeof({})//object
console.log({} instanceof Object) //true
console.log([] instanceof Object) //true
console.log({} instanceof Array) //false
console.log([] instanceof Array) //true
console.log(function a(){} instanceof Function)//true
console.log(function a(){} instanceof Object)//true
null===null //true
undefined===undefined //true

//null与undefined区别
/*
* null定义了并赋值，只是赋值为null
* undefined是仅仅定义，但未赋值
* */

//什么时候赋值为null
/*
* 初始赋值为null，表明将要赋值为对象
* 结束前赋值为null，表示让对象成为垃圾对象，让浏览器回收器回收
* */

//内存分类
/*
* 栈：全局变量/局部变量
* 堆：对象
* */

//内存中操作的目标类型包括数据，算术运算，逻辑运算，赋值，运行函数
//变量由变量名与变量值组成
//每个变量都对应一小块内存，变量名用来查找对应的内存，变量值就是内存中保存的数据

//内存，数据，变量三者之间的关系
/*
* 内存是用来存储数据的空间，变量是内存的标识
* */

//var a=XXX，a内存中保存的是什么
/*
* XXX是基本数据，内存中保存的就是这个数据
* XXX是对象，保存的就是对象的地址值
* XXX是一个变量，保存的是XXX的内存内容（可能是基本数据，也可能是地址值）
* */

//关于引用变量赋值问题
/*
* 两个引用变量指向同一个对象，通过其中一个变量修改对象内部数据，其它所有变量看到的是修改之后的数据
* 两个引用变量指向同一个对象，让其中一个引用变量指向另一个对象，另一个引用变量仍然指向前一个对象
* */
//【实例1】
var obj1={name:'Tom'};
var obj2=obj1;
obj2.age=12;
console.log(obj1.age);//12
function fn(obj){
  obj.name='A';
}
fn(obj1);
console.log(obj2.name); //A

//【实例2】
var a={age:12};
var b=a;
a={name:'BOB',age:13};
b.age=14;
console.log(b.age,a.name,a.age);//14 BOB 13
function fn2(obj){
  obj={age:15}
}
fn2(a);
console.log(a.age); //13【此时函数内部对象就成了垃圾对象，无法对外部产生影响】

//拷贝数据
/*
* 基本数据类型：拷贝后会生成一份新的数据，修改拷贝之后的数据不会对之前数据产生影响
* 对象/数组：拷贝后不会生成新的数据，而是拷贝引用，修改拷贝后的数据会影响原来的数据
* */

//拷贝数据方法
/*
* 直接赋值给一个变量
* Object.assign() //浅拷贝
* Array.prototype.concat() //浅拷贝
* Array.prototype.slice() //浅拷贝
* JSON.parse(JSON.stringify()) //深拷贝
* */
//【实例，直接赋值】
let arr1=[1,2,3,{username:'Bob'}];
let arr2=arr1;
arr2[0]=5;
arr2[3].username='ccc';
console.log(arr1);//[5,2,3,{username:'Bob'}];
//实例，Object.assign
var obj1={name:'aaa'};
var obj2=Object.assign(obj1);
obj2.name='bbb';
console.log(obj1); //{name:'bbb'}
//实例 Array.prototype.concat()
var arr3=[1,2,3,{username:'Bob'}];
var arr4=arr3.concat();
arr4[0]=5;
arr4[3].username='ccc';
console.log(arr3,arr4); //[1,2,3,{username:'ccc'}]   [5,2,3,{username:"ccc"}]
//实例 Array.prototype.slice()
var arr3=[1,2,3,{username:'Bob'}];
var arr4=arr3.slice();
arr4[0]=5;
arr4[3].username='ccc';
console.log(arr3,arr4); //[1,2,3,{username:'ccc'}]   [5,2,3,{username:"ccc"}]
//实例JSON.stringify()
var arr3=[1,2,3,{username:'Bob'}];
var arr4=JSON.parse(JSON.stringify(arr3));
arr4[0]=5;
arr4[3].username='ccc';
console.log(arr3,arr4);//[1,2,3,{username:'Bob'}]   [5,2,3,{username:"ccc"}]

//深拷贝函数
function checkType(str){
  return Object.prototype.toString.call(str).slice(8,-1);
}
function clone(arr) {
  let result,type=checkType(arr);
  if(type=='Array'){
    result=[];
  }
  else if(type=='Object'){
    result={};
  }
  else{
    return arr;
  }
  for(var key in arr){
    var val=arr[key];
    if(checkType(val)==='Array'||checkType(val)==='Object'){
      result[key]=clone(val)
    }
    else {
      result[key]=val;
    }
  }
  return result;
}

//以下情况访问对象的属性值必须启用['属性名']
/*
* 属性名包含 - 或者空格
* 属性名不确定
* */

/*函数*/
/*
* function fn1(){}
* var fn1=function(){}
* */

//函数调用方式
/*
* test()
* obj.test();//通过对象调用
* new test(); new 调用
* test.call(obj)
* */

//【实例】
 var obj={}
 function test2(){
   this.xxx='aaa'
 }
 test2.call(obj); //相当于obj.test()，可以让一个函数成为任意一个对象方法进行调用
 console.log(obj.xxx); //aaa

//匿名函数
/*
* 作用：隐藏实现；不会污染外部（全局）命名空间
*
* */
(function () {
  var a=1;
  function test() {
    console.log(++a);
  }
  window.$=function () {
    return {
      test:test
    }
  }
})()
console.log(a);

//es6 Set函数
let arr=[1,2,2,3,4,5,6];
var set=new Set(arr);
var arrs=Array.from(set.add(7));//[1,2,3,4,5,6,7]
var bol=set.delete(6);//true
console.log(set.has(6));//false
var result=Array.from(set);//[1, 2, 3, 4, 5, 7]

//原型
/*
* 每个函数都有一个原型，默认指向一个空对象
* 函数的原型对象中有一个constructor，它指向函数对象 fun.prototype.constructor===fun
* 每个实例对象都有一个__proto__属性（隐式原型）【var fn=new Fn();fn.__proto__】
* 实例对象的隐式原型的值，为其对应的构造函数的显示原型的值
* */

/*
*函数的prototype属性是在定义函数是自动添加的，默认值是一个空的Object对象
* 对象的__proto__属性，是在创建对象时自动添加的，默认值是函数的prototype属性值
* 程序员能直接操作显式原型prototype，在es6之前不能直接操作隐式原型
* */
//【举例】
function fn(){}
console.log(fn.prototype,fn.__proto__)
fn.prototype.test=function () {
  console.log(this)
  console.log(111)
}
console.log(fn.prototype,fn.__proto__)
var p=new fn();
console.log(fn.prototype===p.__proto__)//true
/*
* 定义构造函数
* 创建实例对象
* 对象的隐式原型值与构造函数显式原型的值对应
* 给原型添加方法，通过new之后的实例化对象调用原型的方法
* */

//原型链访问一个对象的属性
/*
先在自身的属性中查找，找到则返回
如果没有，再沿着__proto__这条链向上查找，找到则返回
如果没有找到，则返回undefined
*/

var F = function () {}
Object.prototype.a = function () {}
Function.prototype.b = function () {}
var f = new F()
// 请问f有方法a  方法b吗
//f的__proto__指向F.prototype，F.prototype.__proto__指向Object.prototype，所以f 可以取到a方法，
// 由于f的原型链上没经过Function.prototype，所以取不到b方法。
//由于构造函数F是由Function new出来的，所以F.__proto__指向Function.prototype，所以F函数可以取到b方法。

function Person(){}
let p1 = new Person()
let p2 = new Person()
let obj = {}

/*1，Function.__proto__    ===     Function.prototype
谨记上面的红字部分，每个对象都有__proto__，指向生成该对象的构造函数的原型。 这里Function是一个构造函数，
那么它也是一个函数，既然是函数，那也是由Function这个构造函数生成的，也就是它自己本身，所以它的__proto__就指向它自己的prototype
上面的说法是错误的，这里参考了一位大佬的话语： Function.prototype是引擎创造出来的对象，一开始就有了，
又因为其他的构造函数都可以通过原型链找到Function.prototype，Function本身也是一个构造函数，为了不产生混乱，就将这两个联系到一起了。

2，Object.__proto__  === Function.prototype
Object是对象的构造函数，那么它也是一个函数，当然它的__proto__也是指向Function.prototype*/

//所有函数隐式原型都一样，因为都是通过new Function()产生

//构造函数的实例对象自动拥有构造函数原型对象的属性

//new构造函数过程
/*
js中可以使用new构造函数的方法创建一个新对象，使用这种方式调用构造函数实际上会经历以下步骤：
1、创建一个新对象
2、将构造函数的作用域赋给新对象（this）
3、执行构造函数中的代码（为新对象添加属性）
4、返回该对象。
因此对于一个构造函数即使它的内部语句最后并没有return，也会默认有return this；语句。
* */

/*
* console.log(0==-0); //true
* console.log(NaN==NaN); //false NaN与任何值都不相等
* */


//快速排序算法
function quickSort(arr) {
  if(arr.length<=1){
    return arr;
  }
  var left=[];
  var right=[];
  var i=Math.floor(arr.length/2);
  var middelItem=arr.splice(i,1);
  for(var i=0;i<arr.length;i++){
    if(arr[i]<middelItem[0]){
      left.push(arr[i]);
    }
    else{
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(middelItem,quickSort(right));
}

//冒泡排序算法
function maopao(arr) {
  for(var i=0;i<arr.length-1;i++){
    for(var k=0;k<arr.length-1-i;k++){
      if(arr[k]>arr[k+1]){
        var temp=arr[k];
        arr[k]=arr[k+1];
        arr[k+1]=temp
      }
    }
  }
  return arr;
}

//变量声明提升
/*
* 通过var声明的变量，在定义语句之前就可以访问到，值为undefined
* */

//函数声明提升
/*
* 通过function声明的函数，在之前就可以访问到，值为函数定义的对象
* */

//实例
console.log(a); //undefined
var a=3
fn(); //可以调用，函数声明提升
function fn() {
  console.log(a);  //undefined
  var a=4;
}
fn2(); //不能调用
var fn2=function () {
  console.log('fn2()')
}

//call apply bind区别
/*
* 都能指定函数中this
* call()、apply()是立即调用函数传，apply传入参数只能是数组
* bind()是将函数返回
* */

//bind特点就是，绑定完this不会立即调用当前函数，而是将函数返回

//实例
var obj={username:'aaa'};
function foo(name) {
  console.log(this,name)
}
foo.apply(obj,[33]);//改变this指向，此时this为obj对象,参数只能为数组
foo.call(obj,33);//同上，在未传入参数时，call与apply相同，都能改变this指向
foo.bind(obj,33)() //由于返回一个函数，加上括号，是为了执行函数调用，参数形式与call一样

setTimeout(function () {
  console.log(this)
}.bind(this),1000)

//闭包
/*
* 当一个子函数引用了嵌套在外部父函数的变量时，就产生了闭包
* */

//常见闭包
//将一个函数作为另一个函数返回值
function fn1(){
  var a=1;
  function fn2() {
    a++; //引用了外部函数变量a，产生闭包
    console.log(a)
  }
  return fn2;
}
var f=fn1();
f(); //3
f(); //4

//将一个函数作为另一个函数实参
function showDelay(msg,time){
  setTimeout(function () {
    alert(msg); //引用了外部函数变量msg，产生闭包
  },time)
}
showDelay('hello',2000);

//闭包作用
/*闭包就是能够读取其他函数内部变量的函数,使得函数不被GC回收，如果过多使用闭包，容易导致内存泄露*/
/*
* 1.使用函数内部变量，在函数执行完之后，仍然存在于内存中（延长了局部变量生命周期）
* 2.让函数外部可以操作函数内部数据（变量，函数）
* */

//闭包应用
// 同一个闭包机制可以创建多个闭包函数出来，它们彼此没有联系，都是独立的。
// 并且每个闭包函数可以保存自己个性化的信息。
// 看下代码，理解下三个闭包彼此独立、没有联系：

  function f1(num){
    function f2(){
      alert('数字:'+num);
    }
    return f2;
  }
var fa = f1(10);
var fb = f1(20);
var fc = f1(30);
fa();   //数字:10
fb();   //数字:20
fc();   //数字:30



(function (window) {
  var msg='my Hello';
  function f1() {
    console.log(msg.toUpperCase());
  }
  function f2() {
    console.log(msg.toLowerCase());
  }
  window.module={
    f1:f1,
    f2:f2
  }
})(window)
module.f1();
module.f2();

//f()abc f1()aaa aaa
var msg=null;
function f() {
  msg='abc';
  function f1(){
    msg='aaa'
    console.log('f1()'+msg)
  }
  console.log('f()'+msg)
  return f1;
}
var p=f();
p();
console.log(msg);

//f()abc f1()aaa null
var msg=null;
function f() {
  var msg='abc';
  function f1(){
    msg='aaa'
    console.log('f1()'+msg)
  }
  console.log('f()'+msg)
  return f1;
}
f()();

//创建数组元素
var num = new Array();
for(var i=0; i<4; i++){
  //num[i] = 闭包;//闭包被调用了4次，就会生成4个独立的函数
  //每个函数内部有自己可以访问的个性化(差异)的信息
  num[i] = f1(i);
}
function f1(n){
  function f2(){
    alert(n);
  }
  return f2;
}
num[2]();  //2
num[1]();  //1
num[0]();  //0
num[3]();  //3


//内存溢出与内存释放
var name='The Window';
var obj={
  name:'my Object',
  getNameFc(){
    return function () {
      return this.name; //The Window 此时this指向window
    }
  }
}
alert(obj.getNameFc()())

var name='The Window';
var obj={
  name:'my Object',
  getNameFc(){
    var that=this;
    return function () {
      return that.name; //my Objectb 此时that指向obj
    }
  }
}
alert(obj.getNameFc()());

function fun(n,o){
  console.log(o);
  return{
    fun:function (m) {
      return fun(m,n)
    }
  }
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);

/*首先第一行，先看var a = fun(0)，把0传入fun(n,o)中，那么n=0，o=undifined，
而fun(n,o) return了{fun:function(m){returnfun(m,n);}};，
所以a就等于{fun:function(m){return fun(m,0);}};
所以a.fun(1)=function(1){return fun(1,0);}=fun(1,0)，所以会输出0，

同样a.fun(2)=function(2){return fun(2,0);}=fun(2,0)，输出0，以此类推，a.fun(3)也输出0。
所以最终输出的结果为：undifine，0,0,0。
再来看第二行，fun(0)输出undifine，fun(0).fun(1)=a.fun(1)=fun(1,0)={fun:function(m){return fun(m,1);}};，输出0，
fun(0).fun(1).fun(2)=function(2){return fun(2,1);}=fun(2,1)={fun:function(m){return fun(m,2);}}，输出1，
以此类推，fun(0).fun(1).fun(2).fun(3)，
最终按次序输出的是：undifine，0,1,2。

最后看第三行，var c = fun(0).fun(1)，根据上面两行的推理，输出的是undifine，0。
c={fun:function(m){return fun(m,1);}}，c.fun(2)=function(2){return fun(2,1);}，输出1，
c.fun(3)=function(3){return fun(3,1);}，输出的还是1，
所以第三行输出的是：undifine，0, 1, 1。
*/

//执行上下文
/*
*调用函数时，产生上下文对象
* 队列：先进先出
* 栈：先进后出
* */
//实例
console.log(i);//undefined
var i=1;
foo(1);
function foo(n) {
  if(i==4){
    return;
  }
  console.log(i);//先1 2 3
  foo(i+1);
  console.log(i);//再依次3 2 1
}
console.log(i);//1

//实例
function a(){}
var a;
console.log(typeof a); //先执行变量提升，再执行函数提升，因此输出function


//实例
var a=1;
function a(a) {
  console.log(a) //a is not a function
}
a(2);
//上述实例等同于【变量优先于函数进行提升】
var a;
function a(a) {
  console.log(a) //a is not a function
}
a=1;
a(2);

//for setTimeout
for(var i=0;i<3;i++){
  setTimeout(function () {
    console.log(i) //3 3 3
  },0)
}
/*
* 理解：
* JS是单线程环境，也就是说代码的执行是从上到下，依次执行。这样的执行称为同步执行。for循环是同步代码，而setTimeout中的是异步代码。
* 那么JS碰到这个有同步和异步的情况下会先从上到下执行同步代码，碰到异步的代码会将其插入到任务队列当中等待。执行到它的时候会在0ms之后
* 将它插入到任务队列当中。同步代码都执行完成之后那么JS引擎就空闲了，这个时候就轮到任务队列中的异步代码依次加载了。
* 作用域是变量等资源的作用范围。在这段代码中准确的说是作用域链的问题，当同步代码执行完毕开始执行异步的setTimeout代码时，
* setTimeout中需要一个变量 ---i---,而执行的时候在当前的作用域中开始找，找不到变量i的定义，这个时候就把创建这个函数的
* 作用域作为当前作用域，再次寻找，创建这个函数的作用域就是全局作用域，也就是找到了for循环中i，
* 找到了之后就结束寻找变量i的行程。由于这个时候的i是全局的，而且人家已经变为了最终形态：3，
* setTimeout找到的就是这个i=3；所以就输出了3，下面的2次setTimeout 的执行都是类似，所以结果都是3；
* */

for(var i=0;i<3;i++){
  (function (e) {
    setTimeout(function () {
      console.log(e) //0 1 2
    },0)
  })(i)
}
/*
* 对于这类问题比较常见的解决方法就是 立即执行函数。它逼迫js每次循环进来的时候都会立即去执行代码，从而保证了每一次得到了i的副本都是不一样的。
* */
for(let i=0;i<3;i++){
  setTimeout(function () {
    console.log(i) //0 1 2
  },0)
}

//循环，定时器优化,假设button有3个
var btns=document.getElementsByTagName('button');
for(var i=0,len=btns.length;i<len;i++){
  var btn=btns[i];
  btn.onclick=function () {
    alert(i+1) //4 4 4
  }
}
//由于i是在全局里面定义的，在for循环之后，i=3，然后才执行onclick，此时输出都为4
//改进
var btns=document.getElementsByTagName('button');
for(var i=0,len=btns.length;i<len;i++){
  var btn=btns[i];
  btn.index=i;
  btn.onclick=function () {
    alert(this.index+1) //1,2,3
  }
}

//循环遍历+监听+闭包
var btns=document.getElementsByTagName('button');
for(var i=0,len=btns.length;i<len;i++){
  (function(i) {
    var btn = btns[i];
    btn.onclick = function () {
      alert(i + 1) //1,2,3
    }
  })(i)
}

//作用以及作用域
// https://blog.csdn.net/yuzhongkai/article/details/81784558
//1.js作用域（全局变量，局部变量）内部可以访问外部，但外部的不能访问内部的

var a=10;
function aaa(){
  alert(a);
};
function bbb(){
  var a=20;
  aaa();
}
bbb(); //结果为10，因为aaa()函数不能访问到bbb()里面的局部变量，所以访问到的是a=10,这个全局变量。

//不用var 定义变量时，会默认为是全局变量（不规范，不推荐）
function aaa(){
  a=10;
}
aaa();
alert(a); //结果为10;
//等价于：
var a;
function aaa(){
  a=10;
};
aaa();
alert(a);
//给未声明的变量赋值，此变量就会变成全局变量；var a=b=10; 可以解析成 b=10；var a=b;
// 也就是b为全局变量，a为局部变量，所以外部访问a访问不到，访问b结果为10；
function aaa(){
  var a=b=10;
}
aaa();
alert(a);//结果为,无法访问到
alert(b);//结果为10；

//变量的查找是就近原则去寻找，定义的var变量；第二点，变量的声明被提前到作用域顶部，赋值保留在原地，如下dome;
function aaa(){
  alert(a);
  var a=20;
}
aaa(); //结果为：undefined
/**************/
var a=10;
function aaa(){
  alert(a);
  var a=20;
}
aaa(); //结果为：undefined
//可以解析为是:
  var a=10;
function aaa(){
  var a; //声明提前了
  alert(a);
  a=20; //赋值扔留着原地
}
aaa();

//当参数跟局部变量重名的时候，优先级是等同的
var a=10;
function aaa(a){
  alert(a);
  var a=20;  //因为 a 是形参，优先级高于 var a; 所以 局部变量a的声明其实被忽略了。
}
aaa(a); //结果为：10

//变量修改的时候另一个变量会跟着变化，但是当变量重新被定义时，则另一个不变化
var a=[1,2,3];
var b=a;
b.push(4);
alert(a);//结果为[1,2,3,4] 当b改变的时候a也发生了改变

//当b重新被赋值的时候 a不会改变.示例：
var a=[1,2,3];
var b=a;
b=[1,2,3,4]
alert(a)//结果为[1,2,3]
