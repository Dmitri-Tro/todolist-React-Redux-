import {RequestStatusType} from "../../types/types";


const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActions): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP/SET-INITIALIZED",
        isInitialized
    } as const
}

export type SetInitialized = ReturnType<typeof setInitializedAC>

export type AppReducerActions =
    ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | SetInitialized