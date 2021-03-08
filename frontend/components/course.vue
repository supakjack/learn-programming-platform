<script>
export default {
  methods: {
    // function name: getTeacherCourse
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 24/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 24/2/2021
    async getTeacherCourse(data) {
      return this.$axios.$get(`course/?userId=${data}`);
    },

    // function name: getStudentCourse
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 24/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 24/2/2021
    async getStudentCourse(data) {
      return this.$axios.$get(`course/StudentCourse/?userId=${data}`);
    },

    async getCourseSection(data) {
      return this.$axios.$get(
        `course/section/${data.courseId}?userId=${data.userId}`
      );
    },

    async insertCourse(data) {
      return this.$axios
        .$post("course", data)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreate);
    },
    async updateCourse(data) {
      return this.$axios
        .$put("course", data)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesUpdate);
    }
  }
};
</script>
