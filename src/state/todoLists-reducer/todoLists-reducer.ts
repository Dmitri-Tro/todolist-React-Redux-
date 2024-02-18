import {
    FetchResultCode,
    FilterValues,
    RequestStatus,
    ResponseError,
    TodoListDomain,
    TodoList,
} from "types/types";
import { AppThunk } from "../store";
import { AppReducerActions, setStatusAC } from "state/app-reducer/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { AxiosError } from "axios";
import { setTasksTC } from "../tasks-reduser/tasks-reducer";
import { todoListsApi } from "api/todoLists-api";

export const SET_TODOLISTS = "SET_TODOLISTS";
export const REMOVE_TODOLIST = "Remove-todoList";
export const ADD_TODOLIST = "Add-todoList";
export const UPDATE_TODOLIST_TITLE = "Update-todoList-title";
export const UPDATE_TODOLIST_FILTER = "Update-todoList-filter";
export const SET_ENTITYSTATUS = "Set-entityStatus";
export const CLEAR_TODOLISTS_DATA = "CLEAR_TODOLISTS_DATA";

export const todoListsReducer = (state: TodoListDomain[] = [], action: TodoListsReducerAction): TodoListDomain[] => {
    switch (action.type) {
        case SET_TODOLISTS:
            return action.payload.todoLists.map((list) => ({ ...list, filter: "All", entityStatus: "idle" }));
        case REMOVE_TODOLIST:
            return state.filter((list) => list.id !== action.payload.todoListID);
        case ADD_TODOLIST:
            return [{ ...action.payload.newTodoList, entityStatus: "idle" }, ...state];
        case UPDATE_TODOLIST_TITLE:
            return state.map((list) =>
                list.id === action.payload.todoListID
                    ? {
                          ...list,
                          title: action.payload.newTitle,
                      }
                    : list,
            );
        case UPDATE_TODOLIST_FILTER:
            return state.map((list) =>
                list.id === action.payload.todoListID
                    ? {
                          ...list,
                          filter: action.payload.filter,
                      }
                    : list,
            );
        case SET_ENTITYSTATUS:
            return state.map((list) =>
                list.id === action.payload.todoListID
                    ? {
                          ...list,
                          entityStatus: action.payload.entityStatus,
                      }
                    : list,
            );
        case CLEAR_TODOLISTS_DATA:
            return [];
        default:
            return state;
    }
};

// Actions
export const setTodoListsAC = (todoLists: TodoList[]) => {
    return {
        type: SET_TODOLISTS,
        payload: {
            todoLists,
        },
    } as const;
};
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todoListID,
        },
    } as const;
};
export const addTodoListAC = (newTodoList: TodoList) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            newTodoList,
        },
    } as const;
};
export const updateTodoListTitleAC = (todoListID: string, newTitle: string) => {
    return {
        type: UPDATE_TODOLIST_TITLE,
        payload: {
            todoListID,
            newTitle,
        },
    } as const;
};
export const updateTodoListFilterAC = (todoListID: string, filter: FilterValues) => {
    return {
        type: UPDATE_TODOLIST_FILTER,
        payload: {
            todoListID,
            filter,
        },
    } as const;
};
export const setEntityStatusAC = (todoListID: string, entityStatus: RequestStatus) => {
    return {
        type: SET_ENTITYSTATUS,
        payload: {
            todoListID,
            entityStatus,
        },
    } as const;
};
export const clearTodoListsDataAC = () => {
    return {
        type: CLEAR_TODOLISTS_DATA,
    } as const;
};

// Thunks
export const getTodoListsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC("loading"));
        todoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data));
                dispatch(setStatusAC("succeeded"));
                return res.data;
            })
            .then((lists) => {
                lists.forEach((list) => {
                    dispatch(setTasksTC(list.id));
                });
            })
            .catch((e: AxiosError<ResponseError>) => {
                handleServerNetworkError(dispatch, e.message);
            });
    };
};
export const addTodoListTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC("loading"));
        todoListsApi.createTodoList(title)
            .then((res) => {
                if (res.data.resultCode === FetchResultCode.Successful) {
                    dispatch(addTodoListAC(res.data.data.item));
                    dispatch(setStatusAC("succeeded"));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            })
            .catch((e: AxiosError<ResponseError>) => {
                handleServerNetworkError(dispatch, e.message);
            });
    };
};
export const removeTodoListTC = (todoListID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setEntityStatusAC(todoListID, "loading"));
        dispatch(setStatusAC("loading"));
        todoListsApi.deleteTodoList(todoListID)
            .then((res) => {
                if (res.data.resultCode === FetchResultCode.Successful) {
                    dispatch(removeTodoListAC(todoListID));
                    dispatch(setStatusAC("succeeded"));
                } else {
                    handleServerAppError(dispatch, res.data);
                    dispatch(setEntityStatusAC(todoListID, "failed"));
                }
            })
            .catch((e: AxiosError<ResponseError>) => {
                handleServerNetworkError(dispatch, e.message);
                dispatch(setEntityStatusAC(todoListID, "failed"));
            });
    };
};
export const updateTodoListTitleTC = (todoListID: string, newTitle: string): AppThunk => {
    return (dispatch) => {
        dispatch(setEntityStatusAC(todoListID, "loading"));
        dispatch(setStatusAC("loading"));
        todoListsApi.updateTodoListTitle(todoListID, newTitle)
            .then((res) => {
                if (res.data.resultCode === FetchResultCode.Successful) {
                    dispatch(updateTodoListTitleAC(todoListID, newTitle));
                    dispatch(setStatusAC("succeeded"));
                    dispatch(setEntityStatusAC(todoListID, "succeeded"));
                } else {
                    handleServerAppError(dispatch, res.data);
                    dispatch(setEntityStatusAC(todoListID, "failed"));
                }
            })
            .catch((e: AxiosError<ResponseError>) => {
                handleServerNetworkError(dispatch, e.message);
                dispatch(setEntityStatusAC(todoListID, "failed"));
            });
    };
};

// Types
export type TodoListsReducerAction =
    | SetTodoListsAC
    | RemoveTodoListAC
    | AddTodoListAC
    | UpdateTodoListTitleAC
    | UpdateTodoListFilterAC
    | AppReducerActions
    | SetEntityStatusAC
    | ClearTodoListsDataAC;

export type SetTodoListsAC = ReturnType<typeof setTodoListsAC>;
export type RemoveTodoListAC = ReturnType<typeof removeTodoListAC>;
export type AddTodoListAC = ReturnType<typeof addTodoListAC>;
type UpdateTodoListTitleAC = ReturnType<typeof updateTodoListTitleAC>;
type UpdateTodoListFilterAC = ReturnType<typeof updateTodoListFilterAC>;
type SetEntityStatusAC = ReturnType<typeof setEntityStatusAC>;
export type ClearTodoListsDataAC = ReturnType<typeof clearTodoListsDataAC>;