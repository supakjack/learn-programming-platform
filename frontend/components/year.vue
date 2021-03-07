<script>
export default {
  methods: {
    // function name: getHome
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 24/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 24/2/2021
    async getYear(data) {
      return this.$axios.$post(`year/get`, data);
    },

    // async getCourseSection(data) {
    //   return this.$axios.$get(
    //     `course/section/${data.courseId}?userId=${data.userId}`
    //   );
    // },

    async insertYear(data) {
      return this.$axios
        .$post("year/add", data)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreate);
    }
    // async updateCourse(data) {
    //   return this.$axios
    //     .$put("course", data)
    //     .catch(error => {
    //       console.error(error);
    //     })
    //     .then(response => response.doesUpdate);
    // }
  }
};
</script>
