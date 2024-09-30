// @param recursiveArr Array ex. [{'key': 'value', 'child': [{'key': 'value'}] }]
// @param recursiveKey String
// @param flatArr Array
// @return flatArr Array

const getFlatArr = async (recursiveArr, recursiveKey = 'children', flatArr = []) => {

  for(let key in recursiveArr){
    let arr = recursiveArr[key];
    let childArr = arr[recursiveKey] ?? [];

    flatArr.push(arr);
    if( childArr.length ){
      getFlatArr(childArr, recursiveKey, flatArr);
    }
  }
  return flatArr;
}

export { getFlatArr }