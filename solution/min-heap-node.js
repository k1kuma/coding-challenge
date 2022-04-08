// MinHeapNode is a class that will be the unit of storage for the min Heap tree that 
// will used to merge and keep sorted the array of log entries coming from N log sources.
module.exports = class MinHeapNode {
    // element - The element to be stored
    // i - index of the array from which the element is taken
    // j - index of the next element to be picked from array
    constructor(element, i , j) {
      this.element = element;
      this.i = i;
      this.j = j;
    }
}