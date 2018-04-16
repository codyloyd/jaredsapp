<template>
<div id="root">
  <button class="button-reset" @click="editFunc"><app-edit-icon fill="white"></app-edit-icon></button>
  <button class="button-reset delete" @click="deleteFunc"><app-delete-icon fill="white"></app-delete-icon></button>
</div>
</template>

<style scoped>
#root {
  display: flex;
  background: var(--app-theme-color);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 6rem;
}
.button-reset {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete {
  background: var(--app-danger-color);
}
</style>

<script>
import appEditIcon from "../icons/appEditIcon.vue"
import appDeleteIcon from "../icons/appDeleteIcon.vue"

export default {
  props: ["edit"],
  components: {appEditIcon, appDeleteIcon},
  methods: {
    editFunc(){
      this.$emit('edit')
    },
    deleteFunc() {
      this.$emit('delete')
    }
  }
}
</script>
