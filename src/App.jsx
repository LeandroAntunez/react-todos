import React from 'react';
import TodoList from './components/Todo/TodoList';
import './style.css';
import Footer from './components/Footer/Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [], text: '' };
        this.removeTodo = this.removeTodo.bind(this);
        this.handleClearAll = this.handleClearAll.bind(this);
    }

    addTodo(e) {
        e.preventDefault();
        if (this.isTextNotEmpty()) {
            this.setState({
                todos: [this.state.text, ...this.state.todos],
                text: ''
            });
        }
    }

    isTextNotEmpty() {
        return this.state.text.trim().length > 0;
    }

    isTodosNotEmpty() {
        return this.state.todos.length > 0;
    }

    removeTodo(name, i) {
        let todos = this.state.todos.slice();
        todos.splice(i, 1);
        this.setState({
            todos
        });
    }

    updateValue(e) {
        this.setState({ text: e.target.value });
    }

    handleClearAll() {
        this.setState({ todos: [] })
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.addTodo(e)
        }
    }

    render() {
        return (
            <div className='flex-wrapper'>
                <div class="wrapper">
                    <header>Aplicación de Tareas</header>
                    <div className='inputField'>
                        <input
                            type="text"
                            placeholder='Nueva tarea'
                            value={this.state.text}
                            onChange={(e) => { this.updateValue(e) }}
                            onKeyPress={(e) => { this.handleKeyPress(e) }}
                        >
                        </input>
                        <button className={this.state.text.trim().length > 0? 'active' : 'disabled'} onClick={(e) => this.addTodo(e)}>
                            <i class='fas fa-plus'></i>
                        </button>
                    </div>
                    <ul className='todoList'>
                        <TodoList todos={this.state.todos} removeTodo={this.removeTodo} />
                    </ul>
                    <div className='footer'>
                        <span>Te quedan {this.state.todos.filter((todo) => !todo.completed).length} tareas por terminar.</span>
                        <button className={this.state.todos.length > 0 ? "active" : ""} onClick={this.handleClearAll}>Borrar todo</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default App;