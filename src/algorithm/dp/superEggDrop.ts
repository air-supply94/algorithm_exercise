// https://leetcode-cn.com/problems/super-egg-drop/
// 887
export function superEggDrop(count: number, n: number): number {
  return recursion(count, n, new Map<string, number>());
}

function recursion(count: number, n: number, cache: Map<string, number>): number {
  if (count === 1) {
    return n;
  }

  if (n < 1) {
    return 0;
  }

  const key = `${count},${n}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  let result = Infinity;

  /*
  for (let i = 1; i <= n; i++) {
    result = Math.min(
      result,
      Math.max(recursion(count - 1, i - 1, cache), recursion(count, n - i, cache)) + 1
    );
  }
*/

  let start = 1;
  let end = n;

  while (start <= end) {
    const middle = start + Math.floor((end - start) / 2);
    const broken = recursion(count - 1, middle - 1, cache);
    const notBroken = recursion(count, n - middle, cache);
    if (broken < notBroken) {
      start = middle + 1;
      result = Math.min(result, notBroken + 1);
    } else if (broken === notBroken) {
      end = middle - 1;
      result = Math.min(result, notBroken + 1);
    } else {
      end = middle - 1;
      result = Math.min(result, broken + 1);
    }
  }

  cache.set(key, result);
  return result;
}
