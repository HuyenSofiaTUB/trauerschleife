<script setup></script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 5px 5px;
  cursor: pointer;
  gap: 2px;
}

div:hover {
  background-color: var(--color-background-mute);
}

div:focus-within,
div:active {
  background-color: var(--color-background);
}

div:focus-within {
  border-color: var(--color-primary);
}
</style>
