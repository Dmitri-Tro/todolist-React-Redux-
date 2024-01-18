import {TasksType, TaskType} from "../../types/types";
import {v1} from "uuid";
import {
    ADD_TODOLIST,
    AddTodoListAC,
    REMOVE_TODOLIST,
    RemoveTodoListAC
} from "../todoLists-reducer/todoLists-reducer";

export type TasksReducerAction = RemoveTaskAC
    | AddTaskAC
    | UpdateTaskStatusAC
    | UpdateTaskTitleAC
    | RemoveTodoListAC
    | AddTodoListAC

export const REMOVE_TASK = 'Remove-task';
export const ADD_TASK = 'Add-task';
export const UPDATE_TASK_STATUS = 'Update-task-status';
export const UPDATE_TASK_TITLE = 'Update-task-title';

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
export const addTaskAC = (todoListID: string, taskTitle: string) => {
    return {
        type: ADD_TASK,
        payload: {
            todoListID,
            taskTitle
        }
    } as const
};

type UpdateTaskStatusAC = ReturnType<typeof updateTaskStatusAC>;
export const updateTaskStatusAC = (todoListID: string, taskId: string) => {
    return {
        type: UPDATE_TASK_STATUS,
        payload: {
            todoListID,
            taskId
        }
    } as const
};

type UpdateTaskTitleAC = ReturnType<typeof updateTaskTitleAC>;
export const updateTaskTitleAC = (todoListID: string, taskId: string, newTitle: string) => {
    return {
        type: UPDATE_TASK_TITLE,
        payload: {
            todoListID,
            taskId,
            newTitle
        }
    } as const
};

const initialState: TasksType = {  };

export const tasksReducer = (state: TasksType = initialState, action: TasksReducerAction): TasksType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(task => task.id !== action.payload.taskId)
            };
        case ADD_TASK:
            const newTask: TaskType = {id: v1(), title: action.payload.taskTitle, status: false};
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]};
        case UPDATE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    status: !task.status
                } : task)
            };
        case UPDATE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.newTitle
                } : task)
            };
        case REMOVE_TODOLIST:
            const {[action.payload.todoListID]: _, ...newState} = state
            return newState
        case ADD_TODOLIST:
            return {...state, [action.payload.newListID]: []}
        default:
            return state
    }
};