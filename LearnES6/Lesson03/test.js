const data = 10;
console.log(data);
// data = 100; //执行错误

const list = [10, 20, 30];
console.log(list);
console.log(list[0]);
console.log(list[1]);
console.log(list[2]);

list[0] = 100;
console.log(list);

list.push(999);
console.log(list);

list.pop();
console.log(list);

list.unshift(555);
console.log(list);

list.shift();
console.log(list);