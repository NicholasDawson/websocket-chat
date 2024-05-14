<script setup lang="ts">
import ChatHeader from './ChatHeader.vue'
import ChatScroll from './ChatScroll.vue'
import ChatInput from './ChatInput.vue'
</script>

<template>
  <div id="chat" class="flex flex-column justify-content-between">
    <ChatHeader/>
    <ChatScroll/>
    <ChatInput/>
  </div>
</template>

<style>
#chat {
  max-width: 800px;
  margin: auto;
  height: 100vh;
}
</style>
