Main app header.

usage:
<app-header>
  <div slot="left-icon"><icon-component></div>
  <div slot="title">title</div>
  <div slot="right-icon"><icon-component></div>
</app-header>

component
<template>
  <div id="root">
    <div id="left-icon">
      <slot name="left-icon"></slot>
    </div>
    <div id="title">
      <slot name="title"></slot>
    </div>
    <div id="right-icon">
      <slot name="right-icon"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#root {
  background: var(--app-theme-color);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
#title {
  flex: 1;
  color: white;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#left-icon {
  flex-basis: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#right-icon {
  flex-basis: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
