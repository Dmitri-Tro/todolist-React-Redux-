import {Task} from "../Task/Task";
import {Button} from "../Button/Button";
import React, {FC} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useTasks} from "./costomHooks/useTasks";
import {FilterValuesType, RequestStatusType} from "../../types/types";
import styles from "./Tasks.module.css"

type TasksPropsType = {
    todoListID: string
    todoListFilter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Tasks: FC<TasksPropsType> = React.memo(({
                                                         todoListID,
                                                         todoListFilter,
                                                         entityStatus
                                                     }) => {

    const {
        filteredTasks,
        tasksFilter,
        onAllBtnClick,
        onActiveBtnClick,
        onCompletedBtnClick
    } = useTasks(todoListID, todoListFilter);
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    if (filteredTasks && filteredTasks.length > 0) {
        return (
            <>
                <ul ref={listRef}>
                    {filteredTasks.map(task => {
                        return (
                            <Task key={task.id}
                                  todoListID={todoListID}
                                  taskId={task.id}
                                  entityStatus={entityStatus}
                            />
                        )
                    })}
                </ul>

                <Button
                    classes={tasksFilter === 'All' ? styles.activeFilterBtn : ''}
                    title="ALL"
                    onClickHandler={onAllBtnClick}
                />
                <Button
                    classes={tasksFilter === 'Active' ? styles.activeFilterBtn : ''}
                    title="ACTIVE"
                    onClickHandler={onActiveBtnClick}
                />
                <Button
                    classes={tasksFilter === 'Completed' ? styles.activeFilterBtn : ''}
                    title="COMPLETED"
                    onClickHandler={onCompletedBtnClick}
                />
            </>
        )
    } else if (filteredTasks && filteredTasks.length === 0) {
        return <span style={{display: 'block', marginBottom: '10px'}}>Your list is empty... :(</span>
    } else {
        return <span style={{display: 'block', marginBottom: '10px'}}>Some problems with array of tasks... :(</span>
    }
});