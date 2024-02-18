import { FilterValues, TaskStatuses, TaskT } from "types/types";
import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/store";
import { updateTodoListFilterAC } from "state/todoLists-reducer/todoLists-reducer";
import { selectTasks } from "state/selectors/tasks.selectors";

export function useTasks(todoListID: string, todoListFilter: FilterValues) {
    const dispatch = useAppDispatch();

    const tasks = useAppSelector(selectTasks(todoListID));

    const [tasksFilter, setTasksFilter] = useState<FilterValues>(todoListFilter);

    const filteredTasks = useMemo(() => {
        let tasksForTodolist: TaskT[];
        switch (tasksFilter) {
            case "Active":
                return (tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New));
            case "Completed":
                return (tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed));
            default:
                tasksForTodolist = tasks;
        }
        return tasksForTodolist;
    }, [tasks, tasksFilter]);

    const onAllBtnClick = useCallback(() => {
        dispatch(updateTodoListFilterAC(todoListID, "All"));
        setTasksFilter("All");
    }, [dispatch, todoListID]);
    const onActiveBtnClick = useCallback(() => {
        dispatch(updateTodoListFilterAC(todoListID, "Active"));
        setTasksFilter("Active");
    }, [dispatch, todoListID]);
    const onCompletedBtnClick = useCallback(() => {
        dispatch(updateTodoListFilterAC(todoListID, "Completed"));
        setTasksFilter("Completed");
    }, [dispatch, todoListID]);

    return { filteredTasks, tasksFilter, onAllBtnClick, onActiveBtnClick, onCompletedBtnClick };
}
