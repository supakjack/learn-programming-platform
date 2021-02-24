module.exports = {
  state: () => ({
    permission: [],
    token: "",
    username: ""
  }),
  mutations: {
    setUser(state, { user }) {
      state.permission = user.permission;
      state.token = user.token;
      state.username = user.username;
      console.log(user);
    }
  }
};
