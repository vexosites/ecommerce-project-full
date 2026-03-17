export default function quickSort(arr, field) {
    if (arr.length <= 1) return arr;
  
    const pivot = arr[0];
    
    const m = arr.slice(1).filter(i => i[field] < pivot[field]);
    const b = arr.slice(1).filter(i => i[field] >= pivot[field]);
  
    return [...quickSort(m, field), pivot, ...quickSort(b, field)];
  }
  