export function findObjectByIndex(json: any, indices: any) {
  // if (indices.length === 0) {
  //   return json;
  // }
  // const currentIndex = indices.shift();
  // const currentIndexInt = parseInt(currentIndex);
  // if (Array.isArray(json) && currentIndexInt < json.length) {
  //   return findObjectByIndex(json[currentIndexInt], indices);
  // } else if (json.hasOwnProperty(currentIndex)) {
  //   return findObjectByIndex(json[currentIndex], indices);
  // } else {
  //   return null; // Index not found in the JSON structure
  // }

  if (indices.length === 0) {
    return json;
  }
  const currentIndex = indices.shift();
  const currentIndexInt = parseInt(currentIndex);
  if (Array.isArray(json) && currentIndexInt < json.length) {
    return findObjectByIndex(json[currentIndexInt], indices);
  } else if (Object.prototype.hasOwnProperty.call(json, currentIndex)) {
    return findObjectByIndex(json[currentIndex], indices);
  } else {
    return null; // Index not found in the JSON structure
  }
}
export function modifyObjectByIndexWithKey(json: any, indices: any, newValue: any, key: any) {
  if (indices.length === 0) {
    json.allowed = []; // Clear the array
    json.allowed.push(...newValue); // Push the new value as a single string
    return json;
  }
}
