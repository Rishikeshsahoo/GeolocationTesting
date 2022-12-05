import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { color } from '@mui/system';


export default function ControllableStates({inputArray,label,setParam,param,disabled}) {
  const [value, setValue] = React.useState(param);
  React.useEffect(()=>{setValue(param)},[param])
  return (
    <div>
      
    {/* <h5>{param}</h5>
    <h5>{value}</h5> */}

      <Autocomplete
       disablePortal
        value={param}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onSelect={(event,newValue)=>{
          setParam(value)
        }}
        
        options={inputArray}
        sx={{ width: 300 }}
        disabled={disabled}
        color="info"
        renderInput={(params) => <TextField color='info' {...params} variant="outlined" label={label} />}
      />
    </div>
  );
}
