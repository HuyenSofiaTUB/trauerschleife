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
    name: 'RibbonView',
    data() {
        return {
            text: '',
            font: 'times',
            size: 12,
            bold: false,
            italic: false,
            underlined: false,
            pic: 'none',
            width: 100,
            rotated: false,
            imgSize: 30,
            margin: 10,
            pos: "above"
        }
    },
    methods: {
        saveChanges(settings) {
            console.log("got new data");
            this.pic = settings.pic;
            this.width = settings.width;
            this.rotated = settings.rotated;
            this.imgSize = settings.imgSize;
            this.margin = settings.margin;
            this.pos = settings.pos;

            var elem = document.getElementById('print');
            var child = document.getElementById('motif');
            if (child != null) {
                child.parentNode.removeChild(child);
            }

            if (this.pic != 'none') {
                child = document.createElement("img");
                child.setAttribute("id", "motif");
                child.setAttribute("src", require("@/assets/motifs/" + this.pic + ".png"));
                child.setAttribute("width", this.imgSize + "mm");
                child.setAttribute("height", "auto");

                if (this.pos == "above") {
                    child.setAttribute("style", "margin: 0mm auto " + this.margin + "mm auto; width: " + this.imgSize + "mm; height: auto");
                    elem.before(child);
                } else {
                    child.setAttribute("style", "margin: " + this.margin + "mm auto 0mm auto; width: " + this.imgSize + "mm; height: auto");
                    elem.after(child);
                }

            }
        },
        download() {
            var text = this.text;
            var millimeter = 25.4 / 72;
            var pixel = 96 / 72;
            var width = this.width / millimeter;
            var height = document.getElementById('inner').offsetHeight / pixel;
            console.log({ width, height });
            var size = this.size / millimeter;
            var imgSize = this.imgSize / millimeter;
            var margin = this.margin / millimeter;

            var mode = ((width > height && !this.rotated) || (width < height && this.rotated)) ? 'l' : 'p';
            var doc = new jsPDF(mode, 'pt', [width, height]);

            var style = this.bold ? 'bold' : '';
            style = style += this.italic ? 'italic' : '';
            if (style == '') {
                style = 'normal';
            }
            doc.setFont(this.font, style);
            doc.setFontSize(size);

            var lineHeight = doc.getLineHeight();

            var xOffset, yOffset;
            if (this.rotated) {
                yOffset = lineHeight / 2;
                if (this.pic != 'none') {
                    xOffset = (height - margin - imgSize) / 2;
                    doc.addImage(require('../assets/motifs/' + this.pic + '.png'), "PNG", height - imgSize, yOffset, imgSize, imgSize);
                } else {
                    xOffset = height / 2;
                }
            } else {
                xOffset = width / 2;
                if (this.pic != 'none') {
                    yOffset = (height - margin - imgSize) / 2
                    doc.addImage(require('../assets/motifs/' + this.pic + '.png'), "PNG", xOffset, height - imgSize, imgSize, imgSize);
                } else {
                    yOffset = lineHeight / 2;
                }
            }

            doc.text(text, xOffset, yOffset, null, null, 'center');
            doc.save("schleife.pdf");
        },
        decrease() {
            this.size--;
        },
        increase() {
            this.size++;
        }
    },
    components: {
        'edit-modal': EditModal
    }
}
</script>

<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand">RibbonPrint</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/huyenngn/Schleifendruck">Github</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <div class="row justify-content-center align-items-center">
                        <div class="col p-1">
                            <select class="form-select" id="fonts" v-model="font">
                                <option value="courier">Courier</option>
                                <option value="times">Times</option>
                                <option value="helvetica">Helvetica</option>
                                <option value="Noto">Noto</option>
                                <option value="Playfair">Playfair</option>
                            </select>
                        </div>
                        <div class="col-sm-auto p-1">
                            <div class="input-group">
                                <button class="btn btn-outline-secondary" type="button" @click="decrease"
                                    id="dec">-</button>
                                <input class="form-control" v-model="size" id="size" type="number">
                                <button class="btn btn-outline-secondary" type="button" @click="increase"
                                    id="inc">+</button>
                            </div>
                        </div>
                        <div class="col-sm-auto p-1">
                            <div class="btn-group" role="group" aria-label="styling">
                                <input class="btn-check" type="checkbox" id="bold" v-model="bold">
                                <label class="btn btn-outline-secondary" for="bold">b</label>


                                <input class="btn-check" type="checkbox" id="italic" v-model="italic">
                                <label class="btn btn-outline-secondary" for="italic"> i</label>


                                <input class="btn-check" type="checkbox" id="underlined" v-model="underlined">
                                <label class="btn btn-outline-secondary" for="underlined"> u</label>
                            </div>

                            <input class="btn-check" type="checkbox" id="rotate" v-model="rotated">
                            <label class="btn btn-outline-secondary ms-2" for="rotate">rotate</label>

                        </div>
                        <div class="col-sm-auto p-1">
                            <select class="form-select" id="samples" v-model="text">
                                <option value="In stillem Gedenken">In stillem Gedenken</option>
                                <option value="Ruhe sanft">Ruhe sanft</option>
                                <option value="Als letzten Gruß">Als letzten Gruß</option>
                                <option value="Ruhe in Frieden">Ruhe in Frieden</option>
                                <option value="Unvergessen">Unvergessen</option>
                            </select>
                        </div>
                        <div class="col-sm-auto p-1">
                            <edit-modal :pic="pic" :width="width" :imgSize="imgSize" :margin="margin"
                                :pos="pos" @madechanges="saveChanges"></edit-modal>

                            <button type="button" class="btn btn-primary btn-lg mx-1" @click="download">
                                Print
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </nav>

    <div class="page" :style="{
        'width': width + 'mm',
    }">
        <p class="print" id="print" :style="{
            'font-weight': (bold ? 'bold' : 'normal'),
            'text-decoration': (underlined ? 'underline' : 'none'),
            'font-style': (italic ? 'italic' : 'normal'),
            'font-family': font,
            'font-size': size + 'mm',
            'writing-mode': rotated ? 'vertical-rl' : 'horizontal-tb'
        }">
            {{ text }}
        </p>
        <div class="inner" id="inner">
            <textarea autofocus class="form-control" v-model="text" placeholder="Type here"></textarea>
        </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea:focus {
    opacity: 100%;
    background: white;
}

textarea {
    opacity: 0%;
    width: 100%;
    height: 100%;
    text-align: center;
}

.inner {
    height: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
}

div.page {
    background: white;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
    height: auto;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 80px auto;
    padding: 1rem 0rem;
}

p.print {
    text-align: center;
    white-space: pre-wrap;
    line-height: 100%;
    color: black;
}

#size {
    width: 4em;
}

@media screen and (max-width: 575px) {

    #size {
        width: auto;
    }
}

@media screen and (max-width: 991px) {
    div.page {
        margin-top: 65px;
    }
}


</style>
