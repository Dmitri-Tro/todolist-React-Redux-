import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {ButtonComponent} from "./Button.component";
import {TasksComponent} from "./Tasks.component";

export type TaskType = {
    id: string
    title: string
    status: boolean
}
type TodolistBodyPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    updateStatus: (taskId: string) => void
}
export const TodolistBody: FC<TodolistBodyPropsType> = ({tasks, removeTask, addTask, updateStatus}) => {
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
            addTask(taskTitle.trim());
        } else {
            setInputError(true)
        }
        setTaskTitle('');
    };
    const onEnterPressAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && taskTitle && !maxLengthTaskError) {
            addTask(taskTitle);
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
                tasks={tasks}
                removeTask={removeTask}
                updateStatus={updateStatus}
            />
        </>
    )
}