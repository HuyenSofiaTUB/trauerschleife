import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    bold: false,
    italic: false,
    underline: false,
    bgColor:
      window.matchMedia &&
      screen &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "#f7f7f7"
        : "#181818",
    color:
      window.matchMedia &&
      screen &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "#2c3e50"
        : "#dadada",
    fontSize: 18,
    font: "Times",
    align: "center",
    justify: "center",
    lineHeight: 1.15,
    rotated: false,
    images: [],
    img: null,
    imgSize: 30,
    imgPosition: "top",
    imgRotation: 0,
    imgFlipX: false,
    imgFlipY: false,
    imgMargin: 15,
    pageWidth: 100,
    pageMarginTop: 5,
    pageMarginBottom: 5,
    pageMarginLeft: 10,
    pageMarginRight: 10,
    title: "Untitled",
    text: "",
  }),
  getters: {
    isAlignCenter(state) {
      return state.align == "center";
    },
    isAlignLeft(state) {
      return state.align == "left";
    },
    isAlignRight(state) {
      return state.align == "right";
    },
    isJustifyCenter(state) {
      return state.justify == "center";
    },
    isJustifyStart(state) {
      return state.justify == "start";
    },
    isJustifyEnd(state) {
      return state.justify == "end";
    },
    isImgPositionTop(state) {
      return state.imgPosition == "top";
    },
    isImgPositionBottom(state) {
      return state.imgPosition == "bottom";
    },
    isImgPositionLeft(state) {
      return state.imgPosition == "left";
    },
    isImgPositionRight(state) {
      return state.imgPosition == "right";
    },
  },
  actions: {
    toggleBold() {
      this.bold = !this.bold;
    },
    toggleItalic() {
      this.italic = !this.italic;
    },
    toggleUnderline() {
      this.underline = !this.underline;
    },
    setBgColor(color) {
      this.bgColor = color;
    },
    setColor(color) {
      this.color = color;
    },
    setFontSize(size) {
      this.fontSize = Math.max(1, size);
    },
    setFont(font) {
      this.font = font;
    },
    alignCenter() {
      this.align = "center";
    },
    alignLeft() {
      this.align = "left";
    },
    alignRight() {
      this.align = "right";
    },
    setLineHeight(lineHeight) {
      this.lineHeight = lineHeight;
    },
    justifyCenter() {
      this.justify = "center";
    },
    justifyStart() {
      this.justify = "start";
    },
    justifyEnd() {
      this.justify = "end";
    },
    toggleRotated() {
      this.rotated = !this.rotated;
    },
    addImage(img) {
      this.images.push(img);
    },
    setImage(img) {
      this.img = img;
    },
    setImageSize(size) {
      this.imgSize = Math.max(1, size);
    },
    setImagePositionTop() {
      this.imgPosition = "top";
    },
    setImagePositionBottom() {
      this.imgPosition = "bottom";
    },
    setImagePositionLeft() {
      this.imgPosition = "left";
    },
    setImagePositionRight() {
      this.imgPosition = "right";
    },
    setImageRotation(rotation) {
      if (rotation >= 360) {
        rotation -= 360;
      } else if (rotation < 0) {
        rotation += 360;
      }
      this.imgRotation = rotation;
    },
    rotateImageLeft() {
      this.setImageRotation(this.imgRotation - 90);
    },
    rotateImageRight() {
      this.setImageRotation(this.imgRotation + 90);
    },
    toggleImageFlipX() {
      this.imgFlipX = !this.imgFlipX;
    },
    toggleImageFlipY() {
      this.imgFlipY = !this.imgFlipY;
    },
    setImageMargin(margin) {
      this.imgMargin = margin;
    },
    setPageWidth(width) {
      this.pageWidth = Math.max(1, width);
    },
    setPageMarginTop(margin) {
      this.pageMarginTop = margin;
    },
    setPageMarginBottom(margin) {
      this.pageMarginBottom = margin;
    },
    setPageMarginLeft(margin) {
      this.pageMarginLeft = margin;
    },
    setPageMarginRight(margin) {
      this.pageMarginRight = margin;
    },
    setTitle(title) {
      this.title = title;
    },
    setText(text) {
      this.text = text;
    },
    setSettings(settings) {
      for (const [key, value] of Object.entries(settings)) {
        this[key] = value;
      }
    },
  },
});
