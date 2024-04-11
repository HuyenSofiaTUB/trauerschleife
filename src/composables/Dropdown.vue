<script setup>
import IconUp from '@/components/icons/IconUp.vue';
import IconDown from '@/components/icons/IconDown.vue';
import Button from './Button.vue';
import { ref, onMounted } from 'vue';

const props = defineProps({
    indicator: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'dropdown-list'
    }
})

const isOverflowing = ref(false);
const dropdownContent = ref(null);

function checkOverflow() {
    const dropdownRect = dropdownContent.value.getBoundingClientRect();
    console.log(dropdownRect.right, window.innerWidth);
    isOverflowing.value = dropdownRect.right > window.innerWidth;

}

if (props.type === 'dropdown-box') {
    window.addEventListener('resize', () => {
        checkOverflow();
    });
    onMounted(() => {
        checkOverflow();
    });
}

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
        <div class="dropdown-content" ref="dropdownContent">
            <div :class="type">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    display: flex;
}

.icon-up,
.dropdown:focus-within .icon-down {
    display: none !important;
}

.dropdown-content {
    visibility: hidden;
    display: flex;
    position: absolute;
    top: 100%;
    right: v-bind('isOverflowing ? 0 : "auto"');
    background-color: var(--color-background-soft);
    border-radius: 5px;
    box-shadow: var(--color-shadow) 0px 3px 8px;
    margin-top: 5px;
    min-width: 100%;
    z-index: 25;
}

.dropdown:focus-within .dropdown-content {
    visibility: visible;
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