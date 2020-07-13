<template>
  <div class="Confirmation">
    <pre v-text="$attrs"/>
  </div>
</template>

<script>


  export default {
    name: 'Confirmation',
    data() {
      return {};
    },
    computed: {},
    methods: {},
    mounted() {

      // eslint-disable-next-line
      console.log(this.$route.query.token)

      this.$store.dispatch('auth/confirmation', this.$route.query.token).then(
        data => {
          this.message = data.message;
          this.successful = true;

          this.$router.push('/login');
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    props: {}
  }
</script>
