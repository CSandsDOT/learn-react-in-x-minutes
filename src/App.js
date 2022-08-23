import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'
import './App.css';

const LOCAL_STORAGE_KEY = "todoApp_todos"

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    if(todos.length > 0){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log(`storing ${todos.length} todos`)
    }else{
      console.log("nothing to store")
    }
  },[todos])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
    console.log("Stored todos: ", storedTodos)
  }, [])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){

    const name = todoNameRef.current.value
    if(name === '')return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    console.log(`saved ${todos.length} todos`)
    todoNameRef.current.value = null
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo = {toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button>Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
