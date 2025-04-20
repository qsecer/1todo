import React, {Component} from "react";


export default  class NewTaskForm extends Component {
    state = {
        label : "",
        min: "",
        sec: ""
    }

    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const { label, min, sec } = this.state;
        if (label.trim() === "") return;

        this.props.onAdd(label, min, sec)
        this.setState({
            label : "",
            min: "",
            sec: "",
        })
    }

    render () {
        return (
          <header className="header">
              <h1>Todos</h1>
              <form onSubmit={this.onSubmit} className='new-todo-form'>
                  <input className="new-todo"
                         type='text'
                         name='label'
                         value={this.state.label}
                         onChange={this.onInputChange}
                         placeholder="What needs to be done?"
                         autoFocus
                  />
                  <input
                    type="number"
                    name="min"
                    className="new-todo-form__timer"
                    placeholder="Min"
                    onChange={this.onInputChange}

                  />
                  <input
                    type="number"
                    name="sec"
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    onChange={this.onInputChange}

                  />
                  <button type="submit"></button>
              </form>

          </header>
        )
    }

}