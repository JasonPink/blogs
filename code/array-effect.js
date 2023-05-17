const arr = Array.from({ length: 100000000 }, (v, k) => k);

console.time("方案a");
for (let i = 0; i < arr.length; i++) {
  const val = arr[i];
}
console.timeEnd("方案a");

console.time("方案b");
for (let i = 0, len = arr.length; i < len; i++) {
  const val = arr[i];
}
console.timeEnd("方案b");

console.time("方案c");
for (let i = arr.length - 1; i >= 0; i--) {
  const val = arr[i];
}
console.timeEnd("方案c");

const obj = {
  '88': 'jack'
  '12':'david',
  "23": 'jason',
  "1":'tom',
}

for(let i in obj) {
  console.log(obj[i]) // tom, david, jason, jack
}

// console.time("forEach");
// arr.forEach(i => {
//   const val = i;
// });
// console.timeEnd("for");
