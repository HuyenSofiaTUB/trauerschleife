<script setup>
import Button from './Button.vue';

const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['click']);
</script>

<template>
    <input type="checkbox" :id="$.uid" @click="$emit('click')" :checked="checked" />
    <label :for="$.uid">
        <Button>
            <slot></slot>
        </Button>
    </label>
</template>

<style scoped>
input {
    display: none;
}

input:checked+label>* {
    background-color: var(--color-background);
}
</style>