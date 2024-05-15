<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "../stores/ChatStore";

const chatStore = useChatStore();
const { messages, clientId } = storeToRefs(chatStore);
</script>

<template>
  <div id="chat-scroll">
    <div
      v-for="msg in messages.slice().reverse()"
      :class="[msg.clientId === clientId ? 'align-self-end' : 'align-self-start']"
    >
      ({{ msg.fromName }}): {{ msg.text }}
    </div>
  </div>
</template>

<style>
#chat-scroll {
  height: 100%;
  overflow: auto;
  margin: 1rem 0;
  display: flex;
  flex-direction: column-reverse;
}
</style>
