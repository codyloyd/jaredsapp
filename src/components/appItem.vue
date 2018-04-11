<template>
<div>
  <app-layout :headerTitle="itemName" :leftHeaderButton="leftHeaderButton" :rightHeaderButton="rightHeaderButton">
    <template v-if="stepsFetched">
      <template v-for="step in steps(itemName)">
        <app-list-item :item="step">
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
  font-size: .8rem;
}
.content {
  margin-left: .8rem;
}
img.step {
    border: 1px solid var(--app-border-color);
    width: 90px;
    height: 90px;
    object-fit: cover;
}
</style>
  
<script>
import appLayout from "./appLayout.vue";
import appListItem from "./shared/appListItem.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: { appLayout, appListItem },
  props: ["categoryName", "itemName"],
  created() {
    this.getSteps({item: this.itemName}).then(()=>{
      this.stepsFetched = true
    })
  },
  computed: {
    ...mapGetters(["item", "steps"])
  },
  data() {
    return {
      stepsFetched: false,
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
      },
    };
  },
  methods: {
    ...mapMutations(["setRouteTransition", "setAddingStep"]),
    ...mapActions(["getItem", "getSteps"]),
    navToStep(step) {
      this.setRouteTransition({ transition: "slide-left" });
      this.$router.push(`/${this.categoryName}/${this.itemName}/${step.id}`)
    }
  }
};
</script>
