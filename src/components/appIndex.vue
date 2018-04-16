<template>
<div>
  <app-layout headerTitle="app name" :rightHeaderButton="rightHeaderButton">
    <template v-for="category in categories">
      <div class="list-item-container">
        <app-action-buttons @edit="editFunction" @delete="deleteFunction(category.name)"></app-action-buttons>
        <app-list-item :slid="category.name == slidItem" v-touch:swipe="swipeHandler(category.name)">
          <router-link :to="category.name" tag="button" class="button-reset">
            {{category.name}} <app-chevron-right-icon fill="var(--app-border-color)"></app-chevron-right-icon>
          </router-link>
        </app-list-item>
      </div>
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
.list-item-container {
  position: relative;
}
</style>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import appLayout from "./appLayout.vue";
import appNewCategoryForm from "./appNewCategoryForm.vue";
import appListItem from "./shared/appListItem.vue";
import appChevronRightIcon from "./icons/appChevronRightIcon.vue";
import appActionButtons from "./shared/appActionButtons.vue"

export default {
  created() {
    this.setRouteTransition({ transition: "slide-left" });
    console.log(this.categories);
  },
  components: {
    appLayout,
    appListItem,
    appChevronRightIcon,
    appNewCategoryForm,
    appActionButtons
  },
  computed: { ...mapGetters(["categories", "addingCategory"]) },
  data() {
    return {
      slidItem: null,
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
    ...mapActions(["addCategory", "deleteCategory"]),
    editFunction() {
      console.log('editing category')
    },
    deleteFunction(category) {
      this.deleteCategory({category})
    },
    swipeHandler(itemName){
      return (dir, e) => {
        if (dir != "left") {
          this.slidItem = null
        } else {
          this.slidItem = itemName
        }
      }
    },
  }
};
</script>

  (setq js-indent-lev
