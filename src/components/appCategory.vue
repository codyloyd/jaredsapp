<template>
<div>
  <app-layout :headerTitle="categoryName" :leftHeaderButton="leftHeaderButton" :rightHeaderButton="rightHeaderButton">
    <template v-if="itemsFetched">
      <template v-for="item in items(categoryName)">
        <div class="list-item-container">
          <app-list-item :slid="slidItem == item.name" :item="item.name" :key="item.id">
            <button class="button-reset" @click="navToItem(item.name)">
              <img alt="" :id="item.id + item.name" :src="item.image"/>
              <span class="item-name">
                {{item.name}}
              </span>
            </button>
            <button @click="slidItem = item.name">slide</button>
          </app-list-item>
          <app-action-buttons></app-action-buttons>
        </div>
      </template>
    </template>
    </app-layout>
  </div>
</template>

<style scoped>
.test {
  background: red;
}
img {
  border: 1px solid var(--app-border-color);
  width: 90px;
  height: 90px;
  object-fit: cover;
}
button {
  display: flex;
  align-items: center;
}
.item-name {
  margin-left: 8px;
}
.list-item-container {
  position: relative;
}
</style>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import appLayout from "./appLayout.vue";
import appListItem from "./shared/appListItem.vue";
import appActionButtons from "./shared/appActionButtons.vue";

export default {
  created() {
    this.getItems({ category: this.categoryName }).then(x => {
      this.itemsFetched = true;
      console.log(this.items(this.categoryName))
    });
  },
  updated() {},
  components: { appListItem, appLayout, appActionButtons },
  props: ["categoryName"],
  data() {
    return {
      slidItem: null,
      itemsFetched: false,
      leftHeaderButton: {
        fn: () => {
          this.setRouteTransition({ transition: "slide-right" });
          this.$router.push("/");
        },
        icon: "appChevronLeftIcon"
      },
      rightHeaderButton: {
        fn: () => {
          this.setAddingItem(true);
        },
        icon: "appAddIcon"
      }
    };
  },
  computed: {
    ...mapGetters(["category", "item", "items"]),
  },
  methods: {
    ...mapMutations(["setRouteTransition", "setAddingItem"]),
    ...mapActions(["getItem", "getData", "getItems"]),
    fetchItems() {
      this.getData().then(() => {
        this.category(this.categoryName).items.forEach(item => {
          this.getItem({ item }).then(a => {
            this.items.push(this.item(item));
          });
        });
      });
    },
    navToItem(item) {
      this.setRouteTransition({ transition: "slide-left" });
      this.$router.push(this.categoryName + "/" + item);
    },
    imageFromBlob(blob, id) {
      if (blob != "xx") {
        var a = new FileReader();
        a.onload = function(e) {
          document.getElementById(`${id}`).src = e.target.result;
        };
        a.readAsDataURL(blob);
      }
    }
  }
};
</script>
