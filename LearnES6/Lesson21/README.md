简单迭代类
=========

## 知识点

* 建立一个简单的迭代类(yield)

## 实战演习

~~~js
class MyList {
	constructor(list){
		this.list = list;
		this[Symbol.iterator] = function*(){
			let current = 0;
			let that = this;
			while(current < that.list.length){
				yield that.list[current++];
			}
		}
	}
}

let mylist = new MyList([100, 200, 300, 400, 500]);
for(let val of mylist){
	console.log(val);
}
~~~

