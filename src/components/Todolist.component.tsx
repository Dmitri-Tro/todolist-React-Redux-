import React, {FC, useState} from "react";
import {ButtonComponent} from "./Button.component";
import {TodolistBody} from "./TodolistBody";
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    status: boolean
}
type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    addTask: (todoListID: string, title: string) => void
    updateStatus: (todoListID: string, taskId: string) => void
    filter: FilterValuesType
    deleteTodoList: (todoListID: string) => void
}
export const TodolistComponent: FC<TodolistPropsType> = ({todoListID, title, tasks, removeTask, addTask, updateStatus, filter, deleteTodoList}) => {
    const [todoListCollapsed, setTodoListCollapsed] = useState(false);
    const onCollapsedBtnClick = () => {
        setTodoListCollapsed(!todoListCollapsed);
    }
    const onDeleteTodoListBtnClick = () => {
        deleteTodoList(todoListID);
    }
    return(
        <div className="todolist">
            <h3>{title}
            <ButtonComponent title={'x'} onClickHandler={onDeleteTodoListBtnClick} />
            </h3>
            <ButtonComponent classes={'collapsed-btn'} title={todoListCollapsed ? 'Show tasks' : 'Hide tasks'} onClickHandler={onCollapsedBtnClick} />
            {todoListCollapsed ? null :
                <TodolistBody
                    todoListID={todoListID}
                    tasks={tasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    updateStatus={updateStatus}
                    filter={filter}
                />
            }

        </div>
    )
}