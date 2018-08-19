import React, { Component } from "react";
import Todo from "./Todo";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                // { id: "1", text: "Do laundry" },
                // { id: "2", text: "Fill in tax form" },
                // { id: "3", text: "Make a todo app" }
            ]
        };

        this.eachTodo = this.eachTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.nextId = this.nextId.bind(this);
    }

    update(updateText, index) {
        console.log("updating todo at index ", index, updateText);
        this.setState(prevState => ({
            todos: prevState.todos.map(
                todo =>
                    todo.id !== index ? todo : { ...todo, text: updateText }
            )
        }));
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
            >
                {todo.text}
            </Todo>
        );
    }

    addTodo(e) {
        e.preventDefault();
        this.setState(prevState => ({
            todos: [
                ...prevState.todos,
                {
                    id: this.nextId(),
                    text: this._newText.value
                }
            ]
        }));
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    render() {
        return (
            <div id="TodoList">
                <form onSubmit={this.addTodo}>
                    <input type="text" ref={input => (this._newText = input)} />
                    <button>Add</button>
                </form>
                {this.state.todos.map(this.eachTodo)}
            </div>
        );
    }
}

export default TodoList;
