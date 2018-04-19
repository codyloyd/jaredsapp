<template>
<app-modal :closeFunction="closeItemForm">
  <div class="modal-container">
    <h2>{{editingItem ? "Edit" : "New"}} item</h2>
    <form>
      <input name="category" placeholder="item name" type="text" v-model="itemName" autofocus/>
      <template v-if="editingItem && !editingImageFile">
        <div class="current-image-container" @click="editImage"><img alt="" :src="imageFile"/> <span>tap to edit</span></div>
      </template>
      <template v-else>
        <input type="file" id="imageInput" @change="updateImageFile">
      </template>
      <button class="button" @click.prevent="buttonClick">{{editingItem ? "update" : "create"}}</button>
    </form>
  </div>
  </app-modal>
</template>

<script>
import appModal from "./shared/appModal.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: { appModal },
  created() {
    if (this.editingItem) {
      this.itemName = this.editingItem.name;
      this.imageFile = this.editingItem.image;
      console.log(this.editingItem);
    }
  },
  computed: {
    ...mapGetters(["editingItem"]),
    categoryName() {
      return this.$route.params.categoryName;
    }
  },
  data() {
    return {
      itemName: "",
      imageFile: null,
      editingImageFile: false
    };
  },
  methods: {
    ...mapMutations(["setAddingItem", "setEditingItem"]),
    ...mapActions(["addItem", "getData", "getItems", "updateItem"]),
    editImage() {
      this.editingImageFile = true;
    },
    buttonClick() {
      var a = new FileReader();
      a.onload = e => {
        const image = e.target.result;
        if (this.editingItem) {
          this.updateItem({
            oldName: this.editingItem.name,
            name: this.itemName,
            imageFile: image
          });
        } else {
          this.addItem({
            name: this.itemName,
            category: this.categoryName,
            image: image,
            steps: []
          });
        }
        this.setAddingItem(false);
        this.setEditingItem(null);
      };
      a.readAsDataURL(this.imageFile);
    },
    closeItemForm() {
      this.setAddingItem(false);
      this.setEditingItem(null);
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
.current-image-container {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 1rem;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
span {
  font-size: 0.8rem;
  padding: 0.5rem 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
}
</style>
