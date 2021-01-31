<script>
export default {
  methods: {
    async getTag() {
      return this.$axios.$get("/tag");
    }
  }
};
</script>
