export const majorityElement = (array: number[]): number => {
  //create a new map
  const feqMap = new Map<number, number>();
  //go thru my array and count the freq of the numbers in the array
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (feqMap.has(current)) {
      feqMap.set(current, feqMap.get(current)! + 1);
    } else {
      feqMap.set(current, 1);
    }
  }

  let answer: number = 0;
  //going to go thru my map and return the number that has a value > n/2

  for (const [key, value] of feqMap.entries()) {
    if (value > array.length / 2) {
      answer = key;
    }
  }

  return answer;
};
