<template>
  <!-- <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" fixed> -->
  <div id="demo">
    <div class="demo">
      <sidebar-menu
        :menu="menu"
        :theme="selectedTheme"
        :show-one-child="true"
      />
    </div>
  </div>
  <!-- </v-navigation-drawer> -->
</template>

<script>
import studentMenu from "./student-menu";
import teacherMenu from "./teacher-menu";
export default {
  name: "App",
  mounted() {
    if (this.$store.state.user.permission.includes("teacher")) {
      // console.log("is teacher");
      this.menu = [...teacherMenu];
    } else if (this.$store.state.user.permission.includes("student")) {
      // console.log("is student");
      this.menu = [...studentMenu];
    }
  },
  data() {
    return {
      //   drawer: true,
      //   mini: true,
      menu: [],
      themes: [
        {
          name: "Default theme",
          input: ""
        },
        {
          name: "White theme",
          input: "white-theme"
        }
      ],
      selectedTheme: "white-theme"
    };
  }
};
</script>

<style lang="scss"></style>
