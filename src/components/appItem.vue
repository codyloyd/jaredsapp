<template>
<div>
  <app-layout :headerTitle="itemName" :leftHeaderButton="leftHeaderButton">
    <div v-if="itemFetched">
      <template v-for="step in item(itemName).steps">
        <app-list-item :item="step">
          <button class="button-reset" @click="navToStep(step)">
            <div>
              {{step.title}}
            </div>
            <div>
              {{step.description}}
            </div>
          </button>
        </app-list-item>
      </template>
    </div>
  </app-layout>
</div>
</template>
  
<script>
import appLayout from "./appLayout.vue";
import appListItem from "./shared/appListItem.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: { appLayout, appListItem },
  props: ["categoryName", "itemName"],
  created() {
    this.getItem({ item: this.itemName }).then(a => {
      this.itemFetched = true;
    });
  },
  computed: { ...mapGetters(["item"]) },
  data() {
    return {
      itemFetched: false,
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
    ...mapActions(["getItem"]),
    navToStep(step) {
      console.log(step);
    }
  }
};
</script>
