<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="items[0].title" />
    <datepicker />
    <b-btn variant="primary">Click</b-btn>
    <grid :data-items="items" :columns="columns" :edit-field="'inEdit'"></grid>
    <kendo-scheduler :data-source="items" @change="onChange" @save="onSave">
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

      var index = this.items.findIndex(item => item.id == ev.event.id);
     
      this.items[index].title = ev.event.title;
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
