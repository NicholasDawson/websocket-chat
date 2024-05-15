<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { useChatStore } from "../stores/ChatStore";
import { storeToRefs } from "pinia";

const chatStore = useChatStore();
const { clientId } = storeToRefs(chatStore);

// We want to prompt the user to login if no clientId
const router = useRouter();
if (clientId.value === "") {
  router.push("/");
}

</script>

<template>
  <div>
    <div class="flex justify-content-between align-items-center">
      <h1>WebSocket Chat</h1>
      <div class="flex align-items-center">
        Client ID:
        <pre> {{ clientId }} </pre>
        <Button
          icon="pi pi-sign-out"
          severity="danger"
          rounded
          outlined
          aria-label="Logout"
          @click="chatStore.logout"
          v-tooltip.bottom="'Logout'"
        />
      </div>
    </div>
    <hr />
  </div>
</template>
