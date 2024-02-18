import type { Meta, StoryObj } from "@storybook/react";
import { EditableTitle } from "./EditableTitle";

//----------COMMON STORIES SETTINGS-------------------------------------------------------------------------------

const meta: Meta<typeof EditableTitle> = {
    title: 'TODOLIST/Component "Editable title"',
    component: EditableTitle,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        oldTitle: {
            description:
                "It is a value of title from global state. On double click you can change view mode and update this title.",
        },
        setNewTitle: {
            description: "Callback is update title from global state. Callback works when input on blur",
            action: "Button clicked, new title value pushed",
        },
    },
};

export default meta;

type Story = StoryObj<typeof EditableTitle>;

//-------------STORIES SECTION------------------------------------------------------------------------------------

export const BaseExampleWithUsage: Story = {
    args: {
        oldTitle: "Storybook",
    },
};
