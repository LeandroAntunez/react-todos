import React, { useState, useRef, useEffect } from 'react';
import { TodoList } from './components/Todo/TodoList';
import { v4 as uuidv4 } from 'uuid';
import './style.css';

export function App() {
    const [todos, setTodos] = useState([{ id: 1, task: 'Tarea 1', completed: false }])

    const todoTaskRef = useRef();

    const KEY = "todoApp.todos";

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos) {
            setTodos(storedTodos)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task, completed: false }]
        });

        todoTaskRef.current.value = null;
    }

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (
        <div class="wrapper">
            <header>Aplicación de Tareas</header>
            <div className='inputField'>
                <input type="text" placeholder='Nueva tarea' ref={todoTaskRef}></input>
                <button onClick={handleTodoAdd}><i class='fas fa-plus'></i></button>
            </div>
            <ul className='todoList'>
                <TodoList todos={todos} toggleTodo={toggleTodo} />
                <li>Ir al gimnasio <span><i className='fas fa-trash'></i></span></li>
                <li>Bañarse <span><i className='fas fa-trash'></i></span></li>
                <li>Ocio <span><i className='fas fa-trash'></i></span></li>
                <li>Dormir <span><i className='fas fa-trash'></i></span></li>
            </ul>
            <div className='footer'>
                <span>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar.</span>
                <button onClick={handleClearAll}>Borrar todo</button>
            </div>
        </div>
    );
}

/*
<>
            <NavigationBar />
            <p className='subtitle'>Puedes agregar tareas, y eliminar las tareas completadas</p>
            <div className='todo'>
                <TodoList todos={todos} toggleTodo={toggleTodo} />
                <input className="form-control" ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
                <div className='buttons'>
                    <button class="btn btn-warning btn-lg" onClick={handleTodoAdd}>Agregar</button>
                    <button class="btn btn-danger btn-lg btn-block" onClick={handleClearAll}>Eliminar</button>
                </div>
                <p>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar.</p>
            </div>
            <Footer />
        </ >
*/