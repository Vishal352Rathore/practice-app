import React, { useState, useEffect } from 'react'

const TodoList = () => {

    const [todoItem, setTodoItem] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {

        fetch('https://dummyjson.com/todos')
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setTodoItem(result.todos)
            });
    }, [])


    const taskComplted = (id) => {

        let resArra = todoItem.map((item) => item.id === id ? { ...item, completed: true } : item)

        setTodoItem(resArra);
    }

    const deleteTask = (id) =>{

        setTodoItem( todoItem.filter((item,index)=>(item.id !== id )))
    }

    const addTask = () => {
        if (!newTask.trim()) return;
        const newItem = {
            completed: false,
            id: todoItem.length ? todoItem[todoItem.length - 1].id + 1 : 1,
            todo: newTask,
            userId: 152,
        };

        setTodoItem((prevItems) => [...prevItems, newItem]);
        setNewTask('');
    };


    return (
        <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
            <div className="mt-6 flex justify-between">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2"
                    placeholder="Add a new task"
                />
                <button onClick={() => addTask()}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Add Task
                </button>
            </div>

            <div className="space-y-4">
                {todoItem?.map((item) => {
                    if (!item.completed) {
                        return (
                            <div key={item.id} className="flex justify-between items-center p-2 border-b">
                                <span className="text-lg">{item.todo}</span>
                                <div className='flex gap-4'>
                                <button
                                    onClick={() => taskComplted(item.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                    Completed
                                </button>
                                <button
                                    onClick={() => deleteTask(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                                    Delete
                                </button>
                                </div>
                            </div>
                        );
                    }
                    return null; // Ensure to return null if item is completed
                })}
            </div>


        </div>

    )
}

export default TodoList
