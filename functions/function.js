// ベースの配列
const originalArray = [1, 2, 3, 4, 5];

// 1. 新しい配列を生成する関数
console.log('\n--- 新しい配列を生成する関数 ---');
const mappedArray = originalArray.map(num => num * 2);
console.log('map:', mappedArray); // [2, 4, 6, 8, 10]

const filteredEvenArray = originalArray.filter(num => num % 2 === 0);
console.log('filter:', filteredEvenArray); // [2, 4]

const concatArray = originalArray.concat([6, 7, 8, 9, 10]);
console.log('concat:', concatArray); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const slicedArray = originalArray.slice(1, 3);
console.log('slice:', slicedArray); // [2, 3]

const flattenedArray = [1, [2, 3], [4, [5]]].flat();
console.log('flat:', flattenedArray); // [1, 2, 3, 4, 5]

// 2. 配列を変更する関数
console.log('\n--- 配列を変更する関数 ---');
const reversedArray = originalArray.slice().reverse(); // 新しい配列のコピーを作成するために slice 一時的に使用
console.log('reverse:', reversedArray); // [5, 4, 3, 2, 1]

const splicedArray = originalArray.slice();
splicedArray.splice(1, 3);
console.log('splice:', splicedArray); // [1, 5]

originalArray.sort((a, b) => a - b);
console.log('sort:', originalArray); // [1, 2, 3, 4, 5]

originalArray.fill(0, 2, 4);
console.log('fill:', originalArray); // [1, 2, 0, 0, 5]

originalArray.copyWithin(2, 0, 2);
console.log('copyWithin:', originalArray); // [1, 2, 1, 2, 5]

// 3. 単一値を返す関数
console.log('\n--- 単一値を返す関数 ---');
const foundNum = originalArray.find(num => num % 2 === 0);
console.log('find:', foundNum); // 2

const hasEvenNum = originalArray.some(num => num % 2 === 0);
console.log('some:', hasEvenNum); // true

const allEvenNums = originalArray.every(num => num % 2 === 0);
console.log('every:', allEvenNums); // false

const firstEvenIndex = originalArray.findIndex(num => num % 2 === 0); // 最初に見つかったインデックスの値を返す
console.log('findIndex:', firstEvenIndex); // 1

const includesThree = originalArray.includes(3);
console.log('includes:', includesThree); // true

const indexOfTwo = originalArray.indexOf(2); // 2番目のインデックスの値を返す
console.log('indexOf:', indexOfTwo); // 1

const lastIndexOfTwo = originalArray.lastIndexOf(2);
console.log('lastIndexOf:', lastIndexOfTwo); // 3

// 4. 単一値を生成する関数
console.log('\n--- 単一値を生成する関数 ---');
const sumOfArray = originalArray.reduce((acc, curr) => acc + curr, 0);
console.log('reduce:', sumOfArray); // 15

const joinedString = originalArray.join('-');
console.log('join:', joinedString); // '1-2-1-2-5'

// 5. 副作用のある関数
console.log('\n--- 副作用のある関数 ---');
originalArray.forEach(num => console.log(num * 2));
// 2
// 4
// 2
// 4
// 10

// 6. その他の関数
console.log('\n--- その他の関数 ---');
const entriesArray = originalArray.entries();
console.log('entries:', [...entriesArray]); // [[0, 1], [1, 2], [2, 1], [3, 2], [4, 5]]

const keysArray = originalArray.keys();
console.log('keys:', [...keysArray]); // [0, 1, 2, 3, 4]

const valuesArray = originalArray.values();
console.log('values:', [...valuesArray]); // [1, 2, 1, 2, 5]