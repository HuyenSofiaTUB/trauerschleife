<script setup>
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
        <div>
            <slot></slot>
        </div>
    </label>
</template>

<style scoped>
input {
    display: none;
}

div:hover,
input:checked+label>* {
    background-color: var(--color-background-mute);
}

div {
    padding: 5px 10px;
    cursor: pointer;
}
</style>