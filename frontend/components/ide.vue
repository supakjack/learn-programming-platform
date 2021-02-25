<script>
export default {
  methods: {
    // function name: getHomework
    // description: get from backend API
    // input: -
    // output: -
    // CreateBy:Theo Seathan / CreateDate: 21/2/2021
    // UpdateBy:
    async seperate(data) {
      let result = this.$axios.$post("ide/seperate", data).catch(error => {
        console.error(error);
      });

      return result;
    },

    async submitData(data) {
      let result = this.$axios.$post("ide/submit", data).catch(error => {
        console.error(error);
      });
      return result;
    },
    async testsetSubmit(data) {
      const testsetData = {};
      testsetData.filePath = data.filePath;
      testsetData.language = data.language;
      const result = this.$axios
        .$post(`ide/testset?testsetId=${data.testsetId}`, testsetData)
        .catch(err => console.log(err));
      return result;
    },
    async createCompile(data) {
      const result = this.$axios
        .$post(`ide/create/?taskId=${data.compilelogTaskId}`, data)
        .catch(err => console.log(err));
      return result;
    }
  }
};
</script>
