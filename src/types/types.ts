export type TodoList = {
    id: string;
    title: string;
    addedDate: Date;
    order: number;
    filter: FilterValues;
};

export type TodoListDomain = TodoList & { entityStatus: RequestStatus };

export type Tasks = {
    [todoListID: string]: Array<TaskT>;
};

export type TaskT = {
    id: string;
    title: string;
    description: null | string;
    todoListId: string;
    order: number;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: null | Date;
    deadline: null | Date;
    addedDate: Date;
    entityStatus: RequestStatus;
};

export type FilterValues = "All" | "Active" | "Completed";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export type ResponseError = {
    statusCode: RequestStatus;
    messages: [
        {
            message: string;
            field: string;
        },
    ];
    error: string;
};

export type BaseResponse<T = {}> = {
    resultCode: FetchResultCode;
    messages: string[];
    fieldsErrors: [];
    data: T;
};

export type GetTaskResponse = {
    items: TaskT[];
    totalCount: number;
    error: string;
};

export type ApiTaskModel = {
    title: string;
    description: null | string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: null | Date;
    deadline: null | Date;
};

// ENUMS
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export enum FetchResultCode {
    Successful = 0,
    Error = 1,
    Recaptcha = 10,
}
