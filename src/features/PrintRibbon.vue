<script setup>
import IconPrint from "@/components/icons/IconPrint.vue";
import Button from "@/composables/Button.vue";
import jsPDF from "jspdf";
import { useSettingsStore } from "@/stores/settings";
import { useViewStore } from "@/stores/view";

const settings = useSettingsStore();
const view = useViewStore();

function pxToMm(px) {
  return px * 0.264583333;
}

function pxToMmZoomed(px) {
  return px * 0.264583333 * (100 / view.zoom);
}

function changePrintPageSize(width) {
  let styleSheet = document.getElementById("printStyles");
  let height = pxToMm(document.getElementById("preview").offsetHeight);

  let orientation = height > width ? "landscape" : "portrait";
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.id = "printStyles";
    document.head.appendChild(styleSheet);
  }

  styleSheet.textContent = `@page { size: ${width}mm ${height}mm; margin: 0; page-orientation: ${orientation}; }`;
}

addEventListener("beforeprint", () => {
  view.setZoom(100);
  changePrintPageSize(settings.pageWidth);
});

addEventListener("afterprint", () => {
  view.undo();
});

function printRibbon() {
  if (!navigator.userAgentData.mobile) {
    window.print();
    return;
  }
  let preview = document.getElementById("preview");
  let textPreview = document.getElementById("text-preview");
  let imagePreview = document.getElementById("image-preview");

  let height = pxToMmZoomed(preview.offsetHeight);
  let width = settings.pageWidth;
  let mode =
    (height > width && settings.rotated) ||
    (height < width && !settings.rotated)
      ? "l"
      : "p";
  let doc = new jsPDF({
    orientation: mode,
    unit: "mm",
    format: [width, height],
  });

  if (settings.rotated) {
    var textX = pxToMmZoomed(textPreview.offsetTop - preview.offsetTop);
    var textY = pxToMmZoomed(
      preview.offsetLeft +
        preview.offsetWidth -
        textPreview.offsetLeft -
        textPreview.offsetWidth
    );
    if (settings.align == "center") {
      textX += pxToMmZoomed(textPreview.offsetHeight / 2);
    } else if (settings.align == "right") {
      textX += pxToMmZoomed(textPreview.offsetHeight);
    }
  } else {
    var textX = pxToMmZoomed(textPreview.offsetLeft - preview.offsetLeft);
    var textY = pxToMmZoomed(textPreview.offsetTop - preview.offsetTop);
    if (settings.align == "center") {
      textX += pxToMmZoomed(textPreview.offsetWidth / 2);
    } else if (settings.align == "right") {
      textX += pxToMmZoomed(textPreview.offsetWidth);
    }
  }

  let lines = settings.text.split("<br>");
  let fontStyle =
    (settings.bold ? "bold" : "") + (settings.italic ? "italic" : "");
  fontStyle = fontStyle ? fontStyle : "normal";
  doc.setFont(settings.font, fontStyle);
  doc.setFontSize(settings.fontSize * 2.83);
  doc.text(lines, textX, textY, {
    align: settings.align,
    baseline: "top",
    lineHeightFactor: settings.lineHeight,
  });

  if (settings.img) {
    let image = new Image();
    image.src = settings.img;
    if (settings.rotated) {
      var imageX = pxToMmZoomed(imagePreview.offsetTop - preview.offsetTop);
      var imageY = pxToMmZoomed(
        preview.offsetLeft +
          preview.offsetWidth -
          imagePreview.offsetLeft -
          imagePreview.offsetWidth
      );
    } else {
      var imageX = pxToMmZoomed(imagePreview.offsetLeft - preview.offsetLeft);
      var imageY = pxToMmZoomed(imagePreview.offsetTop - preview.offsetTop);
    }

    doc.addImage(
      image,
      "PNG",
      imageX,
      imageY,
      settings.imgSize,
      pxToMmZoomed(imagePreview.offsetHeight),
      "image",
      "NONE",
      0
    );
  }
  window.open(doc.output("bloburl", { filename: settings.title + ".pdf" }));
}
</script>

<template>
  <Button @click="printRibbon">
    <IconPrint />
  </Button>
</template>
