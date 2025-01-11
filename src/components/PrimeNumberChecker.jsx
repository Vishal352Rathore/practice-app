import React from 'react';

const PrimeNumberChecker = ({ number }) => {
    const isPrime = (num) => {
        if (num <= 1) return false; 
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false; 
        }
        return true; 
    };

    // Hello World , I am here .
    
    const primeStatus = isPrime(number) ? 'is a prime number' : 'is not a prime number';

    return (
        <div style={{ padding: '20px' }}>
            <h3>The number {number} {primeStatus}.</h3>
        </div>
    );
};

export default PrimeNumberChecker;
