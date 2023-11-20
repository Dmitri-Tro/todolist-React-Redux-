import React, {FC} from "react";
import {ButtonComponent} from "./Button.component";
import {TaskType} from "./Task.component";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}
export const TodolistComponent: FC<TodolistPropsType> = (props) => {
    // 1.
   // const title = props.title;
   // const tasks = props.tasks;
    //2.
    // const {title: myTitle, tasks: myTasks} = props;
    //3.
    const {title, tasks} = props;

    const tasksList: Array<JSX.Element> = [];
    for (let i= 0; i < props.tasks.length; i++) {
        const listItem: JSX.Element = (
            <li id={tasks[i].id}><input type="checkbox" checked={tasks[i].status}/> <span>{tasks[i].title}</span></li>
        )
        tasksList.push(listItem)
    }
    return(
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <ButtonComponent title="+" />
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <ButtonComponent title="All" />
                <ButtonComponent title="Active" />
                <ButtonComponent title="Completed" />
            </div>
        </div>
    )
}