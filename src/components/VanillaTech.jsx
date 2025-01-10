import React from 'react';
import { useState } from 'react';

const VanillaTech = () => {

const [toggleVisibility, setToggleVisibility] = useState(true);

const toggleVisibilityFunc = () =>{
    setToggleVisibility(prevState => !prevState);
}

  return (
    <div>
        <p style={{ display: toggleVisibility ? 'block' : 'none' }}> Grapefruit are forever</p>
        <button  onClick={toggleVisibilityFunc}>Toggle Visibity</button>
    </div>
  )
}

export default VanillaTech