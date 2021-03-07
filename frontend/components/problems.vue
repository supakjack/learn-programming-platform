<script>
export default {
  methods: {
    async getProblem() {
      return this.$axios.$get("problem");
    },

    async getProblem(dataCondition) {
      return this.$axios.$get("problem",dataCondition);
    },

    async deleteProblem(dataCondition) {
      console.log(dataCondition);
      return this.$axios
        .$post("problem/delete", dataCondition)
        .catch(err => console.log(err));
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

    async editPicture(data) {
      const editData = {};
      editData.problemId = data;
      const result = this.$axios
        .$post("problem/edit/picture", editData)
        .catch(err => console.log(err))
        .then(response => response.doesGetAll);
      return result;
    },

    async editProblem(data) {
      const editData = {};
      editData.problemTitle = data.problemTitle;
      // editData.problemDescription = data.problemDescription;
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
    async updateProblem(data, id) {
      console.log([...data]);
      console.log(id);
      const result = this.$axios
        .$patch(`problem/updateProblem/?problemId=${id}`, data)
        .catch(err => console.log(err));
      return result;
    },

    async insertProblem(data) {
      console.log([...data]);
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
