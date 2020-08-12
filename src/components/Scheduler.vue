<template>
  <div>
    <table>
      <tr>
        <td>
          <table>
            <tr>
              <td>domingo</td>
              <td>lunes</td>
              <td>martes</td>
              <td>miércoles</td>
              <td>jueves</td>
              <td>viernes</td>
              <td>sábado</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table>
            <tr v-for="(row, index) in rows" :key="index">
              <td v-for="(el, index) in row" :key="index">
                {{el}}
                <ul>
                  <li v-for="event in filter(el)" :key="event.id">{{event.name}}</li>
                </ul>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: 8,
      year: 2020,
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
      rows: [
        ["", "", "01", "02", "03", "04", "05"],
        ["06", "07", "08", "09", "10", "11", "12"],
        ["13", "14", "15", "16", "17", "18", "19"],
        ["20", "21", "22", "23", "24", "25", "26"],
        ["27", "28", "29", "30", "", "", ""],
      ],
    };
  },
  methods: {
    filter(date) {
      return this.events.filter(function (event) {
        return event.date == date;
      });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
</style>