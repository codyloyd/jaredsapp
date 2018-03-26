<template>
  <div>
    <app-layout :headerTitle="itemName" :leftHeaderButton="leftHeaderButton">
      {{categoryName}} - {{itemName}}
    </app-layout>
  </div>
</template>
  
<script>
import appLayout from "./appLayout.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  components: { appLayout },
  props: ["categoryName", "itemName"],
  created() {
    this.getItem({ item: this.itemName });
  },
  data() {
    return {
      leftHeaderButton: {
        fn: () => {
          this.setRouteTransition({ transition: "slide-right" });
          this.$router.push("/" + this.categoryName);
        },
        icon: "appChevronLeftIcon"
      }
    };
  },
  methods: {
    ...mapMutations(["setRouteTransition"]),
    ...mapActions(["getItem"])
  }
};
</script>
