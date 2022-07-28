Symbol新类型
===========

## 知识点

ES6增加了Symbol新的原始类型
为了说明 Symbol 的作用，我们先来描述一个使用场景。

var race = {
  protoss: 'protoss', // 神族
  terran: 'terran', // 人族
  zerg: 'zerg' // 虫族
}

function createRole(type){
  if(type === race.protoss){创建神族角色}
  else if(type === race.terran){创建人族角色}
  else if(type === race.zerg){创建虫族角色}
}
那么用户选择种族后，就需要调用 createRole 来创建角色：

// 传入字符串
createRole('zerg') 
// 或者传入变量
createRole(race.zerg)
一般传入字符串被认为是不好的做法，所以使用 createRole(race.zerg) 的更多。

如果使用 createRole(race.zerg)，那么聪明的读者会发现一个问题：race.protoss、race.terran、race.zerg 的值为多少并不重要。

Symbol 的用途就是如此：Symbol 可以创建一个独一无二的值（但并不是字符串）。
用 Symbol 来改写上面的 race：

var race = {
  protoss: Symbol(),
  terran: Symbol(),
  zerg: Symbol()
}

race.protoss !== race.terran // true
race.protoss !== race.zerg // true
你也可以给每个 Symbol 起一个名字：

var race = {
  protoss: Symbol('protoss'),
  terran: Symbol('terran'),
  zerg: Symbol('zerg')
}
不过这个名字跟 Symbol 的值并没有关系，你可以认为这个名字就是个注释。如下代码可以证明 Symbol 的名字与值无关：

var a1 = Symbol('a')
var a2 = Symbol('a')
a1 !== a2 // true

如果你觉得我说得还是太复杂了，看不懂，你可以记一句话：
Symbol 生成一个全局唯一的值。

## 实战演习

~~~js
let str1 = String("HeloWorld");
let str2 = String("HeloWorld");
console.log(str1 == str2);  //结果：true
console.log(str1 === str2); //结果：true

let s1 = Symbol("mySymbol");
let s2 = Symbol("mySymbol");
console.log(typeof s1);     //结果：symbol
console.log(s1.toString()); //结果：Symbol(mySymbol)
console.log(s1 == s2);      //结果：false
console.log(s1 === s2);     //结果：false
~~~
