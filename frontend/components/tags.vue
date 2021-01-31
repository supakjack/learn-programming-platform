<script>
export default {
  methods: {
    async getTag() {
      this.response = await this.$axios.$get("/tag");
      console.log(this.response.doseGetAll)
    }
  }
};
</script>
