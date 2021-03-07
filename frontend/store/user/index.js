module.exports = {
  state: () => ({
    permission: ["teacher"],
    token: "",
    username: "60160344",
    password: "050440705bB_",
    id: 1
  }),
  mutations: {
    setUser(state, { user }) {
      state.permission = user.permission;
      state.token = user.token;
      state.username = user.username;
      state.password = user.password;
      state.id = user.id;
      console.log(user);
    }
  }
};
