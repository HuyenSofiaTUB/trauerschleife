<script setup>
import Button from './Button.vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['click']);
</script>

<template>
    <input type="radio" :id="$.uid" :name="name" @click="$emit('click')" :checked="checked" />
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