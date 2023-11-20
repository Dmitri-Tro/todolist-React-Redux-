import React, {FC} from "react";

type ButtonComponentPropsType = {
    title: string
}
export const ButtonComponent: FC<ButtonComponentPropsType> = (props) => {
    return (
        <button>{props.title}</button>
    )
}