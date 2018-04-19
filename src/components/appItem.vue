<template>
<div>
  <app-layout :headerTitle="itemName" :leftHeaderButton="leftHeaderButton" :rightHeaderButton="rightHeaderButton">
    <template v-if="stepsFetched">
      <template v-for="step in steps(itemName)">
        <div class="list-item-container" v-touch:swipe="swipeHandler(step.title)">
        <app-action-buttons @edit="editFunction(step)" @delete="deleteFunction(step)"></app-action-buttons>
        <app-list-item :slid="slidItem == step.title" item="step">
          <button class="button-reset" @click="navToStep(step)">
            <img alt="" :src="step.image" class="step"/>
            <div class="content">
                <div class="title">
                  {{step.title}}
                </div>
                <div class="description">
                  {{step.description}}
              </div>
            </div>
          </button>
        </app-list-item>
        </div>
      </template>
    </template>
  </app-layout>
</div>
</template>

<style scoped>
button.button-reset {
  display: flex;
}
.title {
  font-size: 1rem;
}
.description {
  color: var(--app-text-secondary-color);
  font-size: 0.8rem;
}
.content {
  margin-left: 0.8rem;
}
img.step {
  border: 1px solid var(--app-border-color);
  width: 90px;
  height: 90px;
  object-fit: cover;
}
.list-item-container {
  position: relative;
}
</style>
  
<script>
import appLayout from "./appLayout.vue";
import appListItem from "./shared/appListItem.vue";
import appActionButtons from "./shared/appActionButtons.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: { appLayout, appListItem, appActionButtons },
  props: ["categoryName", "itemName"],
  created() {
    this.getSteps({ item: this.itemName }).then(() => {
      this.stepsFetched = true;
    });
  },
  computed: {
    ...mapGetters(["item", "steps"])
  },
  data() {
    return {
      stepsFetched: false,
      slidItem: null,
      leftHeaderButton: {
        fn: () => {
          this.setRouteTransition({ transition: "slide-right" });
          this.$router.push("/" + this.categoryName);
        },
        icon: "appChevronLeftIcon"
      },
      rightHeaderButton: {
        fn: () => {
          this.setAddingStep(true);
        },
        icon: "appAddIcon"
      }
    };
  },
  methods: {
    ...mapMutations(["setRouteTransition", "setAddingStep", "setEditingStep"]),
    ...mapActions(["getItem", "getSteps", "deleteStep"]),
    deleteFunction(step) {
      let message = "Really delete this item?";

      let options = {
        okText: "Delete",
        cancelText: "Cancel",
        animation: "fade",
        backdropClose: true
      };
      this.$dialog
        .confirm(message, options)
        .then(() => {
          this.deleteStep({ step: step.id, item: this.itemName });
          console.log("Clicked on proceed");
        })
        .catch(function(e) {
          console.log("Clicked on cancel");
        });
    },
    editFunction(step) {
      this.setEditingStep(step);
    },
    swipeHandler(stepTitle) {
      return (dir, e) => {
        if (dir != "left") {
          this.slidItem = null;
        } else {
          this.slidItem = stepTitle;
        }
      };
    },
    navToStep(step) {
      this.setRouteTransition({ transition: "slide-left" });
      this.$router.push(`/${this.categoryName}/${this.itemName}/${step.id}`);
    }
  }
};
</script>
