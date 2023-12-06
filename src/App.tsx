import React, {useState} from 'react';
import './App.css';
import {TaskType, TodolistComponent} from "./components/Todolist.component";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const todoListTitle = 'What to do';

    const [tasks, setTasks] = useState<Array<TaskType>>([ //initial state
        {id: uuidv4(), title: "HTML, CSS", status: true},
        {id: uuidv4(), title: "JS", status: true},
        {id: uuidv4(), title: "React", status: false},
    ]);

    const removeTask = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState);
    }

    const addTask = (taskTitle: string) => {
        const newTask: TaskType = {id: uuidv4(), title: taskTitle, status: false};
        setTasks([newTask, ...tasks])
    }

    const updateStatus = (taskId: string) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, status: !task.status} : task))

    }

    const updateTaskTitle = () => {

    }

    return (
        <div className="App">
            <TodolistComponent
                title = {todoListTitle}
                tasks = {tasks}
                removeTask = {removeTask}
                addTask = {addTask}
                updateStatus = {updateStatus}
            />
        </div>
    );
}

export default App;
