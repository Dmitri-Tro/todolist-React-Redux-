import { AppRootState } from "state/store";
import { RequestStatus } from "types/types";

export const selectAppRequestStatus = (state: AppRootState): RequestStatus => state.app.status;
export const selectIsInitialized = (state: AppRootState): boolean => state.app.isInitialized;
export const selectAppError = (state: AppRootState): string | null => state.app.error;
