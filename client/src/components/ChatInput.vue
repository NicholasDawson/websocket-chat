<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useChatStore } from "../stores/ChatStore";

const message = ref<string>();

const chatStore = useChatStore();

function sendMessage() {
  if (message.value) {
    chatStore.sendMessage(message.value); // send message
    message.value = ""; // clear message buffer
  }
}
</script>

<template>
  <div id="chat-input" class="flex justify-content-between gap-2">
    <InputText
      autocomplete="off"
      type="text"
      v-model="message"
      class="w-full"
      @keyup.enter="sendMessage"
    />
    <Button icon="pi pi-send" :disabled="!message" @click="sendMessage" />
  </div>
</template>

<style>
#chat-input {
  margin-bottom: 1rem;
}
</style>
