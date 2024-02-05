import {RequestStatusType} from "../../types/types";


const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActions): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => {
   return {
       type: 'APP/SET-STATUS',
       status
   }as const
}
export const setErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    }as const
}
export type AppReducerActions = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorAC>