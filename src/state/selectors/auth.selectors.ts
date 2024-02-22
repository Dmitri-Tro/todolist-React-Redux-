import { AppRootState } from "state/store";

export const selectIsLogin = (state: AppRootState): boolean => state.auth.isLogin;
