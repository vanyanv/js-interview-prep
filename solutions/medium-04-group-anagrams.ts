type comparisonsType = {
  [key: string]: number;
};

export const groupAnagrams = (strs: string[]): string[][] => {
  // create an object to track standardized comparison strings (alphabatized) and return value indices
  const comparisons: comparisonsType = {};
  // create an empty array to store arrays of related strings
  const answer: string[][] = [];
  // iterate through the strs array
  strs.forEach((str) => {
    // create a standardized comparison string
    const standardizedStr = str.split('').sort().join('');
    // check if the comparison string already exists in the object
    if (comparisons.hasOwnProperty(standardizedStr)) {
      // if so, add the current string to the end of the array at the object value index
      answer[comparisons[standardizedStr]].push(str);
    } else {
      // otherwise, add the standardized string as a key and the new index as a value
      comparisons[standardizedStr] = answer.length;
      // and add the current string (inside of an array) to the end of the answer array
      answer.push([str]);
    }
  });
  // return the return array
  return answer;
};
