<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <input type="text" v-model="events[0].name" /> -->
    <datepicker />
    <b-btn variant="primary" v-b-modal.modal-1>Click</b-btn>
    <grid :data-items="events" :columns="columns" :edit-field="'inEdit'"></grid>
    <Scheduler :data-source="events"></Scheduler>
    <b-modal id="modal-1" title="BootstrapVue" @ok="handleOk">
      <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
      <b-form>
        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input id="input-1" type="text" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Expire date:" label-for="input-2">
          <!-- <b-form-input id="input-2" required placeholder="Enter expire date"></b-form-input> -->
          <datepicker />
        </b-form-group>
        <b-button class="mt-3" block @click="$bvModal.hide('modal-1')">Close Me</b-button>
      </b-form>
    </b-modal>
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
    handleOk: function (bvModalEvt) {
      bvModalEvt.preventDefault();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-1");
      });
      console.log("OK");
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
