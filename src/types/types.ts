export type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
    filter: FilterValuesType
}

export type TodoListDomain = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
    filter: FilterValuesType
    entityStatus: RequestStatusType
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
    addedDate: Date,
    entityStatus: RequestStatusType
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

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export enum FetchResultCode {
    Successful = 0,
    Error = 1,
    Recaptcha = 10,
}

export type ResponseError = {
    statusCode: RequestStatusType,
    messages: [
        {
            message: string
            field: string
        }
    ],
    error: string
}