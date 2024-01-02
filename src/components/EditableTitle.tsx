import React, {ChangeEvent, FC, useState} from "react";

type EditableTitleProps = {
    oldTitle: string
    setNewTitle: (title: string) => void
}

type Mode = 'viewMode' | 'inputMode';
export const EditableTitle: FC<EditableTitleProps> = ({oldTitle, setNewTitle}) => {

    const [updatedTitle, setUpdatedTitle] = useState<string>(oldTitle);
    const [mode, setMode] = useState<Mode>('viewMode')

    const onTitleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.currentTarget.value)
    }
    const onInputBlurHandler = () => {
        setNewTitle(updatedTitle);
        setMode('viewMode');

    }

    return (
        <>
            {mode === 'viewMode' ?
                <span className={'editableTitle-title'} onDoubleClick={() => setMode('inputMode')}>{oldTitle}</span> :
                <input className={'editableTitle-input'} value={updatedTitle} onChange={onTitleInputChange} onBlur={onInputBlurHandler} autoFocus />
            }
        </>
    )
}