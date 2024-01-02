import React, {FC, useState} from "react";
import {ButtonComponent} from "./Button.component";
import {TodolistBody} from "./TodolistBody";
import {EditableTitle} from "./EditableTitle";
import {FilterValuesType, TaskType} from "../types/types";


type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    addTask: (todoListID: string, title: string) => void
    updateStatus: (todoListID: string, taskId: string) => void
    updateTaskTitle: (todoListID: string, taskId: string, newTitle: string) => void
    filter: FilterValuesType
    deleteTodoList: (todoListID: string) => void
    updateTodoListTitle: (todoListID: string, title: string) => void
}
export const TodolistComponent: FC<TodolistPropsType> = ({
                                                             todoListID,
                                                             title,
                                                             tasks,
                                                             removeTask,
                                                             addTask,
                                                             updateStatus,
                                                             filter,
                                                             deleteTodoList,
                                                             updateTaskTitle,
                                                             updateTodoListTitle
                                                         }) => {
    const [todoListCollapsed, setTodoListCollapsed] = useState<boolean>(false);
    const onCollapsedBtnClick = () => {
        setTodoListCollapsed(!todoListCollapsed);
    }
    const onDeleteTodoListBtnClick = () => {
        deleteTodoList(todoListID);
    }

    const setTodoListNewTitle = (newTitle: string) => {
        updateTodoListTitle(todoListID, newTitle)
    }

    return (
        <div className="todolist">
            <h3>
                <EditableTitle oldTitle={title} setNewTitle={setTodoListNewTitle}/>
                <ButtonComponent title={'x'} onClickHandler={onDeleteTodoListBtnClick}/>
            </h3>
            <ButtonComponent classes={'collapsed-btn'} title={todoListCollapsed ? 'Show tasks' : 'Hide tasks'}
                             onClickHandler={onCollapsedBtnClick}/>
            {todoListCollapsed ? null :
                <TodolistBody
                    todoListID={todoListID}
                    tasks={tasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    updateStatus={updateStatus}
                    updateTaskTitle={updateTaskTitle}
                    filter={filter}
                />
            }

        </div>
    )
}