<script>
import jsPDF from 'jspdf'
import '@/assets/Noto/Noto-bold.js'
import '@/assets/Noto/Noto-italic.js'
import '@/assets/Noto/Noto-normal.js'
import '@/assets/Noto/Noto-bolditalic.js'
import '@/assets/Playfair/Playfair-bold.js'
import '@/assets/Playfair/Playfair-italic.js'
import '@/assets/Playfair/Playfair-normal.js'
import '@/assets/Playfair/Playfair-bolditalic.js'
import EditModal from './EditModal.vue'

export default {
  data() {
    return {
      text: '',
      font: 'times',
      size: 12,
      bold: false,
      italic: false,
      underlined: false,
      settings: {
        pic: 'pray1.png',
        width: 100,
        rotated: false,
        imgSize: 20,
        margin: 10,
        pos: "above"
      },
    }
  },
  methods: {
    saveChanges(settings) {
      console.log("got new data");
      this.settings.pic = settings.pic;
      this.settings.width = settings.width;
      this.settings.rotated = settings.rotated;
      this.settings.imgSize = settings.imgSize;
      this.settings.margin = settings.margin;
      this.settings.pos = settings.pos;
      console.log(this.settings.pos);
    },
    download() {
      var text = this.text;
      var width = this.settings.width;
      var height, angle, xOffset, yOffset;

      if (this.settings.rotated) {
        height = text.length * this.size;
        angle = -90;
        xOffset = width - this.size * 1.3;
        yOffset = height / 4;
      } else {
        height = text.split("\n").length * this.size * 1.3;
        angle = 0;
        yOffset = this.size;
        xOffset = width / 2;
      }

      var mode = 'p';
      if (width > height) {
        mode = 'l';
      }
      console.log(height);
      console.log(mode);

      var doc = new jsPDF(mode, 'mm', [width, height]);
      console.log(doc.getFontList());
      let style = this.bold ? 'bold' : '';
      style = style += this.italic ? 'italic' : '';
      if (style == '') {
        style = 'normal';
      }

      console.log(style);
      doc.setFont(this.font, style);
      doc.setFontSize(this.size / 0.35);
      doc.text(text, xOffset, yOffset, null, angle, 'center');
      doc.save("schleife.pdf");
    }
  },
  components: {
    'edit-modal': EditModal
  }
}
</script>

<template>
  <div class="container">

    <div class="row justify-content-center mt-3">
      <textarea class="form-control" v-model="text" placeholder="Type here" style="width: 20em; height: 5em"></textarea>
    </div>
    <div class="row justify-content-center mt-3">

      <div class="col-sm-auto">
        <div class="input-group">

          <div class="input-group-prepend">
            <label class="input-group-text" for="fonts"> font: </label>
          </div>

          <select class="form-select" id="fonts" v-model="font">
            <option value="courier">Courier</option>
            <option value="times">Times</option>
            <option value="helvetica">Helvetica</option>
            <option value="Noto">Noto</option>
            <option value="Playfair">Playfair</option>
          </select>

        </div>
      </div>

      <div class="col-sm-auto">
        <div class="input-group">

          <div class="input-group-prepend">
            <label class="input-group-text" for="size"> Size: </label>
          </div>

          <input class="form-control" v-model="size" id="size" type="number" style="width: 5em">

        </div>
      </div>

      <div class="col-sm-auto">

        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="bold" v-model="bold">
          <label class="form-check-label" for="bold"> b</label>
        </div>

        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="italic" v-model="italic">
          <label class="form-check-label" for="italic"> i</label><br>
        </div>

        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="underlined" v-model="underlined">
          <label class="form-check-label" for="underlined"> u</label><br>
        </div>

      </div>

    </div>
    <div class="row justify-content-center mt-3">
      <div class="page" :style="{
        'width': settings.width + 'mm',
      }">
        <p class="print" :style="{
          'font-weight': (bold ? 'bold' : 'normal'),
          'text-decoration': (underlined ? 'underline' : 'none'),
          'font-style': (italic ? 'italic' : 'normal'),
          'font-family': font,
          'font-size': size + 'mm',
          'writing-mode': settings.rotated ? 'vertical-rl' : 'horizontal-tb'
        }">
          {{ text }}
        </p>
      </div>
    </div>

    <div class="row justify-content-center mt-3">

      <div class="col-sm-auto">
        <edit-modal :pic="settings.pic" :width="settings.width" :rotated="settings.rotated" :imgSize="settings.imgSize" :margin="settings.margin" :pos="settings.pos"
          @madechanges="saveChanges"></edit-modal>
      </div>

      <div class="col-sm-auto">
        <button type="button" class="btn btn-primary btn-lg" @click="download">
          Print
        </button>
      </div>

    </div>

  </div>
</template>

<style>
div.page {
  background: white;
  display: block;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 0em;
}

p.print {
  white-space: pre-line;
  line-height: 100%;
  color: black;
}
</style>
