import { defineStore } from "pinia";

export const useViewStore = defineStore("view", {
  state: () => ({
    text: "",
    zoom: 100,
  }),
  actions: {
    setText(text) {
      this.text = text;
    },
    setZoom(zoom) {
      if (isNaN(zoom) || isNaN(parseFloat(zoom))) {
        this.zoom = 100;
      } else if (zoom < 50) this.zoom = 50;
      else if (zoom > 500) this.zoom = 500;
      else this.zoom = zoom;
    },
  },
});
