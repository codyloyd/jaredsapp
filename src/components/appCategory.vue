<template>
<div>
  <app-layout :headerTitle="categoryName" :leftHeaderButton="leftHeaderButton" :rightHeaderButton="rightHeaderButton">
    <template v-if="itemsFetched">
    <template v-for="item in items(categoryName)">
      <app-list-item :item="item.name" :key="item.id">
        <button class="button-reset" @click="navToItem(item.name)">
          <img alt="" :id="item.id + item.name" :src="item.image"/>
          <span class="item-name">
            {{item.name}}
          </span>
          </button>
        </app-list-item>
      </template>
    </template>
    </app-layout>
  </div>
</template>

<style scoped>
img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}
button {
  display: flex;
  align-items: center;
}
.item-name {
  margin-left: 8px;
}
</style>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import appLayout from "./appLayout.vue";
import appListItem from "./shared/appListItem.vue";

export default {
  created() {
    this.getItems({ category: this.categoryName }).then(x => {
      this.itemsFetched = true;
      console.log(this.items(this.categoryName))
    });
  },
  updated() {},
  components: { appListItem, appLayout },
  props: ["categoryName"],
  data() {
    return {
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
    ...mapGetters(["category", "item", "items"])
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
