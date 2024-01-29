import React, {FC, useCallback, useEffect, useState} from "react";
import {Button} from "../Button/Button";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import {
    removeTodoListTC,
    updateTodoListTitleTC
} from "../../state/todoLists-reducer/todoLists-reducer";
import {InputAndButton} from "../InputAndButton/InputAndButton";
import {Tasks} from "../Tasks/Tasks";
import {addTaskTC, setTasksTC} from "../../state/tasks-reduser/tasks-reducer";
import {FilterValuesType} from "../../types/types";
import {useAppDispatch} from "../../state/store";

type TodolistPropsType = {
    todoListID: string
    todoListTitle: string
    todoListFilter: FilterValuesType
}
export const Todolist: FC<TodolistPropsType> = React.memo(({todoListID, todoListTitle, todoListFilter}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setTasksTC(todoListID))
    }, [dispatch, todoListID])

    const [todoListCollapsed, setTodoListCollapsed] = useState<boolean>(false);
    const onCollapsedBtnClick = () => {
        setTodoListCollapsed(!todoListCollapsed);
    };

    const onDeleteTodoListBtnClick = useCallback(() => {
        dispatch(removeTodoListTC(todoListID));
    }, [dispatch, todoListID]);

    const setTodoListNewTitle = useCallback((newTitle: string) => {
        dispatch(updateTodoListTitleTC(todoListID, newTitle));
    }, [dispatch, todoListID]);

    const addNewTask = useCallback((taskTitle: string) => {
        dispatch(addTaskTC(todoListID, taskTitle));
    }, [dispatch, todoListID]);

    return (
        <div className="todolist">
            <h3>
                <EditableTitle oldTitle={todoListTitle} setNewTitle={setTodoListNewTitle}/>
                <Button title={'x'} onClickHandler={onDeleteTodoListBtnClick}/>
            </h3>
            <Button classes={'collapsed-btn'} title={todoListCollapsed ? 'Show tasks' : 'Hide tasks'}
                    onClickHandler={onCollapsedBtnClick}/>
            {todoListCollapsed ? null :
                <>
                    <InputAndButton addNewItem={addNewTask} inputBtnTitle={'Add task'} maxTitleLength={15}/>
                    <Tasks todoListID={todoListID} todoListFilter={todoListFilter}/>
                </>
            }
        </div>
    )
});