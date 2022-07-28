let name = "Aさん"
let name2 = "TOM"
let mystr1 = 'こんにちは，${name2}'
let mystr2 = `こんにちは，${name2}`

console.log(mystr1)
console.log(mystr2)

function myfunction(formats, ...args) {
    console.log(formats)
    console.log(args)
}

myfunction `hello${name}nice to meet you,i am ${name2}`


var gender = {
    man: Symbol(),
    woman: Symbol()
}
function isMan(gender) {
    switch (gender) {
        case gender.man:
            console.log("男性");
            break;
        case gender.woman:
            console.log('⼥性');
            break
    }
}
isMan(gender.man)
