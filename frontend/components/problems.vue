<script>
export default {
  methods: {
    async getProblem() {
      return this.$axios.$get("problem");
    },

    async deleteProblem() {
      const deleteData = {};
      deleteData.problemStatus = data.problemStatus;
      deleteData.problemUpdateDate = data.problemUpdateDate;
      return this.$axios
        .$patch(`problem/?problemId=${data.problemId}`, deleteData)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
    },

    async editProblem(data) {
      const editData = {};
      editData.problemTitle = data.problemTitle;
      // editData.problemDiscription = data.problemDiscription;
      editData.problemStatus = data.problemStatus;
      // editData.taskScore = data.taskScore;
      // editData.problemCreateBy = data.problemCreateBy;
      editData.problemUpdateBy = data.problemUpdateBy;
      editData.problemUpdateDate = data.problemUpdateDate;
      console.log(editData);

      const result = this.$axios
        .$patch(`problem/?problemId=${data.problemId}`, editData)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
      console.log(result);
      // result.then(function(result) {
      //   console.log(result); // "Some User token"
      // });
      return result;
    }
  }
};
</script>
