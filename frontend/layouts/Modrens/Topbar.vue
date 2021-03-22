<template lang="html">
  <v-app-bar fixed app color="primary">
      <div class="text-center ml-20 text-white text-3xl">
        {{systemName}}
      </div>
    <v-spacer></v-spacer>
      <div class="text-center">
          <v-btn
        class="ma-2"
        color="primary"
        dark
      >
        {{username}}
      </v-btn>
      </div>
    <v-btn depressed color="error" @click="$auth.logout()">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      systemName: "Learn Programming Platform",
    };
  },
  mounted() {
    this.username = this.$store.state.user.username;
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("set_drawer", !this.$store.state.drawer);
    },
  },
};
</script>

<style lang="css" scoped></style>
