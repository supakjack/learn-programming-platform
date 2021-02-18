<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" fixed>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="item in menus" :key="item.title" :to="item.to">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item
          link
          v-for="child in item.items"
          :key="child.title"
          :to="child.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      selectedMenu: "",
      // headMenus: [{ text: "หน้าแรก", icon: "mdi-home-variant" }],
      menus: [
        //Teacher menu
        {
          header: true,
          title: "อาจารย์",
          hiddenOnCollapse: false,
        },
        {
          action: "mdi-chart-bar",
          title: "หน้าหลัก",
          to: "/home",
          // items: [{ title: "หน้าหลัก", to: "/home" }],
        },
        {
          action: "mdi-calendar-check",
          items: [
            { title: "มอบหมาย", to: "/assignment" },
            { title: "ผู้ใช้งาน", to: "/assignment/user" },
          ],
          title: "มอบหมายงาน",
        },
        {
          action: "mdi-book-open",
          active: true,
          child: [
            { title: "โจทย์ปัญหา", to: "/problem-tag/problems" },
            { title: "แท็ก", to: "/problem-tag/tags" },
          ],
          title: "จัดการโจทย์ปัญหา",
        },
        {
          action: "mdi-code-braces",
          title: "IDE",
          to: "/ide",
        },
        {
          action: "mdi-human-child",
          title: "Dashboard ",
        },

        //Student menu
        {
          action: "mdi-human-child",
          title: "หน้าหลัก",
        },
        {
          action: "mdi-calendar-check",
          items: [
            { title: "88824125", to: "/assignment" },
            { title: "88824154", to: "/assignment/user" },
          ],
          title: "การบ้าน",
        },
        {
          action: "mdi-human-child",
          title: "Dashboard",
        },
      ],
      mini: true,
    };
  },
};
</script>
