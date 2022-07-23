<template>
  <RibbonView/>
</template>

<script>
import RibbonView from './components/RibbonView.vue'

export default {
  name: 'App',
  components: {
    RibbonView
}
}
</script>

<style>
#app {
  background-color: rgb(204, 204, 204);
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

html {
  background-color: rgb(204, 204, 204);
}

input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

@font-face {
  font-family: Noto;
  src: url(./assets/Noto/NotoSerif-Regular.ttf);
}

@font-face {
  font-family: Noto;
  src: url(./assets/Noto/NotoSerif-Bold.ttf);
  font-weight: bold;
}

@font-face {
  font-family: Noto;
  src: url(./assets/Noto/NotoSerif-Italic.ttf);
  font-style: italic;
}

@font-face {
  font-family: Noto;
  src: url(./assets/Noto/NotoSerif-BoldItalic.ttf);
  font-weight: bold;
  font-style: italic;
}
@font-face {
  font-family: Playfair;
  src: url(./assets/Playfair/PlayfairDisplay-Regular.ttf);
}

@font-face {
  font-family: Playfair;
  src: url(./assets/Playfair/PlayfairDisplay-Bold.ttf);
  font-weight: bold;
}

@font-face {
  font-family: Playfair;
  src: url(./assets/Playfair/PlayfairDisplay-Italic.ttf);
  font-style: italic;
}

@font-face {
  font-family: Playfair;
  src: url(./assets/Playfair/PlayfairDisplay-BoldItalic.ttf);
  font-weight: bold;
  font-style: italic;
}
</style>

