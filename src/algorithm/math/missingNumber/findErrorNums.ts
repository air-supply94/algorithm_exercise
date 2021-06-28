export function findErrorNums(nums: number[]): number[] {
  let xor = 0;
  let xor1 = 0;
  let xor0 = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    xor ^= nums[i];
  }

  for (let i = 0; i <= n; i++) {
    xor ^= i;
  }

  const rightBit = xor & -xor;
  for (let i = 0; i < n; i++) {
    if ((rightBit & nums[i]) === 1) {
      xor1 ^= nums[i];
    } else {
      xor0 ^= nums[i];
    }
  }

  for (let i = 1; i <= n; i++) {
    if ((i & rightBit) === 1) {
      xor1 ^= i;
    } else {
      xor0 ^= i;
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] === xor1) {
      return [
        xor1,
        xor0,
      ];
    }
  }

  return [
    xor0,
    xor1,
  ];
}