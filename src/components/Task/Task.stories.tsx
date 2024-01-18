import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../.storybook/ReduxStoreProviderDecorator";
import React, {FC, ReactNode} from "react";
import {useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {TaskType} from "../../types/types";


//----------COMMON STORIES SETTINGS-------------------------------------------------------------------------------

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Component "Task"',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs'],
    argTypes: {
        todoListID: {
            description: 'It is todolist id to search for the list in which the task is located'
        },
        taskId: {
            description: 'It is task id to search task in tasks list',
        }
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

//-------------STORIES SECTION------------------------------------------------------------------------------------

export const NotDoneTaskExampleWithUsage: Story = {
    args: {
        todoListID: '1',
        taskId: '4'
    },
};
export const DoneTaskExampleWithUsage: Story = {
    args: {
        todoListID: '1',
        taskId: '1'
    },
};