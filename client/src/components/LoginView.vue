<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useChatStore } from "../stores/ChatStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const chatStore = useChatStore();
const { username } = storeToRefs(chatStore);
</script>

<template>
  <div class="flex justify-content-center flex-column align-items-center gap-2">
    <h1>WebSocket Chat</h1>
    <div class="flex flex-column gap-2">
      <label for="username">Username</label>
      <InputText autocomplete="off" id="username" v-model="username" />
    </div>
    <Button label="Login" :disabled="!username" @click="router.push('/chat')" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
