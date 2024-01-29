import React, {ChangeEvent, FC, useCallback} from "react";
import {Button} from "../Button/Button";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../state/store";
import {TaskStatuses, TaskType} from "../../types/types";
import {
    removeTaskTC,
    updateTaskTC
} from "../../state/tasks-reduser/tasks-reducer";
import styles from './Task.module.css'

type TaskPropsType = {
    todoListID: string
    taskId: string
}

export const Task: FC<TaskPropsType> = React.memo(({todoListID, taskId}) => {

        const task = useSelector<AppRootState, TaskType>(state => state.tasks[todoListID]!.find(t => t.id === taskId)!);
        const dispatch = useAppDispatch();

        const setNewTitle = useCallback((newTitle: string) => dispatch(updateTaskTC(todoListID, taskId, {title: newTitle})), [dispatch, todoListID, taskId]);
        const onClickRemoveTask = useCallback(() => dispatch(removeTaskTC(todoListID, taskId)), [dispatch, todoListID, taskId]);
        const onClickUpdateStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateTaskTC(todoListID, taskId, {status: e.currentTarget.checked ? 2 : 0})
            )}, [dispatch, todoListID, taskId]);

        return (
            <li className={task.status ? styles.task + ' ' + styles.taskDone : styles.task}>
                <input className={styles.taskCheckbox}
                       type="checkbox"
                       checked={task.status === TaskStatuses.Completed}
                       onChange={(e) => onClickUpdateStatus(e)}
                />
                <EditableTitle oldTitle={task.title} setNewTitle={setNewTitle}/>
                <Button title={"X"} onClickHandler={onClickRemoveTask} classes={styles.btn}/>
            </li>
        )
    });