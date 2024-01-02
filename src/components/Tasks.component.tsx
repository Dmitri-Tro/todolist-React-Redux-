import {TaskComponent} from "./Task.component";
import {ButtonComponent} from "./Button.component";
import React, {FC, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {FilterValuesType, TaskType} from "../types/types";

type TasksPropsType = {
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    updateStatus: (todoListID: string, taskId: string) => void
    updateTaskTitle: (todoListID: string, taskId: string, newTitle: string) => void
    filter: FilterValuesType
}

export const TasksComponent: FC<TasksPropsType> = ({todoListID, tasks, removeTask, updateStatus, updateTaskTitle, filter}) => {
    const [tasksFilter, setTasksFilter] = useState<FilterValuesType>(filter);

    // First method of filtration:
    // const filteredTasks: Array<TaskType> =
    //     tasksFilter === 'Active'
    //         ? tasks.filter(task => !task.status)
    //         : tasksFilter === 'Completed'
    //             ? tasks.filter(task => task.status)
    //             : tasks;

    // Second method of filtration:
    const filteredTasks = ()=>{
        let tasksForTodolist: TaskType[];
        switch (tasksFilter) {
            case "Active":
                return   tasksForTodolist = tasks.filter(t => !t.status);
            case "Completed":
                return  tasksForTodolist = tasks.filter(t => t.status);
            default:
                tasksForTodolist = tasks;
        }
        return tasksForTodolist
    }

    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const onAllBtnClick = () => setTasksFilter("All");
    const onActiveBtnClick = () => setTasksFilter("Active");
    const onCompletedBtnClick = () => setTasksFilter("Completed");

    const setTaskNewTitle = (taskId: string, newTitle: string) => {
        updateTaskTitle (todoListID, taskId, newTitle);
    };

    return (
        <>
            {
                filteredTasks().length > 0
                    ?
                    <ul ref={listRef}>
                        {filteredTasks().map(task => {
                            return (
                                <TaskComponent key={task.id}
                                               todoListID={todoListID}
                                               taskId={task.id}
                                               title={task.title}
                                               status={task.status}
                                               removeTask={removeTask}
                                               updateStatus={updateStatus}
                                               setTaskNewTitle={setTaskNewTitle}
                                />
                            )
                        })}
                    </ul>
                    :
                    <span>Your list is empty... :(</span>
            }
            <div>
                <ButtonComponent
                    classes={tasksFilter === 'All' ? 'active-filter-btn' : ''}
                    title="All"
                    onClickHandler={onAllBtnClick}
                />
                <ButtonComponent
                    classes={tasksFilter === 'Active' ? 'active-filter-btn' : ''}
                    title="Active"
                    onClickHandler={onActiveBtnClick}
                />
                <ButtonComponent
                    classes={tasksFilter === 'Completed' ? 'active-filter-btn' : ''}
                    title="Completed"
                    onClickHandler={onCompletedBtnClick}
                />
            </div>
        </>
    )
}