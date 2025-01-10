import React from 'react'
import { useRef, useState, useEffect } from 'react';


const UseRef = () => {
    const [inputValue, setInputValue] = useState("");
    // const [count, setCount] = useState("");
  
    const count = useRef(0);
    const inputElement = useRef();
  
    const previousInputValue = useRef("");
  
    useEffect(() => {
      previousInputValue.current = inputValue;
    }, [inputValue]);
  
  
    useEffect(() => {
      count.current = count.current + 1;
      // setCount(count+1);
    })
  
    const focusInput = () => {
      inputElement.current.focus();
    };
  
  return (
    <div>
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />

    
    <h2>Current Value: {inputValue}</h2>
    <h2>Previous Value: {previousInputValue.current}</h2>

    <p>Render Count: {count.current}</p>

    <input type="text" ref={inputElement} />
    <button onClick={focusInput}>Focus Input</button>


  </div>
  )
}

export default UseRef
