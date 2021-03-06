// https://leetcode-cn.com/problems/permutation-in-string/
// 567
export function checkInclusion(t: string, s: string): boolean {
  const need = new Map<string, number>();
  const slidingWindow = new Map<string, number>();
  let left = 0;
  let right = 0;
  let windowSize = 0;

  for (let i = 0; i < t.length; i++) {
    need.set(t[i], (need.get(t[i]) || 0) + 1);
  }

  while (right < s.length) {
    const rightChar = s[right];
    right++;
    if (need.has(rightChar)) {
      slidingWindow.set(rightChar, (slidingWindow.get(rightChar) || 0) + 1);
      if (slidingWindow.get(rightChar) === need.get(rightChar)) {
        windowSize++;
      }
    }

    while (right - left >= t.length) {
      if (windowSize === need.size) {
        return true;
      }

      const leftChar = s[left];
      left++;
      if (need.has(leftChar)) {
        if (slidingWindow.get(leftChar) === need.get(leftChar)) {
          windowSize--;
        }
        slidingWindow.set(leftChar, slidingWindow.get(leftChar) - 1);
      }
    }
  }

  return false;
}
