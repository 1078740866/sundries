Symbol的用法
===========

## 知识点

* 作为常量
* 作为属性
* 半隐藏属性

## 实战演习

### 作为常量

~~~js
const Java = Symbol();
const Ruby = Symbol();
const Perl = Symbol();
const Php  = Symbol();
const VB   = Symbol();

var lang = Php;

if (lang === Java) {
    console.log('Java的未来在哪里？');
}
if (lang === Ruby) {
    console.log('再学个Ruby on Rails吧。');
}
~~~

### 作为属性

~~~js
let s1 = Symbol("mySymbol");
let s2 = Symbol("mySymbol");

var obj = {};
obj[s1] = "helo";
obj[s2] = "world";

console.log(obj);
console.log(obj[s1]);
console.log(obj[s2]);
~~~

### 半隐藏属性

~~~js
const MYKEY = Symbol();
class User {
    constructor(key,name,age){
        this[MYKEY] = key;
        this.name = name;
        this.age = age;
    }
    checkKEY(key){
        return this[MYKEY] === key;
    }
}

let user = new User(123, 'Curry', 29);
console.log(user.name, user.age, user[MYKEY]);
console.log(user.checkKEY(123));   //true
console.log(user.checkKEY(456));   //false
console.log(Object.keys(user));    //[ 'name', 'age' ]
console.log(JSON.stringify(user)); //{"name":"Curry","age":29}
~~~

## 知识点

* class
* ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。
* 
~~~js
 //定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

~~~
*  上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。