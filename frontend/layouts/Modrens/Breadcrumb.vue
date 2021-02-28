<template>
  <v-breadcrumbs :items="crumbs">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :href="item.href"
        :disabled="item.disabled"
        class="kanit-font"
      >
        {{ item.text }}
        <p>{{ $store.state.breadcrumb }}</p>
        <p>{{ $store.state.user.id }}</p>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "breadcrumbs_dashboard"
      },
      {
        text: "Link 1",
        disabled: false,
        href: "breadcrumbs_link_1"
      },
      {
        text: "Link 2",
        disabled: true,
        href: "breadcrumbs_link_2"
      }
    ],
    items2: [
      {
        text: "หน้าหลัก",
        disabled: false,
        href: "/home"
      }
    ],
    editeditems: {
      text: "",
      disabled: false,
      href: ""
    },
    defaultItem: {
      text: "",
      disabled: false,
      href: ""
    },
    homeItem: {
      text: "หน้าหลัก",
      disabled: false,
      href: "/home"
    }
  }),
  computed: {
    crumbs() {
      console.log(this.$store.state.breadcrumb);
      // const crumbs = this.$store.state.breadcrumb;
      // if (this.$store.state.course.courseName == null) {
      //   console.log("crumb", crumbs);
      // } else if (this.$store.state.course.courseName != null) {
      //   this.editeditems.text =
      //     this.$store.state.course.courseCode +
      //     " " +
      //     this.$store.state.course.courseName;
      //   // this.editeditems.href = ;
      //   crumbs.push(this.editeditems);
      //   this.editeditems = this.defaultItem;
      // } else if (this.$route.fullPath == "/assignment?tab=assignment") {
      //   console.log("assign", assignment);
      // }
      return this.$store.state.breadcrumb;
    }
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
