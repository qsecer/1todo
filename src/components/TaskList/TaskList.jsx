import React from 'react';
import Task from "../Task/Task.jsx";

export default function TaskList ({
                                    tasks,
                                    onDeleted,
                                    onCompleted,
                                    onEdit,
                                    onEditing,
                                    updateTaskLabel,
                                    submitEdit,
                                    offEdit,
                                    startTimer,
                                    runTimer,
                                    stopTimer,
                                  })
                                    { return (
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
                                                            startTimer={startTimer}
                                                            min={task.min}
                                                            sec={task.sec}
                                                            remainingTime={task.remainingTime}
                                                            runTimer={runTimer}
                                                            stopTimer={stopTimer}
                                                            isTimerRunning={task.isTimerRunning}
                                                        />
                                                    ))}
                                                </ul>
                                            );
                                    }