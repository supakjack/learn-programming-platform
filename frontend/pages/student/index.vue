<template>
  <v-card class="kanit-font">
    <v-tabs centered v-model="tab">
      <v-tab href="#homework">การบ้าน</v-tab>
    </v-tabs>

    <v-tabs-items :value="tab">
      <v-tab-item value="homework">
        <div>
          <homework />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import homework from "@/pages/student/homework/index";
import homeworkmixin from "@/components/homework";

export default {
  mixins: [homeworkmixin],
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
    homework
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
