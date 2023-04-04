function operations(a, op, b) {
  if (op === '+') {
      return a+b
  }
  if (op === '-') {
      return a-b
  }
}

function separateNumbersAndSigns(sign, item) {
    let indexList = item.indexOf(sign);
    let itemSlpit = item.split(sign).filter(item => item != '');
    let length = itemSlpit.length;
    let count = 1;

    if(!indexList) {
      itemSlpit.splice(0,0,sign);
    }
    else if(indexList==item.length-1) {
      itemSlpit.splice(item.length-1,0,sign);
    }
    else {
      for(let i = 0; i<length-1; i++) {
        itemSlpit.splice(count,0,sign);
        count = count + 2;
      }
    }
    return itemSlpit;

}

function simpleCount(str) {
  let items=[];
  let newItem = '';

  if(str.includes('(')) {
    return countWithBrackets(str)
  }

  str.split(' ').forEach((item) => {
    if(item.length >= 1 && item.includes('+')) {
      newItem = separateNumbersAndSigns('+', item);
    }
    else if(item.length > 1 && item.includes('-')) {
      newItem = separateNumbersAndSigns('-', item);
    }
    else {
      newItem = item
    }

    if(Array.isArray(newItem)) {
      items.push(...newItem);
    } else {
      items.push(newItem);  
    }
  })

  let newItems = items.map((item) => {
    if(isNaN(+item)) {
        return item
    }
    return +item
  });

  let newItemsCopy = [...newItems];
  
  for(let i=0; i < newItems.length; i=i+3) {
      if(newItemsCopy?.length > 3) {
          newItemsCopy = [operations(...newItemsCopy.splice(0,3)), ...newItemsCopy] 
      }
      if(newItemsCopy?.length < 4) {
          newItemsCopy = operations(...newItemsCopy)
      }
  }
  return newItemsCopy;
}

function countWithBrackets(str) {
  if(str.includes('(')) {
    let numbersInBrackets = str.substring(str.lastIndexOf("(")+1,str.lastIndexOf(")"));
    let newStr = str.slice(0,str.lastIndexOf("(")) + simpleCount(numbersInBrackets) + str.slice(str.lastIndexOf(")")+1,str.length);
    return simpleCount(newStr);
 }

 else {
   return simpleCount(str)
 }
}

console.log(countWithBrackets('(2 +3) -1 + (1 + 10+ 1)'));
console.log(countWithBrackets(' -1 + (1 + 10+ 1)'));
console.log(countWithBrackets('1 + 1'));
console.log(countWithBrackets('1 -1'));
console.log(countWithBrackets(' -1 -1'));