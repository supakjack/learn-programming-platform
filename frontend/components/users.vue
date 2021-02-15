<script>
export default {
  methods: {
    async getUser() {
      return this.$axios.$get("user");
    },

    async deleteUser() {
      const deleteData = {};
      deleteData.userStatus = data.userStatus;
      deleteData.userUpdateDate = data.userUpdateDate;
      return this.$axios
        .$patch(`user/?userId=${data.userId}`, deleteData)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
    },

    async editUser(data) {
      const editData = {};
      editData.userName = data.userName;
      editData.userUpdateBy = data.userUpdateBy;
      editData.userStatus = data.userStatus;
      editData.userUpdateDate = data.userUpdateDate;
console.log(editData);
      const result = this.$axios
        .$patch(`user/?userId=${data.userId}`, editData)
        .catch(err => console.log(err))
        .then(response => response.doesUpdate);
      console.log(result);
      return result;
    },

    async insertUser(data) {
      const InsertData = {};
      InsertData.userName = data.userName;
      InsertData.userStatus = data.userStatus;
      InsertData.userCreateBy = data.userCreateBy;
      InsertData.userUpdateBy = data.userUpdateBy;
      return this.$axios
        .$post("user", InsertData)
        .catch(error => {
          console.error(error);
        })
        .then(response => response.doesCreate);
    }
  }
};
</script>
