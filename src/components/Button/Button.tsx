import React, {FC} from "react";

type ButtonComponentPropsType = {
    title: string,
    onClickHandler: () => void,
    disabled?: boolean,
    classes?: string
}
export const Button: FC<ButtonComponentPropsType> = React.memo(({
                                                                             title,
                                                                             onClickHandler,
                                                                             disabled,
                                                                             classes
                                                                         }) => {
    return (
        <button className={classes} disabled={disabled} onClick={onClickHandler}>{title}</button>
    )
});