
<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">vue-expire</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'About' }" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Test' }" class="nav-link">Test</router-link>
          </li>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Idioma" right>
            <b-dropdown-item href="#">Español</b-dropdown-item>
            <b-dropdown-item href="#">Inglés</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Usuario</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid>
      <localization :language="'en-US'">
        <intl :locale="'en'">
          <div id="app">
            <router-view />
          </div>
        </intl>
      </localization>
    </b-container>
  </div>
</template>

<script>
import db from "./firebase/config.js";

export default {
  name: "App",
  created: function () {
    db.collection("expiration-dates")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.$store.state.events.push({
            id: doc.id,
            name: doc.data().name,
            expireDate: new Date(doc.data().date.seconds * 1000),
            date: new Date(doc.data().date.seconds * 1000).getDate(),
          });
        });
        console.log(this.$store.state.events);
      });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a.nav-link.router-link-exact-active.router-link-active {
  color: #fff;
}
</style>