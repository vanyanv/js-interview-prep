/*
Problem: Subdomain Visit Count
Difficulty: Medium
Category: Strings, Hash Map
LeetCode: #811
Pattern: Hierarchical Counting

A website domain "discuss.leetcode.com" consists of various subdomains.
At the top level, we have "com", at the next level, we have "leetcode.com"
and at the lowest level, "discuss.leetcode.com". When we visit a domain
like "discuss.leetcode.com", we will also visit the parent domains
"leetcode.com" and "com" implicitly.

A count-paired domain is a domain that has one of the two formats
"rep d1.d2.d3" or "rep d1.d2" where rep is the number of times the
domain is visited, d1.d2.d3 is the domain itself.

Given an array of count-paired domains cpdomains, return an array of
count-paired domains (in any order) representing the count of each subdomain.

Example 1:
  Input: cpdomains = ["9001 discuss.leetcode.com"]
  Output: ["9001 leetcode.com","9001 discuss.leetcode.com","9001 com"]
  Explanation: We only have one website domain: "discuss.leetcode.com".
  As discussed above, the subdomain "leetcode.com" and "com" will also be visited. So they will all have 9001 visits.

Example 2:
  Input: cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
  Output: ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
  Explanation: We will visit "google.mail.com" 900 times, "yahoo.com" 50 times, "intel.mail.com" once and "wiki.org" 5 times.

Constraints:
  - 1 <= cpdomain.length <= 100
  - 1 <= cpdomain[i].length <= 100
  - cpdomain[i] follows either the "repi d1i.d2i.d3i" format or the "repi d1i.d2i" format.
  - repi is an integer in the range [1, 10^4].
  - d1i, d2i, and d3i consist of lowercase English letters.

Time Complexity: O(n * m) where n is number of domains, m is average domain length
Space Complexity: O(n * m)

Hash Map Pattern Notes:
  - Parse each entry to extract count and domain
  - For each domain, generate all possible subdomains
  - Use Map to accumulate visit counts for each (sub)domain
  - Split domain by '.' and generate suffixes
  - Convert Map back to required format
*/

export const functionName = 'subdomainVisits';

export const tests = [
  {
    input: [["9001 discuss.leetcode.com"]],
    expected: ["9001 leetcode.com", "9001 discuss.leetcode.com", "9001 com"]
  },
  {
    input: [["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]],
    expected: ["901 mail.com", "50 yahoo.com", "900 google.mail.com", "5 wiki.org", "5 org", "1 intel.mail.com", "951 com"]
  },
  {
    input: [["100 test.com"]],
    expected: ["100 test.com", "100 com"]
  },
  {
    input: [["1 a.b.c.d", "2 e.f", "3 g.h.i"]],
    expected: ["1 a.b.c.d", "1 b.c.d", "1 c.d", "1 d", "2 e.f", "2 f", "3 g.h.i", "3 h.i", "3 i"]
  },
  {
    input: [["50 domain.com", "25 domain.com"]],
    expected: ["75 domain.com", "75 com"]
  },
  {
    input: [["10 x.y", "20 z.x.y"]],
    expected: ["30 x.y", "30 y", "20 z.x.y"]
  }
];