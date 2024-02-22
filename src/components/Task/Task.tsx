import React, { ChangeEvent, FC, useCallback } from "react";
import { Button } from "../Button/Button";
import { EditableTitle } from "../EditableTitle/EditableTitle";
import { useAppDispatch, useAppSelector } from "state/store";
import { RequestStatus, TaskStatuses } from "types/types";
import { removeTaskTC, updateTaskTC } from "state/tasks-reduser/tasks-reducer";
import styles from "./Task.module.css";
import { selectTask } from "state/selectors/tasks.selectors";

type TaskProps = {
    todoListID: string;
    taskId: string;
    entityStatus: RequestStatus;
};

export const Task: FC<TaskProps> = React.memo(({ todoListID, taskId, entityStatus }) => {
    const task = useAppSelector(selectTask(todoListID, taskId));
    const dispatch = useAppDispatch();

    const setNewTitle = useCallback(
        (newTitle: string) => {
            dispatch(updateTaskTC(todoListID, taskId, { title: newTitle }));
        },
        [dispatch, todoListID, taskId],
    );
    const onClickRemoveTask = useCallback(() => {
        dispatch(removeTaskTC(todoListID, taskId));
    }, [dispatch, todoListID, taskId]);
    const onClickUpdateStatus = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateTaskTC(todoListID, taskId, { status: e.currentTarget.checked ? 2 : 0 }));
        },
        [dispatch, todoListID, taskId],
    );

    if (task) {
        return (
            <li className={task.status ? styles.task + " " + styles.taskDone : styles.task}>
                <input
                    className={styles.taskCheckbox}
                    type="checkbox"
                    checked={task.status === TaskStatuses.Completed}
                    onChange={(e) => onClickUpdateStatus(e)}
                    disabled={task.entityStatus === "loading" || entityStatus === "loading"}
                />
                <EditableTitle
                    oldTitle={task.title}
                    setNewTitle={setNewTitle}
                    disabled={task.entityStatus === "loading" || entityStatus === "loading"}
                />
                <Button
                    title={"X"}
                    onClickHandler={onClickRemoveTask}
                    classes={styles.btn}
                    disabled={task.entityStatus === "loading" || entityStatus === "loading"}
                />
            </li>
        );
    } else {
        return <></>;
    }
});
