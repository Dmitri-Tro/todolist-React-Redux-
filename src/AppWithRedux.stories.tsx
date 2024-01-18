import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "../.storybook/ReduxStoreProviderDecorator";


//----------COMMON STORIES SETTINGS-------------------------------------------------------------------------------

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLIST/App Component',
    component: AppWithRedux,
    parameters: {
        layout: 'centered',
    },
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs'],
    argTypes: {  },
};

export default meta;

type Story = StoryObj<typeof meta>;

//-------------STORIES SECTION------------------------------------------------------------------------------------

export const BaseExampleWithUsage: Story = {  };
