<script>
export default {
  methods: {
    async insertSection(data) {
      return this.$axios
        .$post(`section`, data)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesInsert);
    }
  }
};
</script>
