<template>
  <div id="root" :class="{slid: slid}">
    <slot></slot>
  </div>
</template>

<style scoped>
#root {
  position: relative;
  padding: 1rem 1rem;
  border-bottom: solid 1px var(--app-border-color);
  background: white;
  transition: transform .3s cubic-bezier(.71,.13,.36,1);
  box-shadow: 11px 0px 10px -10px rgba(0, 0, 0, 0.3);
}
.slid {
  transform: translateX(-6rem);
}
</style>

<script>
  export default {
    props: ["slid"]
  }
</script>
