import React, {FC, useCallback, useEffect} from "react";
import {InputAndButton} from "../InputAndButton/InputAndButton";
import {Todolist} from "../TodoList/Todolist";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch, useAppSelector} from "../../state/store";
import {TodoListDomain} from "../../types/types";
import {addTodoListTC, getTodoListsTC} from "../../state/todoLists-reducer/todoLists-reducer";
import {Navigate} from "react-router-dom";
import styles from './TodoLists.module.css'

export const TodoLists: FC = () => {
    const todoLists = useSelector<AppRootState, Array<TodoListDomain>>(state => state.todoLists);
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector(state => state.app.status);
    const isLogin = useAppSelector(state => state.auth.isLogin);

    useEffect(() => {
        if (!isLogin) return
        dispatch(getTodoListsTC())
    }, [dispatch, isLogin]);

    const addNewTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);

    if (!isLogin) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className={styles.todoLists}>
            <InputAndButton addNewItem={addNewTodoList} inputBtnTitle={'Add new list'} maxTitleLength={15}
                            disabled={appStatus === 'loading'}/>
            {todoLists.map((element) => {
                return (
                    <Todolist key={element.id}
                              todoListID={element.id}
                              todoListTitle={element.title}
                              todoListFilter={element.filter}
                              entityStatus={element.entityStatus}
                    />
                )
            })}
        </div>
    )
}