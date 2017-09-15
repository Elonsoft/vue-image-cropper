<template>
  <div class="actions">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .actions {
    display: flex;
    justify-content: center;
  }

  button[action-btn] {
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 35px;
    margin: 0 7px;
    outline: none;
    width: 35px;
    transition: 0.2s;

    &:hover,
    &:focus {
      background: rgba(0, 0, 0, 0.85);
    }
  }
</style>
