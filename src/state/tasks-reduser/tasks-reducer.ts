import {FetchResultCode, RequestStatusType, ResponseError, TasksType, TaskType} from "../../types/types";
import {
    ADD_TODOLIST,
    AddTodoListAC, CLEAR_TODOLISTS_DATA, ClearTodoListsDataAC,
    REMOVE_TODOLIST,
    RemoveTodoListAC, SET_TODOLISTS, setEntityStatusAC, SetTodoListsAC,
} from "../todoLists-reducer/todoLists-reducer";
import {api, ApiTaskModel} from "../../api/api";
import {AppRootState, AppThunk} from "../store";
import {AppReducerActions, setStatusAC} from "../app-reducer/app-reducer";
import {handleServerAppError, handleServerGetTasksError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

export type TasksReducerAction =
    | SetTodoListsAC
    | SetTasksAC
    | RemoveTaskAC
    | AddTaskAC
    | UpdateTaskAC
    | RemoveTodoListAC
    | AddTodoListAC
    | AppReducerActions
    | SetTasksEntityStatusAC
    | ClearTodoListsDataAC

export const SET_TASKS = 'Set-tasks';
export const REMOVE_TASK = 'Remove-task';
export const ADD_TASK = 'Add-task';
export const UPDATE_TASK = 'Update-task';
export const SET_TASKS_ENTITYSTATUS = 'Set-tasks-entityStatus'

type SetTasksAC = ReturnType<typeof setTasksAC>;
export const setTasksAC = (todoListID: string, tasks: TaskType[]) => {
    return {
        type: SET_TASKS,
        payload: {
            todoListID,
            tasks
        }
    } as const
};

type RemoveTaskAC = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todoListID: string, taskId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {
            todoListID,
            taskId
        }
    } as const
};

type AddTaskAC = ReturnType<typeof addTaskAC>;
export const addTaskAC = (newTask: TaskType) => {
    return {
        type: ADD_TASK,
        payload: {
            newTask
        }
    } as const
};

type UpdateTaskAC = ReturnType<typeof updateTaskAC>;
export const updateTaskAC = (todoListID: string, task: TaskType) => {
    return {
        type: UPDATE_TASK,
        payload: {
            todoListID,
            task
        }
    } as const
};

type SetTasksEntityStatusAC = ReturnType<typeof setTasksEntityStatusAC>;
export const setTasksEntityStatusAC = (todoListID: string, taskId: string, entityStatus: RequestStatusType) => {
    return {
        type: SET_TASKS_ENTITYSTATUS,
        payload: {
            todoListID,
            taskId,
            entityStatus
        }
    } as const
};

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: TasksReducerAction): TasksType => {
    switch (action.type) {
        case SET_TODOLISTS:
            const copyState = {...state}
            action.payload.todoLists.forEach(list => copyState[list.id] = [])
            return copyState
        case SET_TASKS:
            return {
                ...state,
                [action.payload.todoListID]: action.payload.tasks
            };
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(task => task.id !== action.payload.taskId)
            };
        case ADD_TASK:
            return {
                ...state,
                [action.payload.newTask.todoListId]: [action.payload.newTask, ...state[action.payload.newTask.todoListId]]
            };
        case UPDATE_TASK:
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(task => task.id === action.payload.task.id ? action.payload.task : task)
            };
        case REMOVE_TODOLIST:
            const {[action.payload.todoListID]: _, ...newState} = state
            return newState
        case ADD_TODOLIST:
            return {...state, [action.payload.newTodoList.id]: []}
        case SET_TASKS_ENTITYSTATUS:
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(task => task.id === action.payload.taskId ?
                    {...task, entityStatus: action.payload.entityStatus} : task)
            }
        case CLEAR_TODOLISTS_DATA:
            return {}
        default:
            return state
    }
};

export const setTasksTC = (todoListID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'));
        api.getTasks(todoListID)
            .then((res) => {
                if (!res.data.error) {
                    dispatch(setTasksAC(todoListID, res.data.items));
                    dispatch(setStatusAC('succeeded'));
                } else {
                    handleServerGetTasksError(dispatch, res.data);
                    dispatch(setEntityStatusAC(todoListID, 'failed'));
                }
            })
            .catch((e: AxiosError<ResponseError>) => {
                handleServerNetworkError(dispatch, e.message);
                dispatch(setEntityStatusAC(todoListID, 'failed'));
            })
    }
};
export const removeTaskTC = (todoListID: string, taskId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setTasksEntityStatusAC(todoListID, taskId, 'loading'));
        dispatch(setStatusAC('loading'));
        api.deleteTask(todoListID, taskId)
            .then((res) => {
                if (res.data.resultCode === FetchResultCode.Successful) {
                    dispatch(removeTaskAC(todoListID, taskId));
                    dispatch(setStatusAC('succeeded'));
                    dispatch(setTasksEntityStatusAC(todoListID, taskId, 'succeeded'));
                } else {
                    handleServerAppError(dispatch, res.data);
                    dispatch(setTasksEntityStatusAC(todoListID, taskId, 'failed'));
                }
            })
            .catch((e: AxiosError<ResponseError>) => {
                handleServerNetworkError(dispatch, e.message);
                dispatch(setTasksEntityStatusAC(todoListID, taskId, 'failed'));
            })
    }
};
export const addTaskTC = (todoListID: string, taskTitle: string): AppThunk => {
    return (dispatch) => {
        dispatch(setEntityStatusAC(todoListID, 'loading'));
        dispatch(setStatusAC('loading'));
        api.createTask(todoListID, taskTitle)
            .then(res => {
                if (res.data.resultCode === FetchResultCode.Successful) {
                    dispatch(addTaskAC(res.data.data.item));
                    dispatch(setStatusAC('succeeded'));
                    dispatch(setEntityStatusAC(todoListID, 'succeeded'));
                } else {
                    handleServerAppError(dispatch, res.data);
                    dispatch(setEntityStatusAC(todoListID, 'failed'));
                }
            })
            .catch((e: AxiosError<ResponseError>) => {
                handleServerNetworkError(dispatch, e.message);
                dispatch(setEntityStatusAC(todoListID, 'failed'));
            })
    }
};
export const updateTaskTC = <K extends keyof ApiTaskModel>(todoListID: string, taskId: string, updatedItem: Pick<ApiTaskModel, K>): AppThunk => {
    return (dispatch, getState: () => AppRootState) => {
        dispatch(setStatusAC('loading'));
        dispatch(setTasksEntityStatusAC(todoListID, taskId, 'loading'));
        const task = getState().tasks[todoListID].find(t => t.id === taskId);
        if (task) {
            const model: ApiTaskModel = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }
            const updateTaskModel = {...model, ...updatedItem}
            api.updateTask(todoListID, taskId, updateTaskModel)
                .then(res => {
                    if (res.data.resultCode === FetchResultCode.Successful) {
                        dispatch(updateTaskAC(todoListID, res.data.data.item));
                        dispatch(setStatusAC('succeeded'));
                        dispatch(setTasksEntityStatusAC(todoListID, taskId, 'succeeded'));
                    } else {
                        handleServerAppError(dispatch, res.data);
                        dispatch(setTasksEntityStatusAC(todoListID, taskId, 'failed'));
                    }
                })
                .catch((e: AxiosError<ResponseError>) => {
                    handleServerNetworkError(dispatch, e.message);
                    dispatch(setTasksEntityStatusAC(todoListID, taskId, 'failed'));
                })
        }
    }
}