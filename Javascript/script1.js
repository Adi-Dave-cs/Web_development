console.log('hello world!');
let a = null;
let b = undefined;

console.log(a === b);

a = undefined
console.log(a === b);

let arrowfunc = (a,b) => {
    return a + b;
}

console.log(arrowfunc)
console.log(arrowfunc(2,4))

let a1 = 1;
const b1 = "3";

console.log(parseInt(b1)==a1)