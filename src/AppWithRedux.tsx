import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/TodoList/Todolist";
import {InputAndButton} from "./components/InputAndButton/InputAndButton";
import {addTodoListAC,} from "./state/todoLists-reducer/todoLists-reducer";
import {TodoListType} from "./types/types";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

function AppWithRedux() {

    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists);
    const dispatch = useDispatch();

    const addNewTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title));
    }, [dispatch]);

    return (
        <div className="App">
            <InputAndButton addNewItem={addNewTodoList} inputBtnTitle={'Add new list'} maxTitleLength={15}/>
            {todoLists.map((element) => {
                return (
                    <Todolist key={element.id} todoListID={element.id}/>
                )
            })}
        </div>
    );
}

export default AppWithRedux;
