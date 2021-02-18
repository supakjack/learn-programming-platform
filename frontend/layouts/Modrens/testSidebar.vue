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
export default {
  name: "App",
  data() {
    return {
    //   drawer: true,
    //   mini: true,

      menu: [
        //Teacher menu
        {
          header: true,
          title: "อาจารย์",
          hiddenOnCollapse: true,
        },
        {
          action: "mdi-chart-bar",
          title: "หน้าหลัก",
          href: "/home",
          icon: "fa fa-download",

          // child: [{ title: "หน้าหลัก", href: "/home" }],
        },
        {
          action: "mdi-calendar-check",
          child: [
            { title: "มอบหมาย", href: "/assignment", icon: "fa fa-download" },
            {
              title: "ผู้ใช้งาน",
              href: "/assignment/user",
              icon: "fa fa-download",
            },
          ],
          title: "มอบหมายงาน",
          icon: "mdi-book-open",
        },
        {
          action: "mdi-book-open",
          active: true,
          child: [
            {
              title: "โจทย์ปัญหา",
              href: "/problem-tag/problems",
              icon: "fa fa-download",
            },
            {
              title: "แท็ก",
              href: "/problem-tag/tags",
              icon: "fa fa-download",
            },
          ],
          title: "จัดการโจทย์ปัญหา",
          icon: "fa fa-download",
        },
        {
          action: "mdi-code-braces",
          title: "IDE",
          href: "/ide",
          icon: "fa fa-download",
        },
        {
          action: "mdi-human-child",
          title: "Dashboard ",
          icon: "fa fa-download",
        },

        //Student menu
        {
          header: true,
          title: "นักเรียน",
          hiddenOnCollapse: true,
        },
        {
          action: "mdi-human-child",
          title: "หน้าหลัก",
          icon: "fa fa-download",
        },
        {
          action: "mdi-calendar-check",
          child: [
            { title: "88824125", href: "/assignment", icon: "fa fa-download" },
            {
              title: "88824154",
              href: "/assignment/user",
              icon: "fa fa-download",
            },
          ],
          title: "การบ้าน",
          icon: "fa fa-download",
        },
        {
          action: "mdi-human-child",
          title: "Dashboard",
          icon: "fa fa-download",
        },
      ],
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
</style>
