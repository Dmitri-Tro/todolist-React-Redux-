import { Task } from "../Task/Task";
import { Button } from "../Button/Button";
import React, { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTasks } from "./costomHooks/useTasks";
import { FilterValues, RequestStatus } from "types/types";
import styles from "./Tasks.module.css";

type TasksProps = {
    todoListID: string;
    todoListFilter: FilterValues;
    entityStatus: RequestStatus
};

export const Tasks: FC<TasksProps> = React.memo(({ todoListID, todoListFilter, entityStatus }) => {
    const {
        filteredTasks,
        tasksFilter,
        onAllBtnClick,
        onActiveBtnClick,
        onCompletedBtnClick
    } = useTasks(
        todoListID,
        todoListFilter
    );
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    return (
        <>
            {filteredTasks && filteredTasks.length > 0
                ?
                <ul ref={listRef}>
                    {filteredTasks.map((task) => {
                        return (
                            <Task key={task.id}
                                  todoListID={todoListID}
                                  taskId={task.id}
                                  entityStatus={entityStatus}
                            />
                        );
                    })}
                </ul>
                :
                <span className={styles.emptyListNotice}>Your list is empty... :(</span>
            }
            <Button
                classes={tasksFilter === "All" ? styles.activeFilterBtn : ""}
                title="ALL"
                onClickHandler={onAllBtnClick}
            />
            <Button
                classes={tasksFilter === "Active" ? styles.activeFilterBtn : ""}
                title="ACTIVE"
                onClickHandler={onActiveBtnClick}
            />
            <Button
                classes={tasksFilter === "Completed" ? styles.activeFilterBtn : ""}
                title="COMPLETED"
                onClickHandler={onCompletedBtnClick}
            />
        </>
    );
});
