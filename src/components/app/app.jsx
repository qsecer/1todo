import React, { useState, useRef } from 'react';
import NewTaskForm from "../NewTaskForm/NewTaskForm.jsx";
import Footer from "../Footer/Footer.jsx";
import TaskList from "../TaskList/TaskList.jsx";
import "./app.css";

export default function App() {

  const maxId = useRef(0);
  const [ tasks, setTasks ] = useState([]);
  const [ filter, setFilter ] = useState('all');
  const timers = useRef({});

  const createTask = (label, min, sec) => (
    {
      label: label,
      completed: false,
      id: ++maxId.current,
      createdAt: new Date(),
      isEditing: false,
      min: Number(min),
      sec: Number(sec),
      isTimerRunning: false,
      remainingTime: Number(min) * 60 + Number(sec),
    })

  const onTimer = (id) => {
    if(timers.current[id]) return;

    setTasks(prev => prev.map(task =>
      task.id === id ? {...task,  isTimerRunning: true } : task,
    ));

    timers.current[id] = setInterval(() => {
      setTasks(prev => {
        return prev.map(task => {
          if (task.id === id) {
            const newTime = task.remainingTime - 1;
            console.log(newTime);
            if (newTime <= 0) {
              clearInterval(timers.current[id]);
              delete timers.current[id];
              return { ...task, isTimerRunning: false, remainingTime: 0 };
            }

            return { ...task, remainingTime: newTime };
          }
          return task;
        });
      });
    }, 1000);
  }

  const stopTimer = (id) => {
    clearInterval(timers.current[id]);
    delete timers.current[id];

    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isTimerRunning: false } : task
    ));
  }

  const addTask = (label,  min, sec ) => {
    const newTask = createTask( label,  min, sec )
    setTasks(prev => [...prev, newTask])
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const onCompleted = (id) => {
    setTasks(prev => prev.map(task =>
    task.id === id? { ...task, completed: !task.completed } : task))
  };

  const counterOfCompleted = () => {
    return tasks.filter((task) => !task.completed).length;
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter((task) => !task.completed))
  };

  const getFilteredItems = () => {
    switch (filter){
      case "active":
        return tasks.filter(task => !task.completed);
      case "completed":
        return tasks.filter(task => task.completed);
      default:
        return tasks
    }
  };

  const onEditing = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? {...task,  isEditing: true } : task
      ));
  };

  const submitEdit = (e, id) => {
    e.preventDefault()
    const input = document.querySelector('li.editing > form.editing-form > input')
    setTasks(prev => prev.map(task =>
    task.id === id ? { ...task, isEditing: false, label: input.value} : task))
  };

  const offEdit =  (id)=> {
    setTasks(prev => prev.map(task =>
    task.id === id ? { ...task, isEditing: false} : task
    ))
  };

  const filteredTodos = getFilteredItems();
  const activeTasks = counterOfCompleted();

        return (

            <div className="todoapp">
                <NewTaskForm
                    onAdd={addTask}
                />
                <TaskList
                    tasks={filteredTodos}
                    onDeleted={deleteTask}
                    onCompleted={onCompleted}
                    onEditing={onEditing}
                    submitEdit={submitEdit}
                    offEdit={offEdit}
                    stopTimer={stopTimer}
                    onTimer={onTimer}
                />
                <Footer
                    counterOfCompleted={activeTasks}
                    clearCompleted={clearCompleted}
                    setFilter={setFilter}
                    currentFilter={filter}
                />
            </div>
        );
    }
