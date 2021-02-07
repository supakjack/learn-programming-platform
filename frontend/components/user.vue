<script>
export default {
  methods: {
    async getUser() {
      return this.$axios.$get("user");
    }
  }
};
</script>
