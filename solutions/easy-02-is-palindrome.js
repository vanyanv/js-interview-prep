export const isPalindrome = (string) => {
  const cleanedString = string.replace(/\s/g, '');

  // two pointer
  let left = 0;
  let right = cleanedString.length -1;

  while (left < right) {
    if (cleanedString[left].toLowerCase() != cleanedString[right].toLowerCase()) return false;
    left++;
    right--;
  }

  //return boolean
  return true;
};
