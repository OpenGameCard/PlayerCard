<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
  // import UserService from '../services/user.service';

  import axios from "axios";

  export default {
    name: 'Home',
    data() {
      return {
        content: '',
        courses: [],
      };
    },
    created() {
    },
    mounted() {
      // UserService.getPublicContent().then(
      //   response => {
      //     this.content = response.data;
      //   },
      //   error => {
      //     this.content =
      //       (error.response && error.response.data) ||
      //       error.message ||
      //       error.toString();
      //   }
      // );
    }
  };
</script>
