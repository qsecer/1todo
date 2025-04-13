import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm.jsx";
import Footer from "../Footer/Footer.jsx";
import TaskList from "../TaskList/TaskList.jsx";
import "./app.css"

export default class App extends Component {
    maxId = 0;

    createTask = (label) => {
        return {
            label: label,
            completed: false,
            id: ++this.maxId,
            createdAt: new Date(),
            isEditing: false
        }
    }

    state = {
        tasks: [],
        filter: 'all',
    };

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

    addTask = (task) => {
        this.setState(({ tasks }) => ({
            tasks: [...tasks, this.createTask(task)]
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