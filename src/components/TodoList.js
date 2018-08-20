import React, { Component } from "react";
import Todo from "./Todo";
import "../css/todo.css";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                // { id: "1", text: "Do laundry" },
                // { id: "2", text: "Fill in tax form" },
                // { id: "3", text: "Make a todo app" }
            ],
            errors: null
        };

        this.eachTodo = this.eachTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.nextId = this.nextId.bind(this);
        this.clearError = this.clearError.bind(this);
    }

    update(updateText, index) {
        console.log("updating todo at index ", index, updateText);
        if (updateText.length > 0) {
            this.setState(prevState => ({
                todos: prevState.todos.map(
                    todo =>
                        todo.id !== index ? todo : { ...todo, text: updateText }
                )
            }));
        } else {
            console.log("Update failed : No text input");
            this.setState({
                error: "Please enter something in update text field."
            });
        }
    }

    delete(index) {
        console.log("Deleting item at ", index);
        this.setState(prevState => ({
            todos: prevState.todos.filter(todo => todo.id !== index)
        }));
    }

    eachTodo(todo, i) {
        return (
            <Todo
                key={todo.id}
                index={todo.id}
                onChange={this.update}
                onDelete={this.delete}
                clearError={this.clearError}
            >
                {todo.text}
            </Todo>
        );
    }

    addTodo(e) {
        e.preventDefault();
        if (this._newText.value.length > 0) {
            this.setState(prevState => ({
                todos: [
                    {
                        id: this.nextId(),
                        text: this._newText.value
                    },
                    ...prevState.todos
                ]
            }));
        } else {
            this.setState({
                error: "Please add some task."
            });
        }
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    clearError() {
        this.setState({
            error: ""
        });
    }

    render() {
        return (
            <div id="TodoList">
                <h1>React Todo List</h1>
                <span className="error">{this.state.error}</span>
                <form id="TodoForm" onSubmit={this.addTodo}>
                    <input
                        type="text"
                        ref={input => (this._newText = input)}
                        onKeyDown={this.clearError}
                    />
                    <button>Add</button>
                </form>
                <ul className="todos">{this.state.todos.map(this.eachTodo)}</ul>
            </div>
        );
    }
}

export default TodoList;
