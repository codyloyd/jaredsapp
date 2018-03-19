<template>
  <div>
    <appHeader>
      <div class="icon" slot=left-icon><app-chevron-left-icon fill="white"></app-chevron-left-icon></div>
      <h1 slot=title>{{headerTitle}}</h1>
      <div class="icon" slot=right-icon><app-add-icon fill="white"></app-add-icon></div>
    </appHeader>
    <slot></slot>
  </div>
</template>

<style>
div .icon {
  display: flex;
}
</style>

<script>
import appHeader from "./appHeader.vue";
import appAddIcon from "./icons/appAddIcon.vue";
import appChevronLeftIcon from "./icons/appChevronLeftIcon.vue";

export default {
  components: { appHeader, appAddIcon, appChevronLeftIcon },
  props: ["headerTitle"]
};
</script>
