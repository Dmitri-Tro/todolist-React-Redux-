import React, {FC} from "react";
import {ButtonComponent} from "./Button.component";

type TaskPropsType = {
    todoListID: string
    taskId: string
    title: string
    status: boolean
    removeTask: (todoListID: string, taskId: string) => void
    updateStatus: (todoListID: string, taskId: string) => void
}

export const TaskComponent: FC<TaskPropsType> = ({todoListID, taskId, title, status, removeTask, updateStatus}) => {
    const onClickRemoveTask = () => removeTask(todoListID, taskId)
    const onClickUpdateStatus = () => updateStatus(todoListID,taskId)
    return (
        <li className={status ? 'task-done' : ''}>
            <input className={'task-checkbox'} type="checkbox" checked={status} onChange={onClickUpdateStatus}/>
            <span className={'task-title'}>{title}</span>
            <ButtonComponent title={"X"} onClickHandler={onClickRemoveTask} />
        </li>
    )
}