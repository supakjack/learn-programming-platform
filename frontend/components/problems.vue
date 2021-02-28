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
    async editHashtag(data) {
      const editData = {};
      editData.problemId = data;
      const result = this.$axios
        .$post("problem/edit/hashtag", editData)
        .catch(err => console.log(err))
        .then(response => response.doesGetAll);
      return result;
    },

    async editTestset(data) {
      const editData = {};
      editData.problemId = data;
      const result = this.$axios
        .$post("problem/edit/testset", editData)
        .catch(err => console.log(err))
        .then(response => response.doesGetAll);
      return result;
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
      const result = this.$axios
        .$patch(`problem/?problemId=${data.problemId}`, editData)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
      return result;
    },
    async updateProblem(data) {
      const result = this.$axios
        .$patch(`problem/updateProblem/?problemId=${data.problemId}`, data)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
      return result;
    },

    async insertProblem(data) {
      return this.$axios
        .$post("problem", data)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreatePicture);
    }
  }
};
</script>
