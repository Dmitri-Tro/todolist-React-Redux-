import {FilterValuesType, TaskStatuses, TaskType} from "../../../types/types";
import {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../state/store";
import {updateTodoListFilterAC} from "../../../state/todoLists-reducer/todoLists-reducer";

export function useTasks(todoListID: string, todoListFilter: FilterValuesType) {
    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todoListID]);

    const [tasksFilter, setTasksFilter] = useState<FilterValuesType>(todoListFilter);

    const filteredTasks = useMemo(() => {
            let tasksForTodolist: TaskType[];
            switch (tasksFilter) {
                case "Active":
                    return tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
                case "Completed":
                    return tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
                default:
                    tasksForTodolist = tasks;
            }
            return tasksForTodolist;
    }, [tasks, tasksFilter]);

    const onAllBtnClick = useCallback(() => {
        dispatch(updateTodoListFilterAC(todoListID, 'All'));
        setTasksFilter("All");
    }, [dispatch, todoListID]);
    const onActiveBtnClick = useCallback(() => {
        dispatch(updateTodoListFilterAC(todoListID, 'Active'));
        setTasksFilter("Active");
    }, [dispatch, todoListID]);
    const onCompletedBtnClick = useCallback(() => {
        dispatch(updateTodoListFilterAC(todoListID, 'Completed'));
        setTasksFilter("Completed");
    }, [dispatch, todoListID]);

    return {filteredTasks,tasksFilter, onAllBtnClick, onActiveBtnClick, onCompletedBtnClick}
}