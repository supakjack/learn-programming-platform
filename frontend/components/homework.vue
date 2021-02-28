<script>
export default {
  methods: {
    // function name: getAssignmentHomework
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {assignmentTitle, assignmentId, assignmentStatus, assignmentStartDate, assignmentEndDate }
    // CreateBy: Yotsapat Phurahong / CreateDate: 18/2/2021
    // UpdateBy:
    async getHomework() {
      return this.$axios.$get("homework");
    },

    // function name: getTaskHomework
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {"taskId","taskScore","taskLimit","problemId","problemTitle","problemDescription","tagName","compilelogScore","compilelogSubmitNo","compilelogTestResult",}
    // CreateBy: Yotsapat Phurahong / CreateDate: 18/2/2021
    // UpdateBy:
    async getProblem(taskAssignmentId) {
      const result = this.$axios.$get(`homework/${taskAssignmentId}`);
      return result;
    }
  }
};
</script>
