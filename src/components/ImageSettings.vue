<script setup>
import { useSettingsStore } from "@/stores/settings";
import NumberInput from "@/composables/NumberInput.vue";
import CheckButton from "@/composables/CheckButton.vue";
import RadioButton from "@/composables/RadioButton.vue";
import Button from "@/composables/Button.vue";
import IconFlipX from "@/components/icons/IconFlipX.vue";
import IconFlipY from "@/components/icons/IconFlipY.vue";
import IconRotateLeft from "@/components/icons/IconRotateLeft.vue";
import IconRotateRight from "@/components/icons/IconRotateRight.vue";

const settings = useSettingsStore();
</script>

<template>
    <div class="image-settings">
        <p>Flip and Rotate</p>
        <div class="image-settings__transform">
            <Button @click="settings.rotateImageLeft">
                <IconRotateLeft />
            </Button>
            <Button @click="settings.rotateImageRight">
                <IconRotateRight />
            </Button>
            <CheckButton :checked="settings.imgFlipX" @click="settings.toggleImageFlipX">
                <IconFlipX />
            </CheckButton>
            <CheckButton :checked="settings.imgFlipY" @click="settings.toggleImageFlipY">
                <IconFlipY />
            </CheckButton>
        </div>
        <p>Size</p>
        <div>
            <NumberInput :value="settings.imgSize" unit="mm" @change="settings.setImageSize" />
        </div>
        <p>Position</p>
        <div>
            <RadioButton @click="settings.setImagePositionTop" name="position" :checked="settings.isImgPositionTop">
                T
            </RadioButton>
            <RadioButton @click="settings.setImagePositionBottom" name="position"
                :checked="settings.isImgPositionBottom">
                B
            </RadioButton>
            <RadioButton @click="settings.setImagePositionLeft" name="position" :checked="settings.isImgPositionLeft">
                L
            </RadioButton>
            <RadioButton @click="settings.setImagePositionRight" name="position" :checked="settings.isImgPositionRight">
                R
            </RadioButton>
        </div>
        <p>Margin</p>
        <div>
            <NumberInput :value="settings.imgMargin" unit="mm" @change="settings.setImageMargin" />
        </div>
        <p>Rotation</p>
        <div>
            <NumberInput :value="settings.imgRotation" unit="&deg;" @change="settings.setImageRotation" />
        </div>
    </div>
</template>

<style scoped>
.image-settings {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

p {
    padding-top: 5px;
}

.image-settings>p:not(:first-child) {
    border-top: 1px solid var(--color-border);
}

.image-settings>* {
    display: flex;
    gap: 3px;
    justify-content: center;
    align-items: center;
}
</style>