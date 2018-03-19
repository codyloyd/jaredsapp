<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapGetters(["lowerCaseTitle"])
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
