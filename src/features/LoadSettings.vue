<script setup>
import IconUpload from "@/components/icons/IconUpload.vue";
import FileUpload from "@/composables/FileUpload.vue";
import Button from "@/composables/Button.vue";
import { useSettingsStore } from "@/stores/settings";
import { useViewStore } from "@/stores/view";

const settings = useSettingsStore();
const view = useViewStore();

function loadSettings(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const newSettings = JSON.parse(e.target.result);
    settings.setSettings(newSettings);
  };
  reader.onloadend = () => {
    view.text = settings.text;
  };
  reader.readAsText(file);
}
</script>

<template>
  <FileUpload @change="loadSettings" accept="application/json">
    <Button>
      <IconUpload />
    </Button>
  </FileUpload>
</template>
