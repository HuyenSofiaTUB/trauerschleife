<script setup>
import { useSettingsStore } from "@/stores/settings";
import { useViewStore } from "@/stores/view";
import { ref } from "vue";
import { hexToRgb, Color, Solver } from "@/helpers/filter";

const settings = useSettingsStore();
const view = useViewStore();
const textRef = ref(null);

function getZoomedValue(value) {
  return (value * view.zoom) / 100 + "mm";
}

function isCollumn() {
  return settings.isImgPositionTop || settings.isImgPositionBottom;
}

function getContentAlign() {
  if (isCollumn()) {
    if (settings.isJustifyStart) return "flex-start";
    else if (settings.isJustifyEnd) return "flex-end";
    else return settings.justify;
  }
  if (settings.isJustifyStart) return "flex-end";
  else if (settings.isJustifyEnd) return "flex-start";
  else return settings.justify;
}

function getImgMargin() {
  if (settings.isImgPositionTop)
    return "0 0 " + getZoomedValue(settings.imgMargin) + " 0";
  else if (settings.isImgPositionBottom)
    return getZoomedValue(settings.imgMargin) + " 0 0 0";
  else if (settings.isImgPositionRight)
    return "0 0 0 " + getZoomedValue(settings.imgMargin);
  else if (settings.isImgPositionLeft)
    return "0 " + getZoomedValue(settings.imgMargin) + " 0 0";
  else return "0";
}

function getScale() {
  if (settings.imgFlipX && settings.isImgFlipY) return "scale(-1, -1)";
  else if (settings.imgFlipX) return "scale(-1, 1)";
  else if (settings.imgFlipY) return "scale(1, -1)";
  else return "scale(1, 1)";
}

function getRotation() {
  return "rotate(" + settings.imgRotation + "deg)";
}

function getImageFilter() {
  const rgb = hexToRgb(settings.color);
  const color = new Color(rgb[0], rgb[1], rgb[2]);
  const solver = new Solver(color);
  const result = solver.solve();
  return result.filter;
}
</script>

<template>
  <div id="preview" @click="textRef.focus">
    <div class="border">
      <div id="content-preview">
        <span
          ref="textRef"
          contenteditable
          id="text-preview"
          @input="settings.setText($event.target.innerHTML)"
          v-html="view.text"
        ></span>
        <img
          :src="settings.img"
          alt="Preview image"
          id="image-preview"
          :style="getImageFilter()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#preview {
  width: v-bind("getZoomedValue(settings.pageWidth)");
  z-index: 5;
  background-color: v-bind("settings.bgColor");
  box-shadow: var(--color-shadow) 0px 1px 3px 0px,
    var(--color-shadow-soft) 0px 1px 2px 0px;
  border: 2px solid transparent;
  overflow: clip;
}

.border {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 7;
  margin-top: v-bind("getZoomedValue(settings.pageMarginTop)");
  margin-left: v-bind("getZoomedValue(settings.pageMarginLeft)");
  margin-right: v-bind("getZoomedValue(settings.pageMarginRight)");
  margin-bottom: v-bind("getZoomedValue(settings.pageMarginBottom)");
  border: 1.5px dashed var(--color-border);
  cursor: text;
}

#content-preview {
  display: flex;
  min-width: 100%;
  width: fit-content;
  flex-direction: v-bind(
    'settings.isImgPositionTop || settings.isImgPositionBottom ? "column" : "row"'
  );
  align-items: v-bind("getContentAlign()");
  justify-content: center;
}

#text-preview {
  display: inline-block;
  width: fit-content;
  min-width: 1rem;
  min-height: 3rem;
  white-space: nowrap;
  font-weight: v-bind("settings.bold ? 'bold' : 'normal'");
  text-decoration: v-bind("settings.underline ? 'underline' : 'none'");
  color: v-bind("settings.color");
  font-size: v-bind("getZoomedValue(settings.fontSize)");
  font-style: v-bind("settings.italic ? 'italic' : 'normal'");
  font-family: v-bind("settings.font");
  text-align: v-bind("settings.align");
  line-height: v-bind("settings.lineHeight");
  writing-mode: v-bind("settings.rotated ? 'vertical-rl' : 'horizontal-tb'");
}

#image-preview {
  display: v-bind('settings.img ? "block" : "none"');
  width: v-bind("getZoomedValue(settings.imgSize)");
  height: auto;
  margin: v-bind("getImgMargin()");
  order: v-bind(
    "(settings.isImgPositionTop || settings.isImgPositionLeft) ? -1 : 2"
  );
  transform: v-bind("getScale()") v-bind("getRotation()");
}

#preview:hover {
  border-color: var(--color-border);
}

#preview:focus-within {
  border-color: var(--color-primary);
}
</style>

<style>
@media print {
  *,
  *::before,
  *::after {
    background-color: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    filter: none !important;
    border: none !important;
  }

  html,
  body {
    visibility: hidden;
  }

  #preview {
    visibility: visible;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
