数组循环(for...of)
=======

## 知识点

* 新的数组循环方式

## 实战演习

~~~js
let list = [10, 20, 30];
//Array.prototype.Len = function(){};

for(let val of list)
    console.log(val);

for(let val in list)
    console.log(val, list[val]);
~~~
