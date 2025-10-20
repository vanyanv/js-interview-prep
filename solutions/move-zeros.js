export function moveZeroes(nums) {
  // Two pointers approach
  let slow = 0; // Position for next non-zero element

  // Move all non-zero elements to the front
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      // Swap elements
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }

  return nums;
}

// Alternative: Two-pass approach
export function moveZeroesTwo Pass(nums) {
  let insertPos = 0;

  // First pass: move non-zero elements to front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
  }

  // Second pass: fill remaining positions with zeros
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }

  return nums;
}