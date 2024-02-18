import { Dispatch } from "redux";
import { authApi } from "api/auth-api";
import { FetchResultCode } from "types/types";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { SetInitialized, setInitializedAC, setStatusAC } from "state/app-reducer/app-reducer";
import { clearTodoListsDataAC } from "state/todoLists-reducer/todoLists-reducer";

const initialState: AuthReducer = {
    id: null,
    email: "",
    login: "",
    isLogin: false,
};

export const authReducer = (state: AuthReducer = initialState, action: AuthReducerAction): AuthReducer => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogin: action.payload.isLogin,
            };
        case "SET_USER_DATA":
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                login: action.payload.login,
            };
        default:
            return state;
    }
};

// Actions
export const loginAC = (isLogin: boolean) => {
    return {
        type: "LOGIN",
        payload: {
            isLogin,
        },
    } as const;
};

export const setUserDataAC = (id: number, email: string, login: string) => {
    return {
        type: "SET_USER_DATA",
        payload: {
            id,
            email,
            login,
        },
    } as const;
};

// Thunks
export const loginTC = (email: string, password: string, rememberMe?: boolean) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC("loading"));
            const res = await authApi.login(email, password, rememberMe);
            if (res.data.resultCode === FetchResultCode.Successful) {
                dispatch(loginAC(true));
                dispatch(setStatusAC("succeeded"));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        } catch (e) {
            handleServerNetworkError(dispatch, (e as { message: string }).message);
        }
    };
};
export const logoutTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC("loading"));
            const res = await authApi.logout();
            if (res.data.resultCode === FetchResultCode.Successful) {
                dispatch(loginAC(false));
                dispatch(clearTodoListsDataAC());
                dispatch(setStatusAC("succeeded"));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        } catch (e) {
            handleServerNetworkError(dispatch, (e as { message: string }).message);
        }
    };
};
export const authUserTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC("loading"));
            const res = await authApi.me();
            if (res.data.resultCode === FetchResultCode.Successful) {
                dispatch(loginAC(true));
                dispatch(setUserDataAC(res.data.data.id, res.data.data.email, res.data.data.login));
                dispatch(setStatusAC("succeeded"));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        } catch (e) {
            handleServerNetworkError(dispatch, (e as { message: string }).message);
        } finally {
            dispatch(setInitializedAC(true));
        }
    };
};

// Types

export type AuthReducerAction = LoginAC | SetUserDataAC | SetInitialized;

type LoginAC = ReturnType<typeof loginAC>;
type SetUserDataAC = ReturnType<typeof setUserDataAC>;

export type AuthReducer = {
    id: number | null;
    email: string;
    login: string;
    isLogin: boolean;
};