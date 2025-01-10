import React , { useRef } from 'react'

export const MyUseRefComponent = () => {
    const inputRef = useRef();

    const handleButtonClick = () => {
      inputRef.current.focus();
    };
  
    return (
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleButtonClick}>Focus Input</button>
      </div>
    );
}
