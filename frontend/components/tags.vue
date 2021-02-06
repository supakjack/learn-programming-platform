<script>
export default {
  methods: {
    async getTag() {
      return this.$axios.$get("tag");
    },
    async deleteTag() {
      return this.$axios.$patch("tag");
    },
    async editTag(data) {
     
      const UpdateData = {};
      UpdateData.tagName = data.tagName;
      UpdateData.tagUpdateBy = data.tagUpdateBy;
      UpdateData.tagStatus = data.tagStatus;
      UpdateData.tagUpdateDate = data.tagUpdateDate;
  
      return this.$axios
        .$patch(
          `tag/?tagId=${data.tagId}`,
          UpdateData
        )
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
    },
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
