/*
Problem: File Upload with Progress
Difficulty: Medium
Category: TypeScript API - File Handling

Create a function that uploads files with progress tracking and error handling.

Example 1:
  Input: file = new Blob(['test content'], { type: 'text/plain' }), url = '/upload'
  Output: { 
    success: true, 
    fileId: 'abc123', 
    url: '/files/abc123.txt',
    progress: 100 
  }

Example 2:
  Input: file = new Blob(['image data'], { type: 'image/png' }), url = '/upload'
  Output: { 
    success: true, 
    fileId: 'def456', 
    url: '/files/def456.png',
    progress: 100 
  }

Requirements:
  - Use FormData for file upload
  - Track upload progress if possible
  - Handle different file types
  - Return upload result with file info
  - Support upload cancellation

Time Complexity: O(1) for setup
Space Complexity: O(1)

Hints:
  - Use FormData.append() for file data
  - XMLHttpRequest supports progress events better than fetch
  - Check file size and type before upload
  - Handle upload errors appropriately
  - Return structured response data
*/

export const functionName = 'uploadFileWithProgress';

export const tests = [
  {
    input: [
      new Blob(['test content'], { type: 'text/plain' }),
      'test.txt',
      'https://httpbin.org/post'
    ],
    expected: { 
      success: true, 
      fileName: 'test.txt',
      size: expect.any(Number),
      progress: 100 
    }
  },
  {
    input: [
      new Blob(['{"data": "test"}'], { type: 'application/json' }),
      'data.json',
      'https://httpbin.org/post'
    ],
    expected: { 
      success: true, 
      fileName: 'data.json',
      size: expect.any(Number),
      progress: 100 
    }
  },
  {
    input: [
      new Blob(['small file'], { type: 'text/plain' }),
      'small.txt',
      'https://httpbin.org/post'
    ],
    expected: { 
      success: true, 
      fileName: 'small.txt',
      size: expect.any(Number),
      progress: 100 
    }
  }
];