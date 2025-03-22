<template>
    <div class="card-body">
        <h4 class="card-title">{{ task.title }}</h4>
        <p v-if="task.description" class="card-text">{{ task.description }}</p>
        <button @click="deleteTask" class="btn btn-danger btn-sm">Delete</button>
    </div>
</template>

<script setup lang="ts">
import type { Task } from "@/types/kanban";

defineProps<{
    task: Task;
}>();

const emit = defineEmits(["delete"]);

const deleteTask = () => {
    emit("delete");
};
</script>

<style scoped>
.card-text {
    margin-bottom: 10px;
}
</style>