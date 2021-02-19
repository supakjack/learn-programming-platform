<template>
  <v-card class="kanit-font">
    <v-tabs centered v-model="tab">
      <v-tab href="#assignment">มอบหมายงาน</v-tab>
      <v-tab href="#user">สมาชิก</v-tab>
    </v-tabs>

    <v-tabs-items :value="tab">
      <v-tab-item value="assignment">
        <div>
          <assignment />
        </div>
      </v-tab-item>
      <v-tab-item value="user">
        <div>
          <user />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import user from "@/pages/assignment/user/index";
import assignment from "@/pages/assignment/assignments/index";
import usermixin from "@/components/users";
import assignmentmixin from "@/components/assignment";

export default {
  mixins: [usermixin],
  mixins: [assignmentmixin],
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } });
      },
      get() {
        return this.$route.query.tab;
      }
    }
  },
  components: {
    user,
    assignment
  },

//   layout: "modren"
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
