import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {ButtonComponent} from "./Button.component";
import {TasksComponent} from "./Tasks.component";
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    status: boolean
}
type TodolistBodyPropsType = {
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    addTask: (todoListID: string, title: string) => void
    updateStatus: (todoListID: string, taskId: string) => void
    filter: FilterValuesType
}
export const TodolistBody: FC<TodolistBodyPropsType> = ({todoListID, tasks, removeTask, addTask, updateStatus, filter}) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [inputError, setInputError] = useState(false);
    const maxLengthTaskError = taskTitle.length >= 15
    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputError(false);
        if (event.currentTarget.value.length <= 15) {
            setTaskTitle(event.currentTarget.value);
        }
    };
    const onAddBtnClickHandler = () => {
        if (taskTitle.trim()) {
            addTask(todoListID, taskTitle.trim());
        } else {
            setInputError(true)
        }
        setTaskTitle('');
    };
    const onEnterPressAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && taskTitle && !maxLengthTaskError) {
            addTask(todoListID, taskTitle);
            setTaskTitle('');
        }
    }
    return (
        <>
            <div>
                <input
                    className={inputError || maxLengthTaskError ? 'task-add-input task-add-input-error' : 'task-add-input'}
                    value={taskTitle}
                    onChange={onInputChangeHandler}
                    onKeyUp={onEnterPressAddTaskHandler}
                />
                <ButtonComponent disabled={!taskTitle || maxLengthTaskError}
                                 title="Add task"
                                 onClickHandler={onAddBtnClickHandler}
                />
                {maxLengthTaskError && <div style={{color: "red"}}>Your task title is too long!</div>}
                {inputError && <div style={{color: "red"}}>Task must contain any symbols</div>}
            </div>
            <TasksComponent
                todoListID={todoListID}
                tasks={tasks}
                removeTask={removeTask}
                updateStatus={updateStatus}
                filter={filter}
            />
        </>
    )
}