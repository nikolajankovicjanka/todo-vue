// stores/kanban.ts
import { defineStore } from "pinia";
import type { Task, Column } from "@/types/kanban";

// Učitaj podatke iz localStorage-a
const loadFromLocalStorage = () => {
    const data = localStorage.getItem("kanbanData");
    return data ? JSON.parse(data) : { columns: [] };
};

export const useKanbanStore = defineStore("kanban", {
    state: () => loadFromLocalStorage(), // Inicijaliziraj stanje podacima iz localStorage-a
    actions: {
        addColumn(title: string) {
            this.columns.push({
                id: Date.now().toString(),
                title,
                tasks: [],
            });
            this.saveToLocalStorage(); // Spremi podatke nakon dodavanja kolone
        },
        addTask(columnId: string, task: Task) {
            const column = this.columns.find((col) => col.id === columnId);
            if (column) {
                column.tasks.push(task);
                this.saveToLocalStorage(); // Spremi podatke nakon dodavanja zadatka
            }
        },
        deleteTask(columnId: string, taskId: string) {
            const column = this.columns.find((col) => col.id === columnId);
            if (column) {
                column.tasks = column.tasks.filter((task) => task.id !== taskId);
                this.saveToLocalStorage(); // Spremi podatke nakon brisanja zadatka
            }
        },
        updateColumnTasks(columnId: string, tasks: Task[]) {
            const column = this.columns.find((col) => col.id === columnId);
            if (column) {
                column.tasks = tasks;
                this.saveToLocalStorage(); // Spremi podatke nakon ažuriranja zadataka
            }
        },
        moveTask(taskId: string, fromColumnId: string, toColumnId: string) {
            const fromColumn = this.columns.find((col) => col.id === fromColumnId);
            const toColumn = this.columns.find((col) => col.id === toColumnId);

            if (fromColumn && toColumn) {
                // Pronađi zadatak u izvorišnoj koloni
                const taskIndex = fromColumn.tasks.findIndex((task) => task.id === taskId);
                if (taskIndex !== -1) {
                    // Ukloni zadatak iz izvorišne kolone
                    const [task] = fromColumn.tasks.splice(taskIndex, 1);
                    // Dodaj zadatak u odredišnu kolonu
                    toColumn.tasks.push(task);
                    this.saveToLocalStorage(); // Spremi podatke nakon premještanja zadatka
                }
            }
        },
        deleteColumn(columnId: string) {
            this.columns = this.columns.filter((col) => col.id !== columnId);
            this.saveToLocalStorage(); // Spremi podatke nakon brisanja kolone
        },
        saveToLocalStorage() {
            // Spremi cijelo stanje u localStorage
            localStorage.setItem("kanbanData", JSON.stringify(this.$state));
        },
    },
});