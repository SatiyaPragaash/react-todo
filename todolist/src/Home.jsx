import React, {useState, useEffect} from 'react'
import Create from './Create'
import axios from 'axios'
import './App.css';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos,setTodos]= useState([])

    useEffect(()=> {
      axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err=> console.log(err))

    }, [])

    const handleEdit = (id) => {
      //Update UI first for instant feedback smoother UX
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    
      axios.put(`http://localhost:3001/update/${id}`)
        .catch(err => console.log(err));
    };
    

    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/delete/${id}`)
        .then(() => {
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        })
        .catch(err => console.log(err));
    };
    

  return (
    <div className="home">
      <h2>To-do List</h2>
    <Create setTodos={setTodos} />
    {   
        todos.length ===0?
        <div><h2>No Record</h2></div>
        :
        todos.map(todo => (
          <div className="task">
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done ?
                <BsFillCheckCircleFill className='icon_check'></BsFillCheckCircleFill>
              : <BsCircleFill className='icon_check'/>
              }
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
          </div>
          <div>
          <span><BsFillTrashFill className='icon' 
            onClick={() => handleDelete(todo._id)} /></span>

          </div>
        </div>
      ))
    }
    </div>
  )
}


export default Home