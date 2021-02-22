<script>
export default {
  methods: {
    // function name: getHomework
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Yotsapat Phurahong / CreateDate: 18/2/2021
    // UpdateBy:
    async getHomework() {
      return this.$axios.$get("homework");
    },

    // function name: getHomework
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Yotsapat Phurahong / CreateDate: 18/2/2021
    // UpdateBy:
    async getProblem(taskAssignmentId) {
      const result = this.$axios.$get(`homework/${taskAssignmentId}`);
      console.log(result);
      return result;
    }
  }
};
</script>
