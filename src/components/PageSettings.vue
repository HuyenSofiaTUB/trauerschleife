<script setup>
import { useSettingsStore } from "@/stores/settings";
import NumberInput from "@/composables/NumberInput.vue";

const settings = useSettingsStore();
</script>

<template>
    <div class="page-settings">
        <p>Width</p>
        <NumberInput :value="settings.pageWidth" unit="mm" @change="settings.setPageWidth" width="5rem" />
        <p>Border</p>
        <div class="page-settings__border">
            <div>
                <NumberInput :value="settings.pageMarginTop" unit="mm" @change="settings.setPageMarginTop"
                    width="4rem" />
            </div>
            <div>
                <NumberInput :value="settings.pageMarginLeft" unit="mm" @change="settings.setPageMarginLeft"
                    width="4rem" />
            </div>
            <div>
                <NumberInput :value="settings.pageMarginBottom" unit="mm" @change="settings.setPageMarginBottom"
                    width="4rem" />
            </div>
            <div>
                <NumberInput :value="settings.pageMarginRight" unit="mm" @change="settings.setPageMarginRight"
                    width="4rem" />
            </div>
        </div>

    </div>
</template>

<style scoped>
.page-settings {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
    justify-content: center;
}

.page-settings__border {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
}
</style>