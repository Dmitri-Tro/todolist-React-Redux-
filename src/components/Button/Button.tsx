import React, { FC } from "react";
import styles from "./Button.module.css";

type ButtonComponentPropsType = {
    title: string;
    onClickHandler: () => void;
    disabled?: boolean;
    classes?: string;
};
export const Button: FC<ButtonComponentPropsType> = React.memo(({ title, onClickHandler, disabled, classes }) => {
    return (
        <button className={styles.btn + " " + classes} disabled={disabled} onClick={onClickHandler}>
            {title}
        </button>
    );
});
