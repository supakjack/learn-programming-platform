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
      return this.$axios.$get("testset", data);
    },
    async getCompilelog(data) {
      const testset = {
        compilelogTaskId: data
      };
      console.log(testset);
      const result = this.$axios.$get("testset/compilelog", testset);
      return result;
    }
  }
};
</script>
