<template>
<div>
  <app-layout headerTitle="app name" :rightHeaderButton="rightHeaderButton">
    <template v-for="category in categories">
      <app-list-item>
        <router-link :to="category.name" tag="button" class="button-reset">
          {{category.name}} <app-chevron-right-icon fill="var(--app-border-color)"></app-chevron-right-icon>
        </router-link>
      </app-list-item>
    </template>
  </app-layout>
</div>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  max-width: 95%;
}
</style>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import appLayout from "./appLayout.vue";
import appNewCategoryForm from "./appNewCategoryForm.vue";
import appListItem from "./shared/appListItem.vue";
import appChevronRightIcon from "./icons/appChevronRightIcon.vue";

export default {
  created() {
    this.setRouteTransition({ transition: "slide-left" });
    console.log(this.categories);
  },
  components: {
    appLayout,
    appListItem,
    appChevronRightIcon,
    appNewCategoryForm
  },
  computed: { ...mapGetters(["categories", "addingCategory"]) },
  data() {
    return {
      rightHeaderButton: {
        fn: () => {
          this.setAddingCategory(true);
        },
        icon: "appAddIcon"
      }
    };
  },
  methods: {
    ...mapMutations(["setRouteTransition", "setAddingCategory"]),
    ...mapActions(["addCategory"])
  }
};
</script>

  (setq js-indent-lev
