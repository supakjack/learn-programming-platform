<script>
export default {
  methods: {
    // function name: getHomework
    // description: get from backend API
    // input: -
    // output: -
    // CreateBy:Theo Seathan / CreateDate: 21/2/2021
    // UpdateBy:
    async getTestset(data) {
      console.log(data);
      return this.$axios.$post("testset", data);
    },
    async getTestsetExample(data) {
      const dataCondition = {
        problemId: data
      };
      return this.$axios.$post("testset/example", dataCondition);
    },
    async getCompilelog(data) {
      console.log(data);
      const result = this.$axios.$post("testset/compilelog", data);
      return result;
    }
  }
};
</script>
