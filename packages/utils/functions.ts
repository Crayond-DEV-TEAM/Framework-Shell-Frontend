export const camalize = function camalize(str: any) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m: any, chr: any) => chr.toUpperCase());
};

export const makeid = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
//Function to validate email
export const ValidateEmail = (email: any) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return Boolean(re.test(email));
};

export const routeTo = (store: any, path: any, routeAfter = 1000) =>
  setTimeout(() => {
    store.setState({ route: path });
  }, routeAfter);

/* eslint-disable implicit-arrow-linebreak */
export const parseJwt = (token: any) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const getNestedKeys = (obj: any, parentKey = '') => {
  let keys: any = [];
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      let nestedKey = parentKey
        ? `${parentKey}${
            typeof obj === 'object' && !Array.isArray(obj) ? `.${key}` : !isNaN(parseInt(key)) ? '->' : `.${key}`
          }`
        : `${key}`;
      nestedKey = nestedKey.replaceAll('->.', '->');
      nestedKey.slice(-2) !== '->' && keys.push(nestedKey);

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(getNestedKeys(obj[key], nestedKey));
      }
    }
  }

  return keys;
};

export const getKeys = (temp: any) => {
  const obj = JSON.parse(JSON.stringify(temp));
  let keys = Object.keys(obj);
  let removeEle: any[] = [];
  // console.log(keys)
  keys.map((key: any, index: any) => {
    // console.log(key, typeof obj[key]);
    if (typeof obj[key] === 'object' && Array.isArray(obj[key])) {
      // console.log(key, obj[key]);
      let array: any[] = [];
      obj[key].map((x: any) => {
        // console.log(x, key);
        if (typeof x === 'object') {
          // console.log()
          // const inner_data_array = Object.keys(x).map((z) => `${key}->${z}`);
          const arr_elements = getNestedKeys(obj[key], key);
          array = [...array, ...arr_elements];
          // console.log(array);
          removeEle = [...removeEle, key];
        }
        return;
      });
      // console.log(array);
      let temp = [...new Set(array)];
      temp = temp.length > 0 ? temp : key;
      // console.log(keys, temp);
      keys = [...keys, temp].flat();
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      // console.log(obj[key]);
      // const inner_data = Object.keys(obj[key]).map((x) => `${key}.${x}`);
      // keys.splice(keys.indexOf(key), 1);
      const arr_elements = getNestedKeys(obj[key], key);
      removeEle = [...removeEle, key];
      keys = [...keys, ...arr_elements];
    }
  });
  console.log(removeEle);
  keys = keys.filter((x) => removeEle.indexOf(x) === -1);
  keys = [...new Set(keys)];
  return keys;
};
