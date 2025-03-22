<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title text-center mb-3 border-bottom border-primary">{{ column.title }}</h3>
            <draggable
                    v-model="tasks"
                    group="tasks"
                    item-key="id"
                    @start="onDragStart"
                    @end="onDragEnd"
            >
                <template #item="{ element }">
                    <div class="card mb-2">
                        <KanbanTask :task="element" @delete="deleteTask(element.id)" />
                    </div>
                </template>
            </draggable>
            <div class="row d-flex justify-content-center">
                <button @click="addTask" class="btn btn-primary w-25" style="margin-right: 10px">Add Task</button>
                <button @click="deleteColumn" class="btn btn-danger w-25">Delete Column</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useKanbanStore } from "@/stores/kanban";
import KanbanTask from "@/components/kanban/KanbanTask.vue";
import draggable from "vuedraggable";
import type { Task } from "@/types/kanban";
import { computed } from "vue";

const props = defineProps<{
    column: {
        id: string;
        title: string;
        tasks: Task[];
    };
}>();

const emit = defineEmits(["delete-column"]);

const kanbanStore = useKanbanStore();

// Koristi computed property za dvosmjerno povezivanje (v-model)
const tasks = computed({
    get() {
        return props.column.tasks;
    },
    set(value) {
        kanbanStore.updateColumnTasks(props.column.id, value);
    },
});

const addTask = () => {
    const title = prompt("Enter task title");
    if (title) {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false, // Sada je ovo validno polje
            createdAt: new Date(),
        };
        kanbanStore.addTask(props.column.id, newTask);
    }
};

const deleteTask = (taskId: string) => {
    kanbanStore.deleteTask(props.column.id, taskId);
};

const deleteColumn = () => {
    emit("delete-column", props.column.id);
};

const onDragStart = (event: DragEvent) => {
    console.log("Drag started:", event);
    if (event.dataTransfer) {
        event.dataTransfer.setData("taskId", (event.target as HTMLElement).dataset.taskId || "");
        event.dataTransfer.setData("fromColumnId", props.column.id);
    }
};

const onDragEnd = (event: DragEvent) => {
    console.log("Drag ended:", event);
    kanbanStore.updateColumnTasks(props.column.id, tasks.value);
};
</script>

<style scoped>
.card {
    height: 100%;
}
</style>