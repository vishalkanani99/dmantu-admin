// @param data Array ex. ['value'] or [{'key': 'value'}]
// @param searchVal String
// @param searchBy String or Array
// @param recursiveKey String
// @return results Array

const search = async (data, searchVal, searchBy='', recursiveKey = 'children') => {
  if(!searchVal) return data;
  const promises = deepSearch(data, searchVal, searchBy, recursiveKey);
  const results = await Promise.all(promises);
  return results;
}

// @param data Array ex. ['value'] or [{'key': 'value'}]
// @param searchVal String
// @param searchBy String or Array
// @param recursiveKey String
// @return searchedData Array
// @return found Array

const deepSearch = (data, searchVal, searchBy, recursiveKey, searchedData = []) => {
    let value, found = searchedData;

  for(let i in data){
    if(!data[i]) continue;

    // Check if data array contain only values
    if(typeof data[i] === 'string'  || typeof data[i] === 'number') {
      let isValidValue = isValid(data[i], searchVal);
      if(isValidValue){
        found.push(data[i]);
        continue;
      }
    }

    //search values in object keys by searchBy or skip searchBy
    let hasSearchByKeys = searchBy && searchBy.length > 0;

    for(let k in data[i]){

      if(typeof data[i] !== 'object') break;
      if(!data[i][k]) continue;

      if(hasSearchByKeys && !searchBy.includes(k)) continue;

      let isValidValue = isValid(data[i][k], searchVal);
      if(isValidValue){
        found.push(data[i]);
        break;
      }
    }

    if(data[i][recursiveKey] && data[i][recursiveKey].length > 0) {
      found = deepSearch(data[i][recursiveKey], searchVal, searchBy, recursiveKey, found);
    }
  }
  return found;
}

const isValid = (testValue, searchVal) => {
  // If test value is not string, convert it into string
  testValue = typeof testValue !== 'string' ? testValue.toString() : testValue;
  return testValue.startsWith(searchVal);
}

// @param data Array
// @param sortBy Object
// @param recursiveKey String
// @return results Array

const sort = async (data, sortBy, recursiveKey = 'children') => {
  const promises = deepSort(data, sortBy, recursiveKey);
  const results = await Promise.all(promises);
  return results;
}

// @param data Array
// @param sortArr Array [[col, order], ...]
// @param recursiveKey String
// @return results Array

const deepSort = (data, sortArr, recursiveKey) => {
  const results = data.sort((a, b) => {

    for(let sortBy of sortArr){

      if(typeof a[sortBy[0]] === 'string') {
        const fieldA = a[sortBy[0]].toUpperCase(); // ignore upper and lowercase
        const fieldB = b[sortBy[0]].toUpperCase(); // ignore upper and lowercase
        
        if(sortBy[1] === 'asc'){
          if (fieldA < fieldB) {
            return -1;
          }
          if (fieldA > fieldB) {
            return 1;
          }
        }

        if(sortBy[1] === 'desc'){
          if (fieldA > fieldB) {
            return -1;
          }
          if (fieldA < fieldB) {
            return 1;
          }
        }
      }

      if(typeof a[sortBy[0]] === 'number') {
          
        if(sortBy[1] === 'asc'){
          return a[sortBy[0]] - b[sortBy[0]];
        }

        if(sortBy[1] === 'desc'){
          return b[sortBy[0]] - a[sortBy[0]];
        }
      }

    }

    // names must be equal
    return 0;
  });

  for( let d in results ) {
    if( results[d][recursiveKey] && results[d][recursiveKey].length > 0 ){
      results[d][recursiveKey] = deepSort(results[d][recursiveKey], sortArr, recursiveKey);
    }
  }

  return results;
}

export { search, sort }