import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer, TasksReducerAction} from "./tasks-reduser/tasks-reducer";
import {todoListsReducer, TodoListsReducerAction} from "./todoLists-reducer/todoLists-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, AppReducerActions} from "./app-reducer/app-reducer";
import {authReducer, AuthReducerAction} from "./auth-reduser/auth-reducer";

export const reducers = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    auth: authReducer
});

export type AppRootState = ReturnType<typeof reducers>

export const store = createStore(
    reducers,
    {
        app: undefined,
        tasks: undefined,
        todoLists: undefined,
        auth: undefined
    },
    applyMiddleware(thunk)
);

export type AppActions = TodoListsReducerAction | TasksReducerAction | AppReducerActions | AuthReducerAction;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActions>;

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

// @ts-ignore
window.store = store;