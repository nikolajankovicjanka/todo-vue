export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
    createdAt: Date;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}