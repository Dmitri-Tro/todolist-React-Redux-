import React, {FC, useCallback} from "react";
import {Button} from "../Button/Button";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {TaskType} from "../../types/types";
import {removeTaskAC, updateTaskStatusAC, updateTaskTitleAC} from "../../state/tasks-reduser/tasks-reducer";
import styles from './Task.module.css'

type TaskPropsType = {
    todoListID: string
    taskId: string
}

export const Task: FC<TaskPropsType> = React.memo(({todoListID, taskId}) => {

        const task = useSelector<AppRootState, TaskType>(state => state.tasks[todoListID]!.find(t => t.id === taskId)!);
        const dispatch = useDispatch();

        const setNewTitle = useCallback((newTitle: string) => dispatch(updateTaskTitleAC(todoListID, taskId, newTitle)), [dispatch, todoListID, taskId]);
        const onClickRemoveTask = useCallback(() => dispatch(removeTaskAC(todoListID, taskId)), [dispatch, todoListID, taskId]);
        const onClickUpdateStatus = useCallback(() => dispatch(updateTaskStatusAC(todoListID, taskId)), [dispatch, todoListID, taskId]);

        return (
            <li className={task.status ? styles.task + ' ' + styles.taskDone : styles.task}>
                <input className={styles.taskCheckbox} type="checkbox" checked={task.status} onChange={onClickUpdateStatus}/>
                <EditableTitle oldTitle={task.title} setNewTitle={setNewTitle}/>
                <Button title={"X"} onClickHandler={onClickRemoveTask} classes={styles.btn}/>
            </li>
        )
    });