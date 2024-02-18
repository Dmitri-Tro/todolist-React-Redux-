import React, { FC, useCallback, useEffect } from "react";
import { InputAndButton } from "../InputAndButton/InputAndButton";
import { Todolist } from "../TodoList/Todolist";
import { useAppDispatch, useAppSelector } from "state/store";
import { addTodoListTC, getTodoListsTC } from "state/todoLists-reducer/todoLists-reducer";
import { Navigate } from "react-router-dom";
import styles from "./TodoLists.module.css";
import { selectTodolists } from "state/selectors/todoLists.selector";
import { selectAppRequestStatus } from "state/selectors/app.selectors";
import { selectIsLogin } from "state/selectors/auth.selectors";

export const TodoLists: FC = () => {
    const todoLists = useAppSelector(selectTodolists);
    const dispatch = useAppDispatch();
    const appRequestStatus = useAppSelector(selectAppRequestStatus);
    const isLogin = useAppSelector(selectIsLogin);

    useEffect(() => {
        if (!isLogin) return;
        dispatch(getTodoListsTC());
    }, [dispatch, isLogin]);

    const addNewTodoList = useCallback(
        (title: string) => {
            dispatch(addTodoListTC(title));
        },
        [dispatch],
    );

    if (!isLogin) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className={styles.todoLists}>
            <InputAndButton
                addNewItem={addNewTodoList}
                inputBtnTitle={"Add new list"}
                maxTitleLength={15}
                disabled={appRequestStatus === "loading"}
            />
            {todoLists.map((element) => {
                return (
                    <Todolist
                        key={element.id}
                        todoListID={element.id}
                        todoListTitle={element.title}
                        todoListFilter={element.filter}
                        entityStatus={element.entityStatus}
                    />
                );
            })}
        </div>
    );
};
