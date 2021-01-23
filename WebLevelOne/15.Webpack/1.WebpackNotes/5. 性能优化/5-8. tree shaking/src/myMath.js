import { chunk } from "lodash-es";

export function add(a, b) {
  console.log("add");
  return a + b;
}

export function sub(a, b) {
  console.log("sub");
  return a - b;
}

export function myChunk(arr, num) {
  console.log("myChunk");
  return chunk(arr, num);//实际上整个工程是没有依赖chunk的,但是webpack没有那么智能的分析出来,他还是会把这个chunk加进来
}

// export default {
//   add: function add(a, b) {
//     console.log("add");
//     return a + b;
//   },
//   sub: function sub(a, b) {
//     console.log("sub");
//     return a - b;
//   }
// };
