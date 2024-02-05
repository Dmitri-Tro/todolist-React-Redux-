import {
    todoListsReducer,
    removeTodoListAC, addTodoListAC, updateTodoListTitleAC
} from "./todoLists-reducer";
import {TodoListDomain, TodoListType} from "../../types/types";

let startData: Array<TodoListDomain>;
beforeEach(() => {
    startData = [
        {id: '1', title: 'What to learn', addedDate: new Date(), order: 0, filter: "All", entityStatus: "idle"},
        {id: '2', title: 'What to buy', addedDate: new Date(), order: 0, filter: "All", entityStatus: "idle"}
    ];
});
test('Reducer should remove todoList', () => {
    const endData = todoListsReducer(startData, removeTodoListAC("2"));
    expect(endData.length).toBe(1);
    expect(endData[0].id).toBe('1');
});

test('Reducer should add todoList', () => {
    const endData = todoListsReducer(startData, addTodoListAC({id: '3', title: 'New TodoList', addedDate: new Date(), order: 0, filter: "All"}));
    expect(endData.length).toBe(3);
    expect(endData[0].title).toBe('New TodoList');
    expect(endData[1].title).toBe('What to learn');
    expect(endData[2].title).toBe('What to buy');
});

test('Reducer should update todoList title', () => {
    const endData = todoListsReducer(startData, updateTodoListTitleAC('2', 'Updated title'));
    expect(endData.length).toBe(2);
    expect(endData[0].title).toBe('What to learn');
    expect(endData[1].title).toBe('Updated title');
});