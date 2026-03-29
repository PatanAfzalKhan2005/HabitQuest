export const codingProblems = [
  // ===== ARRAYS - SIMPLE =====
  {
    id: "arr-s-1", topic: "arrays", level: "simple", isDaily: false,
    title: "Find Maximum Element",
    description: "Given an array of integers, find and return the maximum element.",
    inputFormat: "First line: integer n (size). Second line: n space-separated integers.",
    outputFormat: "Print the maximum element.",
    constraints: "1 ≤ n ≤ 1000, -10^9 ≤ arr[i] ≤ 10^9",
    sampleInput: "5\n3 1 4 1 5",
    sampleOutput: "5",
    testCases: [{ input: "5\n3 1 4 1 5", expected: "5" }, { input: "3\n-1 -5 -3", expected: "-1" }]
  },
  {
    id: "arr-s-2", topic: "arrays", level: "simple", isDaily: true,
    title: "Sum of Array",
    description: "Given an array of integers, find the sum of all elements.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print the sum.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "10",
    testCases: [{ input: "4\n1 2 3 4", expected: "10" }, { input: "3\n-1 2 -3", expected: "-2" }]
  },
  {
    id: "arr-s-3", topic: "arrays", level: "simple", isDaily: false,
    title: "Reverse an Array",
    description: "Given an array, print it in reverse order.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print reversed array space-separated.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "5\n1 2 3 4 5",
    sampleOutput: "5 4 3 2 1",
    testCases: [{ input: "5\n1 2 3 4 5", expected: "5 4 3 2 1" }, { input: "3\n7 8 9", expected: "9 8 7" }]
  },
  {
    id: "arr-s-4", topic: "arrays", level: "simple", isDaily: false,
    title: "Count Occurrences",
    description: "Given an array and a target, count how many times target appears.",
    inputFormat: "First line: n. Second line: n integers. Third line: target.",
    outputFormat: "Print count.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "6\n1 2 2 3 2 4\n2",
    sampleOutput: "3",
    testCases: [{ input: "6\n1 2 2 3 2 4\n2", expected: "3" }, { input: "4\n1 1 1 1\n1", expected: "4" }]
  },
  {
    id: "arr-s-5", topic: "arrays", level: "simple", isDaily: false,
    title: "Check Sorted",
    description: "Determine if an array is sorted in non-decreasing order.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print YES or NO.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "YES",
    testCases: [{ input: "4\n1 2 3 4", expected: "YES" }, { input: "3\n1 3 2", expected: "NO" }]
  },
  {
    id: "arr-s-6", topic: "arrays", level: "simple", isDaily: false,
    title: "Second Largest",
    description: "Find the second largest element in an array.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print second largest.",
    constraints: "2 ≤ n ≤ 1000, all elements distinct.",
    sampleInput: "5\n1 5 3 4 2",
    sampleOutput: "4",
    testCases: [{ input: "5\n1 5 3 4 2", expected: "4" }, { input: "4\n10 20 30 40", expected: "30" }]
  },
  {
    id: "arr-s-7", topic: "arrays", level: "simple", isDaily: false,
    title: "Move Zeros to End",
    description: "Move all 0s to the end of array while maintaining relative order of non-zero elements.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print the modified array.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "6\n0 1 0 3 12 0",
    sampleOutput: "1 3 12 0 0 0",
    testCases: [{ input: "6\n0 1 0 3 12 0", expected: "1 3 12 0 0 0" }]
  },
  {
    id: "arr-s-8", topic: "arrays", level: "simple", isDaily: false,
    title: "Array Rotation",
    description: "Rotate an array to the left by k positions.",
    inputFormat: "First line: n k. Second line: n integers.",
    outputFormat: "Print rotated array.",
    constraints: "1 ≤ n ≤ 1000, 0 ≤ k < n",
    sampleInput: "5 2\n1 2 3 4 5",
    sampleOutput: "3 4 5 1 2",
    testCases: [{ input: "5 2\n1 2 3 4 5", expected: "3 4 5 1 2" }]
  },
  {
    id: "arr-s-9", topic: "arrays", level: "simple", isDaily: false,
    title: "Duplicate Check",
    description: "Check if the array has any duplicate elements.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "YES if duplicates exist, NO otherwise.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "4\n1 2 3 1",
    sampleOutput: "YES",
    testCases: [{ input: "4\n1 2 3 1", expected: "YES" }, { input: "3\n1 2 3", expected: "NO" }]
  },
  {
    id: "arr-s-10", topic: "arrays", level: "simple", isDaily: false,
    title: "Array Average",
    description: "Find the average of all elements in the array. Print rounded to 2 decimal places.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print average with 2 decimal places.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "2.50",
    testCases: [{ input: "4\n1 2 3 4", expected: "2.50" }, { input: "2\n3 5", expected: "4.00" }]
  },
  {
    id: "arr-s-11", topic: "arrays", level: "simple", isDaily: false,
    title: "Missing Number",
    description: "Given an array containing n-1 numbers from 1 to n, find the missing number.",
    inputFormat: "First line: n. Second line: n-1 integers.",
    outputFormat: "Print the missing number.",
    constraints: "2 ≤ n ≤ 1000",
    sampleInput: "5\n1 2 4 5",
    sampleOutput: "3",
    testCases: [{ input: "5\n1 2 4 5", expected: "3" }, { input: "3\n1 3", expected: "2" }]
  },
  {
    id: "arr-s-12", topic: "arrays", level: "simple", isDaily: false,
    title: "Pair Sum",
    description: "Check if there exist two elements in array whose sum equals target k.",
    inputFormat: "First line: n k. Second line: n integers.",
    outputFormat: "YES or NO.",
    constraints: "1 ≤ n ≤ 1000",
    sampleInput: "5 9\n1 2 3 7 5",
    sampleOutput: "YES",
    testCases: [{ input: "5 9\n1 2 3 7 5", expected: "YES" }, { input: "3 10\n1 2 3", expected: "NO" }]
  },

  // ===== ARRAYS - HARD =====
  {
    id: "arr-h-1", topic: "arrays", level: "hard", isDaily: false,
    title: "Maximum Subarray Sum (Kadane's)",
    description: "Find the contiguous subarray with the largest sum (Kadane's Algorithm).",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print maximum subarray sum.",
    constraints: "1 ≤ n ≤ 10^5, -10^4 ≤ arr[i] ≤ 10^4",
    sampleInput: "8\n-2 1 -3 4 -1 2 1 -5",
    sampleOutput: "6",
    testCases: [{ input: "8\n-2 1 -3 4 -1 2 1 -5", expected: "6" }, { input: "4\n-1 -2 -3 -4", expected: "-1" }]
  },
  {
    id: "arr-h-2", topic: "arrays", level: "hard", isDaily: false,
    title: "Two Sum",
    description: "Given array and target, return indices of two numbers that add up to target. Indices are 1-based.",
    inputFormat: "First line: n target. Second line: n integers.",
    outputFormat: "Print two indices separated by space.",
    constraints: "2 ≤ n ≤ 10^5",
    sampleInput: "4 9\n2 7 11 15",
    sampleOutput: "1 2",
    testCases: [{ input: "4 9\n2 7 11 15", expected: "1 2" }]
  },
  {
    id: "arr-h-3", topic: "arrays", level: "hard", isDaily: false,
    title: "Best Time to Buy and Sell Stock",
    description: "Given prices of stocks on each day, find maximum profit. You can only buy and sell once.",
    inputFormat: "First line: n. Second line: n prices.",
    outputFormat: "Print maximum profit.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "6\n7 1 5 3 6 4",
    sampleOutput: "5",
    testCases: [{ input: "6\n7 1 5 3 6 4", expected: "5" }, { input: "3\n7 6 4", expected: "0" }]
  },
  {
    id: "arr-h-4", topic: "arrays", level: "hard", isDaily: false,
    title: "Merge Intervals",
    description: "Given a list of intervals, merge all overlapping intervals and return the resulting list.",
    inputFormat: "First line: n. Next n lines: start end.",
    outputFormat: "Print merged intervals one per line.",
    constraints: "1 ≤ n ≤ 10^4",
    sampleInput: "4\n1 3\n2 6\n8 10\n15 18",
    sampleOutput: "1 6\n8 10\n15 18",
    testCases: [{ input: "4\n1 3\n2 6\n8 10\n15 18", expected: "1 6\n8 10\n15 18" }]
  },
  {
    id: "arr-h-5", topic: "arrays", level: "hard", isDaily: false,
    title: "Product of Array Except Self",
    description: "Return an array where each element is the product of all other elements. Don't use division.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print the result array.",
    constraints: "2 ≤ n ≤ 10^5",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "24 12 8 6",
    testCases: [{ input: "4\n1 2 3 4", expected: "24 12 8 6" }]
  },
  {
    id: "arr-h-6", topic: "arrays", level: "hard", isDaily: false,
    title: "Find All Duplicates",
    description: "Find all elements that appear twice in the array (1 ≤ a[i] ≤ n).",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print duplicates sorted.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "6\n4 3 2 7 8 2",
    sampleOutput: "2",
    testCases: [{ input: "6\n4 3 2 7 8 2", expected: "2" }]
  },
  {
    id: "arr-h-7", topic: "arrays", level: "hard", isDaily: false,
    title: "Container With Most Water",
    description: "Given heights, find two lines that together with x-axis form container holding most water.",
    inputFormat: "First line: n. Second line: n heights.",
    outputFormat: "Print maximum water.",
    constraints: "2 ≤ n ≤ 10^5",
    sampleInput: "9\n1 8 6 2 5 4 8 3 7",
    sampleOutput: "49",
    testCases: [{ input: "9\n1 8 6 2 5 4 8 3 7", expected: "49" }]
  },
  {
    id: "arr-h-8", topic: "arrays", level: "hard", isDaily: false,
    title: "Subarray with Zero Sum",
    description: "Check if there is a subarray with sum equal to 0.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "YES or NO.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "5\n4 2 -3 1 6",
    sampleOutput: "YES",
    testCases: [{ input: "5\n4 2 -3 1 6", expected: "YES" }, { input: "3\n1 2 3", expected: "NO" }]
  },
  {
    id: "arr-h-9", topic: "arrays", level: "hard", isDaily: false,
    title: "Trapping Rain Water",
    description: "Calculate total water that can be trapped between buildings.",
    inputFormat: "First line: n. Second line: n heights.",
    outputFormat: "Print total water.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
    sampleOutput: "6",
    testCases: [{ input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" }]
  },
  {
    id: "arr-h-10", topic: "arrays", level: "hard", isDaily: false,
    title: "Majority Element",
    description: "Find the element that appears more than n/2 times (Boyer-Moore Voting Algorithm).",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print majority element.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "7\n3 2 3 1 2 4 2",
    sampleOutput: "2",
    testCases: [{ input: "7\n3 2 3 1 2 4 2", expected: "2" }, { input: "5\n2 2 1 1 2", expected: "2" }]
  },
  {
    id: "arr-h-11", topic: "arrays", level: "hard", isDaily: false,
    title: "Sort Colors (Dutch Flag)",
    description: "Sort array of 0s, 1s, and 2s in-place (Dutch National Flag algorithm).",
    inputFormat: "First line: n. Second line: n integers (0/1/2).",
    outputFormat: "Print sorted array.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "6\n2 0 2 1 1 0",
    sampleOutput: "0 0 1 1 2 2",
    testCases: [{ input: "6\n2 0 2 1 1 0", expected: "0 0 1 1 2 2" }]
  },
  {
    id: "arr-h-12", topic: "arrays", level: "hard", isDaily: false,
    title: "Maximum Product Subarray",
    description: "Find the contiguous subarray with the largest product.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print maximum product.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "6\n2 3 -2 4 -1 2",
    sampleOutput: "48",
    testCases: [{ input: "6\n2 3 -2 4 -1 2", expected: "48" }]
  },

  // ===== ARRAYS - DIFFICULT =====
  {
    id: "arr-d-1", topic: "arrays", level: "difficult", isDaily: false,
    title: "4Sum",
    description: "Find all unique quadruplets that sum to target.",
    inputFormat: "First line: n target. Second line: n integers.",
    outputFormat: "Print quadruplets sorted.",
    constraints: "1 ≤ n ≤ 200",
    sampleInput: "6 0\n1 0 -1 0 -2 2",
    sampleOutput: "-2 -1 1 2\n-2 0 0 2\n-1 0 0 1",
    testCases: [{ input: "6 0\n1 0 -1 0 -2 2", expected: "-2 -1 1 2\n-2 0 0 2\n-1 0 0 1" }]
  },
  {
    id: "arr-d-2", topic: "arrays", level: "difficult", isDaily: false,
    title: "Sliding Window Maximum",
    description: "Given array and window size k, find max in each sliding window.",
    inputFormat: "First line: n k. Second line: n integers.",
    outputFormat: "Print maximums.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "8 3\n1 3 -1 -3 5 3 6 7",
    sampleOutput: "3 3 5 5 6 7",
    testCases: [{ input: "8 3\n1 3 -1 -3 5 3 6 7", expected: "3 3 5 5 6 7" }]
  },
  {
    id: "arr-d-3", topic: "arrays", level: "difficult", isDaily: false,
    title: "Minimum Size Subarray Sum",
    description: "Find minimum length subarray with sum ≥ target.",
    inputFormat: "First line: n target. Second line: n integers.",
    outputFormat: "Print minimum length. 0 if not found.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "5 7\n2 3 1 2 4",
    sampleOutput: "2",
    testCases: [{ input: "5 7\n2 3 1 2 4", expected: "2" }]
  },
  {
    id: "arr-d-4", topic: "arrays", level: "difficult", isDaily: false,
    title: "First Missing Positive",
    description: "Find the smallest missing positive integer.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print smallest positive.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "4\n3 4 -1 1",
    sampleOutput: "2",
    testCases: [{ input: "4\n3 4 -1 1", expected: "2" }, { input: "3\n1 2 3", expected: "4" }]
  },
  {
    id: "arr-d-5", topic: "arrays", level: "difficult", isDaily: false,
    title: "Maximum Rectangle in Histogram",
    description: "Find the largest rectangle that can be formed in a histogram.",
    inputFormat: "First line: n. Second line: n heights.",
    outputFormat: "Print maximum area.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "6\n2 1 5 6 2 3",
    sampleOutput: "10",
    testCases: [{ input: "6\n2 1 5 6 2 3", expected: "10" }]
  },
  {
    id: "arr-d-6", topic: "arrays", level: "difficult", isDaily: false,
    title: "Jump Game II",
    description: "Find minimum jumps to reach last index.",
    inputFormat: "First line: n. Second line: n integers (max jump lengths).",
    outputFormat: "Print minimum jumps.",
    constraints: "1 ≤ n ≤ 10^4",
    sampleInput: "5\n2 3 1 1 4",
    sampleOutput: "2",
    testCases: [{ input: "5\n2 3 1 1 4", expected: "2" }]
  },
  {
    id: "arr-d-7", topic: "arrays", level: "difficult", isDaily: false,
    title: "Longest Consecutive Sequence",
    description: "Find longest consecutive sequence in unsorted array (O(n) solution).",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print length of longest sequence.",
    constraints: "0 ≤ n ≤ 10^5",
    sampleInput: "6\n100 4 200 1 3 2",
    sampleOutput: "4",
    testCases: [{ input: "6\n100 4 200 1 3 2", expected: "4" }]
  },
  {
    id: "arr-d-8", topic: "arrays", level: "difficult", isDaily: false,
    title: "Rotate Matrix",
    description: "Rotate an n×n matrix 90 degrees clockwise in-place.",
    inputFormat: "First line: n. Next n lines: n integers each.",
    outputFormat: "Print rotated matrix.",
    constraints: "1 ≤ n ≤ 50",
    sampleInput: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleOutput: "7 4 1\n8 5 2\n9 6 3",
    testCases: [{ input: "3\n1 2 3\n4 5 6\n7 8 9", expected: "7 4 1\n8 5 2\n9 6 3" }]
  },
  {
    id: "arr-d-9", topic: "arrays", level: "difficult", isDaily: false,
    title: "Spiral Matrix",
    description: "Return all elements of a matrix in spiral order.",
    inputFormat: "First line: m n. Next m lines: n integers.",
    outputFormat: "Print elements in spiral order.",
    constraints: "1 ≤ m,n ≤ 100",
    sampleInput: "3 3\n1 2 3\n4 5 6\n7 8 9",
    sampleOutput: "1 2 3 6 9 8 7 4 5",
    testCases: [{ input: "3 3\n1 2 3\n4 5 6\n7 8 9", expected: "1 2 3 6 9 8 7 4 5" }]
  },
  {
    id: "arr-d-10", topic: "arrays", level: "difficult", isDaily: false,
    title: "Next Permutation",
    description: "Find the next lexicographically greater permutation.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print next permutation.",
    constraints: "1 ≤ n ≤ 100",
    sampleInput: "3\n1 2 3",
    sampleOutput: "1 3 2",
    testCases: [{ input: "3\n1 2 3", expected: "1 3 2" }, { input: "3\n3 2 1", expected: "1 2 3" }]
  },
  {
    id: "arr-d-11", topic: "arrays", level: "difficult", isDaily: false,
    title: "Count Inversions",
    description: "Count number of inversions (pairs where i < j but arr[i] > arr[j]).",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print inversion count.",
    constraints: "1 ≤ n ≤ 10^5",
    sampleInput: "5\n2 4 1 3 5",
    sampleOutput: "3",
    testCases: [{ input: "5\n2 4 1 3 5", expected: "3" }]
  },
  {
    id: "arr-d-12", topic: "arrays", level: "difficult", isDaily: false,
    title: "Median of Two Sorted Arrays",
    description: "Find median of two sorted arrays in O(log(m+n)) time.",
    inputFormat: "First line: m n. Second line: m integers. Third line: n integers.",
    outputFormat: "Print median as float with 1 decimal.",
    constraints: "0 ≤ m,n ≤ 1000",
    sampleInput: "2 2\n1 3\n2 4",
    sampleOutput: "2.5",
    testCases: [{ input: "2 2\n1 3\n2 4", expected: "2.5" }]
  },

  // ===== STRINGS - SIMPLE =====
  {
    id: "str-s-1", topic: "strings", level: "simple", isDaily: false,
    title: "Reverse a String",
    description: "Reverse the given string.",
    inputFormat: "A single string.",
    outputFormat: "Print reversed string.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "hello",
    sampleOutput: "olleh",
    testCases: [{ input: "hello", expected: "olleh" }, { input: "abcde", expected: "edcba" }]
  },
  {
    id: "str-s-2", topic: "strings", level: "simple", isDaily: false,
    title: "Check Palindrome",
    description: "Check if the string is a palindrome.",
    inputFormat: "A single string.",
    outputFormat: "YES or NO.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "racecar",
    sampleOutput: "YES",
    testCases: [{ input: "racecar", expected: "YES" }, { input: "hello", expected: "NO" }]
  },
  {
    id: "str-s-3", topic: "strings", level: "simple", isDaily: false,
    title: "Count Vowels",
    description: "Count the number of vowels in a string (a,e,i,o,u).",
    inputFormat: "A single string.",
    outputFormat: "Print count.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "hello world",
    sampleOutput: "3",
    testCases: [{ input: "hello world", expected: "3" }, { input: "aeiou", expected: "5" }]
  },
  {
    id: "str-s-4", topic: "strings", level: "simple", isDaily: false,
    title: "Convert to Uppercase",
    description: "Convert the string to uppercase.",
    inputFormat: "A single string.",
    outputFormat: "Print uppercase string.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "hello World",
    sampleOutput: "HELLO WORLD",
    testCases: [{ input: "hello World", expected: "HELLO WORLD" }]
  },
  {
    id: "str-s-5", topic: "strings", level: "simple", isDaily: false,
    title: "Word Count",
    description: "Count number of words in a sentence.",
    inputFormat: "A single string sentence.",
    outputFormat: "Print word count.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "the quick brown fox",
    sampleOutput: "4",
    testCases: [{ input: "the quick brown fox", expected: "4" }, { input: "hello", expected: "1" }]
  },
  {
    id: "str-s-6", topic: "strings", level: "simple", isDaily: false,
    title: "Check Anagram",
    description: "Check if two strings are anagrams of each other.",
    inputFormat: "Two strings on separate lines.",
    outputFormat: "YES or NO.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "listen\nsilent",
    sampleOutput: "YES",
    testCases: [{ input: "listen\nsilent", expected: "YES" }, { input: "hello\nworld", expected: "NO" }]
  },
  {
    id: "str-s-7", topic: "strings", level: "simple", isDaily: false,
    title: "First Non-Repeating Character",
    description: "Find the first character that doesn't repeat. Print '_' if none.",
    inputFormat: "A single string.",
    outputFormat: "Print the character.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "leetcode",
    sampleOutput: "l",
    testCases: [{ input: "leetcode", expected: "l" }, { input: "aabb", expected: "_" }]
  },
  {
    id: "str-s-8", topic: "strings", level: "simple", isDaily: false,
    title: "Count Character Frequency",
    description: "Count frequency of each character in alphabetical order.",
    inputFormat: "A single lowercase string.",
    outputFormat: "Print char:count pairs.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "banana",
    sampleOutput: "a:3 b:1 n:2",
    testCases: [{ input: "banana", expected: "a:3 b:1 n:2" }]
  },
  {
    id: "str-s-9", topic: "strings", level: "simple", isDaily: false,
    title: "String Compression",
    description: "Compress string using counts of repeated characters. If compressed is not shorter, return original.",
    inputFormat: "A single string.",
    outputFormat: "Print compressed string.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "aabcccccaaa",
    sampleOutput: "a2b1c5a3",
    testCases: [{ input: "aabcccccaaa", expected: "a2b1c5a3" }, { input: "abc", expected: "abc" }]
  },
  {
    id: "str-s-10", topic: "strings", level: "simple", isDaily: false,
    title: "Remove Duplicates",
    description: "Remove duplicate characters from string, keep first occurrence.",
    inputFormat: "A single string.",
    outputFormat: "Print string without duplicates.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "banana",
    sampleOutput: "ban",
    testCases: [{ input: "banana", expected: "ban" }, { input: "abcdef", expected: "abcdef" }]
  },
  {
    id: "str-s-11", topic: "strings", level: "simple", isDaily: false,
    title: "Check Rotation",
    description: "Check if string s2 is a rotation of string s1.",
    inputFormat: "Two strings on separate lines.",
    outputFormat: "YES or NO.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "abcde\ndeabc",
    sampleOutput: "YES",
    testCases: [{ input: "abcde\ndeabc", expected: "YES" }, { input: "hello\nworld", expected: "NO" }]
  },
  {
    id: "str-s-12", topic: "strings", level: "simple", isDaily: false,
    title: "Title Case",
    description: "Convert string to title case (first letter of each word uppercase).",
    inputFormat: "A single string.",
    outputFormat: "Print title-cased string.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "hello world this is a test",
    sampleOutput: "Hello World This Is A Test",
    testCases: [{ input: "hello world this is a test", expected: "Hello World This Is A Test" }]
  },

  // ===== STRINGS - HARD =====
  {
    id: "str-h-1", topic: "strings", level: "hard", isDaily: false,
    title: "Longest Palindromic Substring",
    description: "Find the longest palindromic substring.",
    inputFormat: "A single string.",
    outputFormat: "Print the longest palindrome.",
    constraints: "1 ≤ |s| ≤ 1000",
    sampleInput: "babad",
    sampleOutput: "bab",
    testCases: [{ input: "babad", expected: "bab" }, { input: "cbbd", expected: "bb" }]
  },
  {
    id: "str-h-2", topic: "strings", level: "hard", isDaily: false,
    title: "Minimum Window Substring",
    description: "Find smallest window in s containing all characters of t.",
    inputFormat: "Two strings on separate lines.",
    outputFormat: "Print minimum window. Empty string if not found.",
    constraints: "1 ≤ |s|,|t| ≤ 1000",
    sampleInput: "ADOBECODEBANC\nABC",
    sampleOutput: "BANC",
    testCases: [{ input: "ADOBECODEBANC\nABC", expected: "BANC" }]
  },
  {
    id: "str-h-3", topic: "strings", level: "hard", isDaily: false,
    title: "Group Anagrams",
    description: "Group anagrams together from array of strings.",
    inputFormat: "First line: n. Second line: n strings.",
    outputFormat: "Print groups sorted lexicographically.",
    constraints: "1 ≤ n ≤ 10^4",
    sampleInput: "6\neat tea tan ate nat bat",
    sampleOutput: "ate eat tea\nbat\nnat tan",
    testCases: [{ input: "6\neat tea tan ate nat bat", expected: "ate eat tea\nbat\nnat tan" }]
  },
  {
    id: "str-h-4", topic: "strings", level: "hard", isDaily: false,
    title: "Longest Substring Without Repeating",
    description: "Find length of longest substring without repeating characters.",
    inputFormat: "A single string.",
    outputFormat: "Print length.",
    constraints: "0 ≤ |s| ≤ 5×10^4",
    sampleInput: "abcabcbb",
    sampleOutput: "3",
    testCases: [{ input: "abcabcbb", expected: "3" }, { input: "bbbbb", expected: "1" }]
  },
  {
    id: "str-h-5", topic: "strings", level: "hard", isDaily: false,
    title: "Valid Parentheses",
    description: "Check if string of brackets is valid (properly nested).",
    inputFormat: "A single string of brackets.",
    outputFormat: "YES or NO.",
    constraints: "1 ≤ |s| ≤ 10^4",
    sampleInput: "([{}])",
    sampleOutput: "YES",
    testCases: [{ input: "([{}])", expected: "YES" }, { input: "([)]", expected: "NO" }]
  },
  {
    id: "str-h-6", topic: "strings", level: "hard", isDaily: false,
    title: "String Permutation Check",
    description: "Check if string s1 is a permutation of any substring of s2.",
    inputFormat: "Two strings on separate lines.",
    outputFormat: "YES or NO.",
    constraints: "1 ≤ |s1|,|s2| ≤ 10^4",
    sampleInput: "ab\neidbaooo",
    sampleOutput: "YES",
    testCases: [{ input: "ab\neidbaooo", expected: "YES" }, { input: "ab\neidboaoo", expected: "NO" }]
  },
  {
    id: "str-h-7", topic: "strings", level: "hard", isDaily: false,
    title: "Longest Common Prefix",
    description: "Find longest common prefix among an array of strings.",
    inputFormat: "First line: n. Second line: n strings.",
    outputFormat: "Print common prefix. Empty if none.",
    constraints: "1 ≤ n ≤ 200",
    sampleInput: "4\nflower flow flight fly",
    sampleOutput: "fl",
    testCases: [{ input: "4\nflower flow flight fly", expected: "fl" }]
  },
  {
    id: "str-h-8", topic: "strings", level: "hard", isDaily: false,
    title: "String to Integer (atoi)",
    description: "Implement atoi - convert string to integer. Handle whitespace, sign, and overflow.",
    inputFormat: "A single string.",
    outputFormat: "Print integer (clamp to 32-bit range).",
    constraints: "0 ≤ |s| ≤ 200",
    sampleInput: "  -42abc",
    sampleOutput: "-42",
    testCases: [{ input: "  -42abc", expected: "-42" }, { input: "4193 with words", expected: "4193" }]
  },
  {
    id: "str-h-9", topic: "strings", level: "hard", isDaily: false,
    title: "Decode Ways",
    description: "Count ways to decode string (1=A...26=Z).",
    inputFormat: "A numeric string.",
    outputFormat: "Print number of ways.",
    constraints: "1 ≤ |s| ≤ 100",
    sampleInput: "226",
    sampleOutput: "3",
    testCases: [{ input: "226", expected: "3" }, { input: "12", expected: "2" }]
  },
  {
    id: "str-h-10", topic: "strings", level: "hard", isDaily: false,
    title: "Roman to Integer",
    description: "Convert Roman numeral to integer.",
    inputFormat: "A Roman numeral string.",
    outputFormat: "Print integer.",
    constraints: "1 ≤ |s| ≤ 15",
    sampleInput: "MCMXCIV",
    sampleOutput: "1994",
    testCases: [{ input: "MCMXCIV", expected: "1994" }, { input: "III", expected: "3" }]
  },
  {
    id: "str-h-11", topic: "strings", level: "hard", isDaily: false,
    title: "Reverse Words in String",
    description: "Reverse the order of words in a string.",
    inputFormat: "A single string.",
    outputFormat: "Print reversed words.",
    constraints: "1 ≤ |s| ≤ 10^4",
    sampleInput: "the sky is blue",
    sampleOutput: "blue is sky the",
    testCases: [{ input: "the sky is blue", expected: "blue is sky the" }]
  },
  {
    id: "str-h-12", topic: "strings", level: "hard", isDaily: false,
    title: "Count and Say",
    description: "Generate nth term of count-and-say sequence.",
    inputFormat: "Single integer n.",
    outputFormat: "Print nth term.",
    constraints: "1 ≤ n ≤ 30",
    sampleInput: "4",
    sampleOutput: "1211",
    testCases: [{ input: "4", expected: "1211" }, { input: "5", expected: "111221" }]
  },

  // ===== STRINGS - DIFFICULT =====
  {
    id: "str-d-1", topic: "strings", level: "difficult", isDaily: false,
    title: "Regular Expression Matching",
    description: "Implement regex matching with '.' and '*'.",
    inputFormat: "Two strings on separate lines (string and pattern).",
    outputFormat: "YES or NO.",
    constraints: "0 ≤ |s|,|p| ≤ 20",
    sampleInput: "aa\na*",
    sampleOutput: "YES",
    testCases: [{ input: "aa\na*", expected: "YES" }, { input: "ab\n.*c", expected: "NO" }]
  },
  {
    id: "str-d-2", topic: "strings", level: "difficult", isDaily: false,
    title: "Longest Valid Parentheses",
    description: "Find length of longest valid parentheses substring.",
    inputFormat: "A string of parentheses.",
    outputFormat: "Print length.",
    constraints: "0 ≤ |s| ≤ 3×10^4",
    sampleInput: ")()())",
    sampleOutput: "4",
    testCases: [{ input: ")()())", expected: "4" }, { input: "(()", expected: "2" }]
  },
  {
    id: "str-d-3", topic: "strings", level: "difficult", isDaily: false,
    title: "Edit Distance",
    description: "Find minimum edit distance (Levenshtein) between two strings.",
    inputFormat: "Two strings on separate lines.",
    outputFormat: "Print minimum operations.",
    constraints: "0 ≤ |s|,|t| ≤ 500",
    sampleInput: "horse\nros",
    sampleOutput: "3",
    testCases: [{ input: "horse\nros", expected: "3" }, { input: "intention\nexecution", expected: "5" }]
  },
  {
    id: "str-d-4", topic: "strings", level: "difficult", isDaily: false,
    title: "KMP Pattern Search",
    description: "Find all occurrences of pattern in text using KMP algorithm.",
    inputFormat: "Two strings on separate lines (text, pattern).",
    outputFormat: "Print 0-indexed positions.",
    constraints: "1 ≤ |text|,|pattern| ≤ 10^6",
    sampleInput: "AABAACAADAABAAABAA\nAABAA",
    sampleOutput: "0 9 13",
    testCases: [{ input: "AABAACAADAABAAABAA\nAABAA", expected: "0 9 13" }]
  },
  {
    id: "str-d-5", topic: "strings", level: "difficult", isDaily: false,
    title: "Palindrome Partitioning",
    description: "Find minimum cuts to partition string into palindromes.",
    inputFormat: "A single string.",
    outputFormat: "Print minimum cuts.",
    constraints: "1 ≤ |s| ≤ 2000",
    sampleInput: "aab",
    sampleOutput: "1",
    testCases: [{ input: "aab", expected: "1" }, { input: "racecar", expected: "0" }]
  },
  {
    id: "str-d-6", topic: "strings", level: "difficult", isDaily: false,
    title: "Distinct Subsequences",
    description: "Count distinct subsequences of s that equal t.",
    inputFormat: "Two strings on separate lines.",
    outputFormat: "Print count.",
    constraints: "0 ≤ |s|,|t| ≤ 1000",
    sampleInput: "rabbbit\nrabbit",
    sampleOutput: "3",
    testCases: [{ input: "rabbbit\nrabbit", expected: "3" }]
  },
  {
    id: "str-d-7", topic: "strings", level: "difficult", isDaily: false,
    title: "Wildcard Matching",
    description: "Implement wildcard pattern matching with '?' and '*'.",
    inputFormat: "Two strings on separate lines (string, pattern).",
    outputFormat: "YES or NO.",
    constraints: "0 ≤ |s|,|p| ≤ 2000",
    sampleInput: "adceb\n*a*b",
    sampleOutput: "YES",
    testCases: [{ input: "adceb\n*a*b", expected: "YES" }, { input: "acdcb\na*c?b", expected: "NO" }]
  },
  {
    id: "str-d-8", topic: "strings", level: "difficult", isDaily: false,
    title: "Largest Number from Array",
    description: "Arrange array of non-negative integers to form largest possible number.",
    inputFormat: "First line: n. Second line: n integers.",
    outputFormat: "Print largest number.",
    constraints: "1 ≤ n ≤ 100",
    sampleInput: "4\n10 2 9 1",
    sampleOutput: "92110",
    testCases: [{ input: "4\n10 2 9 1", expected: "92110" }]
  },
  {
    id: "str-d-9", topic: "strings", level: "difficult", isDaily: false,
    title: "Z Algorithm",
    description: "Find occurrences of pattern in text using Z-function.",
    inputFormat: "Two strings on separate lines (text, pattern).",
    outputFormat: "Print 0-indexed positions.",
    constraints: "1 ≤ |text|,|pattern| ≤ 10^6",
    sampleInput: "GEEKS FOR GEEKS\nGEEKS",
    sampleOutput: "0 10",
    testCases: [{ input: "GEEKS FOR GEEKS\nGEEKS", expected: "0 10" }]
  },
  {
    id: "str-d-10", topic: "strings", level: "difficult", isDaily: false,
    title: "String Interleaving",
    description: "Check if s3 is formed by interleaving s1 and s2.",
    inputFormat: "Three strings on separate lines.",
    outputFormat: "YES or NO.",
    constraints: "0 ≤ |s1|,|s2| ≤ 100",
    sampleInput: "aabcc\ndbbca\naadbbcbcac",
    sampleOutput: "YES",
    testCases: [{ input: "aabcc\ndbbca\naadbbcbcac", expected: "YES" }]
  },
  {
    id: "str-d-11", topic: "strings", level: "difficult", isDaily: false,
    title: "Minimum Bracket Additions",
    description: "Find minimum number of brackets to add to make string valid.",
    inputFormat: "A string of brackets.",
    outputFormat: "Print minimum additions.",
    constraints: "1 ≤ |s| ≤ 10^5",
    sampleInput: "())(",
    sampleOutput: "2",
    testCases: [{ input: "())(",  expected: "2" }, { input: "(((",  expected: "3" }]
  },
  {
    id: "str-d-12", topic: "strings", level: "difficult", isDaily: false,
    title: "Shortest Palindrome",
    description: "Find shortest palindrome by adding characters at front of string.",
    inputFormat: "A single string.",
    outputFormat: "Print shortest palindrome.",
    constraints: "0 ≤ |s| ≤ 5×10^4",
    sampleInput: "aacecaaa",
    sampleOutput: "aaacecaaa",
    testCases: [{ input: "aacecaaa", expected: "aaacecaaa" }, { input: "abcd", expected: "dcbabcd" }]
  }
];

export function getCodingProblems(topic, level) {
  return codingProblems.filter(p => p.topic === topic && p.level === level);
}

export function getDailyProblem() {
  const today = new Date().getDate();
  return codingProblems[today % codingProblems.length];
}

export const codingTopics = [
  { id: "arrays", name: "Arrays", available: true },
  { id: "strings", name: "Strings", available: true },
];
