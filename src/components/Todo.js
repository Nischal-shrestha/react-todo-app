import React, { Component } from "react";
import "../css/todo.css";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };

        this.renderTodo = this.renderTodo.bind(this);
        this.edit = this.edit.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.renderTodoEdit = this.renderTodoEdit.bind(this);
    }

    componentDidUpdate() {
        if (this.state.editing) this._updateText.focus();
    }

    edit() {
        this.setState({
            editing: true
        });
        this.props.clearError();
    }

    update(e) {
        e.preventDefault();
        this.props.onChange(this._updateText.value, this.props.index);
        this.setState({
            editing: false
        });
    }

    delete() {
        this.props.onDelete(this.props.index);
    }

    renderTodo() {
        return (
            <li onClick={this.edit} id="edit" title="click to edit">
                <span className="text">{this.props.children}</span>
                <button onClick={this.delete} className="delete">
                    <span role="img">&#10005;</span>
                </button>
            </li>
        );
    }

    renderTodoEdit() {
        return (
            <li id="edit">
                <form onSubmit={this.update} id="updateForm">
                    <input
                        type="text"
                        ref={input => (this._updateText = input)}
                        defaultValue={this.props.children}
                    />
                    <button className="update">&#128190;</button>
                </form>
            </li>
        );
    }

    render() {
        return this.state.editing ? this.renderTodoEdit() : this.renderTodo();
    }
}

export default Todo;
