<script>
export default {
  methods: {
    // function name: getTag
    // description: get from backend API
    // input: -
    // output: [doesGetAll]: {tagName, tagId, tagStatus, tagUpdateDate, tagCraeteDate ,CreateName, UpdateName}
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 1/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    async getHomework() {
      return this.$axios.$get("homework");
    }
  }
};
</script>
