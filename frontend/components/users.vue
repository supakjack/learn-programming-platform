<script>
export default {
  methods: {
    async getUser() {
      return this.$axios.$get("user");
    },

    async getUserByUsername(data) {
      return this.$axios.$get(`user/getUser/${data}`);
    },

    async deleteUser() {
      const deleteData = {};
      deleteData.userStatus = data.userStatus;
      deleteData.userUpdateDate = data.userUpdateDate;
      return this.$axios
        .$patch(`user/?userId=${data.userId}`, deleteData)
        .catch((err) => console.log(err))
        .then((response) => response.doesUpdate);
    },

    async editUser(data) {
      const editData = {};
      editData.userUsername = data.userUsername;

      editData.userPrefixThai = data.userPrefixThai;
      editData.userFirstnameThai = data.userFirstnameThai;
      editData.userLastnameThai = data.userLastnameThai;

      editData.userPrefixEnglish = data.userPrefixEnglish;
      editData.userFirstnameEnglish = data.userFirstnameEnglish;
      editData.userLastnameEnglish = data.userLastnameEnglish;

      editData.userStatus = data.userStatus;
      editData.userCreateBy = data.userCreateBy;
      editData.userUpdateBy = data.userUpdateBy;
      console.log(editData);
      const result = this.$axios
        .$patch(`user/?userId=${data.userId}`, editData)
        .catch((err) => console.log(err))
        .then((response) => response.doesUpdate);
      console.log(result);
      return result;
    },

    async insertUser(data) {
      // console.log(data);
      const InsertData = {};
      InsertData.userUsername = data.userUsername;

      InsertData.userPrefixThai = data.userPrefixThai;
      InsertData.userFirstnameThai = data.userFirstnameThai;
      InsertData.userLastnameThai = data.userLastnameThai;

      InsertData.userPrefixEnglish = data.userPrefixEnglish;
      InsertData.userFirstnameEnglish = data.userFirstnameEnglish;
      InsertData.userLastnameEnglish = data.userLastnameEnglish;

      InsertData.userStatus = data.userStatus;
      InsertData.userCreateBy = data.userCreateBy;
      InsertData.userUpdateBy = data.userUpdateBy;
      return this.$axios
        .$post("user", InsertData)
        .catch((error) => {
          console.error(error);
        })
        .then((response) => response.doesCreate);
    },
    async insertFile(data) {
      console.log(data);
      const InsertFile = {};
      InsertFile.file = data.file;

      return this.$axios
        .$post("user/upload", InsertFile)
        .catch((error) => {
          console.error(error);
        })
        .then((response) => response.doesCreate);
    },
  },
};
</script>
