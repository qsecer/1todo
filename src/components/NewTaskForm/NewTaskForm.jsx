import React, {Component} from "react";
import "./NewTaskForm.css"

export default  class NewTaskForm extends Component {
    state = {
        label : "",
    }
    changeLabel = (event) => {
        this.setState({
            label : event.target.value,
        })

    }
    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.label.trim() === "") return;
        this.props.onAdd(this.state.label)
        this.setState({
            label : "",
        })
    }
    render () {
        return (
            <header className="header">
                <h1>Todos</h1>
                <form onSubmit={this.onSubmit}>
                    <input className="new-todo"
                           value={this.state.label}
                           onChange={this.changeLabel}
                           placeholder="What needs to be done?"
                    />
                </form>
            </header>
        )
    }

}