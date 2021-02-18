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
      <v-list-group
        v-for="item in menus"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item link v-for="child in item.items" :key="child.title">
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      selectedMenu: "",
      headMenus: [{ text: "หน้าแรก", icon: "mdi-home-variant" }],
      menus: [
        {
          action: "mdi-chart-bar",
          title: "หน้าหลัก",
        },
        {
          action: "mdi-calendar-check",
          items: [
            { title: "ปีการศึกษา" },
            { title: "รายวิชา" },
            { title: "กลุ่มเรียน" },
          ],
          title: "การมอบหมาย",
        },
        {
          action: "mdi-book-open",
          active: true,
          items: [{ title: "ชุดทดสอบ" }, { title: "แท็ก" }],
          title: "โจทย์ปัญหา",
        },
        {
          action: "mdi-code-braces",
          items: [{ title: "ภาษา C" }, { title: "ภาษา C++" }],
          title: "เขียนโปรแกรม",
        },
        {
          action: "mdi-human-child",
          items: [{ title: "นักเรียน" }],
          title: "ผู้ใช้งาน",
        },
      ],
      mini: true,
    };
  },
};
</script>
