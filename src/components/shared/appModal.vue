<template>
  <div>
    <div class="backdrop" @click="closeFunction"></div>
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const closeModal = e => {
      if (e.keyCode == 27) {
        this.closeFunction();
        document.removeEventListener("keyup", closeModal);
      }
    };
    document.addEventListener("keyup", closeModal);
  },
  props: ["closeFunction"]
};
</script>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}
.modal {
  width: 90%;
  max-width: 400px;
  border-radius: 4px;
  background: white;
  position: absolute;
  top: 4rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  box-shadow: 4px 4px 24px 0 rgba(0, 0, 0, 0.3);
}
</style>
