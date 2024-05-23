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

export const updateChildOnParentChange = (data: any, indexString: any, newPermissions: any, permissionClicked: any) => {
  debugger
  // Split the index string into an array of indexes
  const indexes = indexString.split('-').map(Number);

  // Helper function to recursively navigate to the target node
  const findNodeByIndexes = (data: any, indexes: any) => {
    let node = data[indexes[0]]; // Start with the root node

    // Traverse the tree following the indexes
    for (let i = 1; i < indexes.length; i++) {
      if (!node.child || !node.child[indexes[i]]) {
        return null; // Index path is invalid
      }
      node = node?.child?.[indexes[i]];
    }

    return node; // Return the found node
  };

  // Function to recursively update children
  const updateChildrenPermissions = (children: any, newPermissions: any) => {
    children.forEach((child: Array<any>) => {
      // Update the child's permissions
      child.allowed = [...newPermissions];

      // if (permissionClicked) {
      //   child.allowed = child.allowed?.filter(permission => permission === permissionClicked)
      // }


      // If the child has its own children, recursively update them
      if (child?.child && child?.child?.length > 0) {
        updateChildrenPermissions(child?.child, newPermissions);
      }
    });
  };

  // Find the target node using the indexes
  const targetNode = findNodeByIndexes(data, indexes);

  if (targetNode) {
    // Update the target node's permissions
    targetNode.allowed = [...newPermissions];

    // Update all children permissions recursively
    if (targetNode?.child && targetNode?.child.length > 0) {
      updateChildrenPermissions(targetNode?.child, newPermissions);
    }
  } else {
    console.error('Invalid index path:', indexString);
  }

  return data;
};

