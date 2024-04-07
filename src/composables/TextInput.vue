<script setup>
const props = defineProps({
    value: {
        type: null,
        required: true,
    },
    width: {
        type: String,
        default: "100%",
    },
});

const emits = defineEmits(["change", "input"]);
</script>

<template>
    <input type="text" @change="$emit('change', $event.target.value)" @input="$emit('input', $event.target.value)"
        :value="value" />
</template>

<style scoped>
input[type="text"] {
    min-width: 1rem;
    width: v-bind('width');
    border: 0;
    background-color: transparent;
    font-size: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
    padding: 0 3px;
}

input[type="text"]:focus {
    outline: none;
}
</style>