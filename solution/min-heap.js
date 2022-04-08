const MinHeapNode = require("./min-heap-node");

module.exports = class MinHeap {
    constructor(minHeapNodeArr, size) {
        // Current number of elements in min heap
        this.heap_size = size;
        // Array of elements in heap --> MinHeapNode[]
        this.harr = minHeapNodeArr;

        let i = (this.heap_size - 1)/2;
        while (i >= 0)
        {
            minHeapify(i);
            i--;
        }
    }

    // A recursive method to heapify a subtree
    // with the root at given index.
    // This method assumes that the subtrees are already heapified
    minHeapify(i) {
        const l = left(i);
        const r = right(i);
        let smallest = i;
        if (l < this.heap_size && this.harr[l].element < this.harr[i].element){
            smallest = l;
        }
        if (r < this.heap_size && this.harr[r].element < this.harr[smallest].element) {
            smallest = r;
        }
        if (smallest != i)
        {
            swap(this.harr, i, smallest);
            minHeapify(smallest);
        }
    }

    // to get index of left child of node at index i
    left(i) { return (2*i + 1); }

    // to get index of right child of node at index i
    right(i) { return (2*i + 2); }

    // to get the root
    // @return MinHeapNode root
    getMin()
    {
        if(this.heap_size <= 0)
        {
            console.log('Heap underflow');
            return null;
        }
        return this.harr[0];
    }

    // A utility function to swap two min heap nodes
    // @param arr - minHeapNode[]
    // @param i - index i
    // @param j - index j
    swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        return;
    }
 
    // A utility function to print array elements
    printArray(arr) {
        for(let i of arr) {
            console.log(i);
        }
        return;
    }

    // to replace root with new node
    // "root" and heapify() new root
    // @param MinHeapNode root
    replaceMin(root) {
        this.harr[0] = root;
        minHeapify(0);
    }
 
    // This function takes an array of arrays as an argument, arrays are assumed to be sorted.
    // From there, it will merge them all together and prints the final sorted output.
    mergeKSortedArrays(arr, k)
    {
        let hArr = [];
        let resultSize = 0;
        for(let i = 0; i < arr.length; i++)
        {
            let node = new MinHeapNode(arr[i][0],i,1);
            hArr[i] = node;
            resultSize += arr[i].length;
        }

        // Create a min heap with k heap nodes. Every heap node
        // has first element of an array
        let mh = new MinHeap(hArr, k);
        let result = [];     // To store output array

        // Now one by one get the minimum element from min
        // heap and replace it with next element of its array
        for(let i = 0; i < resultSize; i++)
        {
            // Get the minimum element and store it in result
            let root = mh.getMin();
            result[i] = root.element;
 
            // Find the next element that will replace current root of heap.
            // The next element belongs to same array as the current root.
            if(root.j < arr[root.i].length)
                root.element = arr[root.i][root.j++];
            // If root was the last element of its array
            else
                root.element = Integer.MAX_VALUE;
 
            // Replace root with next element of array
            mh.replaceMin(root);
        }
        printArray(result);
    }
}