export const maxSumSubarrayK = (array: number[], k: number): number => {
  if (array.length < k) return 0;

  let maxSum = -Infinity;
  let windowSum = 0;
  //build first window
  for (let i = 0; i < k; i++) {
    windowSum += array[i];
  }

  //can set my maxSum = window sum
  if (windowSum > maxSum) maxSum = windowSum;

  //removed left element and add right element and compare with maxSum
  for (let i = k; i < array.length; i++) {
    windowSum = windowSum - array[i - k] + array[i];

    //remove the first and add the element coming in
    if (windowSum > maxSum) maxSum = windowSum;
  }

  return maxSum;
};
