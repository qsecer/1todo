import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm.jsx";
import Footer from "../Footer/Footer.jsx";
import TaskList from "../TaskList/TaskList.jsx";
import "./app.css"

export default class App extends Component {
    maxId = 0;

    state = {
        tasks: [],
        filter: 'all',
    };

    createTask = (label, min, sec) => {

        return {
            label: label,
            completed: false,
            id: ++this.maxId,
            createdAt: new Date(),
            isEditing: false,
            min: Number(min),
            sec: Number(sec),
            isTimerRunning: false,
            remainingTime: Number(min) * 60 + Number(sec),
        }
    }

    onCompleted = (id) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        }));
    };

    counterOfCompleted = () => {
        return this.state.tasks.filter((task) => !task.completed).length;
    };

    deleteTask = (id) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter(task => task.id !== id)
        }));
    };

    addTask = (task,  min, sec) => {
        this.setState(({ tasks }) => ({
            tasks: [...tasks, this.createTask(task, min, sec)]
        }));
    };

    clearCompleted = () => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter(task => !task.completed),
        }));
    };

    setFilter = (filter) => {
        this.setState({ filter });
    };

    getFilteredItems = () => {
        const { tasks, filter } = this.state;
        switch (filter) {
            case 'all':
                return tasks;
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    };

    onEditing = (id) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.map(task =>
                task.id === id ? { ...task, isEditing: true } : task
            )
        }));
    };

    submitEdit = (e,  id) => {
        e.preventDefault()
        const input = document.querySelector('li.editing > form.editing-form > input')
        this.setState(({ tasks }) => ({
            tasks: tasks.map(task =>
                task.id === id ? { ...task, isEditing : false, label: input.value } : task
            )
        }));
    };

    offEdit =  (id)=> {
        this.setState(({tasks}) => ({
            tasks: tasks.map(task =>
            task.id === id ? { ...task, isEditing: false} : task
            )
        }))
    };

    startTimer = (id, remainingTime) => {
        console.log(`task is running ${id}`);

        this.setState((tasks) => ({
            tasks: tasks.map(task =>
              task.id === id ? { ...task, remainingTime: setInterval(()=>{
                      remainingTime - 1
                  }, 1000)} : task
            )
        }))
        console.log(`remainingTime: ${remainingTime}`);
    }

    pauseTimer = (id, remainingTime) => {
        console.log(`task is pause ${id}`);
        console.log(`remainingTime: ${remainingTime}`);
    }

    render() {
        const activeTasks = this.counterOfCompleted();
        const filteredTodos = this.getFilteredItems();
        return (

            <div className="todoapp">
                <NewTaskForm
                    onAdd={this.addTask}
                />
                <TaskList
                    tasks={filteredTodos}
                    onDeleted={this.deleteTask}
                    onCompleted={this.onCompleted}
                    onEdit={this.onEdit}
                    updateTaskLabel={this.updateTaskLabel}
                    onEditing={this.onEditing}
                    isEditing={this.state.isEditing}
                    submitEdit={this.submitEdit}
                    offEdit={this.offEdit}
                    pauseTimer={this.pauseTimer}
                    startTimer={this.startTimer}

                />
                <Footer
                    counterOfCompleted={activeTasks}
                    clearCompleted={this.clearCompleted}
                    setFilter={this.setFilter}
                    currentFilter={this.state.filter}
                />
            </div>
        );
    }
}