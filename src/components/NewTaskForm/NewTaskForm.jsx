import React, { useState } from "react";

export default function NewTaskForm ({onAdd}) {

    const [formData, setFormData] = useState({
        label: '',
        min: '',
        sec: '',
    });

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev)=> {
           return {...prev, [name] : value}
        })
    };

    const onSubmit = (event) => {
         event.preventDefault();
         const {label, min, sec} = formData
         if(label.trim() === '') return;
         onAdd(label, min, sec);
         setFormData({ label: '', min: '', sec: '' });

    };
    return (
          <header className="header"
          >
              <h1>Todos</h1>
              <form onSubmit={onSubmit} className='new-todo-form'>
                  <input className="new-todo"
                         type='text'
                         name='label'
                         value={formData.label}
                         onChange={onInputChange}
                         placeholder="What needs to be done?"
                         autoFocus
                  />
                  <input
                    type="number"
                    name="min"
                    className="new-todo-form__timer"
                    placeholder="Min"
                    value={formData.min}
                    onChange={onInputChange}

                  />
                  <input
                    type="number"
                    name="sec"
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    value={formData.sec}
                    onChange={onInputChange}

                  />
                  <button type="submit"></button>
              </form>

          </header>
        )
}