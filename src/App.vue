<script setup>
import Preview from "@/components/Preview.vue";
import TextSettings from "@/components/TextSettings.vue";
import { useSettingsStore } from "@/stores/settings";
import { useViewStore } from "@/stores/view";
const settings = useSettingsStore();
const view = useViewStore();

function isiOS() {
  return navigator.userAgent.match(/ipad|ipod|iphone/i);
}

if (isiOS()) {
  var ins = [],
    _ins = document.querySelectorAll("input");
  for (var i = 0; i < ins.length; i++) ins.push(_ins[i]);
  document.body.addEventListener("touchstart", (event) => {
    if (ins.filter((i) => i.contains(event.target)).length == 0)
      document.activeElement.blur();
  });
}

document.addEventListener("scroll", function () {
  const scrollX = window.scrollX;
  document.querySelector("header").style.left = -scrollX + "px";
});
</script>

<template>
  <header>
    <span
      contenteditable
      @input="settings.setTitle($event.target.innerText)"
      v-html="view.title"
    ></span>
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
  left: 0;
  padding: 2rem 10px 10px 10px;
  position: sticky;
  z-index: 20;
  background-color: var(--color-background-soft);
}

main {
  margin: 10px 0 50px 0;
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
