import React, { useState, useEffect } from 'react';

const SquareGrid = () => {
    const [squares, setSquares] = useState(Array(60).fill(false)); // false for black, true for white
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setTimeout(() => {
            setSquares((prevSquares) => {
                const newSquares = [...prevSquares];
                newSquares[currentIndex] = true; // Turn the current square white
                return newSquares;
            });

            setCurrentIndex((prevIndex) => {
                if (prevIndex < squares.length - 1) {
                    return prevIndex + 1; // Move to the next square
                } else {
                    // If all squares are white, reset
                    setTimeout(() => {
                        setSquares(Array(60).fill(false)); // Reset all squares to black
                        setCurrentIndex(0); // Reset index
                    }, 1000); // Wait for a second before resetting
                    return prevIndex; // Keep the current index until reset
                }
            });
        }, 1000); // Every second

        return () => clearTimeout(interval); // Clean up on unmount
    }, [currentIndex, squares.length]);

    return (
        <div className="grid grid-cols-10 gap-2 bg-slate-500">
            {squares.map((isWhite, index) => (
                <div
                    key={index}
                    className={`w-10 h-10 ${isWhite ? 'bg-white' : 'bg-black'}`}
                />
            ))}
        </div>
    );
};

export default SquareGrid;
