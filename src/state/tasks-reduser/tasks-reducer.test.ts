import { tasksReducer, updateTaskAC, addTaskAC, removeTaskAC } from "./tasks-reducer";
import { Tasks } from "types/types";
import { addTodoListAC, removeTodoListAC } from "../todoLists-reducer/todoLists-reducer";

let startState: Tasks;
beforeEach(() => {
    startState = {
        ["1"]: [
            {
                id: "1",
                title: "HTML, CSS",
                description: null,
                todoListId: "1",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date(),
                entityStatus: "idle",
            },
            {
                id: "2",
                title: "JS",
                description: null,
                todoListId: "1",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date(),
                entityStatus: "idle",
            },
            {
                id: "3",
                title: "React",
                description: null,
                todoListId: "1",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date(),
                entityStatus: "idle",
            },
        ],
        ["2"]: [
            {
                id: "1",
                title: "Beer",
                description: null,
                todoListId: "2",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date(),
                entityStatus: "idle",
            },
            {
                id: "2",
                title: "Milk",
                description: null,
                todoListId: "2",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date(),
                entityStatus: "idle",
            },
            {
                id: "3",
                title: "Bread",
                description: null,
                todoListId: "2",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date(),
                entityStatus: "idle",
            },
        ],
    };
});
test("Reducer should delete task", () => {
    const endState = tasksReducer(startState, removeTaskAC("1", "2"));
    expect(endState["1"].length).toBe(2);
    expect(endState["1"][0].id).toBe("1");
    expect(endState["1"][1].id).toBe("3");
});
test("Reducer should add task", () => {
    const endState = tasksReducer(
        startState,
        addTaskAC({
            id: "4",
            title: "NEW TASK",
            description: null,
            todoListId: "1",
            order: 0,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: new Date(),
            entityStatus: "idle",
        }),
    );
    expect(endState["1"].length).toBe(4);
    expect(endState["1"][0].title).toBe("NEW TASK");
    expect(endState["1"][1].title).toBe("HTML, CSS");
    expect(endState["1"][2].title).toBe("JS");
    expect(endState["1"][3].title).toBe("React");
    expect(endState["1"][0].status).toBe(0);
});
test("Reducer should update task status", () => {
    const endState = tasksReducer(
        startState,
        updateTaskAC("1", {
            id: "3",
            title: "React",
            description: null,
            todoListId: "1",
            order: 0,
            status: 2,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: new Date(),
            entityStatus: "idle",
        }),
    );
    expect(endState["1"].length).toBe(3);
    expect(endState["1"][2].title).toBe("React");
    expect(endState["1"][2].status).toBe(2);
    expect(endState["1"][0].status).toBe(0);
    expect(endState["1"][1].status).toBe(0);
});
test("Reducer should update task title", () => {
    const endState = tasksReducer(
        startState,
        updateTaskAC("1", {
            id: "3",
            title: "REACT.JS",
            description: null,
            todoListId: "1",
            order: 0,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: new Date(),
            entityStatus: "idle",
        }),
    );
    expect(endState["1"].length).toBe(3);
    expect(endState["1"][2].title).toBe("REACT.JS");
    expect(endState["1"][0].title).toBe("HTML, CSS");
    expect(endState["1"][1].title).toBe("JS");
    expect(endState["1"][2].status).toBe(0);
});
test("Reducer should delete all tasks for todoList", () => {
    const endState = tasksReducer(startState, removeTodoListAC("2"));
    expect(endState["2"]).toBe(undefined);
    expect(endState["1"].length).toBe(3);
});
test("Reducer should add tasks array for todoList", () => {
    const endState = tasksReducer(
        startState,
        addTodoListAC({
            id: "3",
            title: "New TodoList",
            addedDate: new Date(),
            order: 0,
            filter: "All",
        }),
    );
    expect(endState["1"].length).toBe(3);
    expect(Object.keys(endState).length).toBe(3);
});