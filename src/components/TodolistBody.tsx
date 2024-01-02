import React, {FC} from "react";
import {TasksComponent} from "./Tasks.component";
import {InputAndButton} from "./InputAndButton";
import {FilterValuesType, TaskType} from "../types/types";

type TodolistBodyPropsType = {
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    addTask: (todoListID: string, title: string) => void
    updateStatus: (todoListID: string, taskId: string) => void
    updateTaskTitle: (todoListID: string, taskId: string, newTitle: string) => void
    filter: FilterValuesType
}
export const TodolistBody: FC<TodolistBodyPropsType> = ({todoListID, tasks, removeTask, addTask, updateStatus, updateTaskTitle, filter}) => {
    const addNewTask = (taskTitle: string) => {
        addTask(todoListID, taskTitle)
    }
    return (
        <>
            <InputAndButton addNewItem={addNewTask} inputBtnTitle={'Add task'} />
            <TasksComponent
                todoListID={todoListID}
                tasks={tasks}
                removeTask={removeTask}
                updateStatus={updateStatus}
                updateTaskTitle={updateTaskTitle}
                filter={filter}
            />
        </>
    )
}