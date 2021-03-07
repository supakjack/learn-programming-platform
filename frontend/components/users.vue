<script>
export default {
  methods: {
    async getUser() {
      const courseData = {};
      courseData.userId = this.$store.state.course.userId;
      courseData.sectionId = this.$store.state.course.sectionId;
      return this.$axios.$post("user/course", courseData);
    },

    async getUserByUsername(data) {
      const username = this.$store.state.user.username;
      const password = this.$store.state.user.password;
      return this.$axios.$get(
        `auth/getUser/${data}?username=` + username + "&password=" + password
      );
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
      const InsertData = {};
      InsertData.userUsername = data.userUsername;
      InsertData.userPrefixThai = data.userPrefixThai;
      InsertData.userFirstnameThai = data.userFirstnameThai;
      InsertData.userLastnameThai = data.userLastnameThai;

      InsertData.userPrefixEnglish = data.userPrefixEnglish;
      InsertData.userFirstnameEnglish = data.userFirstnameEnglish;
      InsertData.userLastnameEnglish = data.userLastnameEnglish;

      InsertData.userStatus = data.userStatus;
      InsertData.userCreateBy = this.$store.state.course.userId;
      InsertData.userUpdateBy = this.$store.state.course.userId;
      InsertData.sectionId = this.$store.state.course.sectionId;
      console.log(InsertData);
      return this.$axios
        .$post("user", InsertData)
        .catch((error) => {
          console.error(error);
        })
        .then((response) => response.doesCreate);
    },
    async insertFile(data) {
      console.log(data);
      return this.$axios
        .$post("user/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          console.error(error);
        })
        .then((response) => response.doesCreate);
    },
  },
};
</script>
