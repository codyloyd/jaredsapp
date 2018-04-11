<template>
<div>
  <app-layout :headerTitle="step(stepId).title" :leftHeaderButton="leftHeaderButton">
    <img alt="" :src="step(stepId).image"/>
    <div class="buttons">
      <button class="button" :disabled="!prev" @click="navToPrev"><app-chevron-left-icon fill="white" width="1rem" height="1rem"></app-chevron-left-icon><span>Prev</span></button>
      <button class="button" :disabled="!next" @click="navToNext"><span>Next</span><app-chevron-right-icon fill="white" width="1rem" height="1rem"></app-chevron-right-icon></button>
    </div>
    <div class="description">
      {{step(stepId).description}}
    </div>
  </app-layout>
</div>
</template>

<style scoped>
  .buttons {
    display: flex;
    justify-content: center;
  }
  .button {
    display: flex;
    align-items: center;
    margin: .5rem;
  }
  
  img {
    box-sizing: border-box;
    padding: 1rem 1rem;
    width: 100%;
  }
  .description {
    font-size: 14px;
    padding: 0 1rem;
    color: var(--app-text-secondary-color);
  }
</style>

<script>
import {mapGetters, mapMutations} from "vuex";
import appLayout from "./appLayout.vue";
import appChevronLeftIcon from "./icons/appChevronLeftIcon.vue"
import appChevronRightIcon from "./icons/appChevronRightIcon.vue"

export default {
  components: {appLayout, appChevronLeftIcon, appChevronRightIcon},
  created() {
    console.log(this.step(this.stepId))
  },
  props: ["categoryName", "itemName", "stepId"],
  computed: {
    ...mapGetters(["step", "item"]),
    prev(){
      const steps = this.item(this.itemName).steps
      const index = steps.indexOf(parseInt(this.stepId))
      if (index > 0) {
        return steps[index - 1]
      }
      return false
    },
    next() {
      const steps = this.item(this.itemName).steps
      const index = steps.indexOf(parseInt(this.stepId))
      if (index < steps.length - 1) {
        return steps[index + 1]
      }
      return false
    }
  },
  data() {
    return {
      leftHeaderButton: {
        fn: () => {
          this.setRouteTransition({ transition: "slide-right" });
          this.$router.push("/" + this.categoryName + "/" + this.itemName);
        },
        icon: "appChevronLeftIcon"
      }
    }
  },
  methods: {
    ...mapMutations(["setRouteTransition"]),
    navToPrev() {
      this.setRouteTransition({ transition: "slide-right" });
      this.$router.push("/" + this.categoryName + "/" + this.itemName + "/" + this.prev);
    },
    navToNext() {
      this.setRouteTransition({ transition: "slide-right" });
      this.$router.push("/" + this.categoryName + "/" + this.itemName + "/" + this.next);
    }
  }
}
</script>

