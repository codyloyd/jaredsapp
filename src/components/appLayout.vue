<template>
<div id="root">
  <appHeader>
    <template v-if="leftHeaderButton">
      <div class="icon" slot=left-icon>
        <button class="button-reset" @click="leftHeaderButton.fn">
          <component :is="leftHeaderButton.icon" fill="white"></component>
        </button>
      </div>
    </template>
    
    <h1 slot=title>{{headerTitle}}</h1>
    
    <template v-if="rightHeaderButton">
      <div class="icon" slot=right-icon>
        <button @click="rightHeaderButton.fn" class="button-reset">
          <component :is="rightHeaderButton.icon" fill="white"></component>
        </button>
      </div>
    </template>
  </appHeader>
  <div class="content">
  <slot></slot>
  </div>
</div>
</template>

<style scoped>
div .icon {
  display: flex;
}
.content {
  margin-top: 3rem;
}
</style>

<script>
import appHeader from "./appHeader.vue";
import appAddIcon from "./icons/appAddIcon.vue";
import appChevronLeftIcon from "./icons/appChevronLeftIcon.vue";

export default {
  components: { appHeader, appAddIcon, appChevronLeftIcon },
  props: ["headerTitle", "leftHeaderButton", "rightHeaderButton"],
  methods: {}
};
</script>
