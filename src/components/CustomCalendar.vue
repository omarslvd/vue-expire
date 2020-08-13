<template>
  <div>
    <calendar
      :default-active-view="'year'"
      :bottom-view="'year'"
      :value="this.$props.value"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";

export default {
  props: Calendar.props,
  methods: {
    handleChange(event) {
      this.$emit("change", event);
    },
  },
};
</script>

<style scoped>
</style>
