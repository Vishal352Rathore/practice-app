import React from 'react'
import { useEffect, useState } from 'react'
const ThoughtWin2 = () => {


    // const [users, setUsers] = useState([])

   const fetchUsers = () =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        console.log("users",json)
        // setUsers(json);
        fetchPosts(json);
    })
    }

    const fetchPosts = (users) =>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            addPostToUser(json,users);
        })
        }
    
        const addPostToUser = (json ,users) =>{
            let usersWithPost = users.map((item,index)=> ({...item,"posts" : json.filter(element => element.userId === item.id)}))
            console.log("addedPostToUser",usersWithPost);

            usersWithPost.forEach((element) => {
              let  {address,company, ...rest} = element
              console.log(rest);
        });
        }


    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div>
            Hello Users
        </div>
    )
}

export default ThoughtWin2
