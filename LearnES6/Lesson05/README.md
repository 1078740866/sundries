嵌入字符串
=========

## 知识点

* 字符串嵌入方式
* 字符串模版定义

## 实战演习

~~~js
let name = "Aさん"
let mystr1 = "こんにちは，${name}"
let mystr2 = `こんにちは，${name}`

console.log(mystr1)
console.log(mystr2)

//...args 複数引数
function myfunction(formats, ...args){
    console.log(formats)
    console.log(args)
}

myfunction `hello${name}nice to meet you`
~~~