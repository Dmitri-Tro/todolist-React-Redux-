import {
    tasksReducer,
    ADD_TASK,
    ADD_TASKS_ARRAY_FOR_TODOLIST,
    DELETE_ALL_TASKS_FOR_TODOLIST,
    REMOVE_TASK,
    UPDATE_TASK_STATUS,
    UPDATE_TASK_TITLE,
    updateTaskTitleAC,
    deleteAllTasksForTodoListAC,
    addTasksArrayForTodoListAC,
    updateTaskStatusAC,
    addTaskAC, removeTaskAC
} from "./tasks-reducer";
import {TasksType} from "../../types/types";

test('Reducer should delete task', () => {
    const startState: TasksType = {
            ['1']: [
                {id: '1', title: "HTML, CSS", status: true},
                {id: '2', title: "JS", status: true},
                {id: '3', title: "React", status: false},
            ]
        };
    const endState = tasksReducer(startState, removeTaskAC('1', '2'));
    expect(endState['1'].length).toBe(2);
    expect(endState['1'][0].id).toBe('1');
    expect(endState['1'][1].id).toBe('3');
});

test('Reducer should add task', () => {
    const startState: TasksType = {
        ['1']: [
            {id: '1', title: "HTML, CSS", status: true},
            {id: '2', title: "JS", status: true},
            {id: '3', title: "React", status: false},
        ]
    };
    const endState = tasksReducer(startState, addTaskAC('1', 'NEW TASK'));
    expect(endState['1'].length).toBe(4);
    expect(endState['1'][0].title).toBe('NEW TASK');
    expect(endState['1'][1].title).toBe('HTML, CSS');
    expect(endState['1'][2].title).toBe('JS');
    expect(endState['1'][3].title).toBe('React');
    expect(endState['1'][0].status).toBe(false);
});

test('Reducer should update task status', () => {
    const startState: TasksType = {
        ['1']: [
            {id: '1', title: "HTML, CSS", status: true},
            {id: '2', title: "JS", status: true},
            {id: '3', title: "React", status: false},
        ]
    };
    const endState = tasksReducer(startState, updateTaskStatusAC('1', '3'));
    expect(endState['1'].length).toBe(3);
    expect(endState['1'][2].title).toBe('React');
    expect(endState['1'][2].status).toBe(true);
    expect(endState['1'][0].status).toBe(true);
    expect(endState['1'][1].status).toBe(true);
});

test('Reducer should update task title', () => {
    const startState: TasksType = {
        ['1']: [
            {id: '1', title: "HTML, CSS", status: true},
            {id: '2', title: "JS", status: true},
            {id: '3', title: "React", status: false},
        ]
    };
    const endState = tasksReducer(startState, updateTaskTitleAC('1', '3', 'REACT.JS'));
    expect(endState['1'].length).toBe(3);
    expect(endState['1'][2].title).toBe('REACT.JS');
    expect(endState['1'][0].title).toBe('HTML, CSS');
    expect(endState['1'][1].title).toBe('JS');
    expect(endState['1'][2].status).toBe(false);
});

test('Reducer should delete all tasks for todoList', () => {
    const startState: TasksType = {
        ['1']: [
            {id: '1', title: "HTML, CSS", status: true},
            {id: '2', title: "JS", status: true},
            {id: '3', title: "React", status: false},
        ],
        ['2']: [
            {id: '1', title: "Beer", status: true},
            {id: '2', title: "Milk", status: true},
            {id: '3', title: "Bread", status: false},
        ]
    };
    const endState = tasksReducer(startState, deleteAllTasksForTodoListAC('2'));
    expect(endState['2']).toBe(undefined);
    expect(endState['1'].length).toBe(3);
});

test('Reducer should add tasks array for todoList', () => {
    const startState: TasksType = {
        ['1']: [
            {id: '1', title: "HTML, CSS", status: true},
            {id: '2', title: "JS", status: true},
            {id: '3', title: "React", status: false},
        ]
    };
    const endState = tasksReducer(startState, addTasksArrayForTodoListAC('2'));
    expect(endState['1'].length).toBe(3);
    expect(endState['2'].length).toBe(0);
    expect(endState['2']).toEqual([]);
});