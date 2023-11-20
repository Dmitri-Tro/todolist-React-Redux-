import React from 'react';
import './App.css';
import {TodolistComponent} from "./components/Todolist.component";
import {TaskType} from "./components/Task.component";

function App() {
    const todoListTitle_1 = 'What to do';
    const todoListTitle_2 = 'What to learn';
    const todoListTitle_3 = 'What to buy';
    const tasks: Array<TaskType> = [
        {id: "1", title: "HTML, CSS", status: true},
        {id: "2", title: "JS", status: true},
        {id: "3", title: "React", status: false},
    ]
    return (
        <div className="App">
            <TodolistComponent title={todoListTitle_3} tasks = {tasks}/>
        </div>
    );
}

export default App;
