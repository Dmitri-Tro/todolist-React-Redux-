import {TodoListType} from "../../types/types";

type TodoListsReducerAction = RemoveTodoListAC | AddTodoListAC | UpdateTodoListTitleAC;

export const REMOVE_TODOLIST = 'Remove-todoList';
export const ADD_TODOLIST = 'Add-todoList';
export const UPDATE_TODOLIST_TITLE = 'Update-todoList-title';


type RemoveTodoListAC = ReturnType <typeof removeTodoListAC>;
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todoListID
        }
    } as const
};

type AddTodoListAC = ReturnType <typeof addTodoListAC>;
export const addTodoListAC = (newListID: string, todoListTitle: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            newListID,
            todoListTitle
        }
    } as const
}

type UpdateTodoListTitleAC = ReturnType <typeof updateTodoListTitleAC>;
export const updateTodoListTitleAC = (todoListID: string, newTitle: string) => {
    return {
        type: UPDATE_TODOLIST_TITLE,
        payload: {
            todoListID,
            newTitle
        }
    }as const
}

export const todoListsReducer = (state: Array<TodoListType>, action: TodoListsReducerAction): Array<TodoListType> => {
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
            return state.map(list => list.id === action.payload.todoListID ? {...list, title: action.payload.newTitle} : list)
        default:
            throw new Error('todoListsReducer don\'t understand this action.type!');
    }
}