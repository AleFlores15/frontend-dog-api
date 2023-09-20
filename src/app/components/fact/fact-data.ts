export function generatePages(total: number, perPage: number) {
    const len = Math.ceil(total / perPage);
    const arr = [];
  
    for (let i = 0; i < len; i++) {
      arr.push(i + 1);
    }
  
    return arr;
  }