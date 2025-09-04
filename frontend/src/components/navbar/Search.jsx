import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function Search(){ 
    const style = 
    {
      
    }
  return (
    <div>
      <input  style={{borderRadius: "20px", border: "2px solid blue" }} type='text' placeholder='Search for Anything' />           
    </div>      
  );

}
export default Search;