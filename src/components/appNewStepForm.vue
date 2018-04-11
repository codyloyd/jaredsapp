<template>
<app-modal :closeFunction="closeItemForm">
  <div class="modal-container">
    <h2>New Step</h2>
    <form>
      <input name="category" placeholder="title" type="text" v-model="stepTitle" autofocus/>
      <textarea cols="30" id="" name="description" rows="10" v-model="stepDescription"></textarea>
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
  components: {appModal},
  computed: {
    itemName() {
      return this.$route.params.itemName;
    }
  },
  data() {
    return {
      stepTitle: "",
      stepDescription: "",
      imageFile: null
    };
  },
  methods: {
    ...mapMutations(["setAddingStep"]),
    ...mapActions(["addStep", "getData", "getItems"]),
    buttonClick() {
      var a = new FileReader();
      a.onload = e => {
        const image = e.target.result;
        this.addStep({
          title: this.stepTitle,
          description: this.stepDescription,
          item: this.itemName,
          image: image,
        });
        this.setAddingStep(false);
      };
      a.readAsDataURL(this.imageFile);
    },
    closeItemForm() {
      this.setAddingStep(false);
    },
    updateImageFile(e) {
      this.imageFile = e.target.files[0];
    }
  }
}
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
textarea,
button {
  box-sizing: border-box;
  width: calc(100% - 2rem);
  margin: 0 1rem 1rem;
}
</style>
