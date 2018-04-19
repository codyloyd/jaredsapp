<template>
  <appModal :closeFunction="closeCategoryForm">
    <div class="modal-container">
      <h2>{{editingCategory ? "Edit" : "New"}} category</h2>
      <form>
        <input autofocus name="category" placeholder="category title" type="text" v-model="categoryName" value=""/>
        <button class="button" @click.prevent="buttonClick">{{editingCategory ? "update" : "create"}}</button>
      </form>
    </div>
  </appModal>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import appModal from "./shared/appModal.vue";

export default {
  components: { appModal },
  created() {
    if (this.editingCategory) {
      this.categoryName = this.editingCategory.category;
    }
  },
  computed: { ...mapGetters(["editingCategory"]) },
  data() {
    return {
      categoryName: ""
    };
  },
  methods: {
    ...mapMutations(["setAddingCategory", "setEditingCategory"]),
    ...mapActions(["addCategory", "updateCategory"]),
    buttonClick() {
      if (this.editingCategory) {
        this.updateCategory({
          oldName: this.editingCategory.category,
          name: this.categoryName
        });
        this.setEditingCategory(null);
      } else {
        this.addCategory({ name: this.categoryName });
        this.setAddingCategory(false);
      }
    },
    closeCategoryForm() {
      this.setAddingCategory(false);
      this.setEditingCategory(null);
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
