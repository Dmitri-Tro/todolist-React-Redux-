import React, {ChangeEvent, FC, useCallback} from "react";
import {Button} from "../Button/Button";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../state/store";
import {RequestStatusType, TaskStatuses, TaskType} from "../../types/types";
import {
    removeTaskTC,
    updateTaskTC
} from "../../state/tasks-reduser/tasks-reducer";
import styles from './Task.module.css'

type TaskPropsType = {
    todoListID: string
    taskId: string
    entityStatus: RequestStatusType
}

export const Task: FC<TaskPropsType> = React.memo(({
                                                       todoListID,
                                                       taskId,
                                                       entityStatus
                                                   }) => {

    const task = useSelector<AppRootState, TaskType>(state => state.tasks[todoListID]!.find(t => t.id === taskId)!);
    const dispatch = useAppDispatch();

    const setNewTitle = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(todoListID, taskId, {title: newTitle}))
    }, [dispatch, todoListID, taskId]);

    const onClickRemoveTask = useCallback(() => {
        dispatch(removeTaskTC(todoListID, taskId))
    }, [dispatch, todoListID, taskId]);

    const onClickUpdateStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todoListID, taskId, {status: e.currentTarget.checked ? 2 : 0}))
    }, [dispatch, todoListID, taskId]);

    return (
        <li className={task.status ? styles.task + ' ' + styles.taskDone : styles.task}>
            <input className={styles.taskCheckbox}
                   type="checkbox"
                   checked={task.status === TaskStatuses.Completed}
                   onChange={(e) => onClickUpdateStatus(e)}
                   disabled={task.entityStatus === 'loading' || entityStatus === 'loading'}
            />
            <EditableTitle oldTitle={task.title}
                           setNewTitle={setNewTitle}
                           disabled={task.entityStatus === 'loading' || entityStatus === 'loading'}/>
            <Button title={"X"}
                    onClickHandler={onClickRemoveTask}
                    classes={styles.btn}
                    disabled={task.entityStatus === 'loading' || entityStatus === 'loading'}/>
        </li>
    )
});