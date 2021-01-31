<template>
  <v-card>
    <v-tabs centered v-model="tab">
      <v-tab href="#problem">Problem</v-tab>
      <v-tab href="#tag">tag</v-tab>
    </v-tabs>

    <v-tabs-items :value="tab">
      <v-tab-item value="problem">
        <div>
          <problem />
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
// import problems from "./../problem-tag/problems/index";
// import problem from "./../../components/problem";
import tagsmixin from "../../components/tags";
export default {
  mixins: [tagsmixin],
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
    tags
    // problem
  },
//   mounted() {
//       this.getTag();
//     console.log(this.result);
//   },

  layout: "modren"
};
</script>
