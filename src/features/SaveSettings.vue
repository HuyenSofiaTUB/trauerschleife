<script setup>
import { useSettingsStore } from "@/stores/settings";
import Button from "@/composables/Button.vue";
import IconDownload from "@/components/icons/IconDownload.vue";

const settings = useSettingsStore();

function saveSettings() {
  const blob = new Blob([JSON.stringify(settings.$state)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = settings.title + "-settings.json";
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <Button @click="saveSettings">
    <IconDownload />
  </Button>
</template>
