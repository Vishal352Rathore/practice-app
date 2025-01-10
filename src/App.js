import './App.css';
import { useState, createContext, useContext, useReducer, useEffect } from 'react';
import ThoughtWin from './components/ThoughtWin';
import TodoList from './components/TodoList';
import DoodleBlue from './components/DoodleBlue';
import CustomTable from './components/CustomTable';
import ThoughtWin2 from './components/ThoughtWin2';
import StarRating from './components/StarRating';
import SquareGrid from './components/SqaureGrid';
import VanillaTech from './components/VanillaTech';
import TextareaReverser from './components/TextareaReverser';
import SimpleForm from './components/SimpleForm';
import PrimeNumberChecker from './components/PrimeNumberChecker';
import { MyUseRefComponent } from './components/MyUseRefComponent';
import ChaiPoint from './components/ChaiPoint';
export const UserContext = createContext()

function App() {

  const reducerMethod = (users, action) => {
    switch (action.type) {
      case 'addUser': {
        return [...users, action.newUser]
      }
      case 'updateUser': {
        return users.map(user => {
          if (user.id == action.updatedUser.id)
            return action.updatedUser
          return user;
        })
      }
      case 'deleteUser': {
        return users.filter(user => user.id !== action.id)
      }
      default: {
        return users
      }
    }
  }

  const userData = [
    {
      id: 1,
      name: 'kunal',
      age: 22,
      admin: true
    },
    {
      id: 2,
      name: 'rounak',
      age: 23,
      admin: false
    },
    {
      id: 3,
      name: 'utkarsh',
      age: 22,
      admin: false
    },
  ]

  const [user, setUser] = useState("Jesse Hall");
  const [state, dispatch] = useReducer(reducerMethod, userData)

  const [todoItem, setTodoItem] = useState([]);

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const result = await response.json();
        setTodoItem(result.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTodos();
  }, []);

  return (
    <ChaiPoint/>
    // <PrimeNumberChecker number={2}/>
    // <SimpleForm/>
    // <TextareaReverser/>
    /* <VanillaTech/> */
    // <SquareGrid/>
    // <MyUseRefComponent />
    // <div>
    //   {loading ? (
    //     <div className="text-center">Loading...</div>
    //   ) : (
    //     <CustomTable sortData={todoItem} />
    //   )}
    // </div>
    // <TodoList/>
    // <UserContext.Provider value={{state , dispatch ,user}}>
    //   <ThoughtWin />
    // </UserContext.Provider>
    // <ThoughtWin2/>
    // <StarRating />
    // <CustomTable sortData={todoItem}/>
  );
}

export default App;

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  );
}

function Component5() {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <h1>Component 5</h1>
      <h2 onClick={() => setUser("Vikas")}>{`Hello ${user} again!`}</h2>

    </>
  );
}
