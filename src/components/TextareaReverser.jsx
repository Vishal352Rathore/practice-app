import React, { useState } from 'react';

const TextareaReverser = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const reversedText = text.split('').reverse().join('');

    return (
        <div>
            <textarea
                value={text}
                onChange={handleChange}
                rows={5}
                cols={40}
            />
            <div>
                <h3>Reversed Text:</h3>
                <p>
                    {reversedText}
                </p>
            </div>
        </div>
    );
};

export default TextareaReverser;
