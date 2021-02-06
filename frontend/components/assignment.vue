<script>
export default {
  methods: {
    async getAssignment() {
      return this.$axios.$get("assignment");
    }
  }
};
</script>
