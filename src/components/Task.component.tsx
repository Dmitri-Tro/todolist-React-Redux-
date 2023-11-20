import React, {FC} from "react";

export type TaskType = {
    id: string
    title: string
    status: boolean
}

export const TaskComponent: FC<TaskType> = (props) => {
    return (
        <li id={props.id}><input type="checkbox" checked={props.status}/> <span>{props.title}</span></li>
    )
}