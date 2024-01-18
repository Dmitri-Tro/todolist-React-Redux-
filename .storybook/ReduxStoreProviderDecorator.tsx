import {Provider} from "react-redux";
import {ReactNode} from "react";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../src/state/tasks-reduser/tasks-reducer";
import {todoListsReducer} from "../src/state/todoLists-reducer/todoLists-reducer";
import {AppRootState} from "../src/state/store";

const storiesReducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
});

const initialStoriesState = {
    todoLists: [
        {id: '1', title: 'What to learn', filter: 'All'},
        {id: '2', title: 'What to buy', filter: 'All'}
    ],
    tasks: {
        ['1']: [
            {id: '1', title: 'HTML', status: true},
            {id: '2', title: 'CSS', status: true},
            {id: '3', title: 'React', status: true},
            {id: '4', title: 'Storybook', status: false},
        ],
        ['2']: [
            {id: '1', title: 'Bread', status: true},
            {id: '2', title: 'Milk', status: false},
        ]
    }
}

// @ts-ignore
const StoriesTaskStore = createStore(storiesReducers, initialStoriesState as AppRootState) // Поправить типизацию
export const ReduxStoreProviderDecorator = (story: () => ReactNode) => {
    return <Provider store={StoriesTaskStore} >{story()}</Provider>
}