<template>
  <div>
    <app-layout :headerTitle="categoryName" :leftHeaderButton="leftHeaderButton">
      <template v-for="item in category(categoryName).items">
        <app-list-item :item="item">
          <button class="button-reset" @click="getItem({item: item})">{{item}}</button>
        </app-list-item>
      </template>
    </app-layout>
  </div>
</template>

<style>
</style>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import appLayout from "./appLayout.vue";
import appListItem from "./shared/appListItem.vue";

export default {
  components: { appListItem, appLayout },
  props: ["categoryName"],
  data() {
    return {
      tacos: "tacos",
      leftHeaderButton: {
        fn: () => {
          this.setRouteTransition({ transition: "slide-right" });
          this.$router.push("/");
        },
        icon: "appChevronLeftIcon"
      }
    };
  },
  computed: { ...mapGetters(["category"]) },
  methods: {
    ...mapMutations(["setRouteTransition"]),
    ...mapActions(["getItem"])
  }
};
</script>
