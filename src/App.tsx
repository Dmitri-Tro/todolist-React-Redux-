import React, {useReducer} from 'react';
import './App.css';
import {TodolistComponent} from "./components/Todolist.component";
import {v4 as uuidv4} from 'uuid';
import {InputAndButton} from "./components/InputAndButton";
import {
    tasksReducer,
    addTasksArrayForTodoListAC,
    deleteAllTasksForTodoListAC,
    updateTaskTitleAC,
    updateTaskStatusAC,
    addTaskAC,
    removeTaskAC
} from "./state/tasks-reduser/tasks-reducer";
import {
    todoListsReducer,
    updateTodoListTitleAC,
    addTodoListAC,
    removeTodoListAC
} from "./state/todoLists-reducer/todoLists-reducer";

function App() {

    const todoListId1 = uuidv4();
    const todoListId2 = uuidv4();

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    })
    /*    const [tasks, setTasks] = useState<TasksType>({
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
        });*/
    const removeTask = (todoListID: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todoListID, taskId));
        // setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)})
        // const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        // setTasks(nextState);
    };
    const addTask = (todoListID: string, taskTitle: string) => {
        dispatchTasks(addTaskAC(todoListID, taskTitle));
        // const newTask: TaskType = {id: uuidv4(), title: taskTitle, status: false};
        // setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    };
    const updateStatus = (todoListID: string, taskId: string) => {
        dispatchTasks(updateTaskStatusAC(todoListID, taskId));
        // setTasks({...tasks, [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, status: !task.status} : task)});
        // setTasks(tasks.map(task => task.id === taskId ? {...task, status: !task.status} : task))
    };
    const updateTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
        dispatchTasks(updateTaskTitleAC(todoListID, taskId, newTitle));
        // setTasks({...tasks, [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, title: newTitle} : task)});
    }

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ])
    // const [todoLists-reducer, setTodoLists] = useState<Array<TodoListType>>([
    //     {id: todoListId1, title: 'What to learn', filter: 'All'},
    //     {id: todoListId2, title: 'What to buy', filter: 'All'}
    // ]);
    const deleteTodoList = (todoListID: string) => {
        dispatchTodoLists(removeTodoListAC(todoListID));
        dispatchTasks(deleteAllTasksForTodoListAC(todoListID));
        // setTodoLists(todoLists-reducer.filter(list => list.id !== todoListID));
        // delete tasks[todoListID];
    }
    const addNewTodoList = (title: string) => {
        const newListID = uuidv4();
        dispatchTodoLists(addTodoListAC(newListID, title));
        dispatchTasks(addTasksArrayForTodoListAC(newListID))

        // const newTodoList: TodoListType = {
        //     id: newListID,
        //     title: title,
        //     filter: 'All'
        // }
        // setTodoLists([newTodoList, ...todoLists-reducer]);
        // setTasks({...tasks, [newListID]: []})
    }
    const updateTodoListTitle = (todoListID: string, newTitle: string) => {
        dispatchTodoLists(updateTodoListTitleAC(todoListID, newTitle))
        // setTodoLists(todoLists-reducer.map(list => list.id === todoListID ? {...list, title: newTitle} : list));
    }

    return (
        <div className="App">
            <InputAndButton addNewItem={addNewTodoList} inputBtnTitle={'Add new list'}/>
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
