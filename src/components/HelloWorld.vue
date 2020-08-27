<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <input type="text" v-model="events[0].name" /> -->
    <datepicker />
    <b-btn variant="primary" v-b-modal.modal-1>Click</b-btn>
    <grid :data-items="events" :columns="columns" :edit-field="'inEdit'"></grid>
    <Scheduler :data-source="events"></Scheduler>
    <b-modal id="modal-1" title="BootstrapVue" @ok="handleOk" @shown="showModal">
      <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
      <b-form ref="form-ref">
        <b-form-group id="name-group" label="Name:" label-for="name">
          <b-form-input
            id="name"
            ref="name-ref"
            type="text"
            placeholder="Enter name"
            v-model="selectedEvent.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="expire-date-group" label="Expire date:" label-for="expire-date">
          <datepicker
            id="expire-date"
            v-model="selectedEvent.date"
            :popupSettings="{ appendTo: 'form-ref' }"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Scheduler from "@/components/Scheduler.vue";
import db from "../firebase/config.js";

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
      selectedEvent: {},
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

      // Firebase
      console.log(this.selectedEvent.name + " " + this.selectedEvent.date);
      db.collection("expiration-dates")
        .add({
          name: this.selectedEvent.name,
          date: this.selectedEvent.date,
        })
        // .then(
        //   function (docRef) {
        //     this.events.push({
        //       id: docRef.id,
        //       name: this.selectedEvent.name,
        //       expireDate: this.selectedEvent.date,
        //       date: this.selectedEvent.date.getDate(),
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        //   }.bind(this)
        // )
        .then((docRef) => {
          this.events.push({
            id: docRef.id,
            name: this.selectedEvent.name,
            expireDate: this.selectedEvent.date,
            date: this.selectedEvent.date.getDate(),
          });
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-1");
      });
    },
    showModal() {
      this.selectedEvent = {};
      this.$refs["name-ref"].focus();
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
