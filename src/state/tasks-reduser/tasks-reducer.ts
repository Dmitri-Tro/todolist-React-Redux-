import {TasksType, TaskType} from "../../types/types";
import {
    ADD_TODOLIST,
    AddTodoListAC,
    REMOVE_TODOLIST,
    RemoveTodoListAC, SET_TODOLISTS, SetTodoListsAC,
} from "../todoLists-reducer/todoLists-reducer";
import {Dispatch} from "redux";
import {api, ApiTaskModel} from "../../api/api";
import {AppRootState} from "../store";

export type TasksReducerAction =
    | SetTodoListsAC
    | SetTasksAC
    | RemoveTaskAC
    | AddTaskAC
    | UpdateTaskAC
    | RemoveTodoListAC
    | AddTodoListAC

export const SET_TASKS = 'Set-tasks';

export const REMOVE_TASK = 'Remove-task';
export const ADD_TASK = 'Add-task';
export const UPDATE_TASK = 'Update-task';

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
            return {...state, [action.payload.newTask.todoListId]: [action.payload.newTask, ...state[action.payload.newTask.todoListId]]};
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
        default:
            return state
    }
};

export const setTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        api.getTasks(todoListID)
            .then((res) => dispatch(setTasksAC(todoListID, res.data.items)))
    }
};
export const removeTaskTC = (todoListID: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        api.deleteTask(todoListID, taskId)
            .then(() => dispatch(removeTaskAC(todoListID, taskId)))
    }
};
export const addTaskTC = (todoListID: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        api.createTask(todoListID, taskTitle)
            .then(res => dispatch(addTaskAC(res.data.data.item)))
    }
};
export const updateTaskTC = <K extends keyof ApiTaskModel>(todoListID: string, taskId: string, updatedItem: Pick<ApiTaskModel, K>) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
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
                .then(res => dispatch(updateTaskAC(todoListID, res.data.data.item)))
        }
    }
}