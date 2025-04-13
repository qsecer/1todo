import React , {Component} from "react";
import Task from "../Task/Task.jsx";
import "./TaskList.css";

export default class TaskList extends Component {
    render() {
        const { tasks, onDeleted, onCompleted, onEdit, onEditing, updateTaskLabel, submitEdit, offEdit } = this.props;

        return (
            <ul className="todo-list">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        label={task.label}
                        completed={task.completed}
                        onDeleted={onDeleted}
                        onCompleted={onCompleted}
                        onEdit={onEdit}
                        createdAt={task.createdAt}
                        isEditing={task.isEditing}
                        onEditing={onEditing}
                        updateTaskLabel={updateTaskLabel}
                        submitEdit={submitEdit}
                        offEdit={offEdit}
                    />
                ))}
            </ul>
        );
    }
}