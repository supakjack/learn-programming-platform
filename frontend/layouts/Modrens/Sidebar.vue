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
          title: "หน้าหลัก",
          href: "/home",
          icon: "fa fa-download",

          // child: [{ title: "หน้าหลัก", href: "/home" }],
        },
        {
          child: [
            {
              title: "มอบหมาย",
              href: "/assignment?tab=assignment",
              icon: "fa fa-download",
            },
            {
              title: "ผู้ใช้งาน",
              href: "/assignment?tab=user",
              icon: "fa fa-download",
            },
          ],
          title: "มอบหมายงาน",
          icon: "fa fa-download",
        },
        {
          active: true,
          child: [
            {
              title: "โจทย์ปัญหา",
              href: "/problem-tag/?tab=problems",
              icon: "fa fa-download",
            },
            {
              title: "แท็ก",
              href: "/problem-tag/?tab=tag",
              icon: "fa fa-download",
            },
          ],
          title: "จัดการโจทย์ปัญหา",
          icon: "fa fa-download",
        },
        {
          title: "IDE",
          href: "/ide",
          icon: "fa fa-download",
        },
        {
          title: "Dashboard ",
          icon: "fa fa-download",
          href: "/error",
        },

        //Student menu
        {
          header: true,
          title: "นักเรียน",
          hiddenOnCollapse: true,
        },
        {
          title: "หน้าหลัก",
          icon: "fa fa-download",
          href: "/student/homestu",
        },
        {
          child: [
            { title: "88824125", href: "/assignment", icon: "fa fa-download" },
            {
              title: "88824154",
              href: "/student/homework",
              icon: "fa fa-download",
            },
          ],
          title: "การบ้าน",
          icon: "fa fa-download",
        },
        {
          title: "Dashboard",
          icon: "fa fa-download",
          href: "/error",
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
