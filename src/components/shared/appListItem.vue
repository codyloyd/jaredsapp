<template>
  <div id="root" :class="{slid: slid}">
    <slot></slot>
  </div>
</template>

<style scoped>
#root {
  padding: 1rem 1rem;
  border-bottom: solid 1px var(--app-border-color);
  background: white;
  transition: transform .3s cubic-bezier(.71,.13,.36,1);
}
.slid {
  transform: translateX(-8rem);
}
</style>

<script>
  export default {
    props: ["slid"]
  }
</script>
