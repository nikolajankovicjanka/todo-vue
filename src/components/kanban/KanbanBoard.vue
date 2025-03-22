<template>
    <div class="container-kanban">
        <router-link to="/todos" class="btn btn-primary mb-3">Go to Todo List</router-link>
        <div class="row">
            <div v-for="column in kanbanStore.columns" :key="column.id" class="col-md-4 mb-4">
                <KanbanColumn :column="column" @delete-column="deleteColumn(column.id)" />
            </div>
            <div class="mb-4 d-flex justify-content-center">
                <button @click="addColumn" class="btn btn-success" style="margin-right: 10px;">Add Column</button>
                <button
                        v-if="kanbanStore.columns.length > 0"
                        @click="deleteLastColumn"
                        class="btn btn-danger"
                >
                    Delete Last Column
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useKanbanStore } from "@/stores/kanban";
import KanbanColumn from "@/components/kanban/KanbanColumn.vue";

const kanbanStore = useKanbanStore();

const addColumn = () => {
    const title = prompt("Enter column title");
    if (title) {
        kanbanStore.addColumn(title);
    }
};

const deleteLastColumn = () => {
    if (kanbanStore.columns.length > 0) {
        kanbanStore.deleteColumn(kanbanStore.columns[kanbanStore.columns.length - 1].id);
    }
};

const deleteColumn = (columnId: string) => {
    kanbanStore.deleteColumn(columnId);
};
</script>

<style scoped>
.container-kanban {
    padding: 20px;
}
</style>