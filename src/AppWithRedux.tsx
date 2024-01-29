import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/TodoList/Todolist";
import {InputAndButton} from "./components/InputAndButton/InputAndButton";
import {addTodoListTC, getTodoListsTC} from "./state/todoLists-reducer/todoLists-reducer";
import {TodoListType} from "./types/types";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./state/store";

function AppWithRedux() {
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists);
    const dispatch = useAppDispatch();

    useEffect(() => {
            dispatch(getTodoListsTC())
    }, [dispatch]);

    const addNewTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);

    return (
        <div className="App">
            <InputAndButton addNewItem={addNewTodoList} inputBtnTitle={'Add new list'} maxTitleLength={15}/>
            {todoLists.map((element) => {
                return (
                    <Todolist key={element.id}
                              todoListID={element.id}
                              todoListTitle={element.title}
                              todoListFilter={element.filter}
                    />
                )
            })}
        </div>
    );
}

export default AppWithRedux;
