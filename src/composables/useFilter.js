// @param data Array
// @param searchVal String
// @param searchBy String or Array
// @param recursiveKey String
// @return results Array

const search = async (data, searchVal, searchBy, recursiveKey = 'children') => {
  if(!searchVal) return data;
  const promises = deepSearch(data, searchVal, searchBy, recursiveKey);
  const results = await Promise.all(promises);
  return results;
}

// @param data Array
// @param searchVal String
// @param searchBy String or Array
// @param recursiveKey String
// @return searchedData Array
// @return found Array

const deepSearch = (data, searchVal, searchBy, recursiveKey, searchedData = []) => {
    let found = searchedData

  for(let i in data){
    //search in object keys
    for(let k in data[i]){
      if(!data[i][k]) break;
      
      let r = typeof data[i][k] !== 'string' ? data[i][k].toString() : data[i][k];
      if( (searchBy.length > 0 && searchBy.includes(k)) || searchBy.length === 0){
        if(r.startsWith(searchVal)){
          found.push(data[i]);
          break;
        }
      }
    }

    if(data[i][recursiveKey] && data[i][recursiveKey].length > 0) {
      found = deepSearch(data[i][recursiveKey], searchVal, searchBy, recursiveKey, found);
    }
  }
  return found;
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