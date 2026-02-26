export const intersection = (array1: number[], array2: number[]): number[] => {
  //im going to turn on of the arrays into a set
  const arraySet = new Set<number>(array1);
  const answer: number[] = [];
  //filter thru the second array and return only the elements that are included in our set
  array2.map((num) => {
    if (arraySet.has(num)) {
      answer.push(num);
      arraySet.delete(num);
    }
  });

  return answer;
};
