import {FilterValuesType, TaskType} from "../../../types/types";
import {useMemo, useState} from "react";

export function useFilter(tasks: Array<TaskType>, initialFilter: FilterValuesType) {

    const [tasksFilter, setTasksFilter] = useState<FilterValuesType>(initialFilter);
    const filteredTasks = useMemo(() => {
        let tasksForTodolist: TaskType[];
        switch (tasksFilter) {
            case "Active":
                return tasksForTodolist = tasks.filter(t => !t.status);
            case "Completed":
                return tasksForTodolist = tasks.filter(t => t.status);
            default:
                tasksForTodolist = tasks;
        }
        return tasksForTodolist;
    }, [tasks, tasksFilter]);

    return [filteredTasks, setTasksFilter] as const
}