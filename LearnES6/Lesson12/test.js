function sum(...args) {
    let result = 0;
    args.forEach(val => {
        result += val;
    });
    return result;
}

console.log(sum(1,2,3));
