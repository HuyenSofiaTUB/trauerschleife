<script setup>
import Button from '@/composables/Button.vue';
import Dropdown from '@/composables/Dropdown.vue';
import TextInput from '@/composables/TextInput.vue';
import RadioBox from '@/composables/RadioBox.vue';
import IconMinus from '@/components/icons/IconMinus.vue';
import IconPlus from '@/components/icons/IconPlus.vue';

const props = defineProps({
    value: {
        type: null,
        required: true,
    },
    unit: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '100%',
    },
    options: {
        type: Array,
        default: () => [],
    },
    prop_name: {
        type: String,
        default: 'value',
    },
});
const emits = defineEmits(['change']);
</script>

<template>
    <div>
        <Button @click="$emit('change', value - 1)">
            <IconMinus />
        </Button>
        <Dropdown :indicator="false">
            <template v-slot:button>
                <TextInput :value="value + unit" @change="$emit('change', $event)" :width="width" />
            </template>
            <RadioBox v-for="option in options" :key="option" @click="$emit('change', option)"
                :checked="value == option" :name="prop_name">
                {{ option }}
            </RadioBox>
        </Dropdown>
        <Button @click="$emit('change', value + 1)">
            <IconPlus />
        </Button>
    </div>
</template>

<style scoped>
div {
    display: flex;
    gap: 3px;
}

input {
    text-align: center;
}
</style>