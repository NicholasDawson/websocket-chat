import { defineStore } from "pinia";
import { Message } from "../types/Message";
import { ref } from "vue";
import { useSessionStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

export const useChatStore = defineStore("chat", () => {
  const router = useRouter();

  const username = useSessionStorage("username", "");
  const messages = ref<Message[]>([]);

  function sendMessage(msg: string) {
    const newMsg = new Message(username.value, new Date(), true, msg);
    messages.value.push(newMsg);
  }

  function logout() {
    // Clear Store
    username.value = "";
    messages.value = []

    // Navigate to homepage
    router.push("/");
  }

  return { username, messages, sendMessage, logout };
});
