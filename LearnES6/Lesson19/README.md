可迭代的对象
===========

## 知识点

* 制作一个可迭代的对象
* Symbol.iterator

## 实战演习

~~~js
class Player {
	constructor(list){
		this.list = list;
	}
	[Symbol.iterator](){
		let current = 0;
		let that = this;
		return {
			next(){
				return current < that.list.length ? {value:that.list[current++], done:false} : {done:true};
			}
		};
	}
}

let player = new Player(['Curry', 'Harden', 'LeBron']);
for(let tmp of player){
	console.log(tmp);
}
~~~

-------------------------------------------------------------------
参考：
es6中有三类结构生来就具有Iterator接口：数组、类数组对象、Map和Set结构。

var arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();
 
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
　　至于对象没有布置iterator接口的原因，不知道最近大家有没有看根据《你一生的故事》拍成的电影“降临"，片中出现的外星语言是一门非线性的语言。而我们说的数组，Map等结构中的成员都是有顺序的，即都是线性的结构，而对象，各成员并没有一个确定的顺序，所以遍历时先遍历谁后遍历谁并不确定。所以，给一个对象部署iterator接口，其实就是对该对象做一种线性转换。如果你有这种需要，就需要手动给你的对象部署iterator接口咯~

　　如：

let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

　　可以看到，Symbol.iterator会返回一个对象，这就是一个遍历器对象，而作为遍历器对象，其必须具备的特征就是必须具备next()方法。

我们还可以据此实现指针结构的数据结构。具体略~

　　至于可以使用Array.from转换成数组的类数组对象，部署iterator有一种很简单的方法，即直接使用数组的[Symbol.iterator]接口。　

fakeArray.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
　　当然，不知道你们看到next是否想到了es6的一个新玩意儿，即Generator函数。用Generator函数来实现Symbol.iterator接口，事半功倍。

var yieldIterator = {};
yieldIterator[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
 
[...yieldIterator] // [1, 2, 3]
　　注意，yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
　　其次，其它调用到遍历器的操作还有解构赋值、扩展操作符、其它任何接受数组作为参数的场合，如：

for...of
Array.from()
Map(), Set(), WeakMap(), WeakSet()（比如）
Promise.all()
Promise.race()
一旦当你给你的结构部署了iterator接口，那么恭喜你，你可以使用for...of来遍历你的结构了！

　　遍历器对象除了必须布置next方法以外，还有2个可选方法。return()和throw()。当一个解构在遍历的时候异常提前退出(比如break,continue或者出错)的时候，就会调用return方法，其次，return方法必须返回一个对象。

至于throw方法，则是用于抛出错误，Generator.prototype.throw这里不展开讲了，感兴趣的可以搜索一下。

　for of循环有很多优点，比如不像for...in一样只遍历键名（甚至包括原型链上的键），而且不像foreach不能跳出循环。并且for...of为各种数据结构提供了一个统一的遍历方法。

foreach无法终止循环，当通过break来终止循环时会报错 Illegal break statement。
————————————————
版权声明：本文为CSDN博主「潜行的Q」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/margin_0px/article/details/82971545