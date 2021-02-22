<script>
export default {
  methods: {
    // function name: getAssingment
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021
    async getAssignment() {
      return this.$axios.$get("assignment");
    },

    // function name: insertAssingment
    // description: sending assingment insert data from assingment component to backend and use API to create in database
    // input: [data]: {assingmentName,assingmentStatus,assingmentCreateBy,assingmentUpdateBy}
    // output: assingmentId
    // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
    // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

    async insertAssingment(data) {
      const insertData = {};
      insertData.assignmentTitle = data.assignmentTitle;
      insertData.assignmentDescription = data.assignmentDescription;
      insertData.assignmentStartDate = data.assignmentStartDate;
      insertData.assignmentSectionId = data.assignmentSectionId;
      insertData.assignmentEndDate = data.assignmentEndDate;
      insertData.assignmentStatus = data.assignmentStatus;
      insertData.assignmentCreateBy = data.assignmentCreateBy;
      insertData.assignmentUpdateBy = data.assignmentUpdateBy;
      return this.$axios
        .$post("assignment", insertData)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreate);
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
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
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
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
    }
  }
};
</script>
