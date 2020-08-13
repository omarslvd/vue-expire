<template>
  <div>
    <datepicker :calendar="customCalendar" :format="'MMMM yyyy'" v-model="date" />
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
import CustomCalendar from "./CustomCalendar.vue";

export default {
  props: {
    dataSource: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      date: new Date(),
      // month: 8,
      // year: 2020,
      customCalendar: CustomCalendar,
    };
  },
  computed: {
    rows() {
      const numDays = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();
      const daysBefore = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      ).getDay();
      const daysAfter = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        numDays
      ).getDay();

      const numRows = (daysBefore + numDays + (6 - daysAfter)) / 7;

      let array = [];

      for (let i = 0; i < numRows; i++) {
        let innerArray = [];

        for (let j = 0; j < 7; j++) {
          const value = j + 1 + 7 * i - daysBefore;
          innerArray.push(value < 1 || value > numDays ? "" : value);
        }

        array.push(innerArray);
      }

      return array;
    },
  },
  methods: {
    filter(date) {
      return this.dataSource.filter(function (event) {
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