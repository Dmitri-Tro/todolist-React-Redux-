import React, {FC, useCallback, useState} from "react";
import {Button} from "../Button/Button";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import {
    removeTodoListTC,
    updateTodoListTitleTC
} from "../../state/todoLists-reducer/todoLists-reducer";
import {InputAndButton} from "../InputAndButton/InputAndButton";
import {Tasks} from "../Tasks/Tasks";
import {addTaskTC} from "../../state/tasks-reduser/tasks-reducer";
import {FilterValuesType, RequestStatusType} from "../../types/types";
import {useAppDispatch} from "../../state/store";
import styles from './TodoList.module.css';

type TodolistPropsType = {
    todoListID: string
    todoListTitle: string
    todoListFilter: FilterValuesType
    entityStatus: RequestStatusType
}
export const Todolist: FC<TodolistPropsType> = React.memo(({
                                                               todoListID,
                                                               todoListTitle,
                                                               todoListFilter,
                                                               entityStatus
                                                           }) => {
    const dispatch = useAppDispatch();

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
        <div className={styles.todolist}>
            <h3>
                <EditableTitle oldTitle={todoListTitle}
                               setNewTitle={setTodoListNewTitle}
                               disabled={entityStatus === 'loading'}
                />
                <Button title={'x'}
                        onClickHandler={onDeleteTodoListBtnClick}
                        disabled={entityStatus === 'loading'}
                />
            </h3>
            <Button classes={styles.collapsedBtn}
                    title={todoListCollapsed ? 'Show tasks' : 'Hide tasks'}
                    onClickHandler={onCollapsedBtnClick}
            />
            {todoListCollapsed ? null :
                <>
                    <InputAndButton addNewItem={addNewTask}
                                    inputBtnTitle={'Add task'}
                                    maxTitleLength={15}
                                    disabled={entityStatus === 'loading'}
                    />
                    <Tasks todoListID={todoListID}
                           todoListFilter={todoListFilter}
                           entityStatus={entityStatus}
                    />
                </>
            }
        </div>
    )
});