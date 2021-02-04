<script>
export default {
  methods: {
    async getTag() {
      return this.$axios.$get("/tag");
    },
    async deleteTag() {
      return this.$axios.$patch("/tag");
    },
    async editTag() {
      return this.$axios.$patch("/tag");
    },
    async insertTag(data) {
      return this.$axios.$post("/tag", data).then(response => response.doesCreate);
    }
  }
};
</script>
