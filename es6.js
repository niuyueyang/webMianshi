//Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件监听——更合理和更强大。
// Promise 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。但是无法获取到pending状态，
// 在promise中接受两个内置参数分别是resolve（成功）和reject（失败），Promise实例生成以后，
// 可以用then方法分别指定resolved状态和rejected状态的回调函数。then方法可以传递两个回调函数第一个是成功，
// 第二个是失败，失败回调也可以使用promise的catch方法回调，
// promise还有一个强大的功能那就是all方法可以组合多个promise实例，包装成一个新的 Promise 实例。

// async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。

// ES6 中模块化语法更加简洁，使用export抛出，使用import from 接收，
// 如果只是输出一个唯一的对象，使用export default即可
// 创建 util1.js 文件，内容如
export default {
  a: 100
}
// 创建 index.js 文件，内容如
import obj from './util1.js’
// 如果想要输出许多个对象，就不能用default了，且import时候要加{...}，代码如下
// 创建 util2.js 文件，内容如
export function fn1() {
  alert('fn1')
}
export function fn2() {
  alert('fn2')
}
// 创建 index.js 文件，内容如
import { fn1, fn2 } from './util2.js’


//es 7
/*
* **幂指数 3**3=27
* Array.prototype.includes(value) 判定数组里面是否有指定value  var arr=[1,2,3,'abc']; arr.includes(a);
* */

//es6 for of 用法
var arr = [
  { name:'nick', age:18 },
  { name:'freddy', age:24 },
  { name:'mike', age:26 },
  { name:'james', age:34 }
];
for(var item of arr){
  console.log(item); //输出各个对象
}

//字符串扩展
var str='abcdefghi';
console.log(str.includes('h')); //true
console.log(str.startsWith('a')); //true
console.log(str.endsWith('i')); //true
console.log(str.repeat(5));//abcdefghiabcdefghiabcdefghiabcdefghiabcdefghi   设定字符串重复次数

//数值扩展
/*二进制用0b，八进制用0o*/
console.log(0b2020); //10
console.log(Number.isNaN(NaN)); //true
console.log(Number.isInteger(20.0));//true
console.log(Number.parseInt('123abc'));//123
console.log(Number.parseInt('a123')); //NaN
console.log(Math.trunc(123.123)); //123

//数组扩展
//Array.from 将伪数组转换为真数组
var btns=document.getElementsByTagName('button');
Array.from(btns).forEach(function (value,index) {
  console.log(value)
})

//Array.of 将一系列值转换为数组
Array.of(1,2,3,'abc',{name:'111'}); //[1, 2, 3, "abc", {name:'111'}]

//find 找到满足条件第一个值，并返回
var arr=[1,2,3,4,5];
arr.find(function (value,index) {
  return value>4;
}) //5

//findIndex找到下标
var arr=[1,2,3,4,5];
arr.findIndex(function (value,index) {
  return value>4;
}) //4

//对象扩展
//Object.is(obj1,obj2) 判断两个对象（当中也可以填写对象以外其他类型）是否完全相等，通过字符串进行判断，比如Object.is(NaN,NaN); //true
//Object.assign(target,source1,source2); //将源对象属性（source1,source2）赋值到目标对象身上
var obj={};
var obj1={name:111};
var obj2={age:18};
Object.assign(obj,obj1,obj2);
console.log(obj); //{name: 111, age: 18}
//直接操作__proto__
var obj={};
var obj1={name:111};
obj.__proto__=obj1;
console.log(obj.name); //111

//class
//【构造函数原型】
function Person(name){
  this.name=name
  this.getName=function () {
    return this.name
  }
}
Person.prototype.testName=function () {
  console.log(111)
}
var p=new Person('aaa');
console.log(p.getName()); //aaa
console.log(Person.prototype===p.__proto__);//true 构造函数的显式原型等于实例化对象的隐式原型
console.log(p.__proto__,Person.prototype);/*
                                            testName: ƒ ()
                                            constructor: ƒ Person(name)
                                            __proto__: Object
                                            */

class Person{
  constructor(name,age){
    this.name=name;
    this.age=age;
  }
  //注意这里的函数是在它的原型上，而并不在对象属性上，这样做是为了，每实例化一个对象，如果方法相同，都可以调用它
  getName(){
    return this.name;
  }
}

//class通过extends继承其它类
class Child extends Person{
  constructor(name,age,sex){
    super(name,age); //调用父类构造方法，把父类方法，属性都调取过来，但是需要注意，super里面必须写上name,age，constructor
                     //必须写成constructor(sex,name,age)，这样，才真正可以继承父类，否则将会出现undefined
    this.sex=sex;
  }
  getSex(){
    return super.getName()+"的性别是:"+this.sex;
  }
  //如果父类与子类方法一样，则表示在子类里面重写了父类方法，通过实例化子类本身，调取子类getName()
  // getName(){
  //   return this.sex;
  // }
}
// var p=new Person('aaa',18);
var child=new Child('ccc',19,'男');
console.log(child.name,child.age,'男',child.getSex(),child.getName()); //ccc 19 男 ccc的性别是:男 ccc


