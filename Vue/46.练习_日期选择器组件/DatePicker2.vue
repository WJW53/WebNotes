<template>
  <div class="date-picker">
    <div class="picker-input">
      <span class="input-prefix">
        <i>xx</i>
      </span>
      <input type="text" />
    </div>
    <div class="piker-panel">
        <div class="picker-arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    }
  }
};
</script>


<style scoped>
</style>