import {Action, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasks-reduser/tasks-reducer";
import {todoListsReducer} from "./todoLists-reducer/todoLists-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export type AppRootState = ReturnType<typeof reducers>
//@ts-ignore
export const store = createStore(reducers, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<AppRootState, unknown, Action>

export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
window.store = store;