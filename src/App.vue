<script setup>
import Preview from '@/components/Preview.vue';
import TextSettings from '@/components/TextSettings.vue';
import { useSettingsStore } from "@/stores/settings";
const settings = useSettingsStore();


</script>

<template>
  <header>
    <span contenteditable @input="settings.setTitle($event.target.innerText)">{{ settings.title }}</span>
    <TextSettings />
  </header>
  <main>
    <Preview />
  </main>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  top: 0;
  padding: 2rem 10px 10px 10px;
  position: sticky;
  z-index: 10;
}

main {
  margin-top: 10px;
}

span {
  font-size: 2rem;
  text-align: start;
  color: var(--color-text);
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 0 10px;
}

span:hover {
  border-color: var(--color-border);
}

span:focus {
  border-color: var(--color-primary);
}
</style>

<style>
span {
  outline: none;
  background-color: transparent;
}
</style>