<script>
export default {
    methods: {
    }
}
</script>

<template>
    <!-- Button trigger modal -->
    <a aria-current="page" href="" data-bs-toggle="modal" data-bs-target="#helpModal">
        <div class="circle">
            <p class="text">?</p>
        </div>
    </a>

    <!-- Modal -->
    <div class="modal" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="helpModalLabel">Help</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>
                        Click inside the ribbon to edit.
                        Change font, styles and size in top bar.
                        Click rotate to rotate text by 90°.
                        Choose preset text.
                        Click "Edit" for Advanced settings.
                        In advanced settings change ribbon width or add a motif.
                        Change motif's size and position as well as margin to text.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.circle {
    color: black;
    background-color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    height: 2em;
    width: 2em;
    margin-left: 1rem;
    position: absolute;
    box-shadow: 0 0 0.3cm rgba(0, 0, 0, 0.3);
}

.text {
    margin: auto;
    font-weight: bold;
    font-size: 1em;
}

.modal-backdrop {
    z-index: 1000 !important;
}
</style>
