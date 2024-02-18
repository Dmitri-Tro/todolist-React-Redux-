import { TodoListDomain } from "types/types";
import { AppRootState } from "state/store";

export const selectTodolists = (state: AppRootState): TodoListDomain[] => state.todoLists