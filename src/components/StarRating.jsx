import React from 'react'
import { useState ,useEffect ,useRef} from 'react'

const StarRating = () => {

    const [starRating, setStarRating] = useState(0);
    const ratingRef = useRef(null); 

    const handleStarRating = (index) => {
        setStarRating(index);
    }


    const handleClickOutside = (event) => {
        // If the click is outside the rating component, reset to 0
        if (ratingRef.current && !ratingRef.current.contains(event.target)) {
            setStarRating(0);
        }
    };

    useEffect(() => {
        // Add event listener to handle clicks outside the component
        document.addEventListener('onclick', handleClickOutside);
        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('onclick', handleClickOutside);
        };
    }, []);


    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">Give Rating</h1>
            <div className="flex space-x-2">
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        className={`text-3xl cursor-pointer transition-transform duration-200 ${starRating >= index + 1 ? "text-yellow-500 transform scale-125" : "text-gray-400 hover:text-yellow-400"}`}
                        onClick={() => handleStarRating(index + 1)}
                    >
                        {starRating >= index + 1 ? '★' : '☆'}
                    </span>
                ))}
            </div>
            <p className="mt-2 text-lg">Star rating: <span className="font-semibold">{starRating}</span></p>
        </div>
    )
}

export default StarRating
