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
      events: [
        {
          id: 1,
          name: "evento 1",
          date: "28",
        },
        {
          id: 2,
          name: "evento 2",
          date: "01",
        },
        {
          id: 3,
          name: "evento 3",
          date: "28",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>