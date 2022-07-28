简单迭代生成器
=============

## 知识点

* function* {} : 迭代生成器
* yield : 迭代返回

## 实战演习

~~~js
function* myGenerator() {
	yield '一';
	yield '条';
	yield '大';
	yield '河';
}

for(let val of myGenerator()){
	console.log(val);
}

function* countdown(begin){
	while(begin > 0){
		yield begin--;
	}
}

for(let tmp of countdown(5)){
	console.log(tmp);
}
~~~

参考：
https://qiita.com/kura07/items/d1a57ea64ef5c3de8528
ランダムな自然数の配列を作る
function* randomIntArray(max, len){
    for(var i=0;i<len;i++) yield Math.floor(Math.random() * max) + 1;
}

console.log( [...randomIntArray(2, 10)] ); // 例：[1, 2, 1, 1, 1, 2, 2, 2, 1, 2]
console.log( [...randomIntArray(6, 4)] ); // 例：[1, 6, 2, 4]

