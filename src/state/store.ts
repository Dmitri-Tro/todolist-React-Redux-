import {Action, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer, TasksReducerAction} from "./tasks-reduser/tasks-reducer";
import {todoListsReducer, TodoListsReducerAction} from "./todoLists-reducer/todoLists-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export type AppRootState = ReturnType<typeof reducers>

export const store = createStore(
    reducers,
    {
        tasks: undefined,
        todoLists: undefined
    },
    applyMiddleware(thunk)
);

export type AppActions = TodoListsReducerAction | TasksReducerAction;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActions>;

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
window.store = store;