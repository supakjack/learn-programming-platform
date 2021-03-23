<template>
  <div>
    <div>
      <sidebar-menu
        class="box"
        :menu="menu"
        :theme="selectedTheme"
        :show-one-child="true"
      />
    </div>
  </div>
</template>

<script>
import studentMenu from "./student-menu";
import teacherMenu from "./teacher-menu";
export default {
  name: "App",
  mounted() {
    if (this.$store.state.user.permission.includes("teacher")) {
      this.menu = [...teacherMenu];
    } else if (this.$store.state.user.permission.includes("student")) {
      this.menu = [...studentMenu];
    }
  },
  data() {
    return {
      menu: [],
      themes: [
        {
          name: "Default theme",
          input: "",
        },
        {
          name: "White theme",
          input: "white-theme",
        },
      ],
      selectedTheme: "white-theme",
    };
  },
};
</script>

<style lang="scss">
.box {
  -webkit-box-shadow: 0 12px 34px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0 12px 34px rgba(0, 0, 0, 0.12);
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.12);
}
</style>
