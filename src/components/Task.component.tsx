import React, {ChangeEvent, FC, useState} from "react";
import {ButtonComponent} from "./Button.component";
import {EditableTitle} from "./EditableTitle";

type TaskPropsType = {
    todoListID: string
    taskId: string
    title: string
    status: boolean
    removeTask: (todoListID: string, taskId: string) => void
    updateStatus: (todoListID: string, taskId: string) => void
    setTaskNewTitle: (taskId: string, newTitle: string) => void
}

export const TaskComponent: FC<TaskPropsType> = ({todoListID, taskId, title, status, removeTask, updateStatus, setTaskNewTitle}) => {
    const setNewTitle = (newTitle: string) => {
        setTaskNewTitle(taskId,newTitle)
    }
    const onClickRemoveTask = () => removeTask(todoListID, taskId)
    const onClickUpdateStatus = () => updateStatus(todoListID,taskId)
    return (
        <li className={status ? 'task-done' : ''}>
            <input className={'task-checkbox'} type="checkbox" checked={status} onChange={onClickUpdateStatus}/>
            <EditableTitle oldTitle={title} setNewTitle={setNewTitle} />
            <ButtonComponent title={"X"} onClickHandler={onClickRemoveTask} />
        </li>
    )
}