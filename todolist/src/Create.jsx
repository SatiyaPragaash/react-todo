import React, { useState } from 'react'
import axios from 'axios'

function Create({ setTodos }) { // ✅ Accept setTodos as a prop
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return; // Prevent adding empty tasks

    const newTodo = { _id: Date.now().toString(), task, done: false }; // Temporary task

    // ✅ Update UI first
    setTodos(prevTodos => [...prevTodos, newTodo]);

    // ✅ Then make API request
    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        setTodos(prevTodos => prevTodos.map(todo =>
          todo._id === newTodo._id ? result.data : todo
        ));
      })
      .catch(err => console.log(err));

    setTask(""); // ✅ Clear input field after adding
  };

  return (
    <div className="create_form">
      <input 
        type="text" 
        placeholder="Enter task" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
      /> 
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
