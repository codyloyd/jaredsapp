<template>
  <div>
    <transition name="fade" @after-leave="afterLeave">
      <div v-if="modalShowing" class="backdrop" @click="modalShowing=false"></div>
    </transition>
    <transition name="fade-in-down">
      <div v-if="modalShowing" class="modal">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
    document.addEventListener("keydown", this.closeModal);
  },
  mounted() {
    this.modalShowing = true;
  },
  data() {
    return {
      modalShowing: false
    };
  },
  methods: {
    afterLeave() {
      this.closeFunction();
      document.removeEventListener("keyup", this.closeModal);
    },
    closeModal(e) {
      if (e.keyCode == 27) {
        this.modalShowing = false;
      }
    }
  },
  props: ["closeFunction"]
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-in-down-enter-active,
.fade-in-down-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-in-down-enter,
.fade-in-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
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
