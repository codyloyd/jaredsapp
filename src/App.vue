<template>
<div id="app">
  <transition :name="routeTransition">
    <router-view></router-view>
  </transition>
  <template v-if="addingCategory">
    <app-new-category-form></app-new-category-form> 
  </template>
  <template v-if="addingItem">
    <app-new-item-form></app-new-item-form> 
  </template>
  <template v-if="addingStep">
    <app-new-step-form></app-new-step-form>
  </template>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appNewCategoryForm from "./components/appNewCategoryForm.vue";
import appNewItemForm from "./components/appNewItemForm.vue";
import appNewStepForm from "./components/appNewStepForm.vue"

export default {
  created() {
    this.getCategories();
  },
  components: { appNewCategoryForm, appNewItemForm, appNewStepForm },
  name: "app",
  computed: {
    ...mapGetters(["routeTransition", "addingCategory", "addingItem", "addingStep"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getCategories"])
  }
};
</script>

<style>
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-enter-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: transform 0.2s cubic-bezier(0.69, 0.01, 0.3, 0.96);
}

.slide-right-leave {
}

.slide-right-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: transform 0.2s cubic-bezier(0.69, 0.01, 0.3, 0.96);
  transform: translateX(100%);
}

.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-enter-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: transform 0.2s cubic-bezier(0.69, 0.01, 0.3, 0.96);
}

.slide-left-leave {
}

.slide-left-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: transform 0.2s cubic-bezier(0.69, 0.01, 0.3, 0.96);
  transform: translateX(-100%);
}
</style>
