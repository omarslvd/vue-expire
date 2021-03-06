import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";

// eslint-disable-next-line no-unused-vars
import kendo from "@progress/kendo-ui";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "./assets/vue.css";

import "@progress/kendo-ui/js/cultures/kendo.culture.es-MX.js";
import "@progress/kendo-ui/js/messages/kendo.messages.es-MX.js";

import { IntlProvider, load, loadMessages, LocalizationProvider } from "@progress/kendo-vue-intl";
import { Grid } from "@progress/kendo-vue-grid";
import { DatePicker } from "@progress/kendo-vue-dateinputs";
import { Scheduler } from "@progress/kendo-scheduler-vue-wrapper";
// import { SchedulerResource } from '@progress/kendo-scheduler-vue-wrapper'
import { SchedulerView } from "@progress/kendo-scheduler-vue-wrapper";
//import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper'
import { Calendar } from "@progress/kendo-vue-dateinputs";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";

import numbers from "cldr-numbers-full/main/es/numbers.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.component("grid", Grid);
Vue.component("calendar", Calendar);
Vue.component("datepicker", DatePicker);
Vue.component("kendo-scheduler", Scheduler);
Vue.component("kendo-scheduler-view", SchedulerView);
Vue.component("intl", IntlProvider);
Vue.component("localization", LocalizationProvider);

kendo.culture("es-MX");

load(likelySubtags, currencyData, weekData, numbers, caGregorian, dateFields, timeZoneNames);

const esMessages = {
  datepicker: {
    toggleCalendar: "Alternar calendario",
  },
  calendar: {
    today: "Hoy",
  },
  dateinput: {
    increment: "Incrementar valor",
    decrement: "Disminuir valor",
  },
  numerictextbox: {
    increment: "Incrementar valor",
    decrement: "Disminuir valor",
  },
  grid: {
    groupPanelEmpty: "Arrastre el título de una columna y suéltelo aquí para agrupar por ese criterio",
    noRecords: "No hay datos disponibles.",
    pagerFirstPage: "Ir a la primera página",
    pagerPreviousPage: "Ir a la página anterior",
    pagerNextPage: "Ir a la página siguiente",
    pagerLastPage: "Ir a la última página",
    pagerPage: "Página",
    pagerOf: "de",
    pagerItems: "ítems",
    pagerInfo: "{0} - {1} de {2} ítems",
    pagerItemsPerPage: "ítems por página",
    filterEqOperator: "Es igual a",
    filterNotEqOperator: "No es igual a",
    filterIsNullOperator: "Es nulo",
    filterIsNotNullOperator: "No es nulo",
    filterIsEmptyOperator: "Está vacío",
    filterIsNotEmptyOperator: "No está vacío",
    filterStartsWithOperator: "Comienza con",
    filterContainsOperator: "Contiene",
    filterNotContainsOperator: "No contiene",
    filterEndsWithOperator: "Termina en",
    filterGteOperator: "Es mayor o igual que",
    filterGtOperator: "Es mayor que",
    filterLteOperator: "Es menor o igual que",
    filterLtOperator: "Es menor o igual que",
    filterIsTrue: "Sí",
    filterIsFalse: "No",
    filterBooleanAll: "(Todas)",
    filterAfterOrEqualOperator: "Es posterior o igual a",
    filterAfterOperator: "Es posterior",
    filterBeforeOperator: "Es anterior",
    filterBeforeOrEqualOperator: "Es anterior o igual a",
    filterFilterButton: "Filtrar",
    filterClearButton: "Limpiar filtros",
    filterAndLogic: "Y",
    filterOrLogic: "O",
  },
};

loadMessages(esMessages, "es-MX");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
