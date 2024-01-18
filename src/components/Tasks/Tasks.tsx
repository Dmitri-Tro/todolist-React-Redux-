import {Task} from "../Task/Task";
import {Button} from "../Button/Button";
import React, {FC, useCallback, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {FilterValuesType, TaskType} from "../../types/types";
import {useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {useFilter} from "./costomHooks/useFilter";

type TasksPropsType = {
    todoListID: string
}



export const Tasks: FC<TasksPropsType> = React.memo(({todoListID}) => {
    console.log('Tasks');
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todoListID]);
    const todoListFilter = useSelector<AppRootState, FilterValuesType>(state =>
        state.todoLists.find(list => list.id === todoListID)!.filter);
    const [filteredTasks, setTasksFilter] = useFilter(tasks, todoListFilter);

    const [filterForStyles, setFilterForStyles] = useState<'All' | 'Active' | 'Completed'>('All')

    const onAllBtnClick = useCallback(() => {
        setTasksFilter("All");
        setFilterForStyles("All")
    }, [setTasksFilter]);
    const onActiveBtnClick = useCallback(() => {
        setTasksFilter("Active");
        setFilterForStyles("Active");
    }, [setTasksFilter]);
    const onCompletedBtnClick = useCallback(() => {
        setTasksFilter("Completed");
        setFilterForStyles("Completed");
    }, [setTasksFilter]);

    const [listRef] = useAutoAnimate<HTMLUListElement>();

    return (
        <>
            {filteredTasks.length > 0
                ?
                <ul ref={listRef}>
                    {filteredTasks.map(task => {
                        return (
                            <Task key={task.id} todoListID={todoListID} taskId={task.id}/>
                        )
                    })}
                </ul>
                :
                <span style={{display: 'block', marginBottom: '10px'}}>Your list is empty... :(</span>
            }
            <Button
                classes={filterForStyles === 'All' ? 'active-filter-btn' : ''}
                title="All"
                onClickHandler={onAllBtnClick}
            />
            <Button
                classes={filterForStyles === 'Active' ? 'active-filter-btn' : ''}
                title="Active"
                onClickHandler={onActiveBtnClick}
            />
            <Button
                classes={filterForStyles === 'Completed' ? 'active-filter-btn' : ''}
                title="Completed"
                onClickHandler={onCompletedBtnClick}
            />
        </>
    )
});