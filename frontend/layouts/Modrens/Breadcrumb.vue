<template>
  <v-breadcrumbs :items="$store.state.breadcrumb.list">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item class="kanit-font">
        <nuxt-link :to="{ path: item.href }">{{ item.text }}</nuxt-link>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  mounted() {
    // console.log(this.$store.state.breadcrumb.list);
  }
};
</script>

<style>
.roboto-font {
  font-family: "Roboto", sans-serif;
}
.kanit-font {
  font-family: "Kanit", sans-serif;
}
</style>
