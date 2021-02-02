<template>
  <v-card class="kanit-font">
    <v-tabs centered v-model="tab">
      <v-tab href="#problems">โจทย์ปัญหา</v-tab>
      <v-tab href="#tag">แท็ก</v-tab>
    </v-tabs>

    <v-tabs-items :value="tab">
      <v-tab-item value="problems">
        <div>
          <problems />
        </div>
      </v-tab-item>
      <v-tab-item value="tag">
        <div>
          <tags />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import tags from "./../problem-tag/tags/index";
import problems from "./../problem-tag/problems/index";
import tagsmixin from "../../components/tags";
import problemsmixin from "../../components/problems";

export default {
  mixins: [tagsmixin], 
  mixins: [problemsmixin],
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
    tags,
    problems
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
