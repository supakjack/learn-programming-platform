<template lang="html">
  <v-app-bar fixed app color="primary">
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('set_drawer', !this.$store.state.drawer)
    }
  }
}
</script>

<style lang="css" scoped></style>