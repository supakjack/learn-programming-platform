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
import tags from "./../components/tags";
import problem from "./../components/problem";
export default {
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
    problem
  },
  layout: "modren"
};
</script>
