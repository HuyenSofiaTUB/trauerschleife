<script>
import jsPDF from 'jspdf'

export default {
  data() {
    return {
      text: '',
      font: 'times',
      size: 12,
      bold: false,
      italic: false,
      underlined: false,
      pic: 0,
      width: 100
    }
  },
  methods: {
    download() {
      var text = this.text;
      var height = text.split("\n").length * (this.size / 0.7);
      var mode = 'p';
      if (this.width > height) {
        mode = 'l';
      }
      console.log(height);
      var doc = new jsPDF(mode, 'mm', [this.width, height]);
      let style = this.bold ? 'bold' : '';
      style = style += this.italic ? 'italic' : '';
      if (style == '') {
        style = 'normal';
      }
      console.log(style);
      doc.setFont(this.font, style);
      doc.setFontSize(this.size / 0.37);
      var xOffset = this.width / 2;
      var yOffset = height / 2 - (this.size / 0.7);
      doc.text(text, xOffset, yOffset, null, null, 'center');
      doc.save("schleife.pdf");
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row mt-2">

      <textarea class="form-control" v-model="text" placeholder="Type here" style="height: 5em"></textarea>
    </div>
    <div class="row justify-content-sm-center mt-2">
      <div class="col-sm-auto">

        <div class="input-group">

          <div class="input-group-prepend">

            <label class="input-group-text" for="fonts"> Font: </label>
          </div>

          <select class="form-select" id="fonts" v-model="font">
            <option value="arial">Arial</option>
            <option value="verdana">Verdana</option>
            <option value="times">Times New Roman</option>
            <option value="georgia">Georgia</option>
          </select>
        </div>
      </div>

      <div class="col-sm-auto">
        <div class="input-group">

          <div class="input-group-prepend">
            <label class="input-group-text" for="size"> Size: </label>
          </div>
          <input class="form-control" v-model="size" id="size" type="number" style="width: 4em">
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

    <div class="row mt-2">

      <div class="page" v-bind:style="{ 'width': width + 'mm' }">
        <br>

        <p class="print" v-bind:style="{
          'font-weight': (bold ? 'bold' : 'normal'),
          'text-decoration': (underlined ? 'underline' : 'none'),
          'font-style': (italic ? 'italic' : 'normal'),
          'font-family': font,
          'font-size': size + 'mm'
        }">
          {{ text }}
        </p>

        <br>
      </div>

    </div>
    <div class="row justify-content-sm-center mt-2">
      <div class="col-sm-auto">

        <button type="button" class="btn btn-primary btn-lg" @click="download">download</button>
      </div>
    </div>
  </div>
</template>

<style>
div.page {
  background: white;
  display: block;
  margin: 0 auto;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
  height: auto;
}

p.print {
  white-space: pre-line;
  line-height: 100%;
  color: black;
  text-align: center
}
</style>
