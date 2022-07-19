<script>
export default {
    emits: ['madechanges'],
    data() {
        return {
            settings: {
                pic: this.pic,
                width: this.width,
                rotated: this.rotated,
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
            this.settings.rotated = this.rotated;
            this.settings.imgSize = this.imgSize;
            this.settings.margin = this.margin;
            this.settings.pos = this.pos;
        }
    },
    props: {
        pic: String,
        width: Number,
        rotated: Boolean,
        imgSize: Number,
        margin: Number,
        pos: String
    },
}
</script>

<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" @click="reset" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit
    </button>

    <!-- Modal -->
    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Ribbon</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row align-items-center">

                            <div class="col-sm-auto">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text" for="width">width</div>
                                    </div>
                                    <input type="number" class="form-control" id="width" placeholder="100"
                                        v-model="settings.width" style="width: 6em">
                                </div>
                            </div>

                            <div class="col-sm-auto">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="rotate"
                                        v-model="settings.rotated">
                                    <label class="form-check-label" for="rotate">vertical text</label>
                                </div>
                            </div>

                        </div>
                    </form>
                    <hr>
                    <form>
                        <div class="row align-items-center">

                            <div class="col-sm-9">
                                <div class="row mt-2">
                                    <div class="input-group">

                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="motifs"> motif </label>
                                        </div>

                                        <select class="form-select" id="motifs" v-model="settings.pic">
                                            <option value="none">none</option>
                                            <option value="rose1">rose1</option>
                                            <option value="angel1">angel1</option>
                                            <option value="pray1">pray1</option>
                                            <option value="dove1">dove1</option>
                                        </select>

                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-sm-auto">

                                        <div class="input-group">

                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="size"> size </label>
                                            </div>

                                            <input class="form-control" v-model="settings.imgSize" id="size"
                                                type="number" style="width: 6em">

                                        </div>
                                    </div>
                                    <div class="col-sm-auto">

                                        <div class="input-group">

                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="margin"> margin </label>
                                            </div>

                                            <input class="form-control" v-model="settings.margin" id="margin"
                                                type="number" style="width: 6em">

                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-sm-auto">

                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="position" id="above"
                                                v-model="settings.pos" value="above">
                                            <label class="form-check-label" for="above">above</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="position" id="below"
                                                v-model="settings.pos" value="below">
                                            <label class="form-check-label" for="below">below</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-auto">
                                <img :src="(settings.pic != 'none') ? require('../assets/motifs/' + settings.pic + '.png') : ''" class="rounded float-left"
                                    style="width: 7em; height: auto">
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
</style>
