import type { Meta, StoryObj } from "@storybook/react";
import { InputAndButton } from "./InputAndButton";

//----------COMMON STORIES SETTINGS-------------------------------------------------------------------------------

const meta: Meta<typeof InputAndButton> = {
    title: 'TODOLIST/Component "Input with button"',
    component: InputAndButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        addNewItem: {
            description: "Callback is add item to global state",
            action: "Button clicked, new item value pushed",
        },
        inputBtnTitle: {
            description: "Just add button title",
        },
        maxTitleLength: {
            description: "Set maximum string length",
        },
    },
};

export default meta;

type Story = StoryObj<typeof InputAndButton>;

//-------------STORIES SECTION------------------------------------------------------------------------------------

export const BaseExampleWithUsage: Story = {
    args: {
        inputBtnTitle: "Add Item",
        maxTitleLength: 15,
    },
};
