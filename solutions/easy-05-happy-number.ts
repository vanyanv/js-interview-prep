export const isHappy = (n: number): boolean => {

  // create a map to track visited numbers (repeat cycles)
  const map = new Map<number, number>();
  // track sum (1)
  let currentSum = n;


  // create a while loop (while sum !== 1)
  while (currentSum !== 1) {
    // create array of numbers to iterate through from current number
    const numArray = currentSum.toString().split("").map((numString) => Number(numString));
    // sum up squares to get new number
    const newNum = numArray.reduce((prev, next) => prev + (next * next), 0);
      // if number is in map, short circuit return false
    if (map.has(newNum)) {
      return false;
    } else {
      map.set(newNum, newNum);
    }

    // update current number
    currentSum = newNum;
  }

  return true;
}
