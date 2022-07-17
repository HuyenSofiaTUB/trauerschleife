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
      var size = this.size / 0.35;
      var height = text.split("\n").length * size;
      console.log(height);
      var doc = new jsPDF('l', 'mm', [this.width, height]);
      let style = this.bold ? 'bold' : '';
      style = style += this.italic ? 'italic' : '';
      if (style == '') {
        style = 'normal';
      }
      console.log(style);
      doc.setFont(this.font, style);
      doc.setFontSize(size);
      var xOffset = (this.width / 2);
      var yOffset = (height / 2);
      doc.text(text, xOffset, yOffset, null, null, 'center');
      doc.save("meow.pdf");
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <textarea v-model="text" placeholder="Type here"></textarea>
    </div>
    <div class="row">
      <div class="col-sm">

        <label for="fonts"> Font: </label>
      </div>
      <div class="col-sm">
        <select id="fonts" name="fonts" v-model="font">
          <option value="arial">Arial</option>
          <option value="verdana">Verdana</option>
          <option value="times">Times New Roman</option>
          <option value="georgia">Georgia</option>
        </select>
      </div>
      <div class="col-sm">
        <label for="fonts"> Size: </label>
      </div>
      <div class="col-sm">
        <input v-model="size" type="number" style="width: 5em">
      </div>
      <div class="col-1">
        <input type="checkbox" id="bold" v-model="bold">
        <label for="bold"> b</label><br>
      </div>
      <div class="col-1">
        <input type="checkbox" id="italic" v-model="italic">
        <label for="italic"> i</label><br>
      </div>
      <div class="col-1">
        <input type="checkbox" id="underlined" v-model="underlined">
        <label for="underlined"> u</label><br>
      </div>
      <div class="col-sm">

        <button type="button" @click="download">download</button>
      </div>
    </div>

    <div class="row">

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
