<script setup>
import { useSettingsStore } from "@/stores/settings";
import RadioButton from "@/composables/RadioButton.vue";
import FileUpload from "@/composables/FileUpload.vue";
import IconUpload from "@/components/icons/IconUpload.vue";
import angel from "@/assets/images/angel.png";
import cross from "@/assets/images/cross.png";
import dove from "@/assets/images/dove.png";
import rose from "@/assets/images/rose.png";
import pray from "@/assets/images/pray.png";
import Button from "@/composables/Button.vue";

const settings = useSettingsStore();
const defaultImages = [angel, cross, dove, rose, pray];

function uploadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        settings.addImage(e.target.result);
    };
    reader.readAsDataURL(file);
}
</script>

<template>
    <div class="image-select">
        <div class="image-select__container">
            <RadioButton :key="'no-image'" @click="settings.setImage(null)" name="image" :checked="!settings.img">
                <div class="image">None</div>
            </RadioButton>
            <RadioButton v-for="(image, i) in defaultImages" :key="'default' + i" @click="settings.setImage(image)"
                name="image" :checked="settings.img === image">
                <img :src="image" />
            </RadioButton>
            <RadioButton v-for="(image, i) in settings.images" :key="'custom' + i" @click="settings.setImage(image)"
                name="image" :checked="settings.img === image">
                <img :src="image" />
            </RadioButton>
        </div>
        <FileUpload @change="uploadImage">
            <Button>
                <IconUpload /> Upload Image
            </Button>
        </FileUpload>
    </div>
</template>

<style scoped>
.image-select {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.image-select__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
}

.image,
img {
    width: 50px;
    height: 50px;
}

.image {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
}

img {
    object-fit: cover;
    filter: var(--image-filter);
}
</style>