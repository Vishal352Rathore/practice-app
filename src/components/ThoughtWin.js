import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App.js';

const ThoughtWin = () => {
    const { state, dispatch, user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [company, setCompany] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        axios('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setData(res.data);
            });
    }, []);

    const handleEdit = (company, index) => {
        setCompany(company);
        setIndex(index);
    };

    const handleChange = (e) => {
        setCompany(e.target.value);
    };

    const finalSubmit = () => {
        data[index].company.name = company;
        setData([...data]);
        setCompany("");
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">ThoughtWin</h1>

            <div className="mb-6">
                <input
                    value={company}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                    placeholder="Edit company name"
                />
                <button
                    onClick={finalSubmit}
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Company List</h2>
                {
                    data.length > 0 && data.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b py-2">
                            <p className="text-gray-700">{item.company.name}</p>
                            <button
                                onClick={() => handleEdit(item.company.name, index)}
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="mt-6 bg-white shadow-md rounded-lg p-4">
                <h1 className="text-xl font-semibold mb-4">Component 5</h1>
                <h1 className="text-lg">{`Hello ${user} again`}</h1>

                {
                    state.map((items, index) => (
                        <div key={index} className="flex justify-between items-center border-b py-2">
                            <p className="text-gray-700">{items.name}</p>
                            <button
                                onClick={() => dispatch({ type: "deleteUser", id: items.id })}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ThoughtWin;
