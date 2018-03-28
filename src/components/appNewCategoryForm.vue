<template>
  <appModal :closeFunction="closeCategoryForm">
    <div class="modal-container">
      <h2>New category</h2>
      <input name="category" placeholder="category title" type="text" v-model="categoryName" value=""/>
      <button class="button" @click="buttonClick">create</button>
    </div>
  </appModal>
</template>

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

<script>
import { mapActions, mapMutations } from "vuex";
import appModal from "./shared/appModal.vue";

export default {
  components: { appModal },
  data() {
    return {
      categoryName: ""
    };
  },
  methods: {
    ...mapMutations(["setAddingCategory"]),
    ...mapActions(["addCategory", "getData"]),
    buttonClick() {
      this.addCategory({ name: this.categoryName });
      this.setAddingCategory(false);
      this.getData();
    },
    closeCategoryForm() {
      this.setAddingCategory(false);
    }
  }
};
</script>
