export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

export interface KanbanState {
    columns: Column[];
}