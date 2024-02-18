import { AppRootState } from "state/store";
import { TaskT } from "types/types";

export const selectTasks = (todoListID: string) => (state: AppRootState): TaskT[] => state.tasks[todoListID];
export const selectTask = (todoListID: string, taskId: string) =>  (state: AppRootState): TaskT | undefined => state.tasks[todoListID]!.find((t) => t.id === taskId)