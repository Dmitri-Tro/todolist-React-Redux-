import { RequestStatus } from "types/types";

const initialState = {
    isInitialized: false,
    status: "idle" as RequestStatus,
    error: null as null | string,
};

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActions): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return { ...state, status: action.status };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        case "APP/SET-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized };
        default:
            return state;
    }
};

// Actions
export const setStatusAC = (status: RequestStatus) => {
    return {
        type: "APP/SET-STATUS",
        status,
    } as const;
};
export const setErrorAC = (error: null | string) => {
    return {
        type: "APP/SET-ERROR",
        error,
    } as const;
};
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP/SET-INITIALIZED",
        isInitialized,
    } as const;
};

// Types
export type AppReducerActions = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorAC> | SetInitialized;
export type SetInitialized = ReturnType<typeof setInitializedAC>;
type InitialStateType = typeof initialState;
