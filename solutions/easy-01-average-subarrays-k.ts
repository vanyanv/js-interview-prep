export const averageSubarraysK = (arr: number[], k: number): number[] => {
  if (arr.length < k) return [];

  const averageArr = [];
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  averageArr.push(windowSum / k);

  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    averageArr.push(windowSum / k);
  }

  return averageArr;
};
