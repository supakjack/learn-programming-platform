<script>
export default {
  methods: {
    // function name: getAssingment
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 28/2/2021
    async getAssignment(data) {
      return this.$axios.$get(`assignment/?assignmentSectionId=${data}`);
    },

    // function name: getProblemBytag
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
    // CreateBy: Niphitphon Thanatkulkit / UpdateDate: 28/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 28/2/2021
    async getProblemByTag(data) {
      console.log(data);
      return this.$axios.$post(`assignment/problemByTag`, data);
    },

    // function name: insertAssingment
    // description: sending assingment insert data from assingment component to backend and use API to create in database
    // input: [data]: {assingmentName,assingmentStatus,assingmentCreateBy,assingmentUpdateBy}
    // output: assingmentId
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

    async insertAssignment(data) {
      // console.log(data);
      const insertData = {};
      const assignment = {};
      const task = {};
      assignment.assignmentTitle = data.assignmentTitle;
      assignment.assignmentDescription = data.assignmentDescription;
      assignment.assignmentStartDate = data.assignmentStartDate;
      assignment.assignmentSectionId = data.assignmentSectionId;
      assignment.assignmentEndDate = data.assignmentEndDate;
      assignment.assignmentStatus = data.assignmentStatus;
      assignment.assignmentCreateBy = data.assignmentCreateBy;
      assignment.assignmentUpdateBy = data.assignmentUpdateBy;
      assignment.assignmentSectionId = data.assignmentSectionId;
      task.taskLimit = data.taskLimit;
      task.taskScore = data.taskScore;
      insertData.problemData = data.problemData;
      insertData.assignment = assignment;
      insertData.task = task;
      const result = this.$axios
        .$post("assignment", insertData)
         .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreateTask);
      console.log(result);
      return result;
    },

    // function name: editAssignment
    // description: sending assingment data from assingment component to backend and use API to update in database
    // input: [data]: {assingmentId, assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
    // output: number of row edited
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

    async editAssignment(data) {
      const editData = {};
      editData.assignmentId = data.assignmentId;
      editData.assignmentTitle = data.assignmentTitle;
      editData.assignmentDescription = data.assignmentDescription;
      editData.assignmentStartDate = data.assignmentStartDate;
      editData.assignmentEndDate = data.assignmentEndDate;
      editData.assignmentStatus = data.assignmentStatus;
      editData.assignmentUpdateBy = data.assignmentUpdateBy;
      editData.assignmentUpdateDate = data.assignmentUpdateDate;

      const result = this.$axios
        .$patch(`assignment/?assignmentId=${data.assignmentId}`, editData)
        .catch((err) => console.log(err))
        .then((response) => response.doesUpdate);
      console.log(result);
      return result;
    },
    async getUserAssignment(data) {
      const editData = {};
      editData.assignmentId = data;

      const result = this.$axios
        .$post("problem/problem/user", editData)
        .catch((err) => console.log(err));
      console.log(result);
      return result;
    },
    async getScoreUser(data) {
      const result = this.$axios
        .$post("problem/score/user", data)
        .catch((err) => console.log(err));
      console.log(result);
      return result;
    },
    async getScoreMax(data) {
      const editData = {};
      editData.assignmentId = data;

      const result = this.$axios
        .$post("problem/score/max", editData)
        .catch((err) => console.log(err));
      console.log(result);
      return result;
    },

    // function name: deleteAssingment
    // description: for geting data from backend using api
    // input: -
    // output: number of edited items
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

    async deleteAssingment() {
      const deleteData = {};
      deleteData.assignmentStatus = data.assignmentStatus;
      deleteData.assignmentUpdateDate = data.assignmentUpdateDate;
      return this.$axios
        .$patch(`assingment/?assingmentId=${data.assingmentId}`, deleteData)
        .catch((err) => console.log(err))
        .then((response) => response.doesUpdate);
    },
  },
};
</script>
