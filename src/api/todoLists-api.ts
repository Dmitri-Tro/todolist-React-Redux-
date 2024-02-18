import axios, { AxiosResponse } from "axios";
import {
    BaseResponse,
    TodoListDomain
} from "types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
});

export const todoListsApi = {
    getTodoLists: () => {
        return instance.get<TodoListDomain[]>("todo-lists");
    },
    createTodoList: (title: string) => {
        return instance.post<
            BaseResponse<{ item: TodoListDomain }>,
            AxiosResponse<BaseResponse<{ item: TodoListDomain }>>,
            { title: string }
        >("todo-lists", { title });
    },
    deleteTodoList: (todoListID: string) => {
        return instance.delete<BaseResponse>(`todo-lists/${todoListID}`);
    },
    updateTodoListTitle: (todoListID: string, title: string) => {
        return instance.put<BaseResponse, AxiosResponse<BaseResponse>, { title: string }>(`todo-lists/${todoListID}`, {
            title,
        });
    }
};
