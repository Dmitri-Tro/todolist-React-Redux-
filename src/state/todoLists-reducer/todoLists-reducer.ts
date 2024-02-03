import {FilterValuesType, TodoListType} from "../../types/types";
import {api} from "../../api/api";
import {Dispatch} from "redux";
import {AppThunk} from "../store";

export type TodoListsReducerAction = SetTodoListsAC | RemoveTodoListAC | AddTodoListAC | UpdateTodoListTitleAC | UpdateTodoListFilterAC;

export const SET_TODOLISTS = 'SET_TODOLISTS';
export const REMOVE_TODOLIST = 'Remove-todoList';
export const ADD_TODOLIST = 'Add-todoList';
export const UPDATE_TODOLIST_TITLE = 'Update-todoList-title';
export const UPDATE_TODOLIST_FILTER = 'Update-todoList-filter';


export type SetTodoListsAC = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {
        type: SET_TODOLISTS,
        payload: {
            todoLists
        }
    } as const
}
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
export const addTodoListAC = (newTodoList: TodoListType) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            newTodoList
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
type UpdateTodoListFilterAC = ReturnType <typeof updateTodoListFilterAC>;
export const updateTodoListFilterAC = (todoListID: string, filter: FilterValuesType) => {
    return {
        type: UPDATE_TODOLIST_FILTER,
        payload: {
            todoListID,
            filter
        }
    }as const
};

const initialState: Array<TodoListType> = [  ];
export const todoListsReducer = (state: Array<TodoListType> = initialState, action: TodoListsReducerAction): Array<TodoListType> => {
    switch (action.type) {
        case SET_TODOLISTS:
            return action.payload.todoLists.map(list => ({...list, filter: 'All'}))
        case REMOVE_TODOLIST:
            return state.filter(list => list.id !== action.payload.todoListID);
        case ADD_TODOLIST:
            return [action.payload.newTodoList, ...state];
        case UPDATE_TODOLIST_TITLE:
            return state.map(list => list.id === action.payload.todoListID ? {...list, title: action.payload.newTitle} : list);
        case UPDATE_TODOLIST_FILTER:
            return state.map(list => list.id === action.payload.todoListID ? {...list, filter: action.payload.filter} : list);
        default:
            return state
    }
};

export const getTodoListsTC = (): AppThunk => {
    return (dispatch) => {
        api.getTodoLists()
            .then((res) => dispatch(setTodoListsAC(res.data)))
    }
};
export const addTodoListTC = (title: string): AppThunk => {
    return (dispatch) => {
        api.createTodoList(title)
            .then(res => dispatch(addTodoListAC(res.data.data.item)))
    }
};
export const removeTodoListTC =(todoListID: string): AppThunk => {
    return (dispatch) => {
        api.deleteTodoList(todoListID)
            .then(() => dispatch(removeTodoListAC(todoListID)))
    }
};
export const updateTodoListTitleTC = (todoListID: string, newTitle: string): AppThunk => {
    return (dispatch) => {
        api.updateTodoListTitle(todoListID, newTitle)
            .then(() => dispatch(updateTodoListTitleAC(todoListID, newTitle)))
    }
};