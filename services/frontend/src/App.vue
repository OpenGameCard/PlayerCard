<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <span>OpenGame</span>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
        <b-navbar-item href="#">
          Documentation
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item v-if="!currentUser" tag="div">
          <div class="buttons">
            <router-link to="/register">
              <font-awesome-icon icon="user-plus"/>
              Sign Up
            </router-link>
            <router-link to="/login">
              <font-awesome-icon icon="sign-in-alt"/>
              Login
            </router-link>
          </div>
        </b-navbar-item>
        <b-navbar-item v-if="currentUser" tag="div">
          <div class="buttons">
            <router-link to="/profile">
              <font-awesome-icon icon="user"/>
              {{ currentUser.username }}
            </router-link>
            <a class="button is-light">
              <a class="nav-link" href @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt"/>
                LogOut
              </a>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  };
</script>
