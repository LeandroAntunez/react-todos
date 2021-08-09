import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4} from 'uuid';

export function App(){
    const [todos, setTodos] = useState([{id: 1, task: 'Tarea 1', completed: false}])
    
    const todoTaskRef = useRef();

    const KEY = "todoApp.todos";

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
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
            return [ ...prevTodos, { id: uuidv4(), task, completed: false}]
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
        <Fragment>
            <div>Aplicacion de tareas:</div>
            <div>Puedes agregar tareas, y eliminar las tareas completadas</div>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
            <button onClick={handleTodoAdd}>agregar</button>
            <button onClick={handleClearAll}>eliminar</button>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
            <div>by Leandro Antúnez</div>
        </Fragment>
    
    );
}