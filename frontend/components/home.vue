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

    // function name: deleteTag
    // description: for geting data from backend using api
    // input: tagId,tagCreateDate,tagStatus,tagUpdateDate
    // output: number of edited items
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 1/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    async deleteTag() {
      const deleteData = {};
      deleteData.tagStatus = data.tagStatus;
      deleteData.tagUpdateDate = data.tagUpdateDate;
      return this.$axios
        .$patch(`tag/?tagId=${data.tagId}`, deleteData)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
    },

    // function name: editTag
    // description: sending tag data from tag component to backend and use API to update in database
    // input: [data]: {tagId,tagName,tagStatus,tagCreateBy,tagUpdateBy,tagUpdatedate}
    // output: number of row edited
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 1/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    async editTag(data) {
      const editData = {};
      editData.tagName = data.tagName;
      editData.tagUpdateBy = data.tagUpdateBy;
      editData.tagStatus = data.tagStatus;
      editData.tagUpdateDate = data.tagUpdateDate;
      console.log(editData);
      const result = this.$axios
        .$patch(`tag/?tagId=${data.tagId}`, editData)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
      console.log(result);
      return result;
    },

    // function name: insertTag
    // description: sending tag insert data from tag component to backend and use API to create in database
    // input: [data]: {tagName,tagStatus,tagCreateBy,tagUpdateBy}
    // output: tagId
    // CreateBy: Niphitphon Thanatkulkit / CreateDate: 1/2/2021
    // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 6/2/2021
    async insertTag(data) {
      const InsertData = {};
      InsertData.tagName = data.tagName;
      InsertData.tagStatus = data.tagStatus;
      InsertData.tagCreateBy = data.tagCreateBy;
      InsertData.tagUpdateBy = data.tagUpdateBy;
      return this.$axios
        .$post("tag", InsertData)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreate);
    }
  }
};
</script>
