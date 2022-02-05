import React from 'react'
import './TodoList.css';

class TodoList extends React.Component {
    removeItem(item, i) {
        this.props.removeTodo(item, i);
    }

    render() {
        return (
            <ul className='list'>
                {this.props.todos.map((todo, i) => {
                    return <li key={i}>
                        {todo}
                        <span className='icon' onClick={() => { this.removeItem(todo, i) }}>
                            <i className='fas fa-trash'></i>
                        </span>
                    </li>
                })}
            </ul>
        )
    }
}
export default TodoList;