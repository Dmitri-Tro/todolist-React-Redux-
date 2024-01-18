import React, {FC, useCallback, useState} from "react";
import {Button} from "../Button/Button";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import {useDispatch, useSelector} from "react-redux";
import {removeTodoListAC, updateTodoListTitleAC} from "../../state/todoLists-reducer/todoLists-reducer";
import {AppRootState} from "../../state/store";
import {InputAndButton} from "../InputAndButton/InputAndButton";
import {Tasks} from "../Tasks/Tasks";
import {addTaskAC} from "../../state/tasks-reduser/tasks-reducer";

type TodolistPropsType = {
    todoListID: string
}
export const Todolist: FC<TodolistPropsType> = React.memo(({todoListID}) => {

    const [todoListCollapsed, setTodoListCollapsed] = useState<boolean>(false);
    const onCollapsedBtnClick = () => {
        setTodoListCollapsed(!todoListCollapsed);
    };

    const todoListTitle = useSelector<AppRootState, string>(state => state.todoLists.find(list => list.id === todoListID)!.title);
    const dispatch = useDispatch();

    const onDeleteTodoListBtnClick = useCallback(() => {
        dispatch(removeTodoListAC(todoListID));
    }, [dispatch, todoListID]);

    const setTodoListNewTitle = useCallback((newTitle: string) => {
        dispatch(updateTodoListTitleAC(todoListID, newTitle));
    }, [dispatch, todoListID]);

    const addNewTask = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(todoListID, taskTitle));
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
                    <Tasks todoListID={todoListID}/>
                </>
            }
        </div>
    )
});