<template>
  <div>
    <Scheduler :data-source="events"></Scheduler>
  </div>
</template>

<script>
import Scheduler from "@/components/Scheduler.vue";

export default {
  components: {
    Scheduler,
  },
  data() {
    return {
      events: this.$store.state.events,
    };
  },
};
</script>

<style scoped>
</style>