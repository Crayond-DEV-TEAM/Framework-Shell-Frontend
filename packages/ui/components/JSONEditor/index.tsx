/* eslint-disable no-prototype-builtins */
import { Input } from '@atoms/input';
import { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { useJSON, useSchemaLoader } from '@core/store';
export const JSONEditor = (props: any): JSX.Element => {
  const { addedjson, setAddedjson, createJSON } = useJSON();
  const { vendorJSON, destinationJSON, setVendorJSON, setDestinationJSON, updateAPI } = useSchemaLoader();
  const { activeStep, schema, setSchema, onNext } = props;
  useEffect(() => {
    if (schema.length > 0) {
      const tempSchema = schema.length > 0 ? { schema: schema } : '';
      setAddedjson(JSON.stringify(tempSchema));
    } else {
      setAddedjson('');
    }
  }, [schema]);

  /* const getRecursiveObject = (jsonObj: any, key: any, text: any, arr: any = []) => {
    console.log(key, text);
    let temp_arr: any = arr;
    const data_keys = Object.keys(jsonObj).map((x) => {
      // console.log('x++++', x);
      if (typeof jsonObj[x] === 'object' && !Array.isArray(x)) {
        // console.log('x ', x);
        temp_arr = getRecursiveObject(jsonObj[x], x, `${key}.${x}.`, temp_arr);
        return temp_arr;
      } else {
        temp_arr = `${key}.` === text ? [...temp_arr, `${key}.${x}`] : [...temp_arr, `${text}${key}.${x}`];
        return temp_arr;
      }
    });
    // console.log(temp_arr);
    return temp_arr;
  }; */

  const getNestedKeys = (obj: any, parentKey = '') => {
    let keys: any = [];
    for (const key in obj) {
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

  return (
    <Box sx={{ m: 2, px: 0 }}>
      <Input
        isMulti={true}
        rows={16}
        placeholder={`Paste your json here \n Schema Format
                {
                  "schema": [
                    {
                        "id": "A1",
                        "title": "A-size",
                        "isEnabled": true
                    },
                    {
                        "id": "A2",
                        "title": "A-Color",
                        "isEnabled": true
                    }
                  ]
                }`}
        value={activeStep === 'source' ? vendorJSON : destinationJSON}
        // value={addedjson}
        onChange={(e: any) => {
          // setAddedjson(e.target.value);
          activeStep === 'source' ? setVendorJSON(e.target.value) : setDestinationJSON(e.target.value);
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
        <Button
          size="small"
          // variant="outlined"
          onClick={() => {
            const temp =
              activeStep === 'source'
                ? vendorJSON.replace(/^(A-Z,a-z,0-9])$/g, '"\\$&"')
                : destinationJSON.replace(/^(A-Z,a-z,0-9])$/g, '"\\$&"');
            const obj = JSON.parse(temp);
            const pretty = JSON.stringify(obj, undefined, 4);
            activeStep === 'source' ? setVendorJSON(pretty) : setDestinationJSON(pretty);
          }}
        >
          Prettify
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            // createJSON(activeStep, 'JSON');
            const temp =
              activeStep === 'source' ? vendorJSON.replace(/&quot;/gi, '"') : destinationJSON.replace(/&quot;/gi, '"');
            const obj = JSON.parse(temp);
            let keys = Object.keys(obj);
            let removeEle: any[] = [];
            keys.map((key: any, index: any) => {
              if (typeof obj[key] === 'object' && Array.isArray(obj[key])) {
                console.log('HAI');
                // let array: any[] = [];
                // obj[key].map((x: any) => {
                //   if (typeof x === 'object') {
                const arr_elements = getNestedKeys(obj[key][0], key);
                console.log(arr_elements);
                //     console.log(arr_elements);
                //     // const inner_data_array = Object.keys(x).map((z) => `${key}->${z}`);
                //     array = [...array, ...arr_elements];
                //     removeEle = [...removeEle, key];
                //   }
                //   return;
                // });
                // let temp = [...new Set(array)];
                // temp = temp.length > 0 ? temp : key;
                // keys = [...keys, temp].flat();
              } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                const arr_elements = getNestedKeys(obj[key], key);
                console.log(arr_elements);
                // const inner_data = Object.keys(obj[key]).map((x) => `${key}.${x}`);
                removeEle = [...removeEle, key];
                keys = [...keys, ...arr_elements];
              }
            });
            keys = keys.filter((x) => removeEle.indexOf(x) === -1);
            keys = [...new Set(keys)];
            const schema = keys.map((x, index) => ({ id: x, title: x, isEnabled: true }));
            console.log(schema);
            setSchema(schema);
            // onNext();
            // updateAPI(activeStep, 'JSON', onNext);
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};
