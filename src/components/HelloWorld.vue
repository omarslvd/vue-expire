<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="items[0].title" />
    <datepicker />
    <b-btn variant="primary">Click</b-btn>
    <grid :data-items="items" :columns="columns" :edit-field="'inEdit'"></grid>
    <kendo-scheduler :data-source="items" :selectable="true" :editable-template="editableTemplate" @save="onSave" @remove="onRemove" @change="onChange">
      <!-- <kendo-scheduler-view :type="'day'"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'workWeek'" :selected="true"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'week'"></kendo-scheduler-view>-->
      <kendo-scheduler-view :type="'month'"></kendo-scheduler-view>
      <!-- <kendo-scheduler-view :type="'agenda'"></kendo-scheduler-view> -->
    </kendo-scheduler>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function () {
    return {
      items: [
        {
          id: 1,
          name: "uno",
          expireDate: new Date(1996, 8, 20),
          start: new Date(2020, 7, 20),
          end: new Date(2020, 7, 20),
          title: "uno 1",
        },
        {
          id: 2,
          name: "dos",
          expireDate: new Date(1996, 8, 20),
          start: new Date(2020, 7, 28),
          end: new Date(2020, 7, 28),
          title: "dos 2",
        },
      ],
      editableTemplate: `
        <div class="k-edit-label"><label for="title">Title</label></div>
          <div data-container-for="title" class="k-edit-field">
          <input type="text" class="k-textbox" name="title" required="required" data-bind="value:title">
        </div>
        <div class="k-edit-label">
          <label for="start">Start</label>
        </div>
        <div data-container-for="start" class="k-edit-field">
          <input type="text" data-type="date" data-role="datepicker" data-bind="value:start," name="start" />
          <span data-bind="text: startTimezone"></span>
          <span data-for="start" class="k-invalid-msg" style="display: none;"></span>
        </div>
      `
    };
  },
  computed: {
    columns: function () {
      return [
        { field: "title", title: "Name" },
        { field: "start", title: "Expire Date", format: "{0:d}" },
      ];
    },
  },
  methods: {
    onSave: function (ev) {
      console.log("Event :: edit", ev);

      if (ev.event.id > 0) {
        var index = this.items.findIndex(item => item.id == ev.event.id);
      
        this.items[index].title = ev.event.title;
        this.items[index].start = ev.event.start;
      } else {
        this.items.push({
          id: this.items.length + 1,
          name: ev.event.title,
          expireDate: ev.event.start,
          start: ev.event.start,
          end: ev.event.start,
          title: ev.event.title
        })
      }
    },
    onRemove: function (ev) {
      console.log("Event :: remove", ev);

      var index = this.items.findIndex(item => item.id == ev.event.id);
      
      this.items.splice(index, 1);
    },
    onChange: function (ev) {
      console.log("Event :: change", ev);
    }
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
