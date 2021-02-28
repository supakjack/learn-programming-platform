<script>
export default {
  methods: {
    // function name: getHome
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 24/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 24/2/2021
    async getHome(data) {
      return this.$axios.$get(`course/?userId=${data}`);
    },

    async insertCourse(data) {
      return this.$axios
        .$post("course", data)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreate);
    }
  }
};
</script>
