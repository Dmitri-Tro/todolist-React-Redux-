import {TodoListType} from "../../types/types";
import {v1} from "uuid";

export type TodoListsReducerAction = RemoveTodoListAC | AddTodoListAC | UpdateTodoListTitleAC;

export const REMOVE_TODOLIST = 'Remove-todoList';
export const ADD_TODOLIST = 'Add-todoList';
export const UPDATE_TODOLIST_TITLE = 'Update-todoList-title';


export type RemoveTodoListAC = ReturnType <typeof removeTodoListAC>;
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todoListID
        }
    } as const
};

export type AddTodoListAC = ReturnType <typeof addTodoListAC>;
export const addTodoListAC = (todoListTitle: string) => {
    const newListID = v1();
    return {
        type: ADD_TODOLIST,
        payload: {
            newListID,
            todoListTitle
        }
    } as const
};

type UpdateTodoListTitleAC = ReturnType <typeof updateTodoListTitleAC>;
export const updateTodoListTitleAC = (todoListID: string, newTitle: string) => {
    return {
        type: UPDATE_TODOLIST_TITLE,
        payload: {
            todoListID,
            newTitle
        }
    }as const
};

const initialState: Array<TodoListType> = [  ];
export const todoListsReducer = (state: Array<TodoListType> = initialState, action: TodoListsReducerAction): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(list => list.id !== action.payload.todoListID);
        case ADD_TODOLIST:
            const newTodoList: TodoListType = {
                id: action.payload.newListID,
                title: action.payload.todoListTitle,
                filter: 'All'
            }
            return [newTodoList, ...state];
        case UPDATE_TODOLIST_TITLE:
            return state.map(list => list.id === action.payload.todoListID ? {...list, title: action.payload.newTitle} : list);
        default:
            return state
    }
};