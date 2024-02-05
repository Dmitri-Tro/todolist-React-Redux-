import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/TodoList/Todolist";
import {InputAndButton} from "./components/InputAndButton/InputAndButton";
import {addTodoListTC, getTodoListsTC} from "./state/todoLists-reducer/todoLists-reducer";
import {TodoListDomain} from "./types/types";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch, useAppSelector} from "./state/store";
import {Header} from "./components/Header/Header";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";

function AppWithRedux() {
    const todoLists = useSelector<AppRootState, Array<TodoListDomain>>(state => state.todoLists);
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [dispatch]);

    const addNewTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);

    return (
        <>
            <ErrorSnackbar/>
            <Header/>
            <div className="App">
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
        </>
    );
}

export default AppWithRedux;
