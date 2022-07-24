<script>
export default {
    methods: {
    }
}
</script>

<template>
    <!-- Button trigger modal -->
    <a class="nav-link" aria-current="page" data-bs-toggle="modal"
        data-bs-target="#exampleModal">About</a>
    <!-- Modal -->
    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Ribbon</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
<p>Meow</p>
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
