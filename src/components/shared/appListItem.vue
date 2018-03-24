<template>
  <div>
    <button class="button-reset" @click="getItem(item)"></button>
  </div>
</template>

<style scoped>
div {
  padding: 18px 16px;
  border-bottom: solid 1px var(--app-border-color);
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  props: ["item"],
  methods: {
    ...mapActions(["getItem"])
  }
};
</script>
