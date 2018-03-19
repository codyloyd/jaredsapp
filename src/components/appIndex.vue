<template>
  <div>
    <app-layout headerTitle="app name">
      <template v-for="category in categories">
        <li>{{category}}</li>
      </template>
    </app-layout>
  </div>
</template>

<script>
import appLayout from "./appLayout.vue";

export default {
  components: { appLayout },
  data() {
    return {
      categories: ["food", "chores", "fun"]
    };
  }
};
</script>
