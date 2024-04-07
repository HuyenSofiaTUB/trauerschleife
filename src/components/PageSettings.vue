<script setup>
import { useSettingsStore } from "@/stores/settings";
import NumberInput from "@/composables/NumberInput.vue";

const settings = useSettingsStore();
</script>

<template>
    <div class="page-settings">
        <p>Width</p>
        <div>
            <NumberInput :value="settings.pageWidth" unit="mm" @change="settings.setPageWidth" width="5rem" />
        </div>
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
            <p>Top</p>
            <p>Left</p>
            <div>
                <NumberInput :value="settings.pageMarginBottom" unit="mm" @change="settings.setPageMarginBottom"
                    width="4rem" />
            </div>
            <div>
                <NumberInput :value="settings.pageMarginRight" unit="mm" @change="settings.setPageMarginRight"
                    width="4rem" />
            </div>
            <p>Bottom</p>
            <p>Right</p>
        </div>

    </div>
</template>

<style scoped>
.page-settings {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: stretch;
    justify-content: center;
}

.page-settings>*,
.page-settings__border>* {
    display: flex;
    justify-content: center;
    align-items: center;
}

.page-settings>p {
    padding-top: 5px;
}

.page-settings>p:not(:first-child) {
    border-top: 1px solid var(--color-border);
}

.page-settings__border {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
}

.page-settings__border>p {
    font-weight: normal;
}
</style>