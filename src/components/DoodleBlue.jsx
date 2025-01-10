import React, { useEffect, useState } from 'react';

const DoodleBlue = ({ tableData }) => {
    const [sortedData, setSortedData] = useState(tableData);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust as needed

    const onSort = (key) => {
        let direction = 'ascending';

        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sorted = [...sortedData].sort((a, b) => {
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
          
            return 0;
        });

        setSortedData(sorted);
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        setSortedData(tableData);
        setCurrentPage(1); // Reset to first page when data changes
    }, [tableData]);

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = filterText
        ? sortedData.filter(item =>
            item.todo.toLowerCase().includes(filterText.toLowerCase())
        )
        : sortedData;

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                placeholder="Filter by todo..."
                value={filterText}
                onChange={handleFilterChange}
                className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-left">
                        <th onClick={() => onSort('id')} className="py-3 px-6 cursor-pointer">ID</th>
                        <th onClick={() => onSort('todo')} className="py-3 px-6 cursor-pointer">Todo</th>
                        <th onClick={() => onSort('completed')} className="py-3 px-6 cursor-pointer">Completed</th>
                        <th onClick={() => onSort('userId')} className="py-3 px-6 cursor-pointer">User ID</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {currentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{item.id}</td>
                            <td className="py-3 px-6">{item.todo}</td>
                            <td className="py-3 px-6">{item.completed ? "true" : "false"}</td>
                            <td className="py-3 px-6">{item.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <div>
                    {/* Placeholder for left-side content if needed */}
                </div>
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoodleBlue;
