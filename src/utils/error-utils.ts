import {setErrorAC, setStatusAC} from "../state/app-reducer/app-reducer";
import {Dispatch} from "redux";
import {BaseResponse, GetTaskResponse} from "../api/api";

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('some error'))
    }
    dispatch(setStatusAC('failed'));
}

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
    dispatch(setStatusAC('failed'));
    dispatch(setErrorAC(error));
}

export const handleServerGetTasksError = (dispatch: Dispatch, data: GetTaskResponse) => {
    if (data.error) {
        dispatch(setErrorAC(data.error))
    } else {
        dispatch(setErrorAC('some error'))
    }
    dispatch(setStatusAC('failed'));
}