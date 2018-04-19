<template>
<app-modal :closeFunction="closeItemForm">
  <div class="modal-container">
    <h2>{{editingStep ? "Edit" : "New"}} step</h2>
    <form>
      <input name="category" placeholder="title" type="text" v-model="stepTitle" autofocus/>
      <textarea cols="30" id="" name="description" rows="4" v-model="stepDescription"></textarea>
      <template v-if="editingStep && !editingImageFile">
        <div class="current-image-container" @click="editImage"><img alt="" :src="imageFile"/> <span>tap to edit</span></div>
      </template>
      <template v-else>
        <input type="file" id="imageInput" @change="updateImageFile">
      </template>
      <button class="button" @click.prevent="buttonClick">{{editingStep ? "update" : "create"}}</button>
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
    if (this.editingStep) {
      this.stepTitle = this.editingStep.title;
      this.stepDescription = this.editingStep.description;
      this.imageFile = this.editingStep.image;
    }
  },
  computed: {
    ...mapGetters(["editingStep"]),
    itemName() {
      return this.$route.params.itemName;
    }
  },
  data() {
    return {
      stepTitle: "",
      stepDescription: "",
      imageFile: null,
      editingImageFile: false
    };
  },
  methods: {
    ...mapMutations(["setAddingStep", "setEditingStep"]),
    ...mapActions(["addStep", "getData", "getItems", "updateStep"]),
    editImage() {
      this.editingImageFile = true;
    },
    buttonClick() {
      var a = new FileReader();
      a.onload = e => {
        const image = e.target.result;
        if (this.editingStep) {
          this.updateStep({
            oldTitle: this.editingStep.title,
            title: this.stepTitle,
            description: this.stepDescription,
            image: image || this.editingStep.image
          });
        } else {
          this.addStep({
            title: this.stepTitle,
            description: this.stepDescription,
            item: this.itemName,
            image: image
          });
        }
        this.setEditingStep(null);
        this.setAddingStep(false);
      };
      a.readAsDataURL(this.imageFile);
    },
    closeItemForm() {
      this.setEditingStep(null);
      this.setAddingStep(false);
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
textarea,
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
