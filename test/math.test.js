// math.test.js

   // Import necessary functions for testing from Vitest
   import { expect, test } from 'vitest';

   // Define a function named sum that takes two numbers (a and b) as arguments
   // and returns their sum
   function sum(a, b) {
     return a + b;
   }

   // Create a test using the `test` function from Vitest
   test('adds two numbers', { retry: 3 }, () => {
     // Inside the test function, we define what we want to test
     // The first argument is a description of the test
     
     // Use the `expect` function to make assertions about the result
     // We expect the sum of 2 and 3 to be 5
     expect(sum(2, 3)).toBe(5);
   });

   // Retry test
  // Add { retry: 3 } into test is number times retry test when false test