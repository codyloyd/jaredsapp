<template>
  <app-modal :closeFunction="closeItemForm">
    <div class="modal-container">
      <h2>New Item</h2>
      <form>
        <input name="category" placeholder="item name" type="text" v-model="itemName" autofocus/>
        <input type="file" id="imageInput" @change="updateImageFile">
      <button class="button" @click.prevent="buttonClick">create</button>
    </form>
  </div>
  </app-modal>
</template>

<script>
import appModal from "./shared/appModal.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  components: { appModal },
  computed: {
    categoryName() {
      return this.$route.params.categoryName;
    }
  },
  data() {
    return {
      itemName: "",
      imageFile: null
    };
  },
  methods: {
    ...mapMutations(["setAddingItem"]),
    ...mapActions(["addItem", "getData", "getItems"]),
    buttonClick() {
      var a = new FileReader();
      a.onload = e => {
        const image = e.target.result;
        this.addItem({
          name: this.itemName,
          category: this.categoryName,
          image: image,
          steps: []
        });
        this.setAddingItem(false);
      };
      a.readAsDataURL(this.imageFile);
    },
    closeItemForm() {
      this.setAddingItem(false);
    },
    updateImageFile(e) {
      this.imageFile = e.target.files[0];
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 1em;
  font-weight: 400;
}
.modal-container {
  text-align: center;
}
input,
button {
  box-sizing: border-box;
  width: calc(100% - 2rem);
  margin: 0 1rem 1rem;
}
</style>
