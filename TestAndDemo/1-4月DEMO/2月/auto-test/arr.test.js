const arr = require('./arr');

test('数组[1, 2, 3]的长度', function () {
  expect(arr.length([1, 2, 3])).toBe(3);
})

test('数组[1, 2, 3]每项相加的值', function () {
  expect(arr.add([1, 2, 3])).toBe(6);
})