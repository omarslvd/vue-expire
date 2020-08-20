<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <input type="text" v-model="events[0].name" /> -->
    <datepicker />
    <b-btn variant="primary">Click</b-btn>
    <grid :data-items="events" :columns="columns" :edit-field="'inEdit'"></grid>
    <Scheduler :data-source="events"></Scheduler>
  </div>
</template>

<script>
import Scheduler from "@/components/Scheduler.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Scheduler,
  },
  data: function () {
    return {
      events: this.$store.state.events,
    };
  },
  computed: {
    columns: function () {
      return [
        { field: "name", title: "Name" },
        { field: "expireDate", title: "Expire Date", format: "{0:d}" },
      ];
    },
  },
  methods: {
    onSave: function (ev) {
      console.log("Event :: edit", ev);

      if (ev.event.id > 0) {
        var index = this.items.findIndex((item) => item.id == ev.event.id);

        this.items[index].title = ev.event.title;
        this.items[index].start = ev.event.start;
      } else {
        this.items.push({
          id: this.items.length + 1,
          name: ev.event.title,
          expireDate: ev.event.start,
          start: ev.event.start,
          end: ev.event.start,
          title: ev.event.title,
        });
      }
    },
    onRemove: function (ev) {
      console.log("Event :: remove", ev);

      var index = this.items.findIndex((item) => item.id == ev.event.id);

      this.items.splice(index, 1);
    },
    onChange: function (ev) {
      console.log("Event :: change", ev);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
