import React, {useState} from 'react';
import './App.css';
import {TaskType, TodolistComponent} from "./components/Todolist.component";
import {v4 as uuidv4} from 'uuid';
import {InputAndButton} from "./components/InputAndButton";


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [todoListID: string]: Array<TaskType>
}

export type FilterValuesType = 'All' | 'Active' | 'Completed';

function App() {

    const todoListId1 = uuidv4();
    const todoListId2 = uuidv4();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ]);

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: uuidv4(), title: "HTML, CSS", status: true},
            {id: uuidv4(), title: "JS", status: true},
            {id: uuidv4(), title: "React", status: false},
        ],
        [todoListId2]: [
            {id: uuidv4(), title: "Bread", status: true},
            {id: uuidv4(), title: "Beer", status: true},
            {id: uuidv4(), title: "Milk", status: false},
        ],
    });

    // const [tasks, setTasks] = useState<Array<TaskType>>([ //initial state
    //     {id: uuidv4(), title: "HTML, CSS", status: true},
    //     {id: uuidv4(), title: "JS", status: true},
    //     {id: uuidv4(), title: "React", status: false},
    // ]);

    const removeTask = (todoListID: string, taskId: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)})


        // const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        // setTasks(nextState);
    };

    const addTask = (todoListID: string, taskTitle: string) => {
        const newTask: TaskType = {id: uuidv4(), title: taskTitle, status: false};
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})

        // const newTask: TaskType = {id: uuidv4(), title: taskTitle, status: false};
        // setTasks([newTask, ...tasks])
    };

    const updateStatus = (todoListID: string, taskId: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, status: !task.status} : task)});
        // setTasks(tasks.map(task => task.id === taskId ? {...task, status: !task.status} : task))
    };

    const updateTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, title: newTitle} : task)});
    }

    const deleteTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(list => list.id !== todoListID));
        delete tasks[todoListID];
        console.log(tasks)
    }

    const addNewTodoList = (title: string) => {
        const newListID = uuidv4();
        const newTodoList: TodoListType = {
            id: newListID,
            title: title,
            filter: 'All'
        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newListID]: []})

    }

    const updateTodoListTitle = (todoListID: string, newTitle: string) => {
        setTodoLists(todoLists.map(list => list.id === todoListID ? {...list, title: newTitle} : list));
    }

    return (
        <div className="App">
            <InputAndButton addNewItem={addNewTodoList} inputBtnTitle={'Add new list'} />
            {todoLists.map((element) => {
                const tasksForTodoList = tasks[element.id];
                return (
                    <TodolistComponent
                        key={element.id}
                        todoListID={element.id}
                        title={element.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        updateStatus={updateStatus}
                        updateTaskTitle={updateTaskTitle}
                        filter={element.filter}
                        deleteTodoList={deleteTodoList}
                        updateTodoListTitle={updateTodoListTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
