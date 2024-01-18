import {
    tasksReducer,
    updateTaskTitleAC,
    updateTaskStatusAC,
    addTaskAC, removeTaskAC
} from "./tasks-reducer";
import {TasksType} from "../../types/types";
import {addTodoListAC, removeTodoListAC} from "../todoLists-reducer/todoLists-reducer";

let startState: TasksType;

beforeEach(() => {
    startState = {
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
});
test('Reducer should delete task', () => {
    const endState = tasksReducer(startState, removeTaskAC('1', '2'));
    expect(endState['1'].length).toBe(2);
    expect(endState['1'][0].id).toBe('1');
    expect(endState['1'][1].id).toBe('3');
});

test('Reducer should add task', () => {
    const endState = tasksReducer(startState, addTaskAC('1', 'NEW TASK'));
    expect(endState['1'].length).toBe(4);
    expect(endState['1'][0].title).toBe('NEW TASK');
    expect(endState['1'][1].title).toBe('HTML, CSS');
    expect(endState['1'][2].title).toBe('JS');
    expect(endState['1'][3].title).toBe('React');
    expect(endState['1'][0].status).toBe(false);
});

test('Reducer should update task status', () => {
    const endState = tasksReducer(startState, updateTaskStatusAC('1', '3'));
    expect(endState['1'].length).toBe(3);
    expect(endState['1'][2].title).toBe('React');
    expect(endState['1'][2].status).toBe(true);
    expect(endState['1'][0].status).toBe(true);
    expect(endState['1'][1].status).toBe(true);
});

test('Reducer should update task title', () => {
    const endState = tasksReducer(startState, updateTaskTitleAC('1', '3', 'REACT.JS'));
    expect(endState['1'].length).toBe(3);
    expect(endState['1'][2].title).toBe('REACT.JS');
    expect(endState['1'][0].title).toBe('HTML, CSS');
    expect(endState['1'][1].title).toBe('JS');
    expect(endState['1'][2].status).toBe(false);
});

test('Reducer should delete all tasks for todoList', () => {
    const endState = tasksReducer(startState, removeTodoListAC('2'));
    expect(endState['2']).toBe(undefined);
    expect(endState['1'].length).toBe(3);
});

test('Reducer should add tasks array for todoList', () => {
    const endState = tasksReducer(startState, addTodoListAC('New Todolist'));
    expect(endState['1'].length).toBe(3);
    expect(Object.keys(endState).length).toBe(3);
});