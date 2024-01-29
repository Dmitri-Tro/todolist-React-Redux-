import axios, {AxiosResponse} from "axios";
import {FilterValuesType, TaskPriorities, TaskStatuses, TaskType} from "../types/types";

export type TodoListDomain = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
    filter: FilterValuesType
}

type BaseResponse<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: []
    data: T
}

type GetTaskResponse = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type ApiTaskModel = {
    title: string,
    description: null | string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: null | Date,
    deadline: null | Date,
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a19bb5a7-336b-4ae7-b475-a0ca6f07ecf9'
    }
});

export const api = {
    getTodoLists: () => {
        return instance.get<TodoListDomain[]>('todo-lists');
    },
    createTodoList: (title: string) => {
        return instance.post<BaseResponse<{ item: TodoListDomain }>, AxiosResponse<BaseResponse<{ item: TodoListDomain }>>, { title: string }>('todo-lists', {title});
    },
    deleteTodoList: (todoListID: string) => {
        return instance.delete<BaseResponse>(`todo-lists/${todoListID}`);
    },
    updateTodoListTitle: (todoListID: string, title: string) => {
        return instance.put<BaseResponse, AxiosResponse<BaseResponse>, { title: string }>(`todo-lists/${todoListID}`, {title});
    },
    getTasks: (todoListID: string) => {
        return instance.get<GetTaskResponse>(`todo-lists/${todoListID}/tasks`)
    },
    createTask: (todoListID: string, title: string) => {
        return instance.post<BaseResponse<{ item: TaskType }>, AxiosResponse<BaseResponse<{ item: TaskType }>>, { title: string }>(`todo-lists/${todoListID}/tasks`, {title});
    },
    deleteTask: (todoListID: string, taskId: string) => {
        return instance.delete<BaseResponse>(`todo-lists/${todoListID}/tasks/${taskId}`);
    },
    updateTask: (todoListID: string, taskId: string, model: ApiTaskModel) => {
        return instance.put<BaseResponse<{ item: TaskType }>, AxiosResponse<BaseResponse<{ item: TaskType }>, {model: ApiTaskModel}>>(`todo-lists/${todoListID}/tasks/${taskId}`, model);
    },
}