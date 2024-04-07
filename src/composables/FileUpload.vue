<script setup>
const props = defineProps({
    accept: {
        type: String,
        default: 'image/*'
    }
})
const emits = defineEmits(['change'])
</script>

<template>
    <div>
        <input type="file" :id="$.uid" @change="$emit('change', $event.target.files[0])" :accept="accept">
        <label :for="$.uid">
            <slot></slot>
        </label>
    </div>
</template>

<style scoped>
input {
    -webkit-appearance: none;
    border: none;
    width: 0;
    height: 0;
    position: absolute;
    bottom: 0;
    visibility: hidden;
}

input::-webkit-color-swatch-wrapper {
    padding: 0;
}

input::-webkit-color-swatch {
    border: none;
}
</style>