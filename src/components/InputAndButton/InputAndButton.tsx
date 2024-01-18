import {Button} from "../Button/Button";
import React, {ChangeEvent, FC, KeyboardEvent, useCallback, useState} from "react";
import styles from './InputAndButton.module.css'

type InputAndButtonPropsType = {
    addNewItem: (title: string) => void
    inputBtnTitle: string
    maxTitleLength: number
}

export const InputAndButton: FC<InputAndButtonPropsType> = React.memo(({addNewItem, inputBtnTitle, maxTitleLength}) => {
        const [title, setTitle] = useState<string>('');
        const [inputError, setInputError] = useState<boolean>(false);
        const maxLengthTaskError = title.length >= maxTitleLength;
        const trueTitle = title.trim();

        const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            inputError && setInputError(false);
            event.currentTarget.value.length <= 15 && setTitle(event.currentTarget.value);
        };
        const onEnterPressAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && title && !maxLengthTaskError) {
                trueTitle ? addNewItem(trueTitle) : !inputError && setInputError(true);
                setTitle('');
            }
        };
        const onAddBtnClickHandler = useCallback(() => {
            trueTitle ? addNewItem(trueTitle) : !inputError && setInputError(true);
            setTitle('');
        }, [addNewItem, trueTitle, inputError]);

        return (
            <div style={{display: "flex", flexDirection: 'column', height: '55px'}}>
                <div>
                    <input
                        className={inputError || maxLengthTaskError ? styles.input + ' ' + styles.inputError : styles.input}
                        value={title}
                        onChange={onInputChangeHandler}
                        onKeyUp={onEnterPressAddTaskHandler}
                    />
                    <Button disabled={inputError || maxLengthTaskError}
                            title={inputBtnTitle}
                            onClickHandler={onAddBtnClickHandler}
                            classes={styles.btn}
                    />
                </div>
                {maxLengthTaskError && <div style={{color: "red"}}>Your title is too long!</div>}
                {inputError && <div style={{color: "red"}}>Title must contain any symbols</div>}
            </div>
        )
    });