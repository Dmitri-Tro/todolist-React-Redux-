import React, { ChangeEvent, FC, useCallback, useState } from "react";
import styles from "./EditableTitle.module.css";

type EditableTitleProps = {
    oldTitle: string;
    setNewTitle: (title: string) => void;
    disabled: boolean;
};

type Mode = "viewMode" | "inputMode";
export const EditableTitle: FC<EditableTitleProps> = React.memo(({ oldTitle, setNewTitle, disabled }) => {
    const [updatedTitle, setUpdatedTitle] = useState<string>(oldTitle);
    const [mode, setMode] = useState<Mode>("viewMode");
    const onTitleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.currentTarget.value);
    };
    const onInputBlurHandler = useCallback(() => {
        setNewTitle(updatedTitle);
        setMode("viewMode");
    }, [setNewTitle, updatedTitle]);

    return (
        <>
            {mode === "viewMode" ? (
                <span className={styles.editableTitle} onDoubleClick={() => setMode("inputMode")}>
                    {oldTitle}
                </span>
            ) : (
                <input
                    className={styles.editableTitleInput}
                    value={updatedTitle}
                    onChange={onTitleInputChangeHandler}
                    onBlur={onInputBlurHandler}
                    autoFocus
                    disabled={disabled}
                />
            )}
        </>
    );
});
