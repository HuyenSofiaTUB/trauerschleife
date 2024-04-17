import { defineStore } from "pinia";

export const useViewStore = defineStore("view", {
  state: () => ({
    text: "",
    zoom: 100,
    title: "Untitled",
  }),
  actions: {
    setText(text) {
      this.text = text;
    },
    setZoom(zoom) {
      if (typeof zoom === "string") zoom = zoom.replace("%", "");
      if (isNaN(zoom) || isNaN(parseFloat(zoom))) {
        return;
      } else if (zoom < 50) this.zoom = 50;
      else if (zoom > 1000) this.zoom = 1000;
      else this.zoom = zoom;
    },
    setTitle(title) {
      this.title = title;
    },
  },
});
