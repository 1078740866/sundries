import {add, minus} from './math';

console.log(add(10, 20));
console.log(minus(30, 20));

//* 建立一个模块、调用模块のやり方は上記ですが、
//node.js実行環境では、importをサポートしないため、実行エラーになる。
//VUE CLIを使用して、実行する。