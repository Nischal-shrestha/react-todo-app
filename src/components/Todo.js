import React, { Component } from "react";

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

    edit() {
        this.setState({
            editing: true
        });
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
            <li>
                {this.props.children}
                <button onClick={this.edit} id="edit">
                    E
                </button>
                <button onClick={this.delete}>X</button>
            </li>
        );
    }

    renderTodoEdit() {
        return (
            <form onSubmit={this.update}>
                <input
                    type="text"
                    ref={input => (this._updateText = input)}
                    defaultValue={this.props.children}
                />
                <button>U</button>
            </form>
        );
    }

    render() {
        return this.state.editing ? this.renderTodoEdit() : this.renderTodo();
    }
}

export default Todo;
