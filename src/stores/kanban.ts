import { defineStore } from "pinia";
import type { Task, Column, KanbanState } from "@/types/kanban";

const loadFromLocalStorage = (): KanbanState => {
    const data = localStorage.getItem("kanbanData");
    return data ? JSON.parse(data) : { columns: [] };
};

export const useKanbanStore = defineStore("kanban", {
    state: (): KanbanState => loadFromLocalStorage(),
    actions: {
        addColumn(title: string) {
            this.columns.push({
                id: Date.now().toString(),
                title,
                tasks: [],
            });
            this.saveToLocalStorage();
        },
        addTask(columnId: string, task: Task) {
            const column = this.columns.find((col: Column) => col.id === columnId);
            if (column) {
                column.tasks.push(task);
                this.saveToLocalStorage();
            }
        },
        deleteTask(columnId: string, taskId: string) {
            const column = this.columns.find((col: Column) => col.id === columnId);
            if (column) {
                column.tasks = column.tasks.filter((task: Task) => task.id !== taskId);
                this.saveToLocalStorage();
            }
        },
        updateColumnTasks(columnId: string, tasks: Task[]) {
            const column = this.columns.find((col: Column) => col.id === columnId);
            if (column) {
                column.tasks = tasks;
                this.saveToLocalStorage();
            }
        },
        moveTask(taskId: string, fromColumnId: string, toColumnId: string) {
            const fromColumn = this.columns.find((col: Column) => col.id === fromColumnId);
            const toColumn = this.columns.find((col: Column) => col.id === toColumnId);

            if (fromColumn && toColumn) {
                const taskIndex = fromColumn.tasks.findIndex((task: Task) => task.id === taskId);
                if (taskIndex !== -1) {
                    const [task] = fromColumn.tasks.splice(taskIndex, 1);
                    toColumn.tasks.push(task);
                    this.saveToLocalStorage();
                }
            }
        },
        deleteColumn(columnId: string) {
            this.columns = this.columns.filter((col: Column) => col.id !== columnId);
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            localStorage.setItem("kanbanData", JSON.stringify(this.$state));
        },
    },
});