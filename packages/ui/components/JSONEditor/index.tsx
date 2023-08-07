import { Input } from '@atoms/input';
import { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { useJSON } from '@core/store';
export const JSONEditor = (props: any): JSX.Element => {
  const { addedjson, setAddedjson } = useJSON();
  console.log(props.schema);
  const { schema, setSchema, onNext } = props;
  //   const [addedjson, setAddedjson] = useState<any>('');
  useEffect(() => {
    if (schema.length > 0) {
      const tempSchema = schema.length > 0 ? { schema: schema } : '';
      setAddedjson(JSON.stringify(tempSchema));
    } else {
      setAddedjson('');
    }
  }, [schema]);

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
        value={addedjson}
        onChange={(e: any) => {
          setAddedjson(e.target.value);
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
        <Button
          size="small"
          // variant="outlined"
          onClick={() => {
            // const temp = addedjson.replace(/^([A-Z,a-z,0-9])$/g, (match: any, offset: any) => {
            //   console.log(match);
            //   return `"${match}"`;
            // });
            const temp = addedjson.replace(/^(A-Z,a-z,0-9])$/g, '"\\$&"');
            // const temp = addedjson.replace(/'/g, '"');
            const obj = JSON.parse(temp);
            const pretty = JSON.stringify(obj, undefined, 4);
            setAddedjson(pretty);
            // console.log(typeof pretty);
          }}
        >
          Prettify
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            const temp = addedjson.replace(/&quot;/gi, '"');
            const obj = JSON.parse(temp);
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
                    const inner_data_array = Object.keys(x).map((z) => `${key}->${z}`);
                    array = [...array, ...inner_data_array];
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
                const inner_data = Object.keys(obj[key]).map((x) => `${key}.${x}`);
                // keys.splice(keys.indexOf(key), 1);
                removeEle = [...removeEle, key];
                keys = [...keys, ...inner_data];
              }
            });
            console.log(removeEle);
            keys = keys.filter((x) => removeEle.indexOf(x) === -1);
            keys = [...new Set(keys)];
            const schema = keys.map((x, index) => ({ id: x, title: x, isEnabled: true }));
            // console.log(schema);
            setSchema(schema);
            onNext();
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};
