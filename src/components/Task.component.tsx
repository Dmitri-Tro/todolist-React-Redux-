import React, {FC} from "react";
import {ButtonComponent} from "./Button.component";

type TaskPropsType = {
    taskId: string
    title: string
    status: boolean
    removeTask: (taskId: string) => void
    updateStatus: (taskId: string) => void
}

export const TaskComponent: FC<TaskPropsType> = ({taskId, title, status, removeTask, updateStatus}) => {
    const onClickRemoveTask = () => removeTask(taskId)
    const onClickUpdateStatus = () => updateStatus(taskId)
    return (
        <li className={status ? 'task-done' : ''}>
            <input className={'task-checkbox'} type="checkbox" checked={status} onChange={onClickUpdateStatus}/>
            <span className={'task-title'}>{title}</span>
            <ButtonComponent title={"X"} onClickHandler={onClickRemoveTask} />
        </li>
    )
}