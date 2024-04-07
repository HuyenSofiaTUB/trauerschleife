<script setup>
const props = defineProps({
    value: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['input'])
</script>

<template>
    <div>
        <input type="color" :id="$.uid" :value="value" @input="$emit('input', $event.target.value)">
        <label :for="$.uid">
            <slot></slot>
        </label>
    </div>
</template>

<style scoped>
input[type="color"] {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    width: 0;
    height: 0;
    position: absolute;
    bottom: 0;
    visibility: hidden;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type="color"]::-webkit-color-swatch {
    border: none;
}
</style>