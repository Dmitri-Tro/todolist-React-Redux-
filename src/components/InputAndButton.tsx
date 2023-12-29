import {ButtonComponent} from "./Button.component";
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type InputAndButtonPropsType = {
    addNewItem: (title: string) => void
    inputBtnTitle: string
}

export const InputAndButton: FC<InputAndButtonPropsType> = ({addNewItem, inputBtnTitle}) => {

    const [title, setTitle] = useState('');
    const [inputError, setInputError] = useState(false);
    const maxLengthTaskError = title.length >= 15;

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputError(false);
        if (event.currentTarget.value.length <= 15) {
            setTitle(event.currentTarget.value);
        }
    };

    const onEnterPressAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && title && !maxLengthTaskError) {
            addNewItem(title);
            setTitle('');
        }
    }

    const onAddBtnClickHandler = () => {
        if (title.trim()) {
            addNewItem(title.trim());
        } else {
            setInputError(true)
        }
        setTitle('');
    };

    return (
        <div style={{display: "flex", maxHeight: '40px'}}>
            <input
                className={inputError || maxLengthTaskError ? 'addInput-input addInput-input-error' : 'addInput-input'}
                value={title}
                onChange={onInputChangeHandler}
                onKeyUp={onEnterPressAddTaskHandler}
            />
            <ButtonComponent disabled={!title || maxLengthTaskError}
                             title={inputBtnTitle}
                             onClickHandler={onAddBtnClickHandler}
                             classes={"addInput-btn"}
            />
            {maxLengthTaskError && <div style={{color: "red"}}>Your title is too long!</div>}
            {inputError && <div style={{color: "red"}}>Title must contain any symbols</div>}
        </div>
    )
}