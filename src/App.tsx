import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/TodoList/Todolist";
import {v4 as uuidv4} from 'uuid';
import {InputAndButton} from "./components/InputAndButton/InputAndButton";
import {
    tasksReducer,
    updateTaskTitleAC,
    updateTaskStatusAC,
    addTaskAC,
    removeTaskAC, TasksReducerAction
} from "./state/tasks-reduser/tasks-reducer";
import {
    todoListsReducer,
    updateTodoListTitleAC,
    addTodoListAC,
    removeTodoListAC, TodoListsReducerAction
} from "./state/todoLists-reducer/todoLists-reducer";
import {TasksType, TodoListType} from "./types/types";

function App() {
    //
    // const todoListId1 = uuidv4();
    // const todoListId2 = uuidv4();
    //
    // const [tasks, dispatchTasks] = useReducer<Reducer<TasksType, TasksReducerAction>>(tasksReducer, {
    //     [todoListId1]: [
    //         {id: uuidv4(), title: "HTML, CSS", status: true},
    //         {id: uuidv4(), title: "JS", status: true},
    //         {id: uuidv4(), title: "React", status: false},
    //     ],
    //     [todoListId2]: [
    //         {id: uuidv4(), title: "Bread", status: true},
    //         {id: uuidv4(), title: "Beer", status: true},
    //         {id: uuidv4(), title: "Milk", status: false},
    //     ],
    // });
    // const removeTask = (todoListID: string, taskId: string) => {
    //     dispatchTasks(removeTaskAC(todoListID, taskId));
    // };
    // const addTask = (todoListID: string, taskTitle: string) => {
    //     dispatchTasks(addTaskAC(todoListID, taskTitle));
    // };
    // const updateStatus = (todoListID: string, taskId: string) => {
    //     dispatchTasks(updateTaskStatusAC(todoListID, taskId));
    // };
    // const updateTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
    //     dispatchTasks(updateTaskTitleAC(todoListID, taskId, newTitle));
    // };
    //
    // const [todoLists, dispatchTodoLists] = useReducer<Reducer<Array<TodoListType>, TodoListsReducerAction>>(todoListsReducer, [
    //     {id: todoListId1, title: 'What to learn', filter: 'All'},
    //     {id: todoListId2, title: 'What to buy', filter: 'All'}
    // ]);
    // const deleteTodoList = (todoListID: string) => {
    //     const action = removeTodoListAC(todoListID);
    //     dispatchTodoLists(action);
    //     dispatchTasks(action);
    // };
    // const addNewTodoList = (title: string) => {
    //     const action = addTodoListAC(title);
    //     dispatchTodoLists(action);
    //     dispatchTasks(action);
    // };
    // const updateTodoListTitle = (todoListID: string, newTitle: string) => {
    //     dispatchTodoLists(updateTodoListTitleAC(todoListID, newTitle));
    // };
    //
    // return (
    //     <div className="App">
    //         <InputAndButton addNewItem={addNewTodoList} inputBtnTitle={'Add new list'}/>
    //         {todoLists.map((element) => {
    //             const tasksForTodoList = tasks[element.id];
    //             return (
    //                 <Todolist
    //                     key={element.id}
    //                     todoListID={element.id}
    //                     title={element.title}
    //                     tasks={tasksForTodoList}
    //                     removeTask={removeTask}
    //                     addTask={addTask}
    //                     updateStatus={updateStatus}
    //                     updateTaskTitle={updateTaskTitle}
    //                     filter={element.filter}
    //                     deleteTodoList={deleteTodoList}
    //                     updateTodoListTitle={updateTodoListTitle}
    //                 />
    //             )
    //         })}
    //     </div>
    // );
}

export default App;
