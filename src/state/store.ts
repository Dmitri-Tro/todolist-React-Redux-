import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasks-reduser/tasks-reducer";
import {todoListsReducer} from "./todoLists-reducer/todoLists-reducer";

export const reducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export type AppRootState = ReturnType<typeof reducers>

export const store = createStore(reducers);

// @ts-ignore
window.store = store;