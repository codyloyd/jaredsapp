<template>
  <svg :fill="fill" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z"/></svg>
</template>

<style scoped>
svg {
  transform: rotate(180deg);
}
</style>

<script>
export default {
  props: {
    fill: {
      type: String,
      default: "#000000"
    },
    width: {
      type: String,
      default: "24"
    },
    height: {
      type: String,
      default: "24"
    }
  }
};
</script>
