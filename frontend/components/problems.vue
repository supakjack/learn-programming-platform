<script>
export default {
  methods: {
    async getProblem() {
      return this.$axios.$get("/problem");
    }
  }
};
</script>
