<template>
  <div id="app">
    <transition :name="routeTransition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    this.getCategories();
    this.getItem({ item: "ramen" });
  },
  name: "app",
  computed: {
    ...mapGetters(["routeTransition"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getItem", "getCategories", "addCategory", "addItem"])
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
  transition: transform 0.4s cubic-bezier(0.69, 0.01, 0.3, 0.96);
}

.slide-right-leave {
}

.slide-right-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: transform 0.4s cubic-bezier(0.69, 0.01, 0.3, 0.96);
  transform: translateX(100%);
}

.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-enter-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: transform 0.4s cubic-bezier(0.69, 0.01, 0.3, 0.96);
}

.slide-left-leave {
}

.slide-left-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: transform 0.4s cubic-bezier(0.69, 0.01, 0.3, 0.96);
  transform: translateX(-100%);
}
</style>
