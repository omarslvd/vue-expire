<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <input type="text" v-model="events[0].name" /> -->
    <datepicker />
    <b-btn variant="primary" v-b-modal.modal-1>Click</b-btn>
    <grid :data-items="events" :columns="columns" :edit-field="'inEdit'"></grid>
    <Scheduler :data-source="events"></Scheduler>
    <b-modal
      id="modal-1"
      title="BootstrapVue"
      @ok="handleOk"
      @shown="showModal"
      @hidden="resetModal"
    >
      <div v-if="loading">Loading...</div>
      <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
      <b-form v-else ref="form-ref">
        <b-form-group
          id="name-group"
          label="Name:"
          label-for="name"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name"
            ref="name-ref"
            type="text"
            placeholder="Enter name"
            v-model="selectedEvent.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="expire-date-group"
          label="Expire date:"
          label-for="expire-date"
          invalid-feedback="Expire date is required"
          :state="validExpireDate"
        >
          <datepicker
            id="expire-date"
            v-model="selectedEvent.date"
            :popupSettings="{ appendTo: 'form-ref' }"
            :required="true"
            validation-message="'Error'"
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
      validExpireDate: null,
      loading: true,
    };
  },
  watch: {
    selectedEvent: {
      handler: function (val) {
        this.validExpireDate = val.date ? true : false;
      },
      deep: true,
    },
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
    checkFormValidity() {
      const valid = this.$refs["form-ref"].checkValidity();

      this.validExpireDate = this.selectedEvent.date ? true : false;

      return valid;
    },
    handleOk: function (bvModalEvt) {
      bvModalEvt.preventDefault();

      this.handleSubmit();
    },
    handleSubmit() {
      this.$refs["form-ref"].classList.add("was-validated");
      if (!this.checkFormValidity()) {
        return;
      }

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

          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide("modal-1");
          });
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
    resetModal() {
      this.selectedEvent = {};
      this.loading = true;
    },
    showModal() {
      this.$nextTick(() => {
        this.loading = false;
      });
      this.resetModal();
      this.selectedEvent = { name: "", date: new Date() };
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
.k-widget.k-datepicker {
  width: 100%;
}
</style>
