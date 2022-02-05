import React from 'react'
import './TodoItem.css'

export function TodoItem({ todo, toggleTodo }) {
    const { id, task, completed } = todo

    const handleTodoClick = () => {
        toggleTodo(id)

    }

    return (
        <li >
            <input className="form-check-input" type="checkbox" checked={completed} onChange={handleTodoClick} />
            {task}
        </li>
    )
}