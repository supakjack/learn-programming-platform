module.exports = {
  state: () => ({
    permission: ["teacher"],
    token: "",
    username: "",
    id: "1"
  }),
  mutations: {
    setUser(state, { user }) {
      state.permission = user.permission;
      state.token = user.token;
      state.username = user.username;
      state.id = 1;
      console.log(user);
    }
  }
};
