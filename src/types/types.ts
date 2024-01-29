export type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
    filter: FilterValuesType
}
export type TasksType = {
    [todoListID: string]: Array<TaskType>
}

export type TaskType = {
    id: string,
    title: string,
    description: null | string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: null | Date,
    deadline: null | Date,
    addedDate: Date
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type FilterValuesType = 'All' | 'Active' | 'Completed';