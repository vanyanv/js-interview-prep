export function removeDuplicates(nums) {
  // Handle edge case
  if (nums.length <= 1) return nums.length;

  // Two pointers: slow for unique position, fast for scanning
  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    // If we find a new unique element
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  // Return count of unique elements
  return slow + 1;
}

// Alternative approach: Using Set (not in-place, for comparison)
export function removeDuplicatesSet(nums) {
  const unique = [...new Set(nums)];
  for (let i = 0; i < unique.length; i++) {
    nums[i] = unique[i];
  }
  return unique.length;
}