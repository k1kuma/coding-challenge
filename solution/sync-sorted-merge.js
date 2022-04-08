"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // now we have `n` LogSources, start popping entries and decide between:
  // 1) place N popped entries into an array and sorted, repeat for every pop
  // 2) pop all the entries for each logSource and merge two sets of logSources 
  // at a time.
  let printArr = [];

  for (let i in logSources) { 
    let logSource = logSources[i];
    while(logSource.drained == false) {
      const entry = logSource.pop();
      if (entry && typeof entry === 'object') {
        printArr.push(entry);
      }
    }
  }

  printArr.sort((a, b) => new Date(b.date) - new Date(a.date));
  // console.log(JSON.stringify(printArr, null , 2));

  for (let i in printArr) {
    if (printArr[i]) {
      printer.print('i: ' + JSON.stringify(printArr[i]));
    }
  }

  printer.done();

  // let minHeap = new MinHeap();
  // int[][] arr = { { 2, 6, 12, 34 },
  // { 1, 9, 20, 1000 },
  // { 23, 34, 90, 2000 } };
  // int k = 4;
  // int n = 3;
  // int[] output = new int[n * k];

  // mergeKArrays(arr, n, output);

  // System.out.println("Merged array is ");
  // printArray(output, n * k);
  return console.log("Sync sort complete.");
};
