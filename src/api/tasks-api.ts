import axios, { AxiosResponse } from "axios";
import { ApiTaskModel, BaseResponse, GetTaskResponse, TaskT } from "types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
});

export const tasksApi = {
    getTasks: (todoListID: string) => {
        return instance.get<GetTaskResponse>(`todo-lists/${todoListID}/tasks`);
    },
    createTask: (todoListID: string, title: string) => {
        return instance.post<
            BaseResponse<{ item: TaskT }>,
            AxiosResponse<BaseResponse<{ item: TaskT }>>,
            { title: string }
        >(`todo-lists/${todoListID}/tasks`, { title });
    },
    deleteTask: (todoListID: string, taskId: string) => {
        return instance.delete<BaseResponse>(`todo-lists/${todoListID}/tasks/${taskId}`);
    },
    updateTask: (todoListID: string, taskId: string, model: ApiTaskModel) => {
        return instance.put<
            BaseResponse<{ item: TaskT }>,
            AxiosResponse<BaseResponse<{ item: TaskT }>, { model: ApiTaskModel }>
        >(`todo-lists/${todoListID}/tasks/${taskId}`, model);
    },
};
