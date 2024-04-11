<script setup>
import IconUp from '@/components/icons/IconUp.vue';
import IconDown from '@/components/icons/IconDown.vue';
import Button from './Button.vue';

const props = defineProps({
    right: {
        type: Boolean,
        default: false

    },
    indicator: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'dropdown-list'
    }
})
</script>
<template>
    <div class="dropdown" tabindex="1">
        <Button>
            <slot name="button"></slot>
            <div v-if="indicator">
                <IconDown class="icon-down" />
                <IconUp class="icon-up" />
            </div>
        </Button>
        <div class="dropdown-content">
            <div :class="type">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.icon-up,
.dropdown-content,
.dropdown:focus-within .icon-down {
    display: none !important;
}

.dropdown {
    position: relative;
    display: flex;
}

.dropdown:focus-within .dropdown-content {
    display: flex !important;
    position: absolute;
    top: 100%;
    right: v-bind('right ? 0 : "auto"');
    background-color: var(--color-background-soft);
    border-radius: 5px;
    box-shadow: var(--color-shadow) 0px 3px 8px;
    margin-top: 5px;
    min-width: 100%;
    z-index: 25;
}

.dropdown:focus-within .icon-up,
.icon-down {
    display: flex !important;
}

.dropdown-list {
    display: flex;
    flex-direction: column;
    min-width: 100%;
}

.dropdown-box {
    display: flex;
    gap: 5px;
    padding: 5px;
}
</style>