import { defineStore } from "pinia";
import { Message } from "../types/Message";
import { ref, watch } from "vue";
import { useWebSocket } from "@vueuse/core";
import { useRouter } from "vue-router";

export const useChatStore = defineStore("chat", () => {
  const router = useRouter();
  const ws = useWebSocket(`${import.meta.env.VITE_BACKEND_WS_HOST}/chat`, {
    autoReconnect: true,
    immediate: false,
    onConnected(ws) {
      clientId.value = ''
      ws.send(username.value); // Send username to login
    },
  });

  const username = ref("");
  const clientId = ref("");
  const messages = ref<Message[]>([]);

  watch(ws.data, recieveMessage);
  function recieveMessage(newMessage: string) {
    // Message must be login confirmation
    if (!clientId.value) {
      clientId.value = newMessage;
      router.push("/chat"); // Redirect to new page
    } else {
      messages.value.push(JSON.parse(newMessage));
    }
  }

  function sendMessage(msg: string) {
    ws.send(msg);
  }

  function login() {
    ws.open();
  }

  function logout() {
    // Clear Store
    username.value = "";
    clientId.value = "";
    messages.value = [];
    ws.close()

    // Navigate to homepage
    router.push("/");
  }

  return { username, clientId, messages, sendMessage, login, logout };
});
