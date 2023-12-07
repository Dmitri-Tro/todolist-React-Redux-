import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {ButtonComponent} from "./Button.component";
import {TasksComponent} from "./Tasks.component";
import {TodolistBody} from "./TodolistBody";

export type TaskType = {
    id: string
    title: string
    status: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    updateStatus: (taskId: string) => void
}
export const TodolistComponent: FC<TodolistPropsType> = ({title, tasks, removeTask, addTask, updateStatus}) => {
    const [todoListCollapsed, setTodoListCollapsed] = useState(false);
    const onCollapsedBtnClick = () => {
        setTodoListCollapsed(!todoListCollapsed);
    }
    return(
        <div className="todolist">
            <h3>{title}</h3>
            <ButtonComponent classes={'collapsed-btn'} title={todoListCollapsed ? 'Show tasks' : 'Hide tasks'} onClickHandler={onCollapsedBtnClick} />
            {todoListCollapsed ? null :
                <TodolistBody
                    tasks={tasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    updateStatus={updateStatus}
                />
            }

        </div>
    )
}