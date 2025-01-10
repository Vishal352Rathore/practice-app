import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const CustomTable = ({ sortData }) => {

    const [tableData, setTableData] = useState(sortData);
    const [sortConfig, setSortConfig] = useState({ key: null, sortOrder: "ascending" });
    const [filterText,setFilterText] = useState("")

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        setTableData(sortData);
        setCurrentPage(1);
    }, [sortData])

    const onSort = (key) => {

        let sortOrder = "ascending";

        if (sortConfig.key === key && sortConfig.sortOrder === "ascending") {
            sortOrder = "descending";
        }

        let sortData = tableData?.sort((a, b) => {
            if (a[key] > b[key]) {
                return sortOrder === "ascending" ? 1 : -1;
            }
            if (a[key] < b[key]) {
                return sortOrder === "ascending" ? -1 : 1;
            }
            return 0;
        })

        setTableData(sortData);
        setSortConfig({ key, sortOrder });

    }

    const filterTextFunc = (event) =>{
        setFilterText(event.target.value);
        setCurrentPage(1);
    }

    const filteredData = filterText? tableData.filter((item)=> item.todo.toLowerCase().includes(filterText.toLowerCase())) : tableData;

    const setCurrentPageFunc = (index) => {
        setCurrentPage(index);
    }

    const totalPages = tableData.length / itemsPerPage;
    const firstIndex = currentPage * itemsPerPage - itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    const paginatedData = filteredData.slice(firstIndex, lastIndex);

    return (
        <div>
            <h1>CustomTable</h1>

            <input
               type="text"
               placeholder="Search"
               value={filterText}
               onChange={filterTextFunc}            
            />

            <table>
                <thead>
                    <tr>
                        <th className='curser-pointer' onClick={() => onSort("id")}>
                            Id
                        </th>
                        <th className='curser-pointer' onClick={() => onSort("todo")}>
                            Todo
                        </th>
                        <th className='curser-pointer' onClick={() => onSort("completed")}>
                            Completed
                        </th>
                        <th className='curser-pointer' onClick={() => onSort("userId")}>
                            UserId
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedData?.map((data, index) => (
                            <tr key={data.id}>
                                <td>
                                    {data.id}
                                </td>
                                <td>
                                    {data.todo}
                                </td><td>
                                    {data.completed ? "true" : "false"}
                                </td><td>
                                    {data.userId}
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>

            <div>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPageFunc(index + 1)}
                        >
                            {index + 1}
                        </button>

                    ))
                }
            </div>
        </div>
    )
}

export default CustomTable