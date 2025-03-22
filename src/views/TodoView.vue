<template>
  <div class="container">
      <button @click="goToKanban" class="nav-btn">Go to Kanban Board</button>
    <h1>Todo App</h1>
    <div class="card">
      <TodoForm />
    </div>
    <div class="card">
      <TodoList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";


const router = useRouter();


const goToKanban = () => {
    router.push({ name: "kanban" });
};
</script>
