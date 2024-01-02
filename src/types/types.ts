export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [todoListID: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    status: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed';