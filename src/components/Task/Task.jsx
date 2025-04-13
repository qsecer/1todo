import React, {Component} from "react";
import "./Task.css"
import {formatDistanceToNow} from 'date-fns'

export default class Task extends Component {
    state  = {
        newLabel: this.props.label,
    }

    handleInputChange = (e) => {
        this.setState({ newLabel: e.target.value });
    };

    componentDidUpdate(prevProps) {
        if (!prevProps.isEditing && this.props.isEditing) {
            this.setState({ newLabel: this.props.label });
        }
    }

    render() {
        const { label, completed, onDeleted, onEditing, id, isEditing, onCompleted, submitEdit, offEdit} = this.props;
        let liClass = "";
        if(completed){
            liClass += 'completed'
        }
        if(isEditing){
            liClass += 'editing'
        }
        return (
            <li className={liClass}>
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           checked={completed}
                           onChange={() => onCompleted(id)}
                    />
                    <label>
                        <span className="description" onClick={() => onCompleted(id)}>
                                {label}
                        </span>
                        <span className="created">
                                {formatDistanceToNow(this.props.createdAt, {addSuffix: true})}
                            </span>
                    </label>


                    <button className="icon icon-edit" onClick={() => onEditing(id)}/>
                    <button className="icon icon-destroy" onClick={() => onDeleted(id)}/>
                </div>
                {isEditing && (
                    <form
                        onSubmit={()=> submitEdit(e, id)}
                        className='editing-form'
                    >
                        <input
                            type="text"
                            className="edit"
                            value={this.state.newLabel}
                            onChange={this.handleInputChange}
                            autoFocus
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    submitEdit(e, id);
                                }else if (e.key === 'Escape'){
                                   offEdit(id);
                                }
                            }}
                        />
                    </form>
                )}
            </li>
        );
    }
}