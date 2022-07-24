<script>
export default {
    emits: ['madechanges'],
    data() {
        return {
            settings: {
                pic: this.pic,
                width: this.width,
                imgSize: this.imgSize,
                margin: this.margin,
                pos: this.pos
            },
        }
    },
    methods: {
        reset() {
            this.settings.pic = this.pic;
            this.settings.width = this.width;
            this.settings.imgSize = this.imgSize;
            this.settings.margin = this.margin;
            this.settings.pos = this.pos;
        },
        decrease(e, val) {
            e.preventDefault();
            switch (val) {
                case 'width':
                    this.settings.width--;
                    break;
                case 'imgSize':
                    this.settings.imgSize--;
                    break;
                case 'margin':
                    this.settings.margin--;
                    break;
                default:
                    break;
            }
        },
        increase(e, val) {
            e.preventDefault();
            switch (val) {
                case 'width':
                    this.settings.width++;
                    break;
                case 'imgSize':
                    this.settings.imgSize++;
                    break;
                case 'margin':
                    this.settings.margin++;
                    break;
                default:
                    break;
            }
        }
    },
    props: {
        pic: String,
        width: Number,
        imgSize: Number,
        margin: Number,
        pos: String
    },
}
</script>

<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-secondary btn-lg ml-1" @click="reset" data-bs-toggle="modal"
        data-bs-target="#editModal">
        Edit
    </button>

    <!-- Modal -->
    <div class="modal" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit Ribbon</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row align-items-center">
                            <div class="col-sm-auto">
                                <label for="width" class="form-label">width</label>
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="decrease($event, 'width')">-</button>
                                    <input type="number" class="form-control" id="width" placeholder="100"
                                        v-model="settings.width" style="width: 6em">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="increase($event, 'width')">+</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr>
                    <form>
                        <div class="row align-items-center">

                            <div class="col-sm-9">
                                <div class="row mt-2">
                                    <label for="motifs" class="form-label">motif</label>
                                    <div class="input-group">
                                        <select class="form-select" id="motifs" v-model="settings.pic">
                                            <option value="none">none</option>
                                            <option value="angel1">angel1</option>
                                            <option value="pray1">pray1</option>
                                            <option value="dove1">dove1</option>
                                            <option value="cross1">cross1</option>
                                            <option value="rose1">rose1</option>
                                        </select>

                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-sm-auto">
                                        <label for="imgSize" class="form-label">size</label>

                                        <div class="input-group">
                                            <button class="btn btn-outline-secondary" type="button"
                                                @click="decrease($event, 'imgSize')">-</button>
                                            <input class="form-control" v-model="settings.imgSize" id="imgSize"
                                                type="number" style="width: 4em">
                                            <button class="btn btn-outline-secondary" type="button"
                                                @click="increase($event, 'imgSize')">+</button>
                                        </div>
                                    </div>
                                    <div class="col-sm-auto">
                                        <label for="margin" class="form-label">margin</label>

                                        <div class="input-group">
                                            <button class="btn btn-outline-secondary" type="button"
                                                @click="decrease($event, 'margin')">-</button>
                                            <input class="form-control" v-model="settings.margin" id="margin"
                                                type="number" style="width: 4em">
                                            <button class="btn btn-outline-secondary" type="button"
                                                @click="increase($event, 'margin')">+</button>
                                        </div>

                                    </div>
                                    <div class="col-sm-auto">
                                        <label for="position" class="form-label"
                                            style="display: block;">position</label>
                                        <div class="btn-group" role="group" id="position" aria-label="motif position">
                                            <input type="radio" class="btn-check" name="position" id="above"
                                                autocomplete="off" v-model="settings.pos" value="above">
                                            <label class="btn btn-outline-primary" for="above">above</label>

                                            <input type="radio" class="btn-check" name="position" id="below"
                                                autocomplete="off" v-model="settings.pos" value="below">
                                            <label class="btn btn-outline-primary" for="below">below</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <img :src="(settings.pic != 'none') ? require('../assets/motifs/' + settings.pic + '.png') : ''"
                                    class="rounded mx-auto d-block" style="width: auto; height: 7em;">
                            </div>

                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="$emit('madechanges', this.settings)">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.modal-backdrop {
    z-index: 1000 !important;
}
</style>
